import { z } from 'zod';

import type { EvalCaseMode } from '../baseline/baseline.js';
import type { EvalCaseAssertionRule } from '../eval-case/eval-case.types.js';
import { caseGradingSchema, gradingCheckSchema, gradingErrorSchema } from './grading.schema.js';

export type GradingError = z.infer<typeof gradingErrorSchema>;
export type GradingCheck = z.infer<typeof gradingCheckSchema>;
export type CaseGrading = z.infer<typeof caseGradingSchema>;

export type GradingCaseDefinition = {
  id: string;
  should_trigger: boolean;
  stop_at: 'Eval Brief ready' | 'do_not_trigger' | 'stop_and_ask';
  assertions: string[];
  grading?: {
    assertion_rules?: Array<EvalCaseAssertionRule | null>;
  };
};

export type GradeCaseInput = {
  caseDefinition: GradingCaseDefinition;
  mode: EvalCaseMode;
  output: string;
  passingScoreThreshold: number;
};
