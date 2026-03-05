# Pitfalls — Guardrails

- Adding dependencies “to be safe” violates repo-first constraints.
- Fixing a coercion bug by switching to `==` hides the real issue.
- “Quick fix” timers (`setTimeout`) often mask ordering problems; prefer explicit awaits/returns.
- Mutating arrays in state/reducers creates unpredictable UI updates.
