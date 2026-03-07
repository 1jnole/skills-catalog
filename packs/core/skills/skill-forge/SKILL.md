---
name: skill-forge
description: "Creates or refactors a single agent skill with clear routing metadata, a lean procedural SKILL.md, and optional support files only when they add real value. Don't use for repo-wide AGENTS.md authoring or broad vault content."
---

# skill-forge

## When to use
Use this skill when the task is to create, reshape, or standardize **one** reusable agent skill.

Use it when the requested result is a workflow unit with:
- a clear trigger;
- a clear non-trigger;
- a procedural core;
- a small, maintainable folder structure.

## Procedure
Step 1: Classify the request before writing anything.
1. Decide whether the content belongs in `AGENTS.md`, a skill, or the vault.
2. If the request is repo-wide, always-on guidance, stop and route to `AGENTS.md` authoring.
3. If the request is broad reference material, stop and route to the vault.
4. Continue only if the request is a repeatable workflow with a clear trigger.

Step 2: Define the contract.
1. Identify the single job the skill will perform.
2. Write the routing boundary:
   - when to use it;
   - when not to use it.
3. Write a short definition of done.
4. Identify 2–5 nearby negative cases to reduce overlap.
5. If the skill cannot be explained as one job in one or two sentences, stop and split or narrow it.

Step 3: Choose the skill profile.
1. Use `assets/skill-template.guardrail.md` for a small, frequent pre-flight or safety workflow.
2. Use `assets/skill-template.job.md` for a single mechanical workflow with explicit steps.
3. Prefer the smallest profile that fits.

Step 4: Draft metadata first.
1. Define a unique kebab-case `name` that matches the folder name.
2. Draft a `description` that states:
   - what the skill does;
   - when to use it;
   - when not to use it.
3. Run `python scripts/validate-metadata.py --name "<name>" --description "<description>"`.
4. If validation fails, correct the metadata and run it again.

Step 5: Create the minimum useful structure.
1. Create the skill folder with `SKILL.md`.
2. Add `references/` only when routing notes, patterns, or pitfalls materially improve execution.
3. Add `assets/` only when the skill needs reusable templates or static artifacts.
4. Add `scripts/` only when plain instructions are not deterministic enough.
5. Add provider-specific compatibility files under `agents/` only when they improve runtime behavior.

Step 6: Write a lean `SKILL.md`.
1. Start from the selected template.
2. Keep the core file procedural and compact.
3. Keep larger examples and supporting material outside `SKILL.md`.
4. Make sure the final skill clearly communicates:
   - when to use it;
   - the procedure;
   - what done looks like;
   - when to stop and ask for context;
   - when not to use it.

Step 7: Self-audit before finishing.
1. Read `references/checklist.md`.
2. Confirm that the skill has one job, a clear trigger boundary, and no obvious overlap.
3. Remove support files that do not add real value.
4. Recommend manual dogfooding with:
   - one explicit invocation;
   - one plausible implicit trigger;
   - one negative case;
   - one edge case.

## Definition of done
The result is a single skill directory that:
- has valid routing metadata;
- can be explained as one reusable workflow;
- uses a lean procedural `SKILL.md`;
- includes support files only when justified;
- is ready for manual testing.

## Stop conditions
Stop and ask for clarification when:
- the request mixes more than one workflow into one skill;
- the boundary between skill and vault is unclear;
- the success condition cannot be stated clearly;
- the skill overlaps heavily with an existing skill and the split is unresolved.

## Don’t use when
Do not use this skill when the task is:
- writing or refactoring `AGENTS.md` for repo-wide rules;
- building a broad knowledge base or course-note vault;
- creating a multi-skill catalog plan without drafting one concrete skill.
