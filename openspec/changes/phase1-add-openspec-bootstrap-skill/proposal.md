# Proposal — Add `openspec-bootstrap` skill

## Summary
Add a curated skill that scaffolds a minimal `openspec/` workspace (changes + templates) so repos can adopt spec-driven workflows deterministically.

## Non-goals
- Introduce new tooling dependencies.
- Enforce a particular OpenSpec CLI workflow.

## Acceptance
- New skill lives under `skills/.curated/openspec-bootstrap/`.
- Skill contains small, copy-friendly templates under `assets/`.
- `npm run verify` succeeds in this catalog.
