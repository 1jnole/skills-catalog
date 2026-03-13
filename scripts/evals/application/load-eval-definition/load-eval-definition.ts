import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'node:process';

import { evalDefinitionSchema } from '../../domain/eval-definition/eval-definition.schema.js';
import { type EvalDefinition } from '../../domain/eval-definition/eval-definition.types.js';
import { resolveSkillEvalDefinitionPath, resolveSkillEvalRunsRoot } from '../../infrastructure/filesystem/eval-paths.js';
import { evalInputSourceSchema } from './eval-input-source.schema.js';
import { type EvalInputSource } from './eval-input-source.types.js';

export function parseEvalInputSource(input: EvalInputSource): EvalInputSource {
  return evalInputSourceSchema.parse(input);
}

function readTrimmedOrFallback(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function withSupportedResolverDefaults(env: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  return {
    ...env,
    EVALS_SKILLS_ROOT: readTrimmedOrFallback(env.EVALS_SKILLS_ROOT, path.join('evals', 'cases')),
    EVALS_EVALS_DIR: readTrimmedOrFallback(env.EVALS_EVALS_DIR, '.'),
    EVALS_EVAL_DEFINITION_FILE: readTrimmedOrFallback(env.EVALS_EVAL_DEFINITION_FILE, 'suite.v1.json'),
  };
}

export function resolveSupportedEvalPath(skillName: string, env: NodeJS.ProcessEnv = process.env): string {
  return resolveSkillEvalDefinitionPath(skillName, withSupportedResolverDefaults(env));
}

export function resolveEvalPath(source: EvalInputSource): string {
  if (source.file) {
    return path.resolve(source.file);
  }

  return resolveSupportedEvalPath(source.skillName!);
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



