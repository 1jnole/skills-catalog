# tasks.md — Plan + evidence

## Change objective
- <What this change achieves>

## Gate
- Primary: `npm run verify`

## Iterations

### Iteration 0 — Preflight + baseline
**Objective:** Confirm repo root, ensure the gate exists, and establish a passing baseline.

**Done when:**
- [ ] Repo root identified
- [ ] Gate command confirmed: `npm run verify`
- [ ] `npm run verify` passes on the baseline
- [ ] Evidence captured below (command + output + exit code)

---

### Iteration 1 — <slice title>
**Objective:** <one coherent unit of work>

**Done when:**
- [ ] AC: <AC-ids go here>
- [ ] `npm run verify` passes
- [ ] Evidence captured below

---

### Iteration 2 — <slice title>
**Objective:** <one coherent unit of work>

**Done when:**
- [ ] AC: <AC-ids go here>
- [ ] `npm run verify` passes
- [ ] Evidence captured below

---

### Iteration 3 — <slice title>
**Objective:** <one coherent unit of work>

**Done when:**
- [ ] AC: <AC-ids go here>
- [ ] `npm run verify` passes
- [ ] Evidence captured below

## Evidence log (append-only)
> Copy/paste terminal sessions. Include exit codes. Trim long logs but keep failures.

### Environment
```bash
node -v
npm -v
```

### Commands + outputs
```bash
npm run verify
# exit code: <0|1>
# output (trimmed):
# <paste here>
```

### Notes / decisions (minimal)
- <Only if needed>
