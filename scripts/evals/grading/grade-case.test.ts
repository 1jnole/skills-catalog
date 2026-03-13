import { describe, it } from 'vitest';

import { createErroredCaseGrading, gradeCase } from './grade-case.js';
import type { EvalCase } from '../domain/types/eval-case.types.js';

function createTriggerCase(assertions: string[]): EvalCase {
  return {
    id: 'trigger-case',
    prompt: 'prompt',
    expected_output: 'expected',
    assertions,
    files: [],
    should_trigger: true,
    stop_at: 'Eval Brief ready',
  };
}

function createNonTriggerCase(stopAt: 'do_not_trigger' | 'stop_and_ask', assertions: string[]): EvalCase {
  return {
    id: `${stopAt}-case`,
    prompt: 'prompt',
    expected_output: 'expected',
    assertions,
    files: [],
    should_trigger: false,
    stop_at: stopAt,
  };
}

describe('gradeCase', () => {
  it('passes a trigger boundary when the output contains eval brief ready', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createTriggerCase(['new-skill workflow']),
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
      caseDefinition: createNonTriggerCase('stop_and_ask', ['detect multiple workflows in one request']),
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
      caseDefinition: createNonTriggerCase('stop_and_ask', ['detect multiple workflows in one request']),
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
      caseDefinition: createNonTriggerCase('do_not_trigger', ['classify agents work as out of scope']),
      mode: 'with_skill',
      output: 'Classification: non-trigger. This is OUT OF SCOPE for agents.',
      passingScoreThreshold: 1,
    });

    expect(result.checks[0]).toMatchObject({ status: 'PASS' });
    expect(result.checks[1]).toMatchObject({ status: 'PASS' });
    expect(result.passed).toBe(true);
  });

  it('passes structured assertions that match in any mode', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createTriggerCase(['new-skill workflow']),
      mode: 'with_skill',
      output: 'classification: trigger\nworkflow: new-skill\neval brief ready',
      passingScoreThreshold: 1,
    });

    expect(result.checks[1]).toMatchObject({
      label: 'Assertion 1',
      status: 'PASS',
    });
  });

  it('passes structured assertions that require all markers', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createTriggerCase(['freeze contract elements before final instructions']),
      mode: 'with_skill',
      output: 'classification: trigger\nfreeze the contract before instructions\neval brief ready',
      passingScoreThreshold: 1,
    });

    expect(result.checks[1]).toMatchObject({
      label: 'Assertion 1',
      status: 'PASS',
    });
  });

  it('fails structured assertions in absent mode when a forbidden marker is present', ({ expect }) => {
    const result = gradeCase({
      caseDefinition: createNonTriggerCase('do_not_trigger', ['avoid producing an eval brief']),
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

  it('falls back to keyword matching and stays case-insensitive', ({ expect }) => {
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

describe('createErroredCaseGrading', () => {
  it('returns a failed grading artifact with execution evidence', ({ expect }) => {
    const result = createErroredCaseGrading({
      caseDefinition: createTriggerCase(['new-skill workflow']),
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
