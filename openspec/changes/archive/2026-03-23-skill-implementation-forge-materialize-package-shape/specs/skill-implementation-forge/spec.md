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

#### Scenario: Approved contract carries package-shape authority

- **WHEN** a request stays in implementation-from-contract scope for one named skill
- **AND** the approved contract artifact includes `authoring.packageShape`
- **THEN** `skill-implementation-forge` SHALL treat that `packageShape` as the authority for which nearby support folders may be materialized
- **AND** it SHALL not widen the package beyond the files and folders justified by that contract

#### Scenario: Legacy contract omits package shape

- **WHEN** a request stays in implementation-from-contract scope for one named skill
- **AND** the approved contract artifact omits `authoring.packageShape`
- **THEN** `skill-implementation-forge` SHALL keep the implementation conservative by defaulting to `SKILL.md` only
- **AND** it SHALL not infer extra support folders purely from repo conventions or habit

#### Scenario: Agents package shape requires interface authority

- **WHEN** a request stays in implementation-from-contract scope for one named skill
- **AND** the approved contract artifact requires `agents` in `authoring.packageShape.supportFolders`
- **AND** the artifact omits `authoring.interface`
- **THEN** `skill-implementation-forge` SHALL stop and ask rather than inventing the metadata needed for `agents/openai.yaml`

#### Scenario: Terminal closure follows metadata validation

- **WHEN** `skill-implementation-forge` reaches trigger-path completion
- **THEN** it SHALL require the repo-local command `npm run validate:skill-metadata` before ending at `Skill implementation ready`
- **AND** it SHALL describe that validation gate as part of the implementation-phase closure rather than as downstream eval work
