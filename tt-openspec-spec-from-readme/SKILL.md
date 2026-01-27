---
name: tt-openspec-spec-from-readme
description: Use at the start of a technical test when you only have a README/brief to produce a verifiable Mini-SPEC (scope, constraints, determinism rules, acceptance criteria) BEFORE any implementation. Do NOT slice into iterations here.
metadata:
  short-description: TT → README → Mini-SPEC
---

## Goal
Convert a technical test README into a Mini-SPEC that is explicit, verifiable, and OpenSpec-ready, minimizing rework.

## When to use
- You are starting a technical test and only have a README / brief.
- Requirements are ambiguous, scattered, or missing acceptance criteria.
- You want to freeze scope and determinism before writing code (OpenSpec-first).

## When NOT to use
- There is already an active OpenSpec change describing the work in `openspec/changes/<slug>/`.
- You are asked to implement code or run tooling (use bootstrap/implementer skills).
- You want to slice work into iterations (use `tt-openspec-slice-into-iterations`).

## Inputs
- README content (paste or point to file)
- Constraints (stack, time limit, must-have features, forbidden libs)
- Any design/system references (Figma, API docs, examples)

## Outputs
- Primary artifact (markdown): `openspec/changes/<slug>/specs/mini-spec.md`
- No code changes. No dependency changes. No command execution.

## Workflow
1) Read README end-to-end once.
2) Extract **delivery/process requirements** (submission format, PR strategy, docs expectations, evaluation rules, repo constraints).
3) Determinism & state freeze (MUST):
   - Identify requirements involving: persistence, stability, ordering, randomness, time/day boundaries, navigation/back behavior, caching, idempotency.
   - If specified in README → encode as acceptance criteria.
   - If unspecified but required for testability → pick minimal defaults and record under Assumptions (never leave implicit).
4) Extract data contracts (MUST):
   - List endpoints, payload shapes, headers/params exactly as stated.
   - Do NOT invent fields or endpoints. Missing info → Unknowns.
5) Guardrails (MUST):
   - Do NOT promote mentioned/derived concepts into UI requirements unless explicitly required by the README.
   - If a requirement needs a deterministic mechanism to be implementable/testable (e.g., “stable per day/session”), define a minimal deterministic algorithm under Assumptions:
     - specify inputs/outputs
     - specify stable base ordering (if needed)
     - specify selection rule (e.g., deterministic index from a time key)
   - Prefer describing such mechanisms as pure functions (easy to unit test).

5) Define in scope vs out of scope strictly, and add explicit non-goals.
6) Acceptance criteria (MUST be verifiable):
   - Each checkbox includes a short `Verify:` note (manual steps or command).
   - Keep each checkbox atomic (one behavior per AC).
7) If you infer anything, label it as an assumption (A1, A2...).
8) List unknowns/questions (max 5) that could change correctness/determinism.
9) List top 3 risks (delivery risks).
10) STOP: Output ONLY the Mini-SPEC. Do NOT slice into iterations here.

## Copy/paste template

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
- A2: ...

## Unknowns / questions (max 5)
- Q1: ...

## Risks (top 3)
- R1: ...
- R2: ...
- R3: ...
