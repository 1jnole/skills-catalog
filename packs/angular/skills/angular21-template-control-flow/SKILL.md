---
name: angular21-template-control-flow
description: Use when rendering Angular 21+ UI states with modern template control flow (`@if/@for/@switch`) and stable tracking.
metadata:
  short-description: Angular21 Template Control Flow
---
## Goal

Render clear UI states with modern template control flow while keeping templates declarative and stable.

## When to use

- Building loading/error/empty/value views.
- Refactoring nested templates to `@if`, `@for`, and `@switch`.
- Stabilizing list rendering with proper `track`.

## When NOT to use

- The repo has not adopted modern control flow and migration is out of scope.
- The change is purely styling and does not alter rendering logic.

## Inputs

- What feature/component/service you are working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.

## Workflow

1) Create a computed view-model for template state.
2) Use `@if` / `@else if` / `@else` for loading, error, empty, and value branches.
3) Use `@for` with stable `track` keys.
4) Use `@switch` for finite UI modes where it improves readability.
5) Keep expensive logic out of the template; move to computed state.

## Copy/paste templates

```html
@if (vm.loading) {
  <p>Loading...</p>
} @else if (vm.error) {
  <p>Error</p>
} @else if (vm.items.length === 0) {
  <p>Empty</p>
} @else {
  @for (item of vm.items; track item.id) {
    <app-card [item]="item" />
  }
}
```

## Common pitfalls

- Unstable `track` expressions causing churn and DOM resets.
- Calling methods directly in template bindings.
- Hiding state transitions in nested `ng-template` structures when `@if/@switch` is clearer.

## Example prompts

- "Refactor this template to `@if/@for` with explicit UI states."
- "Add stable track keys and an empty state branch."
- "Use `@switch` for these mode-based sections."

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs -> ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" -> stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) -> request the minimum needed artifacts.
