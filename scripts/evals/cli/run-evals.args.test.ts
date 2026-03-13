import { describe, it } from 'vitest';

import { parseRunEvalsArgs } from './run-evals.args.js';
import { parsePositiveInteger } from '../shared/cli/args.js';

describe('parseRunEvalsArgs', () => {
  it('parses skill-name mode, iteration, model, and retry-errors', ({ expect }) => {
    const result = parseRunEvalsArgs([
      '--skill-name', 'skill-forge',
      '--iteration', '13',
      '--model', 'gpt-4.1-mini',
      '--retry-errors',
    ], {
      defaultModel: 'fallback-model',
    });

    expect(result).toMatchObject({
      skillName: 'skill-forge',
      iteration: 13,
      model: 'gpt-4.1-mini',
      retryErrors: true,
    });
    expect(result.file).toBeUndefined();
  });

  it('parses file mode and falls back to the injected default model', ({ expect }) => {
    const result = parseRunEvalsArgs([
      '--file', 'packs/core/skill-forge/evals/evals.json',
    ], {
      defaultModel: 'gpt-4.1-nano',
    });

    expect(result).toMatchObject({
      file: 'packs/core/skill-forge/evals/evals.json',
      model: 'gpt-4.1-nano',
      retryErrors: false,
    });
    expect(result.skillName).toBeUndefined();
    expect(result.iteration).toBeUndefined();
  });

  it('uses the built-in model default when none is injected', ({ expect }) => {
    const result = parseRunEvalsArgs([
      '--skill-name', 'skill-forge',
    ]);

    expect(result.model).toBe('gpt-4.1-mini');
  });

  it('fails when both skill-name and file are provided', ({ expect }) => {
    expect(() => parseRunEvalsArgs([
      '--skill-name', 'skill-forge',
      '--file', 'packs/core/skill-forge/evals/evals.json',
    ])).toThrow('Use either --skill-name or --file, not both.');
  });

  it('fails when neither skill-name nor file is provided', ({ expect }) => {
    expect(() => parseRunEvalsArgs([
      '--retry-errors',
    ])).toThrow('Pass --skill-name <name> or --file <path>.');
  });

  it('fails when a required flag value is missing', ({ expect }) => {
    expect(() => parseRunEvalsArgs([
      '--skill-name',
    ])).toThrow('Missing value for --skill-name');
  });

  it('fails when iteration is missing a value', ({ expect }) => {
    expect(() => parseRunEvalsArgs([
      '--skill-name', 'skill-forge',
      '--iteration',
    ])).toThrow('Missing value for --iteration');
  });

  it('fails on unknown flags', ({ expect }) => {
    expect(() => parseRunEvalsArgs([
      '--skill-name', 'skill-forge',
      '--bogus',
    ])).toThrow('Unknown argument: --bogus');
  });

  it('fails when iteration is zero, negative, decimal, or suffixed', ({ expect }) => {
    for (const value of ['0', '-1', '1.5', '1x']) {
      expect(() => parseRunEvalsArgs([
        '--skill-name', 'skill-forge',
        '--iteration', value,
      ])).toThrow(`Invalid --iteration value: ${value}`);
    }
  });
});

describe('parsePositiveInteger', () => {
  it('accepts canonical positive integers', ({ expect }) => {
    expect(parsePositiveInteger('1', '--iteration')).toBe(1);
    expect(parsePositiveInteger('42', '--iteration')).toBe(42);
  });

  it('rejects non-canonical values', ({ expect }) => {
    for (const value of ['0', '-2', '01', '1.0', '1x', ' 1', '1 ']) {
      expect(() => parsePositiveInteger(value, '--iteration')).toThrow(`Invalid --iteration value: ${value}`);
    }
  });
});
