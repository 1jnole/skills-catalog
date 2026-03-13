import { describe, it } from 'vitest';

import { evalCaseSchema } from './eval-case.schema.js';

describe('evalCaseSchema', () => {
  it('parses a legacy case without grading rules', ({ expect }) => {
    const result = evalCaseSchema.parse({
      id: 'legacy-case',
      prompt: 'prompt',
      expected_output: 'expected',
      assertions: ['Alpha Beta Gamma'],
      files: [],
      should_trigger: false,
      stop_at: 'do_not_trigger',
    });

    expect(result.grading).toBeUndefined();
  });

  it('parses a case with aligned grading assertion rules', ({ expect }) => {
    const result = evalCaseSchema.parse({
      id: 'graded-case',
      prompt: 'prompt',
      expected_output: 'expected',
      assertions: ['must classify this as a new-skill workflow', 'Alpha Beta Gamma'],
      grading: {
        assertion_rules: [{ markers: ['workflow: new-skill'] }, null],
      },
      files: [],
      should_trigger: true,
      stop_at: 'Eval Brief ready',
    });

    expect(result.grading).toMatchObject({
      assertion_rules: [{ markers: ['workflow: new-skill'] }, null],
    });
  });

  it('rejects assertion rules that do not align one-to-one with assertions', ({ expect }) => {
    expect(() =>
      evalCaseSchema.parse({
        id: 'bad-rules-length',
        prompt: 'prompt',
        expected_output: 'expected',
        assertions: ['one', 'two'],
        grading: {
          assertion_rules: [{ markers: ['workflow: new-skill'] }],
        },
        files: [],
        should_trigger: true,
        stop_at: 'Eval Brief ready',
      }),
    ).toThrow('assertion_rules must align one-to-one with assertions.');
  });

  it('rejects explicit rules with empty markers', ({ expect }) => {
    expect(() =>
      evalCaseSchema.parse({
        id: 'bad-empty-markers',
        prompt: 'prompt',
        expected_output: 'expected',
        assertions: ['one'],
        grading: {
          assertion_rules: [{ markers: [] }],
        },
        files: [],
        should_trigger: false,
        stop_at: 'do_not_trigger',
      }),
    ).toThrow();
  });

  it('rejects explicit rules with empty marker strings', ({ expect }) => {
    expect(() =>
      evalCaseSchema.parse({
        id: 'bad-empty-marker-string',
        prompt: 'prompt',
        expected_output: 'expected',
        assertions: ['one'],
        grading: {
          assertion_rules: [{ markers: [''] }],
        },
        files: [],
        should_trigger: false,
        stop_at: 'do_not_trigger',
      }),
    ).toThrow();
  });
});
