---
name: core-error-fix-loop
description: Use when lint/test/build/typecheck fails to follow a strict fix loop read error → minimal fix → rerun the same command; stop after 3 attempts and report blockers.
metadata:
  short-description: Deterministic Fix Loop
---

## Goal
Fix failures deterministically without turning into a rewrite.

## When to use
- npm run verify fails.
- Any single command fails lint/test/build/typecheck/format checks.
- CI failure reproduction.
- 

## When NOT to use
- You haven’t run any command yet (verify first).
- The error is unrelated to the current change.

## Inputs
- Exact failing command (copy/paste)
- Error output (first actionable error)

## Workflow
1) Freeze the failing command (do not change it).
2) Parse the first actionable error.
3) Apply the smallest fix.
4) Rerun the same command immediately.
5) Repeat up to 3 attempts.
6) If still failing stop and produce a blockers report.

## Copy/paste templates
```md
Blockers report
- Command: <...>
- Status: STILL FAILING
- Primary error: <...>
- Likely cause: <...>
- Next step (small): <...>
```

## Common pitfalls
- Fixing multiple things before rerunning.
- Changing the command mid-loop.
- Refactoring instead of minimal fix.

## Example prompts
- "Fix this verify failure using minimal fix-loop."
- "Rerun the same command after each fix stop after 3 attempts."
