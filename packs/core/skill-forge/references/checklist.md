# Skill authoring checklist

Use this checklist before considering a skill authoring run complete at `Eval Brief ready`.

## Phase 0 -- Classification and source map
- [ ] The request belongs in a skill, not `AGENTS.md`.
- [ ] The request belongs in a skill, not the vault.
- [ ] The canonical sources for the skill are known.
- [ ] Nearby skills were checked for overlap.

## Phase 1 -- Contract freeze
- [ ] The skill does one job.
- [ ] The single job can be explained in one or two sentences.
- [ ] The trigger is clear.
- [ ] The non-trigger is clear.
- [ ] Stop-and-ask conditions are clear.
- [ ] Definition of done is observable.
- [ ] 2-5 nearby negative cases were identified.

## Phase 2 -- Implementation
- [ ] `name` matches the folder name.
- [ ] `description` states what the skill does.
- [ ] `description` makes the trigger clear.
- [ ] `description` makes the non-trigger clear.
- [ ] `SKILL.md` is procedural and lean.
- [ ] `SKILL.md` includes: When to use, Procedure, Definition of done, Stop conditions, Don't use when.
- [ ] `references/` exists only if it adds real execution value.
- [ ] `assets/` exists only if templates or static artifacts are needed.
- [ ] `scripts/` exists only if instructions alone are not deterministic enough.
- [ ] Provider-specific files under `agents/` are optional and isolated.

## Phase 3 -- Manual dogfooding
- [ ] One explicit invocation was tested.
- [ ] One plausible implicit trigger was tested.
- [ ] At least one negative case was tested.
- [ ] One edge case was tested.
- [ ] Failures were folded back into routing, stop conditions, or support files.

## Phase 4 -- Eval Brief
- [ ] The skill was manually stabilized before downstream eval work started.
- [ ] The Eval Brief is explicit and source-backed.
- [ ] Trigger boundary, success model, and activation probes are frozen.
- [ ] No deleted legacy eval runtime was reintroduced inside the skill.
- [ ] Open needs for the downstream eval scaffold are documented.

