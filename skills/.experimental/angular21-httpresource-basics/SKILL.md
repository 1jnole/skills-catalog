---
name: angular21-httpresource-basics
description: Use when fetching data with httpResource and rendering loading/error/empty/value states in Angular 21+.
metadata:
  short-description: Httpresource Basics
---
## Goal

Fetch data using `httpResource` and render explicit loading/error/empty/value states.

## When to use

- List/detail fetching with parameters.
- Signals-friendly async state without manual subscriptions.

## When NOT to use

- Complex mutation flows where RxJS orchestration dominates.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Workflow

1) Identify key inputs (id/query).
2) Create resource keyed by those inputs; guard null.
3) Build VM via computed.
4) Render states via `@if/@for`.
5) Add typing; optionally parse/transform.

## Copy/paste templates

```ts
// Pseudocode
const data = httpResource(() => (id() ? `/api/items/${id()}` : null));
const vm = computed(() => ({ loading: data.isLoading(), error: data.error(), value: data.value() }));
```

## Common pitfalls

- Missing guard → invalid requests.
- Don’t fetch inside effects; prefer resource.

## Example prompts

- "Create httpResource for airport list and render states."
- "Guard the resource so it does not request until id exists."
