---
name: "js-type-coercion-boundaries"
description: "Normalize boundary inputs (DOM/query params/API payload fields) to avoid implicit JS coercion bugs. Prefer explicit coercion (Number/String/Boolean), strict equality (===), and explicit conditional checks. Use when inputs are strings and code performs math, '+' concatenation, conditionals, or comparisons. Don't use when schema validation is required (delegate to repo-approved validators) or when the logic is already type-safe and the bug isn't coercion-related."
---

# JS Type Coercion Boundaries

## Procedures

Step 1: Identify boundary inputs
1) Locate values coming from boundaries (DOM inputs, query params, `localStorage`, JSON payloads).
2) Assume boundary values are strings unless proven otherwise.
3) Read `references/catalog.md` for coercion triggers and rules.

Step 2: Detect coercion triggers
1) Find operators/actions that implicitly coerce:
   - Math operators (`*`, `-`, `/`, `%`, `**`) → ToNumber
   - `+` → ToString unless both are numbers
   - Conditionals (`if`, `||`, `&&`, `!`) → ToBoolean
   - Loose equality (`==`) → implicit coercion (avoid)
2) Use `references/pitfalls.md` to spot common traps (e.g., `0`, `""`, `" "`).

Step 3: Apply explicit coercion (minimal diff)
1) Coerce before doing math or comparisons:
   - `Number(x)` or unary `+x` for numeric intent
   - `String(x)` for string intent
2) Replace `==` with `===` after making types explicit.
3) Replace ambiguous truthy checks with explicit checks when `0`/`""` are valid values.
4) Use `references/patterns.md` for canonical refactors.

Step 4: Produce the output
1) Use `assets/output.template.md`.
2) Describe the boundary, the risk, and the minimal patch.

## Error handling / stop conditions
- If you cannot determine whether `""`, `" "`, `null`, `undefined`, or `0` are valid domain values, stop and ask; otherwise, propose a safe normalization step.
- Do not introduce validation libraries unless the repo already uses them or the user explicitly requests it.
