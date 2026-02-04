# Mini-SPEC: README plan

## Context
- Demo Mini-SPEC used for evals of spec-slice-into-iterations-from-readme.

## Requirement inventory
R-1 Add a `docs/NOTES.md` file with a short project note.
- Source: README.md

R-2 Ensure the repo gate is `npm run verify`.
- Source: README.md

## Acceptance criteria
- [ ] AC-1 `docs/NOTES.md` exists and contains the heading `# Notes`. Verify: `npm run verify`.
- [ ] AC-2 `package.json` has a `verify` script. Verify: open `package.json`.

## Traceability
- R-1: MAPPED (AC: AC-1)
- R-2: MAPPED (AC: AC-2)
