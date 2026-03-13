# Fase 4 — Operativizar el nuevo harness con Promptfoo

## 0. Contexto necesario para otro agente

Este documento es **autocontenido** y asume que el lector no conoce la conversación previa.

### Objetivo global de la migración
El repo se está migrando desde un **shared local eval runner** hacia un paquete de **evaluación de skills** con estas reglas ya cerradas:

- **No** estamos construyendo tooling general para agentes.
- **Sí** estamos construyendo un **skill eval harness**.
- El motor de ejecución es **externo**.
- La integración inicial se hace con **Promptfoo**.
- El núcleo local debe seguir siendo **portable**.
- **AI SDK no entra** en esta migración.
- `previous-skill` queda **fuera del alcance inmediato**.
- El baseline actual sigue siendo solo:
  - `with-skill`
  - `without-skill`

### Estado esperado tras Fase 3
Fase 3 ya dejó listos estos puntos:

1. Existe un **nuevo scaffold visible** para `skills/` y `evals/`.
2. El **núcleo portable** ya está reubicado en el árbol nuevo:
   - contracts,
   - cases,
   - fixtures,
   - scorers,
   - benchmark,
   - baseline actual.
3. Existe una zona explícita para el engine:
   - `evals/engines/promptfoo/` o equivalente.
4. El **resolver/config de paths** ya está adoptado.
5. Los **contracts supervivientes** ya no dependen semánticamente de un provider concreto.

### Qué NO debe reabrirse en esta fase
No se reabre en Fase 4:

- el debate sobre `previous-skill`,
- la reintroducción de wrappers de provider,
- una abstracción universal de engines,
- la vuelta a un runner local general,
- la discusión de layout base `skills/` vs `evals/`.

---

## Estado de ejecución (2026-03-13)
- Slice ejecutado: **Tarea 4.1** (skill piloto y suite mínima congelada).
- Evidencia:
  - `evals/cases/skill-forge/pilot-suite.v1.json`
  - `evals/cases/skill-forge/README.md`
  - `evals/fixtures/skill-forge/README.md`
  - `scripts/evals/application/load-eval-definition/load-eval-definition.test.ts`
- Resultado:
  - existe una única skill piloto explícita: `skill-forge`,
  - existe una suite mínima localizada en el árbol nuevo (`evals/cases/`),
  - y esa suite ya es reconocible por el loader contractual actual.
- Slice ejecutado después: **Tarea 4.2** (ejecución mínima reproducible de Promptfoo).
- Evidencia:
  - `scripts/evals/infrastructure/promptfoo/pilot-config.ts`
  - `scripts/evals/infrastructure/promptfoo/pilot-config.test.ts`
  - `scripts/evals/cli/run-promptfoo-pilot.ts`
  - `evals/engines/promptfoo/fixtures/pilot-model-outputs.json`
  - `package.json` (`run-promptfoo-pilot`)
- Resultado:
  - existe config mínima de Promptfoo generada desde la suite piloto del scaffold nuevo,
  - existe un punto de entrada claro para lanzar Promptfoo sin pasar por el runner heredado,
  - el wiring usa resolver/config de paths para localizar la suite piloto en `evals/cases/`,
  - y la ejecución mínima quedó demostrada en local sobre la suite piloto.
- Slice ejecutado después: **Tarea 4.3** (baseline `with-skill / without-skill` operativo en Promptfoo).
- Evidencia:
  - `scripts/evals/infrastructure/promptfoo/pilot-config.ts`
  - `scripts/evals/infrastructure/promptfoo/pilot-config.test.ts`
  - `scripts/evals/cli/run-promptfoo-pilot.ts`
  - `evals/engines/promptfoo/fixtures/pilot-model-outputs.json`
  - `evals/engines/promptfoo/README.md`
- Resultado:
  - el config generado ejecuta explícitamente dos prompt paths: `with_skill` y `without_skill`,
  - ambos modos corren de forma reproducible sobre la suite piloto y dejan salida distinguible por modo,
  - y la representación del baseline queda operativa sin introducir `previous-skill`.
- Slice ejecutado después: **Tarea 4.4** (scoring local conectado al flujo Promptfoo).
- Evidencia:
  - `scripts/evals/infrastructure/promptfoo/pilot-scoring.ts`
  - `scripts/evals/infrastructure/promptfoo/pilot-scoring.test.ts`
  - `scripts/evals/cli/run-promptfoo-pilot.ts`
  - `scripts/evals/infrastructure/promptfoo/test-fixtures/pilot-eval-output.json`
- Resultado:
  - la ejecución piloto ya produce scoring local por caso y por modo usando `gradeCase`,
  - el scoring sigue viviendo en el core local (no dentro de Promptfoo),
  - y la salida del engine queda conectada con señal interpretable para el siguiente paso de benchmark.
- Siguiente slice recomendado: **Tarea 4.5** para hacer funcionar benchmark local sobre la suite nueva.

---

## 1. Propósito de la fase

La **Fase 4** convierte el scaffold nuevo en un **flujo operativo real**.

Hasta Fase 3 el repo ya puede tener:
- el árbol correcto,
- Promptfoo encapsulado,
- contracts y benchmark en la zona nueva,
- y un núcleo portable razonablemente aislado.

Pero eso no significa todavía que el nuevo harness **ejecute skill evals de verdad**.

El propósito de esta fase es:

> **conectar el núcleo portable con Promptfoo de forma mínima, reproducible y controlada, dejando una primera suite nueva de skill evals ejecutable end-to-end.**

No es todavía la fase de “cerrar toda la migración”.
Tampoco es la fase de “llenar el repo con todos los casos posibles”.

Es la fase en la que el nuevo diseño deja de ser solo estructura correcta y pasa a ser **flujo útil real**.

---

## 2. Resultado esperado de la fase

Al cerrar Fase 4, el repo debe cumplir estas condiciones:

1. Existe un **flujo ejecutable real** sobre el scaffold nuevo.
2. Promptfoo ya no es solo un directorio preparado, sino el **engine operativo** del nuevo harness.
3. Al menos una **skill** tiene una suite nueva ejecutable con:
   - casos,
   - fixtures si aplican,
   - baseline `with-skill / without-skill`,
   - scorers,
   - benchmark local.
4. El resultado nuevo se puede ejecutar sin pasar por el runner local heredado.
5. El benchmark local y la semántica de scoring siguen viviendo fuera del engine.
6. El flujo nuevo produce evidencia suficiente para convertirse en la nueva referencia operativa.

---

## 3. Alcance de la fase

## 3.1 Entra en Fase 4

### A. Conectar Promptfoo como engine de verdad
- completar la config mínima del engine,
- conectar casos/baselines/scorers al engine,
- definir un punto de ejecución reproducible.

### B. Habilitar una primera suite ejecutable
- elegir una skill inicial,
- definir o migrar un conjunto pequeño pero representativo de casos,
- hacer ejecutable el baseline `with-skill / without-skill`.

### C. Normalizar el output útil
- asegurar que el resultado que devuelve el engine puede convertirse en:
  - resultados comparables,
  - benchmark local,
  - reportes útiles.

### D. Sustituir la referencia operativa mínima
- el flujo nuevo pasa a ser la referencia para una ejecución mínima real,
- aunque todavía pueda existir compatibilidad o cobertura legacy en paralelo.

---

## 3.2 No entra en Fase 4

Quedan fuera de esta fase:

- introducir `previous-skill`,
- soportar múltiples engines reales a la vez,
- rediseñar todos los scorers del mundo,
- migrar todas las skills del repo,
- eliminar todos los restos legacy si no bloquean el flujo nuevo,
- optimización de DX cosmética,
- matrix avanzada de CI,
- paridad total con todos los flags históricos del runner.

---

## 4. Flujo que seguimos en esta fase

### Disciplina principal
Seguimos **TDD por slice pequeño** y mantenemos los acuerdos ya cerrados:

1. **rojo real**,
2. **cambio mínimo**,
3. **verde**,
4. **refactor corto**,
5. **verificación de ownership**.

### Estrategia táctica
En Fase 4 ya no estamos en “delete-first” como motor principal.
Aquí lo dominante es:

- **habilitar flujo nuevo mínimo**,
- **migrar solo lo suficiente para demostrar valor**,
- **evitar scope creep**.

### DDD-lite aplicado
Solo se usa donde aporta:
- engine como boundary,
- benchmark/scoring como brain local,
- contracts como Source of Truth,
- compatibilidad como zona subordinada.

---

## 5. Guardrails globales de la fase

## 5.1 Guardrails de engine

- Promptfoo debe seguir siendo **adapter fino**, no Source of Truth del dominio.
- No meter benchmark local dentro del formato interno del engine si puede vivir fuera.
- No duplicar scoring sin necesidad entre Promptfoo y el core local.
- No introducir wrappers de provider propios para “ayudar” al engine.

## 5.2 Guardrails de baseline

- El baseline en esta fase sigue siendo solo:
  - `with-skill`
  - `without-skill`
- No introducir `previous-skill` en casos, contracts ni benchmark.
- No mezclar “caso trigger” con “comparación de baseline” dentro del mismo cambio si el test pierde claridad.

## 5.3 Guardrails de suite

- La primera suite debe ser **pequeña pero representativa**.
- No intentar migrar todas las skills a la vez.
- Deben existir al menos:
  - casos core,
  - al menos un edge case,
  - al menos una regresión si ya existe evidencia en el repo.
- Debe existir al menos un caso donde la evaluación pruebe que la skill **no empeora** el resultado o no introduce un falso positivo evidente.

## 5.4 Guardrails de TDD

- No mezclar “conectar engine” y “reescribir benchmark” en el mismo slice.
- No aceptar como rojo válido un fallo de path/import/config si el comportamiento no está cubierto.
- No refactorizar layout mientras el primer flujo nuevo aún no está en verde.
- No saltarse los tests del núcleo portable para “avanzar más rápido” en Promptfoo.

## 5.5 Guardrails de migración

- El flujo nuevo debe convertirse en referencia **sin exigir borrar todavía todo el legado**.
- Si una pieza legacy sigue viva, debe estar subordinada al flujo nuevo, no al revés.
- No usar compatibilidad para seguir authoring nuevos casos en el árbol viejo.

---

## 6. Plan de la fase por subobjetivos

## 6.1 Subobjetivo A — Primer flujo ejecutable real

### Objetivo
Conseguir que el nuevo harness corra una evaluación real con Promptfoo sobre el scaffold nuevo.

### Qué debe existir
- un punto de ejecución claro,
- configuración mínima del engine,
- wiring mínimo entre cases/baselines/scorers y Promptfoo,
- una salida interpretable por el benchmark local.

### Criterio de salida
Se puede ejecutar una skill en el flujo nuevo sin depender del runner local histórico.

---

## 6.2 Subobjetivo B — Primera skill migrada de forma útil

### Objetivo
No migrar “todo”, sino una **skill inicial** suficientemente representativa.

### Qué debe incluir
- una definición mínima de suite o dataset,
- baseline `with-skill / without-skill`,
- fixtures si hacen falta,
- scorers necesarios,
- benchmark local visible.

### Criterio de salida
Existe una skill real cuya evaluación ya puede correrse sobre el flujo nuevo y producir señal útil.

---

## 6.3 Subobjetivo C — Benchmark local operando sobre el flujo nuevo

### Objetivo
Que el valor comparativo siga siendo local y no quede secuestrado por el engine.

### Qué debe incluir
- normalización del resultado del engine,
- agregado local,
- resumen legible,
- claridad sobre qué significa “mejora” o “pasa/no pasa”.

### Criterio de salida
El benchmark nuevo funciona sin necesitar que Promptfoo “sea” el benchmark.

---

## 6.4 Subobjetivo D — Referencia operativa mínima sustituida

### Objetivo
Que el flujo nuevo pueda considerarse ya la referencia mínima de uso real.

### Qué debe evitar
- seguir documentando como camino principal el runner heredado,
- necesitar entrypoints legacy para probar la primera skill nueva.

### Criterio de salida
El nuevo flujo ya puede demostrarse y explicarse como la forma principal de evaluar al menos una skill.

---

## 7. Tareas tangibles TDD

# Tarea 4.1 — Elegir la primera skill objetivo y congelar la suite mínima

## Objetivo
Elegir una sola skill como **skill piloto** de Fase 4 y fijar la suite mínima que se usará para validar el nuevo flujo.

## Debe producir
- skill objetivo nombrada explícitamente,
- conjunto mínimo de casos,
- fixtures asociados si aplican,
- definición de qué significa éxito para esa primera suite.

## Guardrails
- no elegir dos skills a la vez,
- no intentar cubrir toda la taxonomía de casos todavía,
- no reabrir `previous-skill`.

## TDD sugerido
- rojo: caso mínimo todavía no ejecutable en el nuevo flujo,
- verde: definición mínima disponible y reconocible por el harness nuevo,
- refactor: ordenar dataset/cases si hace falta.

## DoD de la tarea
- existe una única skill piloto,
- existe una suite mínima definida y localizada en el árbol nuevo,
- esa suite será la referencia del resto de la fase.

---

# Tarea 4.2 — Habilitar la ejecución mínima de Promptfoo en el árbol nuevo

## Objetivo
Conseguir una ejecución mínima reproducible del engine sobre el scaffold nuevo.

## Debe producir
- config mínima de Promptfoo,
- script/punto de entrada claro,
- wiring mínimo con resolver/config de paths,
- capacidad de lanzar la suite piloto.

## Guardrails
- no meter aquí benchmark complejo,
- no añadir provider wrappers,
- no duplicar configuración del engine en varios sitios.

## TDD sugerido
- rojo: la suite piloto no puede ejecutarse desde el árbol nuevo,
- verde: la suite piloto ejecuta vía Promptfoo,
- refactor: reducir ruido de config y paths.

## DoD de la tarea
- se puede lanzar Promptfoo contra la skill piloto desde el scaffold nuevo,
- la ejecución no necesita el runner local heredado.

---

# Tarea 4.3 — Conectar baseline `with-skill / without-skill`

## Objetivo
Hacer explícita y operativa la comparación que define el valor de la skill.

## Debe producir
- representación clara del baseline actual,
- ejecución reproducible de ambos modos,
- resultados distinguibles para ambos caminos.

## Guardrails
- baseline solo con los dos modos actuales,
- no introducir metadata irrelevante del engine en el modelo local,
- no mezclar esta tarea con rediseño de cases.

## TDD sugerido
- rojo: el flujo no diferencia correctamente los dos modos,
- verde: ambos modos se ejecutan y dejan resultados comparables,
- refactor: clarificar nombres y estructura si hace falta.

## DoD de la tarea
- `with-skill` y `without-skill` se pueden correr sobre la suite piloto,
- la salida distingue ambos modos sin ambigüedad.

---

# Tarea 4.4 — Conectar scorers al flujo nuevo

## Objetivo
Conseguir que la suite nueva tenga scoring útil, no solo ejecución técnica.

## Debe producir
- scorers deterministas y/o semánticos necesarios para la suite piloto,
- conexión limpia entre engine y benchmark local,
- resultados interpretables.

## Guardrails
- no meter toda la lógica del score dentro de Promptfoo si puede vivir en el core,
- no duplicar el mismo scorer en dos sitios sin motivo,
- no expandir a todos los scorers legacy.

## TDD sugerido
- rojo: la suite ejecuta pero no produce señal útil,
- verde: la suite produce resultados puntuables,
- refactor: mover scoring reusable fuera del adapter de engine.

## DoD de la tarea
- la suite piloto produce scoring útil,
- el scoring está ubicado según ownership correcto.

---

# Tarea 4.5 — Hacer funcionar el benchmark local sobre la suite nueva

## Objetivo
Cerrar el circuito: ejecución → resultados → benchmark local.

## Debe producir
- normalización del resultado del engine,
- benchmark local coherente,
- resumen legible o artefacto equivalente.

## Guardrails
- no convertir el output bruto del engine en la única verdad del sistema,
- no reescribir benchmark entero si no hace falta,
- no mezclar aquí limpieza de legacy.

## TDD sugerido
- rojo: el flujo corre pero no deja benchmark útil,
- verde: existe benchmark local funcional para la suite piloto,
- refactor: simplificar normalización y agregación.

## DoD de la tarea
- la suite piloto deja un benchmark local comprensible y repetible.

---

# Tarea 4.6 — Elevar el flujo nuevo a referencia operativa mínima

## Objetivo
Que el nuevo harness pueda documentarse y usarse como referencia mínima real.

## Debe producir
- documentación o README actualizado del flujo piloto,
- reducción explícita del runner viejo como referencia principal,
- claridad sobre qué parte del legado sigue viva solo de forma temporal.

## Guardrails
- no declarar “migración hecha” todavía,
- no borrar más legado del necesario en esta tarea,
- no dejar instrucciones ambiguas con dos caminos principales a la vez.

## TDD sugerido
Aquí el TDD es menor; la evidencia principal es operativa y documental.
Se exige que la suite piloto siga verde y que el flujo descrito sea ejecutable.

## DoD de la tarea
- el nuevo flujo se puede explicar y ejecutar como referencia mínima,
- el runner heredado ya no es la referencia operativa principal para esa skill piloto.

---

## 8. Criterios de cierre de Fase 4

Fase 4 se considera cerrada solo si existe evidencia de todos estos puntos:

### Evidencia A — primer flujo nuevo realmente ejecutable
- existe una suite piloto nueva,
- existe una skill piloto,
- Promptfoo ejecuta esa suite desde el scaffold nuevo,
- no hace falta el runner local heredado para esa ejecución.

### Evidencia B — baseline operativo
- `with-skill` y `without-skill` funcionan en el flujo nuevo,
- ambos dejan resultados distinguibles y comparables.

### Evidencia C — scoring y benchmark locales funcionando
- la suite nueva produce scoring útil,
- el benchmark local funciona sobre el resultado del engine,
- el engine no ha secuestrado la semántica del benchmark.

### Evidencia D — referencia operativa sustituida para la skill piloto
- el flujo nuevo ya se documenta o se usa como referencia mínima para esa skill,
- el runner viejo deja de ser el camino principal para esa validación.

### Evidencia E — no se han roto los acuerdos previos
- no se ha reintroducido `openai` en el core,
- no se ha añadido `previous-skill`,
- no se han creado wrappers de provider,
- no se ha creado un nuevo runner local general.

---

## 9. Checklist de cierre

Marca Fase 4 como cerrada solo si todas las respuestas son **sí**:

- [x] Existe una única skill piloto explícitamente elegida para la fase.
- [x] Existe una suite mínima nueva en el scaffold nuevo.
- [x] Promptfoo puede ejecutar esa suite desde el nuevo harness.
- [x] El baseline `with-skill / without-skill` ya funciona sobre esa suite.
- [x] La suite produce scoring útil.
- [ ] La suite produce benchmark local útil.
- [ ] El flujo nuevo ya puede usarse como referencia mínima para esa skill.
- [ ] `previous-skill` sigue fuera de alcance.
- [ ] El core sigue siendo provider-neutral.
- [ ] Promptfoo sigue encapsulado como engine fino.

---

## 10. Antiobjetivos de cierre

La Fase 4 **no** se considera cerrada si ha ocurrido cualquiera de estas situaciones:

- solo existe scaffold bonito, pero no ejecución real,
- Promptfoo ejecuta, pero el baseline no está operativo,
- el benchmark depende por completo del output bruto del engine,
- la skill piloto solo funciona pasando por código legacy,
- se han mezclado varias skills y el alcance ha explotado,
- se ha metido `previous-skill` “de paso”,
- se ha reintroducido provider-specific logic en contracts o benchmark.

---

## 11. Resultado esperado del cierre

Al terminar Fase 4, el proyecto ya no solo tendrá:
- estructura correcta,
- core portable,
- engine encapsulado.

Además tendrá:

> **una primera skill evaluable de verdad sobre el flujo nuevo.**

Ese es el punto en el que la migración deja de ser principalmente estructural y pasa a ser claramente **útil**.

La siguiente fase ya podrá centrarse en **expandir/migrar contenido útil** y reducir más el legado, pero eso debe tratarse en un documento separado.
