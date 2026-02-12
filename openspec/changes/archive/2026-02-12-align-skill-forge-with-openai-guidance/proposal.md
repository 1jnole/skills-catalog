## Why

`packs/core/skills/skill-forge/SKILL.md` already follows the core Codex skills pattern, but a few instructions are more rigid than current guidance and can cause unnecessary artifacts or weaker security defaults.
Aligning it now keeps the skill accurate and reduces misconfiguration risk for future skill authors.

## What Changes

- Update path guidance to prefer explicit target path, then repo conventions, then Codex scope defaults (`REPO`, `USER`, `ADMIN`) instead of forcing a single path.
- Make template generation conditional so `assets/SKILL.template.md`, `assets/openai.template.yaml`, and `assets/checklist.md` are created only when they add value.
- Strengthen networking guardrails with explicit two-layer allowlist guidance and `domain_secrets` usage for authenticated domains.
- Add deterministic invocation guidance with the explicit phrase: `Use the <skill name> skill.`
- Keep existing strengths unchanged: routing-style description, negative examples, edge cases, and asset-based templates.

## Capabilities

### New Capabilities
- `skill-forge-alignment`: Keeps the skill-forge instructions and helper templates aligned with current Codex skills and shell safety guidance.

### Modified Capabilities
- None.

## Impact

- Affected docs/instructions:
  - `packs/core/skills/skill-forge/SKILL.md`
  - `packs/core/skills/skill-forge/assets/checklist.md`
  - `packs/core/skills/skill-forge/assets/openai.template.yaml` (if needed for guidance alignment)
- No runtime code or package dependencies change.
