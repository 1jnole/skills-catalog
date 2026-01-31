# Change: Ultra-pro hardening for openspec-bootstrap + agents-bootstrap

## Why
The Phase 1 bootstraps need to match current Codex + AGENTS.md + OpenSpec conventions: short instruction files (truncation-safe), clear precedence/overrides, and templates that start every change with a compliant proposal and evidence log.

## What Changes
- Expand `openspec-bootstrap` templates to include `proposal.md`, `design.md`, and `spec-delta.md` in addition to `spec.md` and `tasks.md`.
- Tighten `agents-bootstrap` guidance around file precedence and context budget; add a human-oriented fallback document under `docs/AGENTS.md`.
- Keep diffs minimal: no behavioral changes outside the bootstrap skills and docs.

## Impact
- Affected skills:
  - `skills/.curated/openspec-bootstrap`
  - `skills/.curated/agents-bootstrap`
- Affected repo docs:
  - `README.md`
  - `docs/AGENTS.md`
