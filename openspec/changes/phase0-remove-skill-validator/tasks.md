# Change: phase0-remove-skill-validator

## Objective
Remove scripts/skills-validate.mjs (non-standard).

## Checklist
- [x] Delete scripts/skills-validate.mjs
- [x] Update package.json verify script
- [x] Run npm run verify (exit 0)

## Commands

```bash
rm -f scripts/skills-validate.mjs
rmdir scripts
cat package.json
npm run verify
```

## Output

```text
> verify
> node -e "console.log(\"verify: skipped (structural validation will be added later)\")"

verify: skipped (structural validation will be added later)
exit_code=0
```

## Notes
- Structural validation can be added later (Phase 2) via an ecosystem validator if desired.
