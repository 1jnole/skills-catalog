import * as fs from 'node:fs';
import * as path from 'node:path';

import { collectCases, type EvalDefinition } from '../../domain/eval-definition/eval-definition.types.js';
import { buildBenchmarkArtifact } from '../../domain/benchmark/benchmark.js';
import type { BenchmarkArtifact } from '../../domain/benchmark/benchmark.types.js';
import { normalizedCaseResultSchema } from '../../domain/run-results/run-result.schema.js';
import type { NormalizedCaseResult, NormalizedModeResult } from '../../domain/run-results/run-result.types.js';
import type { PromptfooPilotScoringArtifact, PromptfooModeOutput } from './pilot-scoring.js';

function modeOutputToNormalizedResult(params: {
  modeOutput: PromptfooModeOutput;
  grading: PromptfooPilotScoringArtifact['cases'][number]['with_skill'];
}): NormalizedModeResult {
  if (params.modeOutput.status === 'error') {
    return {
      status: 'error',
      duration_ms: params.modeOutput.duration_ms,
      score: params.grading.score,
      passed: params.grading.passed,
      error: params.modeOutput.error,
    };
  }

  return {
    status: 'completed',
    duration_ms: params.modeOutput.duration_ms,
    score: params.grading.score,
    passed: params.grading.passed,
    provider: params.modeOutput.provider,
    model: params.modeOutput.model,
  };
}

function missingModeOutputError(mode: 'with_skill' | 'without_skill'): PromptfooModeOutput {
  return {
    status: 'error',
    duration_ms: 0,
    error: {
      kind: 'execution_error',
      message: `missing ${mode} promptfoo output`,
    },
  };
}

export function resolveGeneratedPromptfooBenchmarkPath(skillName: string): string {
  return path.resolve('evals', 'engines', 'promptfoo', 'generated', `${skillName}.benchmark.json`);
}

export function buildPromptfooPilotNormalizedResults(params: {
  definition: EvalDefinition;
  scoringArtifact: PromptfooPilotScoringArtifact;
  caseModeOutputs: Map<string, Partial<Record<'with_skill' | 'without_skill', PromptfooModeOutput>>>;
}): NormalizedCaseResult[] {
  const cases = collectCases(params.definition);

  return cases.map((caseDefinition) => {
    const scoringCase = params.scoringArtifact.cases.find((entry) => entry.case_id === caseDefinition.id);
    if (!scoringCase) {
      throw new Error(`Missing scoring result for case: ${caseDefinition.id}`);
    }

    const caseOutputs = params.caseModeOutputs.get(caseDefinition.id);
    const withSkillOutput = caseOutputs?.with_skill ?? missingModeOutputError('with_skill');
    const withoutSkillOutput = caseOutputs?.without_skill ?? missingModeOutputError('without_skill');

    return normalizedCaseResultSchema.parse({
      case_id: caseDefinition.id,
      should_trigger: caseDefinition.should_trigger,
      expected_stop: caseDefinition.stop_at,
      with_skill: modeOutputToNormalizedResult({
        modeOutput: withSkillOutput,
        grading: scoringCase.with_skill,
      }),
      without_skill: modeOutputToNormalizedResult({
        modeOutput: withoutSkillOutput,
        grading: scoringCase.without_skill,
      }),
    });
  });
}

export function buildPromptfooPilotBenchmarkArtifact(params: {
  definition: EvalDefinition;
  scoringArtifact: PromptfooPilotScoringArtifact;
  caseModeOutputs: Map<string, Partial<Record<'with_skill' | 'without_skill', PromptfooModeOutput>>>;
  iterationNumber?: number;
  completedAt?: string;
}): BenchmarkArtifact {
  const caseResults = buildPromptfooPilotNormalizedResults(params);

  return buildBenchmarkArtifact({
    skillName: params.definition.skill_name,
    evalVersion: params.definition.eval_version,
    iterationNumber: params.iterationNumber ?? 1,
    caseResults,
    gates: params.definition.gates,
    completedAt: params.completedAt,
  });
}

export function writePromptfooPilotBenchmarkArtifact(filePath: string, artifact: BenchmarkArtifact): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(artifact, null, 2)}\n`, 'utf8');
}
