# Proposal: evals-phase-5-cases-fixtures

## Why

The useful `skill-forge` eval cases still live in the inherited `packs/core/skill-forge/evals/evals.json` path while the new scaffold only contains the smaller Phase 4 pilot snapshot. Phase 5 needs one canonical suite in `evals/cases/` so the new flow can run without depending on the old layout.

## What Changes

- add a canonical `skill-forge` suite under `evals/cases/skill-forge/` by migrating the useful cases from the inherited `evals.json`
- keep the Phase 4 pilot snapshot as historical context only, not as the main suite definition
- point the Promptfoo suite resolver defaults at the canonical suite file in the new scaffold
- update fixture docs to make the new-layout fixture story explicit for `skill-forge`
- add or update tests that validate the canonical suite from the new path

## Capabilities

### New Capabilities
- `evals-case-suite-migration`: Defines the canonical new-scaffold case suite and fixture ownership for `skill-forge`.

### Modified Capabilities
- None.

## Impact

- `evals/cases/skill-forge/`
- `evals/fixtures/skill-forge/`
- `scripts/evals/infrastructure/promptfoo/`
- `scripts/evals/application/load-eval-definition/`
