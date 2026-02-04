---
name: spec-change-slugger
description: Generate a stable verb-led kebab-case slug for an OpenSpec change folder at openspec/changes/<slug>/. Deterministic - same input -> same slug.
metadata:
  short-description: Title -> <slug>
---
## Goal
Produce a kebab-case, verb-led, stable slug for `openspec/changes/<slug>/`.

## When to use

- Before creating a new change folder under `openspec/changes/<slug>/...`.
- When you want a stable, kebab-case slug derived from the request title.

## When NOT to use

- A `<slug>` already exists and must be reused.
- You need to rename an existing change folder (do that explicitly, do not regenerate).

## Inputs
- Feature/title sentence (e.g., "Add pet detail page")

## Outputs
- A single slug (kebab-case), no extra text.

## Rules (MUST)
- Start with a verb: add|fix|refactor|improve|remove|support|enable|update
- Include 2–5 meaningful tokens
- No dates, no "v1", no "final"
- Deterministic: same input → same output

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

