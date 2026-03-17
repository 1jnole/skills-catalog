## Context

After `phase-8b` and `phase-8c`, the supported eval path is Promptfoo-native only. `skill-eval-forge` still encodes the removed `evals.json` and local-run-layout workflow, so it is misleading as an active core skill. The active `skill-contract-forge` suites also still use `skill-eval-forge` as a refactor/rewrite target, which keeps a deleted concept alive in the supported examples.

## Goals / Non-Goals

**Goals:**

- Remove `skill-eval-forge` from the active `packs/core/` catalog.
- Ensure active Promptfoo suites no longer name `skill-eval-forge`.
- Regenerate supported offline outputs so the active `generated/` folder no longer contains the removed skill name.
- Remove any empty directories caused by the deletion.

**Non-Goals:**

- Replacing `skill-eval-forge` with a new downstream-eval skill.
- Changing the semantics of `skill-contract-forge` routing; only the concrete example target changes.
- Reworking the broader pack taxonomy or README structure.

## Decisions

### Decision 1 — Delete the legacy skill instead of deprecating it in place

The repo already keeps historical context in git and archived OpenSpec changes. An active `SKILL.md` that teaches a removed workflow is more harmful than helpful, so `skill-eval-forge` should be removed entirely from `packs/core/`.

### Decision 2 — Replace test targets with a real supported skill

The existing `skill-contract-forge` refactor/rewrite prompts should continue to exercise the same routing path, but they should point at a real maintained skill. `openspec-bootstrap` is the recommended replacement because it exists under `packs/core/`, has a stable `SKILL.md`, and exercises the same “existing skill with docs” shape without depending on the legacy AGENTS managed-block skill.

### Decision 3 — Regenerate `generated/` outputs instead of keeping stale artifacts

The generated Promptfoo files are outputs, not source. They should either be absent or reflect the current suite contents. This slug removes the stale files and regenerates the supported offline outputs from the updated suites.

## Risks / Trade-offs

- [Risk] Removing `skill-eval-forge` could leave active prompts pointing to a missing skill. -> Mitigation: replace all active suite references in the same slug and verify with Promptfoo offline runs.
- [Risk] Generated outputs could continue to preserve stale references if not refreshed. -> Mitigation: delete and regenerate the supported offline outputs.
- [Risk] Empty directory cleanup could drift beyond the touched area. -> Mitigation: only remove empty directories directly caused by deleting `packs/core/skill-eval-forge/` or the regenerated output cleanup.

## Migration Plan

1. Remove `packs/core/skill-eval-forge/`.
2. Update active Promptfoo suites to target `openspec-bootstrap` instead.
3. Delete stale generated Promptfoo outputs and rerun the supported offline commands.
4. Verify no active references to `skill-eval-forge` remain outside archived history.
