## MODIFIED Requirements

### Requirement: Fixture snapshots align with hardened runtime behavior

Maintained fixture snapshots for `skill-contract-forge`, if kept or refreshed, MUST remain subordinate to live Promptfoo runtime truth.

#### Scenario: Live recovery succeeds after package refactor
- **WHEN** live `contract` and live `uplift with-skill` return to the intended green state
- **THEN** the repository MAY refresh the surface-specific fixture snapshots to reflect that recovered behavior
- **AND** it SHALL NOT refresh fixture snapshots to encode behavior that still fails in live evaluation

### Requirement: Affected docs describe hardened runtime truth

Affected runtime and local-authoring docs MUST identify the authoritative contract and the role of maintained fixture snapshots correctly.

#### Scenario: Eval docs are reviewed after alignment
- **WHEN** affected `skill-contract-forge` eval docs are reviewed
- **THEN** they SHALL identify `packs/core/skill-contract-forge/SKILL.md` as the authority for output behavior
- **AND** they SHALL describe maintained fixture snapshots as subordinate support artifacts rather than as a supported public replay path

### Requirement: Fixture evidence remains aligned for anchor regression cases

Maintained `skill-contract-forge` fixture snapshots, if kept for anchor regression cases, MUST stay aligned with the supported routing envelope for those cases.

#### Scenario: Anchor fixture snapshots are reviewed after a replay repair
- **WHEN** maintained fixture snapshots are reviewed for the `with_skill` uplift surface
- **THEN** anchor regression cases SHALL reflect the same routing expectation enforced by the supported suite assertions
- **AND** the repository SHALL NOT keep a known mismatched fixture snapshot as the maintained reference artifact
