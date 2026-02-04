# Tasks — phase4-skill-assets-and-docs-alignment

## Checklist
- [x] Create OpenSpec change folder with `spec.md` and `tasks.md`.
- [x] Migrate skill-local `templates/` → `assets/`.
- [x] Update any `SKILL.md` references from `templates/...` → `assets/...`.
- [x] Add a verify guard that forbids `templates/` inside skills.
- [x] Add minimal ops doc: `docs/RUN_EVALS.md`.
- [x] Validation:
  - [x] `npm run verify`

## Evidence

### npm run verify

```sh
$ npm run verify
```

Output:

```
> verify
> node scripts/verify-skills.mjs

✅ Required instruction docs exist and are within size limits
✅ Required bootstrap assets are present
✅ Validated 54 skills (frontmatter + naming + duplicates + structure)
✅ Validated core eval coverage: 7 skills
✅ Validated eval dataset: 28 rows
✅ No obvious secrets detected
✅ verify: OK
```
