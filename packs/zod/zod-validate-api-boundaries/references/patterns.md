# Patterns

## P-01 — Validate API JSON with `.parse()` (fail-fast contract gate)
Kind: pattern

Use when:
- The response shape **must** match the expected contract.
- A mismatch indicates API drift (backend change / third-party change) and should fail loudly.

Example (client-side validation of a list endpoint):

```ts
import { TasksSchema, type Task } from 'busy-bee-schema';

export async function fetchTasks(showCompleted: boolean): Promise<Task[]> {
  const url = new URL('/tasks', API_URL);
  if (showCompleted) url.searchParams.set('completed', 'true');

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch tasks');

  // Contract gate: throws ZodError if the payload doesn't match.
  return TasksSchema.parse(await response.json());
}
```

Notes:
- This pattern intentionally "blows up" on contract mismatch.
- Pair with a top-level error boundary/logging so failures are visible and actionable.

---

## P-02 — Validate API JSON with `.safeParse()` (explicit branching)
Kind: pattern

Use when:
- Invalid data is an expected outcome and should be handled without exceptions.
- You want to map validation issues to UI or structured logs.

Example (branch on `success`):

```ts
import { z, type ZodType } from 'zod';

export async function fetchAndValidate<T>(
  input: RequestInfo | URL,
  init: RequestInit,
  schema: ZodType<T>,
): Promise<T> {
  const response = await fetch(input, init);
  if (!response.ok) throw new Error('Request failed');

  const payload: unknown = await response.json();
  const result = schema.safeParse(payload);

  if (!result.success) {
    // Handle as needed: throw, log, map to UI.
    throw result.error;
  }

  return result.data;
}
```

Notes:
- In performance-critical code, `safeParse` can be preferable to `parse` + try/catch when failures are common.

---

## P-03 — Validate outbound request payloads before `JSON.stringify`
Kind: pattern

Use when:
- Sending POST/PUT/PATCH bodies.
- You want to guarantee the client only sends a payload that satisfies your schema.

Example:

```ts
import { NewTaskSchema, type NewTask } from 'busy-bee-schema';

export async function createTask(task: NewTask): Promise<void> {
  const url = new URL('/tasks', API_URL);

  // Validate before sending.
  const body = JSON.stringify(NewTaskSchema.parse(task));

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  if (!response.ok) throw new Error('Failed to create task');
}
```

---

## P-04 — Centralize schema usage: reuse schemas, validate once, vectorize arrays
Kind: pattern

Use when:
- The same schema is used across multiple endpoints/call-sites.
- Validations occur in bulk (arrays/lists).

Rules:
- Define schemas once at module init and **reuse**.
- Validate only when necessary; avoid parsing the same object multiple times.
- Validate arrays via `z.array(itemSchema)` / list schema rather than item-by-item loops.

Example (validate an array of objects in one pass):

```ts
import { z } from 'zod';

const ItemSchema = z.object({ id: z.number(), title: z.string() });
const ItemsSchema = z.array(ItemSchema);

const items = ItemsSchema.parse(payload); // one parse, index-aware error reporting
```

---

## P-05 — Share schemas across client/server via a shared package
Kind: pattern

Use when:
- Client and server live in a monorepo or can share a versioned package.

Example import style:

```ts
import {
  TaskSchema,
  TasksSchema,
  type Task,
  type NewTask,
  NewTaskSchema,
} from 'busy-bee-schema';

export type Task = z.infer<typeof TaskSchema>; // single source of truth
```

Notes:
- Sharing schemas does not remove the need to validate; it reduces drift by reusing a single contract definition.
