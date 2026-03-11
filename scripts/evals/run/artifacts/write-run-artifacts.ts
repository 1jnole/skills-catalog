import { buildBenchmarkArtifact } from '../../domain/services/benchmark.js';
import { buildRunManifestArtifact } from '../../domain/services/run-results.js';
import { benchmarkArtifactSchema } from '../../domain/schemas/run-artifact.schema.js';
import { runManifestArtifactSchema } from '../../domain/schemas/run-result.schema.js';
import { type EvalDefinition } from '../../domain/types/eval-definition.types.js';
import { type NormalizedCaseResult } from '../../domain/types/run-result.types.js';
import { writeValidatedJsonFile } from '../../shared/json.js';

export function writeBenchmark(params: {
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

export function writeRunManifest(params: {
  runManifestPath: string;
  skillName: string;
  evalVersion: number;
  iterationNumber: number;
  provider: string;
  model: string;
}): void {
  const runManifestArtifact = buildRunManifestArtifact({
    skillName: params.skillName,
    evalVersion: params.evalVersion,
    iterationNumber: params.iterationNumber,
    provider: params.provider,
    model: params.model,
  });

  writeValidatedJsonFile(params.runManifestPath, runManifestArtifactSchema, runManifestArtifact);
}
