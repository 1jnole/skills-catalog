## MODIFIED Requirements

### Requirement: Supportive material is separated from the normative contract
Examples, routing expansion, and edge-case walkthroughs MUST live outside the always-loaded `SKILL.md` when they are not required to state the contract itself.

#### Scenario: Trigger path needs packaged interface metadata
- **WHEN** `packs/core/skill-contract-forge/SKILL.md` teaches when to use `agents`
- **THEN** it SHALL state that UI-facing metadata for skill lists or dependency-facing interface metadata justify `authoring.packageShape.supportFolders: ["agents"]`
- **AND** it SHALL NOT teach freezing `authoring.interface` while leaving the package shape as if no `agents` support surface were required
