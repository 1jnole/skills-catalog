## Why

Phases 6A and 6B introduced calibration evidence and a small dataset expansion loop, but the repository still lacks an explicit maintenance policy for when to add, remove, move, or stop expanding `skill-contract-forge` cases.

Without that policy:
- useful regressions can get buried under decorative prompt growth
- duplicate or low-signal cases can stay in the canonical suite too long
- maintainers can keep expanding coverage without a shared definition of "enough"

## What Changes

- Document simple admission criteria for new `skill-contract-forge` cases.
- Document pruning, fusion, and suite-movement criteria.
- Add a short operational workflow for evolving the dataset.
- Define a practical "sufficiently good" stopping point for day-to-day maintenance.

## Capabilities

### New Capabilities
- `skill-contract-forge-dataset-maintenance`: maintain `skill-contract-forge` dataset quality through explicit admission, pruning, and stopping rules.

### Modified Capabilities
- `skill-contract-forge-dataset-expansion`: Phase 6B expansion guidance now gains an explicit maintenance policy for follow-up iterations.

## Impact

- Affected code: `evals/cases/skill-contract-forge/README.md`, `openspec/changes/phase-6c-define-dataset-maintenance-criteria/*`
- Affected systems: dataset authoring discipline, local maintenance workflow documentation
- Dependencies: none
