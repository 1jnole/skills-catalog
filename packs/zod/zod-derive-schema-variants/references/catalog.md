# Pattern catalog (pick 1–2)
Pick 1–2 canonical patterns before implementing. Patterns are canonical; pitfalls are anti-examples.

## Patterns
- **Create vs Update variants from a base schema** → `P-01` (`patterns.md`)
- **PATCH schema: partial + omit immutable keys** → `P-02` (`patterns.md`)
- **Public / redacted view via omit** → `P-03` (`patterns.md`)
- **Subset schemas via pick (params/query, focused payloads)** → `P-04` (`patterns.md`)
- **Working backwards from existing TS types (`satisfies`)** → `P-05` (`patterns.md`)

## Pitfalls
- **Copy/paste schemas drift** → `X-01` (`pitfalls.md`)
- **PATCH schema allows immutable fields** → `X-02` (`pitfalls.md`)
- **Picking/omitting in the wrong layer (UI vs boundary)** → `X-03` (`pitfalls.md`)
- **Circular schema imports / module cycles** → `X-04` (`pitfalls.md`)
