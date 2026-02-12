---
name: angular21-testing-httpclient
description: Use when testing HttpClient requests/interceptors deterministically (request method/url/headers + success/error).
metadata:
  short-description: Testing Httpclient
---
## Goal

Test HttpClient calls deterministically (method/url/headers + success/error).

## When to use

- API clients and interceptors.
- Regression tests for headers/auth.

## When NOT to use

- When covered by higher-level tests and unit test adds little value.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


## Workflow

1) Setup Http testing providers.
2) Call API method.
3) Expect request; assert headers.
4) Flush success/error.
5) Assert state transitions.

## Copy/paste templates

```ts
// Pseudocode: controller.expectOne(url).flush(data)
```

## Common pitfalls

- Ensure all requests are flushed.
- Don’t hardcode URLs; inject tokens.

## Example prompts

- "Test this interceptor adds X-Api-Key header."
- "Write tests for AirportsApi requests."

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

