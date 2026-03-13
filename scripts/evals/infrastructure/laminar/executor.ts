import * as process from 'node:process';

import { z } from 'zod';

import { type ArtifactError, type Usage } from '../../domain/run-results/run-artifact.types.js';

// Owns Laminar executor readiness and the internal model-call contract.
export type LaminarModelProvider = 'openai';

const providerConfigSchema = z.object({
  timeoutMs: z.number().int().positive(),
  maxRetries: z.number().int().min(0),
});

export type RunTextRequestFile = {
  path: string;
  content: string;
};

export type RunTextParams = {
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

function missingAiSdkDependencyMessage(): string {
  return 'AI SDK dependencies are not installed. Add `ai` and `@ai-sdk/openai` to the repo before running live evals.';
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

function parseNonNegativeIntegerEnv(name: string, fallback: number): number {
  const rawValue = process.env[name];
  if (!rawValue) {
    return fallback;
  }

  const parsedValue = Number.parseInt(rawValue, 10);
  if (!Number.isInteger(parsedValue) || parsedValue < 0) {
    throw new Error(`${name} must be a non-negative integer. Received: ${rawValue}`);
  }

  return parsedValue;
}

function readProviderConfig() {
  return providerConfigSchema.parse({
    timeoutMs: parsePositiveIntegerEnv('EVAL_RUN_TIMEOUT_MS', 30000),
    maxRetries: parseNonNegativeIntegerEnv('EVAL_RUN_MAX_RETRIES', 0),
  });
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

async function importAiSdkModules(): Promise<{
  generateText: (args: Record<string, unknown>) => Promise<Record<string, unknown>>;
  openai: (modelId: string) => unknown;
}> {
  const aiModuleName = 'ai';
  const providerModuleName = '@ai-sdk/openai';

  try {
    const [aiModule, providerModule] = await Promise.all([
      import(aiModuleName),
      import(providerModuleName),
    ]);

    const generateText = (aiModule as Record<string, unknown>).generateText;
    const openai = (providerModule as Record<string, unknown>).openai;

    if (typeof generateText !== 'function' || typeof openai !== 'function') {
      throw new Error('AI SDK modules loaded but did not expose the expected APIs.');
    }

    return {
      generateText: generateText as (args: Record<string, unknown>) => Promise<Record<string, unknown>>,
      openai: openai as (modelId: string) => unknown,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`${missingAiSdkDependencyMessage()} Original error: ${reason}`);
  }
}

async function assertOpenAiReady(): Promise<void> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required for live eval runs.');
  }

  readProviderConfig();
  await importAiSdkModules();
}

async function runOpenAiText(params: {
  modelId: string;
  prompt: string;
  system?: string;
  timeoutMs?: number;
}): Promise<{
  text: string;
  modelId: string;
  provider: LaminarModelProvider;
  usage: Usage;
}> {
  await assertOpenAiReady();

  const { timeoutMs, maxRetries } = readProviderConfig();
  const { generateText, openai } = await importAiSdkModules();
  const result = await generateText({
    model: openai(params.modelId),
    prompt: params.prompt,
    system: params.system,
    timeout: { totalMs: params.timeoutMs ?? timeoutMs },
    maxRetries,
  });

  const text = typeof result.text === 'string' ? result.text : '';
  const usage = typeof result.usage === 'object' && result.usage ? (result.usage as Record<string, unknown>) : {};

  return {
    text,
    modelId: params.modelId,
    provider: 'openai',
    usage: {
      inputTokens: typeof usage.inputTokens === 'number' ? usage.inputTokens : undefined,
      outputTokens: typeof usage.outputTokens === 'number' ? usage.outputTokens : undefined,
      totalTokens: typeof usage.totalTokens === 'number' ? usage.totalTokens : undefined,
    },
  };
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




