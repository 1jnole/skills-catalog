# skill-contract-forge Specification

## Purpose
TBD - created by archiving change dogfood-skill-contract-forge-real-usage. Update Purpose after archive.
## Requirements
### Requirement: Existing-skill refactors inspect the current skill package

The maintained `skill-contract-forge` skill SHALL tell refactor and rewrite runs to inspect the current skill package when that package provides the most grounded view of package shape and interface metadata.

#### Scenario: Existing-skill refactor freezes package shape from the maintained package

- **WHEN** `skill-contract-forge` handles an `existing-skill-refactor` or `skill-rewrite`
- **THEN** it SHALL permit and foreground inspection of the current target `SKILL.md`
- **AND** it SHALL permit and foreground inspection of existing support folders that materially shape the contract, such as `references/`, `assets/`, `scripts/`, or `agents/`
- **AND** it SHALL use that inspection to freeze `authoring.packageShape` and `authoring.interface` without inventing missing folders

### Requirement: Approved briefs can be materialized as durable working-file artifacts

The maintained `skill-contract-forge` skill SHALL treat the approved brief as the durable handoff artifact for later phases.

#### Scenario: Workspace-backed contract run persists one inspectable brief artifact

- **WHEN** the environment supports persisted working files
- **THEN** `skill-contract-forge` SHALL describe the approved brief as one inspectable artifact that later phases can read directly
- **AND** it SHALL prefer one durable brief artifact over multiple paraphrased local handoff files
- **AND** it SHALL keep the artifact contract-only and stop at `Eval Brief ready`

### Requirement: Contract briefs preserve a tiny high-signal discovery surface

The maintained `skill-contract-forge` skill SHALL teach that discovery and edge-case intent should be preserved compactly inside the brief itself.

#### Scenario: Brief freezes representative triggers, nearby negatives, and ambiguity

- **WHEN** `skill-contract-forge` freezes `activationProbes`, `negativeSignals`, and `seedEvalIntent`
- **THEN** it SHALL preserve a small high-signal set of representative trigger probes
- **AND** it SHALL preserve nearby non-trigger coverage in `negativeSignals` or `seedEvalIntent`
- **AND** it SHALL preserve at least one ambiguity or stop-and-ask comparison in `seedEvalIntent`
- **AND** it SHALL avoid turning these fields into decorative filler

#### Scenario: Trigger brief keeps `seedEvalIntent` structured

- **WHEN** `skill-contract-forge` freezes `seedEvalIntent` on a trigger path
- **THEN** it SHALL emit `seedEvalIntent` as an object
- **AND** it SHALL include `mustStopAt`, `comparisonFocus`, and `notes`
- **AND** it SHALL NOT emit `seedEvalIntent` as a bare array or bare string

### Requirement: Existing-skill refactors preserve asset-backed package shape when needed

The maintained `skill-contract-forge` skill SHALL teach refactor and rewrite runs to keep `assets/` in the approved package shape when the current skill package already owns durable template, baseline, or scaffold files that downstream implementation must preserve.

#### Scenario: Existing asset is contractual authority

- **WHEN** `skill-contract-forge` handles an `existing-skill-refactor` or `skill-rewrite`
- **AND** the current target skill package contains a maintained template, baseline, or output scaffold in `assets/`
- **AND** that asset materially shapes the deterministic behavior or maintained file surface of the skill
- **THEN** the approved brief SHALL preserve `assets` in `authoring.packageShape.supportFolders`
- **AND** it SHALL not collapse the package shape to `supportFolders: []` merely because the durable support surface is small
- **AND** it SHALL treat that asset as package-shape authority rather than as decorative context

### Requirement: Missing-target refactors and rewrites do not self-target from local context

The maintained `skill-contract-forge` skill SHALL treat missing-target existing-skill requests as unresolved even when the current skill is visible in local context.

#### Scenario: Deictic rewrite prompt is evaluated inside the current skill repo

- **WHEN** `skill-contract-forge` receives an `existing-skill-refactor` or `skill-rewrite` shaped request without an explicit target skill
- **AND** the current repository, current folder, or active skill context makes one skill locally visible
- **THEN** it SHALL still return `Classification: stop-and-ask`
- **AND** it SHALL NOT treat that visible local skill as the prompt's named target

