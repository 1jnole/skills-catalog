import { z } from 'zod';

import {
  artifactErrorSchema,
  benchmarkArtifactSchema,
  benchmarkProgressSchema,
  benchmarkStubArtifactSchema,
  caseBenchmarkEntrySchema,
  caseFeedbackArtifactSchema,
  caseGradingArtifactSchema,
  caseGradingResultSchema,
  caseModeOutputArtifactSchema,
  caseTimingArtifactSchema,
  checkResultArtifactSchema,
  modeArtifactsSummarySchema,
  usageArtifactSchema,
} from '../schemas/run-artifact.schema.js';

export type Usage = z.infer<typeof usageArtifactSchema>;
export type ArtifactError = z.infer<typeof artifactErrorSchema>;
export type CheckResult = z.infer<typeof checkResultArtifactSchema>;
export type CaseGrading = z.infer<typeof caseGradingResultSchema>;
export type ModeArtifacts = z.infer<typeof modeArtifactsSummarySchema>;
export type CaseModeOutputArtifact = z.infer<typeof caseModeOutputArtifactSchema>;
export type CaseTimingArtifact = z.infer<typeof caseTimingArtifactSchema>;
export type CaseGradingArtifact = z.infer<typeof caseGradingArtifactSchema>;
export type CaseFeedbackArtifact = z.infer<typeof caseFeedbackArtifactSchema>;
export type CaseBenchmarkEntry = z.infer<typeof caseBenchmarkEntrySchema>;
export type BenchmarkProgress = z.infer<typeof benchmarkProgressSchema>;
export type BenchmarkArtifact = z.infer<typeof benchmarkArtifactSchema>;
export type BenchmarkStubArtifact = z.infer<typeof benchmarkStubArtifactSchema>;
