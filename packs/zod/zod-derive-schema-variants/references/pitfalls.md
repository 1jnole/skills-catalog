# Pitfalls

## X-01 — Copy/paste schemas drift (anti-example)
Kind: pitfall

Copy/paste variants diverge over time and create "validation drift".

```ts
// 🚨 Avoid: duplicated schemas that will drift
const UserCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

const UserUpdateSchema = z.object({
  name: z.string().min(1), // duplicated rules
  email: z.string().email(),
}).partial();
```

Prefer deriving from a single base schema (see `P-01`).

## X-02 — PATCH schema allows immutable fields (anti-example)
Kind: pitfall

Using `.partial()` without `.omit(...)` can accidentally allow updates to immutable keys.

```ts
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

// 🚨 Allows `id` to be present (and possibly updated)
const BadUpdateUserSchema = UserSchema.partial();

// ✅ Omit immutable keys
const UpdateUserSchema = UserSchema.partial().omit({ id: true });
```

## X-03 — Deriving variants in the wrong layer (anti-example)
Kind: pitfall

Avoid deriving/validating variants deep inside UI/presentation code.

```ts
// 🚨 Avoid: creating a special schema inside a UI component just for rendering
// Prefer to derive in the schema module / boundary layer and pass typed data down.
```

## X-04 — Circular schema imports / module cycles
Kind: pitfall

If schemas in different files import each other, you'll hit circular dependencies.

Mitigations:
- Co-locate base schema + variants in a single module.
- Extract shared atomic schemas (e.g. Address) into a neutral module and compose.
- If the structure is recursive, consider `z.lazy` in the schema definition.
