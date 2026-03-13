import { z } from 'zod';

import {
  evalCaseSchema,
  nonTriggerEvalCaseSchema,
  triggerEvalCaseSchema,
} from '../schemas/eval-case.schema.js';

export type EvalCase = z.infer<typeof evalCaseSchema>;
export type TriggerEvalCase = z.infer<typeof triggerEvalCaseSchema>;
export type NonTriggerEvalCase = z.infer<typeof nonTriggerEvalCaseSchema>;
export type EvalCaseMode = 'with_skill' | 'without_skill';
export type EvalCaseAssertionRules = NonNullable<NonNullable<EvalCase['grading']>['assertion_rules']>;
export type EvalCaseAssertionRule = Exclude<EvalCaseAssertionRules[number], null | undefined>;
