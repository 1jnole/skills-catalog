## Why

`phase-8b` already made the Promptfoo-native suites the only supported authority for `skill-contract-forge`. The remaining `evals.json`, sync scripts, and `promptfoo:sync*` commands now add only legacy noise and keep an obsolete second workflow physically present in the repo.

## What Changes

- Delete the obsolete `packs/core/skill-contract-forge/evals/` authoring artifacts for `skill-contract-forge`.
- Delete the repo-owned sync script and its test file.
- Remove `promptfoo:sync` and `promptfoo:sync:check` from `package.json`.
- Tighten stable specs so the transitional allowance added in `phase-8b` is closed and the obsolete files are no longer permitted in the active repo tree.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `skill-contract-forge-promptfoo-eval-runtime`: transitional obsolete files are removed and no longer tolerated as part of the supported state.
- `promptfoo-modular-config-topology`: the last repo-owned sync/check entrypoints for `skill-contract-forge` are removed.
- `skill-contract-forge-packaging-alignment`: the package no longer carries any `evals/` subtree for this skill.
- `skill-contract-forge-dataset-maintenance`: the supported repository tree no longer includes transitional obsolete case-authoring artifacts for `skill-contract-forge`.

## Impact

- Affected code: `package.json`, `scripts/`, `packs/core/skill-contract-forge/`, and stable OpenSpec specs
- Affected systems: Promptfoo-native eval maintenance for `skill-contract-forge`
- Dependencies: none
