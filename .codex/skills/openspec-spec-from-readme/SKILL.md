---
name: openspec-spec-from-readme
description: "Technical test / code challenge: convert README into an OpenSpec-ready Mini-SPEC with complete requirement inventory (incl PROCESS/PR instructions) + traceability statuses BEFORE any implementation. Do NOT slice into iterations here."
metadata:
  short-description: "TT → README → Mini-SPEC"
---
## Goal
Convert a technical test README into a Mini-SPEC that cannot silently drop requirements (including PROCESS items like "PR #1 skeleton").

## Inputs
- README content (paste or file)
- Optional flags:
  - process_mode: strict | advisory (default: strict)

## Outputs
- Write ONLY the Mini-SPEC to:
  `openspec/changes/<slug>/specs/mini-spec.md`
- No code changes. No dependency changes. No commands.

## Non-negotiables (MUST)
- Build requirement inventory R-1..R-n including PROCESS constraints from README.
- Acceptance criteria are atomic and verifiable; every checkbox includes `Verify: ...`.
- Traceability exists and every R-* has exactly one status: MAPPED/OUT/ASSUMED/UNKNOWN.
- STOP if any R-* is missing a status.

