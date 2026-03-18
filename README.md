# Skills Catalog

A spec-first catalog of reusable Codex skills, supporting docs, and eval assets.

This repository is organized around three ideas:
- `packs/` contains portable skill artifacts grouped by domain.
- `openspec/` governs non-trivial repository changes with a spec-first workflow.
- `evals/` contains the Promptfoo-first evaluation scaffold for validating skill behavior.

## Architecture

### 1. Skill catalog
`packs/` is the product surface of the repo.

Each skill is a shallow folder centered on `SKILL.md`, with optional supporting assets nearby:
- `SKILL.md`
- `references/`
- `assets/`
- `agents/`
- `scripts/`
- `evals/` only when the skill owns eval definitions

Current pack groups include:
- `packs/core/` for repo bootstrap and core workflow skills such as `skill-contract-forge`, `openspec-bootstrap`, and `agents-bootstrap`
- `packs/angular/skills/` for Angular-focused skills
- `packs/react/` for React-focused skills
- `packs/javascript/`, `packs/typescript/`, and `packs/zod/` for language and validation skills

The catalog is designed so consumers can install only the skills they need.

### 2. OpenSpec workflow layer
`openspec/` is the repository change-management layer.

It is used to:
- define non-trivial changes before implementation
- keep proposal, design, tasks, and resulting specs aligned
- archive completed changes into stable specs under `openspec/specs/`

Important pieces:
- `openspec/config.yaml`: workspace config
- `openspec/AGENTS.override.md`: OpenSpec operating rules for this repo
- `openspec/specs/`: stable repository capabilities
- `openspec/changes/archive/`: completed change history

Current stable specs include:
- `openspec-change-workspace-readiness`
- `skill-metadata-validation`

### 3. Evaluation runtime boundary
`evals/` is the stable home of the repository evaluation scaffold.

Promptfoo is the supported eval runtime for this repo. The active engine boundary lives under:
- `evals/engines/promptfoo/`

High-level shape:
- `evals/contracts/` for stable eval contracts
- `evals/engines/promptfoo/fixtures/` for reusable offline inputs and model outputs
- `evals/engines/promptfoo/` for engine-specific config, prompts, assertions, and generated outputs
- for `skill-contract-forge`, the active case-definition authority lives in the Promptfoo-native suites under `evals/engines/promptfoo/tests/`

See [evals/README.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/evals/README.md) for the current supported eval path.

### 4. Repository tooling
`scripts/` contains small repo-level utilities that support the catalog without becoming a separate framework.

Current tooling includes the skill metadata validator:
- [validate-skill-metadata.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/validate-skill-metadata.ts)
- [frontmatter.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/skill-metadata/frontmatter.ts)
- [validate-file.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/skill-metadata/validation/validate-file.ts)

The validator currently checks:
- frontmatter presence and YAML validity
- required `name` and `description`
- optional `metadata.short-description`
- `name` matching the containing skill directory

## Repository layout

```text
skills-catalog/
  packs/
    core/
    angular/
    react/
    javascript/
    typescript/
    zod/
  openspec/
    specs/
    changes/
  evals/
    contracts/
    engines/
      promptfoo/
  scripts/
    skill-metadata/
  AGENTS.md
  README.md
  package.json
```

## Working model

### For skill consumers
Install the specific skill folders you want into either:
- repo-scoped: `.codex/skills/<skill>/SKILL.md`
- user-scoped: `~/.codex/skills/<skill>/SKILL.md`

This keeps the catalog modular and pack-based.

### For repository contributors
Use OpenSpec for non-trivial changes.

In practice:
1. define the change in `openspec/changes/<slug>/`
2. implement only what the change artifacts require
3. verify with repo gates
4. archive the change so the resulting capability lands in `openspec/specs/`

The repo-specific operating rules live in:
- [AGENTS.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/AGENTS.md)
- [openspec/AGENTS.override.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/openspec/AGENTS.override.md)

## Commands

Core commands:
- `npm run test`
- `npm run test:run`
- `npm run validate:skill-metadata`

Promptfoo commands:
- `npm run promptfoo:validate`
- `npm run promptfoo:validate:uplift:with-skill`
- `npm run promptfoo:validate:uplift:without-skill`
- `npm run promptfoo:run`
- `npm run promptfoo:run:offline`
- `npm run promptfoo:run:uplift:with-skill`
- `npm run promptfoo:run:uplift:without-skill`
- `npm run promptfoo:run:offline:uplift:with-skill`
- `npm run promptfoo:run:offline:uplift:without-skill`

## What this repo optimizes for

- small, reviewable, spec-driven changes
- portable skill artifacts
- explicit validation boundaries
- low drift between implementation, specs, and eval scaffolding

## References

- [OpenAI: Testing Agent Skills Systematically with Evals](https://developers.openai.com/blog/eval-skills/)
- [OpenAI Codex CLI reference](https://developers.openai.com/codex/cli/reference/)
- [OpenAI Codex changelog](https://developers.openai.com/codex/changelog/)
- [OpenAI Codex: AGENTS.md guide](https://developers.openai.com/codex/guides/agents-md/)
- [OpenAI Codex: Agent skills](https://developers.openai.com/codex/skills/)
- [OpenAI: Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)


## Skill-forge workflow

The default skill-forge workflow is:

1. `skill-contract-forge`
    - defines or refactors the contract
    - stops at `Eval Brief ready`

2. `skill-implementation-forge`
    - implements or refactors the skill from the contract
    - stops at `Skill implementation ready`

3. `skill-eval-forge`
    - authors or refactors Promptfoo-native eval suites
    - stops at `Eval suites ready`

These phases are intentionally separated. Do not merge contract definition, skill implementation, and eval authoring into one inseparable step unless explicitly required.