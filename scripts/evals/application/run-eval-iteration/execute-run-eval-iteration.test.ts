import { describe, expect, it, vi } from 'vitest';

import { executeRunEvalIterationWithPorts } from './execute-run-eval-iteration.js';
import type { EvalDefinition } from '../../domain/eval-definition/eval-definition.types.js';
import type { ModeArtifacts } from '../../domain/run-results/run-artifact.types.js';
import type { CaseArtifacts } from '../../domain/run-results/run.types.js';
import type { RunEvalIterationInput } from './run-eval-iteration.types.js';
import type { IterationWorkspace } from '../../infrastructure/filesystem/eval-runs/iteration-files.js';

function createModeArtifacts(overrides: Partial<ModeArtifacts> = {}): ModeArtifacts {
  return {
    status: 'completed',
    duration_ms: 100,
    score: 1,
    passed: true,
    provider: 'openai',
    model: 'gpt-4.1-mini',
    usage: { totalTokens: 10 },
    ...overrides,
  };
}

function createCaseArtifacts(caseId: string, overrides: Partial<CaseArtifacts> = {}): CaseArtifacts {
  return {
    case_id: caseId,
    expected_stop: 'Eval Brief ready',
    should_trigger: true,
    with_skill: createModeArtifacts(),
    without_skill: createModeArtifacts({ score: 0.5, passed: false }),
    ...overrides,
  };
}

function createDefinition(): EvalDefinition {
  return {
    skill_name: 'skill-forge',
    eval_version: 1,
    purpose: 'test',
    comparison_intent: {
      primary: 'with_skill_vs_without_skill',
      hypothesis: 'with skill should do better',
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
      id: 'golden-case',
      prompt: 'golden prompt',
      expected_output: 'expected',
      assertions: ['must pass'],
      files: [],
      should_trigger: true,
      stop_at: 'Eval Brief ready',
    }],
    negative: [{
      id: 'negative-case',
      prompt: 'negative prompt',
      expected_output: 'expected',
      assertions: ['must not trigger'],
      files: [],
      should_trigger: false,
      stop_at: 'do_not_trigger',
    }],
  };
}

function createWorkspace(): IterationWorkspace {
  return {
    runsRoot: 'runs',
    iterationNumber: 7,
    iterationDir: 'runs/iteration-7',
    benchmarkPath: 'runs/iteration-7/benchmark.json',
    runManifestPath: 'runs/iteration-7/run.json',
    caseIds: ['golden-case', 'negative-case'],
    lockPath: 'runs/iteration-7/.iteration.lock.json',
    releaseLock: vi.fn(),
  };
}

function createInput(overrides: Partial<RunEvalIterationInput> = {}): RunEvalIterationInput {
  return {
    skillName: 'skill-forge',
    model: 'gpt-4.1-mini',
    retryErrors: false,
    ...overrides,
  };
}

describe('executeRunEvalIterationWithPorts', () => {
  it('reuses completed artifacts and only executes missing cases before persisting supported outputs', async () => {
    const definition = createDefinition();
    const workspace = createWorkspace();
    const existingCase = createCaseArtifacts('golden-case');
    const executeMode = vi
      .fn()
      .mockResolvedValueOnce({ modeArtifacts: createModeArtifacts({ score: 0.8, passed: true }) })
      .mockResolvedValueOnce({ modeArtifacts: createModeArtifacts({ score: 0.1, passed: false }) });
    const buildBenchmark = vi.fn().mockReturnValue({ status: 'completed' });
    const buildRunManifest = vi.fn().mockReturnValue({ platform: 'laminar' });
    const writeValidatedJsonFile = vi.fn();
    const normalizeCaseArtifacts = vi.fn((value: CaseArtifacts) => value);

    const result = await executeRunEvalIterationWithPorts(createInput(), {
      readDefinition: vi.fn().mockReturnValue({
        filePath: 'packs/core/skill-forge/evals/evals.json',
        definition,
      }),
      assertPlatformReady: vi.fn().mockResolvedValue(30000),
      resolveWorkspace: vi.fn().mockReturnValue(workspace),
      readSkillPrompt: vi.fn().mockReturnValue('skill prompt'),
      readCompletedArtifacts: vi.fn().mockReturnValue(new Map([
        ['golden-case', existingCase],
      ])),
      resetRunningState: vi.fn(),
      writeProgress: vi.fn(),
      executeMode,
      normalizeCaseArtifacts,
      buildBenchmark,
      buildRunManifest,
      writeValidatedJsonFile,
      relativeSourceEvalPath: vi.fn(),
      logger: { log: vi.fn() },
    });

    expect(result).toEqual({
      iterationDir: 'runs/iteration-7',
      iterationNumber: 7,
    });
    expect(executeMode).toHaveBeenCalledTimes(2);
    expect(executeMode).toHaveBeenNthCalledWith(1, expect.objectContaining({
      caseDefinition: expect.objectContaining({ id: 'negative-case' }),
      mode: 'with_skill',
    }));
    expect(executeMode).toHaveBeenNthCalledWith(2, expect.objectContaining({
      caseDefinition: expect.objectContaining({ id: 'negative-case' }),
      mode: 'without_skill',
    }));
    expect(normalizeCaseArtifacts).toHaveBeenCalledTimes(2);
    expect(buildBenchmark).toHaveBeenCalledWith(expect.objectContaining({
      iterationNumber: 7,
      caseResults: expect.arrayContaining([
        expect.objectContaining({ case_id: 'golden-case' }),
        expect.objectContaining({ case_id: 'negative-case' }),
      ]),
    }));
    expect(writeValidatedJsonFile).toHaveBeenCalledTimes(2);
    expect(writeValidatedJsonFile).toHaveBeenNthCalledWith(
      1,
      'runs/iteration-7/benchmark.json',
      expect.anything(),
      { status: 'completed' },
    );
    expect(writeValidatedJsonFile).toHaveBeenNthCalledWith(
      2,
      'runs/iteration-7/run.json',
      expect.anything(),
      { platform: 'laminar' },
    );
  });

  it('resets running state and retries errored existing artifacts when retryErrors is enabled', async () => {
    const definition = createDefinition();
    const workspace = createWorkspace();
    const erroredCase = createCaseArtifacts('golden-case', {
      with_skill: createModeArtifacts({
        status: 'error',
        score: 0,
        passed: false,
        error: { kind: 'execution_error', message: 'boom' },
      }),
    });
    const completedNegative = createCaseArtifacts('negative-case', {
      expected_stop: 'do_not_trigger',
      should_trigger: false,
    });
    const resetRunningState = vi.fn();
    const executeMode = vi
      .fn()
      .mockResolvedValueOnce({ modeArtifacts: createModeArtifacts({ score: 0.9, passed: true }) })
      .mockResolvedValueOnce({ modeArtifacts: createModeArtifacts({ score: 0.2, passed: false }) });

    await executeRunEvalIterationWithPorts(createInput({
      iteration: 7,
      retryErrors: true,
    }), {
      readDefinition: vi.fn().mockReturnValue({
        filePath: 'packs/core/skill-forge/evals/evals.json',
        definition,
      }),
      assertPlatformReady: vi.fn().mockResolvedValue(30000),
      resolveWorkspace: vi.fn().mockReturnValue(workspace),
      readSkillPrompt: vi.fn().mockReturnValue('skill prompt'),
      readCompletedArtifacts: vi.fn().mockReturnValue(new Map([
        ['golden-case', erroredCase],
        ['negative-case', completedNegative],
      ])),
      resetRunningState,
      writeProgress: vi.fn(),
      executeMode,
      normalizeCaseArtifacts: vi.fn((value: CaseArtifacts) => value),
      buildBenchmark: vi.fn().mockReturnValue({ status: 'completed_with_errors' }),
      buildRunManifest: vi.fn().mockReturnValue({ platform: 'laminar' }),
      writeValidatedJsonFile: vi.fn(),
      relativeSourceEvalPath: vi.fn().mockReturnValue('packs/core/skill-forge/evals/evals.json'),
      logger: { log: vi.fn() },
    });

    expect(resetRunningState).toHaveBeenCalledWith(expect.objectContaining({
      benchmarkPath: 'runs/iteration-7/benchmark.json',
      iterationNumber: 7,
      caseIds: ['golden-case', 'negative-case'],
    }));
    expect(executeMode).toHaveBeenCalledTimes(2);
    expect(executeMode).toHaveBeenNthCalledWith(1, expect.objectContaining({
      caseDefinition: expect.objectContaining({ id: 'golden-case' }),
      mode: 'with_skill',
    }));
    expect(executeMode).toHaveBeenNthCalledWith(2, expect.objectContaining({
      caseDefinition: expect.objectContaining({ id: 'golden-case' }),
      mode: 'without_skill',
    }));
  });
});



