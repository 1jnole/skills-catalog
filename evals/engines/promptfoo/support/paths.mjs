import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFile = fileURLToPath(import.meta.url);
const supportDir = path.dirname(currentFile);

export const promptfooDir = path.resolve(supportDir, '..');
export const repoRoot = path.resolve(promptfooDir, '..', '..', '..');

export function resolveRepoPath(...segments) {
  return path.resolve(repoRoot, ...segments);
}

export function resolvePromptfooPath(...segments) {
  return path.resolve(promptfooDir, ...segments);
}
