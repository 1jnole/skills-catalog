---
name: angular21-defer-testing-strategy
description: Use when testing @defer blocks deterministically without flaky timing-based tests.
metadata:
  short-description: Defer Testing Strategy
---
## Goal

Test deferred rendering deterministically (avoid setTimeout-based flakiness).

## When to use

- When you need confidence around placeholders/loading states.
- When regressions happen around deferred UI.

## When NOT to use

- If the deferred UI is purely cosmetic and not worth test complexity.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Workflow

1) Assert placeholder renders initially.
2) Trigger defer deterministically (interaction/viewport simulation).
3) Assert deferred content renders.
4) Assert error path if applicable.
5) Avoid sleeps/timeouts; prefer explicit triggers.

## Copy/paste templates

```md
Test checklist:
- placeholder visible
- trigger causes content render
- error state handled
```

## Common pitfalls

- Sleeping/timeouts are flaky.
- Ensure triggers are reproducible in test environment.

## Example prompts

- "Write a stable test for this @defer block without timeouts."
- "Test placeholder accessibility and content appears on interaction."
