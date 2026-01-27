---
name: core-openspec-spec-lint
description: "Lint an OpenSpec Mini-SPEC/SPEC for completeness: no silent drops, verifiable atomic ACs, explicit determinism/state rules when implied, and traceability with statuses."
metadata:
  short-description: Spec lint (PASS/FAIL)
  category: openspec
---

## Goal
Prevent spec drift and silent requirement drops before tasks planning.

## Inputs
- Spec markdown (Mini-SPEC or SPEC)
- Optional: source brief (README/notes) to check coverage

## Outputs
- A lint report only (no file writes):
  - Status: PASS | FAIL
  - Errors: LINT-1, LINT-2...
  - Fix hints (max 5 bullets)

## Checks (MUST)
### Structure
Spec must include:
- Summary
- Acceptance criteria
- Traceability
- Requirements inventory (R-1..R-n) for Mini-SPEC or SPEC

### Acceptance criteria quality
- Every AC checkbox includes `Verify: ...`
- Atomic (one behavior per AC)
- No unverifiable AC (e.g., "should be fast" without metric)

### Traceability statuses (no-drop)
- Every requirement R-* must have exactly one status:
  - MAPPED | OUT | ASSUMED | UNKNOWN
- Status must appear either:
  - in the Traceability list (`R-1 [MAPPED] → AC-1`), or
  - explicitly in a traceability table/section with the same semantics.

### Coverage (if source provided)
- Every requirement-like sentence in the source must map to some R-*
- Every R-* must be accounted for in Traceability
- If any R-* is missing a status → FAIL

### Determinism/state rules
If the source implies ordering, stable-per-day/session, caching/persistence scope, navigation/back behavior:
- Spec must state explicit rules and boundaries (timezone, persistence scope, stable ordering basis)

## Output format (MUST)
- Status: PASS|FAIL
- Errors:
  - LINT-1: <message>
  - LINT-2: <message>
- Fix hints:
  - <bullet> (optional, max 5)
