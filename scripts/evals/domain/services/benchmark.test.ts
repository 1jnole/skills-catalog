import { describe, it } from 'vitest';

import { buildBenchmarkArtifact, resolveStrongerMode } from './benchmark.js';
import type { NormalizedCaseResult } from '../types/run-result.types.js';

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
      provider: 'openai',
      model: 'gpt-4.1-mini',
      usage: { totalTokens: 10 },
    },
    without_skill: {
      status: 'completed',
      duration_ms: 120,
      score: 0.5,
      passed: false,
      provider: 'openai',
      model: 'gpt-4.1-mini',
      usage: { totalTokens: 8 },
    },
    ...overrides,
  };
}

function createBenchmarkParams(
  caseResults: NormalizedCaseResult[],
  overrides: Partial<Parameters<typeof buildBenchmarkArtifact>[0]> = {},
): Parameters<typeof buildBenchmarkArtifact>[0] {
  return {
    skillName: 'skill-forge',
    evalVersion: 1,
    iterationNumber: 7,
    completedAt: '2026-03-13T00:00:00.000Z',
    gates: {
      golden_pass_rate: 1,
      negative_pass_rate: 1,
      case_score_threshold: 0.75,
    },
    caseResults,
    ...overrides,
  };
}

describe('resolveStrongerMode', () => {
  it('returns with_skill, without_skill, or tie from rounded score deltas', ({ expect }) => {
    expect(resolveStrongerMode(createCaseResult())).toBe('with_skill');
    expect(resolveStrongerMode(createCaseResult({
      with_skill: { ...createCaseResult().with_skill, score: 0.4 },
      without_skill: { ...createCaseResult().without_skill, score: 0.9 },
    }))).toBe('without_skill');
    expect(resolveStrongerMode(createCaseResult({
      with_skill: { ...createCaseResult().with_skill, score: 0.504 },
      without_skill: { ...createCaseResult().without_skill, score: 0.5 },
    }))).toBe('tie');
  });
});

describe('buildBenchmarkArtifact', () => {
  const mixedCaseResults = [
    createCaseResult(),
    createCaseResult({
      case_id: 'case-two',
      should_trigger: false,
      expected_stop: 'do_not_trigger',
      with_skill: {
        status: 'completed',
        duration_ms: 205,
        score: 0.33,
        passed: false,
        provider: 'openai',
        model: 'gpt-4.1-mini',
        usage: { totalTokens: 4 },
      },
      without_skill: {
        status: 'completed',
        duration_ms: 95,
        score: 0.66,
        passed: true,
        provider: 'openai',
        model: 'gpt-4.1-mini',
        usage: { totalTokens: 6 },
      },
    }),
  ];

  it('calculates comparison rates, averages, and durations from multiple cases', ({ expect }) => {
    const result = buildBenchmarkArtifact(createBenchmarkParams(mixedCaseResults));

    expect(result).toMatchObject({
      status: 'completed',
      skill_name: 'skill-forge',
      iteration: 7,
      completed_at: '2026-03-13T00:00:00.000Z',
      gate_results: {
        golden_pass_rate: 1,
        negative_pass_rate: 0,
        golden_gate_passed: true,
        negative_gate_passed: false,
        overall_passed: false,
        completed_case_count: 2,
        error_case_count: 0,
      },
      comparison: {
        with_skill: {
          pass_rate: 0.5,
          average_score: 0.67,
          average_duration_ms: 153,
          error_count: 0,
        },
        without_skill: {
          pass_rate: 0.5,
          average_score: 0.58,
          average_duration_ms: 108,
          error_count: 0,
        },
        deltas: {
          pass_rate: 0,
          average_score: 0.09,
          average_duration_ms: 45,
          error_count: 0,
        },
      },
    });
  });

  it('records case deltas and an improvement summary for mixed outcomes', ({ expect }) => {
    const result = buildBenchmarkArtifact(createBenchmarkParams(mixedCaseResults));

    expect(result.improvement_summary).toMatchObject({
      score: {
        improved_cases: 1,
        regressed_cases: 1,
        tied_cases: 0,
        net_improvement: 0.17,
      },
      pass: {
        improved_cases: 1,
        regressed_cases: 1,
        tied_cases: 0,
        net_improvement: 0,
      },
    });
    expect(result.cases).toHaveLength(2);
    expect(result.cases[1]).toMatchObject({
      case_id: 'case-two',
      stronger_mode: 'without_skill',
      score_delta: -0.33,
      pass_delta: -1,
    });
  });

  it('returns zero rates and failed gates when a gate has no cases', ({ expect }) => {
    const result = buildBenchmarkArtifact(createBenchmarkParams([
      createCaseResult({
        should_trigger: false,
        expected_stop: 'do_not_trigger',
      }),
    ], {
      iterationNumber: 8,
      completedAt: '2026-03-13T01:00:00.000Z',
    }));

    expect(result.gate_results).toMatchObject({
      golden_pass_rate: 0,
      negative_pass_rate: 1,
      golden_gate_passed: false,
      negative_gate_passed: true,
      overall_passed: false,
    });
  });

  it('keeps gate decisions based on the unrounded ratio even when the displayed pass rate rounds to the threshold', ({ expect }) => {
    const result = buildBenchmarkArtifact(createBenchmarkParams([
      createCaseResult({ case_id: 'case-a' }),
      createCaseResult({ case_id: 'case-b' }),
      createCaseResult({
        case_id: 'case-c',
        with_skill: {
          status: 'completed',
          duration_ms: 140,
          score: 0.2,
          passed: false,
          provider: 'openai',
          model: 'gpt-4.1-mini',
          usage: { totalTokens: 5 },
        },
      }),
    ], {
      gates: {
        golden_pass_rate: 0.67,
        negative_pass_rate: 1,
        case_score_threshold: 0.75,
      },
    }));

    expect(result.gate_results).toMatchObject({
      golden_pass_rate: 0.67,
      golden_gate_passed: false,
    });
  });

  it('returns zeroed metrics and failed gates when there are no case results', ({ expect }) => {
    const result = buildBenchmarkArtifact(createBenchmarkParams([], {
      iterationNumber: 10,
      completedAt: '2026-03-13T03:00:00.000Z',
    }));

    expect(result).toMatchObject({
      status: 'completed',
      gate_results: {
        golden_pass_rate: 0,
        negative_pass_rate: 0,
        golden_gate_passed: false,
        negative_gate_passed: false,
        overall_passed: false,
        completed_case_count: 0,
        error_case_count: 0,
      },
      comparison: {
        with_skill: {
          pass_rate: 0,
          average_score: 0,
          average_duration_ms: 0,
          error_count: 0,
        },
        without_skill: {
          pass_rate: 0,
          average_score: 0,
          average_duration_ms: 0,
          error_count: 0,
        },
      },
      improvement_summary: {
        score: {
          improved_cases: 0,
          regressed_cases: 0,
          tied_cases: 0,
          net_improvement: 0,
        },
        pass: {
          improved_cases: 0,
          regressed_cases: 0,
          tied_cases: 0,
          net_improvement: 0,
        },
      },
      cases: [],
    });
  });

  it('counts one error case even when both modes errored and marks the run incomplete', ({ expect }) => {
    const result = buildBenchmarkArtifact(createBenchmarkParams([
      createCaseResult({
        with_skill: {
          status: 'error',
          duration_ms: 20,
          score: 0,
          passed: false,
          error: { kind: 'execution_error', message: 'boom' },
        },
        without_skill: {
          status: 'error',
          duration_ms: 30,
          score: 0,
          passed: false,
          error: { kind: 'timeout', message: 'slow' },
        },
      }),
    ], {
      iterationNumber: 9,
      completedAt: '2026-03-13T02:00:00.000Z',
    }));

    expect(result.status).toBe('completed_with_errors');
    expect(result.gate_results).toMatchObject({
      completed_case_count: 0,
      error_case_count: 1,
      overall_passed: false,
    });
    expect(result.comparison.with_skill.error_count).toBe(1);
    expect(result.comparison.without_skill.error_count).toBe(1);
    expect(result.comparison.deltas.error_count).toBe(0);
  });
});
