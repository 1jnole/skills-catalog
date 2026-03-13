## ADDED Requirements

### Requirement: `run-evals` uses the final Promptfoo-backed supported flow

The repository SHALL use `run-evals` as the final supported eval execution command, and that command SHALL execute the Promptfoo-backed new-scaffold flow for the canonical suite instead of the inherited Laminar iteration runner.

#### Scenario: Maintainer executes the supported command
- **WHEN** a maintainer runs `run-evals` for `skill-forge`
- **THEN** the command MUST resolve the canonical new-scaffold suite
- **AND** it MUST generate Promptfoo config, raw eval output, local scoring output, and local benchmark output for that suite

### Requirement: Supported suite resolution defaults to the new scaffold

The repository SHALL resolve the canonical eval-definition path for the supported command surface from `evals/cases/<skill>/suite.v1.json` by default rather than from `packs/core/<skill>/evals/evals.json`.

#### Scenario: Maintainer validates a suite by skill name
- **WHEN** a maintainer runs `read-evals --skill-name skill-forge`
- **THEN** the command MUST load `evals/cases/skill-forge/suite.v1.json`
- **AND** it MUST not require the inherited `packs/core/<skill>/evals/evals.json` path for the supported flow

### Requirement: Historical alias is not part of the public script surface

The repository SHALL remove `run-promptfoo-pilot` from the public `package.json` script surface and, if a source-level alias remains temporarily, it SHALL emit an explicit deprecation warning.

#### Scenario: Maintainer inspects package scripts and alias behavior
- **WHEN** a maintainer reads `package.json` or invokes the old alias directly
- **THEN** `package.json` MUST not present `run-promptfoo-pilot` as a supported script
- **AND** any retained alias MUST clearly state that `run-evals` is the supported command
