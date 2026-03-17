## Why

`skill-contract-forge` should describe a neutral `Eval Brief` handoff boundary, not an engine-specific runtime implementation. The current wording in the skill contract still leaks Promptfoo-specific execution details into the core authoring workflow and no longer matches the intended contract-first boundary.

## What Changes

- Remove direct Promptfoo runtime-suite references from `packs/core/skill-contract-forge/SKILL.md`.
- Reword `skill-contract-forge` guidance so the skill produces a neutral Eval Brief that downstream structural validation can consume without naming an engine.
- Keep the maintained `skill-contract-forge` metadata aligned with the current contract-first workflow and `Eval Brief ready` boundary.

## Capabilities

### New Capabilities
- `skill-contract-forge-brief-boundary-neutrality`: Define that the `skill-contract-forge` core contract stays engine-neutral while allowing downstream eval docs to describe implementation-specific runtimes.

### Modified Capabilities
- None.

## Impact

- Affected docs: `packs/core/skill-contract-forge/SKILL.md`
- Affected maintained metadata surfaces for `skill-contract-forge`
- No runtime config, tests, or dependencies change
