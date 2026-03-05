---
name: "js-async-event-loop-mental-model"
description: "Diagnose JavaScript async execution ordering using the call stack + microtask queue (Promise reactions) + task/callback queue (e.g. timers) + event loop rules. Use when logs/order-of-execution is surprising, Promises and timers interleave, or UI updates occur earlier/later than expected. Don't use for concurrency policy design (rate limiting, worker pools) or when the issue is purely business logic without async."
---

# JS Async Event Loop Mental Model

## Procedures

Step 1: Identify async sources and classify queues
1) Scan the snippet/change for async sources: `Promise`/`then`/`catch`/`finally`, `async/await`, timers, DOM events, IO, `fetch`/network.
2) Classify each delayed callback:
   - **Microtask queue**: Promise reactions (`then/catch/finally`) and `await` continuations.
   - **Task/callback queue**: timer callbacks (e.g. `setTimeout`), event callbacks, completion callbacks from host APIs.
3) Read `references/catalog.md` for the authoritative rules and triggers.

Step 2: Simulate execution (predict ordering)
1) Execute all synchronous code first (until the call stack is empty).
2) Drain **microtasks** to completion (process all queued Promise reactions).
3) Run **one** task from the task/callback queue, then repeat (microtasks again, then next task).
4) Use `references/patterns.md` for canonical scenarios (Promises vs timers, blocking code, chaining).

Step 3: Propose a minimal-diff fix
1) If ordering is wrong because work is not awaited, make the await explicit (or return the Promise).
2) If errors can be dropped, ensure the Promise chain has a rejection handler (`catch`) or is awaited inside `try/catch`.
3) If a timer is used only to “defer”, consider whether the logic should be a microtask (`queueMicrotask`) or an awaited Promise (only if present in the codebase; do not add deps).
4) Read `references/pitfalls.md` to avoid common mis-fixes.

Step 4: Produce the output
1) Use `assets/output.template.md` as the response skeleton.
2) Include:
   - The predicted order of execution (or log ordering).
   - The event loop rule that explains it (microtasks before tasks).
   - A minimal-diff code change proposal.

## Error handling / stop conditions
- If the runtime is unclear (browser vs Node) and the fix depends on host APIs, stop and ask for the target runtime; otherwise, stick to the general model (stack + microtask + task).
- If the issue involves performance profiling or long tasks, do not guess; recommend measuring and keep changes minimal.
