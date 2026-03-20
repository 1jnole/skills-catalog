## Design

This change hardens the Promptfoo family for `skill-implementation-forge` without expanding runtime scope.

### Scope

- Tighten the permanent family spec.
- Keep `uplift.with-skill` comparative and lighter than `contract.yaml`.
- Keep `uplift.without-skill` informational and anti-impersonation focused.

### Non-goals

- No changes to `contract.yaml`
- No changes to providers, fixtures, generated outputs, or package scripts
- No new family configs or replay assets

### Implementation notes

- Reuse the contract boundary defined in the permanent implementation spec instead of cloning every contract case.
- Keep `uplift.with-skill` centered on routing, missing-authority stop behavior, mixed-phase stop behavior, non-trigger precedence, and terminal-marker exclusivity.
- Require `uplift.without-skill` to avoid skill-owned phrases, terminal markers, and repo-shaped workflow framing while still asking for concrete material when needed.
