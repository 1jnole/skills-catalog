# Catalog — Guardrail routing

## Use when
- The agent is about to return JS/TS code or a patch (React/Angular).
- You want predictable runtime behavior and minimal side effects.

## Don't use when
- You are changing linting/tooling or repo standards — out of scope.
- You are doing broad architecture refactors.

## Delegation triggers
- Boundary coercion triggers → `js-type-coercion-boundaries`
- In-place array mutations (`reverse/sort/splice`) → `js-immutable-array-methods`
- Ordering/queues confusion (Promises vs timers) → `js-async-event-loop-mental-model`
