import * as fs from 'node:fs';
import * as path from 'node:path';

import { evalDefinitionSchema } from '../../domain/schemas/eval-definition.schema.js';
import { type EvalDefinition } from '../../domain/types/eval-definition.types.js';
import { evalInputSourceSchema } from '../../shared/schemas/eval-input-source.schema.js';
import { type EvalInputSource } from '../../shared/types/eval-input-source.types.js';

export function parseEvalInputSource(input: EvalInputSource): EvalInputSource {
  return evalInputSourceSchema.parse(input);
}

export function resolveEvalPath(source: EvalInputSource): string {
  if (source.file) {
    return path.resolve(source.file);
  }

  return path.resolve('packs', 'core', source.skillName!, 'evals', 'evals.json');
}

export function resolveEvalRunsRoot(skillName: string): string {
  return path.resolve('packs', 'core', skillName, 'evals', 'runs');
}

export function readEvalDefinition(filePath: string): EvalDefinition {
  const raw = fs.readFileSync(filePath, 'utf8');
  const json: unknown = JSON.parse(raw);
  return evalDefinitionSchema.parse(json);
}

export function loadEvalDefinition(source: EvalInputSource): {
  filePath: string;
  definition: EvalDefinition;
} {
  const parsedSource = parseEvalInputSource(source);
  const filePath = resolveEvalPath(parsedSource);
  const definition = readEvalDefinition(filePath);

  return { filePath, definition };
}

