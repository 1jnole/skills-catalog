## Why

`agents-bootstrap` already exists, but its current contract still mixes durable boundary rules with implementation-shaped details such as a hard-coded gate assumption. Before editing the maintained skill package, we want one approved brief artifact that freezes the exact trigger boundary, package shape, stop conditions, and managed-block authority for this skill.

This keeps the refactor in phase 1 of the forge workflow so later implementation can align `packs/core/agents-bootstrap/` from an explicit contract instead of renegotiating the skill while editing it.

## What Changes

- Freeze a contract-only brief for `agents-bootstrap` as an `existing-skill-refactor`.
- Record the minimal maintained package shape and preserve the existing `assets/AGENTS.managed.md` dependency as contract-required support content.
- Capture the skill's trigger boundary around root `AGENTS.md` managed-block synchronization, nearby non-triggers, and stop conditions without implementing skill-package edits yet.

## Capabilities

### New Capabilities
- `agents-bootstrap`: Contract-first refactor handoff for the existing `agents-bootstrap` skill before implementation updates.

### Modified Capabilities
- None.

## Impact

- Creates a durable approved brief artifact for later implementation work on `packs/core/agents-bootstrap/`.
- Adds a spec-driven contract for `agents-bootstrap` under OpenSpec.
- Keeps this slug strictly in the contract phase with no maintained skill edits yet.
