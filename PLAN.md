# Fase A — Reencuadre controlado

## Objetivo
Dejar `evals/` en un estado con menos ruido histórico, pero sin romper la superficie Promptfoo que hoy sí gobierna ejecución, contrato y replay offline.

## Regla de decisión en Fase A
- **Keep**: superficies activas que hoy ejecutan, validan o definen el contrato observable.
- **Quarantine**: material histórico, huérfano o potencialmente reutilizable que ya no debe parecer activo.
- **Delete**: solo outputs efímeros o artefactos reproducibles que no son fuente de verdad.

## Premisa operativa
- `README` y notas históricas no son fuente de verdad durante esta migración.
- La autoridad temporal sale del código ejecutable, del contrato del skill y del OpenSpec vigente.
- Si una doc contradice lo que hoy ejecuta `package.json` o lo que consume `evals/engines/promptfoo/`, manda el runtime real y la doc se corrige después.

## Tareas tangibles

| ID | Tarea | Acción concreta | Ficheros / rutas completas | Corner cases / edge cases | Hecho cuando |
|---|---|---|---|---|---|
| A-01 | Congelar la fuente de verdad operativa | Declarar explícitamente que la autoridad temporal vive en el código ejecutable, el contrato del skill y OpenSpec vigente. | `package.json`  `packs/core/skill-contract-forge/SKILL.md`  `packs/core/skill-contract-forge/references/edge-cases.md`  `packs/core/skill-contract-forge/references/examples.md`  `packs/core/skill-contract-forge/references/routing.md`  `packs/core/skill-contract-forge/assets/contracts/eval-brief.template.json`  `openspec/changes/phase-6e-recalibrate-skill-contract-forge-evals/proposal.md`  `openspec/changes/phase-6e-recalibrate-skill-contract-forge-evals/design.md` | Si un `README`, un artefacto archivado o una ruta vieja contradice estas superficies, se registra como deriva; no gobierna Fase A. | Existe un inventario claro de qué superficies mandan hoy y cuáles quedan degradadas a documentación derivada. |
| A-02 | Crear zona de cuarentena | Crear una carpeta temporal para mover material histórico o huérfano que ya no debe parecer runtime activo. | `evals/_phase_a_quarantine/` | No mover todavía archivos que sigan cableados a scripts, configs o slugs activos. | Todo lo histórico recuperable tiene un destino explícito fuera de la superficie principal. |
| A-03 | Tratar `generated/` como output efímero | Confirmar que `evals/engines/promptfoo/generated/` es output reproducible y no input de diseño ni autoridad runtime. | `evals/engines/promptfoo/generated/`  `package.json` | Ahora mismo `generated/` puede estar vacío; el trabajo no es inventar archivos, sino fijar su estatus. | `generated/` queda clasificado como output efímero y no como fuente de verdad. |
| A-04 | Reclasificar fixtures offline | Separar fixtures activas de snapshots históricos, sin borrar en bloque lo que hoy siguen usando los scripts. | **Activas mientras el runtime las use:** `evals/engines/promptfoo/fixtures/skill-contract-forge-suite-model-outputs.json`  `evals/engines/promptfoo/fixtures/skill-contract-forge.uplift.with-skill.model-outputs.json`  `evals/engines/promptfoo/fixtures/skill-contract-forge.uplift.without-skill.model-outputs.json`  **Histórica ya aislada:** `evals/_phase_a_quarantine/engines/promptfoo/fixtures/pilot-model-outputs.json` | No mover ni borrar fixtures conectadas a `promptfoo:run:offline*` hasta que el runtime real cambie. | Solo quedan activas las fixtures realmente usadas por el flujo actual y las históricas quedan marcadas como tales. |
| A-05 | Separar authoring activo de históricos | Preservar el contrato local de authoring si sigue aportando señal y aislar material de bootstrap o auditoría histórica. | **Authoring activo provisional:** `evals/cases/skill-contract-forge/suite.v1.json`  **Históricos ya aislados:** `evals/_phase_a_quarantine/cases/skill-contract-forge/pilot-suite.v1.json`  `evals/_phase_a_quarantine/cases/skill-contract-forge/manual-audit.phase-6a.json`  `evals/_phase_a_quarantine/cases/skill-contract-forge/manual-audit.phase-6a.md` | Que el nombre contenga `v1` no implica que ya no sea útil; primero se reclasifica por función real. | `cases/skill-contract-forge/` deja de mezclar material activo e histórico sin marcar. |
| A-06 | Distinguir entrypoints Promptfoo activos de legado | Mantener las configs y suites realmente usadas por el runtime actual y revisar como legado lo que quedó huérfano. | **Activos:** `evals/engines/promptfoo/promptfooconfig.yaml`  `evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`  `evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`  `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`  `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`  `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml`  **Legado ya aislado:** `evals/_phase_a_quarantine/engines/promptfoo/tests/skill-contract-forge.yaml` | Hay docs y OpenSpec antiguo que todavía nombran `skill-contract-forge.yaml`; primero se corrigen claims, luego se archiva o mueve. | Queda explícito cuál es el runtime real y cuál es un resto heredado. |
| A-07 | Preservar primitives vigentes y aislar soporte dudoso | Mantener schema, prompts y provider adapter que sí encajan con la arquitectura actual y revisar helpers heredados no usados. | **Primitives activas:** `evals/contracts/skill-contract-forge/eval-brief-output.schema.json`  `evals/engines/promptfoo/providers/default.openai.yaml`  `evals/engines/promptfoo/prompts/with-skill.txt`  `evals/engines/promptfoo/prompts/without-skill.txt`  **Soporte heredado ya aislado:** `evals/_phase_a_quarantine/engines/promptfoo/support/assertions.cjs` | Un archivo sin referencias activas no se borra a ciegas; puede pasar antes a cuarentena. | Las primitives vigentes quedan distinguidas del soporte heredado no usado. |
| A-08 | Barrido de claims obsoletos | Localizar y corregir afirmaciones que ya no deben gobernar el diseño aunque sigan existiendo por inercia documental. | `evals/README.md`  `evals/engines/promptfoo/README.md`  `evals/cases/README.md`  `evals/cases/skill-contract-forge/README.md`  `evals/fixtures/README.md`  `evals/fixtures/skill-contract-forge/README.md`  `openspec/specs/skill-contract-forge-promptfoo-eval-runtime/spec.md` | Claims a invalidar: que `README` define la realidad actual, que `skill-contract-forge.yaml` sigue siendo la autoridad runtime por defecto, o que pilotos y auditorías históricas siguen siendo base activa. | Existe una lista corta de claims prohibidos y una secuencia clara de realineación documental. |
| A-09 | Definir el estado final permitido | Cerrar Fase A con una separación explícita entre activo, histórico y efímero. | **Debe seguir vivo como activo:** `package.json`  `packs/core/skill-contract-forge/SKILL.md` y sus refs  `evals/engines/promptfoo/promptfooconfig*.yaml`  suites `contract/uplift` activas  schema  prompts  provider  fixtures offline realmente usadas  `evals/cases/skill-contract-forge/suite.v1.json` si sigue siendo authoring contract  **Puede existir temporalmente:** `evals/_phase_a_quarantine/`  **Debe quedar como efímero:** `evals/engines/promptfoo/generated/` | Si un artefacto fuera de estas categorías sigue influyendo en diseño o ejecución, Fase A no está cerrada. | El árbol activo deja de mezclar runtime real, authoring local, históricos y outputs efímeros. |

## Orden recomendado de ejecución

### Paso 1
Ejecutar **A-01** y **A-02**.

### Paso 2
Ejecutar **A-03** y **A-04**.

### Paso 3
Ejecutar **A-05**, **A-06** y **A-07**.

### Paso 4
Ejecutar **A-08** y cerrar con **A-09**.

## Resultado esperado al cerrar Fase A

Después de Fase A:

- el runtime activo se decide por código y OpenSpec vigente, no por README heredados
- `generated/` queda tratado como output efímero
- authoring local, runtime activo e históricos dejan de competir entre sí
- lo reutilizable queda aislado para evaluación posterior
- la limpieza deja de ser un borrado masivo y pasa a ser una reclasificación progresiva

## Riesgos que Fase A evita

- **falso ahorro**: reutilizar tests viejos solo porque “ya existen”
- **path drift**: seguir evaluando contra rutas obsoletas
- **fixture lock-in**: convertir outputs incorrectos en baseline
- **dual source of truth**: runtime real, docs heredadas y artefactos históricos compitiendo
- **arquitectura zombie**: claims viejos condicionando decisiones nuevas
