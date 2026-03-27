## MODIFIED Requirements

### Requirement: `supportArtifacts` remains engine-neutral and contract-only

The `skill-contract-forge` core contract MUST describe `supportArtifacts` as an optional engine-neutral brief field and MUST NOT use it to smuggle runtime implementation or Promptfoo-specific behavior into the contract.

#### Scenario: Trigger brief declares support artifacts

- **WHEN** `packs/core/skill-contract-forge/SKILL.md` teaches trigger-path support-artifact handoff
- **THEN** it SHALL describe `supportArtifacts` as optional source-backed contract content
- **AND** it SHALL keep those artifacts limited to implementation-relevant support material rather than runtime or grader instructions
- **AND** it SHALL NOT describe Promptfoo-specific configs or runtime files as valid `supportArtifacts`
