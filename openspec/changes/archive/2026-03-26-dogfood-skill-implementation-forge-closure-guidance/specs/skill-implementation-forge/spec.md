## ADDED Requirements

### Requirement: implementation guidance materializes explicit completion semantics in target skills

The maintained `skill-implementation-forge` skill SHALL teach implementations to make output and closure semantics explicit in the maintained target skill when `SKILL.md` is the primary execution surface.

#### Scenario: Approved brief drives outputs and completion guidance

- **WHEN** `skill-implementation-forge` implements or refactors one named skill from an approved brief
- **AND** the maintained target surface is primarily `SKILL.md`
- **THEN** it SHALL map the approved brief's output and success semantics into concise maintained guidance such as outputs, validation expectations, or a completion condition
- **AND** it SHALL not leave target-skill closure implicit when the workflow needs an explicit `done` signal
- **AND** it SHALL keep that closure guidance inside the target package rather than relying on external playbooks
