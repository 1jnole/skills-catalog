---
name: feature-openspec-spec-from-brief
description: "Product feature intake: convert a brief/PRD/notes/README excerpt into a full OpenSpec SPEC (with scenarios) plus requirement inventory + traceability. Avoid tech-test PR choreography unless `process_mode=strict` is requested."
metadata:
  short-description: "Feature → SPEC (full)"
---

## Goal
Create a richer SPEC for real product features.

## Inputs
- Brief (notes, markdown, refined tasks, README excerpt)
- Optional flags:
  - process_mode: advisory|strict (default: advisory)
  - include_scenarios: true (default: true)

## Outputs
- Write ONLY:
  `openspec/changes/<slug>/specs/spec.md`
- No code changes. No dependency changes. No commands.

## Rules (MUST)
- Do not invent APIs/fields not in the brief; missing info → Unknowns.
- Include Determinism & state rules when relevant.
- ACs: atomic + each includes Verify.
- Include Traceability mapping R-* → AC/section/OUT/ASSUMED/UNKNOWN.

