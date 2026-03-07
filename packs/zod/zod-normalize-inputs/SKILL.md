---
name: zod-normalize-inputs
description: "Normalizes untrusted stringly-typed inputs (query/path params, form fields, DB row shapes) into domain-friendly typed values using Zod coercion/transform/refine. Use when inputs originate as strings or loosely-typed values and you need typed, rehydrated data at the boundary. Don't use when parsing HTTP JSON responses (use zod-validate-api-boundaries) or when inputs are already normalized/validated upstream."
---
# zod-normalize-inputs

## Overview
Normalize untrusted inputs (especially strings) *at the boundary* so the rest of the codebase can rely on stable, typed values.

This skill is about **input normalization** (coerce/transform/refine), not about validating API JSON responses.
When schema-based boundary coercion overlaps with `js-type-coercion-boundaries`, prefer this skill.

## Procedures
Step 1: Select the minimal pattern set (routing)
0) Read `references/mental-model-sets.md`.
1) Read `references/catalog.md`.
2) Pick 1–2 relevant patterns (and any matching pitfalls).
3) If the task is out of scope, stop and route to:
   - API JSON response validation → `zod-validate-api-boundaries`

Step 2: Implement normalization at the boundary
1) Identify the boundary (query/path params, form submit, DB row decoding).
2) Define/extend a Zod schema that:
   - **coerces** string values to the desired primitive type when appropriate
   - **transforms** validated inputs into runtime-friendly shapes (e.g., `Date`)
   - adds **refine/superRefine** only for rules not expressible by primitives
3) Derive types via `z.infer` (single source of truth).

Step 3: Apply stop conditions
- Do not normalize inside domain/pure logic when the boundary already normalized it.
- Avoid duplicating the same normalization in multiple layers; normalize once.

Step 4: Verify behavior
- Add a small set of positive/negative examples (see `references/patterns.md`).
- If validation failures are user-facing (forms), prefer result-based flows (e.g., resolver) over uncontrolled exceptions.

## Outputs
- A Zod schema (or schema extension) implementing normalization at the boundary.
- Types derived from the schema (`z.infer`) where needed.
- A small set of usage examples or tests exercising the normalization rules.

## References
- Pattern routing: `references/catalog.md`
- Canonical implementations: `references/patterns.md`
- Anti-examples and edge cases: `references/pitfalls.md`
