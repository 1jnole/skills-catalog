import { afterEach, describe, it, vi } from 'vitest';

import { buildRunManifestArtifact, normalizeCaseArtifacts } from './run-results.js';
import type { CaseArtifacts } from './run.types.js';

afterEach(() => {
  vi.useRealTimers();
});

function createCaseArtifacts(): CaseArtifacts {
  return {
    case_id: 'case-one',
    should_trigger: true,
    expected_stop: 'Eval Brief ready',
    with_skill: {
      status: 'completed',
      duration_ms: 150,
      score: 1,
      passed: true,
      provider: 'openai',
      model: 'gpt-4.1-mini',
      usage: { inputTokens: 1, outputTokens: 2, totalTokens: 3 },
    },
    without_skill: {
      status: 'error',
      duration_ms: 75,
      score: 0,
      passed: false,
      error: { kind: 'timeout', message: 'slow' },
    },
  };
}

describe('normalizeCaseArtifacts', () => {
  it('maps the core result fields into the normalized shape', ({ expect }) => {
    const result = normalizeCaseArtifacts(createCaseArtifacts());

    expect(result).toMatchObject({
      case_id: 'case-one',
      should_trigger: true,
      expected_stop: 'Eval Brief ready',
      with_skill: {
        status: 'completed',
        duration_ms: 150,
        score: 1,
        passed: true,
      },
      without_skill: {
        status: 'error',
        duration_ms: 75,
        score: 0,
        passed: false,
        error: { kind: 'timeout', message: 'slow' },
      },
    });
  });

  it('preserves optional mode metadata only where it exists', ({ expect }) => {
    const result = normalizeCaseArtifacts(createCaseArtifacts());

    expect(result.with_skill).toMatchObject({
      provider: 'openai',
      model: 'gpt-4.1-mini',
      usage: { inputTokens: 1, outputTokens: 2, totalTokens: 3 },
    });
    expect(result.with_skill.error).toBeUndefined();
    expect(result.without_skill.provider).toBeUndefined();
    expect(result.without_skill.model).toBeUndefined();
    expect(result.without_skill.usage).toBeUndefined();
  });

  it('canonicalizes mode metadata according to status before exposing normalized output', ({ expect }) => {
    const result = normalizeCaseArtifacts({
      ...createCaseArtifacts(),
      with_skill: {
        status: 'error',
        duration_ms: 90,
        score: 0,
        passed: false,
        provider: 'openai',
        model: 'gpt-4.1-mini',
        usage: { totalTokens: 9 },
        error: { kind: 'execution_error', message: 'boom' },
      },
      without_skill: {
        status: 'completed',
        duration_ms: 60,
        score: 1,
        passed: true,
        error: { kind: 'timeout', message: 'should-not-survive' },
      },
    });

    expect(result.with_skill).toMatchObject({
      status: 'error',
      error: { kind: 'execution_error', message: 'boom' },
    });
    expect(result.with_skill.provider).toBeUndefined();
    expect(result.with_skill.model).toBeUndefined();
    expect(result.with_skill.usage).toBeUndefined();

    expect(result.without_skill).toMatchObject({
      status: 'completed',
      score: 1,
      passed: true,
    });
    expect(result.without_skill.error).toBeUndefined();
  });

  it('fills a fallback error payload when legacy errored artifacts omit error details', ({ expect }) => {
    const result = normalizeCaseArtifacts({
      ...createCaseArtifacts(),
      with_skill: {
        status: 'error',
        duration_ms: 42,
        score: 0,
        passed: false,
      },
      without_skill: {
        status: 'completed',
        duration_ms: 60,
        score: 1,
        passed: true,
      },
    });

    expect(result.with_skill.error).toMatchObject({
      kind: 'execution_error',
      message: 'missing error payload',
    });
  });
});

describe('buildRunManifestArtifact', () => {
  it('uses an explicit timestamp when provided', ({ expect }) => {
    const result = buildRunManifestArtifact({
      platform: 'laminar',
      skillName: 'skill-forge',
      evalVersion: 2,
      iterationNumber: 13,
      provider: 'openai',
      model: 'gpt-4.1-mini',
      createdAt: '2026-03-13T10:00:00.000Z',
    });

    expect(result).toMatchObject({
      platform: 'laminar',
      run_ref: 'iteration-13',
      group_ref: 'skill-forge/evals/v2',
      provider: 'openai',
      model: 'gpt-4.1-mini',
      skill_name: 'skill-forge',
      eval_version: 2,
      iteration: 13,
      created_at: '2026-03-13T10:00:00.000Z',
    });
  });

  it('generates a timestamp when createdAt is omitted', ({ expect }) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-13T12:34:56.000Z'));

    const result = buildRunManifestArtifact({
      platform: 'laminar',
      skillName: 'skill-forge',
      evalVersion: 2,
      iterationNumber: 14,
      provider: 'openai',
      model: 'gpt-4.1-mini',
    });

    expect(result.created_at).toBe('2026-03-13T12:34:56.000Z');
    expect(result.run_ref).toBe('iteration-14');
    expect(result.group_ref).toBe('skill-forge/evals/v2');
  });

  it('omits provider metadata when no provider is passed', ({ expect }) => {
    const result = buildRunManifestArtifact({
      platform: 'laminar',
      skillName: 'skill-forge',
      evalVersion: 2,
      iterationNumber: 15,
      model: 'gpt-4.1-mini',
      createdAt: '2026-03-13T13:00:00.000Z',
    });

    expect(result.provider).toBeUndefined();
    expect(result).toMatchObject({
      platform: 'laminar',
      run_ref: 'iteration-15',
      group_ref: 'skill-forge/evals/v2',
      model: 'gpt-4.1-mini',
      skill_name: 'skill-forge',
      eval_version: 2,
      iteration: 15,
      created_at: '2026-03-13T13:00:00.000Z',
    });
  });
});
