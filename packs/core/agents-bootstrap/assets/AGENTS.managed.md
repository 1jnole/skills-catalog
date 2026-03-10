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
