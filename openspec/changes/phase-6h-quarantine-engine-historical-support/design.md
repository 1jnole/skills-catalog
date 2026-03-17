## Context

Phase 6G established the quarantine area and removed the inherited legacy suite from the active Promptfoo tests directory. Two additional engine-level leftovers remain easy to isolate: the retired `assertions.cjs` helper and the historical pilot replay fixture. Neither file is part of the current supported runtime wiring.

## Goals / Non-Goals

**Goals:**

- Remove retired engine support artifacts from active runtime folders.
- Keep both files recoverable by moving them into quarantine instead of deleting them.
- Narrow the active `fixtures/` and `support/` surfaces to artifacts that still participate in the supported runtime.

**Non-Goals:**

- Rework supported fixtures used by `promptfoo:run:offline*`.
- Quarantine case-history files in this slug.
- Change Promptfoo configs or scripts.

## Decisions

### Decision 1 — Treat retired helper code like historical context

`assertions.cjs` remains useful as migration evidence, but because the supported runtime spec forbids depending on it, the file should not live under the active engine support path anymore.

### Decision 2 — Treat the pilot replay fixture as historical engine data

`pilot-model-outputs.json` is not wired into the supported offline commands, so it should move alongside other quarantined historical engine artifacts.

### Decision 3 — Keep the slug narrow

This slug only moves the clearly decoupled engine helper and pilot fixture. Case-history artifacts remain a separate follow-up change so review stays simple.

## Risks / Trade-offs

- [Risk] A hidden local workflow might still read one of the old paths manually. -> Mitigation: preserve file content in quarantine and keep the move documented in `PLAN.md`.
- [Risk] The `support/` directory may become empty after the move. -> Mitigation: leaving an empty directory in git is not required; only tracked content needs preserving.
- [Risk] Archived OpenSpec tasks still mention the old locations. -> Mitigation: archived artifacts remain historical records, not active layout authority.

## Migration Plan

1. Copy the retired helper and pilot fixture into the quarantine tree.
2. Remove the originals from the active engine folders.
3. Update `PLAN.md` to reflect that both engine artifacts are already isolated.
4. Verify that the active `support/` path no longer contains `assertions.cjs` and the active `fixtures/` path no longer contains `pilot-model-outputs.json`.
