## Why

The active `evals/` tree still carries historical quarantine material, pointer docs, and empty directories that no longer contribute to the supported architecture. Now that the Promptfoo runtime and skill-local authoring split are stable, the repo should stop keeping legacy eval residue inside the active tree.

## What Changes

- Remove `evals/_phase_a_quarantine/` completely instead of preserving historical eval artifacts in the active repository tree.
- Remove redundant pointer/stub README files under `evals/` and fold any useful notes into the remaining active boundary docs.
- Remove empty directories under `evals/` that no longer represent active runtime or authoring boundaries.
- Rewrite or remove `PLAN.md` content that still describes quarantine-era transitional states as if they were current.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `skill-contract-forge-promptfoo-eval-runtime`: historical helper and pilot runtime artifacts no longer need an in-repo quarantine location inside `evals/`.
- `skill-contract-forge-dataset-maintenance`: historical pilot and manual-audit case artifacts no longer need an in-repo quarantine location or pointer docs in the active `evals/` tree.

## Impact

- Affected code: `evals/**`, `PLAN.md`, and the stable specs for Promptfoo runtime and dataset maintenance.
- Affected systems: active eval docs, historical eval artifact handling, and repo tree cleanliness.
- Dependencies: none.
