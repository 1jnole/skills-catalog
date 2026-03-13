import { type CaseArtifacts } from './run.types.js';
import { normalizedCaseResultSchema } from './run-result.schema.js';
import { type NormalizedCaseResult, type NormalizedModeResult, type RunManifestArtifact } from './run-result.types.js';

function normalizeModeArtifacts(modeArtifacts: CaseArtifacts['with_skill']): NormalizedModeResult {
  if (modeArtifacts.status === 'error') {
    return {
      status: 'error',
      duration_ms: modeArtifacts.duration_ms,
      score: modeArtifacts.score,
      passed: modeArtifacts.passed,
      error: modeArtifacts.error ?? {
        kind: 'execution_error',
        message: 'missing error payload',
      },
    };
  }

  return {
    status: 'completed',
    duration_ms: modeArtifacts.duration_ms,
    score: modeArtifacts.score,
    passed: modeArtifacts.passed,
    provider: modeArtifacts.provider,
    model: modeArtifacts.model,
    usage: modeArtifacts.usage,
  };
}

export function normalizeCaseArtifacts(caseArtifacts: CaseArtifacts): NormalizedCaseResult {
  return normalizedCaseResultSchema.parse({
    case_id: caseArtifacts.case_id,
    should_trigger: caseArtifacts.should_trigger,
    expected_stop: caseArtifacts.expected_stop,
    with_skill: normalizeModeArtifacts(caseArtifacts.with_skill),
    without_skill: normalizeModeArtifacts(caseArtifacts.without_skill),
  });
}

export function buildRunManifestArtifact(params: {
  platform: string;
  skillName: string;
  evalVersion: number;
  iterationNumber: number;
  provider?: string;
  model: string;
  createdAt?: string;
}): RunManifestArtifact {
  return {
    platform: params.platform,
    run_ref: `iteration-${params.iterationNumber}`,
    group_ref: `${params.skillName}/evals/v${params.evalVersion}`,
    ...(params.provider ? { provider: params.provider } : {}),
    model: params.model,
    skill_name: params.skillName,
    eval_version: params.evalVersion,
    iteration: params.iterationNumber,
    created_at: params.createdAt ?? new Date().toISOString(),
  };
}

