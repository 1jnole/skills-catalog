---
name: angular21-rxjs-interop-concurrency
description: Use when applying Angular 21+ RxJS patterns for concurrency semantics and lifecycle-safe interop with takeUntilDestroyed.
metadata:
  short-description: Angular21 Rxjs Interop Concurrency
---
## Goal

Build RxJS flows that are both behavior-correct under concurrency and safe across Angular lifecycles by combining:
- operator intent (`switchMap` / `exhaustMap` / `concatMap` / `mergeMap`)
- lifecycle binding with `takeUntilDestroyed`

## When to use

- User actions can fire repeatedly and need clear cancel/ignore/queue/parallel behavior.
- Manual subscriptions are required (router events, bridge to signals).
- You need deterministic concurrency behavior under rapid interactions.

## When NOT to use

- A resource/signal-first solution can express the flow without manual subscriptions.
- The use case is synchronous and does not require stream orchestration.

## Inputs

- What feature/component/service you are working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.

## Workflow

1) Define UX semantics under repeated triggers (cancel, ignore, queue, or parallel).
2) Choose mapping operator accordingly (`switchMap`, `exhaustMap`, `concatMap`, `mergeMap`).
3) Keep pipeline readable with explicit error handling and finalization.
4) Bind subscription lifetime with `takeUntilDestroyed` (inject `DestroyRef` when needed).
5) Keep side effects minimal and prefer bridging stream outputs into signals/state.
6) Test rapid-trigger behavior to confirm concurrency semantics.

## Copy/paste templates

```ts
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const destroyRef = inject(DestroyRef);
submit$.pipe(exhaustMap(() => save$()), takeUntilDestroyed(destroyRef)).subscribe();
```

## Common pitfalls

- Defaulting to `mergeMap` and introducing races accidentally.
- Missing cancellation in typeahead-like flows.
- Nested subscriptions instead of composing operators.
- Forgetting lifecycle teardown in long-lived components/services.

## Example prompts

- "Choose the right operator for this repeated action flow and explain why."
- "Refactor this subscription chain to use takeUntilDestroyed safely."
- "Bridge this observable workflow into signal state without leaks."

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs -> ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" -> stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) -> request the minimum needed artifacts.
