## ADDED Requirements

### Requirement: agents-bootstrap implementation follows the refreshed approved brief

The maintained `agents-bootstrap` skill SHALL support implementation-phase reconciliation against a refreshed approved brief while preserving already-aligned package content.

#### Scenario: Refreshed brief drives maintained skill updates

- **WHEN** `agents-bootstrap` is reconciled against `openspec/changes/refresh-agents-bootstrap-contract-local-skill/eval-brief.json`
- **THEN** `packs/core/agents-bootstrap/SKILL.md` SHALL use the refreshed `skill.description`
- **AND** it SHALL map the refreshed activation boundary, nearby non-triggers, and stop conditions into maintained sections
- **AND** it SHALL preserve `assets/AGENTS.managed.md` as the contract-required baseline asset
- **AND** it SHALL remove ad hoc gate requirements that are not frozen by the refreshed brief
