## ADDED Requirements

### Requirement: Implementation runs map approved brief fields into maintained files

The maintained `skill-implementation-forge` skill SHALL teach how approved brief fields materialize into concrete maintained files.

#### Scenario: Approved brief drives the maintained file surface

- **WHEN** `skill-implementation-forge` implements or refactors one named skill from an approved brief
- **THEN** it SHALL map `skill.name` and `skill.description` into `SKILL.md` frontmatter
- **AND** it SHALL map the approved activation boundary and stop conditions into the maintained `SKILL.md` instructions
- **AND** it SHALL map `authoring.interface` into dependency-facing agent metadata when `agents` is contract-required

### Requirement: Implementation runs inspect and reuse the current package

The maintained `skill-implementation-forge` skill SHALL teach implementations to inspect the current target package before editing and reuse already-aligned support content when possible.

#### Scenario: Existing support files already satisfy the approved contract

- **WHEN** the current target package already contains contract-required support folders
- **THEN** `skill-implementation-forge` SHALL inspect the existing support files that are materially affected by the contract
- **AND** it SHALL preserve support files that already satisfy the approved brief
- **AND** it SHALL avoid rewriting unaffected support files just because the folder exists
