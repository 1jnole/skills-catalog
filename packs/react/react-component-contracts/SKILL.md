---
name: react-component-contracts
description: "Designs and enforces React+TypeScript component prop contracts for reusable UI components: safe DOM prop passthrough, prevention of invalid prop combinations (unions/discriminated unions), correct ref/children typing, and predictable defaults. Use when creating/refactoring shared components (Button, Input, Modal, primitives) or publishing component APIs. Don't use for one-off page components, or to introduce new libraries/type utilities unless the repo already uses them or the user asks."
---

# react-component-contracts

Define component APIs that are hard to misuse.

## Procedures

Step 1: Identify the public contract
1) Decide behavior + rendered element.
2) List required/optional/mutually-exclusive props.
3) Decide fixed vs polymorphic element based on repo conventions.

Step 2: Route to the smallest typing pattern
1) Read `references/catalog.md` and pick a pattern.

Step 3: Implement prop types
1) Start from DOM props (`ComponentPropsWithoutRef<"element">`), add custom props, `Omit` conflicts intentionally.
2) Encode invalid combinations as unions (use `never` for forbidden props).
3) Keep defaults explicit at runtime and consistent with types.

Step 4: Keep runtime and types aligned
1) Normalize props early.
2) Ensure types match runtime behavior.

Step 5: Ref + children correctness
1) Use `forwardRef` with correct element ref type when needed.
2) Be explicit about children constraints when it affects runtime.

## Artifacts
- `Props` types encoding the public contract.
- Correct DOM prop passthrough derived from the actual element.
- Union/discriminant encoding for invalid combinations.

## Acceptance criteria
- No `any`-typed props or overly-broad DOM typing when element is known.
- DOM passthrough uses `ComponentPropsWithoutRef<...>` with intentional `Omit`.
- Invalid prop combinations are prevented at compile time.
- Defaults are explicit and consistent with types.
- Ref type matches rendered element when using `forwardRef`.

## Error handling and stop conditions
- If contract requirements are unclear, stop and ask for desired JSX usage and target element.
- Follow established repo conventions for polymorphism/slots/variants.

## Just-in-time references
- Routing: `references/catalog.md`
- Patterns: `references/patterns.md`
- Pitfalls: `references/pitfalls.md`
