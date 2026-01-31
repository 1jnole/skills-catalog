# Proposal — phase2-add-golden-prompts

## Why
Before building a full eval harness, we need a small, representative prompt set ("golden prompts") to validate skills manually and to serve as a stable seed for future evals.

This keeps the catalog acotado (no networked tooling, no CI complexity) while enabling a repeatable human review loop.

## What Changes
- Add `evals/` folder with:
  - `golden-prompts.md` (15 prompts covering the core workflow skills)
  - `golden-prompts.csv` (same set in a harness-friendly format)
  - `README.md` (how to run manually; criteria for upgrading to full eval harness)

## Non-goals
- No `codex exec` harness yet.
- No graders/rubrics yet.
- No docs-lint / spellcheck.
