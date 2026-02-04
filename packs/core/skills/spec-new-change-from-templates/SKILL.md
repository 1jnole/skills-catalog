---
name: spec-new-change-from-templates
description: Scaffold openspec/changes/<slug>/ from repo-local templates (proposal, tasks, design, specs) so other skills never write ad-hoc files. No commands, no code.
metadata:
  short-description: Scaffold change from templates
---
## Goal
Create a new change folder (`openspec/changes/<slug>/...`) by **copying from repo-local templates** under `openspec/templates/`. This makes the templates non-decorative and keeps formatting consistent across skills.

## When to use

- After you have a `<slug>` and you need to scaffold `openspec/changes/<slug>/` from repo templates.
- When the repo is already bootstrapped with `openspec/templates/*`.

## When NOT to use

- The change folder already exists (avoid overwriting; update intentionally).
- The repo is missing templates (run `$spec-bootstrap` first).

## Inputs
- `slug` (required)
- Optional:
  - `title` (used only to fill placeholders in filenames or headings if you choose to)
  - `mode`: `missing | refresh` (default: `missing`)
    - `missing`: create files only if absent
    - `refresh`: re-copy templates only for placeholder files that have not been edited (do NOT overwrite real content)

## Outputs
Creates (or ensures) this layout:
- `openspec/changes/<slug>/proposal.md`
- `openspec/changes/<slug>/tasks.md`
- `openspec/changes/<slug>/design.md` (optional; created from template)
- `openspec/changes/<slug>/specs/`
  - `mini-spec.md`
  - `spec.md`
  - `spec-delta.md`

## Preflight (MUST)
1) Confirm `openspec/` exists.
   - If missing: STOP and run `$spec-bootstrap` first.
2) Confirm repo-local templates exist:
   - `openspec/templates/proposal.md`
   - `openspec/templates/tasks.md`
   - `openspec/templates/spec.md`
   - `openspec/templates/mini-spec.md`
   - `openspec/templates/spec-delta.md`
   - `openspec/templates/design.md` (optional)
   - If any required template is missing: STOP and run `$spec-bootstrap`.
3) Confirm `slug` is stable and kebab-case.
   - If not provided or unstable: STOP and use `$spec-change-slugger`.

## Scaffold steps (MUST)
1) Create `openspec/changes/<slug>/` and `openspec/changes/<slug>/specs/` if missing.
2) Copy templates into the change folder:
   - `openspec/templates/proposal.md` → `openspec/changes/<slug>/proposal.md`
   - `openspec/templates/tasks.md` → `openspec/changes/<slug>/tasks.md`
   - `openspec/templates/design.md` → `openspec/changes/<slug>/design.md` (if template exists)
   - `openspec/templates/mini-spec.md` → `openspec/changes/<slug>/specs/mini-spec.md`
   - `openspec/templates/spec.md` → `openspec/changes/<slug>/specs/spec.md`
   - `openspec/templates/spec-delta.md` → `openspec/changes/<slug>/specs/spec-delta.md`
3) Never overwrite existing authored content.
   - In `mode=refresh`, you may only re-copy a file if it still matches the original template (placeholder-only).

## Conventions (MUST)
- Other skills that write specs/plans MUST assume this scaffold exists and should STOP if it does not.
- Templates remain the canonical formatting contract (repo-local source-of-truth).

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

