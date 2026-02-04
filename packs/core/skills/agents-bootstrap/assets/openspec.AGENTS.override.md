# OpenSpec override (for the openspec/ subtree)

## What lives here
- `openspec/changes/<slug>/` is the only place to add or modify specs, proposals, and evidence logs.

## Evidence template
Use the repo-local templates:
- `openspec/templates/proposal.md`
- `openspec/templates/spec.md`
- `openspec/templates/mini-spec.md`
- `openspec/templates/spec-delta.md`
- `openspec/templates/tasks.md`
- `openspec/templates/design.md` (optional)

## Change scaffolding (MUST)
Before writing into a new `openspec/changes/<slug>/...` folder:
1) derive a stable slug (`$spec-change-slugger`)
2) scaffold from templates (`$spec-new-change-from-templates`)

## Proposal format (MUST)
- Include `## Why` and `## What Changes` sections.

## Evidence rules (MUST)
- Commands must be copy/pasteable.
- Include relevant outputs (trim long logs, but keep failures and exit codes).
- Always include the final `npm run verify` output.
- Append evidence under `## Evidence log` when present; keep the iteration plan intact.

## Commit convention (MUST)
- Commit scope MUST be the OpenSpec `<slug>`.
- Include `OpenSpec: openspec/changes/<slug>/` in the commit body (recommended).

## Workflow conventions
- Keep each change folder small and focused.
- If you need deeper agent rules for a specific subfolder inside `openspec/`, add a nested `AGENTS.override.md` there.
