---
name: react-refactor-extract-hook-or-component
description: "Refactors React+TypeScript code by extracting reusable hooks or components while preserving type safety: define a clear contract (inputs/outputs), keep types aligned with runtime behavior, and migrate call sites with minimal diffs. Use when you see repeated state/effect logic, repeated event/validation code, or component APIs that are hard to reuse. Don't use to perform broad architectural rewrites unless explicitly requested."
---

# react-refactor-extract-hook-or-component

Extract reuse without losing type safety: define a small contract, implement once, then migrate call sites.

## Procedures

Step 1: Identify duplication and pick the smallest abstraction
- Helper (pure), Hook (state/effects), or Component (UI contract).

Step 2: Define the contract first
- Write the signature (typed inputs/outputs). Prefer narrow contracts.

Step 3: Implement the extracted unit
- Keep runtime behavior aligned with types. Keep boundary validation at boundaries.

Step 4: Migrate incrementally
- One call site at a time. Let TS errors guide.

Step 5: Lock behavior
- Update/add tests for shared contracts.

## Artifacts
- Extracted unit + incremental migrations.

## Acceptance criteria
- Clear signature.
- No new unsafe casts added.
- Duplicated code removed.

## Just-in-time references
- Routing: `references/catalog.md`
- Patterns: `references/patterns.md`
- Pitfalls: `references/pitfalls.md`
