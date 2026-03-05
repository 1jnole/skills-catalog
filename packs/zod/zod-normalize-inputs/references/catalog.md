# Pattern catalog (pick 1–2)
Pick 1–2 canonical patterns before implementing. Patterns are canonical; pitfalls are anti-examples.

## Patterns

- **Query/path params normalization** → `P-01` (`patterns.md`)
- **Form validation + normalization (React Hook Form)** → `P-02` (`patterns.md`)
- **DB row decoding (1/0 booleans, stringly shapes)** → `P-03` (`patterns.md`)
- **Transform a validated string into Date** → `P-04` (`patterns.md`)
- **Refine for constraints beyond primitives** → `P-05` (`patterns.md`)

## Pitfalls

- **Treating query/path params as typed values without normalization** → `X-01` (`pitfalls.md`)
- **Making optional params required (and breaking partial filters)** → `X-02` (`pitfalls.md`)
- **Duplicating normalization across layers** → `X-03` (`pitfalls.md`)
- **Keeping parallel TS interfaces (type drift)** → `X-04` (`pitfalls.md`)
