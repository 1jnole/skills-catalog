---
name: angular21-signals-input-output-model
description: Use when building/refactoring components to Angular’s signals-based model using input(), output(), and model().
metadata:
  short-description: Signals Input Output Model
---
## Goal

Use signals-based component APIs: input(), output(), model() with computed VM.

## When to use

- Components with reactive inputs.
- Two-way boundaries via model().

## When NOT to use

- Repo convention is classic @Input/@Output and you’re not changing patterns now.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


## Workflow

1) Identify external inputs vs internal state.
2) Use `input()` for external.
3) Use `model()` for two-way.
4) Use `computed()` for VM.
5) Keep outputs event-like.

## Copy/paste templates

```ts
import { input, model, computed } from '@angular/core';

readonly title = input<string>('');
readonly query = model<string>('');
readonly vm = computed(() => ({ title: this.title(), query: this.query() }));
```

## Common pitfalls

- Don’t duplicate input into writable state without reason.
- Avoid emitting huge state on every keystroke unless intended.

## Example prompts

- "Convert this component to input()/model() and computed VM."
- "Create a two-way search input using model()."

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

