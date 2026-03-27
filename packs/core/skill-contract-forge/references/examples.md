# Examples

This file provides examples and anti-examples for `skill-contract-forge`.

It is supportive, not normative. The required envelope still comes from `../SKILL.md`.

## Canonical trigger example

```text
Classification: trigger
Workflow: new-skill
{
  "skill": {
    "name": "example-skill",
    "description": "Defines one reusable skill contract before implementation. Use when the task is contract authoring for a single skill. Do not use for runtime implementation, downstream eval authoring, or repository policy work."
  },
  "authoring": {
    "singleJob": "Define one reusable skill contract before implementation.",
    "packageShape": {
      "requiredFiles": [
        "SKILL.md"
      ],
      "supportFolders": []
    }
  },
  "successModel": {
    "outcomeGoals": [
      "Produce a boundary-only Eval Brief."
    ]
  },
  "activationProbes": [
    "User asks for one skill contract before implementation."
  ],
  "negativeSignals": [
    "Requests for runtime implementation."
  ],
  "seedEvalIntent": {
    "mustStopAt": "Eval Brief ready",
    "comparisonFocus": "Verify the contract boundary, especially trigger vs non-trigger vs stop-and-ask behavior.",
    "notes": [
      "Keep coverage contract-only.",
      "Do not include runtime or grader implementation details."
    ]
  },
  "sourceRefs": []
}
Eval Brief ready
```

## Canonical non-trigger example

```text
Classification: non-trigger
Out of scope for skill-contract-forge.
The request is runtime implementation work, not skill contract authoring.
```

## Canonical stop-and-ask example

```text
Classification: stop-and-ask
Scope clarification required.
The target skill is unclear, so the contract cannot be frozen safely yet.
```

## Anti-examples

These responses may look plausible but violate the contract:

### Bare JSON without routing headers

Invalid because the required `Classification:` line is missing.

```json
{
  "skill": {
    "name": "example-skill"
  }
}
```

### Trigger header without workflow

Invalid because trigger paths require one exact `Workflow:` line.

```text
Classification: trigger
{
  "skill": {
    "name": "example-skill"
  }
}
Eval Brief ready
```

### Stop-and-ask with a JSON payload

Invalid because non-trigger and stop-and-ask paths must not emit an Eval Brief payload.

```text
Classification: stop-and-ask
{
  "skill": {
    "name": "example-skill"
  }
}
```

### Trigger output with implementation detail

Invalid because the brief must stay boundary-only and must not spill into runtime wiring, grader logic, or benchmark execution detail.

### Trigger output missing `skill.description`

Invalid because trigger-path briefs must freeze the repo-required skill metadata instead of expecting downstream implementation to recover it later.

### Trigger output uses `skill.description` as an output summary

Invalid because `skill.description` must behave like activation metadata for `SKILL.md` frontmatter, not like a short description of the artifact it will produce.

### Trigger output invents `sourceRefs`

Invalid because `sourceRefs` must reflect real authority used for the brief, not plausible-but-missing docs such as `docs/contracts/<skill>.md` or target skill paths that do not exist yet.

### Trigger output preserves auxiliary local refs as handoff authority

Invalid when the brief lists repo-local authoring files just because they were inspected upstream. Durable examples, templates, or reference material should be distilled into the brief or routed into `references/` or `assets/` through `authoring.packageShape`.

### Trigger output spreads the handoff across multiple paraphrases

Invalid when the run leaves several inconsistent local summaries of the approved brief instead of one inspectable brief artifact in working files when the environment can persist files.

### Trigger output missing `authoring.packageShape`

Invalid because trigger-path briefs must freeze the minimal package shape instead of leaving downstream implementation to invent whether support folders are needed.

### Trigger output drops durable `assets/` authority from an existing skill

Invalid when a refactor brief collapses `supportFolders` to `[]` even though the current package already depends on a maintained template, baseline, or output scaffold in `assets/`. Small durable support surfaces still count as package-shape authority when downstream implementation must preserve them.

### Trigger output selects `agents` without `authoring.interface`

Invalid because once a brief says `agents` is required, it must also freeze the minimal interface metadata that downstream implementation would need for `agents/openai.yaml`.

### Trigger output uses decorative probes and negatives

Invalid when `activationProbes`, `negativeSignals`, or `seedEvalIntent` are padded with repetitive filler instead of preserving a small, high-signal set of representative triggers, nearby non-triggers, and ambiguity edges.

## Optional support-artifact examples

Use `supportArtifacts` when source-backed support material materially improves the contract.

### Good pattern: source-backed examples declared as support

- `references/source-patterns.md` for implementation patterns distilled from user-provided material
- `assets/source-examples.json` for canonical trigger examples, anti-examples, and edge cases extracted from the provided sources

### Bad pattern: examples stuffed into the main brief

Invalid when the brief copies long example sets, edge-case catalogs, or pattern tables directly into the main JSON payload instead of routing them through `references/` or `assets/`.

### Bad pattern: invented support artifacts

Invalid when the brief declares examples, anti-examples, or edge cases that are not grounded in the provided sources.

### Bad pattern: decorative support artifacts

Invalid when `supportArtifacts` is present but does not materially help routing, blockers, or eval design.

## What the examples are for

Use these examples to confirm envelope shape and boundary discipline.
Do not copy values mechanically when the request requires different skill details.
