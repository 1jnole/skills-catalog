# Pitfalls — Immutable array methods

- `sort()` mutates **and** sorts lexicographically by default; numeric sorts need a compare function.
- `reverse()` mutates in place; mutating shared arrays breaks UI predictability.
- `splice()` mutates; it is easy to accidentally rely on side effects in reducers/state updates.
- Avoid changing semantics: keep `compareFn` and ensure downstream code expects a new array vs same reference.
