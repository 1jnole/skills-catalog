# Proposal — Evals determinism baseline

## Why
Evals are only useful when they are reproducible and fail with actionable errors.

## What changes
- Make the eval runner align with current Codex CLI flag placement and config semantics.
- Isolate skills per eval via `CODEX_HOME` to avoid user-scope contamination.
- Disable web search for eval runs (Codex enables cached web search by default).

## Non-goals
- Expanding coverage to all skills.
- Mandatory rubric scoring.

## References
- Codex CLI reference (flags + `-c` semantics): https://developers.openai.com/codex/cli/reference/
- Codex changelog (web search defaults + modes): https://developers.openai.com/codex/changelog/

