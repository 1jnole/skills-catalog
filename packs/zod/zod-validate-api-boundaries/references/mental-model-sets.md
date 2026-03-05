# Mental model (sets)

- TypeScript types exist at **compile time**; external data exists at **runtime**.
- The "type gap" appears at boundaries (HTTP, DB, user input) where data crosses into typed code.
- `response.json()` yields `any` (it bypasses static safety). Treat boundary data as **untrusted** until validated.
- Zod schemas are **runtime gates**: data becomes trusted *after* it passes schema parsing.
- Prefer **validate once at the boundary**, then rely on TypeScript inside the system.
- `.parse(...)` throws on mismatch (fail fast). `.safeParse(...)` returns `{ success, data | error }` (no exceptions).

Routing rule of thumb:
- If the boundary mismatch indicates a **contract break** (API drift), failing fast is acceptable.
- If invalid data is an **expected** outcome (third-party feeds, user-edited JSON, partial/optional payloads), use `safeParse` so errors can be handled without `try/catch`.
