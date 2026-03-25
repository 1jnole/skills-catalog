## ADDED Requirements

### Requirement: zod-normalize-inputs implements the approved normalization boundary

The maintained `zod-normalize-inputs` skill SHALL implement the approved contract boundary for Zod-based normalization of untrusted boundary inputs.

#### Scenario: Trigger and non-trigger boundaries are explicit in the maintained skill

- **WHEN** the maintained `zod-normalize-inputs` skill describes its routing boundary
- **THEN** it SHALL trigger for query params, path params, form fields, DB row shapes, and string-to-runtime-value normalization with Zod
- **AND** it SHALL exclude HTTP JSON response validation
- **AND** it SHALL exclude schema-variant derivation from a base schema
- **AND** it SHALL exclude inputs already normalized upstream
- **AND** it SHALL stop and ask when boundary ownership or upstream normalization is ambiguous

### Requirement: zod-normalize-inputs interface metadata matches the approved contract

The maintained `zod-normalize-inputs` agent interface SHALL match the approved implementation contract.

#### Scenario: openai.yaml carries the contract-frozen interface fields

- **WHEN** `zod-normalize-inputs` keeps `agents/openai.yaml` in its package
- **THEN** it SHALL define the contract-frozen `display_name`
- **AND** it SHALL define the contract-frozen `short_description`
- **AND** it SHALL define the contract-frozen `default_prompt`
