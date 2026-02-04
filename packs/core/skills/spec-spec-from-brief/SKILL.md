---
name: spec-spec-from-brief
description: Product feature intake. Convert a brief or PRD or notes or README excerpt into a full OpenSpec SPEC with requirement inventory and traceability. Avoid tech-test PR choreography unless process_mode=strict is requested.
metadata:
  short-description: Feature -> SPEC (full)
---
## Goal
Create a richer SPEC for real product features.

## When to use

- Product feature work: convert a short brief/notes into a Mini-SPEC or full SPEC (per routing).
- When you need explicit requirements + verifiable AC without inventing contracts.

## When NOT to use

- You are converting a technical test README (use `$spec-spec-from-readme`).
- You already have a spec draft (use `$spec-spec-lint`).

## Inputs
- Brief (notes, markdown, refined tasks, README excerpt)
- Optional flags:
  - process_mode: advisory|strict (default: advisory)
  - include_scenarios: true (default: true)

## Outputs
- Write ONLY:
  `openspec/changes/<slug>/specs/spec.md`
- No code changes. No dependency changes. No commands.

## Preflight (MUST)
1) Confirm the change scaffold exists:
   - `openspec/changes/<slug>/specs/spec.md`
   - If missing: STOP and run `$spec-new-change-from-templates`.
2) Confirm repo-local template exists:
   - `openspec/templates/spec.md`
   - If missing: STOP and run `$spec-bootstrap`.

## Rules (MUST)
- Do not invent APIs/fields not in the brief; missing info → Unknowns.
- Include Determinism & state rules when relevant.
- ACs: atomic + each includes Verify.
- Include Traceability mapping R-* → AC/section/OUT/ASSUMED/UNKNOWN.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

