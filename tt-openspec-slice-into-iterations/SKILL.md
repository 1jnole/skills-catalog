---
name: tt-openspec-slice-into-iterations
description: After a TT Mini-SPEC: write `openspec/changes/<slug>/tasks.md` as 3–5 PR-sized iterations (plus Iteration 0 baseline) that cover every AC and PROCESS constraint (e.g., PR #1 skeleton-only) with gate checks (prefer `npm run verify`). No code changes.
metadata:
  short-description: TT → 3–5 Iterations
---

## Goal
Transform a Mini-SPEC into a small, reviewable plan (max 5 iterations) that maps cleanly to OpenSpec `tasks.md`, with verifiable coverage (ACs + PROCESS constraints) and minimal diffs.

## When to use
- You already have a Mini-SPEC.
- You want deterministic delivery with small diffs.
- You are about to create/apply an OpenSpec change.

## When NOT to use
- The active OpenSpec change already contains a detailed `openspec/changes/<slug>/tasks.md`.
- The task is truly tiny (single-file trivial change).

## Inputs
- Mini-SPEC (`Acceptance criteria`, `Delivery constraints`, `README requirement inventory`, `Traceability`)
- Preferred gate command: `npm run verify` (or the repo’s gate if different)
- If available: `docs/RUNBOOK.md` commands (install/gate)

## Outputs
- Write/replace the plan section in: `openspec/changes/<slug>/tasks.md`
- No code changes. No command execution.

## Workflow
0) Preflight (routing):
   - If `docs/RUNBOOK.md` is missing OR the gate is unclear/missing → run `core-repo-gates-bootstrap` first.
   - If this is Angular and tooling is missing → run `angular-tooling-bootstrap` first.
   - If RUNBOOK exists, treat its commands as the source of truth.

1) Extract coverage sets (MUST):
   - AC list: `AC-1...AC-n` from the Mini-SPEC.
   - PROCESS constraints: extract delivery constraints that affect sequencing (e.g., “skeleton PR first”, required documentation).
   - Invariant:
     - Every AC must appear in exactly one iteration’s “Done when” (or be explicitly deferred with reason).
     - Every PROCESS constraint must be satisfied by the plan (enforced in Iteration 1 or stated as a cross-cutting rule).

2) Create Iteration 0 — Baseline / Gates:
   - Goal: confirm install + gate works.
   - Checks: use RUNBOOK commands if present; otherwise defaults:
     - Install: `npm ci`
     - Gate: `npm run verify`
   - Done when:
     - Gate PASS

3) Build Iterations 1–5 (max 5; excluding Iteration 0):
   - Respect PROCESS sequencing:
     - If the README requires a “skeleton-only first PR”, make Iteration 1 reflect that (structure only, no product logic).
     - If decision logging is required, include it as Done-when items per iteration or as a global rule.
   - Group work using this ordering (adjust by AC dependencies):
     - Iteration 1: Foundation / structure (+ mandatory delivery constraints)
     - Iteration 2: Core flow (happy path end-to-end)
     - Iteration 3: State & determinism (ordering/persistence/time boundaries)
     - Iteration 4–5 (optional): Edge cases + quality (errors/loading/a11y/perf constraints)
   - For determinism/state rules, prefer planning a pure function + unit test (even if UI wiring comes later).

4) For each iteration, enforce:
   - Single objective (no multi-feature bundles)
   - Minimal diffs (smallest set of files)
   - Checks include the gate (prefer `npm run verify`)
   - Done when references:
     - the subset of `AC-*` delivered, AND
     - any relevant PROCESS constraints satisfied in that iteration

5) Stop conditions:
   - If you cannot fit within ≤ 5 iterations without mixing objectives:
     - explain which ACs/constraints are too broad
     - propose splitting those ACs or deferring non-core polish
     - do not output an overstuffed plan

## Copy/paste template
```md
# Plan (OpenSpec-friendly)

## Iteration 0 — Baseline / Gates
- Goal: confirm install + gate works
- Checks
  - <INSTALL_COMMAND> (from RUNBOOK; default `npm ci`)
  - <GATE_COMMAND> (from RUNBOOK; default `npm run verify`)
- Done when
  - Gate PASS

## Iteration 1 — Foundation / structure
- Goal: ...
- Files/areas: ...
- Notes: ...
- Checks
  - <GATE_COMMAND>
- Done when
  - [ ] <PROCESS> ...
  - [ ] AC-1 ...

## Iteration 2 — Core flow
...

## Iteration 3 — State & determinism
...

## Iteration 4 — Quality / edge cases (optional)
...
```

## Common pitfalls
- Leaving determinism mechanisms unspecified (then rework later).
- Ignoring PROCESS constraints (PR sequencing/docs) in the iteration plan.
- ACs not mapped 1:1 to iterations (“stuff slips through”).
- Iterations too large (multiple objectives at once).
- Skipping Iteration 0 (debugging setup later).
