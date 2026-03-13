import { type CaseBenchmarkEntry, type CaseFeedbackArtifact } from '../types/run-artifact.types.js';
import { type NormalizedCaseResult } from '../types/run-result.types.js';
import type { BenchmarkCaseSummary } from '../types/benchmark.types.js';

import { roundToTwo } from './benchmark-metrics.js';

function calculateScoreDelta(caseResult: NormalizedCaseResult): number {
  return roundToTwo(caseResult.with_skill.score - caseResult.without_skill.score);
}

function calculatePassDelta(caseResult: NormalizedCaseResult): number {
  return Number(caseResult.with_skill.passed) - Number(caseResult.without_skill.passed);
}

export function resolveStrongerMode(caseResult: NormalizedCaseResult): CaseFeedbackArtifact['stronger_mode'] {
  const scoreDelta = calculateScoreDelta(caseResult);
  return scoreDelta === 0 ? 'tie' : scoreDelta > 0 ? 'with_skill' : 'without_skill';
}

function buildCaseBenchmarkEntry(caseResult: NormalizedCaseResult): CaseBenchmarkEntry {
  return {
    case_id: caseResult.case_id,
    should_trigger: caseResult.should_trigger,
    expected_stop: caseResult.expected_stop,
    stronger_mode: resolveStrongerMode(caseResult),
    score_delta: calculateScoreDelta(caseResult),
    pass_delta: calculatePassDelta(caseResult),
    with_skill: {
      status: caseResult.with_skill.status,
      score: caseResult.with_skill.score,
      passed: caseResult.with_skill.passed,
      duration_ms: caseResult.with_skill.duration_ms,
      error: caseResult.with_skill.error,
    },
    without_skill: {
      status: caseResult.without_skill.status,
      score: caseResult.without_skill.score,
      passed: caseResult.without_skill.passed,
      duration_ms: caseResult.without_skill.duration_ms,
      error: caseResult.without_skill.error,
    },
  };
}

export function summarizeBenchmarkCase(caseResult: NormalizedCaseResult): BenchmarkCaseSummary {
  return {
    caseEntry: buildCaseBenchmarkEntry(caseResult),
    scoreDelta: calculateScoreDelta(caseResult),
    passDelta: calculatePassDelta(caseResult),
    hasCaseError: Boolean(caseResult.with_skill.error || caseResult.without_skill.error),
    isTriggerCase: caseResult.should_trigger,
    withSkill: caseResult.with_skill,
    withoutSkill: caseResult.without_skill,
  };
}
