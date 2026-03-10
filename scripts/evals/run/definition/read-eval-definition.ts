import { loadEvalDefinition } from './load-eval-definition.js';
import { type ReadEvalDefinitionUseCaseResult } from './read-eval-definition-result.types.js';
import { type EvalInputSource } from '../../shared/types/eval-input-source.types.js';

export function executeReadEvalDefinition(source: EvalInputSource): ReadEvalDefinitionUseCaseResult {
  const { filePath, definition } = loadEvalDefinition(source);

  return {
    filePath,
    definition,
    summary: {
      skill_name: definition.skill_name,
      eval_version: definition.eval_version,
      golden_cases: definition.golden.length,
      negative_cases: definition.negative.length,
      total_cases: definition.golden.length + definition.negative.length,
    },
  };
}

