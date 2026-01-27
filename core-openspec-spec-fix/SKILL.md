    ---
    name: core-openspec-spec-fix
    description: Fix a Mini-SPEC/SPEC that failed `core-openspec-spec-lint` by rewriting the spec with minimal edits (no new scope). Preserve existing IDs when possible. Output the corrected spec only.
    metadata:
      short-description: core-openspec-spec-fix
    ---

    ## Goal
Auto-repair spec drafts so you don't have to craft prompts every time.

## Inputs
- Current spec markdown
- Lint report from `core-openspec-spec-lint`
- Optional: source brief

## Outputs
- Write ONLY the corrected spec to the same target path implied by context.
- No code changes. No dependency changes. No commands.

## Rules (MUST)
- Minimal-diff mindset: change only what's necessary to pass lint.
- Do NOT add new scope. Missing info → Unknowns/Assumptions.
- Preserve existing IDs (R-*, AC-*) when possible.

## Stop condition (MUST)
- If any lint item cannot be fixed without inventing requirements, STOP and list remaining failures.
