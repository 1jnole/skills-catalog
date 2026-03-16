## Why

OpenSpec is partially initialized in this repository: `openspec/config.yaml` and `openspec/AGENTS.override.md` exist, but `openspec/changes/` was missing, so `openspec list --json` failed and downstream change workflows were blocked. This change makes the OpenSpec workspace usable before any product or tooling work depends on it.

## What Changes

- Normalize the repository so `openspec/changes/` is present and remains trackable in git.
- Define the minimum workspace-readiness capability for OpenSpec change management in this repo.
- Record bootstrap verification evidence for `openspec --version`, `openspec schemas --json`, and `openspec list --json`.

## Capabilities

### New Capabilities
- `openspec-change-workspace-readiness`: The repository MUST keep a usable OpenSpec changes workspace so change creation and listing commands do not fail on a missing `openspec/changes/` directory.

### Modified Capabilities
- None.

## Impact

- Affected areas: `openspec/changes/` workspace structure and this change's OpenSpec artifacts.
- No public API changes.
- No runtime, eval, dependency, or CI behavior changes.
