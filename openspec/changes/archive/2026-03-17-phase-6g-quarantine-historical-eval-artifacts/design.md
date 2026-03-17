## Context

The repository already split active Promptfoo execution into `contract` and `uplift` suites, and the previous slug demoted the inherited `skill-contract-forge.yaml` path in docs and OpenSpec. The next minimal step is to make the filesystem match that statement so the active tests folder contains only active suites.

## Goals / Non-Goals

**Goals:**

- Establish a real quarantine area for Phase A.
- Remove the inherited `skill-contract-forge.yaml` file from the active Promptfoo tests surface.
- Keep the file content recoverable by moving it rather than deleting it.

**Non-Goals:**

- Quarantine all historical cases, fixtures, and helpers in this slug.
- Change any active Promptfoo config or command wiring.
- Recalibrate Promptfoo behavior.

## Decisions

### Decision 1 — Move, do not delete

The inherited suite is still useful as migration evidence, so this slug moves it to quarantine instead of deleting it.

### Decision 2 — Keep quarantine under `evals/`

The quarantine location stays under `evals/` so historical context remains near the system it came from, but outside the active runtime boundary.

### Decision 3 — Update references in the same slug

Any nearby README or plan references that still name the inherited suite should change in the same slug so the move does not create dangling guidance.

## Risks / Trade-offs

- [Risk] Archived OpenSpec artifacts will still mention the old location. -> Mitigation: treat archived slugs as historical records, not active layout guidance.
- [Risk] Moving one artifact at a time leaves other historical surfaces in place temporarily. -> Mitigation: keep this slug intentionally narrow and follow with additional quarantine slugs if needed.
- [Risk] A hidden active dependency on the inherited suite could break unexpectedly. -> Mitigation: rely on the earlier runtime-authority audit and verify no active configs or docs still depend on the old path.

## Migration Plan

1. Create `evals/_phase_a_quarantine/` with a short README.
2. Move `evals/engines/promptfoo/tests/skill-contract-forge.yaml` into the quarantine tree.
3. Update nearby docs and `PLAN.md` to reflect that the file is quarantined.
4. Verify that the active Promptfoo tests directory no longer contains the inherited suite.
