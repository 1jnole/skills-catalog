# Tasks — phase2-add-golden-prompts

## Objective
Add a small, deterministic golden prompt set to validate skill behavior manually now and to seed a future eval harness.

## Checklist
- [x] Add `evals/golden-prompts.md` with 15 prompts covering core workflow skills.
- [x] Add `evals/golden-prompts.csv` (same prompts in a harness-friendly format).
- [x] Add `evals/README.md` describing manual usage and "stable enough for evals" criteria.
- [ ] Run `npm run verify` and capture output.

## Commands executed

### 1) Run catalog gate
```bash
npm run verify
echo $?
```

Output:
```txt
✅ Required AGENTS.md files exist and are within default size limits
✅ Required bootstrap assets are present
✅ Validated 49 skills (frontmatter + naming + duplicates)
✅ verify: OK
EXIT:0
```
