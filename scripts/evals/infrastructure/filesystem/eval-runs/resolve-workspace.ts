import {
  createIterationWorkspace,
  openExistingIteration,
} from './iteration-files.js';
import { type EvalDefinition } from '../../../domain/eval-definition/eval-definition.types.js';
import { type RunEvalIterationInput } from '../../../application/run-eval-iteration/run-eval-iteration.types.js';

export function resolveWorkspace(input: RunEvalIterationInput, skillName: string, filePath: string, definition: EvalDefinition) {
  if (input.iteration) {
    return openExistingIteration(skillName, input.iteration);
  }

  return createIterationWorkspace(definition, filePath);
}
