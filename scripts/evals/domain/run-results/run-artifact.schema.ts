import { z } from 'zod';

import { caseIdSchema } from '../eval-case/eval-case.schema.js';

export const evalCaseModeSchema = z.enum(['with_skill', 'without_skill']);
export const artifactProviderSchema = z.literal('openai');
export const artifactStatusSchema = z.enum(['completed', 'error']);
export const artifactErrorSchema = z.object({
  kind: z.enum(['timeout', 'execution_error']),
  message: z.string().min(1),
});
export const usageArtifactSchema = z.object({
  inputTokens: z.number().int().nonnegative().optional(),
  outputTokens: z.number().int().nonnegative().optional(),
  totalTokens: z.number().int().nonnegative().optional(),
});
export const checkResultArtifactSchema = z.object({
  label: z.string().min(1),
  status: z.enum(['PASS', 'FAIL']),
  evidence: z.string().min(1),
});
export const caseGradingResultSchema = z.object({
  case_id: caseIdSchema,
  mode: evalCaseModeSchema,
  score: z.number().min(0).max(1),
  passed: z.boolean(),
  checks: z.array(checkResultArtifactSchema),
});
export const modeArtifactsSummarySchema = z.object({
  status: artifactStatusSchema,
  duration_ms: z.number().nonnegative(),
  score: z.number().min(0).max(1),
  passed: z.boolean(),
  provider: artifactProviderSchema.optional(),
  model: z.string().min(1).optional(),
  usage: usageArtifactSchema.optional(),
  error: artifactErrorSchema.optional(),
});

const caseModeOutputArtifactBaseSchema = z.object({
  case_id: caseIdSchema,
  mode: evalCaseModeSchema,
  prompt: z.string().min(1),
  system: z.string().min(1).optional(),
  duration_ms: z.number().nonnegative(),
});

export const completedCaseModeOutputArtifactSchema = caseModeOutputArtifactBaseSchema.extend({
  status: z.literal('completed'),
  output: z.string(),
  provider: artifactProviderSchema,
  model: z.string().min(1),
  usage: usageArtifactSchema,
});

export const erroredCaseModeOutputArtifactSchema = caseModeOutputArtifactBaseSchema.extend({
  status: z.literal('error'),
  error: artifactErrorSchema,
});

export const caseModeOutputArtifactSchema = z.union([
  completedCaseModeOutputArtifactSchema,
  erroredCaseModeOutputArtifactSchema,
]);

export const caseTimingArtifactSchema = z.object({
  with_skill: z.number().nonnegative(),
  without_skill: z.number().nonnegative(),
});

export const caseGradingArtifactSchema = z.object({
  with_skill: caseGradingResultSchema,
  without_skill: caseGradingResultSchema,
});

export const caseFeedbackArtifactSchema = z.object({
  case_id: caseIdSchema,
  stronger_mode: z.enum(['with_skill', 'without_skill', 'tie']),
  score_delta: z.number(),
  observations: z.array(z.string().min(1)).min(1),
  next_actions: z.array(z.string().min(1)).min(1),
});

const benchmarkModeEntrySchema = z.object({
  status: artifactStatusSchema,
  score: z.number().min(0).max(1),
  passed: z.boolean(),
  duration_ms: z.number().nonnegative(),
  error: artifactErrorSchema.optional(),
});

export const caseBenchmarkEntrySchema = z.object({
  case_id: caseIdSchema,
  should_trigger: z.boolean(),
  expected_stop: z.enum(['Eval Brief ready', 'do_not_trigger', 'stop_and_ask']),
  stronger_mode: z.enum(['with_skill', 'without_skill', 'tie']),
  score_delta: z.number(),
  pass_delta: z.number().int().min(-1).max(1),
  with_skill: benchmarkModeEntrySchema,
  without_skill: benchmarkModeEntrySchema,
});

export const benchmarkProgressSchema = z.object({
  completed_case_count: z.number().int().nonnegative(),
  error_case_count: z.number().int().nonnegative(),
  pending_case_count: z.number().int().nonnegative(),
  current_case_id: caseIdSchema.optional(),
  last_completed_case_id: caseIdSchema.optional(),
});

export const benchmarkArtifactSchema = z.object({
  status: z.enum(['completed', 'completed_with_errors']),
  skill_name: z.string().min(1),
  eval_version: z.number().int().positive(),
  iteration: z.number().int().positive(),
  completed_at: z.string().min(1),
  gate_results: z.object({
    golden_pass_rate: z.number().min(0).max(1),
    negative_pass_rate: z.number().min(0).max(1),
    case_score_threshold: z.number().min(0).max(1),
    golden_gate_passed: z.boolean(),
    negative_gate_passed: z.boolean(),
    overall_passed: z.boolean(),
    completed_case_count: z.number().int().nonnegative(),
    error_case_count: z.number().int().nonnegative(),
  }),
  comparison: z.object({
    with_skill: z.object({
      pass_rate: z.number().min(0).max(1),
      average_score: z.number().min(0).max(1),
      average_duration_ms: z.number().nonnegative(),
      error_count: z.number().int().nonnegative(),
    }),
    without_skill: z.object({
      pass_rate: z.number().min(0).max(1),
      average_score: z.number().min(0).max(1),
      average_duration_ms: z.number().nonnegative(),
      error_count: z.number().int().nonnegative(),
    }),
    deltas: z.object({
      pass_rate: z.number(),
      average_score: z.number(),
      average_duration_ms: z.number(),
      error_count: z.number().int(),
    }),
  }),
  improvement_summary: z.object({
    score: z.object({
      improved_cases: z.number().int().nonnegative(),
      regressed_cases: z.number().int().nonnegative(),
      tied_cases: z.number().int().nonnegative(),
      net_improvement: z.number(),
    }),
    pass: z.object({
      improved_cases: z.number().int().nonnegative(),
      regressed_cases: z.number().int().nonnegative(),
      tied_cases: z.number().int().nonnegative(),
      net_improvement: z.number().int(),
    }),
  }),
  cases: z.array(caseBenchmarkEntrySchema),
});

export const benchmarkStubArtifactSchema = z.object({
  status: z.literal('running'),
  skill_name: z.string().min(1),
  eval_version: z.number().int().positive(),
  iteration: z.number().int().positive(),
  created_at: z.string().min(1),
  source_eval_path: z.string().min(1),
  case_ids: z.array(caseIdSchema),
  total_cases: z.number().int().nonnegative(),
  progress: benchmarkProgressSchema,
});
