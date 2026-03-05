# Mental model (sets)

- External inputs are *untrusted* and often *stringly typed* (query/path params, form fields).
- Normalize **once at the boundary**: after normalization, internal code should not repeat coercion/validation.
- Prefer Zod schemas to manual ad-hoc parsing: schemas are composable and enable `z.infer` (single source of truth).
- Coercion (`z.coerce.*`) is for boundary normalization where inputs arrive as strings.
- Transform (`.transform`) is for converting validated inputs into runtime-friendly shapes (e.g., `string` → `Date`).
- Refine (`.refine` / `.superRefine`) is for rules not captured by primitives (cross-field constraints, complex predicates).
