import { gradeSkillForgeCase } from './assertions.mjs';
import { collectCases, loadPromptTemplate, loadSkillForgeSuite, loadSkillPrompt } from './suite-loader.mjs';

function createLiveProvider() {
  return `openai:${process.env.OPENAI_MODEL ?? 'gpt-4.1-mini'}`;
}

export function buildPromptfooConfig() {
  const definition = loadSkillForgeSuite();
  const skillPrompt = loadSkillPrompt();
  const cases = collectCases(definition);
  const withSkillPrompt = loadPromptTemplate('with-skill.txt').replace('{{skill_prompt}}', skillPrompt);

  return {
    description: `Canonical Promptfoo-first suite for ${definition.skill_name}`,
    prompts: [
      {
        label: 'with_skill',
        raw: withSkillPrompt,
      },
      {
        label: 'without_skill',
        raw: loadPromptTemplate('without-skill.txt'),
      },
    ],
    providers: [createLiveProvider()],
    defaultTest: {
      assert: [
        {
          type: 'javascript',
          value: gradeSkillForgeCase,
        },
      ],
    },
    tests: cases.map((testCase) => ({
      description: testCase.id,
      vars: {
        case_id: testCase.id,
        prompt: testCase.prompt,
        expected_output: testCase.expected_output,
        expected_stop: testCase.stop_at,
        should_trigger: String(testCase.should_trigger),
        assertions_json: JSON.stringify(testCase.assertions),
        assertion_rules_json: JSON.stringify(testCase.grading.assertion_rules),
        case_score_threshold: String(definition.gates.case_score_threshold),
      },
      metadata: {
        skill_name: definition.skill_name,
        case_bucket: testCase.should_trigger ? 'golden' : 'negative',
        expected_stop: testCase.stop_at,
      },
    })),
  };
}
