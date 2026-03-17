## Context

The repository already encoded the supported architecture: authoring lives with the skill, runtime lives under Promptfoo, and there is no local runner. The remaining clutter is structural and documentary: quarantine-era files inside `evals/`, pointer README files that only explain retired paths, and empty directories left behind by previous migrations.

## Goals / Non-Goals

**Goals:**

- Remove historical eval artifacts from the active repo tree under `evals/`.
- Remove empty directories and low-signal README files under `evals/`.
- Keep the active docs explicit about the supported authoring/runtime split after the purge.
- Remove or heavily trim `PLAN.md` so it stops narrating transitional states as live guidance.

**Non-Goals:**

- Changing Promptfoo configs, tests, fixtures, or skill behavior.
- Preserving a replacement `legacy/` or `quarantine/` folder elsewhere in the repo.
- Rewriting archived OpenSpec artifacts.

## Decisions

### Decision 1 — Historical eval residue leaves the active tree entirely

The active repository no longer keeps quarantined eval artifacts under `evals/`. Historical recovery is delegated to git history and archived OpenSpec changes instead of an in-tree quarantine folder.

### Decision 2 — Only boundary docs with current operational value survive

README files that define active boundaries stay. Pointer or stub README files that only explain removed paths are folded into neighboring active docs and then deleted.

### Decision 3 — Empty directories are removed, not documented

A directory with no active files and no meaningful boundary role should not remain in the repo tree. The cleanup removes the directory rather than preserving it with placeholder text.

### Decision 4 — `PLAN.md` stops acting like an active migration board

Because the quarantine phase is already complete, `PLAN.md` should either be reduced to a short non-normative note or removed if it no longer serves a live operational purpose.

## Risks / Trade-offs

- [Risk] Some team members may still expect historical eval residue inside `evals/`. -> Mitigation: keep active docs explicit that history now lives in git and archived OpenSpec changes.
- [Risk] Purging `PLAN.md` may remove useful narrative context. -> Mitigation: preserve the real decision trail in archived OpenSpec artifacts and keep only a minimal note if needed.
- [Risk] Removing pointer READMEs could make old paths less discoverable. -> Mitigation: fold the only useful path notes into `evals/README.md` and `evals/cases/README.md` before deletion.

## Migration Plan

1. Update the stable specs so they no longer assume quarantined historical artifacts remain in-tree.
2. Update active eval docs to remove references to `_phase_a_quarantine/` and deleted pointer files.
3. Delete `evals/_phase_a_quarantine/`, the selected README stubs, and the known empty directories.
4. Rewrite or remove `PLAN.md`.
5. Validate that no active path still references purged artifacts and that `evals/` contains no empty directories.
