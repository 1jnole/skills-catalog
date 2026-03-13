import * as path from 'node:path';

import { describe, expect, it } from 'vitest';

import { executeReadEvalDefinition } from './application/load-eval-definition/read-eval-definition.js';
import { parseRunEvalsArgs } from './cli/run-evals.args.js';
import {
  resolveGeneratedPromptfooBenchmarkPath,
} from './infrastructure/promptfoo/pilot-benchmark.js';
import {
  resolveGeneratedPromptfooConfigPath,
  resolveGeneratedPromptfooEvalPath,
  resolvePromptfooSuitePath,
} from './infrastructure/promptfoo/pilot-config.js';
import {
  resolveGeneratedPromptfooScoringPath,
} from './infrastructure/promptfoo/pilot-scoring.js';

describe('gate A smoke', () => {
  it('covers read-evals contract for the supported canonical suite', () => {
    const result = executeReadEvalDefinition({ skillName: 'skill-forge' });

    expect(result.filePath).toContain(path.join('evals', 'cases', 'skill-forge', 'suite.v1.json'));
    expect(result.summary.skill_name).toBe('skill-forge');
    expect(result.summary.eval_version).toBeGreaterThan(0);
    expect(result.summary.total_cases).toBeGreaterThan(0);
    expect(result.summary.total_cases).toBe(result.summary.golden_cases + result.summary.negative_cases);
  });

  it('covers the final supported command surface defaults', () => {
    const args = parseRunEvalsArgs([
      '--skill-name', 'skill-forge',
      '--model-outputs', 'evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json',
    ]);

    expect(args).toMatchObject({
      skillName: 'skill-forge',
      provider: 'openai:gpt-4.1-mini',
      modelOutputs: 'evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json',
      dryRun: false,
    });
    expect(resolvePromptfooSuitePath('skill-forge')).toBe(
      path.resolve('evals', 'cases', 'skill-forge', 'suite.v1.json'),
    );
    expect(resolveGeneratedPromptfooConfigPath('skill-forge')).toBe(
      path.resolve('evals', 'engines', 'promptfoo', 'generated', 'skill-forge.promptfoo.json'),
    );
    expect(resolveGeneratedPromptfooEvalPath('skill-forge')).toBe(
      path.resolve('evals', 'engines', 'promptfoo', 'generated', 'skill-forge.eval.json'),
    );
    expect(resolveGeneratedPromptfooScoringPath('skill-forge')).toBe(
      path.resolve('evals', 'engines', 'promptfoo', 'generated', 'skill-forge.scoring.json'),
    );
    expect(resolveGeneratedPromptfooBenchmarkPath('skill-forge')).toBe(
      path.resolve('evals', 'engines', 'promptfoo', 'generated', 'skill-forge.benchmark.json'),
    );
  });
});
