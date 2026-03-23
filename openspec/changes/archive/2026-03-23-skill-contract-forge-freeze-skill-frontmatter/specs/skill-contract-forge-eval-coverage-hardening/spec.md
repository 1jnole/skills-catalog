## MODIFIED Requirements

### Requirement: Trigger cases require schema-backed Eval Brief payloads
Trigger cases in the supported `skill-contract-forge` runtime MUST require embedded JSON that satisfies the supported Eval Brief schema, including the repo-required skill metadata frozen by trigger-path briefs.

#### Scenario: Trigger output contains visible markers but malformed payload
- **WHEN** a trigger-case output contains the expected trigger markers but the embedded JSON payload is missing required Eval Brief structure
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed

#### Scenario: Trigger output omits required skill description
- **WHEN** a trigger-case output includes `Classification: trigger`, the expected workflow line, and `Eval Brief ready`
- **AND** the embedded JSON payload omits the required `skill.description`
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed

#### Scenario: Trigger output contains valid structured Eval Brief payload
- **WHEN** a trigger-case output includes the required trigger markers and embedded JSON satisfying the supported Eval Brief schema
- **THEN** the hardened Promptfoo suite SHALL allow that structural portion of the case to pass
