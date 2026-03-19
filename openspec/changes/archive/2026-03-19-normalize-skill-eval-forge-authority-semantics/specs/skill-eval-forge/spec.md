## MODIFIED Requirements

### Requirement: `skill-eval-forge` owns eval authoring for one named implemented skill

The repository SHALL provide a core skill named `skill-eval-forge` for the eval-authoring phase of the skill-forge workflow.

#### Scenario: Mentioned authority is not operationally identifiable

- **WHEN** the contract artifact, existing implementation, or active eval context is said to exist but is not identified specifically enough to inspect as authority
- **THEN** `skill-eval-forge` SHALL stop and ask rather than treating that vague mention as sufficient operational access
