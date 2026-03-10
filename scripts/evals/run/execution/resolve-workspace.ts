import {
  createIterationWorkspace,
  openExistingIteration,
} from '../artifacts/iteration-files.js';
import { type EvalDefinition } from '../../domain/types/eval-definition.types.js';
import { type RunEvalIterationInput } from '../../domain/types/run.types.js';

export function resolveWorkspace(input: RunEvalIterationInput, skillName: string, filePath: string, definition: EvalDefinition) {
  if (input.iteration) {
    return openExistingIteration(skillName, input.iteration);
  }

  return createIterationWorkspace(definition, filePath);
}
