---
name: core-gates-and-evidence
description: Use at the end of each iteration to run the repo gate (prefer npm run verify) and record evidence (commands + results) in OpenSpec tasks.md or a fallback evidence file.
metadata:
  short-description: Verify + Evidence
---
## Goal
Ensure every iteration is verified and leave evidence that makes review/merge easy.

## When to use
- End of every OpenSpec iteration.
- Before declaring done/fixed/ready.
- Before archiving an OpenSpec change.

## When NOT to use
- Planning-only work with no code changes.

## Inputs
- Preferred gate command (default) npm run verify
- Evidence target
  - preferred openspec/changes/<slug>/tasks.md
  - fallback docs/EVIDENCE.md

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


## Workflow
1) Run npm run verify.
2) If it fails switch to core-error-fix-loop.
3) If it passes append evidence to tasks.md or fallback.
4) Keep it short and exact.

## Copy/paste template (append under `## Evidence log`)
~~~text
```bash
npm run verify
# exit code: <0|1>
# output (trimmed):
# <paste here>
```
~~~

## Common pitfalls
- Claiming completion without running gates.
- Running unrelated commands.
- Not writing evidence where expected.

## Example prompts
- "Run npm run verify and append evidence to the active tasks.md."
- "Verify this iteration and summarize PASS/FAIL with commands."

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

