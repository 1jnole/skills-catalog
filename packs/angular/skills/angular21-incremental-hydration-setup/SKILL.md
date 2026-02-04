---
name: angular21-incremental-hydration-setup
description: Use when enabling incremental hydration for SSR apps and combining it with @defer for faster interactivity.
metadata:
  short-description: Incremental Hydration Setup
---
## Goal

Enable incremental hydration (SSR) and combine with `@defer` for faster interactivity.

## When to use

- SSR apps with hydration enabled.
- Large pages where not everything must hydrate immediately.

## When NOT to use

- Non-SSR apps.
- Critical UI that must be interactive immediately.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


## Workflow

1) Verify SSR + client hydration setup.
2) Enable incremental hydration options in providers.
3) Combine with `@defer (hydrate on ...)` where appropriate.
4) Validate critical interaction paths.
5) Add smoke checks for hydration.

## Copy/paste templates

```ts
// Pseudocode (adapt to repo)
// provideClientHydration(withIncrementalHydration())
```

## Common pitfalls

- Hydration bugs can be subtle: change incrementally.
- Don’t defer/hydrate-critical navigation elements.

## Example prompts

- "Enable incremental hydration and show how to use it with @defer."
- "Audit what should hydrate on viewport vs immediately."

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

