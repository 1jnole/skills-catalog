# Proposal — Add `agents-bootstrap` skill

## Summary
Add a curated skill that scaffolds `AGENTS.md` (short, truncation-safe) plus `openspec/AGENTS.override.md` to enforce a deterministic Codex + OpenSpec workflow.

## Design notes
- Uses a managed block in `AGENTS.md` so teams can keep custom content outside the block.
- Moves deeper operational detail into `openspec/AGENTS.override.md` to reduce risk of silent truncation.

## Acceptance
- New skill lives under `skills/.curated/agents-bootstrap/`.
- Skill includes copy-friendly templates under `assets/`.
- `npm run verify` succeeds in this catalog.
