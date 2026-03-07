---
name: react-data-fetching-contract
description: "Implements type-safe data fetching in React+TypeScript with explicit loading/error/ready states, runtime validation at the boundary (reuse repo schemas/decoders), and race-condition-safe effects (cleanup/AbortController). Use when adding/refactoring fetch logic, async hooks, or Suspense/use() data consumption. Don't use to introduce a new validation library unless the repo already uses it or the user asks."
---

# react-data-fetching-contract

Fetch data with explicit states, correct error handling, and boundary validation.

## Procedures

Step 1: Choose the fetching surface
1) Decide where fetch belongs (component effect, fetcher, custom hook, loader/server function).
2) Choose consumption model: effect-driven vs Suspense-driven (`use()`).

Step 2: Validate at the boundary
1) Treat `response.json()` as `unknown`.
2) Reuse existing schemas/decoders when present; otherwise use a local guard.
3) Map DTO → UI/domain types if needed.

Step 3: Model UI state explicitly
1) Use a single tagged union (`loading | error | ready`).
2) Keep retry/reset transitions explicit.

Step 4: Make effects race-safe (effect-driven)
1) Use cleanup flags and/or `AbortController`.
2) Keep dependencies stable.

## Artifacts
- Fetcher/resource returning validated safe data.
- `Loadable<T>`-style state (or Suspense boundary usage).
- Cleanup/abort handling when needed.

## Acceptance criteria
- No unsafe assertion from `response.json()`.
- Boundary validation exists with explicit failure path.
- Async state explicit.
- Effect-driven flows are race-safe.

## Just-in-time references
- Routing: `references/catalog.md`
- Patterns: `references/patterns.md`
- Pitfalls: `references/pitfalls.md`
