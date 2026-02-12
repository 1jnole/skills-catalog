---
name: angular21-defer-blocks-triggers-and-states
description: Use when adding @defer blocks with placeholder/loading/error states and choosing the right trigger (viewport/interaction/idle) for UX.
metadata:
  short-description: Defer Blocks Triggers And States
---
## Goal

Lazy-render expensive UI with `@defer`, using placeholder/loading/error blocks and a sensible trigger.

## When to use

- Below-the-fold heavy UI.
- Optional panels (filters/details).
- Pair with SSR/hydration strategies later.

## When NOT to use

- Critical above-the-fold content.
- SEO-critical sections where deferring is harmful.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


## Workflow

1) Wrap the expensive subtree in `@defer`.
2) Choose trigger: viewport/interaction/idle.
3) Add `@placeholder` that matches final layout.
4) Add `@loading` (often same skeleton).
5) Add `@error` with a recovery path.
6) Check focus order and avoid CLS.

## Copy/paste templates

```html
@defer (on viewport) {
  <app-heavy-section />
} @placeholder {
  <app-heavy-section-skeleton />
} @loading {
  <app-heavy-section-skeleton />
} @error {
  <p class="error">Failed to load.</p>
}
```

## Common pitfalls

- Placeholder mismatch causes layout shift.
- Don’t defer focus targets or required form controls.

## Example prompts

- "Wrap this section in @defer with placeholder/loading/error and choose the right trigger."
- "Defer this panel on interaction and keep keyboard navigation correct."

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

