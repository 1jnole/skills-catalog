## Why

The repository already contains dozens of `packs/**/SKILL.md` files but has no automated check for frontmatter metadata drift. A small metadata validator now gives the catalog a repeatable local guardrail without introducing a new runner or broadening scope into CI or cross-artifact validation.

## What Changes

- Add a metadata validator for `packs/**/SKILL.md` with a pure validation core and a minimal script entrypoint.
- Use Zod as the source of truth for frontmatter validation and infer types from the schema where needed.
- Add TDD-backed unit tests for the validation core, guided by examples and guardrails read from the vault with Obsidian CLI.
- Keep validator diagnostics precise for malformed frontmatter and wrongly typed required fields without broadening the validator into auto-fix or cross-artifact checks.
- Expose a single stable command, `npm run validate:skill-metadata`.

## Capabilities

### New Capabilities
- `skill-metadata-validation`: Validate skill frontmatter metadata for `packs/**/SKILL.md` files and fail fast on missing or invalid required metadata.

### Modified Capabilities
- None.

## Impact

- Affected areas: `package.json`, new files under `scripts/`, tests for the validation core, and this slug's OpenSpec artifacts.
- New development dependencies are required for YAML parsing and direct execution of the TypeScript entrypoint.
- No runtime product behavior, Promptfoo contract, or CI workflow changes.
