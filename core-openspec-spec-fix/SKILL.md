---
name: core-openspec-spec-fix
description: "Given a failing spec lint report, rewrite the spec with minimal edits to satisfy lints. Do not invent requirements; missing info becomes UNKNOWN/ASSUMED explicitly."
metadata:
  short-description: Spec fix (minimal diff)
  category: openspec
---

## Goal
Auto-repair spec drafts so you don't need to "craft a better prompt" each time.

## Inputs
- Current spec markdown
- Lint report from `core-openspec-spec-lint`
- Optional: source brief (README/notes)

## Outputs
- Write ONLY the corrected spec (same path as caller expects).
- No code changes. No dependency changes. No command execution.

## Rules (MUST)
- Minimal-diff mindset: change only what is necessary to pass lint.
- Do NOT add new scope; missing info → Unknowns/Assumptions.
- If the lint is about coverage:
  - Add missing R-* entries using the source wording.
  - Mark as UNKNOWN if details are missing.
- Ensure Traceability includes explicit statuses:
  - `R-1 [MAPPED] → AC-1`
  - `R-2 [OUT] → Out of scope`
  - `R-3 [ASSUMED] → A1`
  - `R-4 [UNKNOWN] → Q1`

## Stop condition (MUST)
After edits, re-check mentally against the lint list.
If any lint item is still unfixed, STOP and list remaining failures (do not pretend it's fixed).
