# skill-forge-workflow-authority Specification

## Purpose
TBD - created by archiving change codify-skill-forge-workflow-authority. Update Purpose after archive.
## Requirements
### Requirement: The repository documents one default forge workflow

The repository SHALL document `skill-contract-forge`, `skill-implementation-forge`, and `skill-eval-forge` as the default strong workflow for skill authoring and refactoring.

#### Scenario: Repo workflow docs are reviewed

- **WHEN** `README.md` and `AGENTS.md` are reviewed together
- **THEN** they SHALL describe the default order as `contract -> implementation -> eval`
- **AND** they SHALL identify `Eval Brief ready`, `Skill implementation ready`, and `Skill eval ready` as the corresponding handoff markers
- **AND** they SHALL describe phase mixing as exceptional rather than normal

### Requirement: Each forge skill has one explicit phase objective

Each forge skill SHALL state the objective of its own phase and SHALL keep the other forge phases out of scope.

#### Scenario: Forge skills are reviewed together

- **WHEN** `packs/core/skill-contract-forge/SKILL.md`, `packs/core/skill-implementation-forge/SKILL.md`, and `packs/core/skill-eval-forge/SKILL.md` are reviewed
- **THEN** each skill SHALL describe one explicit phase objective
- **AND** each skill SHALL stop at its own terminal marker
- **AND** no forge skill SHALL redefine the responsibilities of another forge phase

### Requirement: Built-in Codex capabilities are supportive rather than normative

The repository SHALL describe built-in planning, `skill-creator`, and `skill-installer` as support capabilities rather than as the normative forge workflow.

#### Scenario: Built-ins are positioned in workflow docs

- **WHEN** workflow policy docs describe related Codex capabilities
- **THEN** they SHALL position built-in planning as exploration support
- **AND** they SHALL position `skill-creator` as a baseline or fallback reference
- **AND** they SHALL position `skill-installer` as operational-only and outside the functional forge pipeline

### Requirement: Workflow policy prevents avoidable phase hallucination

The repository SHALL document phase-specific guardrails that prevent target, boundary, or precondition hallucination across the forge workflow.

#### Scenario: Forge workflow guardrails are reviewed

- **WHEN** `README.md`, `AGENTS.md`, and the forge `SKILL.md` files are reviewed together
- **THEN** they SHALL reject deictic target references as sufficient identification where the phase requires an explicit target
- **AND** they SHALL require an approved contract artifact before implementation
- **AND** they SHALL require both contract and existing implementation before eval authoring
- **AND** they SHALL reject silent contract renegotiation inside implementation or eval

### Requirement: Forge handoff authority remains portable across phases
The repository SHALL document the default forge workflow so that each phase hands off a portable artifact boundary rather than workspace-local auxiliary refs.

#### Scenario: Workflow handoff policy is reviewed
- **WHEN** `README.md`, `AGENTS.md`, and the forge `SKILL.md` files are reviewed together
- **THEN** they SHALL describe the approved brief artifact as the contractual handoff from contract to implementation
- **AND** they SHALL describe the implemented skill package as the downstream-readable handoff from implementation to eval authoring
- **AND** they SHALL NOT teach auxiliary local authoring refs as required cross-phase authority

#### Scenario: Reusable support content is routed into the implemented package
- **WHEN** workflow docs describe how examples, templates, or long reference material survive into later phases
- **THEN** they SHALL route that content into `references/` or `assets/` of the implemented skill package when the contract freezes that need
- **AND** they SHALL not teach those materials as durable dependencies on the original authoring workspace

