<!-- BEGIN MANAGED: agents-bootstrap -->

# Agent instructions (managed)

## Repository expectations
- Use OpenSpec for non-trivial changes.
- Implement only what is defined by artifacts in `openspec/changes/<slug>/`, editing repo files required by those tasks.
- Keep changes atomic and reviewable (split large scopes into multiple slugs).

## Layered instructions
- Keep this root file short (discovery-safe).
- All operational details live in `openspec/AGENTS.override.md`.
- Nested overrides near specialized work take precedence.

## Prompt policy
- Stable defaults:
    - `/prompts:openspec-proposal`
    - `/prompts:openspec-apply`
    - `/prompts:openspec-archive`
- Experimental (`/prompts:opsx-*`) only when explicitly requested.

## Stop conditions (global)
Stop and ask if:
- `openspec/` is missing or inconsistent
- scope is unclear or acceptance criteria are missing
- instructions/contracts conflict
- a change requires elevated permissions beyond sandbox limits
- there is destructive risk (see override for the exact list)

## Execution mode
- Autonomous end-to-end execution is the default.
- Require explicit human approval before mutating actions only for critical decisions or destructive risk.
- All other changes proceed autonomously with `/review` and repository gates.

<!-- END MANAGED: agents-bootstrap -->

## Repo-specific additions

- Treat a change as non-trivial if it touches more than 1 file, changes observable behavior or contracts, touches tooling or dependencies, or carries meaningful refactor risk.
- If acceptance criteria are missing and `done` cannot be verified, stop and ask.
- If a decision is non-critical and verifiable, choose the documented default and record the assumption.

## Repository defaults

- Treat `packs/` as portable skill artifacts.
- Keep skill folders shallow: `SKILL.md`, then optional `references/`, `assets/`, `scripts/`, `agents/`, and `evals/` only when a skill explicitly owns eval definitions.
- Do not place a full shared eval harness inside a skill folder.
- Keep repo-wide policy here; keep specialized implementation detail closer to the work.

## Skill authoring policy

- Freeze the contract before editing `SKILL.md`.
- A valid skill must keep one job, one clear boundary, explicit stop conditions, and a stable completion point.
- If the workflow cannot be described as one job, split or narrow it before implementation.
- Do not infer a target skill from deictic phrases such as `this skill`, `the current skill`, or `the next skill` when the phase requires explicit identification.

## Forge workflow (normative repo policy)

The default repo workflow for skills is:

1. `skill-contract-forge`
2. `skill-implementation-forge`
3. `skill-eval-forge`

### Phase 1 — Contract
Use `skill-contract-forge` when the task is to define or refactor the contract of one skill.

- Objective: freeze the skill boundary before implementation
- Required input: enough specificity to define one skill safely; explicit target skill for refactor/rewrite
- Required output: `Eval Brief ready`

Do not use this phase to:
- implement the skill
- author eval coverage
- change eval/runtime architecture

### Phase 2 — Implementation
Use `skill-implementation-forge` when an approved contract artifact already exists and the task is to implement or refactor the skill itself from that contract.

- Objective: materialize one skill from an approved contract artifact without renegotiating it
- Required input: approved contract artifact + one explicit target skill
- Required output: `Skill implementation ready`

Do not use this phase to:
- redefine the contract
- author eval coverage
- change eval/runtime architecture

### Phase 3 — Eval
Use `skill-eval-forge` when an approved contract artifact and an existing implementation already exist and the task is to author or refactor eval coverage for that one named skill.

- Objective: align eval coverage to the approved contract artifact and the existing implementation
- Required input: approved contract artifact + existing implementation + enough repo-local eval context
- Required output: `Skill eval ready`

Do not use this phase to:
- redefine the contract
- implement or refactor the skill
- redesign eval/runtime architecture

### Global forge rules
- Do not combine contract definition, skill implementation, and eval authoring in one pass unless explicitly requested.
- Do not enter implementation without an approved contract artifact.
- Do not enter eval authoring without both an approved contract artifact and an existing implementation.
- Do not renegotiate the contract inside implementation or eval.
- If a phase is missing a critical precondition, stop and ask instead of inventing.

## Built-ins vs forge suite

Use a **repo-autonomous + fallback** model.

- Forge skills are the normative workflow for this repo.
- Built-in planning is optional support for exploration before entering a forge phase.
- `skill-creator` is a baseline reference and fallback, not the governing repo workflow.
- `skill-installer` is operational support outside the functional forge pipeline.

Do not treat built-ins as the authority for:
- phase boundaries
- terminal markers
- repo-specific guardrails
- handoff semantics

## Eval defaults

- The legacy eval runtime was intentionally removed and is not a source of truth.
- Treat `evals/engines/promptfoo/` as the active eval runtime boundary.
- Treat `evals/README.md` as the source of truth for the supported Promptfoo command surface.
- For `skill-contract-forge`, Promptfoo-native suites are the active case-definition authority.
- Skill-owned `evals/` folders are optional support material only and must not override active runtime suites unless a future spec explicitly says so.
- Treat `npm run promptfoo:run` and `npm run promptfoo:run:offline` as the canonical contract run entrypoints.
- If live and offline replay disagrees, live behavior wins.

## Model selection policy

Default:
- Use `gpt-5.4` for planning, architecture, ambiguity resolution, contract definition, and final review.

Fast-path:
- Use `gpt-5.4-mini` for exploration, read-heavy scans, large-file review, documentation processing, small refactors, and parallel worker tasks.

Escalation:
- If a task is ambiguous, multi-step, or requires important judgment, escalate from `gpt-5.4-mini` to `gpt-5.4`.
