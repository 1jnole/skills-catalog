---
name: agents-md-bootstrap
description: |
  Creates or refactors one repository-root AGENTS.md so coding agents start with short, practical repository guidance.
  Use when the task is to initialize the root AGENTS.md, refresh stale repository instructions, or replace vague agent guidance with a concise project-specific file.
  Do not use for nested AGENTS.override.md work, personal ~/.codex defaults, OpenSpec bootstrap, or broader repository policy rewrites unrelated to agent instructions.
metadata:
  short-description: Bootstrap or refresh one repository-root AGENTS.md
---

# agents-md-bootstrap

Use this skill to create or refactor exactly one repository-root `AGENTS.md` aligned with Codex/OpenAI guidance. Keep the file short, practical, and grounded in real repository facts. Use nested `AGENTS.override.md` only when a later task explicitly asks for local rules closer to specialized work.

## Use this skill when

Use this skill when:
- the task is to create a missing repository-root `AGENTS.md`
- the task is to refresh an existing root `AGENTS.md` so it becomes shorter, more practical, or more repo-specific
- the task is to replace vague agent instructions with a root file that covers the repository layout, commands, conventions, constraints, and done criteria
- the task is to create a starter root `AGENTS.md` from observable repository facts plus explicit user constraints

## Do not use this skill when

Do not use this skill for:
- personal Codex defaults such as `~/.codex/AGENTS.md` or `config.toml`
- nested `AGENTS.override.md` authoring inside a subdirectory
- OpenSpec bootstrap or OpenSpec workflow setup
- broad repository governance rewrites beyond agent instructions
- managed-baseline sync systems that depend on extra filenames such as `AGENTS.managed.md`

## Stop and ask when

Stop and ask when:
- it is unclear which repository root owns the target `AGENTS.md`
- the request requires verified project-specific commands or conventions, but the current working context does not expose enough evidence to ground them safely
- the request inseparably mixes root `AGENTS.md` bootstrap with global defaults, nested overrides, or unrelated policy work
- an existing `AGENTS.md` contains conflicting guidance and the intended source of truth is not clear

## Inputs

The request must provide, or the repository must expose:
- one target repository root
- enough grounded evidence to write a useful root `AGENTS.md`

Grounded evidence can include:
- the existing root `AGENTS.md`
- repository files such as `package.json`, build scripts, docs, or Makefiles
- explicit user constraints about workflow, tooling, or review expectations

If the user asks for a verified project-specific file and the current context cannot support verified commands or conventions, stop and ask instead of inventing them.

## Outputs

Produce:
- one repository-root `AGENTS.md`
- a short, practical file that is grounded in the current repository context
- optional follow-up advice to add a nested `AGENTS.override.md` later, only when local rules are genuinely needed near specialized work

The exact terminal marker is:

`AGENTS.md bootstrap ready`

Use `AGENTS.md bootstrap ready` only for valid trigger-path completion. Do not end non-trigger or stop-and-ask responses with that marker.

## Required response format

Use the exact response envelope below.

### Trigger path

Line 1 must be exactly:

`Result: trigger`

Then give the concise bootstrap response.

The final line must be exactly:

`AGENTS.md bootstrap ready`

### Non-trigger path

Line 1 must be exactly:

`Result: non-trigger`

Then explain briefly why the request is outside root `AGENTS.md` bootstrap scope.

Do not end with `AGENTS.md bootstrap ready`.

### Stop-and-ask path

Line 1 must be exactly:

`Result: stop-and-ask`

Then ask only for the missing clarification needed to continue safely.

Do not end with `AGENTS.md bootstrap ready`.

## Procedure

1. Confirm that the job is to create or refactor exactly one repository-root `AGENTS.md`.
2. Resolve the repository root and inspect the current root `AGENTS.md`, if present.
3. Read `assets/AGENTS.root.template.md` before drafting or refactoring the file.
4. Gather only grounded repository facts that belong in a root `AGENTS.md`:
   - repo layout and important directories
   - setup, build, test, and lint commands
   - engineering conventions or review expectations
   - constraints or do-not rules
   - what done means and how to verify work
5. Draft or refactor the root `AGENTS.md` using the template structure, but keep only the sections supported by current evidence.
6. Keep the file short and practical. Remove vague aspirations, duplicate policy, and long task-specific prose.
7. Preserve accurate existing guidance when it still matches the repository. Replace stale or contradictory guidance.
8. Do not create `AGENTS.managed.md`, `AGENTS.baseline.md`, `openspec/AGENTS.override.md`, or any other extra instruction filename.
9. Do not create a nested `AGENTS.override.md` unless a separate follow-up task explicitly asks for local override authoring.
10. Before finalizing, verify that the resulting root file covers the grounded basics the repository actually supports and that every listed command or rule is either observable in the repo or explicitly provided by the user.
11. Start the response with the exact `Result:` line for the routed path.
12. On trigger paths, stop at the exact terminal marker `AGENTS.md bootstrap ready`.

## Guardrails

- Prefer the standard instruction filenames Codex already discovers: `AGENTS.md` and `AGENTS.override.md`.
- Keep the root file concise. If rules become large or highly local, leave them for a closer `AGENTS.override.md` or a referenced project document in a later task.
- Do not invent project commands, approval policies, or deployment steps.
- Do not rewrite personal `~/.codex` defaults from this skill.
- Do not absorb OpenSpec bootstrap, config, or prompt work into this skill.
- Prefer minimal, reviewable diffs when refactoring an existing file.

## Done when

The skill is done when:
- the repository root `AGENTS.md` exists or has been refactored
- the file is short, practical, and grounded in current repository facts
- the file uses standard AGENTS discovery conventions without extra managed-baseline filenames
- any nested override need is deferred unless explicitly requested

## References

Consult only when needed:
- `assets/AGENTS.root.template.md` for the recommended root file structure
