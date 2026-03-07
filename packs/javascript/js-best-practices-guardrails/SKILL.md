---
name: "js-best-practices-guardrails"
description: "Pre-flight guardrails to apply before returning JavaScript/TypeScript code (React/Angular). Enforces repo-first conventions, avoids implicit coercion at boundaries, prevents accidental array mutations, and catches common async ordering/error-handling mistakes. Delegates to specialized skills when triggers match (coercion/arrays/event loop). Don't use as a replacement for linting/tooling changes or for broad architectural refactors."
---

# JS Best Practices Guardrails

## Procedures

Step 1: Repo-first constraints
1) Follow the repo’s existing conventions (imports, patterns, style).
2) Do **not** add dependencies or change tooling unless explicitly requested.
3) If the task is JS/TS output, continue; otherwise, skip.

Step 2: Scan for high-risk patterns
1) Boundary coercion risk:
   - DOM/query params/payload fields used in math, `+`, comparisons, or conditionals.
2) Array mutation risk:
   - `reverse/sort/splice` on arrays that may be shared (state, reducers, derived data).
3) Async ordering risk:
   - Promises/`await` combined with timers/events, surprising log ordering, missing error handling.

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

## Error handling / stop conditions
- If the runtime target (browser vs Node) affects the fix, ask for the target instead of guessing.
- If changes would require new deps or tooling, stop and ask.
