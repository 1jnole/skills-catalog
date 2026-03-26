## ADDED Requirements

### Requirement: agents-bootstrap implementation reflects refreshed closure guidance

The maintained `agents-bootstrap` skill SHALL support implementation from the refreshed approved brief using the local `skill-implementation-forge` guidance that now requires explicit closure semantics where the workflow benefits from them.

#### Scenario: Refreshed implementation materializes explicit done guidance

- **WHEN** `agents-bootstrap` is implemented from `openspec/changes/refresh-agents-bootstrap-contract-local-skill/eval-brief.json`
- **THEN** `packs/core/agents-bootstrap/SKILL.md` SHALL use the refreshed frontmatter description
- **AND** it SHALL map the refreshed activation boundary and stop conditions into maintained sections
- **AND** it SHALL include concise completion guidance such as `Done When` for the managed-block synchronization workflow
- **AND** it SHALL preserve `assets/AGENTS.managed.md` as the contract-required baseline asset
