# laminar-public-boundaries Specification

## Purpose
Historical record of the archived Laminar Phase 1 boundary decisions. This spec does not describe the current Promptfoo-first supported eval path.
## Requirements
### Requirement: Phase 1 SHALL define `run-evals` as the supported public eval command
Phase 1 SHALL establish `run-evals` as the supported public command for executing evals, and SHALL ensure that public documentation no longer presents `run-lmnr-eval` as the supported path.

#### Scenario: Public command naming is updated
- **WHEN** a maintainer reads the public eval runner documentation after phase 1
- **THEN** the supported execution command MUST be `run-evals` and `run-lmnr-eval` MUST not be presented as the supported public path

### Requirement: Phase 1 SHALL define a canonical Laminar platform location
Phase 1 SHALL establish `scripts/evals/platforms/laminar/` as the canonical source location for Laminar integration and SHALL update active imports or references to use that boundary.

#### Scenario: Laminar boundary is canonical
- **WHEN** a maintainer inspects the active source tree after phase 1
- **THEN** Laminar integration MUST live under `scripts/evals/platforms/laminar/` as the canonical platform boundary

### Requirement: Phase 1 SHALL reserve `providers/` for model providers only
Phase 1 SHALL treat `scripts/evals/providers/` as the model provider layer and SHALL not present Laminar platform integration as part of that folder's responsibility.

#### Scenario: Provider layer meaning is explicit
- **WHEN** a maintainer reads the source tree description or architecture docs after phase 1
- **THEN** `scripts/evals/providers/` MUST be described only as the model provider layer

### Requirement: Phase 1 SHALL align public architecture documentation with the new boundaries
Phase 1 SHALL update public documentation and architecture diagrams so they describe Laminar as an observability/eval platform, `run-evals` as the public command, the revised folder boundaries consistently, and the benchmark semantics as local repo logic rather than platform-owned behavior.

#### Scenario: Documentation tells one story
- **WHEN** a maintainer compares `README.md`, `AGENTS.md`, `scripts/evals/README.md`, and `PLAN.md`
- **THEN** those documents MUST describe the same public command, the same domain/provider/platform boundary meanings, and the same ownership of benchmark semantics
