# agents-bootstrap Specification

## Purpose
TBD - created by archiving change refactor-agents-bootstrap-contract. Update Purpose after archive.
## Requirements
### Requirement: Contract-first refactor handoff for agents-bootstrap

The repository SHALL support a contract-only refactor handoff for the existing `agents-bootstrap` skill before any maintained skill files are edited.

#### Scenario: Approved brief freezes the existing skill boundary

- **WHEN** `agents-bootstrap` is being refactored through the forge workflow
- **THEN** phase 1 SHALL produce an approved brief artifact before implementation begins
- **AND** the brief SHALL freeze the skill name, frontmatter description, and single job
- **AND** the brief SHALL freeze the minimal package shape needed by the maintained skill package
- **AND** the brief SHALL freeze the activation boundary, nearby non-triggers, and stop conditions
- **AND** the brief SHALL stop at a contract-only handoff rather than implementation details

### Requirement: agents-bootstrap contract boundary

The approved brief for `agents-bootstrap` SHALL preserve a narrow managed-root-instructions sync contract.

#### Scenario: Trigger and non-trigger boundaries remain explicit

- **WHEN** the brief defines the activation boundary for `agents-bootstrap`
- **THEN** it SHALL include bootstrapping or refreshing the managed block in the repository root `AGENTS.md` as trigger cases
- **AND** it SHALL include syncing the managed baseline template asset as part of the maintained package shape
- **AND** it SHALL exclude ad-hoc edits outside the managed markers
- **AND** it SHALL exclude OpenSpec workspace bootstrap or repair
- **AND** it SHALL exclude broader policy rewrites that go beyond synchronizing the current managed baseline

### Requirement: agents-bootstrap implementation follows the approved brief

The maintained `agents-bootstrap` skill SHALL implement the approved contract artifact without widening the package shape or redefining the skill boundary.

#### Scenario: Maintained skill maps the approved brief into concrete files

- **WHEN** `agents-bootstrap` is implemented from the approved brief at `openspec/changes/archive/2026-03-25-refactor-agents-bootstrap-contract/eval-brief.json`
- **THEN** `packs/core/agents-bootstrap/SKILL.md` SHALL use the approved `skill.name` and `skill.description`
- **AND** it SHALL map the approved activation boundary, nearby non-triggers, and stop conditions into maintained instructions
- **AND** it SHALL preserve `assets/AGENTS.managed.md` as the durable baseline asset required by the approved package shape
- **AND** it SHALL not require an ad hoc gate command that is not frozen by the approved brief

### Requirement: agents-bootstrap contract refresh uses the local repo forge skill

The repository SHALL support refreshing the approved `agents-bootstrap` contract artifact from the local repo implementation of `skill-contract-forge` when later dogfooding changes materially affect package-shape guidance.

#### Scenario: Refreshed brief preserves local asset authority

- **WHEN** `agents-bootstrap` is refreshed through the contract phase after the local repo `skill-contract-forge` absorbed the asset-authority refinement
- **THEN** the refreshed approved brief SHALL preserve `assets` in `authoring.packageShape.supportFolders`
- **AND** it SHALL treat `packs/core/agents-bootstrap/assets/AGENTS.managed.md` as package-shape authority rather than decorative context
- **AND** it SHALL remain a contract-only handoff artifact
- **AND** it SHALL not depend on an unsynced Codex-home copy of `skill-contract-forge`

### Requirement: agents-bootstrap implementation follows the refreshed approved brief

The maintained `agents-bootstrap` skill SHALL support implementation-phase reconciliation against a refreshed approved brief while preserving already-aligned package content.

#### Scenario: Refreshed brief drives maintained skill updates

- **WHEN** `agents-bootstrap` is reconciled against `openspec/changes/refresh-agents-bootstrap-contract-local-skill/eval-brief.json`
- **THEN** `packs/core/agents-bootstrap/SKILL.md` SHALL use the refreshed `skill.description`
- **AND** it SHALL map the refreshed activation boundary, nearby non-triggers, and stop conditions into maintained sections
- **AND** it SHALL preserve `assets/AGENTS.managed.md` as the contract-required baseline asset
- **AND** it SHALL remove ad hoc gate requirements that are not frozen by the refreshed brief

### Requirement: agents-bootstrap implementation reflects refreshed closure guidance

The maintained `agents-bootstrap` skill SHALL support implementation from the refreshed approved brief using the local `skill-implementation-forge` guidance that now requires explicit closure semantics where the workflow benefits from them.

#### Scenario: Refreshed implementation materializes explicit done guidance

- **WHEN** `agents-bootstrap` is implemented from `openspec/changes/refresh-agents-bootstrap-contract-local-skill/eval-brief.json`
- **THEN** `packs/core/agents-bootstrap/SKILL.md` SHALL use the refreshed frontmatter description
- **AND** it SHALL map the refreshed activation boundary and stop conditions into maintained sections
- **AND** it SHALL include concise completion guidance such as `Done When` for the managed-block synchronization workflow
- **AND** it SHALL preserve `assets/AGENTS.managed.md` as the contract-required baseline asset

