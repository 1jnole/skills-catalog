---
name: core-openspec-intake-router
description: Entry router. Given README or brief or spec or tasks, decide tech-test vs feature, mini-spec vs full spec, and process handling. Output exact next skill call(s). No file writes.
metadata:
  short-description: Router -> pick next skill
---

## Goal
Given an input (README, brief, notes, existing Mini-SPEC/SPEC, or tasks.md), choose the next best OpenSpec skill(s) and flags with minimal user burden.

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
1) If the text frames a take-home / code challenge / tech test or contains PR choreography (e.g., "PR #1 skeleton", "job applicants") → mode=tt.
2) Else mode=feature.
3) If mode=tt → spec_level=mini and process_mode=strict.
4) If mode=feature:
   - If scope feels small (≤ 8 requirement-like bullets) → spec_level=mini else full.
   - process_mode=advisory.
5) If an existing Mini-SPEC/SPEC draft is provided → run `core-openspec-spec-lint` next.
6) If tasks.md is provided → run `core-openspec-tasks-lint` next.

## Output format (MUST)
Return exactly:
- Decision:
- Next skill(s):
- Flags:
- Why (3 bullets max):

