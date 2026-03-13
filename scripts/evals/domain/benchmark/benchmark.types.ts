import type { StrongerMode } from '../baseline/baseline.js';
import type { GradingError } from '../grading/grading.types.js';
import { type NormalizedCaseResult } from '../run-results/run-result.types.js';

export type BenchmarkExpectedStop = 'Eval Brief ready' | 'do_not_trigger' | 'stop_and_ask';
export type BenchmarkModeStatus = 'completed' | 'error';

export type BenchmarkModeEntry = {
  status: BenchmarkModeStatus;
  score: number;
  passed: boolean;
  duration_ms: number;
  error?: GradingError;
};

export type CaseBenchmarkEntry = {
  case_id: string;
  should_trigger: boolean;
  expected_stop: BenchmarkExpectedStop;
  stronger_mode: StrongerMode;
  score_delta: number;
  pass_delta: number;
  with_skill: BenchmarkModeEntry;
  without_skill: BenchmarkModeEntry;
};

export type BenchmarkGates = {
  golden_pass_rate: number;
  negative_pass_rate: number;
  case_score_threshold: number;
};

export type BenchmarkComparison = {
  with_skill: {
    pass_rate: number;
    average_score: number;
    average_duration_ms: number;
    error_count: number;
  };
  without_skill: {
    pass_rate: number;
    average_score: number;
    average_duration_ms: number;
    error_count: number;
  };
  deltas: {
    pass_rate: number;
    average_score: number;
    average_duration_ms: number;
    error_count: number;
  };
};

export type BenchmarkGateResults = {
  golden_pass_rate: number;
  negative_pass_rate: number;
  case_score_threshold: number;
  golden_gate_passed: boolean;
  negative_gate_passed: boolean;
  overall_passed: boolean;
  completed_case_count: number;
  error_case_count: number;
};

export type BenchmarkImprovementSummary = {
  score: {
    improved_cases: number;
    regressed_cases: number;
    tied_cases: number;
    net_improvement: number;
  };
  pass: {
    improved_cases: number;
    regressed_cases: number;
    tied_cases: number;
    net_improvement: number;
  };
};

export type BenchmarkArtifact = {
  status: 'completed' | 'completed_with_errors';
  skill_name: string;
  eval_version: number;
  iteration: number;
  completed_at: string;
  gate_results: BenchmarkGateResults;
  comparison: BenchmarkComparison;
  improvement_summary: BenchmarkImprovementSummary;
  cases: CaseBenchmarkEntry[];
};

export type BuildBenchmarkArtifactParams = {
  skillName: string;
  evalVersion: number;
  iterationNumber: number;
  caseResults: NormalizedCaseResult[];
  gates: BenchmarkGates;
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

