---
name: core-openspec-tasks-lint
description: "Lint OpenSpec tasks.md against a spec: enforce Iteration 0 baseline, gate checks, AC coverage, and PROCESS constraints sequencing (TT strict)."
metadata:
  short-description: Tasks lint (PASS/FAIL)
  category: openspec
---

## Goal
Catch planning drift: tasks that do not cover acceptance criteria, skip gates, or ignore PROCESS sequencing.

## Inputs
- tasks.md content (or file)
- Spec content (Mini-SPEC or SPEC) (recommended)
- Optional: process_mode: strict | advisory

## Outputs
- Lint report only (no file writes):
  - Status: PASS | FAIL
  - Errors: TLINT-1, TLINT-2...
  - Fix hints (max 5 bullets)

## Checks (MUST)
### Structure
- Must include "Iteration 0" baseline with install + gate checks (RUNBOOK commands if available, else defaults).
- Must have ≤ 5 iterations excluding Iteration 0 for TT; ≤ 6 for feature (advisory).

### Gate checks
- Every iteration includes a gate check (prefer `npm run verify` or repo-defined gate).

### AC coverage (if spec provided)
- Every `AC-*` appears in exactly one iteration’s “Done when”
  - Or is explicitly deferred with a reason (feature mode only).

### PROCESS constraints
- If `process_mode=strict` (default for TT):
  - If spec/README implies "skeleton first PR" then Iteration 1 must reflect it.
  - Every PROCESS requirement must be satisfied or explicitly OUT with rationale.
- If advisory:
  - PROCESS can be deferred, but must be called out.

## Output format (MUST)
- Status: PASS|FAIL
- Errors:
  - TLINT-1: ...
  - TLINT-2: ...
- Fix hints:
  - ...
