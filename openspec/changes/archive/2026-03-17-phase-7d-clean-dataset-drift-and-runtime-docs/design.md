## Context

The repo has accumulated two different stories about eval authoring: the skill-local direction that matches Agent Skills and the older `evals/cases/skill-contract-forge/suite.v1.json` path. This slug removes the ambiguity after the new source and sync guardrails exist.

## Goals / Non-Goals

**Goals:**

- Leave exactly one active authoring source for `skill-contract-forge`.
- Clean the duplicated case entry.
- Update docs to describe the active Promptfoo runtime and the skill-local authoring source together.

**Non-Goals:**

- Changing Promptfoo runtime semantics.
- Reworking historical quarantine artifacts beyond making their status explicit.
- Adding any local runner, wrapper, or offline harness docs.

## Decisions

### Decision 1 — `suite.v1.json` stops being active

The file is retired as an active authority once the skill-local authoring source and sync/check flow exist.

### Decision 2 — Pointer docs are acceptable, double authority is not

The old `evals/cases/skill-contract-forge/` directory may retain lightweight pointer documentation, but it must no longer look like a second canonical dataset.

### Decision 3 — Runtime docs repeat the no-runner boundary

Every updated runtime doc should say explicitly that the repo does not use a local runner around Promptfoo.

## Risks / Trade-offs

- [Risk] Some docs may still mention `suite.v1.json`. -> Mitigation: run repository-wide searches for the active path after updates.
- [Risk] Historical files could still be mistaken for supported assets. -> Mitigation: keep quarantine references explicit and narrow.
- [Risk] The skill-local path could be mistaken for runtime ownership. -> Mitigation: repeat that runtime stays under `evals/engines/promptfoo/`.

## Migration Plan

1. Remove the duplicate dataset entry.
2. Retire `suite.v1.json` as an active source.
3. Convert old case docs into pointers to the new authoring source.
4. Update top-level eval and engine docs to reflect the new authority split.
