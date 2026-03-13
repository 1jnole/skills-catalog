import { z } from 'zod';

import { baselineComparisonIntent } from '../baseline/baseline.js';
import { nonTriggerEvalCaseSchema, triggerEvalCaseSchema } from '../eval-case/eval-case.schema.js';

export const evalDefinitionSchema = z
  .object({
    skill_name: z.string().min(1),
    eval_version: z.number().int().positive(),
    purpose: z.string().min(1),
    comparison_intent: z.object({
      primary: z.literal(baselineComparisonIntent),
      hypothesis: z.string().min(1),
    }),
    scoring: z.object({
      strategy: z.literal('deterministic_assertions_first'),
      judge_model: z.literal('out_of_scope_for_v1'),
    }),
    gates: z.object({
      golden_pass_rate: z.number().min(0).max(1),
      negative_pass_rate: z.number().min(0).max(1),
      case_score_threshold: z.number().min(0).max(1),
    }),
    golden: z.array(triggerEvalCaseSchema).min(1),
    negative: z.array(nonTriggerEvalCaseSchema).min(1),
  })
  .superRefine((definition, ctx) => {
    const ids = [
      ...definition.golden.map((testCase) => testCase.id),
      ...definition.negative.map((testCase) => testCase.id),
    ];

    const seen = new Set<string>();
    for (const id of ids) {
      if (seen.has(id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate case id found: ${id}`,
        });
      }
      seen.add(id);
    }
  });
