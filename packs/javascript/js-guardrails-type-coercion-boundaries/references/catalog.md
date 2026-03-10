# Routing notes — Type coercion boundaries

Use this skill for **local primitive coercion at boundaries**.

## Good fit
- Form and DOM values arrive as strings but the code needs numbers.
- `+` is concatenating because one side is still a string.
- A conditional or equality check is relying on `==` or truthiness in a way that makes the branch ambiguous.
- A boundary API such as `URLSearchParams.get(...)` or `localStorage.getItem(...)` returns `string | null` and the code needs explicit missing-value handling before coercion.

## Route elsewhere
- **Schema validation / parsing**: the real problem is unknown shape or nested payload normalization.
- **Object/reference equality**: the values being compared are objects, arrays, or dates and the issue is identity or deep comparison.
- **Advanced metaprogramming**: the code is intentionally using `Symbol.toPrimitive` or custom object coercion.
- **Another guardrail**: async ordering, shared-array mutation, or `this` binding is the real source of the bug.

## Preferred scope
- Fix the boundary once, close to the input.
- Preserve explicit semantics for “missing” versus present-but-empty values.
- Keep the change local and easy to inspect.
- Do not widen the patch into validation architecture or general cleanup.
