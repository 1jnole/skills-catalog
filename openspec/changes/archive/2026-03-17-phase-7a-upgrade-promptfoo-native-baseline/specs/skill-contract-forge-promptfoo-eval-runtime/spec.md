## MODIFIED Requirements

### Requirement: Native Promptfoo pass/fail authority

The supported `skill-contract-forge` evaluation runtime MUST continue to derive case pass/fail from Promptfoo-native assertions, and the supported repository Promptfoo baseline for this capability SHALL be `0.121.2` or newer.

#### Scenario: Repository runtime baseline is reviewed

- **WHEN** the repository Promptfoo dependency and active runtime commands are reviewed
- **THEN** the supported baseline SHALL be `0.121.2` or newer
- **AND** the repository manifest SHALL declare a supported Node.js range compatible with that Promptfoo baseline
- **AND** the repository SHALL continue to execute Promptfoo directly
- **AND** it SHALL NOT introduce a repo-owned local runner, wrapper CLI, or grading override layer
