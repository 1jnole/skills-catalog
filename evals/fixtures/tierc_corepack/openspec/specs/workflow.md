# Workflow Contract — Codex + Skills + OpenSpec + npm

## Non-negotiables
- OpenSpec is source-of-truth: implement only `openspec/changes/<slug>/`.
- 1 change = 1 PR (or equivalent).
- Evidence required in `openspec/changes/<slug>/tasks.md` (commands + outputs + exit codes).
- Single gate: `npm run verify`.
- No invented contracts: STOP and ask for clarification.

## OpenSpec structure
- `openspec/specs/` = stable specs (durable contracts).
- `openspec/changes/<slug>/specs/` = spec deltas only when the change modifies/adds a durable contract.

## Commit messages
Use Conventional Commits:
- `type(scope): short summary`
- `scope` MUST be `<slug>`.
- Types: `feat|fix|refactor|docs|test|chore`.
- Body SHOULD include: `OpenSpec: openspec/changes/<slug>/`.

## AGENTS.md
Keep root instructions short; delegate details to overrides (e.g. `openspec/AGENTS.override.md`).
