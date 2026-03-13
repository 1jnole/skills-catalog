import fs from 'node:fs';

import { resolvePromptfooPath, resolveRepoPath } from './paths.mjs';

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function requireString(value, fieldName) {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Expected non-empty string for ${fieldName}`);
  }

  return value;
}

function requireBoolean(value, fieldName) {
  if (typeof value !== 'boolean') {
    throw new Error(`Expected boolean for ${fieldName}`);
  }

  return value;
}

function requireArray(value, fieldName) {
  if (!Array.isArray(value)) {
    throw new Error(`Expected array for ${fieldName}`);
  }

  return value;
}

function readCase(caseValue, bucket) {
  return {
    id: requireString(caseValue?.id, `${bucket}.id`),
    prompt: requireString(caseValue?.prompt, `${bucket}.prompt`),
    expected_output: requireString(caseValue?.expected_output, `${bucket}.expected_output`),
    should_trigger: requireBoolean(caseValue?.should_trigger, `${bucket}.should_trigger`),
    stop_at: requireString(caseValue?.stop_at, `${bucket}.stop_at`),
    assertions: requireArray(caseValue?.assertions, `${bucket}.assertions`).map((assertion, index) =>
      requireString(assertion, `${bucket}.assertions[${index}]`),
    ),
    grading: {
      assertion_rules: Array.isArray(caseValue?.grading?.assertion_rules) ? caseValue.grading.assertion_rules : [],
    },
  };
}

export function loadSkillForgeSuite() {
  const suitePath = resolveRepoPath('evals', 'cases', 'skill-forge', 'suite.v1.json');
  const raw = readJson(suitePath);

  const golden = requireArray(raw?.golden, 'golden').map((entry) => readCase(entry, 'golden'));
  const negative = requireArray(raw?.negative, 'negative').map((entry) => readCase(entry, 'negative'));

  return {
    skill_name: requireString(raw?.skill_name, 'skill_name'),
    eval_version: Number(raw?.eval_version ?? 0),
    gates: {
      golden_pass_rate: Number(raw?.gates?.golden_pass_rate ?? 1),
      negative_pass_rate: Number(raw?.gates?.negative_pass_rate ?? 1),
      case_score_threshold: Number(raw?.gates?.case_score_threshold ?? 0.75),
    },
    golden,
    negative,
    suitePath,
  };
}

export function collectCases(definition) {
  return [...definition.golden, ...definition.negative];
}

export function loadSkillPrompt() {
  const skillPath = resolveRepoPath('packs', 'core', 'skill-forge', 'SKILL.md');
  return fs.readFileSync(skillPath, 'utf8').trim();
}

export function loadPromptTemplate(fileName) {
  return fs.readFileSync(resolvePromptfooPath('prompts', fileName), 'utf8').trim();
}
