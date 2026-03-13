import * as fs from 'node:fs';
import * as path from 'node:path';

import type { EvalCaseMode } from '../../domain/baseline/baseline.js';
import { collectCases, type EvalDefinition } from '../../domain/eval-definition/eval-definition.types.js';
import { createErroredCaseGrading, gradeCase } from '../../domain/grading/grade-case.js';
import type { CaseGrading, GradingError } from '../../domain/grading/grading.types.js';

export type PromptfooModeOutput =
  | {
      status: 'completed';
      output: string;
      duration_ms: number;
      provider?: string;
      model?: string;
    }
  | {
      status: 'error';
      duration_ms: number;
      error: GradingError;
    };

export type PromptfooPilotScoringCase = {
  case_id: string;
  with_skill: CaseGrading;
  without_skill: CaseGrading;
};

export type PromptfooPilotScoringArtifact = {
  skill_name: string;
  eval_version: number;
  source_eval_path: string;
  source_promptfoo_output_path: string;
  scoring_strategy: 'deterministic_assertions_first';
  created_at: string;
  summary: {
    case_count: number;
    mode_evaluations: number;
    passed_modes: number;
    failed_modes: number;
    average_mode_score: number;
    fully_passed_cases: number;
  };
  cases: PromptfooPilotScoringCase[];
};

function parsePromptMode(prompt: unknown): EvalCaseMode | null {
  if (!prompt || typeof prompt !== 'object') {
    return null;
  }

  const source = `${String((prompt as { raw?: unknown }).raw ?? '')}\n${String((prompt as { label?: unknown }).label ?? '')}`;
  if (source.includes('[mode:with_skill]')) {
    return 'with_skill';
  }

  if (source.includes('[mode:without_skill]')) {
    return 'without_skill';
  }

  return null;
}

function parseProviderModel(providerId: string | undefined): { provider?: string; model?: string } {
  if (!providerId) {
    return {};
  }

  const [provider, ...modelParts] = providerId.split(':');
  return {
    provider: provider?.trim() || undefined,
    model: modelParts.join(':').trim() || undefined,
  };
}

function toExecutionError(message: string): GradingError {
  return {
    kind: 'execution_error',
    message,
  };
}

function readString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function readNumber(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function toPromptfooModeOutput(row: unknown): PromptfooModeOutput {
  const rowObject = row as {
    latencyMs?: unknown;
    failureReason?: unknown;
    provider?: { id?: unknown };
    response?: { output?: unknown; latencyMs?: unknown };
  };

  const durationMs = readNumber(rowObject.latencyMs) || readNumber(rowObject.response?.latencyMs);
  const failureReason = readString(rowObject.failureReason);
  const output = readString(rowObject.response?.output);

  if (!output || failureReason) {
    return {
      status: 'error',
      duration_ms: durationMs,
      error: toExecutionError(failureReason ?? 'missing response output'),
    };
  }

  const providerModel = parseProviderModel(readString(rowObject.provider?.id));
  return {
    status: 'completed',
    output,
    duration_ms: durationMs,
    provider: providerModel.provider,
    model: providerModel.model,
  };
}

function modeError(mode: EvalCaseMode, reason: string): PromptfooModeOutput {
  return {
    status: 'error',
    duration_ms: 0,
    error: toExecutionError(`missing ${mode} execution: ${reason}`),
  };
}

export function resolveGeneratedPromptfooScoringPath(skillName: string): string {
  return path.resolve('evals', 'engines', 'promptfoo', 'generated', `${skillName}.pilot.scoring.json`);
}

export function readPromptfooCaseModeOutputs(filePath: string): Map<string, Partial<Record<EvalCaseMode, PromptfooModeOutput>>> {
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8')) as {
    results?: {
      prompts?: unknown[];
      results?: unknown[];
    };
  };

  const prompts = Array.isArray(raw.results?.prompts) ? raw.results.prompts : [];
  const promptModesByIndex = new Map<number, EvalCaseMode>();
  prompts.forEach((prompt, index) => {
    const mode = parsePromptMode(prompt);
    if (mode) {
      promptModesByIndex.set(index, mode);
    }
  });

  const rows = Array.isArray(raw.results?.results) ? raw.results.results : [];
  const outputsByCase = new Map<string, Partial<Record<EvalCaseMode, PromptfooModeOutput>>>();

  for (const row of rows) {
    const rowObject = row as {
      promptIdx?: unknown;
      vars?: { case_id?: unknown };
      testCase?: { vars?: { case_id?: unknown } };
    };

    const promptIndex = readNumber(rowObject.promptIdx);
    const mode = promptModesByIndex.get(promptIndex);
    if (!mode) {
      continue;
    }

    const caseId = readString(rowObject.vars?.case_id) ?? readString(rowObject.testCase?.vars?.case_id);
    if (!caseId) {
      continue;
    }

    const existing = outputsByCase.get(caseId) ?? {};
    existing[mode] = toPromptfooModeOutput(row);
    outputsByCase.set(caseId, existing);
  }

  return outputsByCase;
}

function gradeMode(params: {
  caseDefinition: EvalDefinition['golden'][number] | EvalDefinition['negative'][number];
  mode: EvalCaseMode;
  modeOutput: PromptfooModeOutput;
  passingScoreThreshold: number;
}): CaseGrading {
  if (params.modeOutput.status === 'error') {
    return createErroredCaseGrading({
      caseDefinition: params.caseDefinition,
      mode: params.mode,
      error: params.modeOutput.error,
    });
  }

  return gradeCase({
    caseDefinition: params.caseDefinition,
    mode: params.mode,
    output: params.modeOutput.output,
    passingScoreThreshold: params.passingScoreThreshold,
  });
}

function roundToTwo(value: number): number {
  return Number(value.toFixed(2));
}

export function buildPromptfooPilotScoringArtifact(params: {
  definition: EvalDefinition;
  sourceEvalPath: string;
  sourcePromptfooOutputPath: string;
  caseModeOutputs: Map<string, Partial<Record<EvalCaseMode, PromptfooModeOutput>>>;
  createdAt?: string;
}): PromptfooPilotScoringArtifact {
  const cases = collectCases(params.definition);
  const scoringCases: PromptfooPilotScoringCase[] = [];

  for (const caseDefinition of cases) {
    const caseOutputs = params.caseModeOutputs.get(caseDefinition.id);
    const withSkillOutput = caseOutputs?.with_skill ?? modeError('with_skill', 'no row in promptfoo output');
    const withoutSkillOutput = caseOutputs?.without_skill ?? modeError('without_skill', 'no row in promptfoo output');

    const withSkill = gradeMode({
      caseDefinition,
      mode: 'with_skill',
      modeOutput: withSkillOutput,
      passingScoreThreshold: params.definition.gates.case_score_threshold,
    });
    const withoutSkill = gradeMode({
      caseDefinition,
      mode: 'without_skill',
      modeOutput: withoutSkillOutput,
      passingScoreThreshold: params.definition.gates.case_score_threshold,
    });

    scoringCases.push({
      case_id: caseDefinition.id,
      with_skill: withSkill,
      without_skill: withoutSkill,
    });
  }

  const modeEvaluations = scoringCases.length * 2;
  const passedModes = scoringCases.reduce(
    (count, result) => count + Number(result.with_skill.passed) + Number(result.without_skill.passed),
    0,
  );
  const failedModes = modeEvaluations - passedModes;
  const totalScore = scoringCases.reduce(
    (sum, result) => sum + result.with_skill.score + result.without_skill.score,
    0,
  );
  const fullyPassedCases = scoringCases.filter((result) => result.with_skill.passed && result.without_skill.passed).length;

  return {
    skill_name: params.definition.skill_name,
    eval_version: params.definition.eval_version,
    source_eval_path: params.sourceEvalPath,
    source_promptfoo_output_path: params.sourcePromptfooOutputPath,
    scoring_strategy: 'deterministic_assertions_first',
    created_at: params.createdAt ?? new Date().toISOString(),
    summary: {
      case_count: scoringCases.length,
      mode_evaluations: modeEvaluations,
      passed_modes: passedModes,
      failed_modes: failedModes,
      average_mode_score: modeEvaluations === 0 ? 0 : roundToTwo(totalScore / modeEvaluations),
      fully_passed_cases: fullyPassedCases,
    },
    cases: scoringCases,
  };
}

export function writePromptfooPilotScoringArtifact(filePath: string, artifact: PromptfooPilotScoringArtifact): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(artifact, null, 2)}\n`, 'utf8');
}
