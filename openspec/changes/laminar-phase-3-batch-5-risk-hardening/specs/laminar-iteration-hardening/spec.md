# laminar-iteration-hardening Specification

## ADDED Requirements

### Requirement: The repository SHALL prevent concurrent mutation of the same iteration
The supported eval flow SHALL fail fast when another process is already updating the same `iteration-N` workspace.

#### Scenario: Existing iteration is already locked
- **WHEN** a maintainer starts a run against an iteration that is already owned by another live process
- **THEN** the command MUST fail before mutating that iteration
- **AND** the error MUST state that the iteration is already in use

#### Scenario: Stale iteration lock is reclaimed
- **WHEN** a lock file exists for an iteration but its recorded owner PID is no longer alive
- **THEN** the runner MUST reclaim that stale lock before continuing
- **AND** the supported flow MUST keep using the same local `iteration-N` contract

### Requirement: Historical helper compatibility SHALL remain available without redefining the supported path
When Batch 5 moves legacy helper implementations outside the supported artifact path, the repository SHALL preserve compatibility for old internal import paths without making those paths the supported implementation surface.

#### Scenario: Old helper path is imported
- **WHEN** existing code imports a historical legacy helper from its pre-Batch-5 path
- **THEN** the import MUST still resolve through a compatibility shim
- **AND** the historical implementation MUST remain owned by `scripts/evals/run/historical/`

### Requirement: Nearby docs SHALL reflect the hardened Batch 5 layout
The repository SHALL update nearby operational docs so they describe the historical helper layout and supported path accurately after residual-risk hardening.

#### Scenario: Maintainer reads Batch 5-adjacent docs
- **WHEN** a maintainer reads the baseline migration note or eval runner README
- **THEN** those docs MUST describe legacy helper ownership using the historical path
- **AND** they MUST NOT imply that the supported flow still owns those legacy helpers
