<!-- BEGIN MANAGED: agents-bootstrap -->

# Agent instructions (managed)

## Setup commands
- Install deps: `npm ci` (preferred) or `npm install`
- Gate: `npm run verify`

## Source of truth
- **OpenSpec is the source of truth.** Only implement work that is described under `openspec/changes/<slug>/...`.
- **One change = one PR** (or equivalent).

## Gate
- The single verification gate is: `npm run verify`.
- Run it after every meaningful change and before you claim completion.

## Context budget
- Keep this file short to avoid silent truncation. Push deeper detail into `AGENTS.override.md` files.

## Evidence
- Every change must include `openspec/changes/<slug>/tasks.md` with:
  - objective + checklist
  - copy/paste commands + relevant output (include exit codes)
  - `npm run verify` output

## Change discipline
- Prefer minimal diffs and small, reviewable commits.
- Do not refactor unless explicitly required by the spec.

## Stop conditions
Stop and ask if:
- `openspec/` is missing, or you cannot locate the change folder.
- `npm run verify` is missing/failing and there is no accepted substitute.
- A requirement/contract is unclear or not specified.
- Required tools (node/npm/git) are missing.

## Optional reference
- More detailed, human-oriented guidance may live in `docs/AGENTS.md`.

<!-- END MANAGED: agents-bootstrap -->
