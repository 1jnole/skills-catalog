# Tasks — Phase 6B (Tier B evals batch 1)

## Batch selection
**Selected Tier B (P1) skills for batch1 (3 skills x 4 prompts):**
- spec-spec-fix
- spec-tasks-fix
- core-gates-and-evidence

Note on selection:
- The phase5 recommendations included `spec-change-slugger` / `spec-drift-check`, but those skills are **output-only** (no file writes) in their current contracts, and this repo’s check library is **filesystem/trace based** (no “final message” assertion). To avoid meaningless evals, batch1 focuses on fix/evidence skills that can be checked objectively.

**Remaining Tier B backlog (batch2+):**
- core-error-fix-loop
- spec-apply-with-evidence
- spec-change-slugger
- spec-drift-check
- spec-intake-router
- spec-spec-from-brief
- spec-tasks-lint

## Checklist
- [x] Add a fixture that includes an OpenSpec change with a broken spec + broken tasks.md (needed for fix skills).
- [x] Add 12 rows to evals/prompts.extended.csv (EV-101..EV-112) with 4 prompts per selected skill.
- [x] Ensure negatives are workspace-write + no_writes.
- [x] Run npm run verify and capture output.
- [x] (Optional) Run node scripts/run-evals.mjs --id EV-101 and capture output.

## Evidence log

```bash
$ npm run verify

> verify
> node scripts/verify-skills.mjs

✅ Required instruction docs exist and are within size limits
✅ Required bootstrap assets are present
✅ Validated 54 skills (frontmatter + naming + duplicates + structure)
✅ Validated core eval coverage: 7 skills
✅ Validated eval dataset: 28 rows
✅ Validated extended eval dataset: 12 rows
✅ No obvious secrets detected
✅ verify: OK
```

```bash
$ node scripts/run-evals.mjs --id EV-101
ERROR: codex not found on PATH. Install: npm i -g @openai/codex (then ensure `codex --help` works).

=== EV-101 (spec-spec-fix) ===
[EV-101] FAIL
 - codex not found on PATH. Install: npm i -g @openai/codex (then ensure `codex --help` works).

Summary: 0/1 passing
```
