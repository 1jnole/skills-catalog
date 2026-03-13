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

  it('loads the canonical phase-5 suite from the new evals/cases scaffold', ({ expect }) => {
    const filePath = path.resolve('evals', 'cases', 'skill-forge', 'suite.v1.json');

    const definition = readEvalDefinition(filePath);

    expect(definition.skill_name).toBe('skill-forge');
    expect(definition.golden).toHaveLength(4);
    expect(definition.negative).toHaveLength(4);
    expect(definition.golden.map((testCase) => testCase.id)).toEqual([
      'new-skill-one-clear-job',
      'existing-skill-refactor-clear-target',
      'skill-rewrite-clear-target',
      'mixed-authoring-and-eval-request',
    ]);
    expect(definition.negative.map((testCase) => testCase.id)).toEqual([
      'agents-policy-request',
      'runtime-harness-implementation',
      'eval-authoring-only-request',
      'ambiguous-multi-workflow-request',
    ]);
  });

  it('keeps the phase-4 pilot snapshot available as historical context', ({ expect }) => {
    const filePath = path.resolve('evals', 'cases', 'skill-forge', 'pilot-suite.v1.json');
    const definition = readEvalDefinition(filePath);

    expect(definition.golden).toHaveLength(1);
    expect(definition.negative).toHaveLength(2);
  });
});

describe('path resolution integration', () => {
  it('resolves the supported skill suite from the new scaffold by default', ({ expect }) => {
    expect(resolveEvalPath({ skillName: 'skill-forge' })).toBe(
      path.resolve('evals', 'cases', 'skill-forge', 'suite.v1.json'),
    );
  });

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
