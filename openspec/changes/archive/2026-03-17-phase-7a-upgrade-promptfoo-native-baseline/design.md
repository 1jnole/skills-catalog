## Context

This slug deliberately does one thing first: move the repository to the newer Promptfoo baseline before changing where eval authoring lives. That keeps runtime breakage attributable to the dependency bump rather than to authoring or dataset migration.

## Goals / Non-Goals

**Goals:**

- Upgrade Promptfoo to `0.121.2`.
- Declare the supported Node.js range needed by that Promptfoo baseline.
- Confirm the current three runtime surfaces still validate and replay offline.
- Preserve the existing Promptfoo-native runtime authority with no repo-owned execution layer.

**Non-Goals:**

- Moving eval authoring into `packs/core/skill-contract-forge/evals/evals.json`.
- Introducing sync tooling.
- Refreshing fixtures to hide incompatibilities.
- Adding any local runner or wrapper around `promptfoo eval`.

## Decisions

### Decision 1 — Upgrade first, migrate authority second

This slug isolates Promptfoo version movement from the later authoring-source migration so failures can be attributed cleanly.

### Decision 2 — Native Promptfoo remains the only runtime

The repo will continue to call `promptfoo validate` and `promptfoo eval` directly. No helper executable, custom engine, or grading wrapper is introduced as part of the upgrade.

### Decision 3 — Engine warnings are recorded, not masked

If Promptfoo `0.121.2` emits engine warnings in this workspace, the warnings are recorded as environment constraints. The slug does not work around them by pinning a local wrapper or by downgrading runtime semantics.

### Decision 4 — The repository declares the supported Node baseline explicitly

The repository manifest declares the supported Node.js range required by Promptfoo `0.121.2` so future installs fail fast or warn clearly before runtime drift is mistaken for Promptfoo behavior.

## Risks / Trade-offs

- [Risk] Promptfoo `0.121.2` may validate or replay differently. -> Mitigation: run all three validates and all three offline replays before subsequent slugs.
- [Risk] The workspace Node version may emit `EBADENGINE` warnings. -> Mitigation: keep the baseline upgrade if runtime commands still succeed, and document the warning as evidence.
- [Risk] Future installs may silently use an unsupported Node baseline. -> Mitigation: declare the supported Node range in the manifest during this slug.
- [Risk] A compatibility fix could spill into dataset semantics. -> Mitigation: restrict changes here to dependency and Promptfoo compatibility only.

## Migration Plan

1. Upgrade Promptfoo in the manifest and lockfile.
2. Declare the supported Node.js range in the manifest.
3. Run the existing Promptfoo validation and offline replay commands.
4. Apply only the smallest compatibility fixes required for Promptfoo `0.121.2`.
5. Record evidence and stop before any authoring-source migration.
