---
name: react-state-shapes-no-boolean-soup
description: "Models React UI state to avoid contradictory boolean combinations by using discriminated unions (and reducers when needed) so impossible states don't compile and transitions stay explicit. Use when adding async loading/error/ready flows, mutually exclusive UI modes, wizards, or when refactoring components with multiple interacting flags. Don't use for trivial local state (single primitive) or to introduce new state-machine libraries unless the repo already uses them or the user asks."
---

# react-state-shapes-no-boolean-soup

Replace ad-hoc boolean combinations with an explicit state shape that makes invalid states unrepresentable.

## Procedures

Step 1: Inventory current state and implied states
1) List state variables and derived flags.
2) Identify implied states + transitions.
3) Flag contradictory combinations.

Step 2: Choose the smallest correct state shape
1) Read `references/catalog.md`.
2) Prefer a tagged union (`status`/`kind`) for mutually exclusive states.
3) For async, use `loading | error | ready`.
4) Use `useReducer` for event-driven transitions.

Step 3: Implement types → initial state → transitions
1) Apply a pattern from `references/patterns.md`.
2) Make branching exhaustive.
3) Keep derived state derived.

## Artifacts
- Tagged union state type.
- Reducer + action union when needed.

## Acceptance criteria
- UI branches on a single tag (not boolean combinations).
- Impossible states not representable.
- Exhaustive branching.
- No new state-machine library unless already present/requested.

## Just-in-time references
- Routing: `references/catalog.md`
- Patterns: `references/patterns.md`
- Pitfalls: `references/pitfalls.md`
