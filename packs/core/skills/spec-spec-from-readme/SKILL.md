---
name: spec-spec-from-readme
description: "Technical test / code challenge: convert README into a spec-first Mini-SPEC with a complete inventory of explicit v1 requirements (incl PROCESS/PR instructions) + traceability BEFORE any implementation. Do NOT slice into iterations here."
metadata:
  short-description: "TT → README → Mini-SPEC"
---

## Goal
Convert a technical test README into a **strict** Mini-SPEC that cannot silently drop requirements (including PROCESS items like "PR #1 skeleton") and **does not invent contracts**.

## When to use

- Tech test / take-home challenge: convert a README into a strict Mini-SPEC **before any coding**.
- When the README includes process requirements (PR choreography, submission rules) that must be captured.

## When NOT to use

- You already have a Mini-SPEC/SPEC draft (use `$spec-spec-lint` next).
- You are working from a product brief (use `$spec-spec-from-brief`).

## Inputs
- README content (paste or file)
- Optional flags:
  - `process_mode`: `strict | advisory` (default: `strict`)

## Outputs
- Write **ONLY** the Mini-SPEC to:
  `openspec/changes/<slug>/specs/mini-spec.md`
- No code changes. No dependency changes. No commands.

## Preflight (MUST)
1) Confirm the change scaffold exists:
   - `openspec/changes/<slug>/specs/mini-spec.md`
   - If missing: STOP and run `$spec-new-change-from-templates`.
2) Confirm repo-local template exists:
   - `openspec/templates/mini-spec.md`
   - If missing: STOP and run `$spec-bootstrap`.

## Non-negotiables (MUST)

### Requirement extraction
- Create `R-1..R-n` **only** from **explicit requirement-like statements** in the README.
- Each `R-*` includes a `Source:` line (short quote or precise section reference) so reviewers can verify it came from the README.
- Do **NOT** create extra requirements for:
  - “future”, “extensibility”, “might”, “could”, “in the future” statements (these go to **Non-binding considerations**)
  - implementation suggestions not required by the README

### Ambiguity handling (strict vs advisory)
- `process_mode=strict`:
  - `ASSUMED` is **forbidden**.
  - If the README is ambiguous/contradictory on an explicit requirement, keep the requirement **explicitly** but:
    - capture the ambiguity under **Open questions / decisions** (`Q-*` / `D-*`)
    - set the requirement status to `UNKNOWN`
    - do **NOT** produce implementation AC that depends on the unresolved ambiguity
- `process_mode=advisory`:
  - You may include `ASSUMED`, but only for **explicitly documented assumptions** under **Notes / assumptions** and only when they are necessary to make AC verifiable.

### Acceptance criteria quality
- AC checkboxes are **atomic and verifiable**; every checkbox includes `Verify: ...`.
- Create AC only for `MAPPED` requirements.
- For any `UNKNOWN` requirement, do **not** create implementation AC; the blocking question/decision must be recorded instead.

### Traceability
- Traceability exists and every `R-*` has **exactly one** status:
  - `MAPPED | OUT | UNKNOWN | ASSUMED`
- In `strict`, `ASSUMED` must not appear.
- STOP if any `R-*` is missing a status.

## Output format (MUST)
Write a single markdown document with this structure:

1) `# Mini-SPEC: <title>`
2) `## Context`
3) `## Requirement inventory` (R-1..R-n, each with `Source:`)
4) `## Open questions / decisions` (Q-1.., D-1..; reference affected R-*)
5) `## Non-binding considerations` (C-1..; explicitly non-requirements)
6) `## Notes / assumptions` (ONLY allowed when `process_mode=advisory`)
7) `## Acceptance criteria` (AC-1..; ONLY for `MAPPED` requirements)
8) `## Traceability` (R-* → status + AC list)

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

