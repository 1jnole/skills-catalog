## MODIFIED Requirements

### Requirement: Support-artifact handoffs stay shallow and explicitly routed

`skill-contract-forge` MUST keep trigger-path support-artifact handoffs shallow, explicitly routed, and aligned with the minimal package shape expected downstream.

#### Scenario: Support artifacts are declared from the maintained contract

- **WHEN** `packs/core/skill-contract-forge/SKILL.md` teaches `supportArtifacts`
- **THEN** it SHALL constrain artifact paths to one-level-deep files under `references/` or `assets/`
- **AND** it SHALL explicitly say when downstream phases should read each artifact
- **AND** it SHALL require `authoring.packageShape.supportFolders` to include the matching support folder for any declared artifact path

#### Scenario: The packaged template remains lean

- **WHEN** `packs/core/skill-contract-forge/assets/eval-brief.template.json` is reviewed after this change
- **THEN** it SHALL remain a lean base template without default `supportArtifacts`
- **AND** it SHALL NOT normalize `supportArtifacts: []` as boilerplate
