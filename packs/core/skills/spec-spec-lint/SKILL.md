---
name: spec-spec-lint
description: Lint an OpenSpec Mini-SPEC or SPEC for completeness and no-drop coverage against the source brief (README or notes). Output PASS or FAIL only. No writes.
metadata:
  short-description: Spec lint -> PASS/FAIL
---

## Goal
Catch missing/forgotten requirements (including PROCESS items) before slicing or coding, and enforce `process_mode` rules (strict vs advisory).

## When to use

- After generating/editing a Mini-SPEC/SPEC, to validate structure, traceability, and process-mode rules.
- Before slicing tasks or implementing code, to prevent “silent drops”.

## When NOT to use

- There is no spec file yet (generate it first).
- You want implementation changes (this skill only reports issues).

## Inputs
- Spec markdown (Mini-SPEC or SPEC)
- Optional: source brief (recommended) to check coverage
- Optional flags:
  - `process_mode`: `strict | advisory | auto` (default: `auto`)
    - `auto`: infer strict if the spec declares strict, otherwise advisory

## Outputs
- A lint report only (no file writes):
  - Status: `PASS|FAIL`
  - Errors: `LINT-1`, `LINT-2`...
  - Fix hints (optional, max 5 bullets)

## Checks (MUST)

### Structure
- Must contain: Context/Summary, Requirement inventory (`R-1..R-n`), Acceptance criteria, Traceability.
- If the spec includes sections for `Open questions / decisions` and/or `Non-binding considerations`, they must not be empty placeholders.

### Requirement extraction integrity
- Each `R-*` should include a `Source:` line (quote/section reference) OR the spec must clearly state how sources are tracked.
- If a source brief is provided:
  - Every requirement-like sentence must map to some `R-*` or be explicitly marked as a non-binding consideration.
  - Every `R-*` must have a status in traceability.

### Traceability
- Every `R-*` has exactly one status: `MAPPED | OUT | UNKNOWN | ASSUMED`.
- Every `MAPPED` requirement lists at least one corresponding AC id.
- No AC may reference a non-existent `R-*`.

### `process_mode` enforcement
- `strict`:
  - `ASSUMED` is forbidden → FAIL if present.
  - `UNKNOWN` is allowed **only** if the spec also includes a linked `Q-*` / `D-*` item explaining the ambiguity.
  - No implementation AC may depend on an `UNKNOWN` requirement (ACs must only map to `MAPPED`).
- `advisory`:
  - `ASSUMED` is allowed only if assumptions are explicitly documented in a `Notes / assumptions` section.

### Acceptance criteria quality
- Every AC checkbox includes `Verify: ...`.
- Atomic: one behavior per AC.
- No unverifiable AC (“should be fast” without a metric).

### Determinism/state (when implied)
- If the brief/spec implies daily/session stability, ordering, caching, navigation state:
  - Spec must state explicit rules and boundaries (timezone, persistence scope, what “same day” means).

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

