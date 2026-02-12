---
name: angular21-rxjs-interop-take-until-destroyed
description: Use when integrating RxJS streams in Angular 21+; ensures lifecycle-safe
  subscriptions with takeUntilDestroyed.
metadata:
  short-description: Rxjs Interop Takeuntildestroyed
---
## Goal

Use takeUntilDestroyed for lifecycle-safe RxJS subscriptions.

## When to use

- Manual subscriptions to router events/streams.
- Bridging observable to signal state safely.

## When NOT to use

- When you can use resources/signals without manual subscription.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


## Workflow

1) Keep observable pipeline readable.
2) Bind lifecycle with `takeUntilDestroyed()`.
3) Keep subscription side effects minimal.
4) Prefer updating signals via `tap()`.

## Copy/paste templates

```ts
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const destroyRef = inject(DestroyRef);
source$.pipe(takeUntilDestroyed(destroyRef)).subscribe();
```

## Common pitfalls

- Don’t nest subscriptions.
- Inject DestroyRef when outside components.

## Example prompts

- "Add takeUntilDestroyed to these subscriptions."
- "Bridge this Observable into a signal safely."

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

