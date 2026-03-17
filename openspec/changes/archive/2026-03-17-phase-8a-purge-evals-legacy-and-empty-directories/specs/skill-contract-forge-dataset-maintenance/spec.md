## MODIFIED Requirements

### Requirement: skill-contract-forge case pruning and movement is explicit

The repository MUST distinguish the canonical `skill-contract-forge` authoring surface from historical pilot and manual-audit case materials, and those historical materials MAY be removed from the active repo tree entirely once they are no longer needed.

#### Scenario: A maintainer reviews local case artifacts after cleanup

- **WHEN** the local `skill-contract-forge` case files and docs are reviewed
- **THEN** only the active skill-local authoring contract SHALL remain in the supported repository tree
- **AND** historical pilot or manual-audit files SHALL NOT appear under the active `evals/` tree
- **AND** nearby docs SHALL NOT present removed historical files as active or required authoring inputs
