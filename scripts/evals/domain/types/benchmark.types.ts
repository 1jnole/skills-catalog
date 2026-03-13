import { type EvalDefinition } from '../types/eval-definition.types.js';
import { type BenchmarkArtifact, type CaseBenchmarkEntry } from '../types/run-artifact.types.js';
import { type NormalizedCaseResult } from '../types/run-result.types.js';

export type BuildBenchmarkArtifactParams = {
  skillName: string;
  evalVersion: number;
  iterationNumber: number;
  caseResults: NormalizedCaseResult[];
  gates: EvalDefinition['gates'];
  completedAt?: string;
};

export type BenchmarkModeTotals = {
  passed: number;
  total: number;
  totalScore: number;
  totalDurationMs: number;
  errorCount: number;
};

export type BenchmarkCaseSummary = {
  caseEntry: CaseBenchmarkEntry;
  scoreDelta: number;
  passDelta: number;
  hasCaseError: boolean;
  isTriggerCase: boolean;
  withSkill: NormalizedCaseResult['with_skill'];
  withoutSkill: NormalizedCaseResult['without_skill'];
};

export type BenchmarkRollup = {
  modeTotals: {
    with_skill: BenchmarkModeTotals;
    without_skill: BenchmarkModeTotals;
  };
  gateTotals: {
    goldenPassed: number;
    goldenTotal: number;
    negativePassed: number;
    negativeTotal: number;
  };
  improvementTotals: {
    scoreImprovedCases: number;
    scoreRegressedCases: number;
    scoreTiedCases: number;
    passImprovedCases: number;
    passRegressedCases: number;
    passTiedCases: number;
  };
  errorCaseCount: number;
};

export type BenchmarkComparison = BenchmarkArtifact['comparison'];
export type BenchmarkGateResults = BenchmarkArtifact['gate_results'];
export type BenchmarkImprovementSummary = BenchmarkArtifact['improvement_summary'];
