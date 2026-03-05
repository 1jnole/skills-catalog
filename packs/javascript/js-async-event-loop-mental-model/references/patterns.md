# Patterns — Async ordering

## Pattern: “Simulate the event loop”
1) Run sync code until the stack is empty.
2) Drain microtasks (Promise reactions) to completion.
3) Run one task (timer/event callback).
4) Repeat: microtasks first, then next task.

### Example sketch
```js
console.log("A");

setTimeout(() => console.log("T"), 0);

Promise.resolve().then(() => console.log("P"));

console.log("B");
```

**Prediction**: A, B, P, T  
Reason: Promise reaction is a microtask and runs before timer tasks once the stack is empty.

## Pattern: “Make async dependencies explicit”
- If downstream code depends on a Promise, `await` it (or return the Promise).
- If you create a Promise chain, ensure it has a rejection path.

## Pattern: “Avoid accidental fire-and-forget”
- If you intentionally do not await, document intent and handle errors.
- Otherwise, prefer awaiting or returning the Promise to keep control flow explicit.
