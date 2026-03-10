> Complements: `02-eval-blueprint.md`

# Skills System -- Map

## Purpose

This document maps the complete system so that the following layers do not get mixed again:

- Blueprint / source of truth
- Agreements
- Workflow
- Artifacts
- Skill authoring
- Skill eval authoring
- Shared eval runtime

## Main rule

- The blueprint defines the eval system adapted to this repo.
- Agreements define stable ecosystem rules.
- Workflow defines how to apply those rules.
- Artifacts define which deliverables we use.
- `Evaluating Skills` informs the eval scaffold architecture.
- The OpenAI `eval-skills` blog informs refinement workflow.
- The skill Mermaid and the eval Mermaid are different artifacts.

## System map

```mermaid
flowchart TD
    A[Blueprint source of truth\n02-eval-blueprint.md] --> B[Agreements\n03-system-governance.md]
    A --> C[Workflow\n04-apply-workflow.md]
    A --> D[Artifacts\n05-artifacts-reference.md]

    E[External architecture\nEvaluating Skills] --> A
    F[External workflow\nOpenAI eval-skills blog] --> C

    B --> G[Skill authoring\nskill-forge]
    B --> H[Skill eval authoring\nskill-eval-forge]
    B --> I[Shared eval runtime]

    C --> J{Skill already exists?}
    J -->|Yes| K[Read current SKILL.md]
    K --> L[Create Mermaid as-is]
    L --> M[Gap analysis vs blueprint]
    M --> N[Create Mermaid to-be]
    N --> O[Adjust skill]
    O --> P[Produce Eval Brief]

    J -->|No| Q[Start from blueprint]
    Q --> R[Define single job]
    R --> S[Define boundary + non-goals]
    S --> T[Define success model + activation probes]
    T --> U[Create Mermaid to-be]
    U --> V[Implement skill]
    V --> P

    P --> W[skill-eval-forge]
    W --> X[Define eval scaffold]
    X --> Y[Define comparison intent]
    X --> Z[Write evals.json next to the skill]
    Z --> AA[Create per-case workspace iteration]
    AA --> AB[Run with_skill and without_skill]
    AB --> AC[Capture run evidence]
    AC --> AD[Score and compare]
    AD --> AE{Pass gates?}
    AE -->|Yes| AF[Close eval v1]
    AE -->|No| AG[Refine evals.json, files, or checks]
    AG --> AA

    D --> AH[Artifact: Mermaid as-is]
    D --> AI[Artifact: Mermaid to-be]
    D --> AJ[Artifact: Eval Brief]
    D --> AK[Artifact: evals.json]
    D --> AL[Artifact: Run evidence]
    D --> AM[Artifact: Analysis summary]
    D --> AN[Artifact: Benchmark]
```

## Key boundary

The boundary between skill authoring and eval authoring is:

- output of `skill-forge`: `Eval Brief ready`
- input of `skill-eval-forge`: `Eval Brief ready`

## First-phase rule

In a first phase:

- `Evaluating Skills` governs architecture,
- the OpenAI blog only comes in to simplify workflow,
- and the runtime is implemented with Node, TypeScript, Zod, and AI SDK.

## Reset rule

The deleted legacy runtime is not part of this map and must not be reintroduced as an implementation base.

## How to read the package

1. Read `01-start-here.md` first.
2. Then read `02-eval-blueprint.md`.
3. Then `04-apply-workflow.md`.
4. Then `03-system-governance.md`.
5. Use `05-artifacts-reference.md` as reference.
6. Use this document to understand the complete map without mixing layers.

