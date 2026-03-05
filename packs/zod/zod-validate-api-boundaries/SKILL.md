---
name: zod-validate-api-boundaries
description: "Validates untrusted HTTP JSON boundaries with Zod schemas and returns inferred types to the rest of the app. Use when adding/changing API client calls (fetch/axios) or parsing response JSON. Don't use for URL/form coercion or schema-variant derivation; don't use when data is already validated upstream (central client, generated validators, tRPC end-to-end)."
---

# zod-validate-api-boundaries

## Overview
Validate external HTTP JSON at the **boundary** with Zod so the rest of the codebase works with trusted, inferred types.

## Procedures
Step 1: Select the minimal pattern set (routing)
0) Read `references/mental-model-sets.md`.
1) Read `references/catalog.md`.
2) Pick 1–2 relevant patterns (`P-..`) and any matching pitfalls (`X-..`).
3) If the task is out of scope (inputs normalization, PATCH variants, OpenAPI/tRPC pipelines), stop and route elsewhere.

Step 2: Implement deterministically (progressive disclosure)
1) Read only the selected pattern sections in `references/patterns.md` and `references/pitfalls.md`.
2) Identify the boundary call-site(s): `fetch(...)`, `axios...`, `response.json()`, request `body` creation.
3) Ensure a Zod schema exists for the payload shape (import from a shared package if present).
4) Apply exactly one boundary gate:
   - Use `.parse()` when mismatch indicates contract drift and should fail loudly.
   - Use `.safeParse()` when failures are expected and must be handled without exceptions.
5) Return the validated value and its inferred type from the API client function.

Step 3: Produce the required output
1) Update or add the minimal code changes (API client function(s) + schema import/definition).
2) Add a short rationale (2–5 bullets) referencing which pattern IDs were used (optional: `Refs used: P-.., X-..`).

Step 4: Validate and close
1) If repo instructions define a gate, run it; otherwise typecheck the affected module(s).
2) If validation fails, fix the root cause (prefer schema or boundary changes; avoid casts).

## Error handling
- **Missing schema / unclear payload:** stop and ask for a sample payload and expected shape (or point to the contract source).
- **Repeated parsing detected:** apply `X-02` guidance; validate once at the boundary.
- **Performance concerns:** apply `P-04` (reuse schemas, validate arrays in one pass).

## References
- `references/mental-model-sets.md`
- `references/catalog.md`
- `references/patterns.md`
- `references/pitfalls.md`
