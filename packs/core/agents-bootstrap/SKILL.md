---
name: agents-bootstrap
description: "Syncs or refreshes the managed root `AGENTS.md` block from a maintained baseline so repo-level guardrails stay deterministic. Use when the repository root `AGENTS.md` needs its managed section bootstrapped, refreshed after baseline drift, or standardized without touching user-authored sections. Do not use for ad-hoc edits outside managed markers, OpenSpec workspace bootstrap, or broader policy rewrites beyond the current managed baseline."
metadata:
  short-description: Sync the managed root AGENTS block from a baseline
---
# agents-bootstrap

## Overview
Synchronize the managed block in the repository root `AGENTS.md` from the maintained baseline in `assets/AGENTS.managed.md`.

This skill is for deterministic managed-block synchronization only: preserve all non-managed content, update only the managed section, and keep root guidance compact and discovery-safe.

## Use When
- A task asks to bootstrap or refresh the managed block in the repository root `AGENTS.md`.
- A task asks to realign the root managed instructions after the maintained baseline changed.
- A task asks to standardize repo-level guardrails inside the managed markers without rewriting user-owned sections.
- A task needs to create the managed markers in a root `AGENTS.md` that is missing them while preserving surrounding content.

## Do Not Use When
- The task asks for ad-hoc edits outside the managed markers in `AGENTS.md`.
- The task is OpenSpec workspace bootstrap or repair such as `openspec/config.yaml` or `openspec/AGENTS.override.md` work. Use `openspec-bootstrap`.
- The task is about nested override authoring near specialized work instead of the root managed block.
- The task is a broader repository policy rewrite that goes beyond synchronizing the current managed baseline.

## Stop And Ask When
- It is unclear which repository root owns the target `AGENTS.md`.
- The request mixes managed-block sync with unrelated `AGENTS.md` rewrites in one inseparable pass.
- The canonical managed baseline is missing or ambiguous.
- Repository policy forbids managed-block automation for this repo.

## Procedure
1. Resolve the repository root and confirm the target file is the root `AGENTS.md`.
2. Read `assets/AGENTS.managed.md` and treat it as the canonical managed baseline.
3. Inspect the current root `AGENTS.md`, if present, and detect whether the managed markers already exist.
4. If the managed markers exist, replace only the content between:
   - `<!-- BEGIN MANAGED: agents-bootstrap -->`
   - `<!-- END MANAGED: agents-bootstrap -->`
5. If the managed markers do not exist, insert the managed block without deleting surrounding user-authored content.
6. Preserve all non-managed content unchanged. Do not rewrite ad-hoc repo rules outside the managed block.
7. If the baseline itself is being updated as part of the same bounded task, keep `assets/AGENTS.managed.md` and the managed root block aligned to the same text.
8. Validate the result by checking marker integrity, managed-block alignment with the baseline, compact root guidance, and preservation of non-managed content.

## Guardrails
- Never modify content outside managed markers in `AGENTS.md`.
- Never invent baseline authority, repo ownership, or missing policy decisions.
- Keep root guidance compact and reference `openspec/AGENTS.override.md` without owning its lifecycle.
- Keep repo-specific custom rules outside the managed block.
- Prefer minimal, reviewable diffs.
- Route OpenSpec bootstrap work to `openspec-bootstrap` instead of absorbing it here.

## Outputs
- Updated repository root `AGENTS.md` with the managed block synchronized to `assets/AGENTS.managed.md`.
- Preserved user-authored content outside the managed markers.
- If the bounded task changes the managed baseline itself, aligned `assets/AGENTS.managed.md` and the managed root block to the same text.

## Done When
- The repository root `AGENTS.md` contains the managed block with the expected begin and end markers.
- The managed block text matches `assets/AGENTS.managed.md`.
- User-authored content outside the managed markers is preserved unchanged.
- Any OpenSpec bootstrap follow-up remains explicitly routed to `openspec-bootstrap` instead of being absorbed here.

## Edge cases
- `AGENTS.md` exists but markers are missing: insert the managed block without deleting user content.
- `AGENTS.md` does not exist yet: create it with the managed block and only the minimum surrounding structure the task requires.
- OpenSpec files are missing, but the managed root block references them: keep the managed root guidance and route setup work to `openspec-bootstrap`.

## References
- Managed block baseline: `assets/AGENTS.managed.md`
