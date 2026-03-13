import { describe, it } from 'vitest';

import { createErroredCaseGrading, gradeCase } from './grade-case.js';
import type { EvalCase, EvalCaseAssertionRules } from '../eval-case/eval-case.types.js';

function createTriggerCase(assertions: string[], assertionRules?: EvalCaseAssertionRules): EvalCase {
  return {
    id: 'trigger-case',
    prompt: 'prompt',
    expected_output: 'expected',
    assertions,
    files: [],
    should_trigger: true,
    stop_at: 'Eval Brief ready',
    grading: assertionRules ? { assertion_rules: assertionRules } : undefined,
  };
}

function createNonTriggerCase(
  stopAt: 'do_not_trigger' | 'stop_and_ask',
  assertions: string[],
  assertionRules?: EvalCaseAssertionRules,
): EvalCase {
  return {
    id: `${stopAt}-case`,
    prompt: 'prompt',
    expected_output: 'expected',
    assertions,
    files: [],
    should_trigger: false,
    stop_at: stopAt,
    grading: assertionRules ? { assertion_rules: assertionRules } : undefined,
  };
}

describe('gradeCase', () => {
  it('passes a trigger boundary when the output contains eval brief ready', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createTriggerCase(['new-skill workflow'], [{ markers: ['workflow: new-skill'] }]),
      mode: 'with_skill',
      output: 'Workflow: new-skill\nEval Brief Ready',
      passingScoreThreshold: 1,
    });

    expect(result.checks[0]).toMatchObject({
      label: 'Boundary stop condition',
      status: 'PASS',
    });
    expect(result.checks[1]).toMatchObject({
      label: 'Assertion 1',
      status: 'PASS',
    });
    expect(result.score).toBe(1);
    expect(result.passed).toBe(true);
  });

  it('fails a stop-and-ask boundary when clarification language is too weak', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createNonTriggerCase(
        'stop_and_ask',
        ['detect multiple workflows in one request'],
        [{ markers: ['multiple', 'workflows'] }],
      ),
      mode: 'without_skill',
      output: 'Please review this later.',
      passingScoreThreshold: 0.5,
    });

    expect(result.checks[0]).toMatchObject({
      label: 'Clarification boundary',
      status: 'FAIL',
    });
    expect(result.checks[1]).toMatchObject({
      label: 'Assertion 1',
      status: 'FAIL',
    });
    expect(result.score).toBe(0);
  });

  it('does not treat substring matches as valid clarification markers', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createNonTriggerCase(
        'stop_and_ask',
        ['detect multiple workflows in one request'],
        [{ markers: ['multiple', 'workflows'] }],
      ),
      mode: 'without_skill',
      output: 'This is narrowly scoped and refers to declarify notes only.',
      passingScoreThreshold: 0.5,
    });

    expect(result.checks[0]).toMatchObject({
      label: 'Clarification boundary',
      status: 'FAIL',
    });
    expect(result.checks[1]).toMatchObject({
      label: 'Assertion 1',
      status: 'FAIL',
    });
  });

  it('passes a non-trigger boundary with explicit out-of-scope language', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createNonTriggerCase(
        'do_not_trigger',
        ['classify agents work as out of scope'],
        [{ markers: ['out of scope', 'agents'] }],
      ),
      mode: 'with_skill',
      output: 'Classification: non-trigger. This is OUT OF SCOPE for agents.',
      passingScoreThreshold: 1,
    });

    expect(result.checks[0]).toMatchObject({ status: 'PASS' });
    expect(result.checks[1]).toMatchObject({ status: 'PASS' });
    expect(result.passed).toBe(true);
  });

  it('passes explicit assertion rules when all configured markers are present', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createTriggerCase(
        ['freeze contract elements before final instructions'],
        [{ markers: ['freeze', 'contract', 'before', 'instructions'] }],
      ),
      mode: 'with_skill',
      output: 'classification: trigger\nfreeze the contract before instructions\neval brief ready',
      passingScoreThreshold: 1,
    });

    expect(result.checks[1]).toMatchObject({
      label: 'Assertion 1',
      status: 'PASS',
    });
  });

  it('fails explicit assertion rules when a configured marker is missing', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createTriggerCase(
        ['freeze contract elements before final instructions'],
        [{ markers: ['freeze', 'contract', 'before', 'instructions'] }],
      ),
      mode: 'with_skill',
      output: 'classification: trigger\nfreeze the contract\neval brief ready',
      passingScoreThreshold: 1,
    });

    expect(result.checks[1]).toMatchObject({
      label: 'Assertion 1',
      status: 'FAIL',
      evidence: 'Missing markers: before, instructions',
    });
  });

  it('fails explicit absent rules when a forbidden marker is present', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createNonTriggerCase(
        'do_not_trigger',
        ['avoid producing an eval brief'],
        [{ markers: ['eval brief ready'], absent: true }],
      ),
      mode: 'without_skill',
      output: 'classification: non-trigger\nout of scope\neval brief ready',
      passingScoreThreshold: 1,
    });

    expect(result.checks[1]).toMatchObject({
      label: 'Assertion 1',
      status: 'FAIL',
    });
    expect(result.checks[1].evidence).toContain('Unexpected markers present');
  });

  it('uses null assertion rules to fall back to keyword matching', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createNonTriggerCase('do_not_trigger', ['Alpha Beta Gamma'], [null]),
      mode: 'with_skill',
      output: 'classification: non-trigger\nout of scope\nALPHA and beta are both present',
      passingScoreThreshold: 0.5,
    });

    expect(result.checks[1]).toMatchObject({
      label: 'Assertion 1',
      status: 'PASS',
      evidence: 'Matched keywords: alpha, beta',
    });
  });

  it('does not treat substring matches as valid explicit markers', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createTriggerCase(['custom explicit rule'], [{ markers: ['alpha'] }]),
      mode: 'with_skill',
      output: 'classification: trigger\nalphabet soup\neval brief ready',
      passingScoreThreshold: 1,
    });

    expect(result.checks[1]).toMatchObject({
      label: 'Assertion 1',
      status: 'FAIL',
      evidence: 'Missing markers: alpha',
    });
  });

  it('does not pass fallback assertions made only of stopwords', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createNonTriggerCase('do_not_trigger', ['the and for this']),
      mode: 'with_skill',
      output: 'classification: non-trigger\nout of scope',
      passingScoreThreshold: 1,
    });

    expect(result.checks[1]).toMatchObject({
      label: 'Assertion 1',
      status: 'FAIL',
    });
    expect(result.checks[1].evidence).toContain('no-keywords');
  });
});

describe('gradeCase skill-forge parity', () => {
  it('keeps the single-marker structured assertion path for new-skill workflow', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createTriggerCase(
        ['must classify this as a new-skill workflow'],
        [{ markers: ['workflow: new-skill'] }],
      ),
      mode: 'with_skill',
      output: 'workflow: new-skill\nEval Brief ready',
      passingScoreThreshold: 1,
    });

    expect(result.checks[1]).toMatchObject({
      label: 'Assertion 1',
      status: 'PASS',
      evidence: 'Matched markers: workflow: new-skill',
    });
    expect(result.score).toBe(1);
    expect(result.passed).toBe(true);
  });

  it('keeps the multi-marker structured assertion path for downstream eval scaffold deferral', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createTriggerCase(
        ['must explicitly defer eval scaffold implementation'],
        [{ markers: ['downstream', 'out of scope'] }],
      ),
      mode: 'with_skill',
      output: 'classification: trigger\nthis work is downstream and out of scope\nEval Brief ready',
      passingScoreThreshold: 1,
    });

    expect(result.checks[1]).toMatchObject({
      label: 'Assertion 1',
      status: 'PASS',
      evidence: 'Matched markers: downstream, out of scope',
    });
    expect(result.score).toBe(1);
    expect(result.passed).toBe(true);
  });

  it('keeps the absent-marker structured assertion path for avoiding eval brief output', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createNonTriggerCase(
        'do_not_trigger',
        ['must avoid producing an Eval Brief'],
        [{ markers: ['eval brief ready'], absent: true }],
      ),
      mode: 'without_skill',
      output: 'classification: non-trigger\nthis request is out of scope for skill authoring',
      passingScoreThreshold: 1,
    });

    expect(result.checks[1]).toMatchObject({
      label: 'Assertion 1',
      status: 'PASS',
      evidence: 'Confirmed absence of markers: eval brief ready',
    });
    expect(result.score).toBe(1);
    expect(result.passed).toBe(true);
  });

  it('keeps the legacy keyword fallback path for assertions outside the hardcoded table', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createNonTriggerCase('do_not_trigger', ['Alpha Beta Gamma']),
      mode: 'with_skill',
      output: 'classification: non-trigger\nout of scope\nALPHA and beta are both present',
      passingScoreThreshold: 0.5,
    });

    expect(result.checks[1]).toMatchObject({
      label: 'Assertion 1',
      status: 'PASS',
      evidence: 'Matched keywords: alpha, beta',
    });
    expect(result.score).toBe(1);
    expect(result.passed).toBe(true);
  });

  it('keeps the current trigger boundary semantics based on Eval Brief ready', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createTriggerCase(
        ['must classify this as a new-skill workflow'],
        [{ markers: ['workflow: new-skill'] }],
      ),
      mode: 'with_skill',
      output: 'workflow: new-skill\nEval Brief ready',
      passingScoreThreshold: 1,
    });

    expect(result.checks[0]).toMatchObject({
      label: 'Boundary stop condition',
      status: 'PASS',
      evidence: 'Matched trigger markers: eval brief ready',
    });
  });

  it('keeps the current non-trigger boundary semantics based on non-trigger classification and out-of-scope language', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createNonTriggerCase(
        'do_not_trigger',
        ['must classify AGENTS work as out of scope'],
        [{ markers: ['out of scope', 'agents'] }],
      ),
      mode: 'without_skill',
      output: 'classification: non-trigger\nthis is out of scope for agents',
      passingScoreThreshold: 1,
    });

    expect(result.checks[0]).toMatchObject({
      label: 'Non-trigger boundary',
      status: 'PASS',
      evidence: 'Matched non-trigger markers: classification: non-trigger, out of scope',
    });
  });

  it('keeps the current stop-and-ask boundary semantics based on clarification language', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createNonTriggerCase(
        'stop_and_ask',
        ['must detect multiple workflows in one request'],
        [{ markers: ['multiple', 'workflows'] }],
      ),
      mode: 'without_skill',
      output: 'classification: stop-and-ask\nscope clarification required because the request mixes multiple workflows',
      passingScoreThreshold: 1,
    });

    expect(result.checks[0]).toMatchObject({
      label: 'Clarification boundary',
      status: 'PASS',
      evidence: 'Matched clarification markers: classification: stop-and-ask, scope clarification required, multiple workflows',
    });
  });
});

describe('createErroredCaseGrading', () => {
  it('returns a failed grading artifact with execution evidence', ({ expect }) => {
    const result = createErroredCaseGrading({
      caseDefinition: createTriggerCase(['new-skill workflow'], [{ markers: ['workflow: new-skill'] }]),
      mode: 'with_skill',
      error: {
        kind: 'execution_error',
        message: 'provider failed',
      },
    });

    expect(result).toMatchObject({
      case_id: 'trigger-case',
      mode: 'with_skill',
      score: 0,
      passed: false,
      checks: [
        {
          label: 'Execution failure',
          status: 'FAIL',
          evidence: 'execution_error: provider failed',
        },
      ],
    });
  });
});


