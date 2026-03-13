import * as path from 'node:path';

import { describe, it } from 'vitest';

import {
  readEvalsPathConfig,
  resolveSkillEvalDefinitionPath,
  resolveSkillEvalFilesRoot,
  resolveSkillEvalRunsRoot,
  resolveSkillPromptPath,
} from './eval-paths.js';

describe('eval path resolver', () => {
  it('uses the default layout when no env overrides are set', ({ expect }) => {
    const emptyEnv = {} as NodeJS.ProcessEnv;
    const config = readEvalsPathConfig(emptyEnv);

    expect(config.skillsRoot).toBe(path.resolve('packs', 'core'));
    expect(config.evalsDirName).toBe('evals');
    expect(config.evalDefinitionFileName).toBe('evals.json');
    expect(config.filesDirName).toBe('files');
    expect(config.runsDirName).toBe('runs');
    expect(config.skillPromptFileName).toBe('SKILL.md');
  });

  it('resolves skill paths from env-configured layout', ({ expect }) => {
    const env = {
      EVALS_SKILLS_ROOT: 'skills',
      EVALS_EVALS_DIR: 'cases',
      EVALS_EVAL_DEFINITION_FILE: 'definition.json',
      EVALS_FILES_DIR: 'fixtures',
      EVALS_RUNS_DIR: 'runs-data',
      EVALS_SKILL_PROMPT_FILE: 'PROMPT.md',
    } as NodeJS.ProcessEnv;

    expect(resolveSkillEvalDefinitionPath('skill-forge', env)).toBe(
      path.resolve('skills', 'skill-forge', 'cases', 'definition.json'),
    );
    expect(resolveSkillEvalFilesRoot('skill-forge', env)).toBe(
      path.resolve('skills', 'skill-forge', 'cases', 'fixtures'),
    );
    expect(resolveSkillEvalRunsRoot('skill-forge', env)).toBe(
      path.resolve('skills', 'skill-forge', 'cases', 'runs-data'),
    );
    expect(resolveSkillPromptPath('skill-forge', env)).toBe(
      path.resolve('skills', 'skill-forge', 'PROMPT.md'),
    );
  });
});
