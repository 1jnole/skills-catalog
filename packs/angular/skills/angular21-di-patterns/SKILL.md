---
name: angular21-di-patterns
description: Use when designing Angular 21+ DI with intentional provider scope, valid inject() contexts, and typed InjectionToken composition.
metadata:
  short-description: Angular21 DI Patterns
---
## Goal

Model dependency injection in Angular 21+ with:
- explicit provider scoping (root/route/component)
- correct `inject()` context usage
- typed `InjectionToken` configuration and derived token factories

## When to use

- Isolating state lifetime by provider scope.
- Fixing `inject()` context errors in functional APIs/helpers.
- Building composable config from base tokens and factory-derived tokens.

## When NOT to use

- Local constants that do not need DI.
- Runtime mutable state that belongs in services/signals rather than tokens.
- Scoping changes that would break expected singleton behavior (auth/session/shared cache).

## Inputs

- What feature/component/service you are working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.

## Workflow

1) Define ownership and lifetime for each dependency (app-wide, per-route, per-component).
2) Provide services/tokens at the minimal valid scope that matches that lifetime.
3) Ensure `inject()` is called only in valid contexts (constructors, token/provider factories, functional guards/resolvers).
4) Move hidden `inject()` calls out of plain helpers; pass dependencies explicitly when needed.
5) Define base `InjectionToken<T>` values and derive composed tokens via `factory + inject()`.
6) In tests, override base tokens/providers locally to verify behavior deterministically.

## Copy/paste templates

```ts
import { InjectionToken, inject } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export const AIRPORTS_ENDPOINT = new InjectionToken<string>('AIRPORTS_ENDPOINT', {
  factory: () => `${inject(API_BASE_URL).replace(/\/$/, '')}/airports`,
});
```

## Common pitfalls

- Calling `inject()` outside an Angular injection context.
- Creating circular dependencies between derived tokens.
- Over-scoping providers at component level and accidentally duplicating caches.
- Hardcoding environment values instead of injecting typed configuration.

## Example prompts

- "Choose root/route/component provider scope for this store and justify it."
- "Fix this inject() context error in a helper or guard."
- "Create base + derived InjectionToken config and show test overrides."

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs -> ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" -> stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) -> request the minimum needed artifacts.
