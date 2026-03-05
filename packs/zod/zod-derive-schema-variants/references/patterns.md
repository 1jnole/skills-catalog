# Patterns

## P-01 — Create vs Update variants from a base schema
Kind: pattern

Use a base schema and derive create/update variants instead of redefining rules.

```ts
import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
});

// Create input: server owns id/completed
export const NewTaskSchema = TaskSchema.omit({ id: true, completed: true });

// Update input: allow partial updates; server still owns id
export const UpdateTaskSchema = TaskSchema.partial().omit({ id: true });

export type Task = z.infer<typeof TaskSchema>;
export type NewTaskInput = z.infer<typeof NewTaskSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;
```

## P-02 — PATCH schema (partial + omit immutable keys)
Kind: pattern

For PATCH-style inputs, `.partial()` makes fields optional and `.omit(...)` prevents updating immutable keys.

```ts
import { z } from "zod";

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["user", "admin"]),
});

// PATCH: fields optional, but do not allow id updates
const UpdateUserSchema = UserSchema.partial().omit({ id: true });

type UpdateUser = z.infer<typeof UpdateUserSchema>;
```

## P-03 — Public / redacted view via omit
Kind: pattern

Create “safe to return” versions by omitting sensitive fields.

```ts
import { z } from "zod";

const FullUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
});

const PublicUserSchema = FullUserSchema.omit({ email: true });

type PublicUser = z.infer<typeof PublicUserSchema>;
```

## P-04 — Subset schemas via pick (params/query, focused payloads)
Kind: pattern

Derive narrow schemas from a larger base schema.

```ts
import { z } from "zod";

const TaskSchema = z.object({
  id: z.coerce.number().int(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.coerce.boolean(),
});

// Params: only id
const TaskParamsSchema = TaskSchema.pick({ id: true });

// Query: only completed, optional
const TaskQuerySchema = TaskSchema.pick({ completed: true }).partial();

type TaskParams = z.infer<typeof TaskParamsSchema>;
type TaskQuery = z.infer<typeof TaskQuerySchema>;
```

## P-05 — Working backwards from existing TS types (`satisfies`)
Kind: pattern

When a legacy TypeScript type already exists, use `satisfies` to ensure the schema matches it.

```ts
import { z } from "zod";

type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
}) satisfies z.ZodType<Task>;

type TaskFromSchema = z.infer<typeof TaskSchema>;
```
