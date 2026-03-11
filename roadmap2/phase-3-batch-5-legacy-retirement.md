# Phase 3 Batch 5 Legacy Retirement

This note records the point where the supported eval flow no longer depends on the previous execution path.

## Goal

Remove supported reliance on the old execution path while keeping any remaining historical compatibility explicit and isolated.

## What changed

- `commands/run-evals.ts` now owns the supported eval CLI behavior in source.
- `commands/run-iteration.ts` is now only a compatibility alias to `run-evals`.
- `scripts/evals/run-evals.ts` now points directly at the supported command implementation.
- historical legacy artifact helpers now live under `scripts/evals/run/historical/` instead of `scripts/evals/run/artifacts/`.
- the shared manifest builder no longer defaults to `platform: legacy-runner`; callers must provide the platform explicitly.

## Supported-path result

The supported flow now depends on:

- `scripts/evals/run-evals.ts`
- `scripts/evals/commands/run-evals.ts`
- `scripts/evals/run/execution/`
- `scripts/evals/platforms/laminar/`
- local `benchmark.json` and `run.json`

The supported flow no longer depends on:

- the legacy-named command file as the source owner of the public command
- legacy artifact helpers living under the supported `run/artifacts/` path
- a shared run-manifest builder that silently assumes `legacy-runner`

## Historical compatibility

The repo still keeps explicit historical compatibility, but it is now isolated:

- `scripts/evals/run-iteration.ts` remains available as a compatibility entrypoint
- `scripts/evals/run/historical/read-legacy-case-artifacts.ts` keeps the old per-case artifact reader
- `scripts/evals/run/historical/write-legacy-run-artifacts.ts` keeps the old artifact writer contract if historical recovery is ever needed

## Verification

- `npx tsc -p scripts/evals/tsconfig.json`
- `node scripts/evals/dist/run-evals.js --skill-name skill-forge --model gpt-4.1-mini --iteration 9 --retry-errors`
- `node scripts/evals/dist/run-iteration.js --skill-name skill-forge --model gpt-4.1-mini --iteration 9 --retry-errors`

## Exit condition

Batch 5 is complete because the supported flow no longer relies on the previous execution path, while historical compatibility remains explicit and outside the active path.
