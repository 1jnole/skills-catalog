# Proposal: laminar-phase-3-batch-5-risk-hardening

## Why

Batch 5 removed supported reliance on the legacy execution path, but the follow-up review surfaced a few operational risks that are still worth hardening before Phase 3 continues. These risks are narrow, concrete, and can be resolved without changing benchmark semantics.

## What Changes

- add fail-fast locking so two processes cannot mutate the same `iteration-N` at the same time
- preserve compatibility aliases for legacy internal artifact imports that were moved during Batch 5
- update baseline and runner docs so they describe the historical helper locations correctly

## Capabilities

### New Capabilities
- `laminar-iteration-hardening`: Defines concurrency and compatibility guarantees that protect the supported Phase 3 flow from residual Batch 5 operational edge cases.

### Modified Capabilities
- None.

## Impact

- `scripts/evals/run/artifacts/`
- `scripts/evals/run/execution/`
- `scripts/evals/run/historical/`

- `scripts/evals/README.md`
- `openspec/changes/laminar-phase-3-batch-5-risk-hardening/`


