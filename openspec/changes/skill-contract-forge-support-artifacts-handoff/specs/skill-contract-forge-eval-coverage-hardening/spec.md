## MODIFIED Requirements

### Requirement: Hardened coverage rejects empty or inconsistent support artifacts

The supported `skill-contract-forge` Promptfoo coverage MUST detect invalid `supportArtifacts` payloads deterministically.

#### Scenario: Trigger output emits empty support artifacts

- **WHEN** a trigger-case output includes a trigger envelope and terminal marker
- **AND** the embedded Eval Brief payload emits `supportArtifacts: []`
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed

#### Scenario: Trigger output misaligns support artifacts with package shape

- **WHEN** a trigger-case output declares `supportArtifacts` under `references/` or `assets/`
- **AND** `authoring.packageShape.supportFolders` omits the matching folder
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed

#### Scenario: Trigger output invents decorative support artifacts

- **WHEN** a trigger-case output declares `supportArtifacts` that point outside shallow `references/` or `assets/` files, or that leak auxiliary repo-local authoring paths
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed
