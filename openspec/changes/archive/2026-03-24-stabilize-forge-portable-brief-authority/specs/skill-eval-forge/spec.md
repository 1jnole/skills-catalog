## ADDED Requirements

### Requirement: `skill-eval-forge` aligns to portable contract and implementation authority
`skill-eval-forge` SHALL author eval coverage from the approved contract artifact, the existing implementation, and the active eval context without requiring auxiliary local authoring refs from earlier phases.

#### Scenario: Eval authoring proceeds from brief plus implementation
- **WHEN** an eval-authoring request identifies an inspectable approved contract artifact, an inspectable implementation, and inspectable active eval context
- **THEN** `skill-eval-forge` SHALL treat those three authorities as sufficient for eval authoring
- **AND** it SHALL NOT require auxiliary repo-local authoring refs from the original contract phase to recover expected behavior

#### Scenario: Distilled contract expectations remain authoritative downstream
- **WHEN** the approved contract artifact carries distilled behavior, constraints, examples, or package-shape expectations
- **THEN** `skill-eval-forge` SHALL align coverage to that approved contract and to the implemented package
- **AND** it SHALL not prefer auxiliary historical refs over the approved brief and current implementation

### Requirement: Eval authoring expects durable support content in the implemented package
`skill-eval-forge` SHALL expect durable examples, templates, or reference material to be available through the implemented skill package when the approved contract froze that need through `authoring.packageShape`.

#### Scenario: Implemented package exposes durable support material
- **WHEN** the approved contract artifact froze `references/` or `assets/` for durable downstream content
- **THEN** `skill-eval-forge` SHALL treat the implemented package as the downstream-readable source for that content
- **AND** it SHALL NOT require the local authoring files that originally informed the brief
