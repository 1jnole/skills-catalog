---
name: angular21-di-injectiontoken-config
description: Use when defining typed configuration via InjectionToken (API URLs/flags) with easy test overrides and no hard-coded constants.
metadata:
  short-description: Di Injectiontoken Config
---
## Goal

Create typed configuration tokens (base URLs, flags) using InjectionToken and inject().

## When to use

- Inject config into services/interceptors.
- Override config in tests cleanly.

## When NOT to use

- Local-only constants inside one component.
- Secrets that should not live in code (prefer runtime/env injection).

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Workflow

1) Define `InjectionToken<T>`.
2) Provide once (app config) or scope (route/component) intentionally.
3) Consume via `inject()`.
4) Override in tests using providers.

## Copy/paste templates

```ts
import { InjectionToken, inject } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export function apiBaseUrl(): string {
  return inject(API_BASE_URL);
}
```

## Common pitfalls

- Don’t hardcode secrets.
- Keep token names stable; avoid exporting raw env constants everywhere.

## Example prompts

- "Create InjectionToken config for API base URL and use it in a service."
- "Override this token in tests."
