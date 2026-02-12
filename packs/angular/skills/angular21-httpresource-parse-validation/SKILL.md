---
name: angular21-httpresource-parse-validation
description: Use when adding parse validation/transform to httpResource to keep consumers typed and safe.
metadata:
  short-description: Httpresource Parse Validation
---
## Goal

Add parse validation/transform to httpResource so consumers stay typed and safe.

## When to use

- Backend responses need mapping/validation.
- You want fail-fast on unexpected shapes.

## When NOT to use

- Trusted data where mapping adds no value.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


## Workflow

1) Define expected output type.
2) Implement `parse` to validate/transform.
3) Keep mapping in data-access.
4) Surface parse errors as resource errors.

## Copy/paste templates

```ts
// Pseudocode
// httpResource(() => url, { parse: (v) => schema.parse(v) })
```

## Common pitfalls

- Don’t scatter mapping across components.
- Keep parse deterministic.

## Example prompts

- "Add parse validation to this httpResource."
- "Transform DTOs into domain types in parse()."

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

