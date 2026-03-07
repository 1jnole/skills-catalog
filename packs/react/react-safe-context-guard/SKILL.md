---
name: react-safe-context-guard
description: "Provides a safe React Context pattern that throws a clear runtime error when consumed outside its Provider, with optional patterns to stabilize Provider values and split State vs Actions to reduce unnecessary rerenders. Use when creating/refactoring shared Contexts (auth, theme, feature flags, app services) or when bugs occur due to missing Providers. Don't use when the Context is intentionally optional (undefined/null is part of the API) or when a prop-based API is simpler."
---

# react-safe-context-guard

Ensure Context usage is predictable: missing Providers fail loudly, and Context updates don’t cause avoidable rerenders.

## Procedures

Step 1: Classify the Context contract
1) Decide whether a Provider is required for correctness.
2) If the Context is intentionally optional, keep an explicit optional API (do not add throwing behavior).

Step 2: Implement a safe Context helper
1) Use the safe helper pattern from `references/patterns.md` (hook throws if used outside Provider).
2) Ensure the error message identifies the hook name and missing Provider.

Step 3: Migrate consumers to the safe hook
1) Replace direct `useContext(SomeContext)` usage with the safe `useXxx()` hook.
2) Remove masking defaults like `createContext({} as T)` or `null as any`.
3) Ensure Providers exist in app roots/layouts and in test/story wrappers as needed.

Step 4: Reduce avoidable rerenders (only if needed)
1) Stabilize Provider `value` if it is an object literal.
2) If consumers often need only actions, split into State vs Actions contexts.

## Artifacts
- Safe hook + Provider pairing for the target Context.
- Consumer migration to the safe hook.
- Provider value stabilization or State/Actions split when needed.

## Acceptance criteria
- Using the Context outside its Provider throws a clear error.
- No masking Context defaults remain.
- Consumers use a dedicated safe hook rather than raw `useContext`.
- Provider `value` identity is stabilized (or context is split) when rerenders are a problem.

## Error handling and stop conditions
- If converting optional → required changes public semantics, stop and ask for intent.
- If Provider placement is framework-dependent (server/client boundaries), do not guess; stop and ask.

## Just-in-time references
- Routing: `references/catalog.md`
- Mechanical patterns: `references/patterns.md`
- Failure modes: `references/pitfalls.md`
