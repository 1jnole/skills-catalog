## Why

The repo already documents a three-phase skill workflow of contract, implementation, and eval, but the active core pack only provides concrete skills for the first two phases. We need a dedicated eval-authoring skill that fits the current Promptfoo-native runtime boundary under `evals/engines/promptfoo/` instead of reviving the removed legacy `skill-eval-forge` workflow.

## What Changes

- Add `skill-eval-forge` as a new core skill under `packs/core/`.
- Define it as the eval-authoring phase counterpart to `skill-contract-forge` and `skill-implementation-forge`.
- Keep the skill self-contained in `SKILL.md` for v1, with explicit stop-and-ask behavior, examples, anti-examples, and edge cases.
- Keep contract authoring, skill implementation, and eval/runtime architecture changes out of scope for this skill.
- Update the root README minimally so the core skill list reflects the new skill.

## Capabilities

### New Capabilities
- `skill-eval-forge`: author or refactor Promptfoo-native eval coverage for one named skill that already has an approved contract artifact and existing implementation, without redefining the contract or changing eval/runtime architecture.

### Modified Capabilities
- None.

## Impact

- Affected code: `packs/core/skill-eval-forge/`, `README.md`
- Affected systems: core skill catalog, skill-forge phase routing
- Out of scope: Promptfoo runtime redesign, providers, fixtures, generated outputs, shared runner structure, repo-wide policy files
