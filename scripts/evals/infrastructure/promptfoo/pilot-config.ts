import * as fs from 'node:fs';
import * as path from 'node:path';

import { collectCases, type EvalDefinition } from '../../domain/eval-definition/eval-definition.types.js';
import { resolveSupportedEvalPath } from '../../application/load-eval-definition/load-eval-definition.js';

export type PromptfooPilotTest = {
  description: string;
  vars: {
    case_id: string;
    prompt: string;
    skill_prompt: string;
    expected_output: string;
    expected_stop: string;
    should_trigger: string;
  };
  metadata: {
    skill_name: string;
    case_bucket: 'golden' | 'negative';
    expected_stop: string;
  };
};

export type PromptfooPilotConfig = {
  description: string;
  providers: string[];
  prompts: string[];
  tests: PromptfooPilotTest[];
};

const WITH_SKILL_PROMPT_TEMPLATE = [
  '[mode:with_skill]',
  'You are operating with skill context enabled.',
  '',
  'Skill context:',
  '{{skill_prompt}}',
  '',
  'User request:',
  '{{prompt}}',
].join('\n');

const WITHOUT_SKILL_PROMPT_TEMPLATE = [
  '[mode:without_skill]',
  'You are operating without skill context.',
  '',
  'User request:',
  '{{prompt}}',
].join('\n');

export function resolvePromptfooSuitePath(skillName: string, env?: NodeJS.ProcessEnv): string {
  return resolveSupportedEvalPath(skillName, env);
}

export function resolveGeneratedPromptfooConfigPath(skillName: string): string {
  return path.resolve('evals', 'engines', 'promptfoo', 'generated', `${skillName}.promptfoo.json`);
}

export function resolveGeneratedPromptfooEvalPath(skillName: string): string {
  return path.resolve('evals', 'engines', 'promptfoo', 'generated', `${skillName}.eval.json`);
}

export function buildPromptfooPilotConfig(params: {
  definition: EvalDefinition;
  skillPrompt: string;
  provider: string;
}): PromptfooPilotConfig {
  const cases = collectCases(params.definition);

  return {
    description: `Canonical skill eval suite for ${params.definition.skill_name}`,
    providers: [params.provider],
    prompts: [WITH_SKILL_PROMPT_TEMPLATE, WITHOUT_SKILL_PROMPT_TEMPLATE],
    tests: cases.map((testCase) => ({
      description: testCase.id,
      vars: {
        case_id: testCase.id,
        prompt: testCase.prompt,
        skill_prompt: params.skillPrompt,
        expected_output: testCase.expected_output,
        expected_stop: testCase.stop_at,
        should_trigger: String(testCase.should_trigger),
      },
      metadata: {
        skill_name: params.definition.skill_name,
        case_bucket: testCase.should_trigger ? 'golden' : 'negative',
        expected_stop: testCase.stop_at,
      },
    })),
  };
}

export function writePromptfooPilotConfig(filePath: string, config: PromptfooPilotConfig): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
}
