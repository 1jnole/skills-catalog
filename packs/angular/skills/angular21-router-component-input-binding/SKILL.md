---
name: angular21-router-component-input-binding
description: Use when binding route params/query directly to component inputs via router component input binding.
metadata:
  short-description: Router Component Input Binding
---
## Goal

Bind route params/query directly to component inputs (reduces ActivatedRoute boilerplate).

## When to use

- Components already expose stable inputs (signals input()).
- You want simpler param wiring.

## When NOT to use

- Router input binding not enabled and you can’t change router providers now.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


## Workflow

1) Enable component input binding in router providers (if allowed).
2) Add `input()` fields matching param/query names.
3) Parse types (numbers) explicitly.
4) Drive resources/store from inputs.

## Copy/paste templates

```ts
// Pseudocode: provideRouter(routes, withComponentInputBinding())
```

## Common pitfalls

- Params are strings by default; parse as needed.
- Keep component public API stable.

## Example prompts

- "Enable router input binding and bind :id to a page input()."
- "Refactor ActivatedRoute param handling to inputs."

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

