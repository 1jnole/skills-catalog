import { z } from 'zod';

export const caseIdSchema = z
  .string()
  .regex(/^[a-z0-9][a-z0-9._-]*$/, 'Case id must be lowercase and filesystem-safe.');

const caseBaseSchema = z.object({
  id: caseIdSchema,
  prompt: z.string().min(1),
  expected_output: z.string().min(1),
  assertions: z.array(z.string().min(1)).min(1),
  files: z.array(z.string().min(1)).default([]),
});

export const triggerEvalCaseSchema = caseBaseSchema.extend({
  should_trigger: z.literal(true),
  stop_at: z.literal('Eval Brief ready'),
});

export const nonTriggerEvalCaseSchema = caseBaseSchema.extend({
  should_trigger: z.literal(false),
  stop_at: z.enum(['do_not_trigger', 'stop_and_ask']),
});

export const evalCaseSchema = z.union([triggerEvalCaseSchema, nonTriggerEvalCaseSchema]);
