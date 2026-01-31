---
name: angular21-di-injectiontoken-factory-composition
description: Use when you need to derive new DI tokens from existing tokens using InjectionToken factories and inject() (e.g., base URL → endpoints), keeping config strongly typed and composable.
metadata:
  short-description: Di Injectiontoken Factory Composition
---
## Goal

Define **derived configuration** using Angular DI in a composable, testable way:
- Create a base `InjectionToken<T>`
- Create derived tokens using `factory` + `inject()`
- Keep values typed and override-friendly

## When to use

- Derived values: `API_BASE_URL` → `AIRPORTS_ENDPOINT`
- Derived config objects from multiple tokens
- Cleaner alternative to importing constants everywhere

## When NOT to use

- Local values inside a single component
- Dynamic runtime state (use services/signals)
- Per-request values (tokens are config, not request storage)

## Inputs

- Token names (UPPER_SNAKE_CASE) and types
- Where tokens are provided (app config / route / component)
- Base value source (env/runtime config)

## Workflow

1) Create a base token (strong type).
2) Provide the base token once.
3) Create derived tokens using `InjectionToken(..., { factory: () => ... })`.
4) Use `inject(BASE_TOKEN)` inside factories.
5) Consume derived tokens with `inject(DERIVED_TOKEN)`.
6) In tests, override the base token to update derived values.

## Copy/paste templates

### Base token + derived endpoint token

```ts
import { InjectionToken, inject } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export const AIRPORTS_ENDPOINT = new InjectionToken<string>('AIRPORTS_ENDPOINT', {
  factory: () => {
    const base = inject(API_BASE_URL);
    return `${base.replace(/\/$/, '')}/airports`;
  },
});
```

### Derived typed config object from multiple tokens

```ts
import { InjectionToken, inject } from '@angular/core';

export type ApiConfig = {
  baseUrl: string;
  timeoutMs: number;
  useMocks: boolean;
};

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
export const API_TIMEOUT_MS = new InjectionToken<number>('API_TIMEOUT_MS');
export const USE_MOCKS = new InjectionToken<boolean>('USE_MOCKS');

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG', {
  factory: () => ({
    baseUrl: inject(API_BASE_URL),
    timeoutMs: inject(API_TIMEOUT_MS),
    useMocks: inject(USE_MOCKS),
  }),
});
```

## Common pitfalls

- `inject()` must run in an injection context (token factories are OK).
- Avoid circular token dependencies.
- Don’t treat tokens as mutable runtime state.

## Example prompts

- "Create API_BASE_URL and derive AIRPORTS_ENDPOINT via a token factory."
- "Compose a typed API_CONFIG token from multiple base tokens."
- "Override API_BASE_URL in tests and verify derived tokens change."
