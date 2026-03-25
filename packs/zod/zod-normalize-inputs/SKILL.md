---
name: zod-normalize-inputs
description: "Normalizes untrusted stringly-typed or loosely typed inputs into domain-friendly values with Zod coercion, transform, and refine. Use when query/path params, form fields, DB row shapes, or similar boundary inputs need typed normalization before application logic. Do not use for HTTP JSON response validation, schema-variant derivation from a base schema, or inputs already normalized upstream."
---
# zod-normalize-inputs

## Overview
Normalize untrusted inputs at the boundary so the rest of the codebase can rely on stable, typed values without repeating coercion across layers.

This skill is about Zod-based input normalization with `z.coerce.*`, `.transform`, and `.refine`/`.superRefine`, not about response validation or schema-variant derivation.

## Use When
- Query params or path params arrive as strings and need typed normalization with Zod.
- Form fields need boundary normalization before application logic.
- DB rows or other stringly-shaped records need decoding into typed values.
- A validated string needs transformation into a runtime-friendly value such as `Date`.
- Constraints beyond primitives belong on top of already normalized boundary values.

## Do Not Use When
- The main task is HTTP JSON response validation. Use `zod-validate-api-boundaries`.
- The main task is deriving create, patch, public, or private schema variants from a base schema. Use `zod-derive-schema-variants`.
- Inputs are already normalized and validated upstream.
- The task is general coercion cleanup without adopting or extending a Zod boundary schema. Use `js-guardrails-type-coercion-boundaries`.

## Stop And Ask When
- It is unclear whether normalization belongs at this boundary or was already done in another layer.
- The request mixes input normalization with response validation or schema-variant derivation in one inseparable step.
- The boundary source of the untrusted values is missing or ambiguous.
- The change would duplicate the same normalization logic across multiple layers instead of choosing one boundary.

## Procedure
1. Read `references/mental-model-sets.md` to confirm the boundary-normalization model.
2. Read `references/catalog.md`, then pick 1-2 relevant patterns and any matching pitfalls.
3. Identify the boundary source of the untrusted values: query params, path params, form submission, DB row decoding, or a similar stringly input edge.
4. Define or extend a Zod schema that:
   - coerces string values into the intended primitive types where appropriate
   - transforms validated values into runtime-friendly shapes such as `Date`
   - uses `.refine` or `.superRefine` only for rules not captured by primitives
5. Derive types from the schema with `z.infer` so the schema stays the single source of truth.
6. Normalize once at the boundary. Do not repeat the same coercion in downstream domain logic or parallel layers.
7. Verify behavior with a small set of positive and negative examples or tests. If failures are user-facing, prefer result-based flows such as resolvers over uncontrolled exceptions.

## Outputs
- A Zod schema or schema extension implementing normalization at the boundary.
- Derived types from the schema via `z.infer`.
- A small set of examples or tests covering the normalization rules and nearby failure cases.

## References
- Boundary model: `references/mental-model-sets.md`
- Pattern routing: `references/catalog.md`
- Canonical implementations: `references/patterns.md`
- Anti-examples and edge cases: `references/pitfalls.md`
