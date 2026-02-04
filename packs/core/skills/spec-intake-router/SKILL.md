---
name: spec-intake-router
description: Entry router. Given README or brief or spec or tasks, decide tech-test vs feature, mini-spec vs full spec, and process handling. Output exact next skill call(s). No file writes.
metadata:
  short-description: Router -> pick next skill
---
## Goal
Given an input (README, brief, notes, existing Mini-SPEC/SPEC, or tasks.md), choose the next best OpenSpec skill(s) and flags with minimal user burden.

## When to use

- At the start of work when you have a README/brief/spec/tasks and you want **the exact next skill call(s)**.
- When you want to minimize prompt burden by delegating routing to a deterministic rule set.

## When NOT to use

- You already know the next skill(s) and flags.
- You are not using the OpenSpec folder layout (`openspec/`) in this repo.

## Inputs
- Source text (README/notes/spec/tasks)
- Optional flags:
  - mode: auto | tt | feature (default: auto)
  - spec_level: auto | mini | full (default: auto)
  - process_mode: auto | strict | advisory (default: auto)

## Outputs
- A short routing decision + exact next skill call(s)
- No file writes.

## Routing rules (MUST)
0) If the repo is not bootstrapped (no `openspec/` workspace or no `openspec/templates/*`), run `$spec-bootstrap` before any other OpenSpec work.
1) If the text frames a take-home / code challenge / tech test or contains PR choreography (e.g., "PR #1 skeleton", "job applicants") → mode=tt.
2) Else mode=feature.
3) If mode=tt → spec_level=mini and process_mode=strict.
4) If mode=feature:
   - If scope feels small (≤ 8 requirement-like bullets) → spec_level=mini else full.
   - process_mode=advisory.
5) If an existing Mini-SPEC/SPEC draft is provided → run `spec-spec-lint` next.
6) If tasks.md is provided → run `spec-tasks-lint` next.

## Change scaffolding rule (MUST)
When the next step will write to a **new** `openspec/changes/<slug>/...` folder, the recommended order is:
1) `$spec-change-slugger` (derive stable `<slug>`)
2) `$spec-new-change-from-templates` (create proposal/tasks/specs from repo templates)
3) then the writer skill (e.g., `$spec-spec-from-readme`, `$spec-spec-from-brief`, `$spec-slice-into-iterations-*`)

## Recommended sequencing (MUST)
When creating a new change from a README/brief:
1) `$spec-change-slugger` → produce `<slug>`
2) `$spec-new-change-from-templates` → scaffold `openspec/changes/<slug>/...` from `openspec/templates/*`
3) `$spec-spec-from-readme` or `$spec-spec-from-brief`
4) `$spec-slice-into-iterations-from-*` (if applicable)

## Output format (MUST)
Return exactly:
- Decision:
- Next skill(s):
- Flags:
- Why (3 bullets max):

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

