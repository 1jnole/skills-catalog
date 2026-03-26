## Overview

This change reimplements `agents-bootstrap` from the refreshed approved brief after updating the local `skill-implementation-forge` guidance around closure semantics.

## Approved contract authority

Primary authority:
- `openspec/changes/refresh-agents-bootstrap-contract-local-skill/eval-brief.json`

The implementation must preserve:
- the exact skill name
- the refreshed contract-frozen frontmatter description
- the package shape of `SKILL.md` plus `assets/`
- the managed-root synchronization boundary
- the stop conditions around root ownership, mixed rewrites, missing baseline authority, and managed-block automation policy

## Implementation decisions

### Refactor `SKILL.md` to the refreshed shape

The maintained skill should move from the older `Purpose / Inputs / Steps` shape into:
- `Overview`
- `Use When`
- `Do Not Use When`
- `Stop And Ask When`
- `Procedure`
- `Outputs`
- `Done When`
- `References`

### Preserve the baseline asset

`assets/AGENTS.managed.md` already satisfies the refreshed package-shape requirement and should remain unchanged.

### Make closure explicit

Because the workflow has a crisp end state, the maintained skill should include a concise `Done When` section derived from the brief's success semantics.
