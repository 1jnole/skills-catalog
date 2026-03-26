## ADDED Requirements

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
