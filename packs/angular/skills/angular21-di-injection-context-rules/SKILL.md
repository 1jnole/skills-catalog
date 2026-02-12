---
name: angular21-di-injection-context-rules
description: Use when fixing or avoiding inject() usage outside a valid injection context (functional APIs, token factories, constructors).
metadata:
  short-description: Di Injection Context Rules
---
## Goal

Fix or prevent `inject()` context errors by moving inject() to valid contexts.

## When to use

- When you see errors like 'inject() must be called from an injection context'.
- When using functional APIs (guards/resolvers/token factories).

## When NOT to use

- When constructor injection is simpler and already consistent.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


## Workflow

1) Identify where `inject()` is called.
2) Ensure it runs in: constructor, provider factory, token factory, functional guard/resolver.
3) If called inside plain helpers, refactor to pass dependencies as args.
4) Avoid calling `inject()` inside callbacks invoked later (timers/events).

## Copy/paste templates

```ts
// Valid: token factory
export const X = new InjectionToken('X', { factory: () => inject(Dep) });

// Valid: functional guard
export const guard: CanActivateFn = () => inject(Auth).isLoggedIn();
```

## Common pitfalls

- Hiding `inject()` inside utilities called outside Angular will fail.
- Keep DI near Angular entrypoints.

## Example prompts

- "Fix this inject() error by refactoring to a token factory/constructor."
- "Refactor this helper to accept dependencies instead of calling inject()."

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

