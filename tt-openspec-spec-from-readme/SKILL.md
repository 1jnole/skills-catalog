---
name: tt-openspec-spec-from-readme
description: Use at the start of a technical test when you only have a README/brief to produce a verifiable Mini-SPEC with requirement inventory + traceability BEFORE any implementation. Do NOT slice into iterations here.
metadata:
  short-description: TT → README → Mini-SPEC (+ traceability)
---

## Goal
Convert a technical test README into a Mini-SPEC that is explicit, verifiable, and OpenSpec-ready, with requirement inventory + traceability so no README items are silently dropped.

## When to use
- You are starting a technical test and only have a README / brief.
- You want to freeze scope and determinism before writing code (OpenSpec-first).

## When NOT to use
- There is already an active OpenSpec change describing the work in `openspec/changes/<slug>/`.
- You are asked to implement code or run tooling.
- You want to slice work into iterations (use `tt-openspec-slice-into-iterations`).

## Inputs
- README content (paste or point to file)
- Constraints (stack, time limit, must-have features, forbidden libs)
- Any references (Figma, API docs, examples)

## Outputs
- Primary artifact (markdown): `openspec/changes/<slug>/specs/mini-spec.md`
- No code changes. No dependency changes. No command execution.

## Workflow
1) Read README end-to-end once.

2) Build **README requirement inventory** (MUST):
   - Extract every requirement-like statement into a list `R-1...R-n`.
   - Tag each as one of:
     - `FUNC` (user-facing behavior)
     - `PROCESS` (delivery/PR strategy/docs expectations)
     - `CONTRACT` (API/data/schema/IO)
     - `NFR` (performance/reliability/security/scale)
   - Keep each requirement as a short, concrete sentence (no interpretation).

3) Determinism & state freeze (MUST):
   - Identify requirements involving: persistence, stability, ordering, randomness, time/day boundaries, navigation/back behavior, caching, idempotency.
   - If the README implies a deterministic mechanism is needed to be implementable/testable (e.g., “stable per day/session”),
     define a minimal deterministic algorithm under Assumptions:
       - inputs/outputs
       - stable base ordering (if needed)
       - selection rule (e.g., deterministic index from a time key)
     Prefer describing the mechanism as a pure function (easy to unit test).

4) Data contracts (MUST):
   - List endpoints/payload shapes/headers/params exactly as stated.
   - Do NOT invent fields or endpoints. Missing info → Unknowns.

5) Guardrails (MUST):
   - Do NOT promote mentioned/derived concepts into UI requirements unless explicitly required by the README.

6) Define scope:
   - In scope
   - Out of scope
   - Non-goals (explicit)

7) Acceptance criteria (MUST be verifiable):
   - Every checkbox includes a short `Verify:` note (manual steps or command).
   - Keep each checkbox atomic (one behavior per AC).
   - Prefer numbering as `AC-1...AC-n`.

8) Traceability (MUST):
   - For every `R-*`, assign exactly one status:
     - `MAPPED` → references `AC-*` or a specific constraint section
     - `OUT` → references Out of scope / Non-goals
     - `ASSUMED` → references Assumptions
     - `UNKNOWN` → references Unknowns
   - Include a compact mapping list `R-* → ...`.

9) STOP condition (MUST):
   - If any `R-*` is not assigned a status (MAPPED/OUT/ASSUMED/UNKNOWN), STOP and report the unmapped IDs.
   - Do NOT output a Mini-SPEC that silently drops requirements.

10) STOP:
- Output ONLY the Mini-SPEC file. Do NOT slice into iterations here.

## Mini-SPEC template (copy/paste)

# Mini-SPEC

## Summary
- ...

## Delivery constraints
- ...

## Data contracts (source of truth: README)
- Endpoints:
  - ...
- Models:
  - ...

## README requirement inventory (R-1..R-n)
- R-1 [FUNC] ...
- R-2 [PROCESS] ...
- R-3 [CONTRACT] ...
- R-4 [NFR] ...

## In scope
- ...

## Out of scope
- ...

## Non-goals (explicit)
- ...

## Determinism & state rules
- ...

## Acceptance criteria
- [ ] AC-1 ... (Verify: ...)
- [ ] AC-2 ... (Verify: ...)

## Assumptions (minimal + reversible)
- A1: ...

## Unknowns / questions (max 5)
- Q1: ...

## Risks (top 3)
- R1: ...

## Traceability (R-* → mapped/out/assumed/unknown)
- R-1 → AC-1
- R-2 → Delivery constraints
- R-3 → Data contracts
- R-4 → Unknowns/Q1
