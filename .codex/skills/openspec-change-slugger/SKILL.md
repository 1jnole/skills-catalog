---
name: openspec-change-slugger
description: Generate a stable verb-led kebab-case slug for an OpenSpec change folder at openspec/changes/<slug>/. Deterministic - same input -> same slug.
metadata:
  short-description: Title -> <slug>
---
## Goal
Produce a kebab-case, verb-led, stable slug for `openspec/changes/<slug>/`.

## Inputs
- Feature/title sentence (e.g., "Add pet detail page")

## Outputs
- A single slug (kebab-case), no extra text.

## Rules (MUST)
- Start with a verb: add|fix|refactor|improve|remove|support|enable|update
- Include 2–5 meaningful tokens
- No dates, no "v1", no "final"
- Deterministic: same input → same output

