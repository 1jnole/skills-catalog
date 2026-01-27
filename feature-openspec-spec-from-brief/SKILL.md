---
name: feature-openspec-spec-from-brief
description: "Convert a feature brief (notes/PRD/README excerpt) into a full OpenSpec-friendly SPEC with scenarios, explicit determinism/state rules when implied, verifiable ACs, and traceability with statuses."
metadata:
  short-description: Feature brief → SPEC
  category: openspec
---

## Goal
Create a richer SPEC for real product features (more surface area than a tech test),
without inventing missing contracts.

## When to use
- Product feature work (not a code challenge).
- Multiple user journeys, roles, edge cases, or non-trivial state/determinism.

## When NOT to use
- Pure technical tests with explicit PR choreography (use `tt-openspec-spec-from-readme`).

## Inputs
- Feature brief (notes/PRD/README excerpt)
- Optional flags:
  - process_mode: advisory | strict (default: advisory)

## Outputs
- Primary artifact: `openspec/changes/<slug>/specs/spec.md`
- No code changes. No dependency changes. No command execution.

## Rules (MUST)
- Do not invent APIs/fields not in the brief; missing info → UNKNOWN questions.
- Include scenarios (GIVEN/WHEN/THEN) for each requirement where possible.
- Acceptance criteria:
  - Atomic
  - Each includes `Verify: ...`
- Traceability:
  - Every R-* must have a status: MAPPED | OUT | ASSUMED | UNKNOWN

## SPEC template (recommended headings)

# SPEC

## Summary
- ...

## Context
- ...

## Users & primary journeys
- ...

## Data contracts
- ...

## Requirements (R-1..R-n)
- R-1 ...
  - Scenario:
    - GIVEN ...
    - WHEN ...
    - THEN ...

## Non-goals
- ...

## Determinism & state rules
- ...

## Acceptance criteria
- [ ] AC-1 ... (Verify: ...)
- ...

## Assumptions
- A1: ...

## Unknowns / questions
- Q1: ...

## Risks
- R1: ...

## Traceability (R-* [status] → target)
- R-1 [MAPPED] → AC-1
- R-2 [OUT] → Non-goals
- R-3 [ASSUMED] → A1
- R-4 [UNKNOWN] → Q1
