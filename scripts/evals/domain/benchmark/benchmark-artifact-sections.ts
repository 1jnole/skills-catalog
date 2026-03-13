import { type EvalDefinition } from '../eval-definition/eval-definition.types.js';
import type {
  BenchmarkComparison,
  BenchmarkGateResults,
  BenchmarkImprovementSummary,
  BenchmarkRollup,
} from './benchmark.types.js';

import { roundToTwo, safeAverage, safeAverageDuration, safeRate } from './benchmark-metrics.js';

export function buildBenchmarkComparison(modeTotals: BenchmarkRollup['modeTotals']): BenchmarkComparison {
  const withSkillPassRate = safeRate(modeTotals.with_skill.passed, modeTotals.with_skill.total);
  const withoutSkillPassRate = safeRate(modeTotals.without_skill.passed, modeTotals.without_skill.total);
  const withSkillAverageScore = safeAverage(modeTotals.with_skill.totalScore, modeTotals.with_skill.total);
  const withoutSkillAverageScore = safeAverage(modeTotals.without_skill.totalScore, modeTotals.without_skill.total);
  const withSkillAverageDuration = safeAverageDuration(modeTotals.with_skill.totalDurationMs, modeTotals.with_skill.total);
  const withoutSkillAverageDuration = safeAverageDuration(modeTotals.without_skill.totalDurationMs, modeTotals.without_skill.total);

  return {
    with_skill: {
      pass_rate: withSkillPassRate,
      average_score: withSkillAverageScore,
      average_duration_ms: withSkillAverageDuration,
      error_count: modeTotals.with_skill.errorCount,
    },
    without_skill: {
      pass_rate: withoutSkillPassRate,
      average_score: withoutSkillAverageScore,
      average_duration_ms: withoutSkillAverageDuration,
      error_count: modeTotals.without_skill.errorCount,
    },
    deltas: {
      pass_rate: roundToTwo(withSkillPassRate - withoutSkillPassRate),
      average_score: roundToTwo(withSkillAverageScore - withoutSkillAverageScore),
      average_duration_ms: withSkillAverageDuration - withoutSkillAverageDuration,
      error_count: modeTotals.with_skill.errorCount - modeTotals.without_skill.errorCount,
    },
  };
}

export function buildBenchmarkGateResults(params: {
  gateTotals: BenchmarkRollup['gateTotals'];
  gates: EvalDefinition['gates'];
  caseCount: number;
  errorCaseCount: number;
}): BenchmarkGateResults {
  const goldenPassRate = safeRate(params.gateTotals.goldenPassed, params.gateTotals.goldenTotal);
  const negativePassRate = safeRate(params.gateTotals.negativePassed, params.gateTotals.negativeTotal);
  const goldenGatePassed =
    params.gateTotals.goldenTotal > 0 &&
    params.gateTotals.goldenPassed / params.gateTotals.goldenTotal >= params.gates.golden_pass_rate;
  const negativeGatePassed =
    params.gateTotals.negativeTotal > 0 &&
    params.gateTotals.negativePassed / params.gateTotals.negativeTotal >= params.gates.negative_pass_rate;

  return {
    golden_pass_rate: goldenPassRate,
    negative_pass_rate: negativePassRate,
    case_score_threshold: params.gates.case_score_threshold,
    golden_gate_passed: goldenGatePassed,
    negative_gate_passed: negativeGatePassed,
    overall_passed: goldenGatePassed && negativeGatePassed && params.errorCaseCount === 0,
    completed_case_count: params.caseCount - params.errorCaseCount,
    error_case_count: params.errorCaseCount,
  };
}

export function buildBenchmarkImprovementSummary(
  improvementTotals: BenchmarkRollup['improvementTotals'],
  modeTotals: BenchmarkRollup['modeTotals'],
): BenchmarkImprovementSummary {
  return {
    score: {
      improved_cases: improvementTotals.scoreImprovedCases,
      regressed_cases: improvementTotals.scoreRegressedCases,
      tied_cases: improvementTotals.scoreTiedCases,
      net_improvement: roundToTwo(modeTotals.with_skill.totalScore - modeTotals.without_skill.totalScore),
    },
    pass: {
      improved_cases: improvementTotals.passImprovedCases,
      regressed_cases: improvementTotals.passRegressedCases,
      tied_cases: improvementTotals.passTiedCases,
      net_improvement: modeTotals.with_skill.passed - modeTotals.without_skill.passed,
    },
  };
}

