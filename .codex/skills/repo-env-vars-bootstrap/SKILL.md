---
name: repo-env-vars-bootstrap
description: Create docs/ENV.md and .env.example from README/docs references. Use when the README mentions env vars, API keys, config, or .env. Never include real secrets; use placeholders.
metadata:
  short-description: Env Vars Bootstrap
---
## Goal
Make environment configuration explicit and safe by generating:
- `.env.example` (placeholders only)
- `docs/ENV.md` (documentation table)

## When to use
- README mentions `.env`, env vars, API keys, tokens, config, or runtime settings.
- The repo needs a standard place to document configuration.

## When NOT to use
- Env vars are intentionally out of scope for this project (explicitly stated).
- The repo already has a complete `.env.example` and `docs/ENV.md`.

## Inputs
- `README.md`
- Any existing env documentation (`docs/**`, `.env.example`, `*.md`)

## Outputs
- `.env.example` (created if missing; updated minimally if present)
- `docs/ENV.md` (created if missing; updates only managed block if present)

## Workflow
1) Scan `README.md` and docs for env var names and any required/optional notes.
2) If `.env.example` exists, treat it as primary input and merge any missing vars from README/docs.
3) Create/Update `.env.example` using placeholders only:
   - Use `REPLACE_ME` / `http://localhost:3000` / `true|false` examples.
   - NEVER copy actual secrets or tokens.
4) Create/Update `docs/ENV.md`:
   - Replace only the managed block `<!-- ENV:START --> ... <!-- ENV:END -->`
   - Include a table: Name | Required | Purpose | Example | Notes
5) If no vars can be found:
   - Create `docs/ENV.md` with `UNVERIFIED: no env vars referenced`
   - Create `.env.example` with a comment placeholder.

## Error handling
- If any real-looking secret is detected in text, STOP and redact it. Write placeholders only.
