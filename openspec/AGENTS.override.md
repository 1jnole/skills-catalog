# OpenSpec override (for `openspec/` subtree)

## Goal
Deterministic OpenSpec workflow: explicit phases, explicit commands, explicit evidence, explicit closure criteria.

## Source of truth
- Implementation scope is defined by artifacts in `openspec/changes/<slug>/`.
- Edit only repository files required by those artifacts; avoid unrelated changes.
- If requirements are missing, record assumptions explicitly.
- If drift appears between code and artifacts, stop and reconcile before continuing.

---

## Decision policy

### Non-critical decisions (agent may choose and must record)
Allowed defaults, unless the change artifacts specify otherwise:
- naming and file placement within existing conventions
- minor documentation layout choices that do not change scope or acceptance
- small refactors strictly necessary to complete the task
- verification approach among equivalent repo-approved options

### Critical decisions (must stop and ask)
Any of:
- public contract changes
- auth, permissions, or session logic changes
- data model or persistence changes
- build, CI, tooling, or dependency changes
- performance or security sensitive decisions
- ambiguity in acceptance criteria or success definition

Decision precedence:
- If acceptance criteria are missing and `done` cannot be verified, stop and ask.
- If a decision is non-critical and verifiable, choose the default and record it.
- Critical decisions and destructive risk require explicit human approval before any mutating action.

### Destructive risk (must stop and ask)
Any of:
- schema, DDL, migrations, or data deletion
- scripts that mutate production-like state
- irreversible file deletions or large-scale renames
- credential or secret handling changes
- changes that could break deployment or release pipelines

### Trivial fast-path (no approval checkpoint)
A change is trivial only if all of these are true:
- no observable behavior or contract change
- no auth, permissions, tooling, dependency, or data-model impact
- no destructive risk
- small, local, and reversible diff

---

## Prompt policy

### Stable defaults
- `/prompts:openspec-proposal`
- `/prompts:openspec-apply`
- `/prompts:openspec-archive`

### Experimental (opt-in only)
- `/prompts:opsx-new`
- `/prompts:opsx-continue`
- `/prompts:opsx-apply`
- `/prompts:opsx-explore`
- `/prompts:opsx-ff`

If experimental prompts cause drift or ambiguity, fall back to stable prompts immediately.

---

## Standard evidence format (mandatory)
In `openspec/changes/<slug>/tasks.md`, evidence may be recorded as a table or bullet list.
Each check must include:
- **Command:** `...`
- **Result:** PASS or FAIL with 2-10 relevant lines of output
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

## Low-token workflow

Use these defaults to reduce token spend without weakening validation quality:
- Work one slug at a time; implement, validate, review, and archive it before opening the next slug unless the repo explicitly needs parallel slugs.
- Freeze `done` in a short checklist before editing; do not keep renegotiating acceptance criteria during apply.
- Prefer diff-based review with concrete findings over full-file rereads once the plan is approved.
- Run the narrowest useful verification first, then the full suite only after the focused check passes.
- Keep commentary compact when the strategy has not changed; report phase changes, edits, blockers, and final verification rather than narrating every micro-step.
- Do not restate approved plans in full; refer to the active slug and its recorded acceptance criteria instead.
- Archive completed slugs promptly so later work does not carry stale change context.

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

### 2) Build artifacts (apply-ready)
Required order:
1. `proposal`
2. `specs`
3. `design`
4. `tasks`

Commands (per artifact):
- `openspec instructions <artifact> --change "<slug>" --json`
- `openspec status --change "<slug>" --json`
- `openspec validate "<slug>" --type change`

Hard rule:
- Do not apply unless `status.isComplete = true`.

Exit criteria:
- all artifacts done
- `openspec validate` passes
- `status.isComplete = true`

### 3) Apply tasks (implementation)
Default:
- `/prompts:openspec-apply`

Approval checkpoint (mandatory for critical or destructive work):
- Before mutating actions, summarize scope, files, risks, and verification commands.
- Wait for explicit approval.

Execution rules:
- One task at a time
- Minimal diff only
- No unrelated refactor or cleanup
- Update `tasks.md` checkboxes and evidence as you go
- Non-critical and trivial changes continue autonomously end-to-end

Stop conditions (during apply):
- drift between artifacts and necessary implementation
- missing critical decision
- destructive risk

### 4) Verification and gates
Preferred repo gate:
- `npm run promptfoo:run:offline`

Authority rule:
- `npm run promptfoo:run:offline` is the preferred public low-cost smoke gate.
- `npm run promptfoo:run` is the public semantic authority when replay and live behavior disagree.
- direct `promptfoo -c <config>` execution is the standard path for family-specific validation and runs outside the small public npm surface.
- `without_skill` remains an informational baseline rather than a closure gate.

For non-critical changes:
- Run `/review` before completion.

If the preferred gate is out of scope or blocked:
- `openspec validate "<slug>" --type change`
- plus at least one executable gate that fits the repo, such as:
- `npm test`
- `npm run build`
- `npm run lint`
- a documented manual smoke test with expected result

Evidence is mandatory in `tasks.md` using the standard format.

Exit criteria:
- gate or gates pass
- evidence recorded

### 5) Archive
Commands:
- `openspec validate "<slug>" --type change`
- `/prompts:openspec-archive` or `openspec archive "<slug>"`

Exit criteria:
- change archived
- visible as archived in `openspec list --json`

---

## Atomicity rules
- If scope grows too much, split into multiple slugs.
- Each slug should be independently reviewable and ideally independently deployable.
- If an umbrella slug exists, mark it superseded and archive after children complete.

---

## Stop conditions (OpenSpec subtree)
Stop and ask before proceeding when:
- scope is ambiguous or acceptance criteria are missing
- a required artifact is missing
- workflow contracts conflict
- command output contradicts the current plan
- destructive risk is detected
