# Catalog — Async ordering diagnosis

## Use when (routing triggers)
- Log ordering is surprising or “out of order”.
- Promises (`then/await`) and timers/events interact.
- UI updates feel “early/late” relative to async work.

## Don't use when
- You are designing concurrency policy (rate limiting, worker pools, queues) — out of scope.
- The issue is purely synchronous business logic.

## Core rules (Hard Parts v3)
- Delayed **Promise reactions** are held in a **microtask queue**.
- Delayed timer/event callbacks are held in a **task/callback queue**.
- A delayed function is added to the call stack (i.e., runs) when:
  - the call stack is empty, and
  - all global (top-level) code has run,
  - and the event loop checks those conditions.
- **Prioritize microtasks over tasks**.

## What to output
- Predicted execution order (or predicted log ordering).
- Explanation in 3–6 bullet points using the model.
- Minimal-diff fix (explicit `await`/return, add rejection handling, remove accidental fire-and-forget).

## Sources
- Slides: p.99 (topic overview), p.118 (execution rules), p.120 (why it matters).
- Transcripts: lessons around async overview, callback queue, event loop, promises, microtask queue (e.g., 29–39 in your set).
