---
name: core-openspec-tasks-fix
description: "Given a failing tasks lint report, rewrite tasks.md with minimal edits to satisfy the lints; do not invent scope. Preserve iteration count and structure when possible."
metadata:
  short-description: Tasks fix (minimal diff)
  category: openspec
---

## Goal
Repair tasks plans so they are consistent with the spec and sequencing constraints.

## Inputs
- tasks.md content
- Lint report from `core-openspec-tasks-lint`
- Optional: spec content (Mini-SPEC/SPEC)
- Optional: process_mode: strict | advisory

## Outputs
- Write ONLY the corrected tasks.md (same target path as caller expects).
- No code changes. No dependency changes. No command execution.

## Rules (MUST)
- Minimal-diff mindset: change only what's required to pass lint.
- Do NOT add new features; if missing info, defer with reason (feature) or mark as missing (tt).
- Ensure:
  - Iteration 0 exists and includes install + gate.
  - Every iteration includes gate.
  - AC coverage is complete (or explicitly deferred if allowed).
  - PROCESS constraints are satisfied (strict) or called out (advisory).

## Stop condition (MUST)
If any lint item remains unfixed, STOP and list remaining failures.
