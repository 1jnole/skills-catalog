# Skill QA checklist (authoring)

Use this checklist **before** publishing/refactoring a skill.

## Routing & metadata
- [ ] `SKILL.md` YAML frontmatter has **name** and **description**.
- [ ] `name` is kebab-case, 1–64 chars, and matches the skill folder name.
- [ ] `description` is <= 1024 chars, third-person capability statement.
- [ ] `description` includes **positive triggers** (use when) and **negative triggers** (don’t use when).
- [ ] Triggers are objective (inputs/context), not vague intent (“write good code”).

## One job & scope
- [ ] Skill is either:
  - **Guardrail** (pre-flight) with delegation rules, OR
  - **Job-based** (single operation) with explicit inputs/outputs.
- [ ] No “encyclopedia”: dense rules/examples live in `references/` or `assets/`.

## Procedure quality
- [ ] Steps are imperative, deterministic, and produce **minimal diffs**.
- [ ] Includes stop conditions (when to ask for context instead of guessing).
- [ ] Avoids adding dependencies/tools unless the user asks or the repo already uses them.

## References structure (optional)
- [ ] If helpful, uses one of:
  - `references/catalog.md`, `references/patterns.md`, `references/pitfalls.md`, OR
  - a single `references/guide.md`, OR
  - a playbook-style doc (e.g., `AGENTS.md`-like) referenced from `SKILL.md`.

## Packaging
- [ ] `agents/openai.yaml` exists (recommended) and sets safe invocation policy.
- [ ] `assets/` contains any required templates (if the procedure references them).
- [ ] `scripts/` contains only tiny, deterministic helpers (if needed).
