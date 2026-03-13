import { z } from 'zod';

import { caseIdSchema } from '../eval-case/eval-case.schema.js';
import { artifactErrorSchema, artifactProviderSchema, artifactStatusSchema, usageArtifactSchema } from './run-artifact.schema.js';

export const normalizedModeResultSchema = z.object({
  status: artifactStatusSchema,
  duration_ms: z.number().nonnegative(),
  score: z.number().min(0).max(1),
  passed: z.boolean(),
  provider: artifactProviderSchema.optional(),
  model: z.string().min(1).optional(),
  usage: usageArtifactSchema.optional(),
  error: artifactErrorSchema.optional(),
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
  provider: z.string().min(1),
  model: z.string().min(1),
  skill_name: z.string().min(1),
  eval_version: z.number().int().positive(),
  iteration: z.number().int().positive(),
  created_at: z.string().min(1),
});
