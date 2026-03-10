---
name: "js-best-practices-guardrails"
description: "Pre-flight guardrails to apply before returning JavaScript/TypeScript code (React/Angular). Use when you need a small repo-first safety pass that catches coercion, array mutation, and async ordering risks before producing code. Don't use when the task is really a dedicated coercion/arrays/event-loop fix, a linting/tooling change, or a broad architectural refactor."
---

# JS Best Practices Guardrails

## When to use
- You are about to return JavaScript or TypeScript code and want a small repo-first safety pass.
- You need quick routing for coercion, shared-array mutation, or async ordering risks before writing a patch.

## Procedure
Step 1: Repo-first constraints
1) Follow the repo's existing conventions (imports, patterns, style).
2) Do **not** add dependencies or change tooling unless explicitly requested.
3) Continue only when the task will produce JS/TS code or a code patch.

Step 2: Scan for high-risk patterns
1) Boundary coercion risk:
   - DOM/query params/payload fields used in math, `+`, comparisons, or conditionals.
2) Array mutation risk:
   - `reverse/sort/splice` on arrays that may be shared (state, reducers, derived data).
3) Async ordering risk:
   - Promises/`await` combined with timers/events, surprising log ordering, missing error handling.
4) Read `references/catalog.md` only if you need the routing summary.

Step 3: Delegate (avoid duplication)
1) If boundary coercion risk is present and the repo uses Zod schemas at that boundary, delegate to:
   - **`zod-normalize-inputs`** for query/path/form/row normalization
   - **`zod-validate-api-boundaries`** for HTTP JSON boundary validation
2) If boundary coercion risk is present and no schema-based boundary validation is used, delegate to **`js-type-coercion-boundaries`**.
3) If array mutation risk is present, delegate to **`js-immutable-array-methods`**.
4) If async ordering is the core issue, delegate to **`js-async-event-loop-mental-model`**.
5) Do not restate those detailed patterns here; keep this skill lean.

Step 4: Apply minimal local fixes (only if delegation is not required)
1) Prefer strict equality (`===`) and explicit coercion at boundaries.
2) Avoid in-place array mutations on shared arrays (use non-mutating alternatives or copies).
3) Ensure async chains are either awaited/returned or have explicit rejection handling.

Step 5: Produce the guardrail report
1) Use `assets/output.template.md`.
2) List performed checks, delegations, and minimal diffs applied.

## Definition of done
- The skill performs a small pre-flight JS/TS safety pass without expanding into a broader refactor.
- Any coercion, array mutation, or async ordering issue is either delegated to the correct specialized skill or fixed with a minimal local patch.
- The output states what was checked, what was delegated, and what changed.

## Stop conditions
- If the runtime target (browser vs Node) affects the fix, ask for the target instead of guessing.
- If changes would require new deps or tooling, stop and ask.
- If the real problem is a specialized coercion, immutable-array, or event-loop task, stop and route to that skill instead of duplicating it here.

## Don't use when
- The task is specifically about coercion normalization or schema validation at a boundary; use `js-type-coercion-boundaries`, `zod-normalize-inputs`, or `zod-validate-api-boundaries`.
- The task is specifically about shared-array mutation semantics; use `js-immutable-array-methods`.
- The task is specifically about promise/timer/event-loop behavior; use `js-async-event-loop-mental-model`.
- The request changes linting, tooling, repo standards, or broader architecture.
