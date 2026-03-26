## Why

`agents-bootstrap` now has an approved contract artifact in `openspec/changes/archive/2026-03-25-refactor-agents-bootstrap-contract/eval-brief.json`, but the maintained skill package has not yet been aligned to that contract.

The current implementation is directionally right, but it still hard-codes an ad hoc `npm run verify` gate and does not express the contract-frozen trigger boundary, non-triggers, and stop conditions as clearly as the approved brief requires.

## What Changes

- Refactor `packs/core/agents-bootstrap/SKILL.md` to match the approved contract boundary.
- Keep the package shape unchanged: `SKILL.md` plus `assets/AGENTS.managed.md`.
- Preserve the managed baseline asset as the durable source for the managed root block instead of reconstructing it ad hoc.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `agents-bootstrap`: implement the approved contract in the maintained skill package.

## Impact

- Produces a contract-aligned implementation of `agents-bootstrap`.
- Keeps phase 2 scoped to implementation only.
- Leaves eval authoring for a later phase.
