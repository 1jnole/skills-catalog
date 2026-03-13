## ADDED Requirements

### Requirement: New-scaffold skill-forge flow is documented as primary

The repository SHALL document the canonical `evals/cases/skill-forge/` suite plus the Promptfoo-based execution path as the primary operational route for evaluating `skill-forge`.

#### Scenario: Maintainer reads the eval docs for skill-forge
- **WHEN** a maintainer reads the active eval READMEs
- **THEN** the docs MUST point at the canonical new-scaffold suite and Promptfoo command as the primary route
- **AND** they MUST describe how to validate or execute that suite without depending on `packs/core/skill-forge/evals/evals.json`

### Requirement: Inherited skill-forge eval path is documented as transitional compatibility

The repository SHALL describe the inherited `packs/core/skill-forge/evals/` path as transitional compatibility rather than as the main operational route.

#### Scenario: Maintainer reads the inherited skill-forge eval README
- **WHEN** a maintainer reads `packs/core/skill-forge/evals/README.md`
- **THEN** the document MUST state that the inherited path is not the primary route for `skill-forge`
- **AND** it MUST point maintainers to the canonical new-scaffold suite for the active flow
