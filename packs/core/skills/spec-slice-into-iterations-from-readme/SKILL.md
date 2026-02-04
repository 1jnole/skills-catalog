---
name: spec-slice-into-iterations-from-readme
description: "After a TT Mini-SPEC: write `openspec/changes/<slug>/tasks.md` as 3–5 PR-sized iterations (plus Iteration 0 baseline) that cover every AC and PROCESS constraint (e.g., PR #1 skeleton-only) with gate checks (prefer `npm run verify`). No code changes."
metadata:
  short-description: "TT → tasks.md iterations"
---
## Goal
Transform TT Mini-SPEC into a small, reviewable plan that explicitly satisfies PROCESS sequencing when present.

## When to use

- After the Mini-SPEC is lint-clean, to split work into 3–5 PR-sized iterations and draft tasks.
- When the source of truth is the README-derived requirement inventory.

## When NOT to use

- The spec is not lint-clean yet (run `$spec-spec-lint`/`$spec-spec-fix` first).
- You need to implement code (this produces iterations/tasks only).

## Inputs
- Mini-SPEC (must include: AC list, requirement inventory, traceability)
- Preferred gate command (default: npm run verify)

## Outputs
- Write/replace plan in:
  `openspec/changes/<slug>/tasks.md`
- No code changes. No command execution.

## Preflight (MUST)
1) Confirm `openspec/changes/<slug>/tasks.md` exists.
   - If missing: STOP and run `$spec-new-change-from-templates`.
2) Confirm repo-local template exists:
   - `openspec/templates/tasks.md`
   - If missing: STOP and run `$spec-bootstrap`.

## Update rule (MUST)
- Treat `tasks.md` as **plan + evidence**.
- Replace the **Iterations** plan, but preserve an existing `## Evidence log` section if present.

## Rules (MUST)
- Iteration 0 = baseline/gates.
- Every AC appears in exactly one iteration's Done when.
- Every PROCESS requirement is explicitly satisfied by some iteration or stated as OUT with rationale.
- If README requires skeleton-only first PR, Iteration 1 MUST be "Skeleton / structure only" (no app logic).

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

