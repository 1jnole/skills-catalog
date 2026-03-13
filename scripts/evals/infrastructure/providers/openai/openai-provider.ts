import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'node:process';

import { z } from 'zod';

const providerConfigSchema = z.object({
  timeoutMs: z.number().int().positive(),
  maxRetries: z.number().int().min(0),
});

export type ModelExecution = {
  text: string;
  modelId: string;
  provider: 'openai';
  usage: {
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
  };
};

function missingDependencyMessage() {
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
    throw new Error(`${missingDependencyMessage()} Original error: ${reason}`);
  }
}

export async function assertOpenAiReady(): Promise<void> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required for live eval runs.');
  }

  readProviderConfig();
  await importAiSdkModules();
}

export async function runOpenAiText(params: {
  modelId: string;
  prompt: string;
  system?: string;
  timeoutMs?: number;
}): Promise<ModelExecution> {
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

export function readSkillPrompt(skillName: string): string {
  const skillPath = path.resolve('packs', 'core', skillName, 'SKILL.md');
  if (!fs.existsSync(skillPath)) {
    throw new Error(`Skill prompt not found: ${skillPath}`);
  }

  return fs.readFileSync(skillPath, 'utf8');
}
