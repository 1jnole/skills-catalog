# Design: evals-phase-5-cases-fixtures

## Context

Phase 4 introduced a minimal Promptfoo pilot under `evals/cases/skill-forge/pilot-suite.v1.json`, but the larger useful case set still lives in `packs/core/skill-forge/evals/evals.json`. The current loader reads a single eval-definition JSON file, so Phase 5 should migrate the useful content into one canonical new-scaffold suite instead of introducing multi-file case composition mid-migration.

## Goals / Non-Goals

**Goals:**
- move the useful `skill-forge` eval definition into `evals/cases/skill-forge/`
- make one canonical suite file in the new scaffold consumable by the Promptfoo path
- make fixture ownership explicit for the migrated suite
- preserve a minimal-diff path that does not require a new eval-definition format

**Non-Goals:**
- introducing a new composed suite format such as `core/edge/regressions` file loading
- changing the legacy `run-evals` path authority in this change
- adding `previous-skill` or any new baseline modes

## Decisions

### Decision: keep a single canonical suite JSON in the new scaffold

The loader already expects one `EvalDefinition` JSON file. The change will create `evals/cases/skill-forge/suite.v1.json` as the canonical suite and move the useful inherited cases there.

Alternative considered: introduce multi-file case composition now.
Rejected because it would expand scope into loader and contract redesign during a migration phase that only needs the content moved.

### Decision: preserve `pilot-suite.v1.json` as a historical snapshot

The Phase 4 pilot file can remain as evidence of the minimal bootstrap, but the Promptfoo resolver defaults will move to `suite.v1.json`.

Alternative considered: overwrite `pilot-suite.v1.json` in place.
Rejected because keeping the smaller snapshot makes the Phase 4 bootstrap evidence explicit and avoids confusing the migration record.

### Decision: treat `skill-forge` fixtures as documentation-first unless a real external input is required

The useful inherited `skill-forge` cases are inline prompt/assertion definitions and do not currently need attached files. The fixture boundary will therefore be documented explicitly in `evals/fixtures/skill-forge/README.md` instead of inventing empty technical fixture files.

Alternative considered: create placeholder fixture JSON just to satisfy folder shape.
Rejected because it would add fake runtime inputs with no behavioral value.

## Risks / Trade-offs

- [Risk] Two suite files may confuse maintainers. → Mitigation: document `suite.v1.json` as canonical and `pilot-suite.v1.json` as historical.
- [Risk] A partial migration could leave the new flow covering only the old pilot. → Mitigation: update resolver defaults and tests to point at the canonical suite.
- [Risk] Future maintainers may assume fixtures were missed. → Mitigation: record clearly that no dedicated external fixtures survive for the current useful `skill-forge` suite.

## Migration Plan

1. Add the canonical `suite.v1.json` under `evals/cases/skill-forge/`.
2. Move the inherited useful cases into that suite.
3. Update Promptfoo resolver defaults and loader tests to use the new canonical file.
4. Update case and fixture READMEs to explain the new ownership.

## Open Questions

- None for this slice. The loader contract and migrated case source are already known.
