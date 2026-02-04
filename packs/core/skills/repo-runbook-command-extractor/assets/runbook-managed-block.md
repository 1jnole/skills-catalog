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
```bash
<DEV_COMMAND>
```

### Verify (MUST PASS)
```bash
<VERIFY_COMMAND>
```

---

## Commands (resolved)
- Install: `npm ci` (PASS)
- Dev: `<DEV_COMMAND>` (<DEV_STATUS>)
- Verify: `<VERIFY_COMMAND>` (<VERIFY_STATUS>)
- Unit tests: `<UNIT_TEST_COMMAND>` (<UNIT_TEST_STATUS>)
- E2E (optional): `<E2E_COMMAND>` (<E2E_STATUS>)
- Build: `<BUILD_COMMAND>` (<BUILD_STATUS>)

---

## Gates policy (required)
- Single required gate: `npm run verify`
- Stop on first FAIL.
- Minimal fix only.
- No product feature work during gates.

## Evidence format (required)
Append to `openspec/changes/<slug>/tasks.md`:

```text
Command: <command>
Result: PASS | FAIL | UNVERIFIED
Output (2–10 lines):
<line>
<line>
```

## OpenSpec operations (operational)
In Codex:
- `/prompts:spec-proposal`
- `/prompts:spec-apply`
- `/prompts:spec-archive`
<!-- RUNBOOK:END -->
