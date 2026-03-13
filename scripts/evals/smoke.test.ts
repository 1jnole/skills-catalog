import * as path from 'node:path';

import { describe, expect, it, vi } from 'vitest';

import { executeReadEvalDefinition } from './application/load-eval-definition/read-eval-definition.js';
import { executeRunEvalIterationWithPorts } from './application/run-eval-iteration/execute-run-eval-iteration.js';
import { type EvalDefinition } from './domain/eval-definition/eval-definition.types.js';
import { benchmarkArtifactSchema } from './domain/run-results/run-artifact.schema.js';
import { type ModeArtifacts } from './domain/run-results/run-artifact.types.js';
import { runManifestArtifactSchema } from './domain/run-results/run-result.schema.js';
import { normalizeCaseArtifacts } from './domain/run-results/run-results.js';
import { buildLaminarBenchmark, buildLaminarRunManifest } from './infrastructure/laminar/report.js';
import { type IterationWorkspace } from './infrastructure/filesystem/eval-runs/iteration-files.js';

function createSmokeDefinition(): EvalDefinition {
  return {
    skill_name: 'skill-forge',
    eval_version: 1,
    purpose: 'smoke gate A',
    comparison_intent: {
      primary: 'with_skill_vs_without_skill',
      hypothesis: 'with-skill should be stronger',
    },
    scoring: {
      strategy: 'deterministic_assertions_first',
      judge_model: 'out_of_scope_for_v1',
    },
    gates: {
      golden_pass_rate: 1,
      negative_pass_rate: 1,
      case_score_threshold: 0.75,
    },
    golden: [{
      id: 'golden-1',
      prompt: 'Golden smoke prompt',
      expected_output: 'Expected golden output',
      assertions: ['must pass'],
      files: [],
      should_trigger: true,
      stop_at: 'Eval Brief ready',
    }],
    negative: [{
      id: 'negative-1',
      prompt: 'Negative smoke prompt',
      expected_output: 'Expected negative output',
      assertions: ['must not trigger'],
      files: [],
      should_trigger: false,
      stop_at: 'do_not_trigger',
    }],
  };
}

function createModeArtifacts(mode: 'with_skill' | 'without_skill', shouldTrigger: boolean): ModeArtifacts {
  const withSkill = mode === 'with_skill';
  const passed = shouldTrigger ? withSkill : !withSkill;
  const score = passed ? 1 : 0.25;

  return {
    status: 'completed',
    duration_ms: 25,
    score,
    passed,
    provider: 'openai',
    model: 'gpt-4.1-mini',
    usage: { totalTokens: 12 },
  };
}

function createWorkspace(): IterationWorkspace {
  return {
    runsRoot: 'fake/runs',
    iterationNumber: 1,
    iterationDir: 'fake/runs/iteration-1',
    benchmarkPath: 'fake/runs/iteration-1/benchmark.json',
    runManifestPath: 'fake/runs/iteration-1/run.json',
    caseIds: ['golden-1', 'negative-1'],
    lockPath: 'fake/runs/iteration-1/.iteration.lock.json',
    releaseLock: vi.fn(),
  };
}

describe('gate A smoke', () => {
  it('covers read-evals contract for a controlled skill', () => {
    const result = executeReadEvalDefinition({ skillName: 'skill-forge' });

    expect(result.filePath).toContain(path.join('packs', 'core', 'skill-forge', 'evals', 'evals.json'));
    expect(result.summary.skill_name).toBe('skill-forge');
    expect(result.summary.eval_version).toBeGreaterThan(0);
    expect(result.summary.total_cases).toBeGreaterThan(0);
    expect(result.summary.total_cases).toBe(result.summary.golden_cases + result.summary.negative_cases);
  });

  it('covers controlled execution and benchmark output without live providers', async () => {
    const definition = createSmokeDefinition();
    const workspace = createWorkspace();
    const writes = new Map<string, unknown>();

    const result = await executeRunEvalIterationWithPorts(
      {
        skillName: definition.skill_name,
        model: 'gpt-4.1-mini',
        retryErrors: false,
      },
      {
        readDefinition: () => ({
          filePath: path.resolve('packs', 'core', 'skill-forge', 'evals', 'evals.json'),
          definition,
        }),
        assertPlatformReady: async () => 5_000,
        resolveWorkspace: () => workspace,
        readSkillPrompt: () => 'smoke prompt',
        readCompletedArtifacts: () => new Map(),
        resetRunningState: vi.fn(),
        writeProgress: vi.fn(),
        executeMode: async ({ mode, caseDefinition }) => ({
          modeArtifacts: createModeArtifacts(mode, caseDefinition.should_trigger),
        }),
        normalizeCaseArtifacts,
        buildBenchmark: buildLaminarBenchmark,
        buildRunManifest: buildLaminarRunManifest,
        writeValidatedJsonFile: (filePath, schema, payload) => {
          const validated = schema.parse(payload);
          writes.set(filePath, validated);
          return validated;
        },
        relativeSourceEvalPath: (filePath) => filePath,
        logger: { log: vi.fn() },
      },
    );

    expect(result).toEqual({
      iterationDir: 'fake/runs/iteration-1',
      iterationNumber: 1,
    });
    expect(workspace.releaseLock).toHaveBeenCalledTimes(1);

    const benchmark = benchmarkArtifactSchema.parse(writes.get(workspace.benchmarkPath));
    const runManifest = runManifestArtifactSchema.parse(writes.get(workspace.runManifestPath));

    expect(benchmark.status).toBe('completed');
    expect(benchmark.cases).toHaveLength(2);
    expect(runManifest.platform).toBe('laminar');
    expect(runManifest.iteration).toBe(1);
  });
});
