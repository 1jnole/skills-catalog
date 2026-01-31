---
name: angular21-routing-functional-guards
description: Use when implementing functional route guards (CanActivateFn) with inject() and testable logic.
metadata:
  short-description: Routing Functional Guards
---
## Goal

Implement functional guards (CanActivateFn) with inject() and small, testable logic.

## When to use

- Auth/feature flag gating.
- Prefer functional over class guards.

## When NOT to use

- Guard logic is huge (move logic into a service).

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Workflow

1) Write guard as a function.
2) Inject minimal dependencies.
3) Return boolean/UrlTree/Observable/Promise.
4) Keep branching small.
5) Test critical behavior.

## Copy/paste templates

```ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return router.parseUrl('/login');
};
```

## Common pitfalls

- Don’t do heavy data fetching inside guards.
- Avoid side effects in guards.

## Example prompts

- "Create a functional auth guard using inject()."
- "Refactor this class guard into CanActivateFn."
