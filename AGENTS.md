# AGENTS.md

## Repository expectations

- Keep changes atomic, reviewable, and minimal-diff.
- Prefer repository-approved commands and gates over ad hoc alternatives.
- If acceptance criteria are missing and `done` cannot be verified, stop and ask.
- If a decision is non-critical, verifiable, and reversible, choose the default and record the assumption.

## Repository structure

- Treat `packs/` as portable skill artifacts.
- Keep skill folders shallow:
  - `SKILL.md`
  - optional `references/`
  - optional `assets/`
  - optional `scripts/`
  - optional `agents/`
  - optional `evals/` only when a skill explicitly owns eval definitions
- Do not place a shared repo eval harness inside a skill folder.

## OpenSpec workflow

- If the user explicitly says not to use OpenSpec for this task, do not use OpenSpec.
- If the user explicitly asks to use OpenSpec, use OpenSpec.
- Otherwise, prefer OpenSpec when the task needs scoped change artifacts, explicit acceptance criteria, or staged review.
- Keep OpenSpec project context and artifact rules in `openspec/config.yaml`.
- Do not use legacy `/prompts:openspec-*` commands.

Use OpenSpec by default when any of these are true:
- the change affects observable behavior or a public contract
- the change spans multiple files or subsystems
- the change touches tooling, CI, dependencies, auth, security, data model, or persistence
- the change needs explicit acceptance criteria, staged review, or rollback thinking

## Skill routing

Use the forge workflow for skill work in this repo:

1. `skill-contract-forge`
2. `skill-implementation-forge`
3. `skill-eval-forge`

### Phase rules

- Do not combine contract definition, implementation, and eval authoring in one pass unless explicitly requested.
- Do not start implementation without an approved contract artifact.
- Do not start eval authoring without both an approved contract artifact and an existing implementation.
- Do not renegotiate the contract inside implementation or eval.
- If a phase is missing a critical precondition, stop and ask.

## Eval defaults

- Treat `evals/engines/promptfoo/` as the active eval runtime boundary.
- Treat `evals/README.md` as the source of truth for the supported Promptfoo command surface.
- Treat `npm run promptfoo:validate` and `npm run promptfoo:run` as the canonical public Promptfoo entrypoints.
- Treat `without_skill` as an informational baseline, not a closure gate.

## Built-ins vs forge

- Forge skills are the normative workflow for skills in this repo.
- Built-in planning is optional support for exploration before entering a forge phase.
- `skill-creator` is a reference or fallback, not the governing workflow.
- `skill-installer` is operational support, not part of the functional forge pipeline.

## Stop and ask

Stop before proceeding when:
- repo root or target scope is ambiguous
- required OpenSpec artifacts are missing or inconsistent
- acceptance criteria or completion conditions are unclear
- instructions or contracts conflict
- the change affects auth, permissions, sessions, public contracts, build, CI, dependencies, data model, persistence, performance, or security
- the change has destructive risk such as migrations, deletions, irreversible renames, secret handling, or release-pipeline impact