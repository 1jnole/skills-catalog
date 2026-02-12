## ADDED Requirements

### Requirement: Foundation/data consolidation SHALL define canonical skills for docs, state, template and httpresource
The Angular catalog SHALL expose one canonical skill per domain in this phase:
- `angular-docs-bootstrap`
- `angular21-state-model`
- `angular21-template-control-flow`
- `angular21-data-httpresource`

Each canonical skill SHALL include the standard structure used in this repo (`Goal`, `When to use`, `When NOT to use`, `Inputs`, `Outputs`, `Workflow`, `Common pitfalls`, `Example prompts`, `Definition of done`, `Failure modes`).

#### Scenario: Canonical skills are reviewed after apply
- **WHEN** the `SKILL.md` files of the four canonical skills are opened
- **THEN** each file contains the standard structure and domain-specific guidance without leaving placeholder content

### Requirement: Docs consolidation SHALL absorb architecture and styling bootstrap guidance
`angular-docs-bootstrap` SHALL be the canonical entry point for docs bootstrap and SHALL document the same managed-block behavior previously covered by `angular-architecture-bootstrap` and `angular-styling-bootstrap`.

#### Scenario: Docs bootstrap guidance is validated
- **WHEN** `packs/angular/skills/angular-docs-bootstrap/SKILL.md` is reviewed
- **THEN** the workflow and rules explicitly cover both `docs/ARCHITECTURE.md` and `docs/STYLING.md` managed blocks

### Requirement: Legacy foundation/data skills SHALL be removed once absorbed
After canonical content is in place, the following legacy skills SHALL be removed from `packs/angular/skills`:
- `angular-architecture-bootstrap`
- `angular-styling-bootstrap`
- `angular21-computed-vs-linked-signal`
- `angular21-effect-usage-rules`
- `angular21-signals-input-output-model`
- `angular21-template-control-flow-states`
- `angular21-httpresource-basics`
- `angular21-httpresource-chained-resources`
- `angular21-httpresource-factory-service-pattern`
- `angular21-httpresource-parse-validation`

#### Scenario: Legacy inventory is checked after apply
- **WHEN** the skill directory names are listed
- **THEN** none of the ten absorbed legacy names are present

### Requirement: Phase 2 checkpoint SHALL reach 22 Angular skills
The part 2 consolidation SHALL reduce the catalog from baseline `32` to checkpoint `22` by removing only absorbed legacy skills from foundation/data scope.

#### Scenario: Checkpoint count is recomputed
- **WHEN** `(Get-ChildItem -Directory packs/angular/skills).Count` is executed after apply
- **THEN** the command returns `22`
