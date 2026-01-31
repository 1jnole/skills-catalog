# AGENTS.override.md (OpenSpec subtree)

Within `openspec/`, follow these rules strictly:

- **Workflow contract:** `openspec/specs/workflow.md`

## Change layout
Each change lives in `openspec/changes/<slug>/` and includes:
- `proposal.md` (why + what changes)
- `tasks.md` (evidence: commands + outputs + exit codes)
- optional: `design.md` and `specs/*.md`

## Evidence format
In `tasks.md`, include:
1) Objective
2) Checklist
3) Commands executed (copy/paste)
4) Relevant output (include exit codes)
5) Result of `npm run verify`

## Stop conditions
- Do not invent requirements or contracts.
- If the target repo lacks `npm run verify`, stop and propose a minimal gate (do not proceed silently).

## Stable specs
- Repo-wide, long-lived contracts live under `openspec/specs/`.
- Change-scoped deltas live under `openspec/changes/<slug>/specs/`.
