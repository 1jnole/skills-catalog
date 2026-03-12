# Proposal: laminar-v1-active-path-ownership

## Why

The supported command is `run-evals`, but the active source ownership was still routed through `run/execution/`. v1 needs the supported path to be Laminar-owned in source, without changing the public contract.

## What Changes

- make `commands/run-evals.ts` call a Laminar-owned iteration use case
- move the active supported iteration orchestration under `scripts/evals/platforms/laminar/`
- keep `run/execution/` only as compatibility shims or thin shared helpers

## Impact

- `scripts/evals/commands/run-evals.ts`
- `scripts/evals/platforms/laminar/`
- `scripts/evals/run/execution/`
