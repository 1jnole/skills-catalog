# Pattern catalog (pick 1–2)
Pick 1–2 canonical patterns before implementing. Patterns are canonical; pitfalls are anti-examples.

## Patterns

- **Static members (class-level state)** → `P-01` (`patterns.md`)
- **Static initialization blocks** → `P-02` (`patterns.md`)
- **#private fields (true privacy)** → `P-03` (`patterns.md`)
- **Inheritance constructors (super + param props)** → `P-04` (`patterns.md`)
- **Override discipline (`override`)** → `P-05` (`patterns.md`)
- **Enforce overrides (`@noImplicitOverride`)** → `P-06` (`patterns.md`)

## Pitfalls

- **Override typo/mismatch (compiler error)** → `X-01` (`pitfalls.md`)
- **Additional `// @errors` anti-example** → `X-02` (`pitfalls.md`)
