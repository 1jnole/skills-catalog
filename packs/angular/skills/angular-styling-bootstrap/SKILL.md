---
name: angular-styling-bootstrap
description: Install the standard Angular styling rules doc (docs/STYLING.md) from templates, using a managed block for safe updates.
metadata:
  short-description: Angular Styling Bootstrap
---
## Goal
Ensure this repo contains the standard styling rules doc:
- `docs/STYLING.md`

## When to use
- Angular repo is missing `docs/STYLING.md`.
- You want to refresh only the managed block (`<!-- ANGULAR_STYLING:START --> ... <!-- ANGULAR_STYLING:END -->`).
- You are standardizing repo docs before feature work.

## When NOT to use
- Repo is not Angular.
- Repo intentionally uses a different styling standard (explicitly approved).
- You want to bootstrap both ARCHITECTURE + STYLING in one step → use `angular-docs-bootstrap`.

## Inputs
- `assets/docs/STYLING.md`

## Outputs
- Create `docs/` if missing
- Create/update `docs/STYLING.md`

## Rules (MUST)
- If `docs/STYLING.md` does not exist: copy the template as-is.
- If it exists: update **only** the block between:
  - `<!-- ANGULAR_STYLING:START -->` and `<!-- ANGULAR_STYLING:END -->`
- Preserve anything outside the block (project-specific notes).

## Common pitfalls
- Overwriting content outside the managed block (must preserve project-specific notes).
- Introducing repo-specific tokens/rules inside the managed block (put those in "Project-specific notes" instead).

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

