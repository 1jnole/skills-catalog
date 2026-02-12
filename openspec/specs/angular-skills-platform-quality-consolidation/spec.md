# angular-skills-platform-quality-consolidation Specification

## Purpose
TBD - created by archiving change angular-skills-consolidate-platform-and-quality. Update Purpose after archive.
## Requirements
### Requirement: Platform/quality consolidation SHALL define canonical skills for routing, DI, defer/hydration, RxJS and testing
The Angular catalog SHALL expose one canonical skill per domain in this phase:
- `angular21-routing-patterns`
- `angular21-di-patterns`
- `angular21-defer-hydration`
- `angular21-rxjs-interop-concurrency`
- `angular21-testing-strategy`

Each canonical skill SHALL include the standard structure used in this repo (`Goal`, `When to use`, `When NOT to use`, `Inputs`, `Outputs`, `Workflow`, `Common pitfalls`, `Example prompts`, `Definition of done`, `Failure modes`).

#### Scenario: Canonical skills are reviewed after apply
- **WHEN** the `SKILL.md` files of the five canonical skills are opened
- **THEN** each file contains the standard structure and domain-specific guidance without placeholder content

### Requirement: Routing consolidation SHALL absorb the four routing legacy skills
`angular21-routing-patterns` SHALL absorb guidance previously covered by:
- `angular21-router-component-input-binding`
- `angular21-routing-functional-guards`
- `angular21-routing-functional-resolvers`
- `angular21-routing-standalone-lazy-loading`

#### Scenario: Routing canonical guidance is validated
- **WHEN** `packs/angular/skills/angular21-routing-patterns/SKILL.md` is reviewed
- **THEN** the workflow and guidance include input binding, functional guards, functional resolvers decision criteria, and standalone lazy loading

### Requirement: DI consolidation SHALL absorb the four DI legacy skills
`angular21-di-patterns` SHALL absorb guidance previously covered by:
- `angular21-di-hierarchical-providers-scoping`
- `angular21-di-injection-context-rules`
- `angular21-di-injectiontoken-config`
- `angular21-di-injectiontoken-factory-composition`

#### Scenario: DI canonical guidance is validated
- **WHEN** `packs/angular/skills/angular21-di-patterns/SKILL.md` is reviewed
- **THEN** the workflow and guidance include provider scoping, valid injection contexts, and typed InjectionToken composition

### Requirement: Defer/hydration consolidation SHALL absorb the three defer-hydration legacy skills
`angular21-defer-hydration` SHALL absorb guidance previously covered by:
- `angular21-defer-blocks-triggers-and-states`
- `angular21-defer-hydrate-triggers`
- `angular21-incremental-hydration-setup`

#### Scenario: Defer/hydration canonical guidance is validated
- **WHEN** `packs/angular/skills/angular21-defer-hydration/SKILL.md` is reviewed
- **THEN** the workflow and guidance include defer block states, hydration trigger selection, and incremental hydration setup boundaries

### Requirement: RxJS consolidation SHALL absorb the two RxJS legacy skills
`angular21-rxjs-interop-concurrency` SHALL absorb guidance previously covered by:
- `angular21-rxjs-concurrency-operator-choice`
- `angular21-rxjs-interop-take-until-destroyed`

#### Scenario: RxJS canonical guidance is validated
- **WHEN** `packs/angular/skills/angular21-rxjs-interop-concurrency/SKILL.md` is reviewed
- **THEN** the workflow and guidance include operator selection by UX semantics and lifecycle-safe subscription patterns

### Requirement: Testing consolidation SHALL absorb four testing legacy skills
`angular21-testing-strategy` SHALL absorb guidance previously covered by:
- `angular21-testing-component-scenarios`
- `angular21-testing-di-overrides`
- `angular21-testing-httpclient`
- `angular21-defer-testing-strategy`

#### Scenario: Testing canonical guidance is validated
- **WHEN** `packs/angular/skills/angular21-testing-strategy/SKILL.md` is reviewed
- **THEN** the workflow and guidance include component/integration scenarios, DI overrides, HttpClient test patterns, and deterministic defer testing

### Requirement: Legacy platform/quality skills SHALL be removed once absorbed
After canonical content is in place, the following legacy skills SHALL be removed from `packs/angular/skills`:
- `angular21-router-component-input-binding`
- `angular21-routing-functional-guards`
- `angular21-routing-functional-resolvers`
- `angular21-routing-standalone-lazy-loading`
- `angular21-di-hierarchical-providers-scoping`
- `angular21-di-injection-context-rules`
- `angular21-di-injectiontoken-config`
- `angular21-di-injectiontoken-factory-composition`
- `angular21-defer-blocks-triggers-and-states`
- `angular21-defer-hydrate-triggers`
- `angular21-incremental-hydration-setup`
- `angular21-rxjs-concurrency-operator-choice`
- `angular21-rxjs-interop-take-until-destroyed`
- `angular21-testing-component-scenarios`
- `angular21-testing-di-overrides`
- `angular21-testing-httpclient`
- `angular21-defer-testing-strategy`

#### Scenario: Legacy inventory is checked after apply
- **WHEN** the skill directory names are listed
- **THEN** none of the seventeen absorbed legacy names are present

### Requirement: Phase 3 checkpoint SHALL reach 10 Angular skills
The part 3 consolidation SHALL reduce the catalog from checkpoint `22` to final `10` by removing only absorbed legacy skills from platform/quality scope.

#### Scenario: Checkpoint count is recomputed
- **WHEN** `(Get-ChildItem -Directory packs/angular/skills).Count` is executed after apply
- **THEN** the command returns `10`

