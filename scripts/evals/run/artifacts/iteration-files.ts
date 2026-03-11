import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'node:process';

import { benchmarkArtifactSchema, benchmarkStubArtifactSchema } from '../../domain/schemas/run-artifact.schema.js';
import { type BenchmarkProgress, type BenchmarkStubArtifact } from '../../domain/types/run-artifact.types.js';
import { resolveEvalRunsRoot } from '../definition/load-eval-definition.js';
import { collectCaseIds, type EvalDefinition } from '../../domain/types/eval-definition.types.js';
import { readValidatedJsonFile, writeValidatedJsonFile } from '../../shared/json.js';

const iterationLockFileName = '.iteration.lock.json';

type IterationLockMetadata = {
  pid: number;
  created_at: string;
};

export type IterationWorkspace = {
  runsRoot: string;
  iterationNumber: number;
  iterationDir: string;
  benchmarkPath: string;
  runManifestPath: string;
  caseIds: string[];
  lockPath: string;
  releaseLock: () => void;
};

function listIterationNumbers(runsRoot: string): number[] {
  if (!fs.existsSync(runsRoot)) {
    return [];
  }

  return fs
    .readdirSync(runsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => /^iteration-(\d+)$/.exec(entry.name))
    .filter((match): match is RegExpExecArray => match !== null)
    .map((match) => Number.parseInt(match[1], 10))
    .sort((left, right) => left - right);
}

export function resolveNextIteration(runsRoot: string): number {
  const iterations = listIterationNumbers(runsRoot);
  const latestIteration = iterations.at(-1);
  return latestIteration === undefined ? 1 : latestIteration + 1;
}

function writeBenchmarkStub(
  benchmarkPath: string,
  sourceEvalPath: string,
  definition: EvalDefinition,
  iterationNumber: number,
  caseIds: string[],
): BenchmarkStubArtifact {
  return writeValidatedJsonFile(benchmarkPath, benchmarkStubArtifactSchema, {
    status: 'running',
    skill_name: definition.skill_name,
    eval_version: definition.eval_version,
    iteration: iterationNumber,
    created_at: new Date().toISOString(),
    source_eval_path: sourceEvalPath,
    case_ids: caseIds,
    total_cases: caseIds.length,
    progress: {
      completed_case_count: 0,
      error_case_count: 0,
      pending_case_count: caseIds.length,
    },
  });
}

function readErrorCode(error: unknown): string | undefined {
  return error instanceof Error && 'code' in error && typeof (error as { code?: unknown }).code === 'string'
    ? (error as { code: string }).code
    : undefined;
}

function readIterationLockMetadata(lockPath: string): IterationLockMetadata | null {
  if (!fs.existsSync(lockPath)) {
    return null;
  }

  try {
    const rawValue = JSON.parse(fs.readFileSync(lockPath, 'utf8')) as { pid?: unknown; created_at?: unknown };
    return typeof rawValue.pid === 'number' && Number.isInteger(rawValue.pid) && rawValue.pid > 0 && typeof rawValue.created_at === 'string'
      ? {
          pid: rawValue.pid,
          created_at: rawValue.created_at,
        }
      : null;
  } catch {
    return null;
  }
}

function isProcessAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return readErrorCode(error) === 'ESRCH' ? false : true;
  }
}

function canReclaimStaleIterationLock(lockPath: string): boolean {
  const metadata = readIterationLockMetadata(lockPath);
  return metadata !== null && !isProcessAlive(metadata.pid);
}

function buildIterationInUseMessage(iterationDir: string, lockPath: string): string {
  const metadata = readIterationLockMetadata(lockPath);
  const ownerSuffix = metadata ? ` Lock owner PID: ${metadata.pid}.` : '';
  return `Iteration is already in use: ${iterationDir}. Another live process holds ${lockPath}.${ownerSuffix}`;
}

function acquireIterationLock(iterationDir: string): Pick<IterationWorkspace, 'lockPath' | 'releaseLock'> {
  const lockPath = path.join(iterationDir, iterationLockFileName);
  const lockMetadata: IterationLockMetadata = {
    pid: process.pid,
    created_at: new Date().toISOString(),
  };

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      fs.writeFileSync(lockPath, JSON.stringify(lockMetadata, null, 2), { flag: 'wx' });

      return {
        lockPath,
        releaseLock: () => {
          if (fs.existsSync(lockPath)) {
            fs.rmSync(lockPath, { force: true });
          }
        },
      };
    } catch (error) {
      if (readErrorCode(error) === 'EEXIST' && canReclaimStaleIterationLock(lockPath)) {
        fs.rmSync(lockPath, { force: true });
        continue;
      }

      throw new Error(buildIterationInUseMessage(iterationDir, lockPath));
    }
  }

  throw new Error(buildIterationInUseMessage(iterationDir, lockPath));
}

export function resetBenchmarkToRunning(params: {
  benchmarkPath: string;
  sourceEvalPath: string;
  definition: EvalDefinition;
  iterationNumber: number;
  caseIds: string[];
}): BenchmarkStubArtifact {
  return writeBenchmarkStub(
    params.benchmarkPath,
    params.sourceEvalPath,
    params.definition,
    params.iterationNumber,
    params.caseIds,
  );
}

export function writeBenchmarkProgress(params: {
  benchmarkPath: string;
  currentCaseId?: string;
  lastCompletedCaseId?: string;
  completedCaseCount: number;
  errorCaseCount: number;
  pendingCaseCount: number;
}): BenchmarkStubArtifact | null {
  const rawBenchmark = JSON.parse(fs.readFileSync(params.benchmarkPath, 'utf8')) as { status?: unknown };
  if (rawBenchmark.status !== 'running') {
    benchmarkArtifactSchema.parse(rawBenchmark);
    return null;
  }

  const currentBenchmark = readValidatedJsonFile(params.benchmarkPath, benchmarkStubArtifactSchema);
  const nextProgress: BenchmarkProgress = {
    completed_case_count: params.completedCaseCount,
    error_case_count: params.errorCaseCount,
    pending_case_count: params.pendingCaseCount,
    current_case_id: params.currentCaseId,
    last_completed_case_id: params.lastCompletedCaseId,
  };

  return writeValidatedJsonFile(params.benchmarkPath, benchmarkStubArtifactSchema, {
    ...currentBenchmark,
    progress: nextProgress,
  });
}

export function createIterationWorkspace(
  definition: EvalDefinition,
  sourceEvalPath: string,
  requestedIteration?: number,
): IterationWorkspace {
  const runsRoot = resolveEvalRunsRoot(definition.skill_name);
  fs.mkdirSync(runsRoot, { recursive: true });

  const iterationNumber = requestedIteration ?? resolveNextIteration(runsRoot);
  const iterationDir = path.join(runsRoot, `iteration-${iterationNumber}`);

  try {
    fs.mkdirSync(iterationDir);
  } catch (error) {
    if (readErrorCode(error) === 'EEXIST') {
      throw new Error(`Iteration already exists: ${iterationDir}`);
    }

    throw error;
  }

  const lock = acquireIterationLock(iterationDir);
  const caseIds = collectCaseIds(definition);
  const benchmarkPath = path.join(iterationDir, 'benchmark.json');
  const runManifestPath = path.join(iterationDir, 'run.json');

  try {
    writeBenchmarkStub(
      benchmarkPath,
      path.relative(process.cwd(), sourceEvalPath),
      definition,
      iterationNumber,
      caseIds,
    );
  } catch (error) {
    lock.releaseLock();
    fs.rmSync(iterationDir, { force: true, recursive: true });
    throw error;
  }

  return {
    runsRoot,
    iterationNumber,
    iterationDir,
    benchmarkPath,
    runManifestPath,
    caseIds,
    lockPath: lock.lockPath,
    releaseLock: lock.releaseLock,
  };
}

export function openExistingIteration(skillName: string, iterationNumber: number): IterationWorkspace {
  const runsRoot = resolveEvalRunsRoot(skillName);
  const iterationDir = path.join(runsRoot, `iteration-${iterationNumber}`);

  if (!fs.existsSync(iterationDir)) {
    throw new Error(`Iteration does not exist: ${iterationDir}`);
  }

  const lock = acquireIterationLock(iterationDir);
  const benchmarkPath = path.join(iterationDir, 'benchmark.json');
  const runManifestPath = path.join(iterationDir, 'run.json');

  try {
    const caseIds = fs.existsSync(benchmarkPath)
      ? (() => {
          const rawBenchmark = JSON.parse(fs.readFileSync(benchmarkPath, 'utf8')) as {
            case_ids?: unknown;
            cases?: Array<{ case_id?: unknown }>;
          };

          if (Array.isArray(rawBenchmark.case_ids)) {
            return rawBenchmark.case_ids.filter((caseId): caseId is string => typeof caseId === 'string').sort();
          }

          if (Array.isArray(rawBenchmark.cases)) {
            return rawBenchmark.cases
              .map((entry) => entry.case_id)
              .filter((caseId): caseId is string => typeof caseId === 'string')
              .sort();
          }

          return [];
        })()
      : [];

    return {
      runsRoot,
      iterationNumber,
      iterationDir,
      benchmarkPath,
      runManifestPath,
      caseIds,
      lockPath: lock.lockPath,
      releaseLock: lock.releaseLock,
    };
  } catch (error) {
    lock.releaseLock();
    throw error;
  }
}

