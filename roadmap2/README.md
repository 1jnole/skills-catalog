# Phase 3 Preparation Workspace

This folder prepares Phase 3 of the Laminar migration before implementation starts.

`PLAN.md` remains the architecture and source-of-truth document. The files in `roadmap2/` exist to turn the revised Phase 3 contract into explicit agreements, gap checks, tangible task batches, and validation gates before a new implementation change is opened.

## How to use this folder

Read these files in order:

1. [Phase 3 Agreements](C:/Users/Jorge/WebstormProjects/skills-catalog/roadmap2/phase-3-agreements.md)
   Resolve the operational agreements, corner cases, and edge cases first.
2. [Phase 3 Batch 0 Readiness](C:/Users/Jorge/WebstormProjects/skills-catalog/roadmap2/phase-3-batch-0-readiness.md)
   Freeze the implementation defaults that must be closed before Batch 1 starts.
3. [Phase 3 Batch 1 Boundary](C:/Users/Jorge/WebstormProjects/skills-catalog/roadmap2/phase-3-batch-1-boundary.md)
   Freeze the Laminar boundary shape before active routing starts.
4. [Phase 3 Plan Alignment](C:/Users/Jorge/WebstormProjects/skills-catalog/roadmap2/phase-3-plan-alignment.md)
   Confirm that the preparation work covers every requirement in `PLAN.md`.
5. [Phase 3 Task Batches](C:/Users/Jorge/WebstormProjects/skills-catalog/roadmap2/phase-3-task-batches.md)
   Break the implementation into tangible, gated batches.
6. [Phase 3 Gates and Parity](C:/Users/Jorge/WebstormProjects/skills-catalog/roadmap2/phase-3-gates-and-parity.md)
   Lock the readiness gate, batch gates, parity policy, and final done gate.

## Rules

- Do not implement Phase 3 directly from the old `roadmap/laminar-migration-phase-3-tasks.md` file without first checking these preparation docs.
- Keep `skill-forge` as the only migration pilot.
- Do not broaden the contract with new CLI options or generic platform abstractions unless the revised Phase 3 contract explicitly requires it.
- If the preparation docs discover architectural drift, fix `PLAN.md` before opening implementation work.
