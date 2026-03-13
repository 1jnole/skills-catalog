import * as fs from 'node:fs';

import { benchmarkArtifactSchema } from '../../../domain/run-results/run-artifact.schema.js';
import { type EvalCase } from '../../../domain/eval-case/eval-case.types.js';
import { type BenchmarkArtifact } from '../../../domain/run-results/run-artifact.types.js';
import { type CaseArtifacts } from '../../../domain/run-results/run.types.js';

function toCaseArtifactsFromBenchmarkEntry(caseDefinition: EvalCase, benchmark: BenchmarkArtifact): CaseArtifacts | null {
  const caseEntry = benchmark.cases.find((entry) => entry.case_id === caseDefinition.id);
  if (!caseEntry) {
    return null;
  }

  return {
    case_id: caseDefinition.id,
    expected_stop: caseDefinition.stop_at,
    should_trigger: caseDefinition.should_trigger,
    with_skill: {
      status: caseEntry.with_skill.status,
      duration_ms: caseEntry.with_skill.duration_ms,
      score: caseEntry.with_skill.score,
      passed: caseEntry.with_skill.passed,
      error: caseEntry.with_skill.error,
    },
    without_skill: {
      status: caseEntry.without_skill.status,
      duration_ms: caseEntry.without_skill.duration_ms,
      score: caseEntry.without_skill.score,
      passed: caseEntry.without_skill.passed,
      error: caseEntry.without_skill.error,
    },
  };
}

export function readCompletedBenchmarkCaseArtifacts(
  benchmarkPath: string,
  caseDefinitions: EvalCase[],
): Map<string, CaseArtifacts> {
  if (!fs.existsSync(benchmarkPath)) {
    return new Map();
  }

  const rawBenchmark = JSON.parse(fs.readFileSync(benchmarkPath, 'utf8')) as { status?: unknown };
  if (rawBenchmark.status !== 'completed' && rawBenchmark.status !== 'completed_with_errors') {
    return new Map();
  }

  const benchmark = benchmarkArtifactSchema.parse(rawBenchmark);
  return new Map(
    caseDefinitions
      .map((caseDefinition) => {
        const caseArtifacts = toCaseArtifactsFromBenchmarkEntry(caseDefinition, benchmark);
        return caseArtifacts ? [caseDefinition.id, caseArtifacts] : null;
      })
      .filter((entry): entry is [string, CaseArtifacts] => entry !== null),
  );
}

export { readLegacyCaseArtifactsIfComplete } from '../../../compatibility/historical-artifacts/read-legacy-case-artifacts.js';





