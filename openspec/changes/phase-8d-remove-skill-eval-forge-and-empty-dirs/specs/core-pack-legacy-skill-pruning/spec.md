## ADDED Requirements

### Requirement: Unsupported legacy skills are removed from the active core pack

When a core skill only teaches an unsupported repository workflow, the repository MUST NOT keep it as a supported active skill in `packs/core/`, and it MAY remove it entirely from the active tree.

#### Scenario: A legacy core skill no longer matches the supported eval architecture

- **WHEN** a core skill still instructs contributors to use removed eval flows or runner shapes
- **THEN** that skill MAY be deleted from `packs/core/`
- **AND** active docs, test prompts, and generated outputs SHALL NOT continue to present it as a live target after the cleanup lands
