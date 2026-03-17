## ADDED Requirements

### Requirement: Replay evidence remains aligned for anchor regression cases
Maintained offline replay evidence for `skill-contract-forge` MUST stay aligned with the supported routing envelope for anchor regression cases used by the Promptfoo uplift surfaces.

#### Scenario: Anchor replay evidence is reviewed after a replay repair
- **WHEN** maintained replay fixtures, suites, or replay outputs are reviewed for the `with_skill` uplift surface
- **THEN** anchor regression cases SHALL reflect the same routing expectation enforced by the supported suite assertions
- **AND** the repository SHALL NOT keep a known mismatched replay output as the maintained offline baseline
- **AND** the offline replay suite SHALL be derived from the maintained uplift cases rather than copied into a second hand-maintained suite
