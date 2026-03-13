import * as fs from 'node:fs';
import * as path from 'node:path';

import { type EvalCase, type EvalCaseMode } from '../../domain/eval-case/eval-case.types.js';

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
  const filesRoot = path.resolve('packs', 'core', skillName, 'evals', 'files');

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

export function buildPrompt(caseDefinition: EvalCase, attachedFiles: LoadedEvalFile[]): string {
  const fileSection = attachedFiles.length === 0
    ? ''
    : `\n\nAttached files:\n${attachedFiles
        .map((file) => `--- ${file.path} ---\n${file.content}`)
        .join('\n\n')}`;

  return `${caseDefinition.prompt}${fileSection}`;
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


