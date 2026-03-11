import * as path from 'node:path';

import { writeBenchmark, writeRunManifest } from '../artifacts/write-run-artifacts.js';
import {
  resetBenchmarkToRunning,
  writeBenchmarkProgress,
} from '../artifacts/iteration-files.js';
import { normalizeCaseArtifacts } from '../../domain/services/run-results.js';
import { readCompletedBenchmarkCaseArtifacts } from '../artifacts/read-run-artifacts.js';
import { executeReadEvalDefinition } from '../definition/read-eval-definition.js';
import { collectCaseIds, collectCases } from '../../domain/types/eval-definition.types.js';
import { type RunEvalIterationInput, type RunEvalIterationResult, type CaseArtifacts } from '../../domain/types/run.types.js';
import { assertOpenAiReady, readSkillPrompt } from '../../providers/openai-provider.js';
import { executeMode } from './execute-mode.js';
import { resolveWorkspace } from './resolve-workspace.js';

function countErroredCases(caseResults: CaseArtifacts[]): number {
  return caseResults.filter((caseResult) => caseResult.with_skill.error || caseResult.without_skill.error).length;
}

function hasCaseError(caseArtifacts: CaseArtifacts): boolean {
  return Boolean(caseArtifacts.with_skill.error || caseArtifacts.without_skill.error);
}

function logModeResult(modeLabel: string, caseArtifacts: CaseArtifacts['with_skill']): void {
  const statusSuffix = caseArtifacts.status === 'error'
    ? `error (${caseArtifacts.error?.kind}: ${caseArtifacts.error?.message})`
    : `completed score=${caseArtifacts.score} passed=${caseArtifacts.passed}`;

  console.log(`  ${modeLabel}: ${statusSuffix}`);
  console.log(`  duration_ms: ${caseArtifacts.duration_ms}`);
}

function logSkippedCase(caseArtifacts: CaseArtifacts): void {
  console.log('  skipped: existing artifacts reused');
  logModeResult('with_skill', caseArtifacts.with_skill);
  logModeResult('without_skill', caseArtifacts.without_skill);
}

function logRetriedCase(caseArtifacts: CaseArtifacts): void {
  console.log('  retrying: existing case had error artifacts');
  logModeResult('with_skill', caseArtifacts.with_skill);
  logModeResult('without_skill', caseArtifacts.without_skill);
}

export async function executeRunEvalIteration(input: RunEvalIterationInput): Promise<RunEvalIterationResult> {
  const { filePath, definition } = executeReadEvalDefinition({
    skillName: input.skillName,
    file: input.file,
  });

  await assertOpenAiReady();

  const workspace = resolveWorkspace(input, definition.skill_name, filePath, definition);
  const skillPrompt = readSkillPrompt(definition.skill_name);
  const caseResults: CaseArtifacts[] = [];
  const cases = collectCases(definition);
  const benchmarkCaseArtifacts = readCompletedBenchmarkCaseArtifacts(workspace.benchmarkPath, cases);

  if (input.iteration && input.retryErrors) {
    resetBenchmarkToRunning({
      benchmarkPath: workspace.benchmarkPath,
      sourceEvalPath: path.relative(process.cwd(), filePath),
      definition,
      iterationNumber: workspace.iterationNumber,
      caseIds: collectCaseIds(definition),
    });
  }

  console.log(`Starting iteration ${workspace.iterationNumber} for ${definition.skill_name}`);
  console.log(`Total cases: ${cases.length}`);

  for (const [index, caseDefinition] of cases.entries()) {
    const existingCaseArtifacts = benchmarkCaseArtifacts.get(caseDefinition.id);
    const shouldRetryExistingErrors = Boolean(existingCaseArtifacts && input.retryErrors && hasCaseError(existingCaseArtifacts));

    if (existingCaseArtifacts && !shouldRetryExistingErrors) {
      caseResults.push(existingCaseArtifacts);
      writeBenchmarkProgress({
        benchmarkPath: workspace.benchmarkPath,
        currentCaseId: undefined,
        lastCompletedCaseId: caseDefinition.id,
        completedCaseCount: caseResults.length,
        errorCaseCount: countErroredCases(caseResults),
        pendingCaseCount: cases.length - caseResults.length,
      });

      console.log(`[${index + 1}/${cases.length}] ${caseDefinition.id}`);
      logSkippedCase(existingCaseArtifacts);
      continue;
    }

    writeBenchmarkProgress({
      benchmarkPath: workspace.benchmarkPath,
      currentCaseId: caseDefinition.id,
      lastCompletedCaseId: caseResults.at(-1)?.case_id,
      completedCaseCount: caseResults.length,
      errorCaseCount: countErroredCases(caseResults),
      pendingCaseCount: cases.length - caseResults.length,
    });

    console.log(`[${index + 1}/${cases.length}] ${caseDefinition.id}`);
    if (shouldRetryExistingErrors && existingCaseArtifacts) {
      logRetriedCase(existingCaseArtifacts);
    }

    const withSkill = await executeMode({
      skillName: definition.skill_name,
      caseDefinition,
      mode: 'with_skill',
      modelId: input.model,
      skillPrompt,
      passingScoreThreshold: definition.gates.case_score_threshold,
    });
    const withoutSkill = await executeMode({
      skillName: definition.skill_name,
      caseDefinition,
      mode: 'without_skill',
      modelId: input.model,
      skillPrompt: null,
      passingScoreThreshold: definition.gates.case_score_threshold,
    });

    const caseArtifacts: CaseArtifacts = {
      case_id: caseDefinition.id,
      expected_stop: caseDefinition.stop_at,
      should_trigger: caseDefinition.should_trigger,
      with_skill: withSkill.modeArtifacts,
      without_skill: withoutSkill.modeArtifacts,
    };

    caseResults.push(caseArtifacts);
    writeBenchmarkProgress({
      benchmarkPath: workspace.benchmarkPath,
      currentCaseId: undefined,
      lastCompletedCaseId: caseDefinition.id,
      completedCaseCount: caseResults.length,
      errorCaseCount: countErroredCases(caseResults),
      pendingCaseCount: cases.length - caseResults.length,
    });

    logModeResult('with_skill', caseArtifacts.with_skill);
    logModeResult('without_skill', caseArtifacts.without_skill);
  }

  writeBenchmark({
    benchmarkPath: workspace.benchmarkPath,
    skillName: definition.skill_name,
    evalVersion: definition.eval_version,
    iterationNumber: workspace.iterationNumber,
    caseResults: caseResults.map(normalizeCaseArtifacts),
    gates: definition.gates,
  });

  writeRunManifest({
    runManifestPath: workspace.runManifestPath,
    skillName: definition.skill_name,
    evalVersion: definition.eval_version,
    iterationNumber: workspace.iterationNumber,
    provider: 'openai',
    model: input.model,
  });

  console.log(`Iteration ${workspace.iterationNumber} finished.`);

  return {
    iterationDir: workspace.iterationDir,
    iterationNumber: workspace.iterationNumber,
  };
}
