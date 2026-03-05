# Pitfalls

## X-01 — Optimistic typing: annotate `Promise<T>` without runtime validation (anti-example)
Kind: pitfall

This looks typed, but is still unsafe because the payload is `any`.

```ts
type Task = { id: number; title: string };

async function getTask(id: number): Promise<Task> {
  const res = await fetch(`/tasks/${id}`);
  // 🚨 response.json() is `any` — this does not prove the shape.
  return res.json();
}
```

Fix: validate at the boundary (see `P-01` / `P-02`).

---

## X-02 — Redundant parsing: validate the same object multiple times
Kind: pitfall

If data is validated at the boundary and you trust it hasn't changed, do not re-parse it in every layer.

Anti-example:

```ts
const task = TaskSchema.parse(payload);

// 🚨 later...
const again = TaskSchema.parse(task);
```

Fix: validate once at the boundary, then rely on TypeScript.

---

## X-03 — Recreating schemas repeatedly (hot paths / loops)
Kind: pitfall

Anti-example:

```ts
for (const row of rows) {
  // 🚨 schema created repeatedly
  const RowSchema = z.object({ id: z.number() });
  RowSchema.parse(row);
}
```

Fix: define schemas once (module scope) and reuse; validate arrays in one pass (see `P-04`).

---

## X-04 — Surprising object behavior: unknown keys stripped by default
Kind: pitfall

By default, object schemas strip unknown properties. That may be fine, but it can surprise you if you expect the raw payload.

Guidance:
- If you need to keep unknown keys: use `.passthrough()`.
- If you want to fail on unknown keys: use `.strict()`.

(See best-practices notes for trade-offs.)
