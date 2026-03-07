---
name: react-ts-boundaries-unknown
description: "Hardens React+TypeScript boundaries by treating external data as unknown, validating/narrowing it using existing repo schemas (e.g., Zod) or honest type guards, and mapping into safe domain/UI types. Use when consuming fetch() JSON, JSON.parse(), localStorage/sessionStorage, URL/search params, or environment variables. Don't use for internal-only refactors where data is already typed/trusted, or to introduce a new validation library unless the repo already uses it or the user asks."
---

# react-ts-boundaries-unknown

Treat boundary inputs as untrusted until proven otherwise. Validate/parse at the edge, then pass safe types into components.

## Procedures

Step 1: Identify the boundary
1) Locate the first point where untrusted data enters (e.g., `fetch().json()`, `JSON.parse`, `localStorage.getItem`, `URLSearchParams`, env access).
2) Ensure the raw value is typed as `unknown` (or becomes `unknown` immediately at ingress).
3) Remove unsafe casts that bypass validation (e.g., `(await res.json()) as T`).

Step 2: Choose a validation strategy
1) Read `references/catalog.md` and select the smallest matching pattern.
2) If the repo already uses runtime validation (schemas/decoders), reuse it and follow conventions.
3) Otherwise, use honest type guards + explicit normalization (no new dependencies).

Step 3: Validate, then map to a safe shape
1) Validate at the boundary. On failure, throw/return an explicit error (or map to an explicit UI error state).
2) Map DTO → Domain/UI shape in a dedicated function when needed (defaults/coercions explicit).

Step 4: Keep parsing at the edge (not inside render)
1) Parse/validate in a fetcher, loader, server action, or hook boundary (before returning data).
2) Components receive only safe types and render explicit states (`loading | error | ready`).

Step 5: Keep diffs minimal
1) Prefer small, local changes: add validator + mapper near ingress, then update call sites.
2) Avoid broad refactors unless requested.

## Artifacts
- Boundary validator (schema parse / safeParse flow, or a type guard).
- Mapping function (DTO → safe type) when shapes differ or defaults/coercions are needed.
- Call sites updated to use validator + mapper (no direct assertions).

## Acceptance criteria
- No direct type assertion from untrusted boundary into a trusted type.
- Validation exists at the boundary with an explicit failure path.
- Mapping/coercion/defaults are explicit.
- Parsing/validation is not performed inside render.
- No new validation dependency is introduced unless already present or explicitly requested.

## Error handling and stop conditions
- If the payload shape is unknown/unstable, stop and ask for example payloads or the repo’s contract source of truth.
- If normalization rules must match backend semantics (enums/dates/empty-string rules), do not guess; stop and ask.

## Just-in-time references
- Routing: `references/catalog.md`
- Mechanical patterns: `references/patterns.md`
- Failure modes: `references/pitfalls.md`
