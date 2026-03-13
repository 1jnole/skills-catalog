import { describe, it } from 'vitest';

import { buildBenchmarkArtifact, resolveStrongerMode } from '../benchmark/benchmark.js';
import { evalDefinitionSchema } from '../eval-definition/eval-definition.schema.js';
import { evalCaseModeSchema } from '../run-results/run-artifact.schema.js';
import type { NormalizedCaseResult } from '../run-results/run-result.types.js';
import {
  baselineComparisonIntent,
  supportedEvalCaseModes,
  supportedStrongerModes,
} from './baseline.js';

function createCaseResult(overrides: Partial<NormalizedCaseResult> = {}): NormalizedCaseResult {
  return {
    case_id: 'case-one',
    should_trigger: true,
    expected_stop: 'Eval Brief ready',
    with_skill: {
      status: 'completed',
      duration_ms: 100,
      score: 1,
      passed: true,
    },
    without_skill: {
      status: 'completed',
      duration_ms: 120,
      score: 0.5,
      passed: false,
    },
    ...overrides,
  };
}

describe('supported baseline semantics', () => {
  it('keeps the core baseline limited to with_skill and without_skill', ({ expect }) => {
    expect(supportedEvalCaseModes).toEqual(['with_skill', 'without_skill']);
    for (const mode of supportedEvalCaseModes) {
      expect(evalCaseModeSchema.parse(mode)).toBe(mode);
    }
    expect(() => evalCaseModeSchema.parse('previous_skill')).toThrow();

    const definition = evalDefinitionSchema.parse({
      skill_name: 'skill-forge',
      eval_version: 1,
      purpose: 'baseline test',
      comparison_intent: {
        primary: baselineComparisonIntent,
        hypothesis: 'with skill should outperform without skill',
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
      golden: [
        {
          id: 'golden-case',
          prompt: 'prompt',
          expected_output: 'expected',
          assertions: ['marker'],
          files: [],
          should_trigger: true,
          stop_at: 'Eval Brief ready',
        },
      ],
      negative: [
        {
          id: 'negative-case',
          prompt: 'prompt',
          expected_output: 'expected',
          assertions: ['marker'],
          files: [],
          should_trigger: false,
          stop_at: 'do_not_trigger',
        },
      ],
    });

    expect(definition.comparison_intent.primary).toBe(baselineComparisonIntent);
  });

  it('resolves benchmark comparison outcomes only within the supported baseline', ({ expect }) => {
    expect(supportedStrongerModes).toEqual(['with_skill', 'without_skill', 'tie']);

    expect(resolveStrongerMode(createCaseResult())).toBe('with_skill');
    expect(resolveStrongerMode(createCaseResult({
      with_skill: { ...createCaseResult().with_skill, score: 0.4 },
      without_skill: { ...createCaseResult().without_skill, score: 0.9 },
    }))).toBe('without_skill');
    expect(resolveStrongerMode(createCaseResult({
      with_skill: { ...createCaseResult().with_skill, score: 0.504 },
      without_skill: { ...createCaseResult().without_skill, score: 0.5 },
    }))).toBe('tie');

    const artifact = buildBenchmarkArtifact({
      skillName: 'skill-forge',
      evalVersion: 1,
      iterationNumber: 1,
      gates: {
        golden_pass_rate: 1,
        negative_pass_rate: 1,
        case_score_threshold: 0.75,
      },
      caseResults: [createCaseResult()],
      completedAt: '2026-03-13T00:00:00.000Z',
    });

    expect(Object.keys(artifact.comparison)).toEqual(['with_skill', 'without_skill', 'deltas']);
  });
});
