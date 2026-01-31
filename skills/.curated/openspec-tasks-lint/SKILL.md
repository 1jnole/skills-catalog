---
name: openspec-tasks-lint
description: Lint openspec/changes/<slug>/tasks.md against the spec. Require Iteration 0 baseline and gates, every AC scheduled exactly once, PROCESS constraints handled or deferred, and PR-sized iterations. Output PASS or FAIL only. No writes.
metadata:
  short-description: Tasks lint -> PASS/FAIL
---
## Goal
Ensure the plan is complete and enforceable before implementation.

## Inputs
- tasks.md
- Spec (Mini-SPEC or SPEC) for AC list + PROCESS requirements
- Optional: preferred gate command (default: `npm run verify`)

## Outputs
- Status: PASS|FAIL
- Errors: TLINT-1, TLINT-2...
- Fix hints (optional, max 5 bullets)
- No file writes.

## Checks (MUST)
- Iteration 0 exists and includes baseline + gate command.
- Every AC appears in exactly one iteration's "Done when".
- Every PROCESS requirement is satisfied by an iteration or explicitly deferred with rationale.
- Each iteration has a single objective and minimal file scope (PR-sized).

