# Tasks — phase1-add-catalog-verify

## Objective
Make the skills catalog self-certifying with a deterministic, offline `npm run verify` that catches discovery-breaking issues (frontmatter/naming/layout) and ensures core instruction files exist.

## Checklist
- [x] Add `scripts/verify-skills.mjs` structural verifier (offline, fast).
- [x] Replace placeholder `npm run verify` with the verifier.
- [x] Add root `AGENTS.md` and `openspec/AGENTS.override.md` (short, truncation-safe).
- [x] Run `npm run verify` and capture output.

## Commands executed

### 1) Verify script directly
```bash
node scripts/verify-skills.mjs
echo $?
```

Output:
```txt
✅ Required AGENTS.md files exist and are within default size limits
✅ Required bootstrap assets are present
✅ Validated 49 skills (frontmatter + naming + duplicates)
✅ verify: OK
```

Exit code:
```txt
0
```

### 2) Gate: npm run verify
```bash
npm run verify
echo $?
```

Output:
```txt
> verify
> node scripts/verify-skills.mjs

✅ Required AGENTS.md files exist and are within default size limits
✅ Required bootstrap assets are present
✅ Validated 49 skills (frontmatter + naming + duplicates)
✅ verify: OK
```

Exit code:
```txt
0
```

## Notes / Decisions
- Verification is intentionally **structural-only** to avoid networked tooling and keep `verify` stable.
- YAML is validated for the required Codex fields (`name`, `description`) and common failure modes; Codex ignores unknown keys.
