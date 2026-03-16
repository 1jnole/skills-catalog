## Why

Phase 5 hardened the Promptfoo structure, but the repository still lacks a small, explicit manual audit loop that checks whether the suite output matches human judgment.

Without that loop:
- pass/fail can still look trustworthy while hiding semantic misses
- uplift can be mistaken for a gate instead of a comparative signal
- Phase 6B would expand the dataset without a grounded view of which failure patterns matter most

## What Changes

- Define a tracked manual-audit sample for `skill-contract-forge` using the current canonical cases.
- Record a Phase 6A audit note that compares contract, uplift `with_skill`, and uplift `without_skill`.
- Summarize the first actionable error patterns found in the sample.
- Update the local `skill-contract-forge` eval docs so the audit artifacts are discoverable.

## Capabilities

### New Capabilities
- `skill-contract-forge-manual-calibration`: maintain a small, explicit audit sample and a human-readable calibration note before broader dataset expansion.

### Modified Capabilities
- None.

## Impact

- Affected code: `evals/cases/skill-contract-forge/*`, `openspec/changes/phase-6a-manual-calibration/*`
- Affected systems: Promptfoo offline replay evidence, Phase 6 planning traceability
- Dependencies: none
