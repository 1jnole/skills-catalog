# Tasks — phase2-add-openspec-workflow-spec

## Objective
Add a stable, repo-wide OpenSpec workflow contract at `openspec/specs/workflow.md` and wire it into agent docs,
bootstrap assets, and the catalog verification gate.

## Checklist
- [x] Add `openspec/specs/workflow.md`
- [x] Reference workflow contract from `openspec/AGENTS.override.md` and `docs/AGENTS.md`
- [x] Update `openspec-bootstrap` to scaffold `openspec/specs/workflow.md`
- [x] Add a workflow spec template to `openspec-bootstrap` assets
- [x] Extend catalog `npm run verify` to require the workflow spec + template
- [x] Run `npm run verify` and capture output

## Commands executed

### Extract and run verify
```bash
npm run verify
```

### Output
```text
> verify
> node scripts/verify-skills.mjs

✅ Required AGENTS.md files exist and are within default size limits
✅ Required bootstrap assets are present
✅ Validated 49 skills (frontmatter + naming + duplicates)
✅ verify: OK
```

## Result
- `npm run verify`: **OK** (exit code 0)
- The repo now contains a stable workflow contract at `openspec/specs/workflow.md`.
