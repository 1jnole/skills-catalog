- [x] 1.1 Identify the current scoring, gate, and benchmark aggregation paths in the runner.
- [x] 1.2 Define the normalized run result contract and decide where it lives in the source tree.
- [x] 1.3 Extract or refactor scoring logic to consume normalized results without legacy artifact layout dependence.
- [x] 1.4 Extract or refactor gate logic to consume normalized results without changing semantics.
- [x] 1.5 Extract or refactor benchmark aggregation to consume normalized results and preserve current `benchmark.json` semantics.
- [x] 1.6 Define and wire a neutral `run.json` contract with the required fields.
- [x] 1.7 Update docs and diagrams so benchmark semantics remain explicitly local to the repo.
- [x] 1.8 Run `npx tsc -p scripts/evals/tsconfig.json` and record evidence here.

## Evidence

- Command: `openspec new change "laminar-phase-2-pure-eval-logic"`
  Result: PASS
  Date: 2026-03-11
  Note: The phase 2 change skeleton was created before drafting artifacts.

- Command: `rg -n "runManifestArtifactSchema|normalizedCaseResultSchema|buildBenchmarkArtifact|buildRunManifestArtifact|writeRunManifest|run.json" scripts/evals -S`
  Result: PASS
  Date: 2026-03-11
  Note: Confirmed the normalized result contract lives in `scripts/evals/domain/`, benchmark aggregation is extracted to a pure domain service, and the runner now writes neutral `run.json`.
  Output:
  `scripts/evals/run/artifacts/write-run-artifacts.ts:3:import { buildBenchmarkArtifact, resolveStrongerMode } from '../../domain/services/benchmark.js';`
  `scripts/evals/run/artifacts/write-run-artifacts.ts:4:import { buildRunManifestArtifact } from '../../domain/services/run-results.js';`
  `scripts/evals/domain/schemas/run-result.schema.ts:17:export const normalizedCaseResultSchema = z.object({`
  `scripts/evals/domain/schemas/run-result.schema.ts:25:export const runManifestArtifactSchema = z.object({`
  `scripts/evals/run/execution/run-iteration.ts:169:  writeRunManifest({`

- Command: `rg -n "source of truth|benchmark semantics|Laminar.*benchmark|run.json" scripts/evals/README.md PLAN.md openspec/changes/laminar-phase-2-pure-eval-logic/specs -S`
  Result: PASS
  Date: 2026-03-11
  Note: Confirmed the active docs and specs describe benchmark semantics as local repo logic and `run.json` as the neutral execution artifact.
  Output:
  `scripts/evals/README.md:38:- packs/core/<skill-name>/evals/runs/iteration-N/run.json (neutral run metadata for the execution)`
  `scripts/evals/README.md:74:- Eval Brief, evals.json, local Zod schemas, local domain types, and benchmark semantics are the source of truth.`
  `openspec/changes/laminar-phase-2-pure-eval-logic/specs/laminar-pure-eval-logic/spec.md:17:### Requirement: Phase 2 SHALL define a neutral run.json`
  `openspec/changes/laminar-phase-2-pure-eval-logic/specs/laminar-public-boundaries/spec.md:4:Phase 1 SHALL update public documentation and architecture diagrams so they describe Laminar ... and the benchmark semantics as local repo logic`

- Command: `npx tsc -p scripts/evals/tsconfig.json`
  Result: PASS
  Date: 2026-03-11
  Note: The runner still typechecks after introducing normalized run results, pure benchmark aggregation, and `run.json`.
  Output:
  `(no output)`
