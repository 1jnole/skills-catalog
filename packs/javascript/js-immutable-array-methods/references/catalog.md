# Catalog — Immutable array methods

## Use when
- You see `reverse()`, `sort()`, or `splice()` on arrays that might be shared (UI state, reducers, selectors, derived data).
- You need predictable behavior without side effects.

## Don't use when
- The array is provably local and mutation is intentionally used (and measured) in a hot path.

## Core facts (Hard Parts v3)
- `reverse`, `sort`, and `splice` mutate the original array **in place**.
- ES2023 provides non-mutating alternatives:
  - `toReversed`, `toSorted`, `toSpliced`.

## Output expectation
- Identify the mutating call(s).
- Replace with a non-mutating equivalent or fallback.
- Preserve semantics (especially sorting).

## Sources
- Slides: p.35 (reverse/splice/sort mutate; toReversed/toSpliced/toSorted alternatives).
- Transcripts: “Non-Mutating Array Methods” lesson (often labeled around lesson 09).
