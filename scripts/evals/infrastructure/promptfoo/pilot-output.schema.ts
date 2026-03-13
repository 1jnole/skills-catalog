import { z } from 'zod';

const promptfooPromptSchema = z.object({
  raw: z.string().optional(),
  label: z.string().optional(),
}).passthrough();

const promptfooProviderSchema = z.object({
  id: z.string().optional(),
}).passthrough();

const promptfooResponseSchema = z.object({
  output: z.string().optional(),
  latencyMs: z.number().nonnegative().optional(),
}).passthrough();

const promptfooVarsSchema = z.object({
  case_id: z.string().min(1).optional(),
}).passthrough();

const promptfooResultRowSchema = z.object({
  promptIdx: z.number().int().nonnegative().optional(),
  latencyMs: z.number().nonnegative().optional(),
  failureReason: z.union([z.string(), z.number()]).optional(),
  provider: promptfooProviderSchema.optional(),
  response: promptfooResponseSchema.optional(),
  vars: promptfooVarsSchema.optional(),
  testCase: z.object({
    vars: promptfooVarsSchema.optional(),
  }).passthrough().optional(),
}).passthrough();

export const promptfooPilotEvalOutputSchema = z.object({
  results: z.object({
    prompts: z.array(promptfooPromptSchema).default([]),
    results: z.array(promptfooResultRowSchema).default([]),
  }).passthrough(),
}).passthrough();

export type PromptfooPilotEvalOutput = z.infer<typeof promptfooPilotEvalOutputSchema>;
export type PromptfooPilotPrompt = z.infer<typeof promptfooPromptSchema>;
export type PromptfooPilotResultRow = z.infer<typeof promptfooResultRowSchema>;
