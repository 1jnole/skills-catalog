# skill-forge-alignment Specification

## Purpose
TBD - created by archiving change align-skill-forge-with-openai-guidance. Update Purpose after archive.
## Requirements
### Requirement: Skill location guidance SHALL support explicit targets, repo conventions, and Codex scopes
The skill-forge workflow SHALL choose skill output location by precedence:
1) explicit user-provided path,
2) detected repo convention,
3) Codex scope defaults (`REPO`, `USER`, `ADMIN`).
The instruction text SHALL avoid enforcing a single hardcoded folder for all repositories.

#### Scenario: Repository already has a defined skill layout
- **WHEN** a target repository convention is known
- **THEN** the workflow uses that convention instead of a generic fallback path

### Requirement: Asset generation SHALL be conditional
The workflow SHALL create helper files in `assets/` only when they provide value for the requested outcome, rather than requiring all templates in every run.

#### Scenario: User requests a minimal skill update
- **WHEN** the request does not require reusable templates
- **THEN** the workflow updates only required files and skips optional asset generation

### Requirement: Network guidance SHALL include allowlist and secret handling
For skills that use networked tools, the guardrails SHALL require:
1) a restrictive allowlist policy at org and request scope, and
2) authenticated domain credentials through `domain_secrets`.

#### Scenario: Skill depends on external APIs
- **WHEN** the generated skill declares network dependencies
- **THEN** instructions include allowlist and `domain_secrets` requirements before execution guidance

### Requirement: Deterministic invocation guidance SHALL be explicit
The output guidance SHALL include an explicit deterministic invocation phrase using the pattern `Use the <skill name> skill.`

#### Scenario: User needs reliable tool routing
- **WHEN** the workflow returns invocation instructions
- **THEN** it includes the explicit invocation phrase and avoids vague alternatives

