---
name: angular21-effect-usage-rules
description: Use when adding/refactoring effect() usage; enforces side-effects only and replaces derivations with computed/linkedSignal.
metadata:
  short-description: Effect Usage Rules
---
## Goal

Use effect() only for side effects; avoid state derivation inside effects.

## When to use

- Sync signals to imperative APIs (document title, analytics, focus).
- Bridge signals → external side effects.

## When NOT to use

- Deriving state (use computed/linkedSignal).
- Async orchestration (prefer resources/RxJS where appropriate).

## Inputs

- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)

## Workflow

1) Identify the side effect boundary.
2) Put minimal imperative code in effect().
3) Add cleanup if needed.
4) Avoid writing to multiple signals from effect().

## Copy/paste templates

```ts
import { effect } from '@angular/core';

effect(() => {
  document.title = `Count: ${count()}`;
});
```

## Common pitfalls

- Writing signals inside effects can cause loops.
- Effects run on setup; guard if needed.

## Example prompts

- "Replace this effect-based derivation with computed()."
- "Add an effect to sync a signal to document.title safely."
