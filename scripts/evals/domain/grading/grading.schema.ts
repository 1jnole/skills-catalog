import { z } from 'zod';

import { supportedEvalCaseModes } from '../baseline/baseline.js';
import { caseIdSchema } from '../eval-case/eval-case.schema.js';

export const gradingErrorSchema = z.object({
  kind: z.enum(['timeout', 'execution_error']),
  message: z.string().min(1),
});

export const gradingCheckSchema = z.object({
  label: z.string().min(1),
  status: z.enum(['PASS', 'FAIL']),
  evidence: z.string().min(1),
});

export const caseGradingSchema = z.object({
  case_id: caseIdSchema,
  mode: z.enum(supportedEvalCaseModes),
  score: z.number().min(0).max(1),
  passed: z.boolean(),
  checks: z.array(gradingCheckSchema),
});
