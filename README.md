# Agent Skills Catalog

This repository stores a provider-agnostic skills catalog with:
- portable skill artifacts under `packs/`;
- a shared offline eval runner under `scripts/evals/`;
- repository-wide operating rules in `AGENTS.md`.

The previous eval runtime was intentionally removed.
The current path is a clean rebuild from scaffold-first contracts and workflow.

## Quick map
- `AGENTS.md` -- always-on repo rules
- `docs/catalog-authoring.md` -- what belongs in a skill vs AGENTS vs vault
- `plans/README.md` -- eval and skill-domain source precedence
- `scripts/evals/README.md` -- shared runner structure and commands
- `docs/skill-system/README.md` -- stabilized modeling decisions for `skill-forge` / `skill-eval-forge`

## Repository shape
```txt
/
|-- AGENTS.md
|-- README.md
|-- docs/
|-- packs/
|   `-- core/
|       |-- skill-forge/
|       |   |-- SKILL.md
|       |   `-- evals/
|       |       |-- evals.json
|       |       |-- files/
|       |       `-- runs/
|       |           `-- iteration-N/
|       |               |-- benchmark.json
|       |               `-- <case-id>/
|       |                   |-- with_skill/
|       |                   |-- without_skill/
|       |                   |-- outputs/
|       |                   |-- timing.json
|       |                   |-- grading.json
|       |                   `-- feedback.json
|       `-- skill-eval-forge/
|           `-- SKILL.md
|-- plans/
|-- scripts/
|   `-- evals/
|       |-- README.md
|       |-- read-evals.ts
|       `-- run-iteration.ts
`-- package.json
```

For authoring policy and eval scaffold decisions, use the docs above as source of truth.
