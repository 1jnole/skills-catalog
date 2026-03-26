## Overview

This change implements the approved contract for the existing `agents-bootstrap` skill without renegotiating it.

## Approved contract authority

Primary authority:
- `openspec/changes/archive/2026-03-25-refactor-agents-bootstrap-contract/eval-brief.json`

The implementation must preserve:
- the exact skill name
- the contract-frozen frontmatter description
- the package shape of `SKILL.md` plus `assets/`
- the narrow boundary around synchronizing the managed block in the repository root `AGENTS.md`
- the stop conditions around root ownership, mixed ad-hoc rewrites, missing baseline authority, and repository policy that forbids managed-block automation

## Implementation decisions

### Keep the package shallow

No new support folders are required by the contract. The existing `assets/AGENTS.managed.md` file already satisfies the approved package shape and should remain the durable managed baseline.

### Tighten routing and blockers in `SKILL.md`

The maintained skill should explicitly teach:
- when it triggers
- when it does not trigger
- when to stop and ask because root ownership, baseline authority, or policy constraints are ambiguous

### Remove the ad hoc validation requirement

The previous `npm run verify` precondition is not frozen by the approved brief and should not survive implementation. Validation guidance should stay focused on marker integrity, managed-block alignment, and preservation of non-managed content.
