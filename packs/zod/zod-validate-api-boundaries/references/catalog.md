# Pattern catalog (pick 1–2)
Pick 1–2 canonical patterns before implementing. Patterns are canonical; pitfalls are anti-examples.

## Patterns

- **Validate API JSON with `.parse()` (fail-fast contract gate)** → `P-01` (`patterns.md`)
- **Validate API JSON with `.safeParse()` (explicit result)** → `P-02` (`patterns.md`)
- **Validate outbound request payloads before `JSON.stringify`** → `P-03` (`patterns.md`)
- **Centralize schema usage: reuse schemas, validate once, vectorize arrays** → `P-04` (`patterns.md`)
- **Share schemas across client/server via a shared package** → `P-05` (`patterns.md`)

## Pitfalls

- **Optimistic typing: annotating `Promise<Task>` without runtime validation** → `X-01` (`pitfalls.md`)
- **Redundant parsing: validating the same object multiple times** → `X-02` (`pitfalls.md`)
- **Recreating schemas repeatedly (hot paths / loops)** → `X-03` (`pitfalls.md`)
- **Surprising object behavior: unknown keys stripped by default** → `X-04` (`pitfalls.md`)
