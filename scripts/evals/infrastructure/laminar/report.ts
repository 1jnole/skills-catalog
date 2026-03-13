import { buildBenchmarkArtifact } from '../../domain/benchmark/benchmark.js';
import { type BenchmarkArtifact } from '../../domain/benchmark/benchmark.types.js';
import { buildRunManifestArtifact } from '../../domain/run-results/run-results.js';
import { type EvalDefinition } from '../../domain/eval-definition/eval-definition.types.js';
import { type NormalizedCaseResult, type RunManifestArtifact } from '../../domain/run-results/run-result.types.js';

// Owns platform-specific reporting glue while keeping benchmark semantics in the domain layer.
export function buildLaminarRunManifest(params: {
  skillName: string;
  evalVersion: number;
  iterationNumber: number;
  provider?: string;
  model: string;
  runRef?: string;
  groupRef?: string;
  createdAt?: string;
}): RunManifestArtifact {
  return {
    ...buildRunManifestArtifact({
      platform: 'laminar',
      skillName: params.skillName,
      evalVersion: params.evalVersion,
      iterationNumber: params.iterationNumber,
      provider: params.provider,
      model: params.model,
      createdAt: params.createdAt,
    }),
    run_ref: params.runRef ?? `iteration-${params.iterationNumber}`,
    group_ref: params.groupRef ?? `${params.skillName}/evals/v${params.evalVersion}`,
  };
}

export function buildLaminarBenchmark(params: {
  skillName: string;
  evalVersion: number;
  iterationNumber: number;
  caseResults: NormalizedCaseResult[];
  definition: EvalDefinition;
  completedAt?: string;
}): BenchmarkArtifact {
  return buildBenchmarkArtifact({
    skillName: params.skillName,
    evalVersion: params.evalVersion,
    iterationNumber: params.iterationNumber,
    caseResults: params.caseResults,
    gates: params.definition.gates,
    completedAt: params.completedAt,
  });
}

