import { type EvalCase } from '../eval-case/eval-case.types.js';
import { type ModeArtifacts } from './run-artifact.types.js';

export type { ModeArtifacts } from './run-artifact.types.js';

export type CaseArtifacts = {
  case_id: string;
  expected_stop: EvalCase['stop_at'];
  should_trigger: boolean;
  with_skill: ModeArtifacts;
  without_skill: ModeArtifacts;
};
