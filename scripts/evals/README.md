# Evals Runtime

This folder contains the portable eval core plus the supported CLI surface for the closed migration state.

## Final supported path

The supported command surface is:
- `npm run read-evals -- -- --skill-name skill-forge`
- `npm run run-evals -- -- --skill-name skill-forge ...`

The canonical suite for `skill-forge` is:
- `evals/cases/skill-forge/suite.v1.json`

The final supported-path summary lives at:
- `evals/final-supported-path.md`

## Current scaffold

The runtime is organized by ownership:

- `cli/` for supported CLI entrypoints and argument parsing
- `application/` for supported use cases and orchestration
- `domain/<subdomain>/` for domain contracts and pure business behavior
- `infrastructure/` for Laminar-backed execution and filesystem concerns
- `shared/` for tiny technical helpers that are genuinely cross-cutting

Current shape:

```text
scripts/evals/
  cli/
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
  shared/
    cli/
```

Root-level files are intentionally minimal:

- `README.md` and `tsconfig.json` remain at the root as stable package metadata

## Placement rules

- Folder names must describe ownership clearly.
- Use business-language subdomains inside `domain/`.
- Do not add new code to the root of `scripts/evals/` except docs and config.
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

`infrastructure/laminar/` is historical compatibility code and is not the active supported path.

`infrastructure/filesystem/eval-runs/` owns:
- iteration workspace resolution
- supported run artifact reads and writes
- locks and progress persistence

## Output layout

The supported `skill-forge` flow writes generated artifacts to:

- `evals/engines/promptfoo/generated/skill-forge.promptfoo.json`
- `evals/engines/promptfoo/generated/skill-forge.eval.json`
- `evals/engines/promptfoo/generated/skill-forge.scoring.json`
- `evals/engines/promptfoo/generated/skill-forge.benchmark.json`

## Commands

### Supported flow

1. Build the eval package:
   `npm run build-evals`
2. Validate the canonical suite by skill name:
   `npm run read-evals -- -- --skill-name skill-forge`
3. Dry-run the supported execution command:
   `npm run run-evals -- -- --skill-name skill-forge --dry-run`
4. Run the canonical suite offline with fixed outputs:
   `npm run run-evals -- -- --skill-name skill-forge --model-outputs evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json`

This is the only supported execution path.

### Optional output overrides

1. Write local scoring output to a custom path:
   `npm run run-evals -- -- --skill-name skill-forge --score-output evals/engines/promptfoo/generated/custom.scoring.json`
2. Write local benchmark output to a custom path:
   `npm run run-evals -- -- --skill-name skill-forge --benchmark-output evals/engines/promptfoo/generated/custom.benchmark.json`

When forwarding CLI args through `npm run`, use `npm run <script> -- -- <args>`.

## Requirements

The supported path expects:
- `OPENAI_API_KEY` for live Promptfoo execution
- or `--model-outputs <file>` for offline deterministic smoke runs

The primary `skill-forge` suite lives at:
- `evals/cases/skill-forge/suite.v1.json`

Historical references kept outside the supported path:
- `evals/cases/skill-forge/pilot-suite.v1.json`
- `packs/core/skill-forge/evals/evals.json`

## Benchmark semantics

- `Eval Brief`, `evals/cases/<skill>/suite.v1.json`, local Zod schemas, local domain types, and benchmark semantics are the source of truth.
- Promptfoo is the engine adapter, not the authority for pass/fail semantics.
- `benchmark.json` is computed from normalized run results in `domain/`.
- Generated benchmark output for `skill-forge` lives at `evals/engines/promptfoo/generated/skill-forge.benchmark.json`.

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
