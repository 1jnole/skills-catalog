---
name: js-guardrails-non-mutating-array-updates
description: "Hardens JS/TS array updates by preventing accidental in-place mutation of arrays used for derived data, UI display, selectors, reducers, props, and other shared values. Use when code calls mutating array methods or direct index writes on arrays that may be reused elsewhere and the right fix is a small local non-mutating rewrite. Don't use when mutation is required by contract, the main task is algorithm or performance design, or runtime support for modern copy-returning methods is unclear."
---

# JS Guardrails — Non-Mutating Array Updates

## When to use
- You are about to return or edit JS/TS code that transforms arrays used for UI display, selectors, reducers, props, cached results, or other values that may be shared.
- The risk comes from in-place mutation such as `sort`, `reverse`, `splice`, `push`, `pop`, `shift`, `unshift`, or direct index assignment.
- The intended fix is a small local rewrite that preserves the original array and keeps ownership semantics explicit.

## Procedure
Step 1: Confirm this is a shared-array mutation problem.
1. Identify the array being changed and whether the same array value is reused elsewhere.
2. Identify the mutating operation: `sort`, `reverse`, `splice`, `push`, `pop`, `shift`, `unshift`, direct index assignment, or a helper that mutates internally.
3. If the array is clearly local, intentionally owned, and mutation is part of the contract, stop and do not force a non-mutating rewrite.

Step 2: Choose the smallest safe non-mutating rewrite.
1. For display or derived ordering, prefer copy-returning methods such as `toSorted(...)` or `toReversed(...)` when runtime support is clear.
2. If runtime support is unclear, copy first with `[...items]`, `items.slice()`, or another local copy, then mutate the copy.
3. For insert/remove updates, prefer `toSpliced(...)` when available, or build the result with slicing/spread instead of mutating the original.
4. For append/prepend, prefer `[...items, next]` or `[next, ...items]` instead of `push`/`unshift` on a shared array.
5. Keep the patch local; do not introduce state libraries, Immer, or broader refactors.

Step 3: Verify ownership and behavior.
1. Check that the original array still preserves its order and contents after the change.
2. Check that the derived array still matches the intended display or business rule.
3. Surface runtime compatibility questions if the patch depends on modern array-copying methods and the target environment is unknown.
4. If ownership is ambiguous, stop and ask instead of changing semantics by guesswork.

## Definition of done
- The risky update no longer mutates the original shared array in place.
- The intended order or contents are preserved in the derived result.
- The patch stays local and does not expand into framework, state-management, or performance redesign work.
- Runtime assumptions for `toSorted`, `toReversed`, or `toSpliced` are explicit when they matter.

## Stop conditions
- You cannot tell whether the array is intentionally owned and mutable or shared and must stay stable.
- The code depends on mutation as part of an explicit API contract.
- The runtime target is unclear and the correct compatibility strategy for modern copy-returning methods is not obvious.
- The real problem is data ownership architecture, not a local array update.

## Don’t use when
- The main task is algorithm design or performance tuning of large collections.
- The main task is introducing Immer, persistent data structures, or state-library conventions.
- The request is a deep theory explanation of arrays, references, or memory models.
- The real issue is async ordering, coercion, `this` binding, or another unrelated guardrail.
