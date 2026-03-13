import { describe, it } from 'vitest';

import { parseRunEvalsArgs } from './run-evals.args.js';

describe('parseRunEvalsArgs', () => {
  it('parses skill-name mode with default provider derived from model', ({ expect }) => {
    const result = parseRunEvalsArgs([
      '--skill-name', 'skill-forge',
      '--model', 'gpt-4.1-mini',
      '--model-outputs', 'evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json',
      '--dry-run',
    ], {
      defaultModel: 'fallback-model',
    });

    expect(result).toMatchObject({
      skillName: 'skill-forge',
      provider: 'openai:gpt-4.1-mini',
      modelOutputs: 'evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json',
      dryRun: true,
    });
    expect(result.file).toBeUndefined();
  });

  it('parses file mode and keeps an explicit provider override', ({ expect }) => {
    const result = parseRunEvalsArgs([
      '--file', 'evals/cases/skill-forge/suite.v1.json',
      '--provider', 'openai:gpt-4.1-nano',
      '--output', 'evals/engines/promptfoo/generated/custom.eval.json',
    ], {
      defaultModel: 'gpt-4.1-mini',
    });

    expect(result).toMatchObject({
      file: 'evals/cases/skill-forge/suite.v1.json',
      provider: 'openai:gpt-4.1-nano',
      output: 'evals/engines/promptfoo/generated/custom.eval.json',
      dryRun: false,
    });
    expect(result.skillName).toBeUndefined();
  });

  it('uses the built-in model default when neither model nor provider is injected', ({ expect }) => {
    const result = parseRunEvalsArgs([
      '--skill-name', 'skill-forge',
    ]);

    expect(result.provider).toBe('openai:gpt-4.1-mini');
  });

  it('fails when both skill-name and file are provided', ({ expect }) => {
    expect(() => parseRunEvalsArgs([
      '--skill-name', 'skill-forge',
      '--file', 'evals/cases/skill-forge/suite.v1.json',
    ])).toThrow('Use either --skill-name or --file, not both.');
  });

  it('fails when neither skill-name nor file is provided', ({ expect }) => {
    expect(() => parseRunEvalsArgs([
      '--dry-run',
    ])).toThrow('Pass --skill-name <name> or --file <path>.');
  });

  it('fails when a required flag value is missing', ({ expect }) => {
    expect(() => parseRunEvalsArgs([
      '--skill-name',
    ])).toThrow('Missing value for --skill-name');
  });

  it('fails when a provider value is missing', ({ expect }) => {
    expect(() => parseRunEvalsArgs([
      '--skill-name', 'skill-forge',
      '--provider',
    ])).toThrow('Missing value for --provider');
  });

  it('fails on unknown flags', ({ expect }) => {
    expect(() => parseRunEvalsArgs([
      '--skill-name', 'skill-forge',
      '--bogus',
    ])).toThrow('Unknown argument: --bogus');
  });

  it('fails on retired historical flags', ({ expect }) => {
    expect(() => parseRunEvalsArgs([
      '--skill-name', 'skill-forge',
      '--iteration', '7',
    ])).toThrow('--iteration is no longer supported in the final eval flow.');

    expect(() => parseRunEvalsArgs([
      '--skill-name', 'skill-forge',
      '--retry-errors',
    ])).toThrow('--retry-errors is no longer supported in the final eval flow.');
  });
});
