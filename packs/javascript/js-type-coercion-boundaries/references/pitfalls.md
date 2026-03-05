# Pitfalls — Coercion bugs

- `+` is both addition and concatenation; if either side is a string, it can produce string concatenation.
- Truthy checks: `0`, `""`, `null`, `undefined`, `NaN` are falsy — don't use `if (x)` when 0/"" are valid values.
- `" "` (space) is truthy but often semantically “empty” — normalize explicitly if needed.
- `==` hides coercion and creates brittle behavior. Prefer `===` with explicit types.
