# catalog — safe context routing

## Contracts

1) **Required Context (most common)**
- Provider must exist.
- Hook throws if used outside Provider.

2) **Optional Context (explicit)**
- Absence of Provider is valid.
- Caller handles `undefined/null` explicitly.

## Rerender control (apply only if needed)
- Object-literal Provider `value` → stabilize with memoization.
- Consumers need only actions → split State vs Actions contexts.

## Output checklist
- [ ] safe hook exists and throws on missing Provider (for required contexts)
- [ ] consumers use safe hook
- [ ] no masking defaults
- [ ] value stability addressed when needed
