# skill-contract-forge-uplift-surface Specification

## MODIFIED Requirements

### Requirement: Uplift suite is comparative, not contractual
The `skill-contract-forge` uplift suite MUST measure comparable behavioral signals without requiring the full contractual payload from the baseline path.

#### Scenario: Uplift suite is reviewed for routing-envelope alignment
- **WHEN** `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml` is reviewed
- **THEN** it SHALL enforce the same routing envelope markers used by the skill contract for classification, workflow when applicable, and stop boundaries
- **AND** it SHALL continue to avoid full Eval Brief JSON validation as the central uplift criterion

#### Scenario: Informational baseline surface is reviewed
- **WHEN** `evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml` and its referenced suite are reviewed
- **THEN** they SHALL define an informational baseline surface rather than a hard semantic gate
- **AND** they SHALL avoid requiring the baseline path to satisfy the exact skill-owned routing envelope

#### Scenario: Informational baseline output drifts toward quasi-compliance
- **WHEN** `without_skill` responses are evaluated
- **THEN** the baseline suite SHALL reject outputs that imitate the skill-owned contract envelope through classification headers, workflow headers, the terminal marker, or contract-brief schema keys
