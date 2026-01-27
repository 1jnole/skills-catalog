---
name: angular-architecture-bootstrap
description: Install the standard Angular architecture rules doc (docs/ARCHITECTURE.md) from templates, using a managed block for safe updates.
metadata:
  short-description: Angular Architecture Bootstrap
---

## Goal
Ensure this repo contains the standard architecture rules doc:
- `docs/ARCHITECTURE.md`

## When to use
- Angular repo is missing `docs/ARCHITECTURE.md`.
- You want to refresh only the managed block (`<!-- ANGULAR_ARCH:START --> ... <!-- ANGULAR_ARCH:END -->`).
- You are standardizing repo docs before feature work.

## When NOT to use
- Repo is not Angular.
- Repo intentionally uses a different architecture standard (explicitly approved).
- You want to bootstrap both ARCHITECTURE + STYLING in one step → use `angular-docs-bootstrap`.

## Inputs
- `templates/docs/ARCHITECTURE.md`

## Output
- Create `docs/` if missing
- Create/update `docs/ARCHITECTURE.md`

## Rules (MUST)
- If `docs/ARCHITECTURE.md` does not exist: copy the template as-is.
- If it exists: update **only** the block between:
  - `<!-- ANGULAR_ARCH:START -->` and `<!-- ANGULAR_ARCH:END -->`
- Preserve anything outside the block (project-specific notes).

## Common pitfalls
- Overwriting content outside the managed block (must preserve project-specific notes).
- Running on a repo that intentionally diverges without documenting the decision (use ADR/OpenSpec instead).

