# Edge cases

This file captures common boundary mistakes for `skill-contract-forge`.

It is supportive, not normative. Follow `../SKILL.md` if there is any tension.

## Mixed workflow requests

Return `Classification: stop-and-ask` when the request mixes contract authoring and implementation in one inseparable step.

Examples:
- "define the skill and also implement the runtime harness now"
- "rewrite the contract and generate the benchmark suite in the same pass"

If the user clearly says to do contract work first and defer later implementation, stay in the trigger path and record the deferred intent instead of widening scope.

## Ambiguous refactor or rewrite prompts

For `existing-skill-refactor` and `skill-rewrite`, the target skill must be clear.

Return `Classification: stop-and-ask` when:
- the user asks for "a refactor" without naming the skill
- the user says "refactor this skill", "rewrite this", or "tighten the contract" without naming which existing skill should change
- the request implies several possible target skills
- the request mixes rewrite and refactor language without a stable target

Do not infer the target from weak context if a direct clarification is needed to freeze the contract safely.

Example:
- Prompt: `Refactor this skill so the contract is clearer, keep it contract-first, and stop at Eval Brief ready.`
- Expected result: `Classification: stop-and-ask`
- Expected clarification: ask which existing skill should be refactored, ideally by name or description
- Expected absence: no `Workflow: ...`, no Eval Brief JSON, no `Eval Brief ready`

Rewrite variant:
- Prompt: `Rewrite the skill so it matches the current repo docs, freeze the contract first, and stop at Eval Brief ready.`
- Expected result: `Classification: stop-and-ask`
- Expected clarification: ask which existing skill should be rewritten, ideally by name or description of the skill
- Expected absence: no `Workflow: ...`, no Eval Brief JSON, no `Eval Brief ready`

Anti-example:
- Do not answer with `Classification: trigger`
- Do not pick `Workflow: existing-skill-refactor`
- Do not pick `Workflow: skill-rewrite`
- Do not assume the target is `skill-contract-forge` just because the prompt is evaluated inside this repo or skill folder

## Downstream eval noise

Mentions of benchmark suites, scoring, runtime evals, or Promptfoo do not automatically make the request non-trigger.

Stay in the trigger path when those items are clearly deferred to a later phase and the present job is still contract authoring.

Return `Classification: non-trigger` when the actual requested work is downstream eval authoring, runtime wiring, or benchmark execution.

## Policy and runtime work

Return `Classification: non-trigger` when the request is mainly about:
- repository policy
- `AGENTS.md`
- shared runtime harnesses
- provider execution strategy
- benchmark or grader implementation

Those are adjacent to skill authoring but do not belong to the contract-freezing step.

## Quality edge

When the request is trigger-shaped but underspecified, prefer `Classification: stop-and-ask` over inventing:
- the target skill
- the single job
- the success model
- the source-of-truth documents

This skill should hand off a precise brief, not a speculative one.

## Grounded source refs

Keep `sourceRefs` grounded in sources that are really available for the current run.

For trigger briefs:
- cite repo-local files that exist
- cite user-provided material when it was explicitly supplied
- keep the list minimal if that is all the repo truth supports
- allow `sourceRefs: []` when no repo-local source materially shaped the contract
- cite `AGENTS.md` only when repo-level policy actually influenced the brief

Do not:
- invent `docs/contracts/<skill>.md` just because that path sounds plausible
- cite `packs/.../<target-skill>/SKILL.md` for a new skill that does not exist yet
- pad `sourceRefs` with decorative paths that were not actually used to freeze the contract

If the contract would materially depend on a stronger source-of-truth doc that is not present, prefer `Classification: stop-and-ask` over pretending the authority exists.
