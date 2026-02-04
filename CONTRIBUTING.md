# Contributing

This repository is a **skills catalog** for Codex. Keep changes small and deterministic.

## Adding or changing a skill
1. Create/edit a skill under `packs/<pack>/skills/<skill-name>/SKILL.md`
2. Keep the skill **agnostic** (no company/product-specific examples unless clearly scoped).
3. Required structure:
   - YAML frontmatter with `name` + `description`
   - Sections: Goal, When to use, When NOT to use, Inputs, Outputs, Failure modes

## Evals
- Evals live in `evals/prompts.csv` and must remain executable.
- For **core skills** listed in `evals/core-skills.json`, provide:
  - 1 explicit positive
  - 1 implicit positive
  - 1 implicit negative control (`should_trigger=false`)

Run gates locally:
```bash
npm run verify
npm run evals   # requires `codex` installed
```
