---
name: angular21-routing-functional-resolvers
description: Use when implementing functional resolvers for route preloading and deciding when to prefer progressive loading instead.
metadata:
  short-description: Routing Functional Resolvers
---
## Goal

Use functional resolvers when route preloading is truly needed; otherwise prefer progressive loading.

## When to use

- Deep links need data before render.
- SSR routing where resolved data is beneficial.

## When NOT to use

- Most pages that can progressively load with resources/stores.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


## Workflow

1) Decide if preloading is necessary.
2) Implement resolver with inject().
3) Handle missing params and errors.
4) Read resolved data in component.
5) Keep resolver small; push mapping to data-access.

## Copy/paste templates

```ts
// Pseudocode: resolve = (route) => inject(Api).getById(route.paramMap.get('id')!)
```

## Common pitfalls

- Overusing resolvers can slow navigation.
- Define UX for resolver failure explicitly.

## Example prompts

- "Add a functional resolver for airport detail by id."
- "Remove this resolver and load data progressively instead."

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

