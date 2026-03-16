# skill-contract-forge-name-adoption Specification

## ADDED Requirements

### Requirement: The repository uses skill-contract-forge as the canonical skill name
The repository MUST use `skill-contract-forge` as the canonical name for the contract-first skill.

#### Scenario: A maintainer reads core skill and eval paths
- **WHEN** core skill, eval, and contract paths are inspected
- **THEN** the primary paths SHALL use `skill-contract-forge`
- **AND** they SHALL NOT keep any legacy canonical path name active

### Requirement: Text references align with the new canonical name
The repository MUST update textual references so that `skill-contract-forge` is the active name used in docs, configs, tests, and OpenSpec artifacts.

#### Scenario: A maintainer searches for the legacy name
- **WHEN** the repository is searched for the legacy canonical name
- **THEN** no active textual references to that old canonical name SHALL remain

### Requirement: Renamed path references remain internally consistent
The repository MUST keep renamed references and paths consistent after the naming migration.

#### Scenario: A maintainer checks the main renamed surfaces
- **WHEN** the main skill, eval, and contract paths are inspected
- **THEN** the files referenced by docs and configs SHALL exist under the `skill-contract-forge` name
