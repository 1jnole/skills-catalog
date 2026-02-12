---
name: angular21-data-httpresource
description: Use when implementing Angular 21+ data fetching with httpResource (basics, chained resources, factory services, and parse validation).
metadata:
  short-description: Angular21 Data Httpresource
---
## Goal

Implement robust `httpResource` data flows with clear states, safe request guards, reusable factories, and typed parse transforms.

## When to use

- List/detail fetching with signal-driven inputs.
- Chained resources where B depends on A.
- Shared resource patterns that should live in a service factory.
- Validation/transform needs via `parse`.

## When NOT to use

- Mutation-heavy workflows where RxJS orchestration is the primary concern.
- Extremely simple one-off fetches where a factory/parsing layer adds no value.

## Inputs

- What feature/component/service you are working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.

## Workflow

1) Identify key input signals (id/query/filters) and guard invalid values.
2) Build base `httpResource` requests that return `null` URL when inputs are incomplete.
3) For dependent resources, derive B input from A with `computed()` and guard B URL.
4) If behavior is reused, move URL + parse mapping to a service factory function.
5) Add deterministic `parse` validation/transform near data-access boundaries.
6) Expose a computed VM with loading/error/empty/value states for templates.

## Copy/paste templates

```ts
// Pseudocode
// const detail = httpResource(() => id() ? `/api/items/${id()}` : null, { parse });
// const related = httpResource(() => detail.value()?.groupId ? `/api/groups/${detail.value()!.groupId}` : null);
```

## Common pitfalls

- Missing guards that trigger invalid or repeated requests.
- Spreading parse/mapping logic across components instead of centralizing.
- Mixing loading states from A/B resources without explicit intent.
- Using `effect()` to trigger fetches that should be modeled as resources.

## Example prompts

- "Create a guarded `httpResource` for list + detail states."
- "Chain resource B from resource A without premature requests."
- "Extract duplicated resource setup into a service factory with parse."

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs -> ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" -> stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) -> request the minimum needed artifacts.
