import { type EvalInputSource } from '../load-eval-definition/eval-input-source.types.js';

export type RunEvalIterationInput = EvalInputSource & {
  iteration?: number;
  model: string;
  retryErrors: boolean;
};

export type RunEvalIterationResult = {
  iterationDir: string;
  iterationNumber: number;
};
