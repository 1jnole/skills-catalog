# Workflow phases for skill creation

This file defines the default execution order for `skill-forge`.

## Phase 0 -- Classify and map
Goal:
- decide `AGENTS.md` vs skill vs vault;
- identify canonical sources;
- inspect nearby skills if this is a refactor.

Gate:
- continue only if the request is one repeatable workflow with a clear trigger.

## Phase 1 -- Freeze the contract
Goal:
- define the job;
- define trigger, non-trigger, stop conditions, definition of done;
- identify nearby negative cases.

Gate:
- continue only if the skill can be explained as one job in one or two sentences.

## Phase 2 -- Implement the minimum useful skill
Goal:
- create the lean `SKILL.md`;
- add references/assets/scripts only when justified;
- validate metadata.

Gate:
- continue only if the core is lean and the support files add execution value.

## Phase 3 -- Dogfood manually
Goal:
- run explicit, implicit, negative, and edge cases.

Gate:
- continue only if failures have been folded back into the skill.

## Phase 4 -- Prepare Eval Brief
Goal:
- freeze the boundary artifact needed by downstream eval authoring;
- document open needs for the downstream scaffold without defining it here.

Gate:
- keep the Eval Brief narrow, source-backed, and free of runtime implementation detail.
- do not recreate the deleted eval runtime inside the skill folder.

