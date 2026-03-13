import * as fs from 'node:fs';
import * as path from 'node:path';

import { type EvalCase, type EvalCaseMode } from '../../domain/eval-case/eval-case.types.js';
import { resolveSkillEvalFilesRoot } from '../filesystem/eval-paths.js';

export type LoadedEvalFile = {
  path: string;
  content: string;
};

function resolveCaseFilePath(filesRoot: string, relativePath: string): string {
  const filePath = path.resolve(filesRoot, relativePath);
  const relativeToRoot = path.relative(filesRoot, filePath);

  if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
    throw new Error(`File path escapes eval files root: ${relativePath}`);
  }

  return filePath;
}

export function loadCaseFiles(skillName: string, caseDefinition: EvalCase): LoadedEvalFile[] {
  const filesRoot = resolveSkillEvalFilesRoot(skillName);

  return caseDefinition.files.map((relativePath) => {
    const filePath = resolveCaseFilePath(filesRoot, relativePath);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Referenced eval file does not exist: ${filePath}`);
    }

    return {
      path: relativePath,
      content: fs.readFileSync(filePath, 'utf8'),
    };
  });
}

export function buildSystemPrompt(mode: EvalCaseMode, skillPrompt: string | null): string | undefined {
  if (mode === 'without_skill' || !skillPrompt) {
    return undefined;
  }

  return [
    'Use the following skill instructions exactly as the active skill for this run.',
    'Do not invent runtime or grading behavior beyond the skill boundary.',
    '',
    skillPrompt,
  ].join('\n');
}


