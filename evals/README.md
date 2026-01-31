# Evals prep (golden prompts)

This folder contains a **small golden prompt set** to validate the skills catalog manually (smoke tests) before building a full eval harness.

## How to use now (manual)
- Pick 5–10 prompts from `golden-prompts.md`
- Run them in Codex CLI (explicit skill calls recommended)
- Grade against the **Expected checks** only (no subjective scoring)

## When to convert to an eval harness
Convert this set to a CSV-driven harness once:
- skill names/layout are stable (no renames),
- `AGENTS.md` + overrides are stable,
- the prompts reflect real workflows (from at least 2 repos / ~10 runs).

At that point, create `evals/prompts.csv` in the OpenAI eval-skills style and run `codex exec --json` with deterministic graders.
