---
name: core-openspec-change-slugger
description: "Generate a stable, verb-led kebab-case OpenSpec change slug from a title/context for openspec/changes/<slug>/."
metadata:
  short-description: OpenSpec Slugger
  category: openspec
---

## Goal
Produce a deterministic slug for `openspec/changes/<slug>/`.

## Inputs
- A short title (e.g., "Add pet detail page")
- Optional: repo/app name (only if needed to disambiguate)

## Outputs
- A single slug string (kebab-case). No extra text.

## Rules (MUST)
- Start with a verb: add|fix|refactor|improve|remove|support|enable|update
- 2–5 meaningful tokens total
- No dates, no "v1", no "final"
- Deterministic: same input → same slug
