import * as process from 'node:process';

import { type EvalCaseMode } from '../../domain/eval-case/eval-case.types.js';
import { type ArtifactError, type Usage } from '../../domain/run-results/run-artifact.types.js';
import { assertOpenAiReady, runOpenAiText } from '../providers/openai/openai-provider.js';

// Owns Laminar executor readiness and the internal model-call contract.
export type LaminarModelProvider = 'openai';

export type RunTextRequestFile = {
  path: string;
  content: string;
};

export type RunTextParams = {
  mode: EvalCaseMode;
  model: string;
  systemPrompt: string;
  userPrompt: string;
  files: RunTextRequestFile[];
  timeoutMs: number;
};

export type RunTextSuccess = {
  status: 'completed';
  text: string;
  provider: LaminarModelProvider;
  model: string;
  usage: Usage;
  durationMs: number;
};

export type RunTextFailure = {
  status: 'error';
  error: ArtifactError;
  durationMs: number;
};

export type RunTextResult = RunTextSuccess | RunTextFailure;

export function getLaminarSdkPackageName(): '@lmnr-ai/lmnr' {
  return '@lmnr-ai/lmnr';
}

function missingLaminarDependencyMessage(): string {
  return 'Laminar dependencies are not installed. Add `@lmnr-ai/lmnr` to the repo before running Laminar-backed evals.';
}

function parsePositiveIntegerEnv(name: string, fallback: number): number {
  const rawValue = process.env[name];
  if (!rawValue) {
    return fallback;
  }

  const parsedValue = Number.parseInt(rawValue, 10);
  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(`${name} must be a positive integer. Received: ${rawValue}`);
  }

  return parsedValue;
}

function readLaminarProjectApiKey(): string {
  const apiKey = process.env.LMNR_PROJECT_API_KEY ?? process.env.LMNR_API_KEY;

  if (!apiKey) {
    throw new Error('LMNR_PROJECT_API_KEY is required for Laminar-backed eval runs. LMNR_API_KEY is also accepted as a compatibility alias.');
  }

  return apiKey;
}

async function importLaminarModule(): Promise<{ Laminar?: { initialize?: (params: { projectApiKey: string }) => void } }> {
  const moduleName = getLaminarSdkPackageName();

  try {
    const module = await import(moduleName);
    const laminar = (module as Record<string, unknown>).Laminar;

    return {
      Laminar: typeof laminar === 'object' && laminar ? (laminar as { initialize?: (params: { projectApiKey: string }) => void }) : undefined,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`${missingLaminarDependencyMessage()} Original error: ${reason}`);
  }
}

function buildPromptWithFiles(userPrompt: string, files: RunTextRequestFile[]): string {
  if (files.length === 0) {
    return userPrompt;
  }

  const fileSection = files
    .map((file) => `--- ${file.path} ---\n${file.content}`)
    .join('\n\n');

  return `${userPrompt}\n\nAttached files:\n${fileSection}`;
}

export async function assertLaminarReady(): Promise<number> {
  const projectApiKey = readLaminarProjectApiKey();
  const timeoutMs = parsePositiveIntegerEnv('EVAL_RUN_TIMEOUT_MS', 30000);
  await assertOpenAiReady();

  const { Laminar } = await importLaminarModule();
  Laminar?.initialize?.({ projectApiKey });

  return timeoutMs;
}

function classifyExecutionError(error: unknown): ArtifactError {
  const message = error instanceof Error ? error.message : String(error);
  const normalizedMessage = message.toLowerCase();

  return {
    kind: normalizedMessage.includes('timeout') ? 'timeout' : 'execution_error',
    message,
  };
}

export async function runText(params: RunTextParams): Promise<RunTextResult> {
  const startedAt = Date.now();

  try {
    const execution = await runOpenAiText({
      modelId: params.model,
      prompt: buildPromptWithFiles(params.userPrompt, params.files),
      system: params.systemPrompt || undefined,
      timeoutMs: params.timeoutMs,
    });

    return {
      status: 'completed',
      text: execution.text,
      provider: execution.provider,
      model: execution.modelId,
      usage: execution.usage,
      durationMs: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      status: 'error',
      error: classifyExecutionError(error),
      durationMs: Date.now() - startedAt,
    };
  }
}




