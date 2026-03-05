# Catalog — Coercion at boundaries

## Use when
- Boundary inputs are strings and the code does math, `+`, comparisons, or conditionals.
- A bug looks like “2110” (string concatenation) or unexpected branching.

## Don't use when
- You need full schema validation/parsing (use repo-approved validators).
- The issue is not related to runtime coercion.

## Core triggers (Hard Parts v3)
- Math operators (`*`, `-`, `/`, `%`, `**`) kick off **ToNumber**.
- Unary `+` / `-` also kick off **ToNumber**.
- `+` can kick off **ToString** (unless both sides are numbers).
- Conditionals (`if`, `||`, `&&`, `!`) kick off **ToBoolean**.
- Loose equality (`==`) triggers coercion “all over the place” — avoid.

## Output expectation
- Identify boundary → identify coercion trigger(s) → apply explicit coercion → preserve behavior.

## Sources
- Slides: p.66–68 (strict equality example + coercion triggers map).
- Transcripts: lessons on ToNumber/ToBoolean and operator-driven coercion (often 20–23 in your set).
