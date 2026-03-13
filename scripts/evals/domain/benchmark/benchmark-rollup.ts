import type { BenchmarkCaseSummary, BenchmarkModeTotals, BenchmarkRollup } from './benchmark.types.js';

function createModeTotals(): BenchmarkModeTotals {
  return {
    passed: 0,
    total: 0,
    totalScore: 0,
    totalDurationMs: 0,
    errorCount: 0,
  };
}

export function createBenchmarkRollup(): BenchmarkRollup {
  return {
    modeTotals: {
      with_skill: createModeTotals(),
      without_skill: createModeTotals(),
    },
    gateTotals: {
      goldenPassed: 0,
      goldenTotal: 0,
      negativePassed: 0,
      negativeTotal: 0,
    },
    improvementTotals: {
      scoreImprovedCases: 0,
      scoreRegressedCases: 0,
      scoreTiedCases: 0,
      passImprovedCases: 0,
      passRegressedCases: 0,
      passTiedCases: 0,
    },
    errorCaseCount: 0,
  };
}

function recordImprovement(
  improvementTotals: BenchmarkRollup['improvementTotals'],
  scoreDelta: number,
  passDelta: number,
): void {
  if (scoreDelta > 0) {
    improvementTotals.scoreImprovedCases += 1;
  } else if (scoreDelta < 0) {
    improvementTotals.scoreRegressedCases += 1;
  } else {
    improvementTotals.scoreTiedCases += 1;
  }

  if (passDelta > 0) {
    improvementTotals.passImprovedCases += 1;
  } else if (passDelta < 0) {
    improvementTotals.passRegressedCases += 1;
  } else {
    improvementTotals.passTiedCases += 1;
  }
}

function recordModeTotals(
  modeTotals: BenchmarkModeTotals,
  modeResult: BenchmarkCaseSummary['withSkill'] | BenchmarkCaseSummary['withoutSkill'],
): void {
  modeTotals.total += 1;
  modeTotals.totalScore += modeResult.score;
  modeTotals.totalDurationMs += modeResult.duration_ms;

  if (modeResult.passed) {
    modeTotals.passed += 1;
  }

  if (modeResult.error) {
    modeTotals.errorCount += 1;
  }
}

function recordGateTotals(
  gateTotals: BenchmarkRollup['gateTotals'],
  summary: BenchmarkCaseSummary,
): void {
  if (summary.isTriggerCase) {
    gateTotals.goldenTotal += 1;
    if (summary.withSkill.passed) {
      gateTotals.goldenPassed += 1;
    }
    return;
  }

  gateTotals.negativeTotal += 1;
  if (summary.withSkill.passed) {
    gateTotals.negativePassed += 1;
  }
}

export function reduceBenchmarkRollup(
  rollup: BenchmarkRollup,
  summary: BenchmarkCaseSummary,
): BenchmarkRollup {
  recordImprovement(rollup.improvementTotals, summary.scoreDelta, summary.passDelta);
  recordModeTotals(rollup.modeTotals.with_skill, summary.withSkill);
  recordModeTotals(rollup.modeTotals.without_skill, summary.withoutSkill);
  recordGateTotals(rollup.gateTotals, summary);

  if (summary.hasCaseError) {
    rollup.errorCaseCount += 1;
  }

  return rollup;
}
