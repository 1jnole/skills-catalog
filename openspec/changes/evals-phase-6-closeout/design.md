# Design: evals-phase-6-closeout

## Context

The command-surface change makes the new path operational, but Phase 6 must also leave the repository honest: active docs should describe one supported path, historical Laminar code should be clearly marked as non-primary, and the remaining validation should protect the new system rather than the retired flow.

## Goals / Non-Goals

**Goals:**
- define a short final supported-path document
- mark historical docs and code boundaries clearly
- replace historical smoke assumptions with final-path validation
- list deferred migration debt explicitly

**Non-Goals:**
- deleting every historical source file in the repo
- redesigning benchmark, scoring, or the engine adapter
- introducing new CI workflows or observability systems

## Decisions

### Decision: close out with documentation plus validation, not large source deletion

The repo no longer has a large `compatibility/` folder to remove, and some Laminar code can remain as historical compatibility as long as it no longer defines the supported path. The closeout therefore focuses on honest docs, package surface, and validation instead of sweeping source deletion.

Alternative considered: delete all Laminar and inherited code now.
Rejected because that would be a larger destructive cleanup than needed to satisfy the explicit Fase 6 closeout criteria.

### Decision: add a deferred-debt note instead of silently omitting out-of-scope items

Phase 6 should end with a short explicit note for items such as `previous-skill`, a second engine, extra observability, and broader CI automation so the migration does not imply those were accidentally forgotten.

Alternative considered: rely only on migration notes.
Rejected because the final supported-path state should remain understandable without rereading every migration phase file.

## Risks / Trade-offs

- [Risk] Historical Laminar code may still be mistaken for supported code. → Mitigation: mark its README explicitly as historical compatibility and remove it from active command docs.
- [Risk] Validation may still accidentally protect old behavior. → Mitigation: replace smoke assumptions that hardcode `packs/core/.../evals.json` or the Laminar runner as the supported path.
- [Risk] A final supported-path doc may drift from the code. → Mitigation: verify it alongside the command and smoke checks in the same change.

## Migration Plan

1. Add the final supported-path and deferred-debt docs.
2. Update active READMEs and historical READMEs to reflect the closed migration state.
3. Rewrite the smoke validation around the final command surface.
4. Record closeout evidence in the phase plan and OpenSpec tasks.

## Open Questions

- None. The closeout scope is documentary and verification-focused.
