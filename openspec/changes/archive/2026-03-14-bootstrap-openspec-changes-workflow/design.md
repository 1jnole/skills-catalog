## Context

This repository already has a partial OpenSpec setup: `openspec/config.yaml`, `openspec/AGENTS.override.md`, and active `openspec/specs/` content exist. The missing piece was `openspec/changes/`, which caused `openspec list --json` to fail before any downstream slug work could start. The bootstrap must fix that gap with the smallest possible diff and without reinitializing the repository.

## Goals / Non-Goals

**Goals:**
- Restore a usable OpenSpec change workspace in version control.
- Make standard OpenSpec preflight commands succeed in a clean checkout.
- Record evidence in the slug's `tasks.md` using the repo's required format.

**Non-Goals:**
- Rebuild or replace `openspec/config.yaml` or `openspec/AGENTS.override.md`.
- Modify existing specs under `openspec/specs/`.
- Introduce any product, eval, CI, or dependency changes.

## Decisions

### Keep the existing OpenSpec foundation and only normalize the missing workspace
The repository already contains a valid OpenSpec configuration surface, so the change will not run `openspec init` or rewrite existing OpenSpec files. Instead, it will use a minimal tracked workspace under `openspec/changes/` and validate that the CLI can operate normally afterward.

**Alternative considered:** re-run `openspec init`.
**Why not chosen:** it is broader than necessary and creates avoidable drift risk against the repo's existing OpenSpec files.

### Preserve `openspec/changes/` in version control with a placeholder file
The implementation will keep a tracked placeholder in `openspec/changes/` so the directory remains present even when there are no active slugs after archival.

**Alternative considered:** rely only on active change folders.
**Why not chosen:** once the last change is archived, git would not preserve an empty directory and the original failure mode could return.

### Use the slug's own artifacts as bootstrap evidence
The bootstrap verification will be recorded inside this change's `tasks.md` using the command/result/date/note format required by the repo override.

**Alternative considered:** external notes or ad hoc shell output only.
**Why not chosen:** the repo requires evidence to live in `tasks.md`.

## Risks / Trade-offs

- **Placeholder-only persistence may look redundant** -> Keep the file minimal and document its purpose in the slug tasks.
- **CLI behavior could differ between OpenSpec versions** -> Run the full preflight immediately after normalization and record exact results.
- **Bootstrap scope could grow into broader OpenSpec cleanup** -> Keep the slug limited to workspace readiness and defer any broader alignment to later slugs.

## Migration Plan

1. Normalize `openspec/changes/` so it remains tracked.
2. Complete and validate this slug's OpenSpec artifacts.
3. Run OpenSpec preflight commands and capture evidence in `tasks.md`.
4. Validate the slug with `openspec validate "<slug>" --type change`.

Rollback is trivial: remove the placeholder file and this slug if the repository decides not to keep OpenSpec change history in git.

## Open Questions

None for this bootstrap slug.
