---
name: angular21-httpresource-factory-service-pattern
description: Use when creating reusable httpResource factories in services to reduce duplication and centralize parsing.
metadata:
  short-description: Httpresource Factory Service Pattern
---
## Goal

Create reusable resource factories in services to centralize URL + parse + typing.

## When to use

- Multiple components share same resource behavior.
- You want a single source for endpoint/mapping.

## When NOT to use

- Component-only resource unlikely to be reused.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


## Workflow

1) Create a service exposing a resource factory function.
2) Keep inputs explicit (id/query).
3) Centralize parse/mapping.
4) Components consume resource and render states.

## Copy/paste templates

```ts
// Pseudocode
// resourceForAirport(idSig) { return httpResource(() => idSig()?`/api/airports/${idSig()}`:null, { parse }) }
```

## Common pitfalls

- Avoid hidden dependencies; keep args explicit.
- Don’t recreate many resources unnecessarily.

## Example prompts

- "Refactor duplicated resources into a service factory."
- "Create a resource factory for airport detail by id."

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

