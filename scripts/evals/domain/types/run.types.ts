import { type EvalCase } from './eval-case.types.js';
import { type EvalInputSource } from '../../shared/types/eval-input-source.types.js';
import { type ModeArtifacts } from './run-artifact.types.js';

export type { ModeArtifacts } from './run-artifact.types.js';

export type CaseArtifacts = {
  case_id: string;
  expected_stop: EvalCase['stop_at'];
  should_trigger: boolean;
  with_skill: ModeArtifacts;
  without_skill: ModeArtifacts;
};

export type RunEvalIterationInput = EvalInputSource & {
  iteration?: number;
  model: string;
  retryErrors: boolean;
};

export type RunEvalIterationResult = {
  iterationDir: string;
  iterationNumber: number;
};
