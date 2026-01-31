---
name: openspec-slice-into-iterations-from-brief
description: After a full SPEC, write openspec/changes/<slug>/tasks.md as 3-6 reviewable iterations with Iteration 0 baseline and gates. Each iteration maps to specific ACs. PROCESS items are advisory unless process_mode=strict.
metadata:
  short-description: Feature -> tasks.md iterations
---
## Goal
Turn a SPEC into a pragmatic execution plan (tasks.md).

## Inputs
- SPEC (Acceptance criteria + Requirements + Determinism rules)
- Preferred gate command (default: `npm run verify`)
- Optional: docs/RUNBOOK.md

## Outputs
- Write tasks plan to:
  `openspec/changes/<slug>/tasks.md`
- No code changes. No commands.

## Rules (MUST)
- Iteration 0: baseline + gates.
- Each iteration has a single objective and references which ACs it delivers.
- Determinism/state rules get their own iteration if non-trivial.
- If there are PROCESS constraints, treat as advisory unless strict is stated.

