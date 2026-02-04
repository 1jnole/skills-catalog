---
name: spec-archive-change
description: "Close out an OpenSpec change (<slug>): ensure gate+evidence, run drift check, and mark the change as archived with a short archive note. Optional: use openspec CLI if present."
metadata:
  short-description: Archive OpenSpec change
---
## Goal
Finish a change cleanly so future work is auditable:
- evidence exists,
- scope drift is resolved,
- the change folder is marked as archived.

## When to use

- After a change is completed and merged/deployed, to archive the OpenSpec change folder and update project docs.
- When you want a clean “active changes” set under `openspec/changes/`.

## When NOT to use

- Work is still in progress or the PR is not merged.
- You need to amend the spec/tasks (do that before archiving).

## Inputs
- `slug`
- Change folder: `openspec/changes/<slug>/`
- Gate command: `npm run verify`

## Outputs
- Update `openspec/changes/<slug>/tasks.md` with an archive checklist entry
- Write `openspec/changes/<slug>/ARCHIVED.md` (short archive note)

## Preflight (MUST)
1) Confirm `openspec/changes/<slug>/tasks.md` exists.
2) Confirm the spec is in a passing state (if relevant).
3) Confirm the repo gate passes (run `npm run verify` if not already captured).

## Archive workflow (MUST)
1) Ensure final verification evidence exists in `tasks.md`.
   - If missing: run `$core-gates-and-evidence` to append it.
2) Run `$spec-drift-check`.
   - If FAIL: resolve drift (remove change or update spec with explicit approval), then rerun.
3) Append an “Archive checklist” entry to `tasks.md`:
   - Gate: PASS
   - Drift: PASS
   - Notes: 1–3 bullets
4) Write `ARCHIVED.md` with:
   - Date (YYYY-MM-DD)
   - Summary (3–5 bullets)
   - Link pointers: spec path + tasks path

## Optional: OpenSpec CLI
If `openspec` CLI is available and the repo uses it, you may run:
- `openspec archive <slug> --yes`
But do NOT move folders manually unless the repo's OpenSpec CLI conventions are known.

## Failure modes
STOP if:
- the gate cannot pass, or
- drift cannot be resolved without inventing requirements.
