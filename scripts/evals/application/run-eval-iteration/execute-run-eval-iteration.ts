import * as path from 'node:path';

import { normalizeCaseArtifacts } from '../../domain/run-results/run-results.js';
import { benchmarkArtifactSchema } from '../../domain/run-results/run-artifact.schema.js';
import { runManifestArtifactSchema } from '../../domain/run-results/run-result.schema.js';
import { type EvalCase, type EvalCaseMode } from '../../domain/eval-case/eval-case.types.js';
import { collectCaseIds, collectCases, type EvalDefinition } from '../../domain/eval-definition/eval-definition.types.js';
import { type ModeArtifacts } from '../../domain/run-results/run-artifact.types.js';
import { type NormalizedCaseResult } from '../../domain/run-results/run-result.types.js';
import { type CaseArtifacts } from '../../domain/run-results/run.types.js';
import {
  resetBenchmarkToRunning,
  writeBenchmarkProgress,
  type IterationWorkspace,
} from '../../infrastructure/filesystem/eval-runs/iteration-files.js';
import { readCompletedBenchmarkCaseArtifacts } from '../../infrastructure/filesystem/eval-runs/read-run-artifacts.js';
import { executeReadEvalDefinition } from '../load-eval-definition/read-eval-definition.js';
import { resolveWorkspace } from '../../infrastructure/filesystem/eval-runs/resolve-workspace.js';
import { buildLaminarBenchmark, buildLaminarRunManifest } from '../../infrastructure/laminar/report.js';
import { assertLaminarReady } from '../../infrastructure/laminar/executor.js';
import { executeMode } from '../../infrastructure/laminar/execute-mode.js';
import { readSkillPrompt } from '../../infrastructure/filesystem/read-skill-prompt.js';
import { writeValidatedJsonFile } from '../../infrastructure/filesystem/eval-runs/validated-json-file.js';
import { type RunEvalIterationInput, type RunEvalIterationResult } from './run-eval-iteration.types.js';

type ExecuteModeResult = {
  modeArtifacts: ModeArtifacts;
};

type RunIterationPorts = {
  readDefinition: typeof executeReadEvalDefinition;
  assertPlatformReady: typeof assertLaminarReady;
  resolveWorkspace: typeof resolveWorkspace;
  readSkillPrompt: typeof readSkillPrompt;
  readCompletedArtifacts: typeof readCompletedBenchmarkCaseArtifacts;
  resetRunningState: typeof resetBenchmarkToRunning;
  writeProgress: typeof writeBenchmarkProgress;
  executeMode: (params: {
    skillName: string;
    caseDefinition: EvalCase;
    mode: EvalCaseMode;
    modelId: string;
    skillPrompt: string | null;
    passingScoreThreshold: number;
    timeoutMs: number;
  }) => Promise<ExecuteModeResult>;
  normalizeCaseArtifacts: typeof normalizeCaseArtifacts;
  buildBenchmark: typeof buildLaminarBenchmark;
  buildRunManifest: typeof buildLaminarRunManifest;
  writeValidatedJsonFile: typeof writeValidatedJsonFile;
  relativeSourceEvalPath: (filePath: string) => string;
  logger: Pick<typeof console, 'log'>;
};

type RunIterationContext = {
  filePath: string;
  definition: EvalDefinition;
  timeoutMs: number;
  workspace: IterationWorkspace;
  skillPrompt: string;
  cases: EvalCase[];
  existingArtifactsByCaseId: Map<string, CaseArtifacts>;
};

const defaultPorts: RunIterationPorts = {
  readDefinition: executeReadEvalDefinition,
  assertPlatformReady: assertLaminarReady,
  resolveWorkspace,
  readSkillPrompt,
  readCompletedArtifacts: readCompletedBenchmarkCaseArtifacts,
  resetRunningState: resetBenchmarkToRunning,
  writeProgress: writeBenchmarkProgress,
  executeMode,
  normalizeCaseArtifacts,
  buildBenchmark: buildLaminarBenchmark,
  buildRunManifest: buildLaminarRunManifest,
  writeValidatedJsonFile,
  relativeSourceEvalPath: (filePath) => path.relative(process.cwd(), filePath),
  logger: console,
};

function countErroredCases(caseResults: CaseArtifacts[]): number {
  return caseResults.filter((caseResult) => caseResult.with_skill.error || caseResult.without_skill.error).length;
}

function hasCaseError(caseArtifacts: CaseArtifacts): boolean {
  return Boolean(caseArtifacts.with_skill.error || caseArtifacts.without_skill.error);
}

function logModeResult(logger: Pick<typeof console, 'log'>, modeLabel: string, caseArtifacts: CaseArtifacts['with_skill']): void {
  const statusSuffix = caseArtifacts.status === 'error'
    ? `error (${caseArtifacts.error?.kind}: ${caseArtifacts.error?.message})`
    : `completed score=${caseArtifacts.score} passed=${caseArtifacts.passed}`;

  logger.log(`  ${modeLabel}: ${statusSuffix}`);
  logger.log(`  duration_ms: ${caseArtifacts.duration_ms}`);
}

function logSkippedCase(logger: Pick<typeof console, 'log'>, caseArtifacts: CaseArtifacts): void {
  logger.log('  skipped: existing artifacts reused');
  logModeResult(logger, 'with_skill', caseArtifacts.with_skill);
  logModeResult(logger, 'without_skill', caseArtifacts.without_skill);
}

function logRetriedCase(logger: Pick<typeof console, 'log'>, caseArtifacts: CaseArtifacts): void {
  logger.log('  retrying: existing case had error artifacts');
  logModeResult(logger, 'with_skill', caseArtifacts.with_skill);
  logModeResult(logger, 'without_skill', caseArtifacts.without_skill);
}

async function createRunIterationContext(input: RunEvalIterationInput, ports: RunIterationPorts): Promise<RunIterationContext> {
  const { filePath, definition } = ports.readDefinition({
    skillName: input.skillName,
    file: input.file,
  });
  const timeoutMs = await ports.assertPlatformReady();
  const workspace = ports.resolveWorkspace(input, definition.skill_name, filePath, definition);
  const cases = collectCases(definition);

  return {
    filePath,
    definition,
    timeoutMs,
    workspace,
    skillPrompt: ports.readSkillPrompt(definition.skill_name),
    cases,
    existingArtifactsByCaseId: ports.readCompletedArtifacts(workspace.benchmarkPath, cases),
  };
}

function maybeResetRunningState(input: RunEvalIterationInput, context: RunIterationContext, ports: RunIterationPorts): void {
  if (!input.iteration || !input.retryErrors) {
    return;
  }

  ports.resetRunningState({
    benchmarkPath: context.workspace.benchmarkPath,
    sourceEvalPath: ports.relativeSourceEvalPath(context.filePath),
    definition: context.definition,
    iterationNumber: context.workspace.iterationNumber,
    caseIds: collectCaseIds(context.definition),
  });
}

function writeCaseProgress(params: {
  ports: RunIterationPorts;
  context: RunIterationContext;
  caseResults: CaseArtifacts[];
  currentCaseId?: string;
  lastCompletedCaseId?: string;
}): void {
  params.ports.writeProgress({
    benchmarkPath: params.context.workspace.benchmarkPath,
    currentCaseId: params.currentCaseId,
    lastCompletedCaseId: params.lastCompletedCaseId,
    completedCaseCount: params.caseResults.length,
    errorCaseCount: countErroredCases(params.caseResults),
    pendingCaseCount: params.context.cases.length - params.caseResults.length,
  });
}

async function executeCaseModes(params: {
  input: RunEvalIterationInput;
  context: RunIterationContext;
  ports: RunIterationPorts;
  caseDefinition: EvalCase;
}): Promise<CaseArtifacts> {
  const withSkill = await params.ports.executeMode({
    skillName: params.context.definition.skill_name,
    caseDefinition: params.caseDefinition,
    mode: 'with_skill',
    modelId: params.input.model,
    skillPrompt: params.context.skillPrompt,
    passingScoreThreshold: params.context.definition.gates.case_score_threshold,
    timeoutMs: params.context.timeoutMs,
  });
  const withoutSkill = await params.ports.executeMode({
    skillName: params.context.definition.skill_name,
    caseDefinition: params.caseDefinition,
    mode: 'without_skill',
    modelId: params.input.model,
    skillPrompt: null,
    passingScoreThreshold: params.context.definition.gates.case_score_threshold,
    timeoutMs: params.context.timeoutMs,
  });

  return {
    case_id: params.caseDefinition.id,
    expected_stop: params.caseDefinition.stop_at,
    should_trigger: params.caseDefinition.should_trigger,
    with_skill: withSkill.modeArtifacts,
    without_skill: withoutSkill.modeArtifacts,
  };
}

async function runCases(
  input: RunEvalIterationInput,
  context: RunIterationContext,
  ports: RunIterationPorts,
): Promise<CaseArtifacts[]> {
  const caseResults: CaseArtifacts[] = [];

  ports.logger.log(`Starting iteration ${context.workspace.iterationNumber} for ${context.definition.skill_name}`);
  ports.logger.log(`Total cases: ${context.cases.length}`);

  for (const [index, caseDefinition] of context.cases.entries()) {
    const existingCaseArtifacts = context.existingArtifactsByCaseId.get(caseDefinition.id);
    const shouldRetryExistingErrors = Boolean(existingCaseArtifacts && input.retryErrors && hasCaseError(existingCaseArtifacts));

    if (existingCaseArtifacts && !shouldRetryExistingErrors) {
      caseResults.push(existingCaseArtifacts);
      writeCaseProgress({
        ports,
        context,
        caseResults,
        lastCompletedCaseId: caseDefinition.id,
      });

      ports.logger.log(`[${index + 1}/${context.cases.length}] ${caseDefinition.id}`);
      logSkippedCase(ports.logger, existingCaseArtifacts);
      continue;
    }

    writeCaseProgress({
      ports,
      context,
      caseResults,
      currentCaseId: caseDefinition.id,
      lastCompletedCaseId: caseResults.at(-1)?.case_id,
    });

    ports.logger.log(`[${index + 1}/${context.cases.length}] ${caseDefinition.id}`);
    if (shouldRetryExistingErrors && existingCaseArtifacts) {
      logRetriedCase(ports.logger, existingCaseArtifacts);
    }

    const caseArtifacts = await executeCaseModes({
      input,
      context,
      ports,
      caseDefinition,
    });

    caseResults.push(caseArtifacts);
    writeCaseProgress({
      ports,
      context,
      caseResults,
      lastCompletedCaseId: caseDefinition.id,
    });

    logModeResult(ports.logger, 'with_skill', caseArtifacts.with_skill);
    logModeResult(ports.logger, 'without_skill', caseArtifacts.without_skill);
  }

  return caseResults;
}

function persistRunOutputs(
  input: RunEvalIterationInput,
  context: RunIterationContext,
  caseResults: CaseArtifacts[],
  ports: RunIterationPorts,
): void {
  const normalizedCaseResults = caseResults.map(ports.normalizeCaseArtifacts);
  const provider = resolveRunProvider(normalizedCaseResults);

  ports.writeValidatedJsonFile(
    context.workspace.benchmarkPath,
    benchmarkArtifactSchema,
    ports.buildBenchmark({
      skillName: context.definition.skill_name,
      evalVersion: context.definition.eval_version,
      iterationNumber: context.workspace.iterationNumber,
      caseResults: normalizedCaseResults,
      definition: context.definition,
    }),
  );

  ports.writeValidatedJsonFile(
    context.workspace.runManifestPath,
    runManifestArtifactSchema,
    ports.buildRunManifest({
      skillName: context.definition.skill_name,
      evalVersion: context.definition.eval_version,
      iterationNumber: context.workspace.iterationNumber,
      provider,
      model: input.model,
    }),
  );

  ports.logger.log(`Iteration ${context.workspace.iterationNumber} finished.`);
}

function resolveRunProvider(caseResults: NormalizedCaseResult[]): string | undefined {
  for (const caseResult of caseResults) {
    if (caseResult.with_skill.provider) {
      return caseResult.with_skill.provider;
    }

    if (caseResult.without_skill.provider) {
      return caseResult.without_skill.provider;
    }
  }

  return undefined;
}

export async function executeRunEvalIterationWithPorts(
  input: RunEvalIterationInput,
  ports: RunIterationPorts,
): Promise<RunEvalIterationResult> {
  const context = await createRunIterationContext(input, ports);

  try {
    maybeResetRunningState(input, context, ports);
    const caseResults = await runCases(input, context, ports);
    persistRunOutputs(input, context, caseResults, ports);

    return {
      iterationDir: context.workspace.iterationDir,
      iterationNumber: context.workspace.iterationNumber,
    };
  } finally {
    context.workspace.releaseLock();
  }
}

export async function executeRunEvalIteration(input: RunEvalIterationInput): Promise<RunEvalIterationResult> {
  return executeRunEvalIterationWithPorts(input, defaultPorts);
}


