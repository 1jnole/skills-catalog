## MODIFIED Requirements

### Requirement: Minimum affected docs are aligned with runtime truth

Docs touched by this migration SHALL distinguish supported runtime truth from historical artifacts and SHALL describe the operational authority of each supported Promptfoo-native surface.

#### Scenario: Runtime surfaces are described together
- **WHEN** an affected document describes the supported `skill-contract-forge` Promptfoo workflow
- **THEN** it SHALL identify `npm run promptfoo:validate` as the canonical public contract-validate entrypoint
- **AND** it SHALL identify `npm run promptfoo:run` as the canonical public live semantic authority
- **AND** it SHALL identify direct `promptfoo -c <config>` execution as the standard path for family-specific validation and runs outside the small public npm surface
- **AND** it SHALL NOT identify `npm run promptfoo:run:offline` as a supported public replay or smoke entrypoint unless a future change introduces a working replay surface
- **AND** it SHALL identify `without_skill` as an informational baseline rather than a closure gate

#### Scenario: Maintained fixture snapshots are described
- **WHEN** an affected document mentions maintained `--model-outputs` fixture files for `skill-contract-forge`
- **THEN** it SHALL describe them as subordinate support artifacts or historical snapshots
- **AND** it SHALL NOT present them as proof that a supported public config-driven replay command currently exists
