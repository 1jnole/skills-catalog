---
name: angular21-testing-component-scenarios
description: Use when writing high-value component/integration tests (Testing Trophy) with minimal brittle mocks.
metadata:
  short-description: Testing Component Scenarios
---
## Goal

Write maintainable component/integration tests (Testing Trophy) focusing on behavior, not internals.

## When to use

- UI state rendering, interactions, a11y.
- Pages composing UI + wiring to facade/store.

## When NOT to use

- Pure function logic (unit test in domain).

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Workflow

1) Render component with real template.
2) Use minimal boundary fakes.
3) Assert behavior (rendering, events).
4) Avoid testing private methods.
5) Keep tests readable (AAA).

## Copy/paste templates

```md
Test checklist:
- renders key UI
- user interaction updates UI
- a11y basics
```

## Common pitfalls

- Over-mocking makes tests brittle.
- Don’t assert implementation details.

## Example prompts

- "Write a component test for list loading/empty states."
- "Convert unit tests into a higher-value component test."
