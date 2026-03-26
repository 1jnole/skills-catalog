## Overview

This is a contract-refresh change for the existing `agents-bootstrap` skill. It does not edit the maintained skill package in this phase. It regenerates the approved brief using the local repo copy of `skill-contract-forge` and the current local `agents-bootstrap` package as the grounded package-shape authority.

## Workflow

Use `existing-skill-refactor`.

Reason:
- the target skill already exists under `packs/core/agents-bootstrap/`
- the goal is to refresh the approved brief, not to create a new skill or rewrite the package from scratch

## Local authoring authority

Use only repo-local materials for this refresh:
- `packs/core/skill-contract-forge/SKILL.md`
- `packs/core/agents-bootstrap/SKILL.md`
- `packs/core/agents-bootstrap/assets/AGENTS.managed.md`

Do not depend on any Codex-home skill copy for the refreshed brief.

## Decisions

### Preserve the package shape

The refreshed brief should keep:
- `SKILL.md`
- `assets/`

Reason:
- the current local package already owns a durable managed baseline in `assets/AGENTS.managed.md`
- the repo-local `skill-contract-forge` now explicitly teaches that a small but authoritative `assets/` surface must remain in `authoring.packageShape`

### Keep the boundary narrow

The refreshed brief should keep `agents-bootstrap` focused on synchronizing the managed block in the repository root `AGENTS.md` while excluding:
- ad-hoc edits outside managed markers
- OpenSpec workspace bootstrap or repair
- broader policy rewrites beyond the managed baseline
