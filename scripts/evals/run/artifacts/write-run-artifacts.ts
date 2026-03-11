import * as path from 'node:path';

import { buildBenchmarkArtifact, resolveStrongerMode } from '../../domain/services/benchmark.js';
import { buildRunManifestArtifact } from '../../domain/services/run-results.js';
import {
  benchmarkArtifactSchema,
  caseFeedbackArtifactSchema,
  caseGradingArtifactSchema,
  caseTimingArtifactSchema,
} from '../../domain/schemas/run-artifact.schema.js';
import { runManifestArtifactSchema } from '../../domain/schemas/run-result.schema.js';
import { type EvalDefinition } from '../../domain/types/eval-definition.types.js';
import { type EvalCaseMode } from '../../domain/types/eval-case.types.js';
import {
  type CaseFeedbackArtifact,
  type CaseGrading,
  type CaseGradingArtifact,
  type CaseTimingArtifact,
} from '../../domain/types/run-artifact.types.js';
import { type CaseArtifacts } from '../../domain/types/run.types.js';
import { type NormalizedCaseResult } from '../../domain/types/run-result.types.js';
import { writeValidatedJsonFile } from '../../shared/json.js';

function roundToTwo(value: number): number {
  return Number(value.toFixed(2));
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
  caseResults: NormalizedCaseResult[];
  gates: EvalDefinition['gates'];
}): void {
  const benchmarkArtifact = buildBenchmarkArtifact({
    skillName: params.skillName,
    evalVersion: params.evalVersion,
    iterationNumber: params.iterationNumber,
    caseResults: params.caseResults,
    gates: params.gates,
  });

  writeValidatedJsonFile(params.benchmarkPath, benchmarkArtifactSchema, benchmarkArtifact);
}

export function writeRunManifest(params: {
  runManifestPath: string;
  skillName: string;
  evalVersion: number;
  iterationNumber: number;
  provider: string;
  model: string;
}): void {
  const runManifestArtifact = buildRunManifestArtifact({
    skillName: params.skillName,
    evalVersion: params.evalVersion,
    iterationNumber: params.iterationNumber,
    provider: params.provider,
    model: params.model,
  });

  writeValidatedJsonFile(params.runManifestPath, runManifestArtifactSchema, runManifestArtifact);
}
