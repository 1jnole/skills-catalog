---
name: angular21-routing-patterns
description: Use when implementing Angular 21+ routing with standalone lazy loading, component input binding, and functional guards/resolvers.
metadata:
  short-description: Angular21 Routing Patterns
---
## Goal

Design routing flows that stay scalable and readable by combining:
- standalone lazy loading (`loadComponent` / `loadChildren`)
- route-to-component input binding
- functional guards and resolvers used with clear criteria

## When to use

- Adding or refactoring feature routes in Angular 21+.
- Reducing `ActivatedRoute` wiring by binding params/query to `input()`.
- Implementing navigation protection or preload decisions with functional APIs.

## When NOT to use

- The repo is locked to a different routing architecture for this scope.
- The route change is purely cosmetic and does not affect loading/navigation behavior.

## Inputs

- What feature/component/service you are working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.

## Workflow

1) Define route boundaries first (`loadChildren` for feature sets, `loadComponent` for pages).
2) Keep top-level routes minimal and feature-first.
3) Enable component input binding when component public inputs are stable.
4) Map params/query to `input()` fields and parse non-string types explicitly.
5) Choose functional guards for access control and use resolvers only when preloading is truly required.
6) Keep guard/resolver logic small; move heavy work into services and test critical navigation paths.

## Copy/paste templates

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'airports',
    loadChildren: () =>
      import('./features/airports/airports.routes').then((m) => m.AIRPORTS_ROUTES),
  },
];
```

## Common pitfalls

- Overusing resolvers for pages that can progressively load.
- Treating route params as typed values without parsing.
- Putting heavy side effects inside guards.
- Mixing eager imports with lazy routes unintentionally.

## Example prompts

- "Create feature-first routes with loadChildren/loadComponent for this module."
- "Replace ActivatedRoute wiring with component input binding for :id and query."
- "Add a small functional guard and decide if resolver is necessary."

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs -> ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" -> stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) -> request the minimum needed artifacts.
