# Evals Scaffold

This directory is the visible Phase 3 destination for the new skill-evals harness.

## Intent
`evals/` becomes the stable top-level home for the evaluation scaffold, separated from skill authoring concerns.

The target shape for later slices is:

```text
evals/
  contracts/
  baseline/
  cases/
  fixtures/
  scorers/
  benchmark/
  reports/
  engines/
    promptfoo/
```

The first visible contract boundary already exists at:
- `evals/contracts/README.md`
- `evals/baseline/README.md`

## What this means now
- The future scaffold is now explicit and visible at the repo root.
- The portable core still remains in `scripts/evals/` while it is rehomed by focused slices.
- The inherited physical layout under `packs/core/<skill>/evals/` is still supported during the transition.

## Ownership intent
- `contracts/` will own eval contracts that survive engine changes.
- `baseline/` will own the supported comparison baseline the core assumes.
- `cases/` will own case definitions and authoring-oriented organization.
- `fixtures/` will own reusable eval files and test inputs.
- `scorers/` will own reusable scoring logic.
- `benchmark/` will own local benchmark semantics.
- `reports/` will own generated outputs that do not define the domain.
- `engines/` will own engine-specific adapters only.

## Not done in this slice
- No portable core files are moved here yet.
- No Promptfoo integration is implemented yet.
- No inherited layout is deleted yet.

## Phase 3 rule
From this point on, the migration should treat `evals/` as the structural destination for the new harness, not `scripts/evals/` or `packs/core/<skill>/evals/` as the long-term center of the system.
