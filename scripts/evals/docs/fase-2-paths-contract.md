# Fase 2: Paths Contract

## Purpose
Document the current path contract for `scripts/evals/` so Phase 2 can keep opening structural seams without moving the final layout too early.

This document is intentionally small:
- it records the current resolved paths,
- it identifies the runtime-critical paths that must go through one authority,
- and it states what does **not** change yet in this phase.

## Current inherited layout

The supported path model still assumes the repo's current physical layout:

```text
packs/core/<skill-name>/
  SKILL.md
  evals/
    evals.json
    files/
    runs/
      iteration-N/
        benchmark.json
        run.json
```

The final migration target may later move these concerns elsewhere, but that is not part of this slice.

## Current single authority

The current resolution authority is `scripts/evals/infrastructure/filesystem/eval-paths.ts`.

It reads these config values:
- `EVALS_SKILLS_ROOT`
- `EVALS_EVALS_DIR`
- `EVALS_EVAL_DEFINITION_FILE`
- `EVALS_FILES_DIR`
- `EVALS_RUNS_DIR`
- `EVALS_SKILL_PROMPT_FILE`

And it resolves these critical paths:
- skill root via `resolveSkillRoot(...)`
- skill prompt via `resolveSkillPromptPath(...)`
- eval root via `resolveSkillEvalRoot(...)`
- eval definition via `resolveSkillEvalDefinitionPath(...)`
- fixtures/files root via `resolveSkillEvalFilesRoot(...)`
- runs root via `resolveSkillEvalRunsRoot(...)`

## Runtime-critical paths already covered

These paths must continue to use the resolver as the only authority:

### Eval definition
- Used by `application/load-eval-definition/load-eval-definition.ts`
- Current resolved default:
  - `packs/core/<skill-name>/evals/evals.json`

### Skill prompt
- Used by `infrastructure/filesystem/read-skill-prompt.ts`
- Current resolved default:
  - `packs/core/<skill-name>/SKILL.md`

### Fixtures
- Used by `infrastructure/laminar/prompt-builder.ts`
- Current resolved default:
  - `packs/core/<skill-name>/evals/files/`

### Runs
- Used by `application/load-eval-definition/load-eval-definition.ts`
- Consumed by `infrastructure/filesystem/eval-runs/iteration-files.ts`
- Current resolved default:
  - `packs/core/<skill-name>/evals/runs/`

### Reports
- The current supported reports still live inside the iteration folder:
  - `benchmark.json`
  - `run.json`
- They are still derived from the resolved runs root plus `iteration-N/`.

## Paths still derived from the inherited layout

These paths are still physically inherited even though the resolver now centralizes discovery:
- `packs/core/<skill-name>/evals/evals.json`
- `packs/core/<skill-name>/evals/files/`
- `packs/core/<skill-name>/evals/runs/`
- `packs/core/<skill-name>/SKILL.md`

That is acceptable in Phase 2.

The key rule is:

> the inherited layout may still be the default, but it must no longer be hardcoded independently in multiple runtime-critical places.

## Entry points affected by this contract

The supported commands that depend on this path contract are:
- `npm run read-evals -- -- --skill-name <skill>`
- `npm run run-evals -- -- --skill-name <skill> ...`

The critical code paths behind those commands are:
- `application/load-eval-definition/load-eval-definition.ts`
- `infrastructure/filesystem/read-skill-prompt.ts`
- `infrastructure/laminar/prompt-builder.ts`
- `infrastructure/filesystem/eval-runs/iteration-files.ts`

## What does not enter this slice

This slice does **not** do any of the following:
- move `skills/`, `evals/`, `files/`, or `runs/` to a new physical layout
- introduce Promptfoo as the active engine
- redesign benchmark semantics
- remove `filesystem/eval-runs/*` while `--iteration` and `--retry-errors` still survive
- add business logic to the resolver

## Phase 2 implication

This document closes the documentation part of the path seam:
- the current hardcoded layout is explicit,
- the critical resolved paths are explicit,
- and the next slices can keep working against one authority instead of reintroducing scattered path assumptions.
