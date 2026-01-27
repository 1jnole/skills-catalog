---
name: tt-openspec-slice-into-iterations
description: Use after a Mini-SPEC to produce an OpenSpec-friendly tasks.md plan in 3–5 iterations (plus Iteration 0 baseline), each with a single objective, explicit AC coverage, and a gate check (prefer npm run verify).
metadata:
  short-description: TT → 3–5 Iterations
---

## Goal
Transform a Mini-SPEC into a small, reviewable plan (max 5 iterations) that maps cleanly to OpenSpec `tasks.md`, with verifiable acceptance-criteria coverage and minimal diffs.

## When to use
- You already have a Mini-SPEC.
- You want deterministic delivery with small diffs.
- You are about to create/apply an OpenSpec change.

## When NOT to use
- The active OpenSpec change already contains a detailed `openspec/changes/<slug>/tasks.md`.
- The task is truly tiny (single-file trivial change).

## Inputs
- Mini-SPEC (must include Acceptance criteria)
- Preferred gate command: `npm run verify` (or the repo’s gate if different)
- If available: `docs/RUNBOOK.md` commands (install/gate)
- Any delivery constraints (PR sequencing rules in README)

## Outputs
- Write/replace the plan section in: `openspec/changes/<slug>/tasks.md`
- No code changes. No command execution.

## Workflow
0) Preflight (routing):
   - If `docs/RUNBOOK.md` is missing OR the gate is unclear/missing → run `core-repo-gates-bootstrap` first.
   - If this is Angular and tooling is missing → run `angular-tooling-bootstrap` first.
   - If RUNBOOK exists, treat its commands as the source of truth.

1) Normalize Acceptance criteria:
   - Extract AC list from Mini-SPEC and label them `AC-1...AC-n` (keep wording).
   - Coverage invariant: every AC must appear in exactly one iteration’s “Done when”, or be explicitly deferred with a reason.

2) Create Iteration 0 — Baseline / Gates:
   - Goal: confirm install + gate works.
   - Checks: use RUNBOOK commands if present; otherwise use minimal defaults:
     - Install: `npm ci`
     - Gate: `npm run verify`

3) Group ACs into 3–5 iterations (excluding Iteration 0) using this ordering:
   - Iteration 1: Foundation (wiring/shell required for later ACs)
   - Iteration 2: Core flow (happy path end-to-end)
   - Iteration 3: State & determinism (ordering/persistence/time boundaries)
   - Iteration 4–5 (optional): Edge cases + quality (errors/loading/a11y/perf constraints)
- For determinism/state rules, prefer planning a pure function + unit test (even if the UI wiring comes later). Reference that in Notes and ensure the gate covers it (e.g., test via `npm run verify`).

4) For each iteration, enforce:
   - Single objective (no multi-feature bundles)
   - Minimal diffs (smallest set of files)
   - Checks include the gate (prefer `npm run verify`)
   - Done when references a subset of `AC-*`

5) Stop conditions:
   - If you cannot fit within ≤ 5 iterations without mixing objectives:
     - explain which ACs are too broad
     - propose splitting those ACs or deferring non-core polish
     - do not output an overstuffed plan

## Copy/paste templates
```md
# Plan (OpenSpec-friendly)

## Iteration 0 — Baseline / Gates
- Goal: confirm install + gate works
- Checks
  - <INSTALL_COMMAND> (from RUNBOOK; default `npm ci`)
  - <GATE_COMMAND> (from RUNBOOK; default `npm run verify`)
- Done when
  - Gate PASS

## Iteration 1 — Foundation
- Goal: ...
- Files/areas: ...
- Notes: ...
- Checks
  - <GATE_COMMAND>
- Done when
  - [ ] AC-1 ...
  - [ ] AC-2 ...

## Iteration 2 — Core flow
- Goal: ...
- Files/areas: ...
- Notes: ...
- Checks
  - <GATE_COMMAND>
- Done when
  - [ ] AC-...

## Iteration 3 — State & determinism
- Goal: ...
- Files/areas: ...
- Notes: ...
- Checks
  - <GATE_COMMAND>
- Done when
  - [ ] AC-...

## Iteration 4 — Quality / edge cases (optional)
- Goal: ...
- Files/areas: ...
- Notes: ...
- Checks
  - <GATE_COMMAND>
- Done when
  - [ ] AC-...
```

## Common pitfalls
- Leaving determinism mechanisms unspecified (then rework later).
- Iterations too large (multiple objectives at once).
- Skipping Iteration 0 (debugging setup later).
- ACs not mapped 1:1 to iterations (“stuff slips through”).
- Hardcoding commands instead of using RUNBOOK.

## Example prompts
- "Slice this Mini-SPEC into 3–5 iterations with gates per iteration."
- "Produce an OpenSpec tasks.md plan with Iteration 0 baseline."
