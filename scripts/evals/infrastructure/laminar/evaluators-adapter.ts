import { type ArtifactError, type ModeArtifacts, type Usage } from '../../domain/run-results/run-artifact.types.js';
import { type LaminarModelProvider } from './executor.js';

// Owns translation from Laminar execution outputs into the local per-mode summary shape.
export type LaminarModeExecutionResult =
  | {
      status: 'completed';
      durationMs: number;
      provider: LaminarModelProvider;
      model: string;
      usage: Usage;
      output: string;
    }
  | {
      status: 'error';
      durationMs: number;
      error: ArtifactError;
    };

export function summarizeLaminarModeResult(input: {
  result: LaminarModeExecutionResult;
  score: number;
  passed: boolean;
}): ModeArtifacts {
  if (input.result.status === 'error') {
    return {
      status: 'error',
      duration_ms: input.result.durationMs,
      score: input.score,
      passed: input.passed,
      error: input.result.error,
    };
  }

  return {
    status: 'completed',
    duration_ms: input.result.durationMs,
    score: input.score,
    passed: input.passed,
    provider: input.result.provider,
    model: input.result.model,
    usage: input.result.usage,
  };
}

