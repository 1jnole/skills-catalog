---
name: angular-docs-bootstrap
description: Bootstrap standard Angular docs (ARCHITECTURE + STYLING) into docs/ using catalog templates, with managed blocks for safe updates.
metadata:
  short-description: Angular Docs Bootstrap
---
## Goal
Make an Angular repo **agent-ready** by ensuring it contains canonical project docs and managed-block updates for:

- `docs/ARCHITECTURE.md` (Feature-first + DDD-lite rules)
- `docs/STYLING.md` (Hybrid tokens + SCSS + BEM rules)

Docs must be consistent across repos, low-churn, and safe to update.

## When to use
- New Angular repo / technical test repo (first-time docs bootstrap).
- Repo is missing **both** `docs/ARCHITECTURE.md` and `docs/STYLING.md`, or you want to standardize both at once.
- You need a single canonical skill that can run in `bundle`, `architecture-only`, or `styling-only` mode.

## When NOT to use
- Repo is not Angular.
- Repo already has a different, explicitly approved architecture/styling standard.

## Inputs
- This skill's templates:
  - `assets/docs/ARCHITECTURE.md`
  - `assets/docs/STYLING.md`
- Requested mode:
  - `bundle` (default): update both docs
  - `architecture-only`: update only `docs/ARCHITECTURE.md`
  - `styling-only`: update only `docs/STYLING.md`

## Outputs
Creates or updates target docs according to selected mode:
- `docs/ARCHITECTURE.md`
- `docs/STYLING.md`

## Rules (MUST)
- Create `docs/` folder if missing.
- For each targeted file in the selected mode:
  - If the file does **not** exist: copy the template as-is.
  - If the file **exists**: update **only** the managed block and preserve content outside it.
- Managed blocks:
  - `docs/ARCHITECTURE.md` -> `<!-- ANGULAR_ARCH:START --> ... <!-- ANGULAR_ARCH:END -->`
  - `docs/STYLING.md` -> `<!-- ANGULAR_STYLING:START --> ... <!-- ANGULAR_STYLING:END -->`

## Workflow
1) Determine mode (`bundle`, `architecture-only`, `styling-only`) from user request; default to `bundle`.
2) Ensure `docs/` exists.
3) If mode includes architecture, create/update `docs/ARCHITECTURE.md` via managed block rules.
4) If mode includes styling, create/update `docs/STYLING.md` via managed block rules.
5) Do **not** add extra opinions or repo-specific assumptions; keep to catalog standard.

## Common pitfalls
- Overwriting content outside managed blocks.
- Updating both docs when the request was explicitly single-file mode.
- Adding repo-specific conventions inside managed blocks.

## Example prompts
- "Bootstrap Angular docs in bundle mode."
- "Update only ARCHITECTURE managed block."
- "Refresh only STYLING managed block from template."

## Notes
- This skill is typically run **before** feature work.
- Pair with `repo-gates-bootstrap` (RUNBOOK + `npm run verify`) for a complete bootstrap.

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

