# Codex compatibility notes

This catalog targets current Codex CLI behavior and flags.

## Minimum expectations

- `codex exec --json` must exist (JSONL event stream).
- `-c/--config` must exist so eval runs can disable web search.
- `--output-schema` is optional (only needed for `--with-rubric`).

See the official CLI reference for the definitive list of flags.  
- CLI reference: https://developers.openai.com/codex/cli/reference/
- Changelog: https://developers.openai.com/codex/changelog/

## Why we disable web search in evals

Codex enables web search by default for local tasks (cached mode). Evals are meant to be reproducible and avoid accidental dependence on external data. The runner sets `web_search` to `disabled` for eval runs.

If you want live search for manual, interactive sessions, use `--search` or set `web_search = "live"` in your user config.
