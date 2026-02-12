<!-- BEGIN MANAGED: agents-bootstrap -->

# Agent instructions (managed)

## Repository expectations
- Use OpenSpec for non-trivial changes.
- Implement only what is defined in `openspec/changes/<slug>/`.
- Keep changes atomic and reviewable (split large scopes into multiple slugs).

## Layered instructions
- Keep this root file short (discovery-safe).
- Put detailed phase routing in `openspec/AGENTS.override.md`.
- Nested overrides near specialized work take precedence.

## Prompt policy
- Default prompts: `/prompts:openspec-proposal`, `/prompts:openspec-apply`, `/prompts:openspec-archive`
- Experimental prompts (`/prompts:opsx-*`) only when explicitly requested.

## Default command flow (stable)
- Preflight: `openspec --version`, `openspec schemas --json`, `openspec list --json`
- Create: `openspec new change "<slug>"` -> `openspec status --change "<slug>" --json`
- Artifacts: `openspec instructions <proposal|specs|design|tasks> --change "<slug>" --json`
- Validate: `openspec validate "<slug>" --type change`
- Close: `openspec archive "<slug>"`

## Gate and evidence
- Preferred repo gate: `npm run verify`.
- If a change explicitly excludes verify, or verify is blocked, run:
  - `openspec validate "<slug>" --type change`
  - task-local checks documented in `openspec/changes/<slug>/tasks.md`
- Always record command/result evidence in `openspec/changes/<slug>/tasks.md`.

## Stop conditions
- Stop and ask if `openspec/` is missing, the change scope is unclear, or contracts conflict.

## Detailed rules
- See `openspec/AGENTS.override.md` for phase-by-phase command routing.

<!-- END MANAGED: agents-bootstrap -->
