---
name: tt-openspec-slice-into-iterations
description: Use after a Mini-SPEC to split work into 3–5 OpenSpec-friendly iterations with per-iteration checks (prefer npm run verify) and minimal diffs.
metadata:
  short-description: TT → 3–5 Iterations
---

## Goal
Transform a Mini-SPEC into a small, reviewable plan (max 5 iterations) that maps cleanly to OpenSpec tasks.md.

## When to use
- You already have a Mini-SPEC (from README).
- You want deterministic delivery with small diffs.
- You are about to create/apply an OpenSpec change.

## When NOT to use
- The active OpenSpec change already contains a detailed `openspec/changes/<slug>/tasks.md`.
- The task is truly tiny (single-file trivial change).

## Inputs
- Mini-SPEC
- Gate command (default/preferred) npm run verify
- Any must-pass constraints (lint/test/build)

## Workflow
1) Create Iteration 0 baseline (install + verify).
2) Convert acceptance criteria into 3–5 iterations.
3) Each iteration must include
   - Goal
   - Files/areas touched (high-level)
   - Notes (no code)
   - Checks (commands)
   - Done when (subset of acceptance criteria)
4) Enforce minimal diffs (one iteration = one objective).
5) Keep total iterations ≤ 5 (excluding Iteration 0).

## Copy/paste templates
```md
# Plan (OpenSpec-friendly)

## Iteration 0 — Baseline / Gates
- Goal: confirm repo runs + gates exist
- Checks
  - npm ci
  - npm run verify
- Done when
  - verify PASS

## Iteration 1 — ...
- Goal: ...
- Files/areas: ...
- Notes: ...
- Checks
  - npm run verify
- Done when
  - [ ] AC-1 ...
```

## Common pitfalls
- Iterations too large (multiple features at once).
- Skipping Iteration 0 (then debugging setup later).
- Not tying Done when to acceptance criteria.

## Example prompts
- "Slice this Mini-SPEC into 3–5 iterations with gates per iteration."
- "Produce an OpenSpec tasks.md plan with Iteration 0 baseline."
