# tasks.md — Evidence log

## Objective
- Harden the Phase 1 bootstrap skills (`openspec-bootstrap`, `agents-bootstrap`) to be truncation-safe and aligned with current Codex + AGENTS.md + OpenSpec conventions.

## Checklist
- [x] Add missing OpenSpec templates (proposal/design/spec-delta) to `openspec-bootstrap` assets
- [x] Update `openspec-bootstrap` instructions to scaffold the expanded template set
- [x] Tighten `agents-bootstrap` (precedence + context budget) and update its templates
- [x] Add a human-oriented fallback doc: `docs/AGENTS.md`
- [x] Update `README.md` install + bootstrap sections
- [x] Run the repo gate

## Commands + outputs

### Environment
```bash
node -v
npm -v
```

Output:
```text
v22.16.0
10.9.2
```

### Asset inventory
```bash
ls -1 skills/.curated/openspec-bootstrap/assets
ls -1 skills/.curated/agents-bootstrap/assets
```

Output:
```text
design.template.md
openspec-README.md
proposal.template.md
spec-delta.template.md
spec.template.md
tasks.template.md
AGENTS.managed.md
openspec.AGENTS.override.md
```

### Gate
```bash
npm run verify
```

Output:
```text
> verify
> node -e "console.log('verify: skipped (structural validation will be added later)')"

verify: skipped (structural validation will be added later)
```

Exit code:
```text
0
```

## Notes / decisions (minimal)
- No new validation scripts were introduced; only templates + documentation + bootstrap instructions.
