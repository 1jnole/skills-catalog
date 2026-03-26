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

Keep `sourceRefs` grounded in durable authority that should really survive the current run.

For trigger briefs:
- treat `sourceRefs` as portable handoff authority, not as an inventory of inspected files
- cite user-provided material when it was explicitly supplied and still matters downstream
- keep the list minimal if the distilled brief already carries the contract
- allow `sourceRefs: []` when repo-local material shaped the brief but does not need to survive as a file reference downstream

Do not:
- invent `docs/contracts/<skill>.md` just because that path sounds plausible
- cite `packs/.../<target-skill>/SKILL.md` for a new skill that does not exist yet
- preserve `AGENTS.md`, spec files, notes, or other repo-local authoring paths as durable refs when their substance has already been distilled into the brief
- pad `sourceRefs` with decorative paths that were not actually used to freeze the contract

If the contract would materially depend on a stronger source-of-truth doc that is not present, prefer `Classification: stop-and-ask` over pretending the authority exists.

## Portable downstream content

If downstream phases must still inspect examples, templates, or long reference material:
- freeze that need through `authoring.packageShape`
- route reusable examples or reference content into `references/`
- route templates or output scaffolds into `assets/`
- keep the approved brief as the handoff artifact instead of teaching auxiliary local source paths as required downstream authority

For existing-skill refactors and rewrites:
- do not drop `assets` from `authoring.packageShape` when the current package already owns a maintained template, baseline, or scaffold that downstream implementation must preserve
- do not treat a single-file `assets/` folder as decorative noise if it carries deterministic skill behavior
- prefer preserving that durable support surface in `supportFolders` over forcing downstream implementation to rediscover it from local inspection

## Durable approved brief artifact

When the environment supports working-file persistence, prefer one inspectable approved brief artifact, commonly an `eval-brief.json`, as the contract-to-implementation handoff.

Do not:
- leave the only approved brief in transient chat output when later phases need to inspect it directly
- create multiple local paraphrases of the same brief with drift between them
- treat auxiliary notes or copied summaries as equivalent authority to the approved brief artifact

The durable artifact should stay contract-only and should remain the single handoff authority for the next phase.

## High-signal probes instead of filler

`activationProbes`, `negativeSignals`, and `seedEvalIntent` should preserve the smallest useful discovery and edge-case surface.

Prefer:
- 3-5 representative trigger probes
- nearby non-trigger negatives that could otherwise false-trigger
- at least one ambiguity or stop-and-ask comparison when the boundary has a likely confusion point

Avoid:
- long padded lists of nearly identical trigger prompts
- generic out-of-scope negatives that do not help nearby routing
- empty or decorative `seedEvalIntent` notes that fail to preserve what later dogfooding should compare

## Grounded repo defaults

Do not invent repo-local truths just to make a brief feel more complete.

For trigger briefs:
- do not claim a repo-default planning path unless a grounded source actually defines it
- do not list `AGENTS.md` as a required input unless repo policy materially shapes the contract
- do not elevate official external docs into required authority unless the skill contract truly depends on them
- prefer generic inputs such as `user request`, `repo-local context when available`, and `explicit user constraints` when no stronger grounded source exists

Anti-examples:
- `planner is the default planning path in this repo`
- `AGENTS.md` listed as a mandatory input for a new skill whose contract is otherwise grounded only in the user request
- `current official external docs only when directly needed by the plan` listed as a mandatory input even though no dependency-specific contract was frozen
