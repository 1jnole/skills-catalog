<!-- BEGIN MANAGED: agents-bootstrap -->

# Agent instructions (managed)

## Repository expectations
- Use OpenSpec for non-trivial changes.
- Implement only what is defined by artifacts in `openspec/changes/<slug>/`, editing repo files required by those tasks.
- Keep changes atomic and reviewable (split large scopes into multiple slugs).

## Layered instructions
- Keep this root file short (discovery-safe).
- All operational details live in `openspec/AGENTS.override.md`.
- Nested overrides near specialized work take precedence.

## Prompt policy
- Stable defaults:
  - `/prompts:openspec-proposal`
  - `/prompts:openspec-apply`
  - `/prompts:openspec-archive`
- Experimental (`/prompts:opsx-*`) only when explicitly requested.

## Stop conditions (global)
Stop and ask if:
- `openspec/` is missing or inconsistent
- scope is unclear or acceptance criteria are missing
- instructions/contracts conflict
- a change requires elevated permissions beyond sandbox limits
- there is destructive risk (see override for the exact list)

## Execution mode
- Autonomous end-to-end execution is the default.
- Require explicit human approval before mutating actions only for critical decisions or destructive risk.
- All other changes proceed autonomously with `/review` and repository gates.

<!-- END MANAGED: agents-bootstrap -->

## Repo-specific additions
- Treat changes as non-trivial if any of these apply:
  - touches more than 1 file
  - changes observable behavior (feature, UI state, contract)
  - touches build/config/deps (tooling, CI, tsconfig, nx, eslint, etc.)
  - refactor with meaningful risk
- Decision precedence:
  - if acceptance criteria are missing and "done" cannot be verified, stop and ask
  - if the decision is non-critical and verifiable, choose the documented default and record the assumption
- Trivial fast-path (no approval checkpoint):
  - no observable behavior or contract change
  - no auth/permissions/tooling/deps/data model impact
  - no destructive risk
  - change is small, local, and reversible

## Autonomous execution policy
- Autonomous end-to-end execution is the default.
- Require explicit human approval before mutating actions only for critical decisions or destructive risk.
- All other changes proceed autonomously with `/review` and repository gates.
- If a decision is non-critical and verifiable, choose the documented default and record it as an assumption.
- Stop and ask for conflicts, missing critical inputs, or permission elevation.
