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
- the request implies several possible target skills
- the request mixes rewrite and refactor language without a stable target

Do not infer the target from weak context if a direct clarification is needed to freeze the contract safely.

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
