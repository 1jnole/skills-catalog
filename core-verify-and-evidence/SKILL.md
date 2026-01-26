---
name: core-verify-and-evidence
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

## Workflow
1) Run npm run verify.
2) If it fails switch to core-error-fix-loop.
3) If it passes append evidence to tasks.md or fallback.
4) Keep it short and exact.

## Copy/paste templates
```md
- Verification
  - Command: npm run verify
  - Result: PASS
  - Notes: <optional short note>
```

## Common pitfalls
- Claiming completion without running gates.
- Running unrelated commands.
- Not writing evidence where expected.

## Example prompts
- "Run npm run verify and append evidence to the active tasks.md."
- "Verify this iteration and summarize PASS/FAIL with commands."
