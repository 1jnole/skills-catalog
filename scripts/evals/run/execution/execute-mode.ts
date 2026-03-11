import { createErroredCaseGrading, gradeCase } from '../../grading/grade-case.js';
import { type EvalCase, type EvalCaseMode } from '../../domain/types/eval-case.types.js';
import { type ArtifactError, type CaseGrading, type ModeArtifacts } from '../../domain/types/run-artifact.types.js';
import { runOpenAiText } from '../../providers/openai-provider.js';
import { buildPrompt, buildSystemPrompt, loadCaseFiles } from './prompt-builder.js';

function classifyExecutionError(error: unknown): ArtifactError {
  const message = error instanceof Error ? error.message : String(error);
  const normalizedMessage = message.toLowerCase();

  return {
    kind: normalizedMessage.includes('timeout') ? 'timeout' : 'execution_error',
    message,
  };
}

export async function executeMode(params: {
  skillName: string;
  caseDefinition: EvalCase;
  mode: EvalCaseMode;
  modelId: string;
  skillPrompt: string | null;
  passingScoreThreshold: number;
}): Promise<{ modeArtifacts: ModeArtifacts; grading: CaseGrading }> {
  let prompt = params.caseDefinition.prompt;
  const systemPrompt = buildSystemPrompt(params.mode, params.skillPrompt);
  const startedAt = Date.now();

  try {
    const attachedFiles = loadCaseFiles(params.skillName, params.caseDefinition);
    prompt = buildPrompt(params.caseDefinition, attachedFiles);

    const execution = await runOpenAiText({
      modelId: params.modelId,
      prompt,
      system: systemPrompt,
    });
    const durationMs = Date.now() - startedAt;
    const grading = gradeCase({
      caseDefinition: params.caseDefinition,
      mode: params.mode,
      output: execution.text,
      passingScoreThreshold: params.passingScoreThreshold,
    });

    return {
      modeArtifacts: {
        status: 'completed',
        duration_ms: durationMs,
        provider: execution.provider,
        model: execution.modelId,
        score: grading.score,
        passed: grading.passed,
        usage: execution.usage,
      },
      grading,
    };
  } catch (error) {
    const durationMs = Date.now() - startedAt;
    const artifactError = classifyExecutionError(error);
    const grading = createErroredCaseGrading({
      caseDefinition: params.caseDefinition,
      mode: params.mode,
      error: artifactError,
    });

    return {
      modeArtifacts: {
        status: 'error',
        duration_ms: durationMs,
        score: grading.score,
        passed: grading.passed,
        error: artifactError,
      },
      grading,
    };
  }
}
