---
name: openspec-slice-into-iterations-from-readme
description: "After a TT Mini-SPEC: write `openspec/changes/<slug>/tasks.md` as 3–5 PR-sized iterations (plus Iteration 0 baseline) that cover every AC and PROCESS constraint (e.g., PR #1 skeleton-only) with gate checks (prefer `npm run verify`). No code changes."
metadata:
  short-description: "TT → tasks.md iterations"
---
## Goal
Transform TT Mini-SPEC into a small, reviewable plan that explicitly satisfies PROCESS sequencing when present.

## Inputs
- Mini-SPEC (must include: AC list, requirement inventory, traceability)
- Preferred gate command (default: npm run verify)

## Outputs
- Write/replace plan in:
  `openspec/changes/<slug>/tasks.md`
- No code changes. No command execution.

## Rules (MUST)
- Iteration 0 = baseline/gates.
- Every AC appears in exactly one iteration's Done when.
- Every PROCESS requirement is explicitly satisfied by some iteration or stated as OUT with rationale.
- If README requires skeleton-only first PR, Iteration 1 MUST be "Skeleton / structure only" (no app logic).

