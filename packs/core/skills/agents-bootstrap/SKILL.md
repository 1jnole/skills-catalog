---
name: agents-bootstrap
description: |
  Create or refresh repo-local Codex root agent instructions using a managed block in `AGENTS.md`.

  Use when:
  - The user asks to bootstrap or update the root `AGENTS.md` managed section.
  - The managed block in `AGENTS.md` drifted and needs synchronization with the latest baseline.
  - Repo-level guardrails, gate, and stop conditions must be standardized.

  Don't use when:
  - The user only wants ad-hoc edits outside the managed block.
  - The task is to create/update `openspec/config.yaml` or `openspec/AGENTS.override.md` (use `openspec-bootstrap`).
  - The repository has explicit policy that forbids managed-block automation.
  - Required preconditions (`npm run verify`) are intentionally out of scope.

  Outputs:
  - `AGENTS.md` with an updated managed block between the required markers.
  - Updated managed-block template in `assets/` when baseline policy changed.

  Success criteria:
  - Managed content reflects the latest baseline policy for root instructions.
  - Edits are minimal and preserve all non-managed content.
  - Stop conditions are enforced instead of guessing missing contracts.
metadata:
  short-description: Sync AGENTS managed block (root-only)
---
## Purpose
Create or refresh compact, deterministic repository-level instructions using only:
- `AGENTS.md` at repo root (managed block only)

Keep root guidance truncation-safe and preserve all non-managed content.

## Inputs
- Target repo root (prefer Git root).
- Required gate command: `npm run verify`.
- Canonical baseline content:
  - Current managed block policy from root `AGENTS.md` (latest agreed version).

## Outputs
- Updated `AGENTS.md` with managed block markers:
  - `<!-- BEGIN MANAGED: agents-bootstrap -->`
  - `<!-- END MANAGED: agents-bootstrap -->`
- If baseline changed, synchronized template:
  - `assets/AGENTS.managed.md`

## Preconditions / assumptions
1) Repo root is known.
2) `npm run verify` exists in repo scripts.
3) Team permits managed-block updates in `AGENTS.md`.

If any precondition fails, stop and ask instead of guessing.

## Steps
1) Resolve repo root and inspect existing files.
Input: working directory and existing `AGENTS.md`.
Action: read current content and detect marker presence.
Output: baseline + delta summary.

2) Run preflight checks.
Input: repo scripts and filesystem.
Action: confirm `npm run verify` is available.
Output: go/no-go decision.

3) Build managed content from canonical baseline.
Input: latest agreed root policy and skill assets.
Action: ensure managed block includes current sections:
- `Repository expectations`
- `Layered instructions`
- `Prompt policy`
- `Default command flow (stable)`
- `Gate and evidence`
- `Stop conditions`
- `Detailed rules`
Output: finalized managed block text.

4) Apply updates with minimal diff.
Input: finalized texts.
Action:
- In `AGENTS.md`, replace only content between managed markers.
- Preserve all non-managed content unchanged.
- Create files only when missing.
Output: updated files in place.

5) Sync templates when policy changed.
Input: updated live files.
Action: update `assets/AGENTS.managed.md` so future runs reproduce current baseline.
Output: template aligned with live policy.

6) Validate and report.
Input: modified files.
Action: verify markers, short root length, and policy alignment.
Output: concise report of files changed and any blockers.

## Guardrails
- Never modify content outside managed markers in `AGENTS.md`.
- Never invent missing workflow contracts or gates.
- Keep root file compact; reference `openspec/AGENTS.override.md` without owning its lifecycle.
- Prefer minimal, reviewable diffs.
- Enforce stop conditions when scope or contracts are unclear.

## Negative examples
- Updating unrelated repo docs while touching managed block.
- Rewriting the entire `AGENTS.md` when only marker content needs replacement.
- Introducing a new gate command instead of enforcing `npm run verify`.
- Editing `openspec/AGENTS.override.md` from this skill.

## Edge cases
- `AGENTS.md` exists but markers are missing: insert managed block without deleting user content.
- `npm run verify` missing: stop and ask user to define/restore the gate.
- OpenSpec files missing but root block references them: keep root guidance and route setup to `openspec-bootstrap`.

## Templates/examples
- Managed block template: `assets/AGENTS.managed.md`
