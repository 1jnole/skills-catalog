## Overview

This change implements the refreshed approved brief for `agents-bootstrap` from `openspec/changes/refresh-agents-bootstrap-contract-local-skill/eval-brief.json`.

## Approved contract authority

Primary authority:
- `openspec/changes/refresh-agents-bootstrap-contract-local-skill/eval-brief.json`

The implementation-phase reconciliation must preserve:
- the exact skill name
- the refreshed contract-frozen frontmatter description
- the package shape of `SKILL.md` plus `assets/`
- the managed-root synchronization boundary
- the stop conditions around root ownership, mixed rewrites, missing baseline authority, and managed-block automation policy

## Implementation decisions

### Refactor `SKILL.md`

The maintained `SKILL.md` should now map the refreshed brief directly:
- exact refreshed frontmatter description
- explicit `Overview`, `Use When`, `Do Not Use When`, and `Stop And Ask When` sections
- a procedural workflow centered on `assets/AGENTS.managed.md`
- output and guardrail language that no longer depends on the old `npm run verify` assumption

### Preserve the existing baseline asset

`assets/AGENTS.managed.md` already satisfies the refreshed package-shape authority and should remain unchanged unless the contract requires a content update, which it does not.
