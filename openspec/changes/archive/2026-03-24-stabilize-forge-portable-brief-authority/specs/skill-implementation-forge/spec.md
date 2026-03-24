## ADDED Requirements

### Requirement: `skill-implementation-forge` uses the approved brief as the sole required contractual handoff
`skill-implementation-forge` SHALL treat the approved contract artifact as the only required inspectable contractual handoff from the contract phase and SHALL NOT require auxiliary local authoring refs to recover the implementation boundary.

#### Scenario: Approved brief is inspectable without auxiliary refs
- **WHEN** an implementation request identifies one approved contract artifact concretely enough to inspect
- **THEN** `skill-implementation-forge` SHALL treat that brief as sufficient contractual authority for implementation scope
- **AND** it SHALL NOT require additional repo-local authoring references merely because they were consulted upstream

#### Scenario: Implementation preserves portable contract semantics
- **WHEN** the approved contract artifact describes repo context, policy constraints, examples, or templates in distilled form
- **THEN** `skill-implementation-forge` SHALL implement from that distilled contract
- **AND** it SHALL NOT reinterpret missing auxiliary refs as missing implementation authority

### Requirement: `skill-implementation-forge` materializes durable support content into the target package
`skill-implementation-forge` SHALL materialize durable examples, templates, and reference content into the target skill package when the approved contract artifact freezes that need through `authoring.packageShape`.

#### Scenario: Contract requires reusable reference material
- **WHEN** the approved contract artifact indicates that downstream-readable reference material belongs in `references/`
- **THEN** `skill-implementation-forge` SHALL place that material in the target skill package
- **AND** it SHALL NOT leave the implemented skill dependent on the upstream local authoring file where the material was first observed

#### Scenario: Contract requires reusable templates or output scaffolds
- **WHEN** the approved contract artifact indicates that templates or output scaffolds belong in `assets/`
- **THEN** `skill-implementation-forge` SHALL materialize those assets in the target package
- **AND** it SHALL NOT treat auxiliary local source paths as the durable template surface
