# Shared Eval Runner

This folder contains the shared offline eval runner used by multiple skills.

## Target scaffold

The runtime is being standardized around these ownership buckets:

- `commands/` for CLI entrypoints and argument parsing
- `application/` for supported use cases and coordination
- `domain/<subdomain>/` for domain contracts and pure business behavior
- `infrastructure/` for Laminar, providers, and filesystem
- `compatibility/` for historical helpers and migration shims only
- `shared/` for tiny technical helpers that are genuinely cross-cutting

Target shape:

```text
scripts/evals/
  commands/
  application/
    load-eval-definition/
    run-eval-iteration/
  domain/
    eval-case/
    eval-definition/
    grading/
    benchmark/
    run-results/
  infrastructure/
    filesystem/
      eval-runs/
    laminar/
    providers/
      openai/
  compatibility/
    commands/
    run-execution/
    historical-artifacts/
  shared/
    cli/
    json/
```

## Placement rules

- Folder names must describe ownership clearly.
- Use business-language subdomains inside `domain/`.
- Do not add new code to the root of `scripts/evals/` except docs, config, and required entrypoint wrappers.
- Do not add `utils/`, `helpers/`, or `misc/` folders.
- Do not add `index.ts` barrels.
- Keep imports direct to the owning file.

### Domain rules

`domain/` is not only for types.

`domain/` owns:
- domain schemas and inferred types
- pure business behavior
- grading semantics
- benchmark semantics
- normalized run-result semantics

`domain/` does not own:
- CLI parsing
- filesystem paths or writes
- Laminar SDK wiring
- provider SDK wiring
- orchestration loops
- compatibility shims

Inside `domain/`, prefer subdomain-local files such as:
- `domain/eval-case/eval-case.schema.ts`
- `domain/eval-case/eval-case.types.ts`
- `domain/benchmark/benchmark.ts`
- `domain/run-results/run-results.ts`

### Types and schemas

- `*.types.ts` should exist only when the type is shared by more than one file or context.
- Private types stay local to the module that uses them.
- When a Zod schema is canonical, prefer inferred types over handwritten duplicates.
- A schema belongs next to the concern that owns the runtime contract.
- CLI or adapter-only schemas do not belong in `domain/`.

### Application rules

`application/` owns supported use cases such as:
- loading eval definitions into the supported flow
- orchestrating one run iteration
- coordinating infrastructure and domain collaborators

`application/` must stay free of domain semantics and provider/platform-specific logic.

### Infrastructure rules

`infrastructure/laminar/` owns Laminar-specific execution and reporting glue.

`infrastructure/providers/` owns provider-specific integration.

`infrastructure/filesystem/eval-runs/` owns:
- iteration workspace resolution
- supported run artifact reads and writes
- locks and progress persistence

### Compatibility rules

Anything historical, aliased, or migration-only must live under `compatibility/` and be clearly non-authoritative for the supported path.

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
- Historical helper implementations live under `compatibility/`; any old artifact-path imports are compatibility shims only.

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
