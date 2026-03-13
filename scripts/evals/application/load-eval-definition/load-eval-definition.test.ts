import * as path from 'node:path';

import { afterEach, describe, it, vi } from 'vitest';

import { readEvalDefinition, resolveEvalPath, resolveEvalRunsRoot } from './load-eval-definition.js';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('readEvalDefinition', () => {
  it('loads the migrated skill-forge eval definition with assertion rules', ({ expect }) => {
    const filePath = path.resolve('packs', 'core', 'skill-forge', 'evals', 'evals.json');

    const definition = readEvalDefinition(filePath);

    expect(definition.golden[0].grading).toMatchObject({
      assertion_rules: [
        { markers: ['workflow: new-skill'] },
        { markers: ['contract', 'before', 'instructions'] },
        null,
      ],
    });
    expect(definition.negative[0].grading).toMatchObject({
      assertion_rules: [
        { markers: ['out of scope', 'agents'] },
        null,
        { markers: ['eval brief ready'], absent: true },
      ],
    });
  });
});

describe('path resolution integration', () => {
  it('resolves eval-definition and runs root from the configured path authority', ({ expect }) => {
    vi.stubEnv('EVALS_SKILLS_ROOT', 'skills');
    vi.stubEnv('EVALS_EVALS_DIR', 'cases');
    vi.stubEnv('EVALS_EVAL_DEFINITION_FILE', 'definition.json');
    vi.stubEnv('EVALS_RUNS_DIR', 'runs-data');

    expect(resolveEvalPath({ skillName: 'skill-forge' })).toBe(
      path.resolve('skills', 'skill-forge', 'cases', 'definition.json'),
    );
    expect(resolveEvalRunsRoot('skill-forge')).toBe(
      path.resolve('skills', 'skill-forge', 'cases', 'runs-data'),
    );
  });
});
