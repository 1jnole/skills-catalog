---
name: angular21-defer-hydrate-triggers
description: Use when choosing @defer hydration triggers (viewport/interaction/idle) and avoiding UX pitfalls (focus/CLS).
metadata:
  short-description: Defer Hydrate Triggers
---
## Goal

Pick the best `hydrate on ...` strategy for deferred UI (viewport/interaction/idle).

## When to use

- SSR + hydration where optional UI should hydrate only when used.

## When NOT to use

- If everything must be interactive immediately (avoid deferring hydration).

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Workflow

1) Classify critical vs non-critical UI.
2) Below-the-fold: hydrate on viewport.
3) Optional panels: hydrate on interaction.
4) Background widgets: hydrate on idle.
5) Ensure placeholder is keyboard-safe and no CLS.

## Copy/paste templates

```html
@defer (hydrate on interaction) {
  <app-filters />
} @placeholder {
  <button type="button">Open filters</button>
}
```

## Common pitfalls

- Don’t defer interactive targets that must receive focus.
- Don’t introduce double loading states.

## Example prompts

- "Choose hydrate triggers for these sections and implement them."
- "Convert this to hydrate on viewport with a skeleton placeholder."
