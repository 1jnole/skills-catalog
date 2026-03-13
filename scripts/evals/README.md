# Shared Eval Runner

This folder contains the shared offline eval runner used by multiple skills.

## Structure

- `commands/` exposes runnable commands and keeps argument parsing thin.
- `domain/types/` stores domain contracts.
- `domain/schemas/` stores Zod validators with the `*.schema.ts` convention.
- `domain/services/` stores runner-neutral benchmark and normalization logic.
- `platforms/laminar/` owns the active supported Laminar execution path.
- `run/definition/` loads and summarizes skill-local eval definitions.
- `run/execution/` keeps compatibility shims and thin shared helpers that are not the supported path owner.
- `run/artifacts/` manages the supported iteration files plus compatibility shims for moved historical helpers.
- `run/historical/` stores retained legacy helper implementations that are no longer part of the supported flow.
- `grading/` groups deterministic grading behavior.
- `providers/` isolates model providers such as OpenAI through AI SDK.
- `shared/` contains small helpers and cross-cutting input types/schemas.

## Conventions

- semantic contracts go in `types/` with the `*.types.ts` suffix
- Zod validators go in `schemas/` with the `*.schema.ts` suffix
- runner-neutral benchmark and normalization logic stays in `domain/services/`
- commands stay in `commands/`
- the active supported execution path stays in `platforms/laminar/`
- eval loading stays in `run/definition/`
- `run/execution/` is for compatibility shims or thin shared helpers, not for owning the supported path
- supported persisted run files stay in `run/artifacts/`
- historical compatibility helpers stay in `run/historical/`
- scoring logic stays in `grading/`
- model adapters stay in `providers/`

## Output layout

Each skill keeps its own run artifacts next to its eval definition:

- `packs/core/<skill-name>/evals/evals.json`
- `packs/core/<skill-name>/evals/files/`
- `packs/core/<skill-name>/evals/runs/iteration-N/run.json` (neutral run metadata for the execution)
- `packs/core/<skill-name>/evals/runs/iteration-N/benchmark.json` (gates, deltas, improvement summary, per-case comparison)

## Commands

1. Build the shared runner:
   `npx tsc -p scripts/evals/tsconfig.json`
2. Validate one skill definition:
   `node scripts/evals/dist/read-evals.js --skill-name skill-forge`
3. Run a new iteration through the supported public command:
   `node scripts/evals/dist/run-evals.js --skill-name skill-forge --model gpt-4.1-mini`
4. Re-run an existing iteration explicitly:
   `node scripts/evals/dist/run-evals.js --skill-name skill-forge --iteration 13 --model gpt-4.1-mini`
5. Re-run only errored cases in an existing iteration:
   `node scripts/evals/dist/run-evals.js --skill-name skill-forge --iteration 13 --retry-errors --model gpt-4.1-mini`

`run-iteration` remains a legacy compatibility alias and is no longer part of the supported command story.

## Requirements

The live runner expects:

- `LMNR_PROJECT_API_KEY` or `LMNR_API_KEY` as the Laminar project key
- `OPENAI_API_KEY`
- optional `EVAL_RUN_TIMEOUT_MS` as a positive integer timeout override
- installed `@lmnr-ai/lmnr`
- installed `ai`
- installed `@ai-sdk/openai`

The runner validates these prerequisites before it creates a new iteration folder, and it guards each `iteration-N` with a lock file so two live processes cannot mutate the same iteration concurrently.

## Benchmark semantics

- `Eval Brief`, `evals.json`, local Zod schemas, local domain types, and benchmark semantics are the source of truth.
- Laminar is an observability/eval platform boundary, not the authority for pass/fail semantics.
- `benchmark.json` is computed from normalized run results in `domain/`.
- Historical iterations may still contain legacy detailed per-case artifacts, but new supported iterations persist only `benchmark.json` and `run.json`.
- Historical helper implementations live under `run/historical/`; any old artifact-path imports are compatibility shims only.
## Unit test workflow

Use the shared runner with a small Red -> Green -> Refactor loop:

1. Write or adjust one colocated `*.test.ts` file for a single behavior.
2. Run `npm run test:watch` for fast feedback while iterating.
3. Keep the implementation minimal until the test passes.
4. Run `npm run test:run` plus `npx tsc -p scripts/evals/tsconfig.json` before closing the change.

### Supported commands

- `npm run test:watch` -- interactive Vitest watch mode for local TDD
- `npm run test:run` -- one-shot unit-test run
- `npm test` -- alias of the one-shot unit-test run

### Test placement

- Place tests next to the module they exercise as `*.test.ts`.
- The `scripts/evals/` TypeScript build excludes `*.test.ts`, so colocated tests stay out of `dist/`.
- Keep unit tests focused on deterministic domain logic; broader integration flows still belong to the existing runner commands.

## Assertion grading seam

- `expected_output` remains a narrative description for humans.
- `grading.assertion_rules` is an optional machine-readable seam for assertions that are too specific for keyword fallback.
- The current boundary protocol (`Eval Brief ready`, `do_not_trigger`, `stop_and_ask`) remains unchanged in this refactor.
