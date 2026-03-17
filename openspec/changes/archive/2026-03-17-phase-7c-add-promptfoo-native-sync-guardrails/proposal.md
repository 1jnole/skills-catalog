## Why

Once `skill-contract-forge` adopts a skill-local eval authoring source, the repo needs a deterministic way to project that authoring data into native Promptfoo test suites without recreating a second runtime or relying on manual sync.

## What Changes

- Add a repo-local sync/check script that reads `packs/core/skill-contract-forge/evals/evals.json` and writes or verifies the three Promptfoo suite files.
- Add package scripts for sync and drift check.
- Fail on duplicate IDs, orphaned surface data, missing surface assignments, or mismatched generated YAML.
- Keep the execution boundary untouched: the script does not run evals and is not a runner.

## Capabilities

### Modified Capabilities

- `promptfoo-modular-config-topology`: Promptfoo suite files become deterministic outputs of the canonical authoring source without adding a repo-owned runtime.

## Impact

- Affected code: `scripts/*`, `package.json`, `evals/engines/promptfoo/tests/*`
- Affected systems: Promptfoo suite synchronization
- Dependencies: existing `yaml`, `zod`, and `tsx`
