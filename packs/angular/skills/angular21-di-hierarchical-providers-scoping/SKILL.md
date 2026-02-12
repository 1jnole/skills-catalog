---
name: angular21-di-hierarchical-providers-scoping
description: Use when scoping providers/services intentionally (root/route/component) to isolate state and control lifetime (sandboxing).
metadata:
  short-description: Di Hierarchical Providers Scoping
---
## Goal

Choose provider scope (root vs route vs component) to control lifetime and isolate state.

## When to use

- Per-route isolation (e.g., wizard flow).
- Per-component sandboxing (multiple instances).
- Avoid unintended singleton state sharing.

## When NOT to use

- Shared caches/auth sessions that must be singleton.
- When scoping would break cross-feature expectations.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


## Workflow

1) Decide lifetime and ownership.
2) Provide at the correct level (app/route/component).
3) Ensure dependencies match the scope.
4) Add a short comment documenting the choice.
5) Test multiple instances if relevant.

## Copy/paste templates

```ts
// Component-scoped sandboxing
@Component({
  standalone: true,
  providers: [FeatureStore],
  templateUrl: './widget.html',
})
export class Widget {}
```

## Common pitfalls

- Component providers create new instances; beware duplicate caches.
- Prefer route-level for flows; component-level for widgets.

## Example prompts

- "Scope this store per component so two widgets do not share state."
- "Move this provider from root to route providers."

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

