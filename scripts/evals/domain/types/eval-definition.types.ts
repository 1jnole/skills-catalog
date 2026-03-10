import { z } from 'zod';

import { evalDefinitionSchema } from '../schemas/eval-definition.schema.js';
import { type EvalCase } from './eval-case.types.js';

export type EvalDefinition = z.infer<typeof evalDefinitionSchema>;

export function collectCaseIds(definition: EvalDefinition): string[] {
  return [
    ...definition.golden.map((testCase) => testCase.id),
    ...definition.negative.map((testCase) => testCase.id),
  ];
}

export function collectCases(definition: EvalDefinition): EvalCase[] {
  return [...definition.golden, ...definition.negative];
}
