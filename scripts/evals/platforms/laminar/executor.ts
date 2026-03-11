import { type EvalCaseMode } from '../../domain/types/eval-case.types.js';
import { type ArtifactError, type Usage } from '../../domain/types/run-artifact.types.js';

// Owns Laminar executor readiness and the internal model-call contract.
export type LaminarModelProvider = 'openai';

export type RunTextRequestFile = {
  path: string;
  content: string;
};

export type RunTextParams = {
  mode: EvalCaseMode;
  model: string;
  systemPrompt: string;
  userPrompt: string;
  files: RunTextRequestFile[];
  timeoutMs: number;
};

export type RunTextSuccess = {
  status: 'completed';
  text: string;
  provider: LaminarModelProvider;
  model: string;
  usage: Usage;
  durationMs: number;
};

export type RunTextFailure = {
  status: 'error';
  error: ArtifactError;
  durationMs: number;
};

export type RunTextResult = RunTextSuccess | RunTextFailure;

export function getLaminarSdkPackageName(): '@lmnr-ai/lmnr' {
  return '@lmnr-ai/lmnr';
}

export async function runText(_params: RunTextParams): Promise<RunTextResult> {
  throw new Error('Laminar executor wiring is not implemented yet. Batch 2 will connect this boundary to the active run-evals path.');
}
