---
name: core-pr-ready-packager
description: Use at the end of a change to produce PR-ready delivery notes summary, how to run, verification evidence, scope boundaries, tradeoffs, and follow-ups.
metadata:
  short-description: PR Ready Packaging
---
## Goal
Ship work that is reviewable and deliverable with no missing context.

## When to use
- End of an OpenSpec change (before archive).
- Before opening a PR.
- Before submitting a technical test.

## When NOT to use
- Mid-iteration.
- When gates are failing.

## Inputs
- Acceptance criteria/scope
- Verification evidence
- Decisions/tradeoffs made

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


## Workflow
1) Ensure gates pass (prefer npm run verify).
2) Collect what changed (brief).
3) Produce a PR-ready summary and run instructions.
4) Include verification evidence.
5) State strict scope in/out.
6) List follow-ups only if real.

## Copy/paste templates
```md
### Summary
- ...

### How to run
- npm ci
- npm start

### Verification
- Command: npm run verify
- Result: PASS

### Scope
- In: ...
- Out: ...

### Notes / Tradeoffs
- ...

### Follow-ups
- ...
```

## Common pitfalls
- Not including verification commands/results.
- Not clarifying what is out of scope.
- Shipping without run instructions.

## Example prompts
- "Generate PR-ready delivery notes including verification evidence."
- "Package this change for submission (how-to-run + scope + verify)."

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

