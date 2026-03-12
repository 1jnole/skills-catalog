# Proposal: laminar-phase-3-batch-6-docs-closeout

## Why

Batches 4 and 5 already proved parity, retired supported dependence on the old execution path, and hardened the remaining operational edge cases. The final Batch 6 step is to make the repository docs and architecture diagrams describe that implemented state instead of the transition state.

## What Changes

- update the root README to describe `run-evals` as the supported path and `run-iteration` as compatibility only
- update `scripts/evals/README.md` to describe the runner structure after Batch 5 closeout
- update `PLAN.md` and Mermaid diagrams so they describe Laminar as the active supported path and legacy only as historical compatibility
- keep the closeout evidence inside active repo docs and OpenSpec task evidence

## Capabilities

### New Capabilities
- `laminar-docs-closeout`: Defines the documentation state required once the supported flow is fully Laminar-backed and legacy is no longer documented as active.

### Modified Capabilities
- None.

## Impact

- `README.md`
- `scripts/evals/README.md`
- `PLAN.md`

- `openspec/changes/laminar-phase-3-batch-6-docs-closeout/`


