## Why

`agents-bootstrap` now has a refreshed approved brief in `refresh-agents-bootstrap-contract-local-skill/eval-brief.json`, but the maintained `SKILL.md` is still on the older implementation shape with an ad hoc `npm run verify` requirement and weaker boundary sections than the refreshed brief freezes.

This phase-2 change now needs to perform the actual contract-driven refactor instead of stopping at reconciliation evidence.

## What Changes

- Refactor `packs/core/agents-bootstrap/SKILL.md` to match the refreshed approved brief.
- Preserve the package shape of `SKILL.md` plus `assets/AGENTS.managed.md`.
- Keep the managed baseline asset unchanged when it already satisfies the refreshed contract.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `agents-bootstrap`: implementation-phase reconciliation against the refreshed approved brief.

## Impact

- Produces a contract-aligned implementation of `agents-bootstrap` from the refreshed approved brief.
- Removes the old ad hoc gate requirement from the maintained skill.
- Keeps downstream eval authoring out of scope.
