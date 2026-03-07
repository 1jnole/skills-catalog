# catalog — boundary patterns (routing)

Choose the smallest correct boundary pattern.

## Decision map

1) **Does the repo already validate at runtime (schemas/decoders)?**
- Yes → Reuse existing validators/schemas; follow repo conventions (parse vs safeParse, error shaping).
- No  → Use honest type guards + explicit normalization (no new dependencies).

2) **What boundary is it?**

| Boundary | Recommended pattern | Notes |
|---|---|---|
| `fetch()` / HTTP JSON | validate DTO → map to Domain/UI | avoid `(await res.json()) as T` |
| `JSON.parse()` | `try/catch` → validate/guard → default/map | never parse in render |
| `localStorage/sessionStorage` | read → deserialize → validate → default | handle missing/old values |
| `URLSearchParams` | parse → coerce/validate → default | define invalid/empty policy |
| env vars | validate once, fail fast | keep env access typed |

## Output checklist
- [ ] raw value is `unknown` (or becomes `unknown` immediately)
- [ ] validation exists with explicit failure path
- [ ] mapping is explicit when needed
- [ ] parsing/validation not in render
- [ ] no new validation library unless already used/requested
