---
name: angular21-testing-strategy
description: Use when defining Angular 21+ testing strategy across component scenarios, DI overrides, HttpClient behavior, and deterministic @defer testing.
metadata:
  short-description: Angular21 Testing Strategy
---
## Goal

Create high-value, maintainable tests by combining:
- component/integration scenarios focused on user-observable behavior
- scoped DI/provider/token overrides
- deterministic HttpClient request assertions
- deterministic `@defer` trigger/state testing (without timing sleeps)

## When to use

- Designing or refactoring tests for UI state, interactions, and data flows.
- Validating provider/token wiring in test modules.
- Guarding API client/interceptor behavior (method/url/headers/success/error).
- Preventing regressions in deferred rendering behavior.

## When NOT to use

- Pure algorithm/domain logic that should stay as small unit tests.
- Cosmetic-only deferred UI where additional test complexity has low value.

## Inputs

- What feature/component/service you are working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.

## Workflow

1) Select the highest-value test level first (component/integration before over-mocking internals).
2) Render real templates and assert user-observable behavior (loading/error/empty/value, interactions, a11y basics).
3) Override providers/tokens locally in tests; prefer overriding base tokens when derived tokens depend on them.
4) For HttpClient flows, assert method/url/headers and flush success/error paths deterministically.
5) For `@defer`, assert placeholder first, trigger deterministically (interaction/viewport simulation), then assert deferred/error states.
6) Keep tests readable (AAA) and avoid global mutable test state.

## Copy/paste templates

```md
Test checklist:
- behavior-focused component rendering assertions
- local provider/token overrides only
- HttpClient request expectations + flush
- defer placeholder -> trigger -> content/error path
```

## Common pitfalls

- Over-mocking component dependencies and testing implementation details.
- Forgetting to flush/verify pending HttpClient requests.
- Using sleeps/timeouts for deferred UI tests (flaky).
- Applying token overrides at the wrong scope.

## Example prompts

- "Write a behavior-first component test for loading/empty/error/value states."
- "Override API tokens in this test and verify derived config behavior."
- "Add deterministic HttpClient tests for this interceptor/service."
- "Test this @defer block without timing-based flakiness."

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs -> ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" -> stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) -> request the minimum needed artifacts.
