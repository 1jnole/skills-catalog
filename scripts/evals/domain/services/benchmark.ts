import { type BenchmarkArtifact } from '../types/run-artifact.types.js';
import type { BuildBenchmarkArtifactParams } from '../types/benchmark.types.js';

import {
  buildBenchmarkComparison,
  buildBenchmarkGateResults,
  buildBenchmarkImprovementSummary,
} from './benchmark-artifact-sections.js';
import { resolveStrongerMode, summarizeBenchmarkCase } from './benchmark-case-summary.js';
import { createBenchmarkRollup, reduceBenchmarkRollup } from './benchmark-rollup.js';

export { resolveStrongerMode } from './benchmark-case-summary.js';

export function buildBenchmarkArtifact(params: BuildBenchmarkArtifactParams): BenchmarkArtifact {
  const caseSummaries = params.caseResults.map(summarizeBenchmarkCase);
  const rollup = caseSummaries.reduce(reduceBenchmarkRollup, createBenchmarkRollup());
  const gateResults = buildBenchmarkGateResults({
    gateTotals: rollup.gateTotals,
    gates: params.gates,
    caseCount: params.caseResults.length,
    errorCaseCount: rollup.errorCaseCount,
  });

  return {
    status: rollup.errorCaseCount === 0 ? 'completed' : 'completed_with_errors',
    skill_name: params.skillName,
    eval_version: params.evalVersion,
    iteration: params.iterationNumber,
    completed_at: params.completedAt ?? new Date().toISOString(),
    gate_results: gateResults,
    comparison: buildBenchmarkComparison(rollup.modeTotals),
    improvement_summary: buildBenchmarkImprovementSummary(rollup.improvementTotals, rollup.modeTotals),
    cases: caseSummaries.map((summary) => summary.caseEntry),
  };
}
