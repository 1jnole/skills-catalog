## MODIFIED Requirements

### Requirement: Offline fixtures align with hardened runtime behavior
Offline fixtures used by the preferred Promptfoo replay gates MUST be refreshed only after the post-refactor live behavior is restored.

#### Scenario: Live recovery succeeds after package refactor
- **WHEN** live `contract` and live `uplift with-skill` return to the intended green state
- **THEN** the repository SHALL refresh the surface-specific offline fixtures to snapshot that recovered behavior
- **AND** offline replay SHALL be re-run to confirm that the restored behavior is reproducible
