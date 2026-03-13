import * as fs from 'node:fs';
import * as path from 'node:path';

import { evalDefinitionSchema } from '../../domain/eval-definition/eval-definition.schema.js';
import { type EvalDefinition } from '../../domain/eval-definition/eval-definition.types.js';
import { resolveSkillEvalDefinitionPath, resolveSkillEvalRunsRoot } from '../../infrastructure/filesystem/eval-paths.js';
import { evalInputSourceSchema } from './eval-input-source.schema.js';
import { type EvalInputSource } from './eval-input-source.types.js';

export function parseEvalInputSource(input: EvalInputSource): EvalInputSource {
  return evalInputSourceSchema.parse(input);
}

export function resolveEvalPath(source: EvalInputSource): string {
  if (source.file) {
    return path.resolve(source.file);
  }

  return resolveSkillEvalDefinitionPath(source.skillName!);
}

export function resolveEvalRunsRoot(skillName: string): string {
  return resolveSkillEvalRunsRoot(skillName);
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



