# Patterns

## P-01 — Query/path params normalization (coerce + optional/partial)
Kind: pattern

Use Zod coercion for route/query params because they arrive as strings.

```ts
import { z } from "zod";

// Path params (e.g. /tasks/:id)
export const TaskParamsSchema = z.object({
  id: z.coerce.number().int(),
});

// Query params (e.g. ?completed=true)
export const TaskQuerySchema = z.object({
  completed: z.coerce.boolean().optional(),
});

// Usage (Express example shown in course, same idea applies elsewhere)
const params = TaskParamsSchema.parse(req.params);
const query = TaskQuerySchema.parse(req.query);
```

Notes:
- For filters/search params, `.optional()` or `.partial()` prevents failing when the param is absent.

---

## P-02 — Form validation + normalization with `zodResolver`
Kind: pattern

Normalize and validate form values using Zod schemas integrated with React Hook Form.

```ts
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  username: z.string().min(1),
  age: z.coerce.number().int().positive(),
});

type FormData = z.infer<typeof FormSchema>;

export function SignUpForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: FormData) => {
    // `age` is a number here (normalized)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <input {...register("age")} />
      <button type="submit">Sign Up</button>
      {/* map `errors` to UI */}
    </form>
  );
}
```

---

## P-03 — DB row decoding (stringly / 1|0 booleans)
Kind: pattern

Decode data coming from DB drivers where fields may be loosely typed (e.g. `1`/`0` for booleans).

```ts
import { z } from "zod";

export const TaskRowSchema = z.object({
  id: z.coerce.number().int(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.coerce.boolean(), // input may be 1/0
});

export type TaskRow = z.infer<typeof TaskRowSchema>;

// Example: decode the row right after fetching it
const row = await getTaskFromDb(id);
const task: TaskRow = TaskRowSchema.parse(row);
```

---

## P-04 — Transform a validated `string` into `Date`
Kind: pattern

Validate first, then transform into a specialized runtime type.

```ts
import { z } from "zod";

export const DateFromStringSchema = z
  .string()
  .refine((val) => !Number.isNaN(new Date(val).valueOf()), {
    message: "Invalid date string",
  })
  .transform((val) => new Date(val));

const date: Date = DateFromStringSchema.parse("2025-03-20");
```

---

## P-05 — Refine for constraints beyond primitives
Kind: pattern

Use `.refine` / `.superRefine` when the constraint is not captured by basic Zod primitives.

```ts
import { z } from "zod";

export const PasswordSchema = z
  .string()
  .min(12)
  .refine((val) => /[A-Z]/.test(val), { message: "Must include uppercase" })
  .refine((val) => /[0-9]/.test(val), { message: "Must include a number" });
```
