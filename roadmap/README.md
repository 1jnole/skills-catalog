# Laminar Migration Roadmap

This folder contains the execution documents for the Laminar migration. The architecture, rationale, and Mermaid diagrams live in [PLAN.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/PLAN.md). The files here translate that plan into phase-by-phase tasks with validation gates.

## How to use this folder

Work through the phases in order. Do not start the next phase until the current phase reaches its `Done Gate`.

1. [Phase 0](C:/Users/Jorge/WebstormProjects/skills-catalog/roadmap/laminar-migration-phase-0-tasks.md)
   Stabilize the current runner state, classify active vs legacy vs stale pieces, and freeze the parity baseline.
   Canonical baseline note: [Phase 0 Baseline](C:/Users/Jorge/WebstormProjects/skills-catalog/roadmap/laminar-migration-phase-0-baseline.md)
2. [Phase 1](C:/Users/Jorge/WebstormProjects/skills-catalog/roadmap/laminar-migration-phase-1-tasks.md)
   Neutralize naming and boundaries: `run-evals`, `platforms/laminar`, and public architecture cleanup.
3. [Phase 2](C:/Users/Jorge/WebstormProjects/skills-catalog/roadmap/laminar-migration-phase-2-tasks.md)
   Freeze source of truth, extract pure scoring/gates/benchmark logic, and define neutral `run.json`.
4. [Phase 3](C:/Users/Jorge/WebstormProjects/skills-catalog/roadmap/laminar-migration-phase-3-tasks.md)
   Integrate Laminar as the supported observability/eval platform and retire the legacy runner after parity.

## Rules

- `skill-forge` is the only migration pilot until parity is proven.
- `PLAN.md` is the architecture/source-of-truth document for the migration.
- These roadmap files are operational documents: objective, end state, task list, validation, risks, done gate, and assumptions.
- If a phase changes the intended architecture, update [PLAN.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/PLAN.md) first or in the same change.
