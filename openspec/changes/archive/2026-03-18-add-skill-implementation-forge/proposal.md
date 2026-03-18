## Why

The repo already documents a three-phase skill workflow of contract, implementation, and eval, but only `skill-contract-forge` exists today as a concrete core skill artifact. We need a dedicated implementation-phase skill so contract-driven skill implementation can be routed explicitly without redefining the contract or widening into Promptfoo eval work.

## What Changes

- Add `skill-implementation-forge` as a new core skill under `packs/core/`.
- Define it as the implementation-phase counterpart to `skill-contract-forge`, consuming an approved Eval Brief as the authoritative contract input.
- Keep the skill self-contained in `SKILL.md` for v1, with explicit stop-and-ask behavior, examples, anti-examples, and edge cases.
- Keep Promptfoo-native eval authoring and eval runtime architecture out of scope for this skill.
- Update the root README minimally so the core skill list reflects the new skill.

## Capabilities

### New Capabilities
- `skill-implementation-forge`: implement or refactor one named skill from a frozen contract into the repo's shallow skill structure without redefining the contract or taking on eval/runtime work.

### Modified Capabilities
- None.

## Impact

- Affected code: `packs/core/skill-implementation-forge/`, `README.md`
- Affected systems: core skill catalog, skill-forge phase routing
- Out of scope: Promptfoo config, Promptfoo tests, fixtures, generated outputs, runtime tooling, repo-wide policy files
