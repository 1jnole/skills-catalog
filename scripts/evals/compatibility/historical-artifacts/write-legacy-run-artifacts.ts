import { buildBenchmarkArtifact } from '../../domain/benchmark/benchmark.js';
import { buildRunManifestArtifact } from '../../domain/run-results/run-results.js';
import { benchmarkArtifactSchema } from '../../domain/run-results/run-artifact.schema.js';
import { runManifestArtifactSchema } from '../../domain/run-results/run-result.schema.js';
import { type EvalDefinition } from '../../domain/eval-definition/eval-definition.types.js';
import { type NormalizedCaseResult } from '../../domain/run-results/run-result.types.js';
import { writeValidatedJsonFile } from '../../infrastructure/filesystem/eval-runs/validated-json-file.js';

export function writeLegacyBenchmark(params: {
  benchmarkPath: string;
  skillName: string;
  evalVersion: number;
  iterationNumber: number;
  caseResults: NormalizedCaseResult[];
  gates: EvalDefinition['gates'];
}): void {
  const benchmarkArtifact = buildBenchmarkArtifact({
    skillName: params.skillName,
    evalVersion: params.evalVersion,
    iterationNumber: params.iterationNumber,
    caseResults: params.caseResults,
    gates: params.gates,
  });

  writeValidatedJsonFile(params.benchmarkPath, benchmarkArtifactSchema, benchmarkArtifact);
}

export function writeLegacyRunManifest(params: {
  runManifestPath: string;
  skillName: string;
  evalVersion: number;
  iterationNumber: number;
  provider: string;
  model: string;
}): void {
  const runManifestArtifact = buildRunManifestArtifact({
    platform: 'legacy-runner',
    skillName: params.skillName,
    evalVersion: params.evalVersion,
    iterationNumber: params.iterationNumber,
    provider: params.provider,
    model: params.model,
  });

  writeValidatedJsonFile(params.runManifestPath, runManifestArtifactSchema, runManifestArtifact);
}



