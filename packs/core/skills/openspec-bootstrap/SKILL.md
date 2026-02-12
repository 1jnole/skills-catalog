---
name: openspec-bootstrap
description: |
  Bootstrap OpenSpec foundations in a repository (workspace, config, and OpenSpec override) so downstream OpenSpec skills can run deterministically.

  Use when:
  - The repo is missing `openspec/` or `openspec/config.yaml`.
  - `agents-bootstrap` is blocked because OpenSpec is not initialized.
  - The user asks to prepare OpenSpec before creating or applying changes.

  Don't use when:
  - The user only wants to update `AGENTS.md` managed content (use `agents-bootstrap`).
  - The user asks to create specific change artifacts (`proposal/specs/design/tasks`) directly.
  - OpenSpec adoption is explicitly disallowed by project policy.

  Outputs:
  - `openspec/config.yaml` created or minimally updated from template.
  - `openspec/AGENTS.override.md` created/updated (enabled by default; disable only if explicitly requested).
  - OpenSpec preflight evidence or actionable blocker if CLI is unavailable.

  Success criteria:
  - `openspec --version`, `openspec schemas --json`, and `openspec list --json` succeed.
  - `openspec/config.yaml` exists with repo-specific context and deterministic rules.
  - OpenSpec-dependent skills are unblocked (`agents-bootstrap`, proposal/apply/archive workflows).
metadata:
  short-description: Bootstrap OpenSpec workspace + config + override
---
## Purpose
Set up the minimum OpenSpec foundation for a repo in a repeatable way:
- initialize or normalize `openspec/config.yaml`
- provision `openspec/AGENTS.override.md` (default behavior)

This skill should unblock OpenSpec workflows without coupling it to unrelated bootstrap tasks.

## Inputs
- Repo root (prefer Git root).
- `install_mode`: `manual` (recommended default) or `auto` (only when explicitly requested).
- Optional install command (required for `auto` mode if CLI is missing).
- `include_agents_override`: `true` by default.

## Outputs
- `openspec/config.yaml`
- `openspec/AGENTS.override.md` (unless explicitly disabled)
- Preflight command results:
  - `openspec --version`
  - `openspec schemas --json`
  - `openspec list --json`

## Preconditions / assumptions
1) Repo root is known.
2) File write access is available.
3) OpenSpec CLI may be missing; installation behavior must follow `install_mode`.
4) If `install_mode=auto`, the install command is explicit and approved; never guess installers.

## Steps
1) Inspect current state.
Input: filesystem + shell.
Action: check for `openspec/`, `openspec/config.yaml`, and `openspec/AGENTS.override.md`; probe CLI availability.
Output: bootstrap gap report (what exists vs what must be created/updated).

2) Resolve CLI strategy.
Input: `install_mode` + CLI status.
Action:
- If CLI exists, continue.
- If CLI is missing and `install_mode=manual`, stop with actionable request for install command.
- If CLI is missing and `install_mode=auto`, run only the explicit install command provided by the user/workflow.
Output: verified CLI readiness or explicit blocker.

3) Create/update OpenSpec config.
Input: repo context + `assets/openspec.config.template.yaml`.
Action:
- Create `openspec/` if missing.
- Create `openspec/config.yaml` if missing.
- If config exists, update minimally to align schema/context/rules without deleting valid project-specific details.
Output: valid `openspec/config.yaml` baseline.

4) Create/update OpenSpec override (optional).
Input: `include_agents_override` + `assets/openspec.AGENTS.override.template.md`.
Action:
- If enabled, create/update `openspec/AGENTS.override.md`.
- Keep file concise and deterministic for phase routing and evidence rules.
Output: `openspec/AGENTS.override.md` aligned with bootstrap policy.

5) Run preflight verification.
Input: configured workspace + CLI.
Action: run:
- `openspec --version`
- `openspec schemas --json`
- `openspec list --json`
Output: command evidence proving bootstrap completeness.

6) Handoff.
Input: completed bootstrap state.
Action: direct next workflow step:
- use `agents-bootstrap` for root managed instructions
- then continue with proposal/apply/archive prompts
Output: clear next-step routing.

## Guardrails
- Never guess a package manager or install command for OpenSpec CLI.
- Never delete existing `openspec/changes/` or archived history as part of bootstrap.
- Keep diffs minimal; avoid unrelated repo refactors.
- If contracts conflict (existing config vs requested policy), stop and ask before overwriting.

## Negative examples
- "Update AGENTS managed block only" -> use `agents-bootstrap`.
- "Write proposal/specs/tasks for slug X now" -> use proposal/continue/apply OpenSpec skills, not this bootstrap.
- "Install whatever OpenSpec package you think is right" -> reject guessing; require explicit install command.
- "Refactor existing OpenSpec change folders while bootstrapping" -> out of scope.

## Edge cases
- `openspec/` exists but `config.yaml` is missing -> create only config.
- `config.yaml` exists with unknown structure -> preserve file and ask before destructive rewrite.
- CLI exists but commands fail due to environment/path issues -> report failing command and stop.
- Monorepo with multiple possible roots -> ask which package/repo root should own `openspec/`.

## Templates/examples
- `assets/openspec.config.template.yaml`: baseline OpenSpec config scaffold with deterministic rules.
- `assets/openspec.AGENTS.override.template.md`: OpenSpec subtree override scaffold for phase routing and evidence.
