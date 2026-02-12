---
name: angular21-state-model
description: Use when modeling Angular 21+ state with signals primitives (input/output/model/computed/linkedSignal) and effect() boundaries.
metadata:
  short-description: Angular21 State Model
---
## Goal

Model Angular 21+ state without duplication by combining:
- component API primitives (`input()`, `output()`, `model()`)
- derivation primitives (`computed()`, `linkedSignal()`)
- side-effect boundary (`effect()`)

## When to use

- Building or refactoring component/service state with signals.
- Choosing between `computed()` and `linkedSignal()` for derived values.
- Replacing effect-based derivations with proper computed state.
- Defining clean input/output/model boundaries in standalone components.

## When NOT to use

- Repo must stay on legacy `@Input/@Output` patterns for this scope.
- The requested change is unrelated to state modeling decisions.

## Inputs

- What feature/component/service you are working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.

## Workflow

1) Identify the source of truth for each state field.
2) Define external boundaries with `input()`, `output()`, and `model()` only where needed.
3) Use `computed()` for read-only derivations.
4) Use `linkedSignal()` only for derived + locally editable state and document re-sync behavior.
5) Restrict `effect()` to side effects (DOM/API/analytics) with minimal imperative code and cleanup.
6) Validate that no state is duplicated without explicit reason.

## Copy/paste templates

```ts
import { input, output, model, signal, computed, linkedSignal, effect } from '@angular/core';

const items = signal<string[]>([]);
readonly title = input<string>('');
readonly changed = output<string>();
readonly query = model<string>('');

const count = computed(() => items().length);
const selected = linkedSignal(() => items()[0] ?? null);

effect(() => {
  document.title = `${title()} (${count()})`;
});
```

## Common pitfalls

- Duplicating source state into writable signals "just in case".
- Using `effect()` to derive state instead of `computed()` / `linkedSignal()`.
- Writing to many signals inside one effect and creating loops.
- Forgetting to describe how `linkedSignal()` should re-sync when upstream data changes.

## Example prompts

- "Choose computed or linkedSignal for this editable derived state."
- "Refactor effect-based derivation into a proper signal model."
- "Convert this component to input()/model()/computed VM."

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs -> ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" -> stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) -> request the minimum needed artifacts.
