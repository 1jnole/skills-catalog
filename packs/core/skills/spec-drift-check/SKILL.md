---
name: spec-drift-check
description: Check the current diff against the OpenSpec change (<slug>) and FAIL if any code change cannot be traced to an explicit requirement or accepted decision.
metadata:
  short-description: Drift check -> PASS/FAIL
---
## Goal
Prevent scope creep: every code change must be traceable to the OpenSpec change folder for the active `<slug>`.

## When to use

- After implementing tasks, to compare code changes vs spec/tasks and detect out-of-scope drift.
- Before merging, to ensure the PR stays within `openspec/changes/<slug>/...` intent.

## When NOT to use

- No implementation has been done yet.
- You are trying to change the spec itself (edit spec, then re-lint).

## Inputs
- `slug`
- Spec (Mini-SPEC/SPEC and/or iteration specs) under `openspec/changes/<slug>/`
- Current working diff (`git diff` and/or file change list)

## Outputs
- Drift report only (no file writes):
  - Status: `PASS` | `FAIL`
  - Drift items: file/path + what changed + missing traceability
  - Fix options (remove change vs update spec)

## Workflow (MUST)
1) Enumerate changed files (prefer `git diff --name-only`).
2) For each changed file:
   - Summarize what changed (1–2 bullets).
   - Map the change to:
     - an `R-*` and/or `AC-*`, OR
     - a documented decision (`D-*`) that the user has approved.
3) If any change cannot be mapped, mark it as DRIFT.

## PASS criteria
- Every changed file has at least one explicit mapping (R/AC/D) and no extra behaviors beyond those mappings.

## FAIL criteria
- Any change is not mapped.
- Any mapping relies on "nice to have", "future proofing", or other non-binding considerations unless explicitly required.
- The diff introduces new behavior that is not specified.

## Output format (MUST)
Return exactly:
- Status:
- Drift:
- Suggested fixes:

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

