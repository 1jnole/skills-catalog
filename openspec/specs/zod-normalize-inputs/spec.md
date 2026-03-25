# zod-normalize-inputs Specification

## Purpose
TBD - created by archiving change implement-zod-normalize-inputs-from-contract. Update Purpose after archive.
## Requirements
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

### Requirement: Contract-first refactor handoff for zod-normalize-inputs

The repository SHALL support a contract-only refactor handoff for the existing `zod-normalize-inputs` skill before any maintained skill files are edited.

#### Scenario: Approved brief freezes the existing skill boundary

- **WHEN** `zod-normalize-inputs` is being refactored through the forge workflow
- **THEN** phase 1 SHALL produce an approved brief artifact before implementation begins
- **AND** the brief SHALL freeze the skill name, frontmatter description, and single job
- **AND** the brief SHALL freeze the minimal package shape needed by the maintained skill package
- **AND** the brief SHALL freeze the activation boundary, nearby non-triggers, and stop conditions
- **AND** the brief SHALL stop at a contract-only handoff rather than implementation details

### Requirement: zod-normalize-inputs contract boundary

The approved brief for `zod-normalize-inputs` SHALL preserve a narrow normalization-at-the-boundary skill contract.

#### Scenario: Trigger and non-trigger boundaries remain explicit

- **WHEN** the brief defines the activation boundary for `zod-normalize-inputs`
- **THEN** it SHALL include normalization of untrusted query params, path params, form fields, DB row shapes, and string-to-runtime-value transforms as trigger cases
- **AND** it SHALL exclude HTTP JSON response validation
- **AND** it SHALL exclude schema-variant derivation from an existing base schema
- **AND** it SHALL exclude work where normalization has already happened upstream

