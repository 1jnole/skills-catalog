---
name: ts-modern-classes
description: "Implements/refactors TypeScript classes: constructors/parameter properties, access modifiers, `#private` fields, static members/blocks, inheritance, and override discipline (`override`/noImplicitOverride). Don't use for runtime type guards/narrowing or for type-level generic utilities; use ts-control-flow-narrowing or ts-derive-types-and-generics."
---
# ts-modern-classes

## Overview
Implement/refactor TypeScript class-based code: constructors, privacy, statics, inheritance, overrides.

## Procedures
Step 1: Select the minimal pattern set (routing)
1) Read `references/catalog.md`.
2) Pick 1–2 relevant patterns (and any matching pitfalls).
3) If the task is out of scope, stop and route to the correct skill.

Step 2: Implement deterministically (progressive disclosure)
1) Read only the selected reference sections in `references/patterns.md` (and `references/pitfalls.md` if present).
2) Implement by **adapting** the pattern to the current domain (do not copy/paste unless identical).
3) Avoid unsafe shortcuts (casts/`any`) unless explicitly justified by constraints.
4) If required context is missing (shape, discriminant, constraints), stop and ask for it.

Step 3: Produce the required output
1) Return updated TypeScript code.
2) Add a short rationale (2–5 bullets).
3) Optional: `Refs used: P-..` if you consulted specific patterns.

Step 4: Validate and close
1) If a repo gate is defined by repo instructions, run it; otherwise typecheck the affected module (`tsc --noEmit` equivalent).
2) If validation fails, fix the root cause (prefer fixes at the declaration site) and re-check.

## Error handling
- **Missing context:** stop and ask for the minimal missing input (sample payload/type, discriminant field, constraints).
- **Reference mismatch:** if no pattern fits, explain why and propose the smallest new pattern needed (or ask to expand scope).
- **Typecheck failure:** iteratively fix until the validation step passes; avoid introducing casts to silence errors.

## References
- `references/catalog.md`
- `references/patterns.md`
- `references/pitfalls.md` (if present)
