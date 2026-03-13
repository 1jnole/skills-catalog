import fs from 'node:fs';
import path from 'node:path';

import { resolvePromptfooPath } from './paths.mjs';
import { loadSkillForgeSuite } from './suite-loader.mjs';

const DEFAULT_INPUT = resolvePromptfooPath('generated', 'skill-forge.eval.json');
const DEFAULT_OUTPUT = resolvePromptfooPath('generated', 'skill-forge.benchmark.json');

function parseArgs(argv) {
  const options = {
    input: DEFAULT_INPUT,
    output: DEFAULT_OUTPUT,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const next = argv[index + 1];

    if (token === '--input' && next) {
      options.input = next;
      index += 1;
      continue;
    }

    if (token === '--output' && next) {
      options.output = next;
      index += 1;
    }
  }

  return options;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function roundToTwo(value) {
  return Number(value.toFixed(2));
}

function safeRate(numerator, denominator) {
  return denominator === 0 ? 0 : roundToTwo(numerator / denominator);
}

function safeAverage(total, count) {
  return count === 0 ? 0 : roundToTwo(total / count);
}

function safeAverageDuration(totalDurationMs, count) {
  return count === 0 ? 0 : Math.round(totalDurationMs / count);
}

function createModeTotals() {
  return {
    passed: 0,
    total: 0,
    totalScore: 0,
    totalDurationMs: 0,
    errorCount: 0,
  };
}

function createRollup() {
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

function createExecutionError(message) {
  return {
    kind: 'execution_error',
    message,
  };
}

function getPromptLabel(promptDefinitions, row) {
  if (typeof row?.prompt?.label === 'string' && row.prompt.label.length > 0) {
    return row.prompt.label;
  }

  return promptDefinitions[row?.promptIdx]?.label ?? null;
}

function getScore(row) {
  const score = row?.score ?? row?.gradingResult?.score;
  return typeof score === 'number' && Number.isFinite(score) ? score : 0;
}

function getDurationMs(row) {
  const latency = row?.latencyMs ?? row?.response?.latencyMs;
  return typeof latency === 'number' && Number.isFinite(latency) ? latency : 0;
}

function getRowError(row) {
  const responseError = row?.response?.error;
  if (typeof responseError === 'string' && responseError.length > 0) {
    return createExecutionError(responseError);
  }

  const message = row?.error ?? row?.failureReason;
  if (typeof message === 'string' && message.length > 0) {
    return createExecutionError(message);
  }

  return undefined;
}

function normalizeModeResult(row, threshold, missingMessage) {
  if (!row) {
    return {
      status: 'error',
      score: 0,
      passed: false,
      duration_ms: 0,
      error: createExecutionError(missingMessage),
    };
  }

  const score = getScore(row);
  const error = getRowError(row);

  return {
    status: error ? 'error' : 'completed',
    score,
    passed: score >= threshold,
    duration_ms: getDurationMs(row),
    ...(error ? { error } : {}),
  };
}

function resolveStrongerMode(caseEntry) {
  return caseEntry.score_delta === 0 ? 'tie' : caseEntry.score_delta > 0 ? 'with_skill' : 'without_skill';
}

function buildCaseEntry(caseDefinition, rowsByMode, threshold) {
  const withSkill = normalizeModeResult(
    rowsByMode.with_skill,
    threshold,
    `Missing Promptfoo result for case "${caseDefinition.id}" in with_skill mode.`,
  );
  const withoutSkill = normalizeModeResult(
    rowsByMode.without_skill,
    threshold,
    `Missing Promptfoo result for case "${caseDefinition.id}" in without_skill mode.`,
  );

  const scoreDelta = roundToTwo(withSkill.score - withoutSkill.score);
  const passDelta = Number(withSkill.passed) - Number(withoutSkill.passed);
  const caseEntry = {
    case_id: caseDefinition.id,
    should_trigger: caseDefinition.should_trigger,
    expected_stop: caseDefinition.stop_at,
    score_delta: scoreDelta,
    pass_delta: passDelta,
    with_skill: withSkill,
    without_skill: withoutSkill,
  };

  return {
    ...caseEntry,
    stronger_mode: resolveStrongerMode(caseEntry),
  };
}

function recordImprovement(rollup, caseEntry) {
  if (caseEntry.score_delta > 0) {
    rollup.improvementTotals.scoreImprovedCases += 1;
  } else if (caseEntry.score_delta < 0) {
    rollup.improvementTotals.scoreRegressedCases += 1;
  } else {
    rollup.improvementTotals.scoreTiedCases += 1;
  }

  if (caseEntry.pass_delta > 0) {
    rollup.improvementTotals.passImprovedCases += 1;
  } else if (caseEntry.pass_delta < 0) {
    rollup.improvementTotals.passRegressedCases += 1;
  } else {
    rollup.improvementTotals.passTiedCases += 1;
  }
}

function recordModeTotals(modeTotals, modeResult) {
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

function recordGateTotals(rollup, caseEntry) {
  if (caseEntry.should_trigger) {
    rollup.gateTotals.goldenTotal += 1;
    if (caseEntry.with_skill.passed) {
      rollup.gateTotals.goldenPassed += 1;
    }
    return;
  }

  rollup.gateTotals.negativeTotal += 1;
  if (caseEntry.with_skill.passed) {
    rollup.gateTotals.negativePassed += 1;
  }
}

function reduceRollup(rollup, caseEntry) {
  recordImprovement(rollup, caseEntry);
  recordModeTotals(rollup.modeTotals.with_skill, caseEntry.with_skill);
  recordModeTotals(rollup.modeTotals.without_skill, caseEntry.without_skill);
  recordGateTotals(rollup, caseEntry);

  if (caseEntry.with_skill.error || caseEntry.without_skill.error) {
    rollup.errorCaseCount += 1;
  }
}

function buildComparison(modeTotals) {
  const withSkillPassRate = safeRate(modeTotals.with_skill.passed, modeTotals.with_skill.total);
  const withoutSkillPassRate = safeRate(modeTotals.without_skill.passed, modeTotals.without_skill.total);
  const withSkillAverageScore = safeAverage(modeTotals.with_skill.totalScore, modeTotals.with_skill.total);
  const withoutSkillAverageScore = safeAverage(modeTotals.without_skill.totalScore, modeTotals.without_skill.total);
  const withSkillAverageDuration = safeAverageDuration(
    modeTotals.with_skill.totalDurationMs,
    modeTotals.with_skill.total,
  );
  const withoutSkillAverageDuration = safeAverageDuration(
    modeTotals.without_skill.totalDurationMs,
    modeTotals.without_skill.total,
  );

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

function buildGateResults(rollup, gates, caseCount) {
  const goldenPassRate = safeRate(rollup.gateTotals.goldenPassed, rollup.gateTotals.goldenTotal);
  const negativePassRate = safeRate(rollup.gateTotals.negativePassed, rollup.gateTotals.negativeTotal);
  const goldenGatePassed =
    rollup.gateTotals.goldenTotal > 0 &&
    rollup.gateTotals.goldenPassed / rollup.gateTotals.goldenTotal >= gates.golden_pass_rate;
  const negativeGatePassed =
    rollup.gateTotals.negativeTotal > 0 &&
    rollup.gateTotals.negativePassed / rollup.gateTotals.negativeTotal >= gates.negative_pass_rate;

  return {
    golden_pass_rate: goldenPassRate,
    negative_pass_rate: negativePassRate,
    case_score_threshold: gates.case_score_threshold,
    golden_gate_passed: goldenGatePassed,
    negative_gate_passed: negativeGatePassed,
    overall_passed: goldenGatePassed && negativeGatePassed && rollup.errorCaseCount === 0,
    completed_case_count: caseCount - rollup.errorCaseCount,
    error_case_count: rollup.errorCaseCount,
  };
}

function buildImprovementSummary(rollup) {
  return {
    score: {
      improved_cases: rollup.improvementTotals.scoreImprovedCases,
      regressed_cases: rollup.improvementTotals.scoreRegressedCases,
      tied_cases: rollup.improvementTotals.scoreTiedCases,
      net_improvement: roundToTwo(rollup.modeTotals.with_skill.totalScore - rollup.modeTotals.without_skill.totalScore),
    },
    pass: {
      improved_cases: rollup.improvementTotals.passImprovedCases,
      regressed_cases: rollup.improvementTotals.passRegressedCases,
      tied_cases: rollup.improvementTotals.passTiedCases,
      net_improvement: rollup.modeTotals.with_skill.passed - rollup.modeTotals.without_skill.passed,
    },
  };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const suite = loadSkillForgeSuite();
  const evalArtifact = readJson(options.input);
  const promptDefinitions = evalArtifact?.results?.prompts ?? [];
  const resultRows = Array.isArray(evalArtifact?.results?.results) ? evalArtifact.results.results : [];
  const rowsByCase = new Map();

  for (const row of resultRows) {
    const caseId = row?.vars?.case_id;
    const mode = getPromptLabel(promptDefinitions, row);

    if (typeof caseId !== 'string' || (mode !== 'with_skill' && mode !== 'without_skill')) {
      continue;
    }

    const existing = rowsByCase.get(caseId) ?? {};
    existing[mode] = row;
    rowsByCase.set(caseId, existing);
  }

  const allCases = [...suite.golden, ...suite.negative];
  const caseEntries = allCases.map((caseDefinition) =>
    buildCaseEntry(caseDefinition, rowsByCase.get(caseDefinition.id) ?? {}, suite.gates.case_score_threshold),
  );
  const rollup = createRollup();

  for (const caseEntry of caseEntries) {
    reduceRollup(rollup, caseEntry);
  }

  const benchmarkArtifact = {
    status: rollup.errorCaseCount === 0 ? 'completed' : 'completed_with_errors',
    skill_name: suite.skill_name,
    eval_version: suite.eval_version,
    iteration: 1,
    completed_at: evalArtifact?.results?.timestamp ?? new Date().toISOString(),
    gate_results: buildGateResults(rollup, suite.gates, caseEntries.length),
    comparison: buildComparison(rollup.modeTotals),
    improvement_summary: buildImprovementSummary(rollup),
    cases: caseEntries,
  };

  writeJson(options.output, benchmarkArtifact);
  console.log(`Wrote ${options.output}`);
}

main();
