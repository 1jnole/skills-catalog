---
name: js-guardrails-type-coercion-boundaries
description: "Hardens JS/TS primitive boundary values by making type coercion explicit at form, DOM, URL, URLSearchParams, storage, and browser/API edges before math, comparisons, or conditionals. Use when incoming values may arrive as strings or string|null and the right fix is a small local coercion plus strict comparisons. Don't use when the real task is schema validation/parsing, object identity or deep equality, or advanced Symbol.toPrimitive/metaprogramming."
---

# JS Guardrails — Type Coercion Boundaries

## When to use
- You are about to return or edit JS/TS code that consumes primitive values from a boundary such as forms, DOM APIs, query params, `URLSearchParams.get(...)`, `localStorage.getItem(...)`, or similar edges where values often arrive as strings or `string | null`.
- The bug or risk is local implicit coercion before math, `+`, relational comparisons, conditionals, or equality checks.
- The intended fix is to make the target primitive type explicit, keep the patch small, and preserve missing-value semantics instead of guessing.

## Procedure
Step 1: Confirm this is a coercion-boundary problem.
1. Identify the boundary value and the primitive type the code actually needs at the point of use.
2. Identify which operator or action is triggering implicit coercion:
   - math operators (`*`, `-`, `/`, `%`, `**`);
   - `+`;
   - relational operators;
   - conditionals;
   - loose equality (`==`).
3. If the real problem is payload validation, object comparison, or advanced metaprogramming, stop and route elsewhere.
4. If the user explicitly asks for Zod, Valibot, schema parsing, or validation of `unknown` input, say that the task belongs to validation/parsing work and do not implement that schema in this skill.

Step 2: Preserve missing-value semantics before coercing.
1. For boundaries that can return `null` or `undefined`, decide whether “missing”, `""`, and `"0"` mean different things in the business rule.
2. If the surrounding code does not make that rule clear, stop and ask instead of silently mapping a missing value to `0` or `""`.
3. Do not use fallback patterns such as `|| 0`, `?? 0`, or `Number.isFinite(x) ? x : 0` unless the business rule already defines missing and empty values that way.
3. Once the missing-value rule is clear, normalize the boundary value close to the source.

Step 3: Make the coercion explicit near the boundary.
1. Convert numeric inputs with `Number(...)` or unary `+` before doing math, but only after missing-value handling is explicit.
2. Convert string outputs with `String(...)` or template literals when string output is the goal.
3. After values are normalized, prefer strict equality (`===`) over loose equality (`==`).
4. Replace ambiguous truthiness checks with explicit checks when `0`, `""`, `null`, `undefined`, or `NaN` would change the meaning.
5. Keep the change local; do not add validation libraries or redesign unrelated logic.

Step 4: Verify the resulting behavior.
1. Check that math stays numeric and does not fall back to string concatenation.
2. Check that equality and conditional branches now match the intended business rule.
3. Check that `null`/missing handling is still correct for boundary APIs such as `URLSearchParams.get(...)` and `localStorage.getItem(...)`.
4. Surface any remaining ambiguity about the source value or expected target type instead of guessing.

## Definition of done
- Boundary values are coerced explicitly to the intended primitive type before the risky operation.
- Equality and conditional checks no longer rely on ambiguous implicit coercion for correctness.
- Missing-value semantics remain explicit for `string | null` boundaries.
- The patch stays local and does not expand into schema validation, deep equality, or metaprogramming work.

## Stop conditions
- You cannot tell the intended primitive type from the surrounding code or task.
- The business rule for `null`, `undefined`, `""`, `"0"`, or `NaN` is unclear.
- The input is an object or unknown payload that needs structural validation or parsing, not local primitive coercion.
- The code relies on intentionally custom object-to-primitive behavior or `Symbol.toPrimitive`.
- Changing the coercion would alter business semantics and the expected behavior is not clear.

## Don’t use when
- The main task is schema validation, parsing unknown payloads, or introducing Zod/Valibot-style validation.
- The main task is comparing objects or arrays by identity or content.
- The main task is async ordering, array mutation, `this` binding, or another unrelated guardrail.
- The request is a broad theory explanation of coercion rules, Symbols, or metaprogramming.
