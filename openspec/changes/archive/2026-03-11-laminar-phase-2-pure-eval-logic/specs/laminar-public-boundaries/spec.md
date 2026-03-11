## MODIFIED Requirements

### Requirement: Phase 1 SHALL align public architecture documentation with the new boundaries
Phase 1 SHALL update public documentation and architecture diagrams so they describe Laminar as an observability/eval platform, `run-evals` as the public command, the revised folder boundaries consistently, and the benchmark semantics as local repo logic rather than platform-owned behavior.

#### Scenario: Documentation tells one story
- **WHEN** a maintainer compares `README.md`, `AGENTS.md`, `scripts/evals/README.md`, and `PLAN.md`
- **THEN** those documents MUST describe the same public command, the same domain/provider/platform boundary meanings, and the same ownership of benchmark semantics
