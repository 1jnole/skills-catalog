## MODIFIED Requirements

### Requirement: The skill is contract-driven and refuses hidden widening

`skill-implementation-forge` SHALL treat an approved contract artifact as the authoritative implementation input and SHALL refuse to redefine the contract or absorb downstream eval/runtime work.

#### Scenario: Implementation request is in scope

- **WHEN** a request provides a frozen contract for one named target skill
- **THEN** the skill SHALL stay within contract-driven implementation
- **AND** it SHALL allow `SKILL.md` plus nearby support files only when the frozen contract explicitly requires them

#### Scenario: Request widens into contract or eval work

- **WHEN** a request asks to renegotiate the contract, author Promptfoo-native evals, or change eval runtime architecture as part of the same step
- **THEN** the skill SHALL treat that widening as out of scope or stop-and-ask rather than silently absorbing it

#### Scenario: Approved contract carries repo-required frontmatter authority

- **WHEN** a request stays in implementation-from-contract scope for one named skill
- **THEN** the approved contract artifact SHALL be treated as the authority for canonical `skill.name` and `skill.description`
- **AND** implementation SHALL NOT infer missing frontmatter metadata from the current repo state or surrounding conversational context

#### Scenario: Terminal closure follows metadata validation

- **WHEN** `skill-implementation-forge` reaches trigger-path completion
- **THEN** it SHALL require the repo-local command `npm run validate:skill-metadata` before ending at `Skill implementation ready`
- **AND** it SHALL describe that validation gate as part of the implementation-phase closure rather than as downstream eval work

### Requirement: Missing contract and deictic targets trigger clarification

`skill-implementation-forge` SHALL require both an authoritative contract artifact and a clearly identified target skill before implementation begins.

#### Scenario: Deictic target is not enough for implementation

- **WHEN** the request asks to implement "this skill", "the current skill", or another deictic target instead of naming the skill explicitly
- **THEN** `skill-implementation-forge` SHALL stop and ask for the exact target skill rather than inferring it

#### Scenario: Contract artifact exists but is not specific enough

- **WHEN** a request provides a contract artifact but that artifact does not freeze the single job, target skill, outputs, or stop conditions clearly enough to guide implementation safely
- **THEN** `skill-implementation-forge` SHALL stop and ask rather than inventing the missing implementation boundary

#### Scenario: Contract artifact omits canonical skill description

- **WHEN** a request otherwise stays in implementation-from-contract scope
- **AND** the approved contract artifact omits canonical `skill.description`
- **THEN** `skill-implementation-forge` SHALL stop and ask rather than proceeding to implementation
- **AND** it SHALL treat that omission as missing implementation authority, not as a detail to infer later
