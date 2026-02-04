# Proposal — Core eval signal set

## Why
A small, high-signal eval set prevents regression and keeps maintenance cost low.

## What changes
- Define a curated list of core skills that must have eval coverage.
- For each core skill: explicit positive, implicit positive, and negative control.
- Use deterministic checks (filesystem + allowlist writes) instead of snapshotting long text.

## Non-goals
- Full coverage across all packs.
- Snapshot testing of natural-language output.

## References
- OpenAI eval skills guide (explicit/implicit/negative controls + deterministic checks): https://developers.openai.com/blog/eval-skills/

