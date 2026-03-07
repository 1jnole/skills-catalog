---
name: react-forms-events-playbook
description: "Provides a repeatable playbook for typing React DOM/Synthetic events and building form handlers safely (including number inputs), using currentTarget-based narrowing, explicit coercion, and predictable state updates. Use when implementing/refactoring input/textarea/select handlers, form submit flows, or reusable form components in React+TypeScript. Don't use to redesign a form architecture that is already abstracted by a form library unless explicitly requested."
---

# react-forms-events-playbook

Type React events correctly, avoid `any`, and keep form state predictable.

## Procedures

Step 1: Identify the event surface
1) Locate where events are handled.
2) Classify: change, submit, keyboard/mouse/pointer.
3) Note constraints: controlled vs uncontrolled, numbers/dates, multi-field state.

Step 2: Choose the right event type and avoid `target` ambiguity
1) Prefer `event.currentTarget` over `event.target`.
2) Use the React event type that matches the element.
3) Type handler props as exact handler signatures.

Step 3: Normalize values at the edge
1) Convert strings into intended types immediately, or keep raw and coerce at submit.
2) For numeric inputs, define the empty/invalid policy explicitly.
3) Never rely on implicit coercion.

Step 4: Deterministic state updates
1) Use functional updates when needed.
2) Keep derived values derived.

Step 5: Keep parsing/side effects out of render
1) Parse/validate in handlers or submit functions.
2) For async submits, do not use stale event objects after `await`.

## Artifacts
- Correctly typed handlers.
- Explicit coercion/normalization helpers.

## Acceptance criteria
- No `any`-typed event handlers in affected code paths.
- Handlers use `currentTarget` safely.
- Coercion rules are explicit.
- No render-time parsing/validation.

## Error handling and stop conditions
- If coercion rules are unclear, stop and ask for expected behavior.

## Just-in-time references
- Routing: `references/catalog.md`
- Patterns: `references/patterns.md`
- Pitfalls: `references/pitfalls.md`
