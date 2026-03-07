---
name: react-testing-component-contract
description: "Writes type-safe tests for React components in TypeScript: use a custom render with Providers, prefer type-safe Testing Library queries and user events, and handle async behavior predictably. Use when adding/refactoring shared components/hooks, fixing regressions, or validating that runtime behavior matches the component contract. Don't use to redesign the entire test stack unless explicitly requested."
---

# react-testing-component-contract

Test the runtime contract of components while keeping tests type-safe and maintainable.

## Procedures

Step 1: Choose the test surface
- Validate observable behavior: render output, interactions, async transitions.

Step 2: Use typed test utilities
- Use (or create) a custom render wrapper with Providers.

Step 3: Prefer type-safe queries + user events
- `getByRole`, `findBy...`, `userEvent`.

Step 4: Handle async explicitly
- `findBy...` / `waitFor`.

Step 5: Keep mocking minimal and typed
- Mock boundaries only when needed.

## Artifacts
- Tests validating behavior + typed `test-utils` when needed.

## Acceptance criteria
- Tests assert user-visible behavior.
- Queries and fixtures are typed (no `any`).
- Async waits are explicit.

## Just-in-time references
- Routing: `references/catalog.md`
- Patterns: `references/patterns.md`
- Pitfalls: `references/pitfalls.md`
