## ADDED Requirements

### Requirement: agents-bootstrap implementation follows the approved brief

The maintained `agents-bootstrap` skill SHALL implement the approved contract artifact without widening the package shape or redefining the skill boundary.

#### Scenario: Maintained skill maps the approved brief into concrete files

- **WHEN** `agents-bootstrap` is implemented from the approved brief at `openspec/changes/archive/2026-03-25-refactor-agents-bootstrap-contract/eval-brief.json`
- **THEN** `packs/core/agents-bootstrap/SKILL.md` SHALL use the approved `skill.name` and `skill.description`
- **AND** it SHALL map the approved activation boundary, nearby non-triggers, and stop conditions into maintained instructions
- **AND** it SHALL preserve `assets/AGENTS.managed.md` as the durable baseline asset required by the approved package shape
- **AND** it SHALL not require an ad hoc gate command that is not frozen by the approved brief
