# OpenSpec override (for `openspec/` subtree)

## Goal
Deterministic OpenSpec workflow: explicit phases, explicit commands, explicit evidence, explicit closure criteria.

## Source of truth
- Implementation scope is defined by artifacts in `openspec/changes/<slug>/`.
- Edit only repository files required by those artifacts; avoid unrelated changes.
- If requirements are missing, record assumptions explicitly (see Decision policy).
- If drift appears (code vs artifacts), stop and reconcile before continuing.

---

## Decision policy

### Non-critical decisions (agent may choose + must record)
Allowed defaults, unless the change artifacts specify otherwise:
- naming, file placement within existing conventions
- minor UI layout choices that do NOT change states/flows
- small refactors strictly necessary to complete the task (no unrelated cleanup)
- test approach choice among equivalent repo-approved options

### Critical decisions (must stop and ask)
Any of:
- public contract changes (API, shared types, events, headers)
- auth/permissions/session logic changes
- data model changes that affect persistence or migration behavior
- build/CI/tooling/dependency changes
- performance/security sensitive decisions
- ambiguity in acceptance criteria or success definition

Decision precedence:
- If acceptance criteria are missing and "done" cannot be verified, stop and ask.
- If a decision is non-critical and verifiable, choose the default and record it.
- Critical decisions and destructive risk require explicit human approval before any mutating action.

### Destructive risk (must stop and ask)
Any of:
- schema/DDL/migrations, data deletion, backfills
- scripts that mutate production-like state
- irreversible file deletions or large-scale renames
- credential/secret handling changes
- changes that could break deployment pipelines

### Trivial fast-path (no approval checkpoint)
A change is trivial only if ALL of these are true:
- no observable behavior or contract change
- no auth/permissions/tooling/dependency/data-model impact
- no destructive risk
- small, local, and reversible diff

---

## Prompt policy
### Stable defaults
- `/prompts:openspec-proposal`
- `/prompts:openspec-apply`
- `/prompts:openspec-archive`

### Experimental (opt-in only)
  - `/prompts:opsx-new`, `/prompts:opsx-continue`, `/prompts:opsx-apply`, `/prompts:opsx-explore`, `/prompts:opsx-ff`
  If experimental prompts cause drift/ambiguity, fall back to stable prompts immediately.

---

## Standard evidence format (MANDATORY)
In `openspec/changes/<slug>/tasks.md`, evidence may be recorded as a table or bullet list.
Each check MUST include:
- **Command:** `...`
- **Result:** PASS/FAIL + 2-10 relevant lines of output
- **Date:** `YYYY-MM-DD`
- **Note:** one sentence

Avoid dumping full logs.

---

## Quick routing by phase

- Explore only (optional): `/prompts:opsx-explore`
- New change: `/prompts:openspec-proposal`
- Build artifacts: `openspec instructions <artifact> --change "<slug>" --json`
- Implement: `/prompts:openspec-apply`
- Archive: `/prompts:openspec-archive`

---

## Phase routing (command-by-moment)

### 0) Preflight
Commands:
- `openspec --version`
- `openspec schemas --json`
- `openspec list --json`

Exit criteria:
- CLI available, schemas visible, current changes known.

### 1) Create change
Commands:
- `openspec new change "<slug>"`
- `openspec status --change "<slug>" --json`
- `openspec instructions proposal --change "<slug>" --json`

Exit criteria:
- `openspec/changes/<slug>/` exists
- proposal guidance is available

---

### 2) Build artifacts (apply-ready)
Required order:
1) `proposal`
2) `specs`
3) `design`
4) `tasks`

Commands (per artifact):
- `openspec instructions <artifact> --change "<slug>" --json`
- `openspec status --change "<slug>" --json`
- `openspec validate "<slug>" --type change`

Hard rule:
- **Do not apply** unless `status.isComplete = true`.

Exit criteria:
- all artifacts done
- `openspec validate` passes
- `status.isComplete = true`

---

### 3) Apply tasks (implementation)
Default:
- `/prompts:openspec-apply`

Approval checkpoint (mandatory for critical/destructive):
- Before mutating actions, summarize scope, files, risks, and verification commands.
- Wait for explicit approval (`OK <slug>` or equivalent).

Execution rules:
- One task at a time
- Minimal diff only
- No unrelated refactor/cleanup
- Update `tasks.md` checkboxes + evidence as you go
- Non-critical and trivial changes continue autonomously end-to-end.

Stop conditions (during apply):
- drift between artifacts and necessary implementation
- missing critical decision
- destructive risk

---

### 4) Verification and gates
Preferred repo gate:
- `npm run verify`

For non-critical changes:
- Run `/review` before completion.

If `verify` is explicitly out-of-scope or blocked:
- `openspec validate "<slug>" --type change`
- plus **at least one executable gate** from this list (pick what fits the repo):
  - `npm test`
  - `npm run build`
  - `npm run lint`
  - a documented manual smoke test (steps + expected result)

Evidence is mandatory in `tasks.md` using the standard format.

Exit criteria:
- gate(s) PASS
- evidence recorded

---

### 5) Archive
Commands:
- `openspec validate "<slug>" --type change`
- `/prompts:openspec-archive` OR `openspec archive "<slug>"`

Exit criteria:
- change archived
- visible as archived in `openspec list --json`

---

## Atomicity rules
- If scope grows (too many files, mixed concerns, unclear review), split into multiple slugs.
- Each slug should be independently reviewable and ideally independently deployable.
- If an umbrella slug exists, mark it superseded and archive after children complete.

---

## Stop conditions (OpenSpec subtree)
Stop and ask before proceeding when:
- scope is ambiguous or acceptance criteria are missing
- required artifact is missing
- workflow contracts conflict
- command output contradicts the current plan
- destructive risk is detected
