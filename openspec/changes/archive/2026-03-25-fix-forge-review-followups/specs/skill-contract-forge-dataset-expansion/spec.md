## MODIFIED Requirements

### Requirement: Expanded suites keep fixture snapshots optional

The repository MUST NOT require a supported public offline replay command just to preserve the expanded `skill-contract-forge` dataset.

#### Scenario: Expanded dataset support is reviewed
- **WHEN** the expanded `skill-contract-forge` dataset and its surrounding docs are reviewed
- **THEN** the repository SHALL preserve the live Promptfoo suite coverage for the expanded cases
- **AND** any maintained fixture snapshots for those cases SHALL remain optional support artifacts rather than a required public replay surface
