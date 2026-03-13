import * as fs from 'node:fs';

import { resolveSkillPromptPath } from './eval-paths.js';

export function readSkillPrompt(skillName: string): string {
  const skillPath = resolveSkillPromptPath(skillName);
  if (!fs.existsSync(skillPath)) {
    throw new Error(`Skill prompt not found: ${skillPath}`);
  }

  return fs.readFileSync(skillPath, 'utf8');
}
