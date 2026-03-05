# Mental model sets

## Set A — Single source of truth
- A **base Zod schema** is the canonical contract for a data shape.
- Types come from schemas via `z.infer`, not hand-written interfaces.
- When requirements change, change the base schema **once** and let variants follow.

## Set B — Variants are views of a base schema
Common variants are not “new models”; they are **views**:
- **Create input**: often omits server-owned fields (e.g. `id`, computed fields).
- **Update/PATCH input**: makes fields optional and removes immutable keys.
- **Public view**: omits sensitive fields.
- **Params/query subsets**: pick just the fields needed for a specific boundary.

## Set C — DRY beats copy/paste
- Copy/paste schemas cause drift.
- Prefer `.partial()`, `.pick()`, `.omit()`, `.extend()`.

## Set D — Keep derivation close to the base
- Place base + variants in the same module (or domain folder) to reduce circular imports.
- If circular dependencies appear, reconsider module boundaries (see `X-04`).
