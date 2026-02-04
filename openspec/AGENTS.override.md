# AGENTS.override.md (OpenSpec subtree)

Within `openspec/`, follow these rules strictly:

- **Workflow contract:** `openspec/specs/workflow.md`

## Change layout
Each change lives in `openspec/changes/<slug>/` and includes:
- `proposal.md` (why + what changes)
- `tasks.md` (plan + evidence)
- optional: `design.md` and `specs/*.md`

## Templates
Prefer repo-local templates under `openspec/templates/*`.
When starting a new change folder, scaffold it via `$spec-new-change-from-templates`.

## Evidence format
In `tasks.md`, keep an iteration plan (incl. Iteration 0) and append verification evidence under `## Evidence log`.

## Stop conditions
- Do not invent requirements or contracts.
- If the target repo lacks `npm run verify`, stop and propose a minimal gate (do not proceed silently).

## Stable specs
- Repo-wide, long-lived contracts live under `openspec/specs/`.
- Change-scoped deltas live under `openspec/changes/<slug>/specs/`.
