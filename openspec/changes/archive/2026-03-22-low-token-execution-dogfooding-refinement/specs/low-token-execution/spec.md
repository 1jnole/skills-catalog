## MODIFIED Requirements

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
