## ADDED Requirements

### Requirement: Existing-skill refactors preserve asset-backed package shape when needed

The maintained `skill-contract-forge` skill SHALL teach refactor and rewrite runs to keep `assets/` in the approved package shape when the current skill package already owns durable template, baseline, or scaffold files that downstream implementation must preserve.

#### Scenario: Existing asset is contractual authority

- **WHEN** `skill-contract-forge` handles an `existing-skill-refactor` or `skill-rewrite`
- **AND** the current target skill package contains a maintained template, baseline, or output scaffold in `assets/`
- **AND** that asset materially shapes the deterministic behavior or maintained file surface of the skill
- **THEN** the approved brief SHALL preserve `assets` in `authoring.packageShape.supportFolders`
- **AND** it SHALL not collapse the package shape to `supportFolders: []` merely because the durable support surface is small
- **AND** it SHALL treat that asset as package-shape authority rather than as decorative context
