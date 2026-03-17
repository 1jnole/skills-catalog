## MODIFIED Requirements

### Requirement: Uplift suite is comparative, not contractual
The `with_skill` uplift surface MUST recover green comparative routing behavior after packaging refactors without forcing the repository to collapse the `references/` split back into `SKILL.md`.

#### Scenario: Skill-enabled uplift regresses after packaging split
- **WHEN** `uplift with-skill` fails after moving supportive material into `references/`
- **THEN** the repository SHALL recover the intended comparative routing behavior through minimal normative guidance or suite recalibration
- **AND** `without_skill` SHALL remain an informational baseline rather than becoming the semantic recovery target
