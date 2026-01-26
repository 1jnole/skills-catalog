---
name: tt-openspec-spec-from-readme
description: Use when starting a technical test from a README to extract a Mini-SPEC (scope/no-scope, acceptance criteria, risks) before creating an OpenSpec change.
metadata:
  short-description: TT → README → Mini-SPEC
---

## Goal
Convert a technical test README into a Mini-SPEC that is explicit and implementation-ready, minimizing rework.

## When to use
- You are starting a technical test and only have a README / brief.
- Requirements are ambiguous, scattered, or missing acceptance criteria.
- You want to freeze scope before writing code (OpenSpec-first).

## When NOT to use
- There is already an active OpenSpec change describing the work in `openspec/changes/<slug>/`.
- The request is purely exploratory brainstorming with no delivery intent.

## Inputs
- README content (paste or point to file)
- Constraints (stack, time limit, must-have features, forbidden libs)
- Any design/system references (Figma, API docs, examples)

## Workflow
1) Read README end-to-end once.
2) Extract explicit requirements → turn them into acceptance criteria (checklist).
3) Define in scope vs out of scope strictly.
4) If you infer anything, label it as an assumption.
5) List unknowns/questions (max 5).
6) List top 3 risks (delivery risks).
7) Propose a 3–5 step iteration plan (no code).

## Copy/paste templates
```md
# Mini-SPEC

## Summary
- ...

## In scope
- ...

## Out of scope
- ...

## Acceptance criteria
- [ ] ...

## Assumptions
- ...

## Unknowns / questions (max 5)
- ...

## Risks (top 3)
- ...

## Proposed iteration plan (3–5 steps)
- Iteration 0: Baseline / gates
- Iteration 1: ...
- Iteration 2: ...
```

## Common pitfalls
- Inventing requirements not present in the README.
- Writing architecture decisions without constraints.
- Producing a plan too big to review in one PR/change.

## Example prompts
- "Turn this README into a Mini-SPEC for OpenSpec."
- "Extract acceptance criteria + scope boundaries from this challenge."
- "List unknowns/risks and an iteration plan before coding."
