---
name: angular21-defer-hydration
description: Use when combining Angular 21+ @defer blocks, hydration triggers, and incremental hydration for better perceived performance.
metadata:
  short-description: Angular21 Defer Hydration
---
## Goal

Improve perceived performance without breaking UX by combining:
- `@defer` block states (`@placeholder`, `@loading`, `@error`)
- hydration trigger selection (`viewport`, `interaction`, `idle`)
- incremental hydration setup boundaries in SSR apps

## When to use

- SSR pages where only part of the UI must hydrate immediately.
- Heavy below-the-fold or optional UI sections.
- UX flows that benefit from deferred interactivity with explicit fallback states.

## When NOT to use

- Critical above-the-fold content that must be interactive on first paint.
- Non-SSR apps where hydration setup is irrelevant for this scope.
- SEO-critical sections where deferred rendering harms discoverability.

## Inputs

- What feature/component/service you are working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.

## Workflow

1) Classify UI as critical vs deferrable before writing template code.
2) Confirm SSR + hydration setup, then enable incremental hydration when appropriate.
3) Wrap deferrable subtrees in `@defer` and always provide `@placeholder`, `@loading`, and `@error` branches.
4) Choose trigger by intent: `viewport` for below-the-fold, `interaction` for optional panels, `idle` for background widgets.
5) Keep placeholder layout close to final layout to avoid CLS and preserve keyboard/focus safety.
6) Validate critical interaction paths and add deterministic smoke checks for deferred/hydrated UI.

## Copy/paste templates

```html
@defer (hydrate on interaction) {
  <app-filters />
} @placeholder {
  <button type="button">Open filters</button>
} @loading {
  <app-filters-skeleton />
} @error {
  <p class="error">Failed to load filters.</p>
}
```

## Common pitfalls

- Deferring controls that must be immediately focusable.
- Placeholder mismatch causing layout shift.
- Layering multiple loading patterns and confusing users.
- Deferring hydration for navigation-critical UI.

## Example prompts

- "Choose defer/hydration triggers for these sections and justify the UX tradeoff."
- "Refactor this heavy panel to @defer with safe placeholder/loading/error states."
- "Enable incremental hydration and identify what must remain immediate."

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs -> ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" -> stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) -> request the minimum needed artifacts.
