import * as path from 'node:path';

import { describe, it } from 'vitest';

import { readEvalDefinition } from '../../application/load-eval-definition/load-eval-definition.js';
import {
  buildPromptfooPilotScoringArtifact,
  readPromptfooCaseModeOutputs,
  resolveGeneratedPromptfooScoringPath,
} from './pilot-scoring.js';

function resolveFixturePath(fileName: string): string {
  return path.resolve('scripts', 'evals', 'infrastructure', 'promptfoo', 'test-fixtures', fileName);
}

describe('readPromptfooCaseModeOutputs', () => {
  it('extracts with_skill and without_skill outputs keyed by case id', ({ expect }) => {
    const outputs = readPromptfooCaseModeOutputs(resolveFixturePath('pilot-eval-output.json'));

    expect(outputs.size).toBe(3);
    const firstCase = outputs.get('new-skill-one-clear-job');
    expect(firstCase?.with_skill?.status).toBe('completed');
    expect(firstCase?.without_skill?.status).toBe('completed');

    const erroredCase = outputs.get('runtime-harness-implementation');
    expect(erroredCase?.without_skill).toMatchObject({
      status: 'error',
      error: { kind: 'execution_error', message: 'provider timeout' },
    });
  });
});

describe('buildPromptfooPilotScoringArtifact', () => {
  it('builds a local scoring artifact from promptfoo mode outputs', ({ expect }) => {
    const definition = readEvalDefinition(path.resolve('evals', 'cases', 'skill-forge', 'pilot-suite.v1.json'));
    const caseModeOutputs = readPromptfooCaseModeOutputs(resolveFixturePath('pilot-eval-output.json'));
    const artifact = buildPromptfooPilotScoringArtifact({
      definition,
      sourceEvalPath: path.resolve('evals', 'cases', 'skill-forge', 'pilot-suite.v1.json'),
      sourcePromptfooOutputPath: resolveFixturePath('pilot-eval-output.json'),
      caseModeOutputs,
      createdAt: '2026-03-13T00:00:00.000Z',
    });

    expect(artifact.skill_name).toBe('skill-forge');
    expect(artifact.eval_version).toBe(1);
    expect(artifact.scoring_strategy).toBe('deterministic_assertions_first');
    expect(artifact.created_at).toBe('2026-03-13T00:00:00.000Z');
    expect(artifact.summary.case_count).toBe(3);
    expect(artifact.summary.mode_evaluations).toBe(6);
    expect(artifact.summary.failed_modes).toBeGreaterThan(0);
    expect(artifact.cases).toHaveLength(3);
    expect(artifact.cases[1]).toMatchObject({
      case_id: 'runtime-harness-implementation',
      without_skill: {
        score: 0,
        passed: false,
        checks: [
          {
            label: 'Execution failure',
            status: 'FAIL',
            evidence: 'execution_error: provider timeout',
          },
        ],
      },
    });
  });

  it('resolves a deterministic scoring artifact path', ({ expect }) => {
    expect(resolveGeneratedPromptfooScoringPath('skill-forge')).toBe(
      path.resolve('evals', 'engines', 'promptfoo', 'generated', 'skill-forge.pilot.scoring.json'),
    );
  });
});
