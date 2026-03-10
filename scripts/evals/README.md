# Shared Eval Runner

This folder contains the shared offline eval runner used by multiple skills.

## Structure

- `commands/` exposes runnable commands and keeps argument parsing thin.
- `domain/types/` stores domain contracts.
- `domain/schemas/` stores Zod validators with the `*.schema.ts` convention.
- `run/definition/` loads and summarizes skill-local eval definitions.
- `run/execution/` coordinates iteration execution and prompt preparation.
- `run/artifacts/` manages iteration files, folders, and artifact writing.
- `grading/` groups deterministic grading behavior.
- `providers/` isolates model providers such as OpenAI through AI SDK.
- `shared/` contains small helpers and cross-cutting input types/schemas.

## Conventions

- semantic contracts go in `types/` with the `*.types.ts` suffix
- Zod validators go in `schemas/` with the `*.schema.ts` suffix
- commands stay in `commands/`
- eval loading stays in `run/definition/`
- execution flow stays in `run/execution/`
- persisted run files and artifact handling stays in `run/artifacts/`
- scoring logic stays in `grading/`
- model adapters stay in `providers/`

## Output layout

Each skill keeps its own run artifacts next to its eval definition:

- `packs/core/<skill-name>/evals/evals.json`
- `packs/core/<skill-name>/evals/files/`
- `packs/core/<skill-name>/evals/runs/iteration-N/benchmark.json` (gates, deltas, improvement summary, per-case comparison)
- `packs/core/<skill-name>/evals/runs/iteration-N/<case-id>/with_skill/`
- `packs/core/<skill-name>/evals/runs/iteration-N/<case-id>/without_skill/`
- `packs/core/<skill-name>/evals/runs/iteration-N/<case-id>/outputs/`
- `packs/core/<skill-name>/evals/runs/iteration-N/<case-id>/timing.json`
- `packs/core/<skill-name>/evals/runs/iteration-N/<case-id>/grading.json`
- `packs/core/<skill-name>/evals/runs/iteration-N/<case-id>/feedback.json`

## Commands

1. Build the shared runner:
   `npx tsc -p scripts/evals/tsconfig.json`
2. Validate one skill definition:
   `node scripts/evals/dist/read-evals.js --skill-name skill-forge`
3. Run a new iteration:
   `node scripts/evals/dist/run-iteration.js --skill-name skill-forge --model gpt-4.1-mini`
4. Re-run an existing iteration explicitly:
   `node scripts/evals/dist/run-iteration.js --skill-name skill-forge --iteration 2 --model gpt-4.1-mini`
5. Re-run only errored cases in an existing iteration:
   `node scripts/evals/dist/run-iteration.js --skill-name skill-forge --iteration 2 --retry-errors --model gpt-4.1-mini`

## Requirements

The live runner expects:

- `OPENAI_API_KEY`
- installed `ai`
- installed `@ai-sdk/openai`

The runner validates those prerequisites before it creates a new iteration folder, so failed setup does not leave empty run directories behind.






