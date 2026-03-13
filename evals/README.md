# Evals Scaffold

This directory is the stable top-level home for the closed skill-evals harness migration.

## Intent
`evals/` becomes the stable top-level home for the evaluation scaffold, separated from skill authoring concerns.

The stable shape is:

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
- `evals/scorers/README.md`
- `evals/benchmark/README.md`
- `evals/cases/README.md`
- `evals/fixtures/README.md`

Current `skill-forge` supported artifacts:
- `evals/cases/skill-forge/suite.v1.json`
- `evals/cases/skill-forge/pilot-suite.v1.json`
- `evals/cases/skill-forge/README.md`
- `evals/fixtures/skill-forge/README.md`
- `evals/final-supported-path.md`
- `evals/deferred-migration-debt.md`

Current baseline behavior:
- Promptfoo runs both `with_skill` and `without_skill` prompt paths for the canonical `skill-forge` suite.

Current operational reference:
- `skill-forge` should be exercised through `npm run run-evals -- -- --skill-name skill-forge ...`
- `read-evals --skill-name` resolves the canonical suite in `evals/cases/`
- `pilot-suite.v1.json` remains as historical Phase 4 bootstrap context only

## What this means now
- The scaffold is explicit and visible at the repo root.
- The portable core remains in `scripts/evals/`.
- The inherited physical layout under `packs/core/<skill>/evals/` is historical compatibility only and not the supported path.

## Ownership intent
- `contracts/` will own eval contracts that survive engine changes.
- `baseline/` will own the supported comparison baseline the core assumes.
- `cases/` will own case definitions and authoring-oriented organization.
- `fixtures/` will own reusable eval files and test inputs.
- `scorers/` will own reusable scoring logic.
- `benchmark/` will own local benchmark semantics.
- `reports/` will own generated outputs that do not define the domain.
- `engines/` will own engine-specific adapters only.

## Closeout references

- final supported path:
  - `evals/final-supported-path.md`
- deferred migration debt:
  - `evals/deferred-migration-debt.md`
