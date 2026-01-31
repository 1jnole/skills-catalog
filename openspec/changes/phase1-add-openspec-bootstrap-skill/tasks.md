# tasks.md — phase1-add-openspec-bootstrap-skill

## Objective
- Add a curated `openspec-bootstrap` skill that scaffolds a minimal `openspec/` workspace (changes + templates) without adding repo dependencies.

## Checklist
- [x] Add new skill folder under `skills/.curated/openspec-bootstrap/` with valid frontmatter
- [x] Include copy-friendly templates in `assets/`
- [x] Update catalog README to mention the bootstrap flow
- [x] Run the repo gate: `npm run verify`

## Commands + outputs

### Environment + gate
```bash
node -v
v22.16.0

npm -v
10.9.2

npm run verify

> verify
> node -e "console.log('verify: skipped (structural validation will be added later)')"

verify: skipped (structural validation will be added later)
exit_code=0
```

### Curated skills snapshot
```bash
find skills/.curated -maxdepth 2 -name SKILL.md | sort
 skills/.curated/core-error-fix-loop/SKILL.md
 skills/.curated/core-gates-and-evidence/SKILL.md
 skills/.curated/core-minimal-diff-implementer/SKILL.md
 skills/.curated/core-pr-ready-packager/SKILL.md
 skills/.curated/openspec-bootstrap/SKILL.md
 skills/.curated/openspec-change-slugger/SKILL.md
 skills/.curated/openspec-intake-router/SKILL.md
 skills/.curated/openspec-slice-into-iterations-from-brief/SKILL.md
 skills/.curated/openspec-slice-into-iterations-from-readme/SKILL.md
 skills/.curated/openspec-spec-fix/SKILL.md
 skills/.curated/openspec-spec-from-brief/SKILL.md
 skills/.curated/openspec-spec-from-readme/SKILL.md
 skills/.curated/openspec-spec-lint/SKILL.md
 skills/.curated/openspec-tasks-fix/SKILL.md
 skills/.curated/openspec-tasks-lint/SKILL.md
 skills/.curated/repo-env-vars-bootstrap/SKILL.md
 skills/.curated/repo-gates-bootstrap/SKILL.md
 skills/.curated/repo-runbook-command-extractor/SKILL.md
 skills/.curated/repo-testing-suites-discovery/SKILL.md
```

## Notes
- No new runtime tooling was added; this change is instruction-only plus templates.
