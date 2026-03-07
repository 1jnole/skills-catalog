# Skill authoring checklist

Use this checklist before considering a skill ready for manual testing.

## Classification
- [ ] The request belongs in a skill, not `AGENTS.md`.
- [ ] The request belongs in a skill, not the vault.

## Scope and routing
- [ ] The skill does one job.
- [ ] `name` matches the folder name.
- [ ] `description` states what the skill does.
- [ ] `description` makes the trigger clear.
- [ ] `description` makes the non-trigger clear.
- [ ] There is no obvious overlap with another skill.

## Core file quality
- [ ] `SKILL.md` is procedural and lean.
- [ ] `SKILL.md` includes: When to use, Procedure, Definition of done, Stop conditions, Don’t use when.
- [ ] A human can explain what “done” means in one or two sentences.

## Support files
- [ ] `references/` exists only if it adds real execution value.
- [ ] `assets/` exists only if templates or static artifacts are needed.
- [ ] `scripts/` exists only if instructions alone are not deterministic enough.
- [ ] Provider-specific files under `agents/` are optional and isolated.

## Readiness
- [ ] The skill is ready for one explicit test.
- [ ] The skill is ready for one plausible implicit trigger test.
- [ ] The skill is ready for one negative-case test.
- [ ] The skill is ready for one edge-case test.
