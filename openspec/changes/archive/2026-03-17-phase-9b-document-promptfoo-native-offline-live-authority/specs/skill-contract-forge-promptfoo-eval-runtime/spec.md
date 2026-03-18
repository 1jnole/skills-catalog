## MODIFIED Requirements

### Requirement: Minimum affected docs are aligned with runtime truth
Docs touched by this migration SHALL distinguish supported runtime truth from historical artifacts and SHALL describe the operational authority of each supported Promptfoo-native surface.

#### Scenario: Runtime surfaces are described together
- **WHEN** an affected document describes the supported `skill-contract-forge` Promptfoo workflow
- **THEN** it SHALL identify `promptfoo validate*` as structural configuration validation
- **AND** it SHALL identify `promptfoo:run:offline*` as the preferred low-cost replay or smoke path
- **AND** it SHALL identify `promptfoo:run*` as the semantic authority when offline replay and live behavior disagree
- **AND** it SHALL identify `without_skill` as an informational baseline rather than a closure gate

#### Scenario: Legacy path appears in affected docs
- **WHEN** an affected document mentions a legacy or historical eval path
- **THEN** the document SHALL label it as historical or unsupported for the active runtime
- **AND** it SHALL identify the supported runtime path for this slug
