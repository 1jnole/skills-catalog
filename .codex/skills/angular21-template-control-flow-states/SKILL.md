---
name: angular21-template-control-flow-states
description: Use when rendering UI states with modern control flow (@if/@for/@switch) with stable tracking and readable templates.
metadata:
  short-description: Template Control Flow States
---
## Goal

Render UI states with modern control flow (`@if/@for/@switch`) and stable `track`.

## When to use

- Lists with loading/error/empty/value.
- Refactoring complex templates for readability.

## When NOT to use

- Repo has not adopted modern control flow yet and you can’t migrate now.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Workflow

1) Create a computed VM.
2) Use `@if` for loading/error/empty.
3) Use `@for` with stable `track`.
4) Avoid method calls in templates.
5) Keep templates declarative.

## Copy/paste templates

```html
@if (vm.loading) {
  <p>Loading…</p>
} @else if (vm.error) {
  <p>Error</p>
} @else {
  @for (item of vm.items; track item.id) {
    <app-card [item]="item" />
  }
}
```

## Common pitfalls

- Unstable track causes re-render churn.
- Keep logic out of templates; use computed VM.

## Example prompts

- "Refactor this template to @if/@for with proper UI states."
- "Add stable track and empty state to this list."
