# Golden prompts (pre-evals)
Purpose: a small, representative prompt set (5–20) to validate skill behavior manually now and later convert into an eval harness.
Notes:
- These prompts are **offline** and do not assume repo state unless specified.
- Expected checks are **assertions** you can grade deterministically (presence/absence of key elements).
## Prompt set
### GP-001 — `openspec-intake-router` — Route README for tech-test vs feature
**Prompt**
```text
Given this README excerpt for a technical test, decide which OpenSpec skills to run next and in what order. Output exact next skill call(s) only.

README:
- Build a pets list page with sorting and a detail view.
- Data endpoint: https://example.com/pets
- Must have deterministic 'pet of the day'.
- Gate: npm run verify.
```
**Expected checks**
- [ ] Mentions openspec-spec-from-readme then openspec-slice-into-iterations-from-readme
- [ ] No file writes
- [ ] No invented endpoints beyond README

### GP-002 — `openspec-change-slugger` — Slug stability
**Prompt**
```text
Create a verb-led kebab-case OpenSpec change slug for: 'Add agents bootstrap managed block and override in openspec'.
```
**Expected checks**
- [ ] Single slug, kebab-case
- [ ] Verb-led (add/enable/fix/...)
- [ ] Deterministic (no random suffix)

### GP-003 — `openspec-spec-from-readme` — Extract complete spec from README
**Prompt**
```text
Convert the following README excerpt into an OpenSpec proposal/spec. Do not invent contracts. Include acceptance criteria and stop conditions.

README:
- Must implement login form.
- Use email+password.
- Show error on invalid creds.
- No backend provided; must mock.
- Gate: npm run verify.
```
**Expected checks**
- [ ] Creates openspec/changes/<slug>/proposal/spec outline
- [ ] Explicitly calls out mock contract as undefined -> STOP or define as mock-only without inventing backend
- [ ] Acceptance criteria present

### GP-004 — `openspec-slice-into-iterations-from-readme` — Slice into 3–5 iterations
**Prompt**
```text
Slice the spec (login form technical test) into 3–5 iterations. Each iteration must be verifiable with npm run verify and minimal diffs.
```
**Expected checks**
- [ ] 3-5 iterations
- [ ] Each iteration has verification step (npm run verify)
- [ ] Minimal diffs / no refactors

### GP-005 — `openspec-spec-lint` — Lint spec structure
**Prompt**
```text
Given this OpenSpec proposal/spec snippet, lint it and list concrete issues only:

- Missing acceptance criteria
- Uses ambiguous term 'fast'
- Mentions endpoint but no contract
```
**Expected checks**
- [ ] Outputs a checklist of issues
- [ ] Does not rewrite spec unless asked
- [ ] Flags missing contracts / ambiguity

### GP-006 — `openspec-spec-fix` — Fix spec minimally
**Prompt**
```text
Fix the issues you reported in the previous lint result with minimal edits. Keep scope limited; do not add new features.
```
**Expected checks**
- [ ] Minimal diff mindset
- [ ] Adds acceptance criteria and clarifies ambiguous terms
- [ ] Does not invent contracts; uses TODO/STOP where needed

### GP-007 — `openspec-tasks-lint` — Lint tasks.md evidence format
**Prompt**
```text
Lint this tasks.md excerpt for determinism and evidence completeness:

- Ran tests
- Fixed stuff
```
**Expected checks**
- [ ] Flags missing commands and outputs
- [ ] Requires exit codes / captured outputs
- [ ] Suggests concrete structure

### GP-008 — `openspec-tasks-fix` — Fix tasks.md to compliant evidence
**Prompt**
```text
Rewrite the tasks.md excerpt into compliant evidence format with checklist, commands (copy/paste), outputs, and final npm run verify result placeholders.
```
**Expected checks**
- [ ] Includes Objective + Checklist + Commands executed + Output blocks + Verify section
- [ ] No fabricated outputs; use placeholders where unknown

### GP-009 — `core-error-fix-loop` — Error fix loop discipline
**Prompt**
```text
You ran `npm run verify` and got this error:

TypeError: Cannot read properties of undefined (reading 'map') at src/app/pets.ts:42

Follow the strict fix loop and propose the smallest code change to fix. Stop after 3 attempts.
```
**Expected checks**
- [ ] Restates command, isolates failure
- [ ] Proposes minimal fix and re-run same command
- [ ] Stop condition after 3 attempts

### GP-010 — `core-gates-and-evidence` — Gate + evidence append
**Prompt**
```text
Given a completed iteration, produce the exact tasks.md section to append: commands executed, outputs captured, and npm run verify result. Keep it short and deterministic.
```
**Expected checks**
- [ ] Includes commands + outputs + exit code
- [ ] Mentions npm run verify
- [ ] No narrative fluff

### GP-011 — `core-minimal-diff-implementer` — Minimal diff implementation plan
**Prompt**
```text
Implement 'pet of the day' deterministically. Provide a plan that changes the fewest files and avoids refactors.
```
**Expected checks**
- [ ] Few files touched
- [ ] Deterministic algorithm explained
- [ ] No unrelated cleanup

### GP-012 — `core-pr-ready-packager` — PR-ready summary
**Prompt**
```text
Generate PR-ready delivery notes for the change 'Add openspec-bootstrap and agents-bootstrap'. Include: how to run, verification evidence pointer, scope boundaries, follow-ups.
```
**Expected checks**
- [ ] Includes how to run + npm run verify
- [ ] Points to openspec/changes/<slug>/tasks.md
- [ ] Lists scope boundaries + follow-ups

### GP-013 — `openspec-bootstrap` — Bootstrap preflight messaging
**Prompt**
```text
You are in a new repo with no openspec/ folder. Describe exactly what openspec-bootstrap will create and what it will NOT do. Stop if npm run verify is missing.
```
**Expected checks**
- [ ] Lists folders/files created under openspec/
- [ ] States stop if npm run verify missing
- [ ] No edits outside openspec/ unless specified

### GP-014 — `agents-bootstrap` — AGENTS managed block behavior
**Prompt**
```text
Explain how agents-bootstrap updates AGENTS.md safely and where detailed instructions should live to avoid truncation.
```
**Expected checks**
- [ ] Mentions managed block (do not overwrite outside)
- [ ] Mentions openspec/AGENTS.override.md
- [ ] Mentions truncation and keeping root short

### GP-015 — `repo-testing-suites-discovery` — Discover verify command
**Prompt**
```text
In this package.json snippet, discover the single best gate command and justify:

scripts: { "lint": "eslint .", "test": "vitest", "build": "tsc -p tsconfig.json" }
```
**Expected checks**
- [ ] Recommends npm run verify only if exists; else propose adding verify as umbrella (STOP if not allowed)
- [ ] Does not invent scripts
- [ ] Focus on single gate principle

