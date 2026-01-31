# Proposal — Add structural `npm run verify` for skills catalog

## Why
This catalog is used as an internal source of truth for Codex skills. A single broken `SKILL.md` (invalid frontmatter or non-kebab-case name) prevents reliable discovery and breaks the workflow.

## What changes
- Replace placeholder `npm run verify` with a deterministic, offline structural verifier.
- Add root `AGENTS.md` and `openspec/AGENTS.override.md` so this repo is self-describing and truncation-safe.
- Verify required baseline skills exist (OpenSpec + core guardrails).

## Non-goals
- No networked checks (no `npx` downloads, no update checks).
- No docs-lint / spellcheck.
- No behavioral eval harness (future phase).
