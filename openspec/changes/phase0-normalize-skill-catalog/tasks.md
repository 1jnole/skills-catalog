# tasks — phase0-normalize-skill-catalog

## Objective
Normalize catalog layout + naming to match Agent Skills constraints and unblock discovery/validation.

## Checklist
- [x] Move skills into `skills/.curated` and `skills/.experimental`
- [x] Remove distribution noise directories (e.g. `.git/`, `.idea/`)
- [x] Fix frontmatter delimiter indentation issues
- [x] Fix any non-kebab-case `name` fields and align directory names
- [x] Add a single repo gate: `npm run verify`
- [x] Record reproducible validation output

## Commands executed

### Count skills
```bash
find skills -name SKILL.md | wc -l
find skills -maxdepth 2 -mindepth 2 -type d | wc -l
```

Output:
```txt
47
47
```

### Gate
```bash
npm run verify
echo "exit_code=$?"
```

Output:
```txt
> verify
> node scripts/skills-validate.mjs

✓ skills validation passed
exit_code=0
```

## Notes / decisions
- Angular skills were placed under `skills/.experimental` to keep the default pack small; selection is expected to be done via Codex config.
- Only two skill names were changed (CamelCase → kebab-case) to satisfy the `name` constraints.
