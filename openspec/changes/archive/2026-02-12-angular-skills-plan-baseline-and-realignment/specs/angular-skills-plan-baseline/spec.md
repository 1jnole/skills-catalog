## ADDED Requirements

### Requirement: Angular consolidation plan SHALL use the real catalog baseline
The consolidation plan SHALL document the real count of Angular skills from `packs/angular/skills` and SHALL include the baseline date used for that count.

#### Scenario: Baseline is recomputed before executing point 1
- **WHEN** the repository inventory is checked in `packs/angular/skills`
- **THEN** `PLANS.md` reflects the real count and records the baseline date explicitly

### Requirement: Plan traceability SHALL avoid nonexistent evidence paths
The plan traceability table SHALL reference only existing evidence files, or SHALL explicitly indicate that evidence is pending creation for each future slug.

#### Scenario: Future slugs do not have tasks files yet
- **WHEN** a slug has no `tasks.md` file created
- **THEN** `PLANS.md` does not claim a concrete file path for that slug evidence

### Requirement: Point 1 implementation SHALL stay atomic
The point 1 implementation SHALL update only baseline/realignment artifacts and SHALL NOT include consolidation work from points 2-4.

#### Scenario: Change scope is reviewed
- **WHEN** files modified by this slug are listed
- **THEN** they are limited to `PLANS.md` and the slug 1 artifacts under `openspec/changes/angular-skills-plan-baseline-and-realignment/`
