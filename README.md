# Skills Catalog — Spec-First + Codex (2026)

A small, composable skills catalog for **spec-driven development** with a spec-first workflow and Codex.
> Note: The *skill namespace* is framework-neutral (`spec-*`). The repository still uses an **OpenSpec-compatible** folder layout (`openspec/...`) as the current storage backend.


## What this catalog optimizes for
- **No silent drops**: requirements present in the brief/README must be captured and traceable.
- **Determinism**: explicit state rules and reproducible acceptance criteria.
- **Low prompt burden**: the workflow is driven by skills + lint/fix loops, not ad-hoc prompting.
- **Small changes**: PR-sized iterations and a single verification gate.

## Install (Codex)

### Option A: repo-scoped (recommended)
Copy the skills you want into:
- `.codex/skills/<skill>/SKILL.md`

This keeps the workflow portable with the repository.

### Option B: user-scoped
Copy the skills you want into:
- `~/.codex/skills/<skill>/SKILL.md`

### Option C: installer (if available)
If your Codex environment provides a `$skill-installer` command, prefer that for repeatable installs.

## References
- OpenAI: Testing Agent Skills Systematically with Evals — https://developers.openai.com/blog/eval-skills/
- OpenAI Codex CLI reference — https://developers.openai.com/codex/cli/reference/
- OpenAI Codex changelog — https://developers.openai.com/codex/changelog/
- OpenAI Codex: AGENTS.md guide — https://developers.openai.com/codex/guides/agents-md/
- OpenAI Codex: Agent skills — https://developers.openai.com/codex/skills/
- OpenAI: Unrolling the Codex agent loop — https://openai.com/index/unrolling-the-codex-agent-loop/


## Repository layout
This repo is organized as **packs** so you can install only what you need:

- `packs/core/skills/<skill>/SKILL.md` (stable, default pack — OpenSpec + guardrails)
- `packs/angular/skills/<skill>/SKILL.md` (Angular pack — framework guidance)

To install, copy the skill folders from the pack(s) you want into one of:
- Repo-scoped: `.codex/skills/<skill>/SKILL.md`
- User-scoped: `~/.codex/skills/<skill>/SKILL.md`

Keep `core` small and always-on; treat framework packs as opt-in.

## Angular pack canonical catalog
The Angular pack is consolidated to these 10 canonical skills:

- `angular-docs-bootstrap`
- `angular-tooling-bootstrap`
- `angular21-state-model`
- `angular21-template-control-flow`
- `angular21-data-httpresource`
- `angular21-routing-patterns`
- `angular21-di-patterns`
- `angular21-defer-hydration`
- `angular21-rxjs-interop-concurrency`
- `angular21-testing-strategy`

### Repo bootstrap (once per repo)

1) `agents-bootstrap` (add `AGENTS.md` managed block + `openspec/AGENTS.override.md`)

For extended human notes, see `docs/AGENTS.md`.

## Conventions (to avoid overlap)
- Prompts should be **orchestration only** (which skill, which order, when to STOP).
- Spec structure, requirement inventory rules, and traceability rules live **only in SKILL.md**.
- Lint/fix skills are the enforcement layer; generators are not trusted alone.
