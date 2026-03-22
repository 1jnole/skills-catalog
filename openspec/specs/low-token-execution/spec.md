# low-token-execution Specification

## Purpose
Define the operational boundary for compact multi-step execution that reduces token and context waste without lowering validation quality.
## Requirements
### Requirement: `low-token-execution` exists as a compact multi-step execution skill

The repository SHALL provide a core skill named `low-token-execution` for compact execution of one multi-step unit of work when the main risk is token and context waste rather than missing domain authority.

`low-token-execution` SHALL only trigger when the primary job is executing one bounded multi-step task whose `done` criteria can be frozen before heavy implementation begins.

#### Scenario: Compact execution request has a clear unit and a freezeable `done`

- **WHEN** the request is primarily about carrying one bounded multi-step task to completion
- **AND** the user can define a short, stable `done` checklist before execution starts
- **THEN** `low-token-execution` SHALL remain in compact-execution scope
- **AND** it SHALL allow completion at the exact marker `Execution compacted`

#### Scenario: Request does not stay in trigger scope

- **WHEN** `low-token-execution` routes a request as non-trigger or stop-and-ask
- **THEN** it SHALL NOT end that response with `Execution compacted`

#### Scenario: Trivial task is not a compact-execution trigger

- **WHEN** the request is a trivial single-step task with no meaningful risk of context sprawl
- **THEN** `low-token-execution` SHALL treat that request as non-trigger rather than wrapping it in a compact-execution workflow

#### Scenario: Missing or unstable `done` requires clarification

- **WHEN** the request is still primarily multi-step execution
- **AND** the unit of work or success criteria cannot be frozen clearly enough to compact safely
- **THEN** `low-token-execution` SHALL stop and ask rather than improvising a moving target

#### Scenario: Non-trivial strategy choice requires clarification

- **WHEN** multiple execution strategies remain live
- **AND** the choice has meaningful tradeoffs for scope, risk, or verification
- **THEN** `low-token-execution` SHALL stop and ask rather than silently picking one and pretending the task was stable

### Requirement: `low-token-execution` reduces reopened context without lowering validation quality

`low-token-execution` SHALL optimize for compact execution by reducing repeated context loading, repeated plan restatement, and unnecessarily broad verification, while preserving sufficient validation quality.

#### Scenario: The skill freezes `done` before heavy execution

- **WHEN** `packs/core/low-token-execution/SKILL.md` is reviewed for execution procedure
- **THEN** it SHALL require a short `done` checklist before heavy work begins
- **AND** it SHALL keep that checklist stable unless a real blocker or contradiction appears

#### Scenario: The skill prefers focused verification first

- **WHEN** verification is needed
- **THEN** `low-token-execution` SHALL prefer the narrowest useful verification first
- **AND** it SHALL widen to the full suite only after the focused check passes or broader coverage is materially needed

#### Scenario: The skill does not trade rigor for brevity

- **WHEN** a request pressures the agent to go faster, use fewer tokens, or skip straight to the answer
- **THEN** `low-token-execution` SHALL NOT reinterpret that pressure as permission to drop necessary review or validation

#### Scenario: The skill closes one unit before opening the next

- **WHEN** a bounded unit of work reaches its defined `done`
- **THEN** `low-token-execution` SHALL prefer closing or archiving that unit before opening another substantial unit unless parallelism is materially justified

#### Scenario: Already-applied closeout state is handled minimally

- **WHEN** a closeout step for the active unit reports that the target state is already applied or already clean
- **THEN** `low-token-execution` SHALL prefer the smallest deterministic reconciliation step
- **AND** it SHALL revalidate closure without reopening the whole plan or widening the active unit

### Requirement: `low-token-execution` stays in its own operational boundary

The repository SHALL keep `low-token-execution` aligned to operational execution discipline rather than broad review, product strategy, or architecture design.

#### Scenario: Deep code review is out of scope as the primary job

- **WHEN** the primary task is bug-finding code review, contract review, or threat modeling
- **THEN** `low-token-execution` SHALL treat that request as non-trigger rather than pretending compact execution is the main job

#### Scenario: Product or architecture ambiguity remains primary

- **WHEN** the main problem is deciding product direction, architecture, or a broad refactor path
- **THEN** `low-token-execution` SHALL stop and ask or defer rather than disguising unresolved strategy work as compact execution

### Requirement: `low-token-execution` preserves its own response boundary

The repository SHALL keep `low-token-execution` aligned to its own operational response contract rather than to the response envelope of another skill.

#### Scenario: The skill documents routing and closure

- **WHEN** `packs/core/low-token-execution/SKILL.md` is reviewed for routing and completion behavior
- **THEN** it SHALL describe `low-token-execution` in its own compact-execution terms
- **AND** it SHALL NOT require `Classification:` or `Workflow:` response headers unless a future `low-token-execution` contract explicitly adds them
- **AND** it SHALL keep `Execution compacted` exclusive to valid trigger-path completion

### Requirement: The skill package remains shallow until downstream eval work exists

The `low-token-execution` package SHALL remain a shallow skill package in this slug and SHALL NOT absorb Promptfoo-native eval assets yet.

#### Scenario: Package structure is reviewed

- **WHEN** `packs/core/low-token-execution/` is reviewed
- **THEN** the package SHALL contain `SKILL.md`
- **AND** it SHALL NOT add an `evals/` subtree, Promptfoo configs, provider adapters, fixtures, generated outputs, or shared runner tooling in this slug

