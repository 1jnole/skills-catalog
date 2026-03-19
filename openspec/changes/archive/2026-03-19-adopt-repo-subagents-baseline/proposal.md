## Why

This repository now relies on repeated repo-local exploration, OpenSpec preflight checks, and Promptfoo suite comparisons that do not require frontier-model reasoning on every pass. A repo-scoped subagent baseline can shift those read-heavy tasks to lower-cost custom agents while keeping the main agent focused on integration and final decisions.

## What Changes

- Add a repo-scoped Codex subagent baseline under `.codex/` with conservative concurrency defaults.
- Add three narrow read-only custom agents for repo mapping, OpenSpec preflight, and Promptfoo drift review.
- Document when contributors should use the repo-scoped subagents and the expected cost trade-off.
- Update ignore rules so the tracked repo baseline is committed without allowing transient user runtime state into git.

## Capabilities

### New Capabilities
- `codex-subagent-baseline`: The repository provides a tracked repo-scoped Codex subagent baseline optimized for low-cost exploration and review tasks.

### Modified Capabilities
- None.

## Impact

- New tracked repo config under `.codex/`
- Updated repository ignore rules in `.gitignore`
- Contributor documentation in `README.md`
- New OpenSpec capability for repo-scoped Codex subagent defaults
