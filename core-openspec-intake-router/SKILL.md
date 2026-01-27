---
name: core-openspec-intake-router
description: "Entry skill: decide the correct OpenSpec flow (TT vs feature; README vs spec vs tasks) and return the next skill(s) to run when the user did not provide a flow."
metadata:
  short-description: OpenSpec Intake Router
  category: openspec
---

## Goal
Given any starting input (README/brief, a Mini-SPEC/SPEC draft, or an OpenSpec tasks.md),
select the correct **next** skill sequence with the minimum assumptions.

This skill **does not write files**. It only outputs routing + next steps.

## When to use
- The user provides content but does **not** specify whether they want a spec, lint, or slicing.
- You suspect there is already an OpenSpec artifact and you want to avoid overwriting.
- You want deterministic sequencing without prompt glue.

## When NOT to use
- The user explicitly asked to run a specific skill already.

## Inputs
- A single input text or pointer (README excerpt, spec draft, tasks.md draft).
- Optional flags (if provided by caller):
  - mode: auto | tt | feature
  - spec_level: auto | mini | full
  - process_mode: strict | advisory

## Routing rules (MUST)
### 1) Detect artifact type
- If the input contains `# Mini-SPEC` or `## README requirement inventory` → treat as **mini_spec**.
- If the input contains `# SPEC` or `## Requirements (R-1..R-n)` → treat as **spec_full**.
- If the input contains `## Iteration 0` or `# Plan (OpenSpec-friendly)` → treat as **tasks**.
- Otherwise treat as **brief/readme**.

### 2) Detect mode (tt vs feature)
If `mode` is set, respect it. Otherwise:
- If the input mentions "technical test", "code challenge", "take-home", "PR #1", "skeleton", "evaluation", "deliverables" → `mode=tt`.
- Else → `mode=feature`.

### 3) Decide spec level
If `spec_level` is set, respect it. Otherwise:
- If `mode=tt` → `spec_level=mini`, `process_mode=strict`
- If `mode=feature`:
  - If the brief seems small (≈ ≤8 requirements) → `spec_level=mini` (allowed)
  - Else → `spec_level=full`
  - `process_mode=advisory`

### 4) Choose next skill(s)
- If artifact is **tasks**:
  - Next: `core-openspec-tasks-lint`
  - If FAIL: `core-openspec-tasks-fix`
- If artifact is **mini_spec** or **spec_full**:
  - Next: `core-openspec-spec-lint`
  - If FAIL: `core-openspec-spec-fix`
  - If PASS and tasks are needed:
    - If `mode=tt` → `tt-openspec-slice-into-iterations`
    - Else → `feature-openspec-slice-into-iterations`
- If artifact is **brief/readme**:
  - If `mode=tt` → `tt-openspec-spec-from-readme`
  - Else:
    - If `spec_level=full` → `feature-openspec-spec-from-brief`
    - Else → `tt-openspec-spec-from-readme` is NOT appropriate; use `feature-openspec-spec-from-brief` and keep it mini.

### 5) Gate prerequisites (advisory)
If the repo gate or RUNBOOK is unclear/missing:
- Recommend `core-repo-gates-bootstrap` before planning iterations.

## Output format (MUST)
Return exactly this shape (no extra sections):

- Decision:
- Artifact:
- Next skill(s):
- Flags:
- Why (max 3 bullets):

Example:
- Decision: mode=tt, spec_level=mini
- Artifact: brief/readme
- Next skill(s): tt-openspec-spec-from-readme → core-openspec-spec-lint
- Flags: process_mode=strict
- Why:
  - README mentions PR sequencing (“skeleton first”)
  - No existing spec/tasks detected
  - TT defaults require strict no-drop
