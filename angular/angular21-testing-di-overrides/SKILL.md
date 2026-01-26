---
name: angular21-testing-di-overrides
description: Use when overriding providers and InjectionTokens in tests cleanly and robustly.
metadata:
  short-description: Testing Di Overrides
---
## Goal

Override providers/tokens in tests cleanly; prefer overriding base tokens to affect derived tokens.

## When to use

- Override config tokens.
- Swap implementations with fakes.

## When NOT to use

- Domain code (prefer pure function tests).

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Workflow

1) Identify token/provider to override.
2) Override in test providers.
3) Prefer overriding base tokens.
4) Keep overrides local to tests.
5) Avoid global mutable overrides.

## Copy/paste templates

```ts
// Pseudocode: providers: [{ provide: API_BASE_URL, useValue: 'http://test' }]
```

## Common pitfalls

- Too many overrides reduce readability.
- Match scope (root vs component) when overriding.

## Example prompts

- "Override API_BASE_URL in tests and verify derived endpoint."
- "Replace this mock with a simple fake via provider override."
