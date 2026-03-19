## ADDED Requirements

### Requirement: The repository provides a tracked repo-scoped subagent baseline

The repository SHALL provide a tracked repo-scoped Codex subagent baseline under `.codex/` that contributors can use without creating user-scoped configuration first.

#### Scenario: Repo baseline files are reviewed

- **WHEN** a contributor reviews the repository root for Codex configuration
- **THEN** the repository SHALL include a tracked `.codex/config.toml`
- **AND** the repository SHALL include tracked custom agent files under `.codex/agents/`
- **AND** the repository SHALL keep unrelated `.codex/` runtime state ignored by git

### Requirement: The repo baseline optimizes for low-cost read-heavy delegation

The tracked repo-scoped subagent baseline SHALL optimize for low-cost exploration and review tasks instead of write-heavy automation.

#### Scenario: Repo subagent defaults are inspected

- **WHEN** `.codex/config.toml` and the tracked `.codex/agents/*.toml` files are reviewed together
- **THEN** the baseline SHALL set conservative concurrency defaults for subagent execution
- **AND** the tracked custom agents SHALL use read-only sandboxing
- **AND** the tracked custom agents SHALL target `gpt-5.4-mini`
- **AND** the baseline SHALL avoid shipping write-capable repo-default agents

### Requirement: The repository documents the intended day-to-day subagent workflow

The repository SHALL document which day-to-day tasks the tracked subagents are meant to handle and the expected cost trade-off.

#### Scenario: Contributor guidance is reviewed

- **WHEN** a contributor reads `README.md` together with the tracked `.codex/` baseline
- **THEN** the docs SHALL identify the repo mapping, OpenSpec preflight, and Promptfoo drift-review use cases
- **AND** the docs SHALL describe the baseline as a way to shift read-heavy work away from the main frontier agent
- **AND** the docs SHALL not claim guaranteed total-token savings for every task
