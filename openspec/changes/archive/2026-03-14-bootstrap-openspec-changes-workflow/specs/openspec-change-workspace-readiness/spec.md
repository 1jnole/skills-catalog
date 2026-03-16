## ADDED Requirements

### Requirement: OpenSpec changes workspace is present
The repository MUST keep a usable `openspec/changes/` workspace so OpenSpec change commands do not fail because the directory is missing from version control state.

#### Scenario: Tracked workspace exists in a clean checkout
- **WHEN** a contributor checks out the repository and runs an OpenSpec change-management command
- **THEN** the repository contains a trackable `openspec/changes/` workspace
- **THEN** the command does not fail because `openspec/changes/` is missing

### Requirement: OpenSpec preflight commands succeed after bootstrap
The repository MUST support the standard OpenSpec preflight commands after bootstrap without requiring additional manual initialization.

#### Scenario: Bootstrap preflight passes
- **WHEN** a contributor runs `openspec --version`, `openspec schemas --json`, and `openspec list --json`
- **THEN** each command completes successfully
- **THEN** the results can be recorded as bootstrap evidence in the change tasks
