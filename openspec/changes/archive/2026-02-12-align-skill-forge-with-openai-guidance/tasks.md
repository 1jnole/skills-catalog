## Implementation tasks

- [x] Update `packs/core/skills/skill-forge/SKILL.md`:
  - [x] Replace fixed path instruction with precedence-based location guidance (explicit target -> repo convention -> Codex scope defaults).
  - [x] Make Step 4 asset creation conditional.
  - [x] Add explicit network guardrail language (allowlist + `domain_secrets`).
  - [x] Add deterministic invocation phrase guidance (`Use the <skill name> skill.`).
- [x] Update helper asset text where needed so checks/templates match the new conditional behavior.
- [x] Validate and verify:
  - [x] `openspec validate "align-skill-forge-with-openai-guidance" --type change`
  - [x] `npm run verify` (blocked in this repo state; fallback applied per AGENTS: validate + task-local checks)

## Evidence log

| Date | Command | Result | Notes |
| --- | --- | --- | --- |
| 2026-02-12 | `openspec validate "align-skill-forge-with-openai-guidance" --type change` | PASS | Change validates successfully. |
| 2026-02-12 | `npm run verify` | FAIL | Blocked: `scripts/verify-skills.mjs` missing in repo (`MODULE_NOT_FOUND`). |
| 2026-02-12 | `rg --line-number "Resolve folder path in this order|only when useful|domain_secrets|Use the <skill name> skill|allowlists" packs/core/skills/skill-forge/SKILL.md packs/core/skills/skill-forge/assets/SKILL.template.md packs/core/skills/skill-forge/assets/openai.template.yaml packs/core/skills/skill-forge/assets/checklist.md` | PASS | Confirms required guidance landed in edited files. |
| 2026-02-12 | `openspec archive "align-skill-forge-with-openai-guidance" --yes` | PASS | Archived and synced specs to `openspec/specs/skill-forge-alignment/spec.md`. |
| 2026-02-12 | `openspec list --json` | PASS | No active changes remain (`{\"changes\":[]}`). |
