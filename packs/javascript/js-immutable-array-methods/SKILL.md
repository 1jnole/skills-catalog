---
name: "js-immutable-array-methods"
description: "Detect and remove in-place array mutations (reverse/sort/splice) when arrays may be shared (React/Angular state, reducers, derived data). Prefer ES2023 non-mutating methods (toReversed/toSorted/toSpliced) or safe copy-then-mutate fallbacks. Use when you see sort/reverse/splice in code that may share arrays. Don't use when mutation is intentionally local and proven safe in a hot path."
---

# JS Immutable Array Methods

## Procedures

Step 1: Detect mutating “crimes”
1) Scan changes for `Array.prototype.reverse`, `sort`, or `splice`.
2) Determine whether the array could be shared (state, props, selectors, caches, reused references).
3) Read `references/catalog.md` to confirm decision rules.

Step 2: Choose a safe replacement
1) Prefer ES2023:
   - `toReversed()` for `reverse()`
   - `toSorted(compareFn?)` for `sort(compareFn?)`
   - `toSpliced(start, deleteCount, ...items)` for `splice(...)`
2) If ES2023 support is uncertain, use the fallback patterns in `references/patterns.md` (copy-then-mutate, no new deps).

Step 3: Apply minimal-diff patch
1) Replace only the mutating call site.
2) Keep behavior identical (e.g., provide `compareFn` for numeric sorts).
3) Consult `references/pitfalls.md` to avoid semantic changes.

Step 4: Produce the output
1) Use `assets/output.template.md`.
2) Report which mutating calls were found and exactly how they were replaced.

## Error handling / stop conditions
- If runtime support for ES2023 methods is unknown, use the fallback patterns instead of adding polyfills/deps.
- If the code intentionally relies on mutation (documented and local), do not change it without explicit intent.
