---
name: angular21-routing-standalone-lazy-loading
description: Use when adding standalone lazy-loaded routes with loadComponent/loadChildren using feature-first organization.
metadata:
  short-description: Routing Standalone Lazy Loading
---
## Goal

Add routes using standalone lazy loading with `loadComponent` and `loadChildren` (feature-first).

## When to use

- Adding a page/feature.
- Refactoring routes to scale via lazy loading.

## When NOT to use

- Repo uses different convention and you can’t change it now.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Workflow

1) Keep app routes minimal.
2) Put feature routes in `features/<feature>/<feature>.routes.ts`.
3) Use `loadComponent` for pages.
4) Use `loadChildren` for feature route sets.
5) Keep redirects explicit.

## Copy/paste templates

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'airports', loadChildren: () => import('./features/airports/airports.routes').then(m => m.AIRPORTS_ROUTES) },
];
```

## Common pitfalls

- Avoid deep nesting without reason.
- Don’t mix eager imports with lazy routes.

## Example prompts

- "Add lazy-loaded /airports routes using loadChildren and feature routes."
- "Convert these routes to loadComponent."
