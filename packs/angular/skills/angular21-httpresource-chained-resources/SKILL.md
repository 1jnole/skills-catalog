---
name: angular21-httpresource-chained-resources
description: Use when chaining resources (B depends on A) safely, guarding inputs and keeping states clear.
metadata:
  short-description: Httpresource Chained Resources
---
## Goal

Chain resources safely (B depends on A) without firing invalid requests.

## When to use

- Detail depends on selection/list.
- Resource URL depends on another resource value.

## When NOT to use

- Single request can return everything (prefer simpler).

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


## Workflow

1) Create resource A.
2) Derive B input from A via computed.
3) Guard B URL until input exists.
4) Render states for A and B explicitly or via combined VM.

## Copy/paste templates

```ts
// Pseudocode: url for B returns null until selection exists
```

## Common pitfalls

- Without guards, B will spam requests.
- Don’t conflate loading states unless intentional.

## Example prompts

- "Chain airports list → selected airport detail safely."
- "Prevent B from firing until A has value."

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

