---
name: react-performance-sanity
description: "Applies performance sanity checks for React+TypeScript: prefer React Compiler automatic memoization when available, use manual memoization only when it addresses a measured/clear issue, keep hook dependencies stable, and tune Vite/TypeScript build performance when relevant. Use when investigating rerenders/slow renders, optimizing hook dependency churn, or improving build/HMR performance in Vite React TS projects. Don't use for premature micro-optimizations or to introduce new tooling unless the repo already uses it or the user asks."
---

# react-performance-sanity

Optimize deliberately: choose the smallest fix that preserves correctness.

## Procedures

Step 1: Identify the performance surface
- Runtime (rerenders/expensive work) vs build/dev (HMR/type-check/bundle).

Step 2: Compiler-first (when available)
- Prefer React Compiler automatic memoization patterns.
- Add `useMemo`/`useCallback`/`memo` only when necessary and with correct deps.

Step 3: Stabilize dependencies and identities
- Avoid recreating objects/functions unnecessarily.

Step 4: Vite + TS sanity (only if relevant)
- Apply parallel type checking and config hygiene aligned with repo.

## Artifacts
- Targeted perf changes with minimal diffs.

## Acceptance criteria
- Changes target a real symptom.
- Memoization deps are correct.
- No tooling churn unless requested/already present.

## Just-in-time references
- Routing: `references/catalog.md`
- Patterns: `references/patterns.md`
- Pitfalls: `references/pitfalls.md`
