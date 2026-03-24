## ADDED Requirements

### Requirement: Forge handoff authority remains portable across phases
The repository SHALL document the default forge workflow so that each phase hands off a portable artifact boundary rather than workspace-local auxiliary refs.

#### Scenario: Workflow handoff policy is reviewed
- **WHEN** `README.md`, `AGENTS.md`, and the forge `SKILL.md` files are reviewed together
- **THEN** they SHALL describe the approved brief artifact as the contractual handoff from contract to implementation
- **AND** they SHALL describe the implemented skill package as the downstream-readable handoff from implementation to eval authoring
- **AND** they SHALL NOT teach auxiliary local authoring refs as required cross-phase authority

#### Scenario: Reusable support content is routed into the implemented package
- **WHEN** workflow docs describe how examples, templates, or long reference material survive into later phases
- **THEN** they SHALL route that content into `references/` or `assets/` of the implemented skill package when the contract freezes that need
- **AND** they SHALL not teach those materials as durable dependencies on the original authoring workspace
