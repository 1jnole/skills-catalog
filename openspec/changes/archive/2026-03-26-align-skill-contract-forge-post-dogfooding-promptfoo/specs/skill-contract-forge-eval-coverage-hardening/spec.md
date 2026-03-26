## MODIFIED Requirements

### Requirement: Trigger cases require schema-backed Eval Brief payloads
Trigger cases in the supported `skill-contract-forge` runtime MUST require embedded JSON that satisfies the supported Eval Brief schema, including the repo-required skill metadata and package-shape authority frozen by trigger-path briefs.

#### Scenario: Trigger output contains visible markers but malformed payload
- **WHEN** a trigger-case output contains the expected trigger markers but the embedded JSON payload is missing required Eval Brief structure
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed

#### Scenario: Trigger output omits required package shape
- **WHEN** a trigger-case output includes `Classification: trigger`, the expected workflow line, and `Eval Brief ready`
- **AND** the embedded JSON payload omits required `authoring.packageShape`
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed

#### Scenario: Trigger output requests agents without interface metadata
- **WHEN** a trigger-case output includes `authoring.packageShape.supportFolders` with `agents`
- **AND** the embedded JSON payload omits required `authoring.interface.display_name`, `authoring.interface.short_description`, or `authoring.interface.default_prompt`
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed

#### Scenario: Trigger output contains valid structured Eval Brief payload
- **WHEN** a trigger-case output includes the required trigger markers and embedded JSON satisfying the supported Eval Brief schema
- **THEN** the hardened Promptfoo suite SHALL allow that structural portion of the case to pass

#### Scenario: Trigger output uses array-shaped `seedEvalIntent`
- **WHEN** a trigger-case output includes the required trigger markers and terminal marker
- **AND** the embedded JSON payload emits `seedEvalIntent` as a bare array or bare string
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed
