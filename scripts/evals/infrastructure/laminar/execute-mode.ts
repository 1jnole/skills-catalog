import { createErroredCaseGrading, gradeCase } from '../../domain/grading/grade-case.js';
import { type EvalCase, type EvalCaseMode } from '../../domain/eval-case/eval-case.types.js';
import { type CaseGrading, type ModeArtifacts } from '../../domain/run-results/run-artifact.types.js';
import { summarizeLaminarModeResult, type LaminarModeExecutionResult } from './evaluators-adapter.js';
import { runText } from './executor.js';
import { buildSystemPrompt, loadCaseFiles } from './prompt-builder.js';

export async function executeMode(params: {
  skillName: string;
  caseDefinition: EvalCase;
  mode: EvalCaseMode;
  modelId: string;
  skillPrompt: string | null;
  passingScoreThreshold: number;
  timeoutMs: number;
}): Promise<{ modeArtifacts: ModeArtifacts; grading: CaseGrading }> {
  const systemPrompt = buildSystemPrompt(params.mode, params.skillPrompt);
  const attachedFiles = loadCaseFiles(params.skillName, params.caseDefinition);
  const execution = await runText({
    mode: params.mode,
    model: params.modelId,
    systemPrompt: systemPrompt ?? '',
    userPrompt: params.caseDefinition.prompt,
    files: attachedFiles,
    timeoutMs: params.timeoutMs,
  });

  if (execution.status === 'error') {
    const grading = createErroredCaseGrading({
      caseDefinition: params.caseDefinition,
      mode: params.mode,
      error: execution.error,
    });

    return {
      modeArtifacts: summarizeLaminarModeResult({
        result: execution,
        score: grading.score,
        passed: grading.passed,
      }),
      grading,
    };
  }

  const grading = gradeCase({
    caseDefinition: params.caseDefinition,
    mode: params.mode,
    output: execution.text,
    passingScoreThreshold: params.passingScoreThreshold,
  });

  const summarizedExecution: LaminarModeExecutionResult = {
    status: 'completed',
    durationMs: execution.durationMs,
    provider: execution.provider,
    model: execution.model,
    usage: execution.usage,
    output: execution.text,
  };

  return {
    modeArtifacts: summarizeLaminarModeResult({
      result: summarizedExecution,
      score: grading.score,
      passed: grading.passed,
    }),
    grading,
  };
}

