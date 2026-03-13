# Fase 5 — Migración del contenido útil al nuevo scaffold

## 1. Contexto necesario para otro agente

### Estado previo asumido
Esta fase parte de que:

- **Fase 1** ya quedó cerrada:
  - existe una red mínima útil,
  - los blockers iniciales están decididos,
  - `previous-skill` quedó fuera del alcance inmediato,
  - el cambio de layout está condicionado por un resolver/config de paths.
- **Fase 2** ya quedó cerrada:
  - el core dejó de asumir rígidamente un provider concreto en los contratos que sobreviven,
  - existe base para resolver paths sin depender del layout viejo hardcodeado,
  - el núcleo portable está más aislado.
- **Fase 3** ya quedó cerrada:
  - contracts, benchmark, scoring y normalización sobreviven como piezas del core,
  - ya no se depende conceptualmente del runner local como centro del sistema.
- **Fase 4** ya quedó cerrada:
  - Promptfoo está encapsulado como **engine**,
  - existe el esqueleto funcional del nuevo scaffold,
  - el engine no actúa como Source of Truth del dominio.

### Objetivo real de esta fase
Esta fase **no** trata de seguir construyendo estructura vacía.

Esta fase trata de:

- mover o rehacer el **contenido útil real** al nuevo scaffold,
- dejar operativa la nueva ruta principal,
- y reducir al mínimo la dependencia del layout y flujo antiguos.

### Qué entra en esta fase
- casos de eval,
- fixtures,
- scorers,
- benchmark útil,
- baseline `with-skill / without-skill`,
- reports/resultados que sí sigan teniendo valor en el nuevo flujo.

### Qué no entra en esta fase
- `previous-skill` como baseline oficial,
- un framework universal multi-engine,
- compatibilidad histórica indefinida,
- refactors cosméticos que no cambien capacidad real de evaluación.

---

## 2. Objetivo de la fase

Dejar el **nuevo scaffold** como **camino principal real** para evaluar skills.

Al final de esta fase debe existir una ruta nueva que:

- use el nuevo layout,
- ejecute evals sobre Promptfoo como engine fino,
- consuma casos/fixtures/scorers desde el nuevo scaffold,
- produzca resultados comparables y benchmark local,
- y ya no necesite el runner local histórico para el flujo principal.

---

## 3. Resultado esperado

Al cerrar la fase:

1. existe una **suite inicial funcional** en el nuevo scaffold,
2. los casos útiles viven ya en la ruta nueva,
3. los scorers útiles viven ya en la ruta nueva,
4. los baselines `with-skill / without-skill` están materializados en el nuevo flujo,
5. el benchmark local funciona sobre resultados del nuevo engine,
6. la ruta vieja deja de ser el camino principal.

---

## 4. Plan de fase

### 4.1 Consolidar los casos en la nueva estructura
Tomar los casos útiles del sistema actual y decidir para cada uno:

- **migrar tal cual**,
- **adaptar**,
- **descartar**.

La nueva organización debe empezar a parecerse a:

- `evals/cases/<skill>/core/`
- `evals/cases/<skill>/edge/`
- `evals/cases/<skill>/regressions/`

No hace falta mover todos los casos a la vez si eso ralentiza la migración. Lo importante es que exista una **suite mínima útil** ya corriendo sobre la nueva ruta.

### 4.2 Consolidar fixtures en el nuevo layout
Mover o rehacer fixtures de forma que:

- ya no dependan del layout viejo hardcodeado,
- sean resolubles desde el nuevo config/resolver,
- estén asociados a los casos realmente sobrevivientes.

### 4.3 Consolidar scorers y benchmark
Mover o rehacer:

- deterministic scorers,
- semantic scorers,
- benchmark local,
- resumen de resultados.

Regla: el benchmark sigue siendo **local y portable**. Promptfoo no se convierte en la autoridad del benchmark.

### 4.4 Materializar baseline con el nuevo flujo
La nueva ruta debe ejecutar explícitamente:

- `with-skill`
- `without-skill`

Y producir resultados comparables.

### 4.5 Declarar la nueva ruta como camino principal
Una vez que la suite mínima útil esté operativa:

- el README y los comandos soportados deben empezar a apuntar a la ruta nueva,
- la ruta vieja pasa a ser compatibilidad transitoria o ruta de retirada.

---

## 5. Flujo TDD que seguimos

Esta fase sigue TDD, pero con dos matices:

### 5.1 TDD fuerte
Aplicar en:

- scorers,
- benchmark,
- normalización,
- resolución de fixtures,
- baseline comparison.

### 5.2 TDD moderado / test de caracterización
Aplicar en:

- migración de casos existentes,
- adaptación de resultados,
- reuso de reglas heredadas que aún aporten valor.

### 5.3 Delete-first sigue permitido
Si aparecen restos del sistema viejo que claramente ya no tienen papel en la ruta nueva:

- se pueden eliminar,
- siempre que no rompan el camino principal nuevo,
- y siempre con la red mínima útil del nuevo flujo ya en su sitio.

---

## 6. Tareas tangibles TDD

## Estado de ejecución

- **Tarea 5.1 ejecutada**
  - evidencia: `evals/cases/skill-forge/suite.v1.json`, `scripts/evals/application/load-eval-definition/load-eval-definition.test.ts`
  - resultado: existe una suite mínima útil explícita con `4` casos `golden` y `4` casos `negative`, incluyendo cobertura `core`, `edge` y `regression`
- **Tarea 5.2 ejecutada**
  - evidencia: `evals/cases/skill-forge/suite.v1.json`, `evals/cases/skill-forge/README.md`
  - resultado: los casos útiles de `packs/core/skill-forge/evals/evals.json` sobreviven ya en `evals/cases/skill-forge/` como suite canónica
- **Tarea 5.3 ejecutada**
  - evidencia: `evals/fixtures/skill-forge/README.md`, `scripts/evals/infrastructure/promptfoo/pilot-config.ts`
  - resultado: la suite nueva ya no depende del layout heredado para fixtures; `skill-forge` no requiere ficheros externos y la resolución canónica apunta al scaffold nuevo
- **Tarea 5.4 ejecutada**
  - evidencia: `evals/scorers/README.md`, `evals/cases/skill-forge/suite.v1.json`
  - resultado: los scorer inputs útiles viven en la suite canónica nueva como reglas deterministas de caso, sin arrastrar scorers propios del runner viejo
- **Tarea 5.5 ejecutada**
  - evidencia: `evals/engines/promptfoo/generated/skill-forge.pilot.benchmark.json`, `evals/benchmark/README.md`
  - resultado: el benchmark local se genera desde resultados del engine nuevo y queda desacoplado del runner heredado
- **Tarea 5.6 ejecutada**
  - evidencia: `scripts/evals/infrastructure/promptfoo/pilot-config.ts`, `evals/engines/promptfoo/generated/skill-forge.pilot.benchmark.json`
  - resultado: `with-skill / without-skill` funcionan sobre la suite canónica nueva y producen comparación local útil
- **Tarea 5.7 ejecutada**
  - evidencia: `scripts/evals/README.md`, `evals/README.md`, `evals/engines/promptfoo/README.md`, `packs/core/skill-forge/evals/README.md`
  - resultado: la nueva ruta queda documentada como principal para `skill-forge` y la ruta heredada pasa a compatibilidad transitoria

### Veredicto
Con esta evidencia, **Fase 5 puede considerarse cerrada**:
- existe suite mínima útil en el scaffold nuevo,
- casos y fixture story ya viven en la ruta nueva,
- scoring, benchmark y baseline operan sobre el flujo nuevo,
- y la ruta heredada deja de ser necesaria para el flujo principal de `skill-forge`.

## Tarea 5.1 — Definir la suite mínima útil

### Objetivo
Elegir la primera suite que demuestra que el nuevo scaffold sirve de verdad.

### Debe incluir como mínimo
- 1 caso **core**,
- 1 caso **edge** o de no activación,
- 1 caso de **regresión** si ya existe evidencia útil en el repo actual.

### TDD
- rojo: la nueva suite todavía no corre completa,
- verde: corre con el engine nuevo,
- refactor: ajustar estructura de `cases/` sin ampliar alcance.

### Salida
Existe una suite mínima útil explícita y priorizada.

---

## Tarea 5.2 — Migrar casos al nuevo scaffold

### Objetivo
Llevar los casos seleccionados a `evals/cases/...`.

### Reglas
- no migrar casos “por volumen”,
- solo migrar casos que aporten señal,
- marcar claramente los descartados.

### TDD
- caracterización mínima del caso útil,
- mover/adaptar,
- validar que sigue representando el escenario esperado.

### Salida
Los primeros casos sobreviven ya en el nuevo layout.

---

## Tarea 5.3 — Migrar fixtures al nuevo scaffold

### Objetivo
Hacer que los casos nuevos resuelvan sus inputs desde el nuevo layout.

### Reglas
- fixture que no usa ningún caso útil no se migra por inercia,
- la resolución debe pasar por el resolver/config ya introducido,
- no dejar nuevos hardcodes de layout.

### TDD
- rojo: fixture no resoluble desde la nueva ruta,
- verde: se resuelve correctamente,
- refactor: simplificar paths y helpers.

### Salida
La suite mínima útil usa fixtures ya compatibles con el nuevo scaffold.

---

## Tarea 5.4 — Migrar o rehacer scorers útiles

### Objetivo
Llevar los scorers necesarios a la ruta nueva.

### Tipos de scorers
- deterministic,
- semantic,
- de resumen/resultado si aplica.

### Regla
No migrar scorers que existen solo para sostener la semántica del runner antiguo.

### TDD
- rojo: el scorer no valida correctamente en el nuevo flujo,
- verde: valida el caso correcto,
- refactor: unificar helpers comunes.

### Salida
La suite mínima útil tiene scorers funcionando en el nuevo scaffold.

---

## Tarea 5.5 — Conectar benchmark local a resultados del engine nuevo

### Objetivo
Demostrar que el benchmark vive sobre el nuevo flujo y no sobre el runner viejo.

### Regla
El benchmark sigue siendo local y portable.

### TDD
- rojo: el benchmark no puede agregarse desde resultados del nuevo flujo,
- verde: se agrega correctamente,
- refactor: consolidar resumen y tipos si hace falta.

### Salida
Ya existe benchmark útil alimentado por la nueva ruta.

---

## Tarea 5.6 — Materializar `with-skill / without-skill`

### Objetivo
Cerrar la baseline mínima de v1 en el nuevo scaffold.

### Regla
En esta fase:
- sí: `with-skill`
- sí: `without-skill`
- no: `previous-skill`

### TDD
- rojo: la comparación baseline no existe o no es consistente,
- verde: ambos modos producen resultados comparables,
- refactor: ajustar naming o shape de resultados si hace falta.

### Salida
La baseline mínima de skill eval ya existe sobre el flujo nuevo.

---

## Tarea 5.7 — Declarar la nueva ruta como principal

### Objetivo
Que el proyecto deje de depender operativamente del camino viejo para el flujo principal.

### Incluye
- actualizar README,
- actualizar comandos/documentación soportada,
- marcar la ruta vieja como transitoria/deprecada.

### TDD / validación
Aquí no es TDD puro; es validación de comportamiento/documentación.

### Salida
La nueva ruta deja de ser “experimental” y pasa a ser la principal.

---

## 7. Guardrails de la fase

### Guardrail 1
No migrar “todo el contenido” a ciegas. Primero una suite mínima útil, luego crecer.

### Guardrail 2
No mover fixtures si todavía no hay casos útiles que los consuman.

### Guardrail 3
No reimplementar el benchmark dentro de Promptfoo ni acoplarlo a su shape interno.

### Guardrail 4
No introducir `previous-skill` en esta fase.

### Guardrail 5
No mantener dos rutas principales activas más tiempo del necesario. En cuanto la nueva sirva, la vieja pasa a transitoria.

### Guardrail 6
No arrastrar scorers o reglas que solo tenían sentido dentro del runner viejo.

### Guardrail 7
No meter refactors cosméticos grandes durante la migración del contenido útil.

---

## 8. Antiobjetivos

Durante esta fase no se persigue:

- migrar cada fichero del repo viejo,
- conservar paridad total con toda la semántica histórica,
- soportar todos los modos heredados,
- rehacer toda la suite antes de tener una mínima útil,
- diseñar una abstracción universal para engines.

---

## 9. Criterios de cierre

La Fase 5 se considera completada cuando se cumplen **todos** estos puntos:

### 9.1 Suite mínima útil operativa
Existe una suite mínima útil corriendo en el nuevo scaffold.

### 9.2 Casos y fixtures en la ruta nueva
Los casos y fixtures que forman esa suite ya no dependen del layout antiguo.

### 9.3 Scorers útiles funcionando
Los scorers necesarios para esa suite viven ya en la ruta nueva.

### 9.4 Benchmark local conectado al flujo nuevo
El benchmark funciona sobre resultados del engine nuevo.

### 9.5 Baseline mínima materializada
`with-skill / without-skill` funcionan en la ruta nueva.

### 9.6 Nueva ruta declarada principal
README y comandos soportados ya apuntan al nuevo flujo como ruta principal.

### 9.7 Ruta vieja ya no es necesaria para el flujo principal
Puede seguir existiendo compatibilidad transitoria, pero el camino principal ya no depende de ella.

---

## 10. Checklist rápida de cierre

- [x] existe una suite mínima útil en el nuevo scaffold
- [x] los primeros casos útiles viven en `evals/cases/...`
- [x] los fixtures necesarios viven en el nuevo layout
- [x] los scorers útiles viven en el nuevo layout
- [x] el benchmark local se genera desde resultados del nuevo flujo
- [x] `with-skill / without-skill` ya funcionan en la ruta nueva
- [x] el README/documentación principal ya apunta a la ruta nueva
- [x] la ruta vieja deja de ser necesaria para el flujo principal

---

## 11. Qué habilita esta fase

Cuando esta fase se cierra, el nuevo scaffold ya debe ser el **camino principal real** del proyecto.

Eso deja la siguiente fase centrada en:

- limpieza final,
- retirada de restos legacy,
- cierre de compatibilidad,
- documentación final,
- y endurecimiento del sistema ya migrado.
