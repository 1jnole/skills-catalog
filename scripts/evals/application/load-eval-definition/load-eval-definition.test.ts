import * as path from 'node:path';

import { describe, it } from 'vitest';

import { readEvalDefinition } from './load-eval-definition.js';

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
