# open-docs-cleanup Specification

## ADDED Requirements

### Requirement: Active repository planning docs SHALL NOT require deleted roadmap folders
Once `roadmap/` and `roadmap2/` are removed from the active tree, non-archived repository docs and non-archived OpenSpec artifacts SHALL NOT require those folders as active sources of truth or required evidence locations.

#### Scenario: Maintainer reads active docs after roadmap removal
- **WHEN** a maintainer reads active repo docs or non-archived OpenSpec artifacts
- **THEN** those materials MUST rely on `PLAN.md`, current repo docs, and OpenSpec artifacts rather than `roadmap/` or `roadmap2/`

### Requirement: Phase 3 active artifacts SHALL keep evidence without roadmap notes
When active Phase 3 changes remain unarchived after roadmap removal, their non-archived proposal, design, spec, and task artifacts SHALL keep implementation evidence self-contained without requiring companion roadmap notes.

#### Scenario: Maintainer reviews an active Phase 3 change
- **WHEN** a maintainer reviews a non-archived Phase 3 change
- **THEN** the change MUST remain understandable from its OpenSpec artifacts and current repo docs
- **AND** it MUST NOT require a deleted roadmap note to understand scope or evidence
