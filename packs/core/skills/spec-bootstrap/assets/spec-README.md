# OpenSpec workspace

This folder stores **spec-driven source-of-truth** artifacts for this repository.

## Structure
- `openspec/specs/` — stable, repo-wide contracts (workflow, formats)
- `openspec/changes/<slug>/` — one change per PR (proposal/spec/tasks/design, as needed)
- `openspec/templates/` — local templates for specs and evidence logs

## Templates
- `openspec/templates/proposal.md` — start every change with **Why** + **What Changes**.
- `openspec/templates/spec.md` — requirements + scenarios + acceptance.
- `openspec/templates/spec-delta.md` — optional, for updating existing spec areas.
- `openspec/templates/tasks.md` — evidence log (commands + outputs).
- `openspec/templates/design.md` — optional, record key technical decisions.

## Working agreements (repo-specific)
- Implementation is limited to what is specified under `openspec/changes/<slug>/...`.
- Each change requires an evidence log: `openspec/changes/<slug>/tasks.md`.
- The single verification gate is: `npm run verify`.

## Notes
- Keep this README short. Put operational rules for agents in `AGENTS.md` and use directory overrides when necessary.
