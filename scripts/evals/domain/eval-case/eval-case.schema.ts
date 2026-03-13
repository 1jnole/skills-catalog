import { z } from 'zod';

export const caseIdSchema = z
  .string()
  .regex(/^[a-z0-9][a-z0-9._-]*$/, 'Case id must be lowercase and filesystem-safe.');

export const assertionRuleSchema = z.object({
  markers: z.array(z.string().min(1)).min(1),
  absent: z.literal(true).optional(),
});

export const caseGradingSchema = z.object({
  assertion_rules: z.array(z.union([z.null(), assertionRuleSchema])).optional(),
});

const caseBaseSchema = z.object({
  id: caseIdSchema,
  prompt: z.string().min(1),
  expected_output: z.string().min(1),
  assertions: z.array(z.string().min(1)).min(1),
  files: z.array(z.string().min(1)).default([]),
  grading: caseGradingSchema.optional(),
});

export const triggerEvalCaseSchema = caseBaseSchema.extend({
  should_trigger: z.literal(true),
  stop_at: z.literal('Eval Brief ready'),
});

export const nonTriggerEvalCaseSchema = caseBaseSchema.extend({
  should_trigger: z.literal(false),
  stop_at: z.enum(['do_not_trigger', 'stop_and_ask']),
});

export const evalCaseSchema = z.union([triggerEvalCaseSchema, nonTriggerEvalCaseSchema]).superRefine((testCase, ctx) => {
  const assertionRules = testCase.grading?.assertion_rules;
  if (!assertionRules) {
    return;
  }

  if (assertionRules.length !== testCase.assertions.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['grading', 'assertion_rules'],
      message: 'assertion_rules must align one-to-one with assertions.',
    });
  }
});
