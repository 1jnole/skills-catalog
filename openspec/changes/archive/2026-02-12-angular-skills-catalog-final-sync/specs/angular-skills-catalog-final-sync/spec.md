## ADDED Requirements

### Requirement: Public catalog narrative SHALL list the final canonical Angular skills
The repository `README.md` SHALL include a dedicated section that documents the final Angular catalog as `10` canonical skills, using the current names from `packs/angular/skills`.

#### Scenario: Canonical list is reviewed in README
- **WHEN** `README.md` is opened after apply
- **THEN** it contains a compact section with the ten canonical Angular skill names and no references to absorbed legacy skill folders

### Requirement: Plan traceability SHALL reflect archived consolidation slugs
`PLANS.md` SHALL present the `Estado y trazabilidad` table with archived status and evidence paths for the consolidation slugs already completed, including the final sync slug once archived.

#### Scenario: Traceability table is reviewed
- **WHEN** `PLANS.md` is reviewed after apply
- **THEN** the table entries for parts 2, 3 and 4 indicate archived completion with date and evidence path

### Requirement: AGENTS guidance SHALL remain stable unless a real drift is detected
`AGENTS.md` SHALL only be modified if the final sync introduces an operational inconsistency against `openspec/AGENTS.override.md`; otherwise it SHALL remain unchanged.

#### Scenario: AGENTS alignment is checked
- **WHEN** `AGENTS.md` and `openspec/AGENTS.override.md` are reviewed during this change
- **THEN** no AGENTS diff is introduced if current routing and stop conditions remain valid
