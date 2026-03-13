# evals-grade-case-assertion-seam Specification

## ADDED Requirements

### Requirement: eval cases SHALL support optional explicit assertion grading rules
An eval case SHALL be able to declare optional marker-based grading rules aligned to its assertion list.

#### Scenario: Maintainer validates a case with explicit grading rules
- **WHEN** the eval definition schema validates a case with `grading.assertion_rules`
- **THEN** the rules MUST align one-to-one with `assertions`
- **AND** each explicit rule MUST contain at least one non-empty marker
- **AND** cases without `grading` MUST remain valid

### Requirement: grade-case SHALL consume explicit assertion rules before keyword fallback
The shared grader SHALL evaluate explicit per-assertion marker rules when present and continue using keyword fallback when a rule is missing or null.

#### Scenario: Maintainer grades a case with mixed explicit and fallback assertions
- **WHEN** a case includes explicit assertion rules for some assertions and no rule for others
- **THEN** the grader MUST evaluate the explicit rules first
- **AND** the remaining assertions MUST keep the existing keyword fallback behavior
- **AND** the existing characterization behavior for `skill-forge` assertions MUST remain intact after the refactor
