# Pitfalls — Async ordering

- **Myth**: `setTimeout(fn, 0)` runs immediately.  
  Reality: it's queued as a task and only runs after the stack is empty and microtasks are drained.

- **Myth**: `.then(cb)` executes `cb` right away.  
  Reality: Promise reactions are scheduled (microtasks) and run after current sync work finishes.

- **Silent rejections**: creating Promises without `catch` or without awaiting can drop errors.

- **Over-fixing**: adding extra timers to “force order” often makes the bug worse. Prefer explicit awaits/returns.

- **Runtime-specific assumptions**: do not assume browser-only APIs if the runtime is unknown.
