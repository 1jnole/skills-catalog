---
name: angular21-rxjs-concurrency-operator-choice
description: Use when selecting RxJS mapping operators (switchMap/exhaustMap/concatMap/mergeMap) for correct UX under concurrency.
metadata:
  short-description: Rxjs Concurrency Operator Choice
---
## Goal

Pick correct RxJS mapping operator based on UX (cancel/ignore/queue/parallel).

## When to use

- Typeahead/search: cancel previous (`switchMap`).
- Submit: ignore while running (`exhaustMap`).
- Queue: ordered (`concatMap`).
- Parallel: allow overlap (`mergeMap`).

## When NOT to use

- When resources/signals can solve it without RxJS.

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Workflow

1) Define expected behavior under rapid repeats.
2) Choose operator.
3) Add error handling and finalize UI state.
4) Test concurrency behavior.

## Copy/paste templates

```ts
click$.pipe(exhaustMap(() => save$()))
```

## Common pitfalls

- Defaulting to mergeMap causes races.
- Missing cancellation leads to stale UI.

## Example prompts

- "Refactor this typeahead to switchMap."
- "Refactor this submit handler to exhaustMap."
