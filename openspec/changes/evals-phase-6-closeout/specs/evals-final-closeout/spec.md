## ADDED Requirements

### Requirement: Final supported path is documented explicitly

The repository SHALL provide a short final supported-path document that states the supported command, canonical suite layout, official generated outputs, and which historical pieces are deprecated or out of scope.

#### Scenario: Maintainer looks for the final supported flow
- **WHEN** a maintainer reads the active eval closeout docs
- **THEN** they MUST be able to identify the supported command, suite path, skill prompt source, and official generated outputs without ambiguity
- **AND** the document MUST state which historical command or layout references are no longer supported

### Requirement: Historical eval path is isolated from active documentation

The repository SHALL treat the inherited Laminar and `packs/core/<skill>/evals/` path as historical compatibility only, not as the active supported path.

#### Scenario: Maintainer reads active eval READMEs
- **WHEN** a maintainer reads `scripts/evals/README.md`, `evals/README.md`, `evals/engines/promptfoo/README.md`, and the Laminar README
- **THEN** only the final supported path MUST be documented as active
- **AND** any historical path MUST be labeled clearly as deprecated or historical compatibility

### Requirement: Final validation protects the closed migration state

The repository SHALL keep a minimal validation suite that protects the final supported path instead of the retired inherited runner path.

#### Scenario: Maintainer runs the closeout checks
- **WHEN** the minimal validation suite runs after Phase 6 closeout
- **THEN** it MUST verify the final supported command surface, canonical suite loading, and generated local benchmark outputs
- **AND** it MUST not require the inherited `packs/core/<skill>/evals/evals.json` path or the Laminar runner as supported behavior

### Requirement: Deferred migration debt is explicit

The repository SHALL list the items that remain outside the migration closeout so maintainers can distinguish finished migration work from future backlog.

#### Scenario: Maintainer reviews post-migration scope
- **WHEN** a maintainer reads the deferred-debt note
- **THEN** it MUST name the intentionally deferred items such as `previous-skill`, a second engine, extra observability, or broader automation
- **AND** it MUST make clear that those items are not part of the completed migration
