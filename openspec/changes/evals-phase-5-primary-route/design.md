# Design: evals-phase-5-primary-route

## Context

Phase 4 already documented the Promptfoo path as the minimal operational reference for the smaller pilot. Phase 5 extends that state to the canonical useful `skill-forge` suite so the new scaffold becomes the primary path, while the inherited `packs/core` layout remains only as transitional compatibility.

## Goals / Non-Goals

**Goals:**
- make the canonical `evals/cases/skill-forge/suite.v1.json` plus Promptfoo path the documented primary route
- keep the old `packs/core/skill-forge/evals/` path visible only as compatibility history for this skill
- avoid changing public CLI contracts while updating the operational guidance

**Non-Goals:**
- remove the inherited files or compatibility path in this change
- rename the `run-promptfoo-pilot` command in Phase 5
- switch the generic legacy path resolver defaults used by `run-evals`

## Decisions

### Decision: document the primary route with explicit `--file` or Promptfoo resolver usage

The docs will present the new-scaffold suite file and the Promptfoo command as the primary operational path for `skill-forge`, rather than changing the generic inherited path resolver used by `run-evals`.

Alternative considered: change the shared resolver defaults globally now.
Rejected because it would change broader path behavior for the inherited runner and expand scope beyond the `skill-forge` closeout.

### Decision: describe inherited `packs/core` evals as transitional compatibility

The inherited layout will remain in the repo, but the docs will explicitly describe it as non-primary for `skill-forge`.

Alternative considered: delete or archive the inherited path in the same slice.
Rejected because final legacy retirement belongs to the follow-up phase.

## Risks / Trade-offs

- [Risk] The command name `run-promptfoo-pilot` still sounds transitional. → Mitigation: document that the command is the current primary path for `skill-forge` without renaming the contract in this slice.
- [Risk] Maintainers may still use the inherited `packs/core` file by habit. → Mitigation: update both new and inherited READMEs so the route status is unambiguous.
- [Risk] The repo root README may stay silent about eval flow. → Mitigation: add a small repo-level note only if it improves discoverability without widening scope.

## Migration Plan

1. Update the new-scaffold READMEs to point at the canonical suite.
2. Mark the inherited `packs/core/skill-forge/evals/` path as transitional compatibility.
3. Record closeout evidence in the OpenSpec tasks and migration notes.

## Open Questions

- None for this slice. The primary-path decision is documentation and usage, not a CLI rename.
