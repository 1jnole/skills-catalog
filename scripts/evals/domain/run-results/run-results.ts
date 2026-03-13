import { type CaseArtifacts } from './run.types.js';
import { type NormalizedCaseResult, type RunManifestArtifact } from './run-result.types.js';

export function normalizeCaseArtifacts(caseArtifacts: CaseArtifacts): NormalizedCaseResult {
  return {
    case_id: caseArtifacts.case_id,
    should_trigger: caseArtifacts.should_trigger,
    expected_stop: caseArtifacts.expected_stop,
    with_skill: {
      status: caseArtifacts.with_skill.status,
      duration_ms: caseArtifacts.with_skill.duration_ms,
      score: caseArtifacts.with_skill.score,
      passed: caseArtifacts.with_skill.passed,
      provider: caseArtifacts.with_skill.provider,
      model: caseArtifacts.with_skill.model,
      usage: caseArtifacts.with_skill.usage,
      error: caseArtifacts.with_skill.error,
    },
    without_skill: {
      status: caseArtifacts.without_skill.status,
      duration_ms: caseArtifacts.without_skill.duration_ms,
      score: caseArtifacts.without_skill.score,
      passed: caseArtifacts.without_skill.passed,
      provider: caseArtifacts.without_skill.provider,
      model: caseArtifacts.without_skill.model,
      usage: caseArtifacts.without_skill.usage,
      error: caseArtifacts.without_skill.error,
    },
  };
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

