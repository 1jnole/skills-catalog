---
name: spec-apply-with-evidence
description: Implement the active OpenSpec change (<slug>) with minimal diffs, run npm run verify, and record deterministic evidence in openspec/changes/<slug>/tasks.md.
metadata:
  short-description: Apply change + evidence
---
## Goal
Implement the change described under `openspec/changes/<slug>/...` without drifting scope, and leave a deterministic evidence trail in `tasks.md`.

## When to use
- After a Mini-SPEC/SPEC (and any iteration slices) are accepted.
- When you are ready to implement code and verify it with the repo gate.

## When NOT to use
- If the spec has not passed `spec-spec-lint`.
- If you still need to draft the spec or slice the work.

## Inputs
- `slug`
- Change folder: `openspec/changes/<slug>/`
- Spec(s): `openspec/changes/<slug>/specs/`
- Gate command: `npm run verify`

## Outputs
- Code changes implementing the spec
- Updated evidence log:
  - `openspec/changes/<slug>/tasks.md`

## Preflight (MUST)
1) Confirm the change folder exists.
2) Confirm `npm run verify` exists.
3) Run `$spec-spec-lint` on the active spec.
   - If FAIL: STOP and suggest `$spec-spec-fix`.
4) If the spec contains `[BLOCKER]` questions/decisions: STOP and ask the user to resolve them.

## Implementation workflow (MUST)
1) Read the spec and list the **exact** requirements to implement (R-* / AC-*).
2) Make a small, reviewable diff that implements a coherent unit of work (one iteration slice if available).
3) Run verification and record evidence:
   - Use `$core-gates-and-evidence` to run `npm run verify` and append results to `tasks.md`.
4) If verification fails:
   - Use `$core-error-fix-loop` until the gate passes.
   - Record the failing command and final passing command in `tasks.md`.
5) Repeat until all mapped AC are implemented.

## Evidence format (MUST)
Append entries to `openspec/changes/<slug>/tasks.md` (under `## Evidence log` when present). Do not rewrite the iteration plan.

Each evidence entry includes:
- Command
- PASS/FAIL
- Relevant output snippet (short)
- Exit code (if available)
- Notes (optional, 1–2 bullets)

## Scope guardrails (MUST)
- Implement **only** what the spec states. If a requirement is missing: STOP and ask.
- If you add a new file or touch unrelated areas, you MUST justify it by mapping it to a requirement.
- Avoid dependency changes unless explicitly required by the spec.

## Finish criteria (MUST)
Before declaring done:
1) All mapped AC are implemented.
2) `npm run verify` passes.
3) `tasks.md` includes the final PASS evidence.
4) Run `$spec-drift-check` and resolve any drift.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

