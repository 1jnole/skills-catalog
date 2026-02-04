# Proposal — Rubric, install, and maintenance policy

## Why
Deterministic checks catch hard regressions, but style/process drift still happens. Optional rubric scoring can catch it without blocking day-to-day workflow. We also need a reproducible way to install skills into a user-scoped Codex home.

## What changes
- Add optional rubric pass (`--with-rubric`) based on `--output-schema`.
- Add `scripts/install-user-skills.mjs` to sync packs into `$CODEX_HOME/skills` idempotently.
- Document minimal DoD for skills and evals to prevent ad-hoc drift.

## Non-goals
- Mandatory rubric on every run.

## References
- Codex CLI reference (`--output-schema`): https://developers.openai.com/codex/cli/reference/
- OpenAI eval skills guide (rubrics as optional structured pass): https://developers.openai.com/blog/eval-skills/

