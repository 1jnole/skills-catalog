# Patterns — Guardrails (minimal)

- Coerce boundary inputs explicitly before math/comparisons.
- Prefer `===` over `==` once types are explicit.
- Avoid in-place `sort/reverse/splice` on shared arrays; produce new arrays.
- Ensure async work is awaited/returned, and errors are handled (await + try/catch, or .catch).
