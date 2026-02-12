# OpenSpec override (for `openspec/` subtree)

## Goal
Use a deterministic OpenSpec workflow so every phase has explicit commands, evidence, and closure criteria.

## Prompt policy
- Stable by default:
  - `/prompts:openspec-proposal`
  - `/prompts:openspec-apply`
  - `/prompts:openspec-archive`
- Experimental only by explicit opt-in:
  - `/prompts:opsx-new`, `/prompts:opsx-continue`, `/prompts:opsx-apply`, `/prompts:opsx-explore`, `/prompts:opsx-ff`

## Phase routing (command by moment)

### 0) Preflight
- `openspec --version`
- `openspec schemas --json`
- `openspec list --json`

Exit criteria:
- CLI available and workspace status known.

### 1) Create change
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

### 3) Apply tasks
- Default prompt: `/prompts:openspec-apply`
- Keep `tasks.md` synced with checkbox status and evidence.

Execution rules:
- One task at a time.
- Minimal diff only.
- No unrelated refactors.

### 4) Verification and evidence
Preferred gate:
- `npm run verify`

Fallback when verify is out of scope or blocked:
- `openspec validate "<slug>" --type change`
- plus task-local checks in `tasks.md`

Evidence in `openspec/changes/<slug>/tasks.md`:
- command
- result (PASS/FAIL)
- date
- short note

### 5) Archive
- `/prompts:openspec-archive` or `openspec archive "<slug>"`

Before archive:
- `openspec validate "<slug>" --type change`

## Stop conditions
Stop and ask when:
- scope is ambiguous
- required artifact is missing
- workflow contracts conflict
- mandatory command output contradicts the plan
