import * as path from 'node:path';

import {
  benchmarkArtifactSchema,
  caseFeedbackArtifactSchema,
  caseGradingArtifactSchema,
  caseTimingArtifactSchema,
} from '../../domain/schemas/run-artifact.schema.js';
import { type EvalDefinition } from '../../domain/types/eval-definition.types.js';
import { type EvalCaseMode } from '../../domain/types/eval-case.types.js';
import {
  type BenchmarkArtifact,
  type CaseBenchmarkEntry,
  type CaseFeedbackArtifact,
  type CaseGrading,
  type CaseGradingArtifact,
  type CaseTimingArtifact,
} from '../../domain/types/run-artifact.types.js';
import { type CaseArtifacts } from '../../domain/types/run.types.js';
import { writeValidatedJsonFile } from '../../shared/json.js';

function roundToTwo(value: number): number {
  return Number(value.toFixed(2));
}

function safeRate(numerator: number, denominator: number): number {
  if (denominator === 0) {
    return 0;
  }

  return roundToTwo(numerator / denominator);
}

function safeAverage(total: number, count: number): number {
  if (count === 0) {
    return 0;
  }

  return roundToTwo(total / count);
}

function safeAverageDuration(totalDurationMs: number, count: number): number {
  if (count === 0) {
    return 0;
  }

  return Math.round(totalDurationMs / count);
}

function resolveStrongerMode(caseArtifacts: CaseArtifacts): CaseFeedbackArtifact['stronger_mode'] {
  const scoreDelta = roundToTwo(caseArtifacts.with_skill.score - caseArtifacts.without_skill.score);
  return scoreDelta === 0 ? 'tie' : scoreDelta > 0 ? 'with_skill' : 'without_skill';
}

function buildFeedbackObservations(caseArtifacts: CaseArtifacts): string[] {
  const observations = [
    `with_skill score: ${caseArtifacts.with_skill.score}`,
    `without_skill score: ${caseArtifacts.without_skill.score}`,
  ];

  if (caseArtifacts.with_skill.error) {
    observations.push(`with_skill error: ${caseArtifacts.with_skill.error.kind} - ${caseArtifacts.with_skill.error.message}`);
  }
  if (caseArtifacts.without_skill.error) {
    observations.push(`without_skill error: ${caseArtifacts.without_skill.error.kind} - ${caseArtifacts.without_skill.error.message}`);
  }

  return observations;
}

function buildFeedbackNextActions(caseArtifacts: CaseArtifacts, strongerMode: CaseFeedbackArtifact['stronger_mode']): string[] {
  if (caseArtifacts.with_skill.error || caseArtifacts.without_skill.error) {
    return ['Inspect the errored mode output and provider settings before trusting this case for benchmark conclusions.'];
  }

  if (strongerMode === 'with_skill') {
    return ['Keep this case in the regression set and inspect any remaining failing assertions.'];
  }

  return ['Inspect prompt quality, grading heuristics, or skill instructions because the baseline did not underperform.'];
}

export function writeCaseSummaryArtifacts(
  caseDir: string,
  modeGradings: Record<EvalCaseMode, CaseGrading>,
  caseArtifacts: CaseArtifacts,
): void {
  const timingArtifact: CaseTimingArtifact = {
    with_skill: caseArtifacts.with_skill.duration_ms,
    without_skill: caseArtifacts.without_skill.duration_ms,
  };
  writeValidatedJsonFile(path.join(caseDir, 'timing.json'), caseTimingArtifactSchema, timingArtifact);

  const gradingArtifact: CaseGradingArtifact = {
    with_skill: modeGradings.with_skill,
    without_skill: modeGradings.without_skill,
  };
  writeValidatedJsonFile(path.join(caseDir, 'grading.json'), caseGradingArtifactSchema, gradingArtifact);

  const scoreDelta = roundToTwo(caseArtifacts.with_skill.score - caseArtifacts.without_skill.score);
  const strongerMode = resolveStrongerMode(caseArtifacts);
  const feedbackArtifact: CaseFeedbackArtifact = {
    case_id: caseArtifacts.case_id,
    stronger_mode: strongerMode,
    score_delta: scoreDelta,
    observations: buildFeedbackObservations(caseArtifacts),
    next_actions: buildFeedbackNextActions(caseArtifacts, strongerMode),
  };
  writeValidatedJsonFile(path.join(caseDir, 'feedback.json'), caseFeedbackArtifactSchema, feedbackArtifact);
}

export function writeBenchmark(params: {
  benchmarkPath: string;
  skillName: string;
  evalVersion: number;
  iterationNumber: number;
  caseResults: CaseArtifacts[];
  gates: EvalDefinition['gates'];
}): void {
  const totals = {
    with_skill: { passed: 0, total: 0, totalScore: 0, totalDurationMs: 0, errorCount: 0 },
    without_skill: { passed: 0, total: 0, totalScore: 0, totalDurationMs: 0, errorCount: 0 },
  };

  let goldenPassed = 0;
  let goldenTotal = 0;
  let negativePassed = 0;
  let negativeTotal = 0;
  let scoreImprovedCases = 0;
  let scoreRegressedCases = 0;
  let scoreTiedCases = 0;
  let passImprovedCases = 0;
  let passRegressedCases = 0;
  let passTiedCases = 0;
  let errorCaseCount = 0;

  const caseEntries: CaseBenchmarkEntry[] = params.caseResults.map((caseResult) => {
    const scoreDelta = roundToTwo(caseResult.with_skill.score - caseResult.without_skill.score);
    const passDelta = Number(caseResult.with_skill.passed) - Number(caseResult.without_skill.passed);
    const strongerMode = resolveStrongerMode(caseResult);
    const hasCaseError = Boolean(caseResult.with_skill.error || caseResult.without_skill.error);

    if (scoreDelta > 0) {
      scoreImprovedCases += 1;
    } else if (scoreDelta < 0) {
      scoreRegressedCases += 1;
    } else {
      scoreTiedCases += 1;
    }

    if (passDelta > 0) {
      passImprovedCases += 1;
    } else if (passDelta < 0) {
      passRegressedCases += 1;
    } else {
      passTiedCases += 1;
    }

    totals.with_skill.total += 1;
    totals.without_skill.total += 1;
    totals.with_skill.totalScore += caseResult.with_skill.score;
    totals.without_skill.totalScore += caseResult.without_skill.score;
    totals.with_skill.totalDurationMs += caseResult.with_skill.duration_ms;
    totals.without_skill.totalDurationMs += caseResult.without_skill.duration_ms;

    if (caseResult.with_skill.passed) {
      totals.with_skill.passed += 1;
    }
    if (caseResult.without_skill.passed) {
      totals.without_skill.passed += 1;
    }
    if (caseResult.with_skill.error) {
      totals.with_skill.errorCount += 1;
    }
    if (caseResult.without_skill.error) {
      totals.without_skill.errorCount += 1;
    }
    if (hasCaseError) {
      errorCaseCount += 1;
    }

    if (caseResult.should_trigger) {
      goldenTotal += 1;
      if (caseResult.with_skill.passed) {
        goldenPassed += 1;
      }
    } else {
      negativeTotal += 1;
      if (caseResult.with_skill.passed) {
        negativePassed += 1;
      }
    }

    return {
      case_id: caseResult.case_id,
      should_trigger: caseResult.should_trigger,
      expected_stop: caseResult.expected_stop,
      stronger_mode: strongerMode,
      score_delta: scoreDelta,
      pass_delta: passDelta,
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
  });

  const withSkillPassRate = safeRate(totals.with_skill.passed, totals.with_skill.total);
  const withoutSkillPassRate = safeRate(totals.without_skill.passed, totals.without_skill.total);
  const withSkillAverageScore = safeAverage(totals.with_skill.totalScore, totals.with_skill.total);
  const withoutSkillAverageScore = safeAverage(totals.without_skill.totalScore, totals.without_skill.total);
  const withSkillAverageDuration = safeAverageDuration(totals.with_skill.totalDurationMs, totals.with_skill.total);
  const withoutSkillAverageDuration = safeAverageDuration(totals.without_skill.totalDurationMs, totals.without_skill.total);
  const goldenPassRate = safeRate(goldenPassed, goldenTotal);
  const negativePassRate = safeRate(negativePassed, negativeTotal);
  const goldenGatePassed = goldenTotal > 0 && goldenPassed / goldenTotal >= params.gates.golden_pass_rate;
  const negativeGatePassed = negativeTotal > 0 && negativePassed / negativeTotal >= params.gates.negative_pass_rate;
  const overallPassed = goldenGatePassed && negativeGatePassed && errorCaseCount === 0;

  const benchmarkArtifact: BenchmarkArtifact = {
    status: errorCaseCount === 0 ? 'completed' : 'completed_with_errors',
    skill_name: params.skillName,
    eval_version: params.evalVersion,
    iteration: params.iterationNumber,
    completed_at: new Date().toISOString(),
    gate_results: {
      golden_pass_rate: goldenPassRate,
      negative_pass_rate: negativePassRate,
      case_score_threshold: params.gates.case_score_threshold,
      golden_gate_passed: goldenGatePassed,
      negative_gate_passed: negativeGatePassed,
      overall_passed: overallPassed,
      completed_case_count: params.caseResults.length - errorCaseCount,
      error_case_count: errorCaseCount,
    },
    comparison: {
      with_skill: {
        pass_rate: withSkillPassRate,
        average_score: withSkillAverageScore,
        average_duration_ms: withSkillAverageDuration,
        error_count: totals.with_skill.errorCount,
      },
      without_skill: {
        pass_rate: withoutSkillPassRate,
        average_score: withoutSkillAverageScore,
        average_duration_ms: withoutSkillAverageDuration,
        error_count: totals.without_skill.errorCount,
      },
      deltas: {
        pass_rate: roundToTwo(withSkillPassRate - withoutSkillPassRate),
        average_score: roundToTwo(withSkillAverageScore - withoutSkillAverageScore),
        average_duration_ms: withSkillAverageDuration - withoutSkillAverageDuration,
        error_count: totals.with_skill.errorCount - totals.without_skill.errorCount,
      },
    },
    improvement_summary: {
      score: {
        improved_cases: scoreImprovedCases,
        regressed_cases: scoreRegressedCases,
        tied_cases: scoreTiedCases,
        net_improvement: roundToTwo(totals.with_skill.totalScore - totals.without_skill.totalScore),
      },
      pass: {
        improved_cases: passImprovedCases,
        regressed_cases: passRegressedCases,
        tied_cases: passTiedCases,
        net_improvement: totals.with_skill.passed - totals.without_skill.passed,
      },
    },
    cases: caseEntries,
  };

  writeValidatedJsonFile(params.benchmarkPath, benchmarkArtifactSchema, benchmarkArtifact);
}
