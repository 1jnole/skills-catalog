# Laminar Migration - Phase 0 Baseline

This note is the canonical baseline for Phase 0 of the Laminar migration. It records the current runner state before any naming, architecture, or platform refactor lands.

## Scope of this baseline

- inventory the current runner commands, folders, and docs
- classify current pieces as `source of truth`, `legacy but still needed`, or `stale / safe to ignore during migration`
- freeze `skill-forge` as the only migration pilot
- capture the accepted parity baseline and artifact paths
- record legacy artifact coupling and naming or documentation drift

## Current runner inventory

### Active commands in source

- `scripts/evals/read-evals.ts`
  Thin source entrypoint that imports `scripts/evals/commands/read-evals.ts`.
- `scripts/evals/run-iteration.ts`
  Thin source entrypoint that imports `scripts/evals/commands/run-iteration.ts`.
- `scripts/evals/commands/read-evals.ts`
  Validates and prints one eval definition.
- `scripts/evals/commands/run-iteration.ts`
  Runs a benchmark iteration for one eval definition.

### Active runner folders in source

- `scripts/evals/commands/`
  CLI entrypoints and argument parsing.
- `scripts/evals/domain/schemas/`
  Zod runtime contracts for eval definitions and run artifacts.
- `scripts/evals/domain/types/`
  Domain types for cases, definitions, grading, and run artifacts.
- `scripts/evals/run/definition/`
  Eval-definition loading and run-root resolution.
- `scripts/evals/run/execution/`
  Iteration execution, mode dispatch, prompt building, and workspace resolution.
- `scripts/evals/run/artifacts/`
  Iteration directory creation, benchmark writing, and artifact re-reading.
- `scripts/evals/grading/`
  Deterministic grading and trigger or non-trigger assertions.
- `scripts/evals/providers/`
  Model-provider integration through AI SDK.
- `scripts/evals/lmnr/`
  Empty transitional source directory present before Phase 1 renames the canonical Laminar boundary.
- `scripts/evals/shared/`
  Shared JSON and CLI helpers.

### Current runner docs

- `scripts/evals/README.md`
  Describes the shared offline runner, current commands, and current artifact layout.
- `packs/core/skill-forge/evals/README.md`
  Describes `skill-forge` eval ownership and local run artifact placement.
- `roadmap/laminar-migration-phase-0-tasks.md`
  Operational task list for this phase.
- `PLAN.md`
  Migration architecture and transition plan; updated in this phase only where the current-state description drifted from the code.

## Classification

### Source of truth

- `packs/core/skill-forge/evals/evals.json`
  Canonical eval definition for the migration pilot.
- `scripts/evals/read-evals.ts`
- `scripts/evals/run-iteration.ts`
- `scripts/evals/commands/`
- `scripts/evals/domain/schemas/`
- `scripts/evals/domain/types/`
- `scripts/evals/run/definition/`
- `scripts/evals/run/execution/`
- `scripts/evals/run/artifacts/`
- `scripts/evals/grading/`
- `scripts/evals/providers/openai-provider.ts`
- `scripts/evals/lmnr/`
  Transitional source location that exists in the pre-phase-1 tree but does not yet contain the canonical platform boundary.
- `scripts/evals/shared/`
- `scripts/evals/README.md`
- `packs/core/skill-forge/evals/README.md`

### Legacy but still needed

- `scripts/evals/dist/`
  Generated runtime output used by the documented `node scripts/evals/dist/...` command path, but not the editing source of truth.
- `packs/core/skill-forge/evals/runs/iteration-1/`
  Accepted passing benchmark baseline for later parity checks.
- `packs/core/skill-forge/evals/runs/iteration-2/`
  Real completed run history that shows current instability against the target baseline.
- Detailed per-case artifact layout under `packs/core/<skill-name>/evals/runs/iteration-N/<case-id>/`
  Still read and written by current code, so later phases must remove or normalize this coupling intentionally.

### Stale / safe to ignore during migration

- `run-lmnr-eval` as a top-level source command
  No source entrypoint exists under `scripts/evals/`; current references are drift or generated remnants.
- `packs/core/skill-forge/evals/runs/iteration-3/benchmark.json`
  Incomplete `running` stub, not a parity baseline.
- Documentation that implies `run-lmnr-eval` is the current source command
  This was drift from an earlier spike rather than the current source layout.

## Migration pilot freeze

- `skill-forge` is the only migration pilot for phases 0 to 3.
- No other skill should be added to the Laminar migration path until `skill-forge` preserves parity in the supported flow.

## Accepted parity baseline

### Accepted baseline artifact

- `packs/core/skill-forge/evals/runs/iteration-1/benchmark.json`

### Why this is the accepted baseline

- `iteration-1` is the completed benchmark in the repo that satisfies the target gates:
  - `overall_passed: true`
  - `golden_gate_passed: true`
  - `negative_gate_passed: true`
- `iteration-2` is completed but fails parity:
  - `overall_passed: false`
  - `golden_pass_rate: 0.75`
- `iteration-3` is still `running` and is not usable as a baseline.

### Baseline expectations frozen for later phases

- `overall_passed: true`
- `with_skill` outperforms `without_skill`
- trigger cases remain aligned with `Eval Brief ready`
- non-trigger cases remain aligned with `do_not_trigger`
- stop-and-ask cases remain aligned with `stop_and_ask`

### Baseline evidence from `iteration-1`

- `completed_case_count: 8`
- `error_case_count: 0`
- `with_skill.pass_rate: 1`
- `without_skill.pass_rate: 0`
- `with_skill.average_score: 0.84`
- `without_skill.average_score: 0.22`
- `improvement_summary.pass.net_improvement: 8`

## Legacy artifact coupling

The current runner still depends on the following legacy artifact layout:

- `outputs/`
  `scripts/evals/run/artifacts/read-run-artifacts.ts` reads `outputs/with_skill.json` and `outputs/without_skill.json`.
- `timing.json`
  `scripts/evals/run/artifacts/read-run-artifacts.ts` and `write-run-artifacts.ts` read or write it.
- `grading.json`
  `scripts/evals/run/artifacts/read-run-artifacts.ts` and `write-run-artifacts.ts` read or write it.
- `feedback.json`
  `scripts/evals/run/artifacts/read-run-artifacts.ts` and `write-run-artifacts.ts` read or write it.
- `with_skill/`
  `scripts/evals/run/artifacts/iteration-files.ts` creates the folder for each case.
- `without_skill/`
  `scripts/evals/run/artifacts/iteration-files.ts` creates the folder for each case.

Phase 2 must remove or neutralize these dependencies intentionally rather than assuming they are already gone.

## Naming and documentation drift

### Confirmed drift

- `PLAN.md` previously described the current state as `run-lmnr-eval / run-iteration`.
  The actual source entrypoints are `read-evals` and `run-iteration`.
- `run-lmnr-eval` appears in `scripts/evals/dist/` as generated output, but there is no source file under `scripts/evals/` that defines it today.
- `scripts/evals/lmnr/` exists in source as an empty transitional directory.

### Active names that are still current in Phase 0

- `read-evals`
- `run-iteration`
- `scripts/evals/lmnr/` exists but is not yet the canonical Laminar platform boundary
- `scripts/evals/providers/` is the current provider-layer location

### Docs or artifacts that later phases must revisit

- `scripts/evals/README.md`
  It still documents the legacy artifact layout because the current runner still writes and reads it.
- `PLAN.md`
  Future phases must continue updating the target architecture and transitional diagrams as naming and boundaries change.
- `roadmap/laminar-migration-phase-1-tasks.md`
  It already anticipates `run-evals` and a temporary `run-lmnr-eval` alias, but that alias does not exist as a current source command in phase 0.

## Real current-state summary

The repo currently starts from this shape:

- source commands: `read-evals` and `run-iteration`
- provider integration: `scripts/evals/providers/openai-provider.ts`
- active benchmark semantics: local `benchmark.json`
- active detailed artifacts: `outputs/`, `timing.json`, `grading.json`, `feedback.json`, `with_skill/`, `without_skill/`
- pilot eval definition: `packs/core/skill-forge/evals/evals.json`
- accepted passing baseline: `packs/core/skill-forge/evals/runs/iteration-1/benchmark.json`

This is the baseline that phases 1 to 3 must preserve while changing naming, boundaries, and Laminar integration.
