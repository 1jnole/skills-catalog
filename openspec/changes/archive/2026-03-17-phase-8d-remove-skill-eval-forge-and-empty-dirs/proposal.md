## Why

`skill-eval-forge` is now pure legacy: it teaches the removed `evals.json` and per-skill run-layout model, and it is no longer aligned with the Promptfoo-native architecture that the repo actively supports. Keeping it in the active tree, or continuing to reference it from active test prompts and generated outputs, preserves a dead path that the project explicitly no longer wants.

## What Changes

- Delete `packs/core/skill-eval-forge/` from the active repository tree.
- Replace active `skill-contract-forge` test prompts that still name `skill-eval-forge` with a real supported skill from the current catalog.
- Remove stale generated Promptfoo outputs that still mention `skill-eval-forge`, then regenerate the supported offline outputs from the updated suites.
- Remove any empty directories left behind by this cleanup if they appear in the touched area.

## Capabilities

### New Capabilities

- `core-pack-legacy-skill-pruning`: unsupported legacy skills may be removed entirely from the active `packs/core/` tree, and active docs/tests must not continue to reference them as live targets.

### Modified Capabilities

- `skill-contract-forge-dataset-maintenance`: active `skill-contract-forge` case prompts and examples must stay aligned with the currently supported skill catalog and must not target removed legacy skills.

## Impact

- Affected code: `packs/core/`, active Promptfoo suites, generated Promptfoo outputs, and stable OpenSpec specs
- Affected systems: active core skill inventory and `skill-contract-forge` example coverage
- Dependencies: none
