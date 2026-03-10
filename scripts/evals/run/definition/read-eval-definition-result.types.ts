import { type EvalDefinition } from '../../domain/types/eval-definition.types.js';

export type ReadEvalDefinitionSummary = {
  skill_name: string;
  eval_version: number;
  golden_cases: number;
  negative_cases: number;
  total_cases: number;
};

export type ReadEvalDefinitionUseCaseResult = {
  filePath: string;
  definition: EvalDefinition;
  summary: ReadEvalDefinitionSummary;
};

