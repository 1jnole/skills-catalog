# laminar-docs-closeout Specification

## ADDED Requirements

### Requirement: The repository SHALL describe `run-evals` as the supported eval command after Phase 3 closeout
Once the supported flow is fully Laminar-backed, the repository SHALL describe `run-evals` as the supported eval command and SHALL treat `run-iteration` only as historical compatibility.

#### Scenario: Maintainer reads repo-level command docs
- **WHEN** a maintainer reads the root README or eval runner README
- **THEN** the docs MUST present `run-evals` as the supported command
- **AND** they MUST describe `run-iteration` only as a compatibility alias rather than an active supported path

### Requirement: The repository SHALL describe Laminar as the active supported platform in architecture docs
After Batch 5 retirement is complete, the architecture source of truth SHALL describe Laminar as the active supported path and legacy only as historical compatibility.

#### Scenario: Maintainer reads `PLAN.md`
- **WHEN** a maintainer reads the architecture plan and its Mermaid diagrams
- **THEN** the document MUST describe Laminar as the active supported flow
- **AND** it MUST NOT imply that the legacy runner remains part of the supported path

### Requirement: The repository SHALL record Batch 6 closeout evidence
When documentation closeout is finished, the repository SHALL record Batch 6 evidence inside active repo docs and OpenSpec artifacts without requiring a companion roadmap note.

#### Scenario: Batch 6 is complete
- **WHEN** the closeout edits are finished
- **THEN** the OpenSpec tasks for Batch 6 MUST record the verification evidence`r`n- **AND** the active repo docs MUST be sufficient to understand the resulting supported doc state



