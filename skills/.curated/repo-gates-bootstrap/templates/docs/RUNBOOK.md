# RUNBOOK (Dev + Gates + Evidence)

<!-- RUNBOOK:START -->
## Scope
- Defines deterministic commands and evidence format for this repo.
- Product requirements live in `README.md` and OpenSpec specs/deltas (not here).

## Prerequisites
- Node: use the repo-defined version (e.g. `.nvmrc` or `package.json#engines`).
- Package manager: npm.

## Quick start

### Install
```bash
npm ci
```

### Dev
Use the repo's dev command **as defined in `package.json#scripts`**.

Selection order (do not invent commands):
1) `npm start` (script: `start`)
2) `npm run dev` (script: `dev`)
3) `npm run serve` (script: `serve`)

If none exist, mark Dev as `UNVERIFIED` in this RUNBOOK and do not add a guessed command.

```bash
npm run <start|dev|serve>
```

### Verify (MUST PASS)
Single required gate:
```bash
npm run verify
```

---

## Gates policy (required)

### Single gate
Before finishing any OpenSpec change:
- `npm run verify` **must pass locally**
- Append evidence to:
  - `openspec/changes/<slug>/tasks.md`

### Verify order (expected)
`verify` should run checks in this order when scripts exist:
1) `format:check`
2) `lint`
3) `typecheck`
4) `test`
5) `build`

Rules:
- Stop on first FAIL.
- Minimal fix only.
- No feature work during gate fixing.

---

## Evidence format (required)

Append to `openspec/changes/<slug>/tasks.md`:

```text
Command: npm run verify
Result: PASS | FAIL
Output (2–10 lines):
<line>
<line>
```

(Optional when debugging)
```text
Command: npm run <format:check|lint|typecheck|test|build>
Result: PASS | FAIL
Output (2–10 lines):
...
```

---

## OpenSpec operations (operational)

In Codex use:
- `/prompts:openspec-proposal`
- `/prompts:openspec-apply`
- `/prompts:openspec-archive`

Optional CLI:
- `openspec list`
- `openspec show <change>`
- `openspec validate <change>`
- `openspec archive <change> --yes`

---

## Troubleshooting (minimal fixes)

- Node mismatch → switch to repo Node version, reinstall deps.
- `verify` fails → fix the smallest root cause, rerun `npm run verify`.
- Formatting fails → run formatter (write mode) and rerun verify.
- Lint fails → minimal fix, rerun verify.
- Tests fail → minimal fix or update spec/tasks if mismatch (no scope creep).
<!-- RUNBOOK:END -->

## Project-specific notes
- (Add repo-specific commands, env vars, or deviations here.)
