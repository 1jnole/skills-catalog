---
name: feature-openspec-slice-into-iterations
description: "After a SPEC, produce OpenSpec-friendly tasks.md iterations (3–6 max) with gate checks, explicit AC coverage, and minimal diffs. Treat PROCESS constraints as advisory unless process_mode=strict."
metadata:
  short-description: Feature SPEC → tasks.md
  category: openspec
---

## Goal
Turn a SPEC into a pragmatic execution plan (tasks.md) without relying on Jira/Notion.

## Inputs
- SPEC (must include Acceptance criteria + Requirements + Traceability)
- Preferred gate command (default: repo gate)
- Optional:
  - docs/RUNBOOK.md
  - process_mode: advisory | strict (default: advisory)

## Outputs
- Write/replace plan in: `openspec/changes/<slug>/tasks.md`
- No code changes. No command execution.

## Rules (MUST)
- Iteration 0: baseline install + gate.
- Iterations: each has a single objective and references which ACs it delivers.
- Keep iterations ≤ 6 (excluding Iteration 0).
- Every iteration includes a gate check.
- AC coverage:
  - Every AC must be scheduled in exactly one iteration, or explicitly deferred with reason.
- PROCESS constraints:
  - advisory: call out where they are satisfied or deferred
  - strict: enforce sequencing (e.g., skeleton-first)

## Recommended follow-up (MUST)
- Run `core-openspec-tasks-lint`.
- If FAIL: run `core-openspec-tasks-fix`.

## Copy/paste template
```md
# Plan (OpenSpec-friendly)

## Iteration 0 — Baseline / Gates
- Goal: confirm install + gate works
- Checks
  - <INSTALL_COMMAND>
  - <GATE_COMMAND>
- Done when
  - Gate PASS

## Iteration 1 — Foundation
- Goal: ...
- Checks
  - <GATE_COMMAND>
- Done when
  - [ ] AC-1 ...

## Iteration 2 — Core flow
...
```
