import * as path from 'node:path';

import { describe, it } from 'vitest';

import { readEvalDefinition } from '../../application/load-eval-definition/load-eval-definition.js';
import {
  buildPromptfooPilotConfig,
  resolveGeneratedPromptfooEvalPath,
  resolveGeneratedPromptfooConfigPath,
  resolvePilotSuitePath,
} from './pilot-config.js';

describe('resolvePilotSuitePath', () => {
  it('resolves the phase-4 pilot suite path from resolver defaults', ({ expect }) => {
    const result = resolvePilotSuitePath('skill-forge', {});
    expect(result).toBe(path.resolve('evals', 'cases', 'skill-forge', 'pilot-suite.v1.json'));
  });

  it('keeps resolver override support via env values', ({ expect }) => {
    const result = resolvePilotSuitePath('my-skill', {
      EVALS_SKILLS_ROOT: 'skills',
      EVALS_EVALS_DIR: 'cases',
      EVALS_EVAL_DEFINITION_FILE: 'definition.json',
    });
    expect(result).toBe(path.resolve('skills', 'my-skill', 'cases', 'definition.json'));
  });
});

describe('buildPromptfooPilotConfig', () => {
  it('builds promptfoo config from the canonical eval definition contract', ({ expect }) => {
    const definition = readEvalDefinition(path.resolve('evals', 'cases', 'skill-forge', 'pilot-suite.v1.json'));
    const config = buildPromptfooPilotConfig({
      definition,
      skillPrompt: '# Skill Prompt',
      provider: 'openai:gpt-4.1-mini',
    });

    expect(config.providers).toEqual(['openai:gpt-4.1-mini']);
    expect(config.prompts).toHaveLength(2);
    expect(config.prompts[0]).toContain('[mode:with_skill]');
    expect(config.prompts[1]).toContain('[mode:without_skill]');
    expect(config.tests).toHaveLength(3);
    expect(config.tests[0]).toMatchObject({
      description: 'new-skill-one-clear-job',
      vars: {
        skill_prompt: '# Skill Prompt',
      },
      metadata: {
        skill_name: 'skill-forge',
        case_bucket: 'golden',
      },
    });
  });

  it('resolves a deterministic generated config output path', ({ expect }) => {
    expect(resolveGeneratedPromptfooConfigPath('skill-forge')).toBe(
      path.resolve('evals', 'engines', 'promptfoo', 'generated', 'skill-forge.pilot.promptfoo.json'),
    );
  });

  it('resolves a deterministic generated eval output path', ({ expect }) => {
    expect(resolveGeneratedPromptfooEvalPath('skill-forge')).toBe(
      path.resolve('evals', 'engines', 'promptfoo', 'generated', 'skill-forge.pilot.eval.json'),
    );
  });
});
