# Design: evals-grade-case-assertion-seam

## Context

`grade-case.ts` currently resolves several `skill-forge` assertions through a hardcoded table. That makes the shared grader pilot-specific and blocks a clean contract-first refactor. The characterization tests now provide a safety net for extracting a minimal assertion seam.

## Goals

- add a minimal optional assertion grading seam to `EvalCase`
- move `skill-forge` assertion semantics out of shared runtime code
- keep boundary behavior and public runner commands unchanged

## Non-Goals

- generalize `stop_at` or the current boundary protocol
- introduce a rich grading DSL with `mode`, regexes, or weighted scoring
- change Laminar dataset fields or benchmark artifacts

## Decisions

### Decision: the seam is index-aligned with assertions

`grading.assertion_rules` is an optional array aligned one-to-one with `assertions`. Each entry either supplies explicit marker rules for that assertion or uses `null` to keep keyword fallback.

### Decision: explicit rules support only required markers or absent markers

A rule is either `{ markers }` meaning all markers must appear, or `{ markers, absent: true }` meaning all markers must remain absent. This is the minimum shape required to replace the current hardcoded table.

### Decision: boundary logic remains untouched in this slug

The existing trigger, non-trigger, and `stop_and_ask` semantics stay exactly as they are. This slug only moves assertion-specific grading semantics.
