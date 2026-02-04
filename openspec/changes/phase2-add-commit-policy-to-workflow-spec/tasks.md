# Tasks — Add commit message policy to workflow spec

## Objective
Add Conventional Commits policy (scope = OpenSpec slug + traceability footer) to the stable workflow spec and the bootstrap template.

## Checklist
- [x] Update stable workflow spec with commit message policy
- [x] Update spec-bootstrap workflow spec template
- [x] Run the catalog gate: `npm run verify`

## Commands executed
```bash
npm run verify
```

## Output
```

> verify
> node scripts/verify-skills.mjs

✅ Required AGENTS.md files exist and are within default size limits
✅ Required bootstrap assets are present
✅ Validated 49 skills (frontmatter + naming + duplicates)
✅ verify: OK
```

## Result
- `npm run verify`: OK
