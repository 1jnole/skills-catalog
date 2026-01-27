---
name: angular-docs-bootstrap
description: Bootstrap standard Angular docs (ARCHITECTURE + STYLING) into docs/ using catalog templates, with managed blocks for safe updates.
metadata:
  short-description: Angular Docs Bootstrap
---

## Goal
Make an Angular repo **agent-ready** by ensuring it contains canonical project docs:

- `docs/ARCHITECTURE.md` (Feature-first + DDD-lite rules)
- `docs/STYLING.md` (Hybrid tokens + SCSS + BEM rules)

Docs must be consistent across repos, low-churn, and safe to update.

## When to use
- New Angular repo / technical test repo (first-time docs bootstrap).
- Repo is missing **both** `docs/ARCHITECTURE.md` and `docs/STYLING.md`, or you want to standardize both at once.
- You want a single "bundle" step that installs both docs using catalog templates.

## When NOT to use
- Repo is not Angular.
- You only need to update one doc:
  - Use `angular-architecture-bootstrap` for `docs/ARCHITECTURE.md`
  - Use `angular-styling-bootstrap` for `docs/STYLING.md`
- Repo already has a different, explicitly approved architecture/styling standard.

## Inputs
- This skill's templates:
  - `templates/docs/ARCHITECTURE.md`
  - `templates/docs/STYLING.md`

## Outputs
Creates or updates:
- `docs/ARCHITECTURE.md`
- `docs/STYLING.md`

## Rules (MUST)
- Create `docs/` folder if missing.
- If the target file does **not** exist: copy the template as-is.
- If the target file **exists**:
  - Update **only** the managed block between markers:
    - `<!-- ANGULAR_ARCH:START --> ... <!-- ANGULAR_ARCH:END -->`
    - `<!-- ANGULAR_STYLING:START --> ... <!-- ANGULAR_STYLING:END -->`
  - Preserve anything outside the managed block (project-specific notes).

## Workflow
1) Ensure `docs/` exists.
2) Ensure `docs/ARCHITECTURE.md` exists and is aligned with the template (managed block update).
3) Ensure `docs/STYLING.md` exists and is aligned with the template (managed block update).
4) Do **not** add extra opinions or repo-specific assumptions—only this standard.

## Notes
- This skill is typically run **before** feature work.
- Pair with `core-repo-gates-bootstrap` (RUNBOOK + `npm run verify`) for a complete bootstrap.
