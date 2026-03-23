## ADDED Requirements

### Requirement: Trigger briefs freeze the minimal package shape
The `skill-contract-forge` core contract MUST require trigger-path Eval Briefs to freeze the minimal package shape that downstream implementation should materialize.

#### Scenario: Trigger output defaults to a shallow package
- **WHEN** `skill-contract-forge` returns a trigger-path Eval Brief
- **THEN** the payload SHALL include `authoring.packageShape.requiredFiles`
- **AND** `requiredFiles` SHALL include `SKILL.md`
- **AND** the payload SHALL include `authoring.packageShape.supportFolders`
- **AND** support folders SHALL default to the minimal justified subset rather than a scaffold-by-default list

#### Scenario: Trigger output selects support folders by content role
- **WHEN** `skill-contract-forge` freezes a trigger-path brief
- **THEN** it SHALL keep core trigger and procedure content in `SKILL.md`
- **AND** it SHALL reserve `references` for consultation material, `scripts` for repetitive or fragile logic, and `assets` for templates or output resources
- **AND** it SHALL NOT introduce support folders that the request does not justify

#### Scenario: Trigger output includes agents only when interface metadata is frozen
- **WHEN** `skill-contract-forge` returns a trigger-path Eval Brief whose `authoring.packageShape.supportFolders` includes `agents`
- **THEN** the payload SHALL also include `authoring.interface.display_name`
- **AND** it SHALL include `authoring.interface.short_description`
- **AND** it SHALL include `authoring.interface.default_prompt`
- **AND** it SHALL NOT assume downstream implementation can invent that interface later
