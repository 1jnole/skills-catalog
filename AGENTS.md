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
- Treat a change as non-trivial if it touches more than 1 file, changes observable behavior or contracts, touches tooling or dependencies, or carries meaningful refactor risk.
- If acceptance criteria are missing and `done` cannot be verified, stop and ask.
- If a decision is non-critical and verifiable, choose the documented default and record the assumption.

## Repository operating rules

Keep the root file short and discovery-safe. Detailed process belongs in:

- `openspec/AGENTS.override.md` for OpenSpec workflow
- `plans/README.md` for repo-level background and source precedence across shared docs
- `scripts/evals/README.md` for the current shared eval runner shape
- nested `AGENTS.md` or `AGENTS.override.md` files for specialized areas

## Repository defaults

- Treat `packs/` as portable skill artifacts.
- Keep skill folders shallow: `SKILL.md`, then optional `references/`, `assets/`, `scripts/`, `agents/`, and `evals/` when a skill owns eval definitions.
- Do not place a full shared eval harness inside a skill folder.
- Keep repo-wide stable rules here; put specialized rules closer to the work.

## Skill authoring defaults

- Freeze the contract before editing `SKILL.md`.
- Confirm one job, trigger, non-trigger, definition of done, stop conditions, and nearby negative cases.
- If the workflow cannot be described as one job, split or narrow it before implementation.

## Eval defaults

- The legacy eval runtime was intentionally removed and is not a source of truth.
- Eval definitions live next to each skill under `packs/core/<skill-name>/evals/`.
- Offline iteration workspaces live under `packs/core/<skill-name>/evals/runs/`.
- Rebuild the scaffold from `plans/` and current docs, not by restoring deleted runtime code.

## When modifying `skill-forge`

- Keep the workflow spec-driven.
- Keep the handoff aligned with the current source-of-truth docs.
- Do not reintroduce per-skill harness duplication.
- Keep provider-specific files isolated under `agents/`.


