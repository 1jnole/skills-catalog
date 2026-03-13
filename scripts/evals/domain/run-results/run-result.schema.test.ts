import { describe, it } from 'vitest';

import { normalizedCaseResultSchema, runManifestArtifactSchema } from './run-result.schema.js';

describe('surviving core run-result contracts', () => {
  it('parses a provider-neutral normalized case result for the supported baseline', ({ expect }) => {
    const result = normalizedCaseResultSchema.parse({
      case_id: 'case-one',
      should_trigger: true,
      expected_stop: 'Eval Brief ready',
      with_skill: {
        status: 'completed',
        duration_ms: 120,
        score: 1,
        passed: true,
        model: 'gpt-4.1-mini',
      },
      without_skill: {
        status: 'error',
        duration_ms: 80,
        score: 0,
        passed: false,
        error: {
          kind: 'timeout',
          message: 'slow',
        },
      },
    });

    expect(result.with_skill.provider).toBeUndefined();
    expect(result.without_skill.provider).toBeUndefined();
    expect(result.expected_stop).toBe('Eval Brief ready');
  });

  it('parses a canonical run manifest without requiring provider metadata', ({ expect }) => {
    const result = runManifestArtifactSchema.parse({
      platform: 'laminar',
      run_ref: 'iteration-7',
      group_ref: 'skill-forge/evals/v1',
      model: 'gpt-4.1-mini',
      skill_name: 'skill-forge',
      eval_version: 1,
      iteration: 7,
      created_at: '2026-03-13T10:00:00.000Z',
    });

    expect(result.provider).toBeUndefined();
    expect(result.iteration).toBe(7);
    expect(result.skill_name).toBe('skill-forge');
  });
});
