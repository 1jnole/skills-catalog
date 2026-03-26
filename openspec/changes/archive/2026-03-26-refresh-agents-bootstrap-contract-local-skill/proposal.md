## Why

`agents-bootstrap` already had an approved brief, but that brief was authored before the local repo copy of `skill-contract-forge` absorbed the asset-authority dogfooding refinement. To keep phase 1 authoritative, we want a regenerated contract artifact produced from the local repo skill package rather than relying on an earlier brief or on any unsynced Codex-home skill copy.

This gives us one fresh contract handoff grounded in the repo-local `packs/core/skill-contract-forge/` and the current local `packs/core/agents-bootstrap/` package.

## What Changes

- Regenerate a contract-only brief for `agents-bootstrap` as an `existing-skill-refactor` using the local repo copy of `skill-contract-forge`.
- Preserve `assets/AGENTS.managed.md` as contract-required package-shape authority when freezing `authoring.packageShape`.
- Record the refreshed approved brief as one durable `eval-brief.json` artifact without editing the maintained skill package in this phase.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `agents-bootstrap`: refresh the approved contract artifact using the local repo implementation of `skill-contract-forge`.

## Impact

- Produces a fresh contract artifact that reflects the current repo-local forge guidance.
- Keeps this change strictly in the contract phase.
- Makes later reconciliation against the current implementation explicit instead of assumed.
