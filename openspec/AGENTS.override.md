# OpenSpec override (for `openspec/` subtree)

## Goal
Use a deterministic OpenSpec workflow so every phase has explicit commands, evidence, and closure criteria.

## When to use OpenSpec
- Use OpenSpec for non-trivial work: new feature, multi-file change, risky refactor, or handoff.
- Skip OpenSpec only for tiny edits (for example, typo in one file).

## Prompt policy
- Stable by default:
  - `/prompts:openspec-proposal`
  - `/prompts:openspec-apply`
  - `/prompts:openspec-archive`
- Experimental by explicit opt-in only:
  - `/prompts:opsx-new`, `/prompts:opsx-continue`, `/prompts:opsx-apply`, `/prompts:opsx-explore`, `/prompts:opsx-ff`
- If an experimental prompt causes drift or ambiguity, fall back to stable prompts immediately.

## Quick routing by phase
- New change: `/prompts:openspec-proposal`
- Build remaining artifacts: `openspec instructions <artifact> --change "<slug>" --json`
- Implement tasks: `/prompts:openspec-apply`
- Explore only (optional): `/prompts:opsx-explore`
- Archive deployed change: `/prompts:openspec-archive`

## Phase routing (command by moment)

### 0) Preflight
Use:
- `openspec --version`
- `openspec schemas --json`
- `openspec list --json`

Exit criteria:
- CLI is available, the schema is visible, and current changes are known.

### 1) Create change
Use:
- `openspec new change "<slug>"`
- `openspec status --change "<slug>" --json`
- `openspec instructions proposal --change "<slug>" --json`

Exit criteria:
- `openspec/changes/<slug>/` exists and proposal guidance is available.

### 2) Build artifacts (apply-ready)
Required order:
1. `proposal`
2. `specs`
3. `design`
4. `tasks`

Use per artifact:
- `openspec instructions <artifact> --change "<slug>" --json`
- `openspec status --change "<slug>" --json`
- `openspec validate "<slug>" --type change`

Exit criteria:
- all artifacts done and `status.isComplete = true`.

### 3) Apply tasks (implementation)
Use:
- `/prompts:openspec-apply` (default) or manual execution task-by-task.
- Keep `tasks.md` synced: mark checkboxes and log evidence for each task.

Execution rules:
- One task at a time.
- Minimal diff only.
- No unrelated refactor/cleanup.

### 4) Verification and evidence
Preferred gate:
- `npm run verify`

If verify is out of scope or blocked for this phase:
- `openspec validate "<slug>" --type change`
- plus task-local checks defined in `tasks.md`.

Evidence (MUST) in `openspec/changes/<slug>/tasks.md`:
- Command
- Result (PASS/FAIL)
- Date
- Short note

### 5) Archive
Use:
- `/prompts:openspec-archive` (default), or
- `openspec archive "<slug>"`

Before archive:
- `openspec validate "<slug>" --type change`

Exit criteria:
- change archived and visible as archived in `openspec list --json`.

## Atomicity rules
- If a change grows too large, split into multiple slugs by domain/phase.
- Keep each change independently reviewable and deployable.
- If a previous umbrella change exists, mark it as superseded and archive it after atomic children complete.

## Stop conditions
Stop and ask before proceeding when:
- scope is ambiguous
- the required artifact is missing
- workflow contracts conflict
- or mandatory command output contradicts the current plan.
