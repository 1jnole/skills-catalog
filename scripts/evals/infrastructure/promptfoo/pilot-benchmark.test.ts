import * as path from 'node:path';

import { describe, it } from 'vitest';

import { readEvalDefinition } from '../../application/load-eval-definition/load-eval-definition.js';
import { buildPromptfooPilotScoringArtifact, readPromptfooCaseModeOutputs } from './pilot-scoring.js';
import {
  buildPromptfooPilotBenchmarkArtifact,
  buildPromptfooPilotNormalizedResults,
  resolveGeneratedPromptfooBenchmarkPath,
} from './pilot-benchmark.js';

function resolveFixturePath(fileName: string): string {
  return path.resolve('scripts', 'evals', 'infrastructure', 'promptfoo', 'test-fixtures', fileName);
}

describe('buildPromptfooPilotNormalizedResults', () => {
  it('maps promptfoo outputs and local scoring into canonical normalized results', ({ expect }) => {
    const definition = readEvalDefinition(path.resolve('evals', 'cases', 'skill-forge', 'pilot-suite.v1.json'));
    const caseModeOutputs = readPromptfooCaseModeOutputs(resolveFixturePath('pilot-eval-output.json'));
    const scoringArtifact = buildPromptfooPilotScoringArtifact({
      definition,
      sourceEvalPath: path.resolve('evals', 'cases', 'skill-forge', 'pilot-suite.v1.json'),
      sourcePromptfooOutputPath: resolveFixturePath('pilot-eval-output.json'),
      caseModeOutputs,
      createdAt: '2026-03-13T00:00:00.000Z',
    });

    const results = buildPromptfooPilotNormalizedResults({
      definition,
      scoringArtifact,
      caseModeOutputs,
    });

    expect(results).toHaveLength(3);
    expect(results[0]).toMatchObject({
      case_id: 'new-skill-one-clear-job',
      with_skill: {
        status: 'completed',
        passed: true,
        score: 1,
        provider: 'openai',
        model: 'gpt-4.1-mini',
      },
      without_skill: {
        status: 'completed',
        passed: false,
        score: 0,
      },
    });
    expect(results[1].without_skill).toMatchObject({
      status: 'error',
      error: {
        kind: 'execution_error',
        message: 'provider timeout',
      },
    });
  });
});

describe('buildPromptfooPilotBenchmarkArtifact', () => {
  it('builds local benchmark output from normalized promptfoo pilot results', ({ expect }) => {
    const definition = readEvalDefinition(path.resolve('evals', 'cases', 'skill-forge', 'pilot-suite.v1.json'));
    const caseModeOutputs = readPromptfooCaseModeOutputs(resolveFixturePath('pilot-eval-output.json'));
    const scoringArtifact = buildPromptfooPilotScoringArtifact({
      definition,
      sourceEvalPath: path.resolve('evals', 'cases', 'skill-forge', 'pilot-suite.v1.json'),
      sourcePromptfooOutputPath: resolveFixturePath('pilot-eval-output.json'),
      caseModeOutputs,
      createdAt: '2026-03-13T00:00:00.000Z',
    });

    const artifact = buildPromptfooPilotBenchmarkArtifact({
      definition,
      scoringArtifact,
      caseModeOutputs,
      iterationNumber: 1,
      completedAt: '2026-03-13T00:00:00.000Z',
    });

    expect(artifact.status).toBe('completed_with_errors');
    expect(artifact.skill_name).toBe('skill-forge');
    expect(artifact.iteration).toBe(1);
    expect(artifact.gate_results.golden_pass_rate).toBe(1);
    expect(artifact.gate_results.error_case_count).toBe(1);
    expect(artifact.gate_results.overall_passed).toBe(false);
    expect(artifact.comparison.with_skill.pass_rate).toBeGreaterThan(artifact.comparison.without_skill.pass_rate);
    expect(artifact.comparison.with_skill.average_score).toBeGreaterThan(artifact.comparison.without_skill.average_score);
    expect(artifact.comparison.without_skill.error_count).toBe(1);
    expect(artifact.cases).toHaveLength(3);
  });

  it('resolves a deterministic generated benchmark path', ({ expect }) => {
    expect(resolveGeneratedPromptfooBenchmarkPath('skill-forge')).toBe(
      path.resolve('evals', 'engines', 'promptfoo', 'generated', 'skill-forge.benchmark.json'),
    );
  });
});
