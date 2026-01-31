# OpenSpec override (for the openspec/ subtree)

## What lives here
- `openspec/changes/<slug>/` is the only place to add or modify specs, proposals, and evidence logs.

## Evidence template
Use the repo-local templates:
- `openspec/templates/proposal.md`
- `openspec/templates/spec.md`
- `openspec/templates/spec-delta.md`
- `openspec/templates/tasks.md`
- `openspec/templates/design.md` (optional)

## Proposal format (MUST)
- Include `## Why` and `## What Changes` sections.

## Evidence rules (MUST)
- Commands must be copy/pasteable.
- Include relevant outputs (trim long logs, but keep failures and exit codes).
- Always include the final `npm run verify` output.

## Workflow conventions
- Keep each change folder small and focused.
- If you need deeper agent rules for a specific subfolder inside `openspec/`, add a nested `AGENTS.override.md` there.
