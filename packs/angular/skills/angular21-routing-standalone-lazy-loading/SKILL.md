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

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


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

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

