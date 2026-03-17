## Why

The active local authoring contract for `skill-contract-forge` is `suite.v1.json`, but the pilot suite and the Phase 6A manual audit files still live beside that active contract under `evals/cases/skill-contract-forge/`. Those historical files are useful context, yet keeping them in the active case directory makes the authoring surface look broader and more ambiguous than it really is.

## What Changes

- Move `pilot-suite.v1.json` into the Phase A quarantine tree.
- Move `manual-audit.phase-6a.json` and `manual-audit.phase-6a.md` into the Phase A quarantine tree.
- Update local case docs and adjacent eval docs so they point to the quarantined historical paths and stop listing the pilot suite as a supported artifact.
- Update `PLAN.md` so the historical case artifacts are described as already isolated.

## Capabilities

### Modified Capabilities

- `skill-contract-forge-dataset-maintenance`: the local case authoring surface distinguishes the canonical authoring contract from historical pilot and audit material.

## Impact

- Affected code: `PLAN.md`, `evals/README.md`, `evals/cases/README.md`, `evals/cases/skill-contract-forge/README.md`, `evals/engines/promptfoo/README.md`, `evals/fixtures/skill-contract-forge/README.md`, `evals/_phase_a_quarantine/cases/skill-contract-forge/*`, `evals/cases/skill-contract-forge/pilot-suite.v1.json`, `evals/cases/skill-contract-forge/manual-audit.phase-6a.json`, `evals/cases/skill-contract-forge/manual-audit.phase-6a.md`
- Affected systems: local authoring surface and historical case isolation
- Dependencies: `phase-6g-quarantine-historical-eval-artifacts`
