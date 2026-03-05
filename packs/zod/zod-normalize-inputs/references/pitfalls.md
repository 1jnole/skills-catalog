# Pitfalls

## X-01 — Treating query/path params as typed values without normalization
Kind: pitfall

Query/path params arrive as strings. Using them as numbers/booleans without coercion leads to silent logic bugs.

Anti-example:

```ts
// req.params.id is a string
const id: number = req.params.id as unknown as number; // 🚨
```

Use `P-01` instead.

---

## X-02 — Making optional query params required (breaking filters)
Kind: pitfall

Search params are often optional. A required schema will reject requests without that filter.

Anti-example:

```ts
const TaskQuerySchema = z.object({
  completed: z.coerce.boolean(), // 🚨 required
});
```

Prefer `.optional()` or `.partial()` (see `P-01`).

---

## X-03 — Duplicating normalization across layers
Kind: pitfall

Normalizing in the router *and* in domain services creates drift and duplicated work.

Anti-example:

- Router: coerce `id` to number
- Service: coerce `id` again
- UI: coerce `id` again

Normalize once at the boundary, then rely on the normalized type.

---

## X-04 — Keeping parallel TS interfaces (type drift)
Kind: pitfall

Avoid maintaining both:
- a Zod schema, and
- a handwritten TS interface for the same shape

Use `z.infer` so the schema is the single source of truth.
