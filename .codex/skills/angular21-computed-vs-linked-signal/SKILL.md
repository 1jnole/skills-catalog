---
name: angular21-computed-vs-linked-signal
description: Use when choosing between computed() and linkedSignal() to avoid duplicated
  state and keep derivations correct.
metadata:
  short-description: Computed Vs Linkedsignal
---
## Goal

Choose computed() vs linkedSignal() correctly to avoid state duplication.

## When to use

- Derived values: computed().
- Derived but locally editable: linkedSignal().

## When NOT to use

- When a single source of truth is enough and local edits aren’t needed.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Workflow

1) Find the source of truth.
2) If read-only derived → computed().
3) If derived + writable local edits → linkedSignal().
4) Document resync behavior.

## Copy/paste templates

```ts
import { signal, computed, linkedSignal } from '@angular/core';

const items = signal<string[]>([]);
const count = computed(() => items().length);
const selected = linkedSignal(() => items()[0] ?? null);
```

## Common pitfalls

- Writable derivations can hide bugs; use only with clear reason.
- Ensure stable mapping when items change.

## Example prompts

- "Refactor this derived state to computed()."
- "Implement linkedSignal for a locally editable selection."
