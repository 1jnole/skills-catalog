import { z } from 'zod';

import { caseIdSchema } from '../eval-case/eval-case.schema.js';
import { gradingErrorSchema } from '../grading/grading.schema.js';

export const normalizedModeStatusSchema = z.enum(['completed', 'error']);
export const normalizedProviderSchema = z.string().min(1);
export const normalizedUsageSchema = z.object({
  inputTokens: z.number().int().nonnegative().optional(),
  outputTokens: z.number().int().nonnegative().optional(),
  totalTokens: z.number().int().nonnegative().optional(),
});

export const normalizedModeResultSchema = z.object({
  status: normalizedModeStatusSchema,
  duration_ms: z.number().nonnegative(),
  score: z.number().min(0).max(1),
  passed: z.boolean(),
  provider: normalizedProviderSchema.optional(),
  model: z.string().min(1).optional(),
  usage: normalizedUsageSchema.optional(),
  error: gradingErrorSchema.optional(),
}).superRefine((result, ctx) => {
  if (result.status === 'error') {
    if (!result.error) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['error'],
        message: 'error mode requires an error payload.',
      });
    }
    return;
  }

  if (result.error) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['error'],
      message: 'completed mode must not include an error payload.',
    });
  }
});

export const normalizedCaseResultSchema = z.object({
  case_id: caseIdSchema,
  should_trigger: z.boolean(),
  expected_stop: z.enum(['Eval Brief ready', 'do_not_trigger', 'stop_and_ask']),
  with_skill: normalizedModeResultSchema,
  without_skill: normalizedModeResultSchema,
});

export const runManifestArtifactSchema = z.object({
  platform: z.string().min(1),
  run_ref: z.string().min(1),
  group_ref: z.string().min(1),
  provider: z.string().min(1).optional(),
  model: z.string().min(1),
  skill_name: z.string().min(1),
  eval_version: z.number().int().positive(),
  iteration: z.number().int().positive(),
  created_at: z.string().min(1),
});
