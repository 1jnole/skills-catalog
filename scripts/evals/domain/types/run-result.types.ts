import { z } from 'zod';

import {
  normalizedCaseResultSchema,
  normalizedModeResultSchema,
  runManifestArtifactSchema,
} from '../schemas/run-result.schema.js';

export type NormalizedModeResult = z.infer<typeof normalizedModeResultSchema>;
export type NormalizedCaseResult = z.infer<typeof normalizedCaseResultSchema>;
export type RunManifestArtifact = z.infer<typeof runManifestArtifactSchema>;
