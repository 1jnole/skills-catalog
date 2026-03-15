# Skill-forge — Plan OpenSpec para cerrar la migración a Promptfoo y endurecer la eval

## Estado
Draft de implementación

## Objetivo general
Cerrar la migración desde el runner/grader heredado hacia **Promptfoo nativo** como ejecutor y fuente real de `pass/fail`, y después endurecer la suite de `skill-forge` para que sea fiable como skill que crea skills, sin reinventar la rueda ni introducir capas propias innecesarias.

---

# Resumen ejecutivo

## Decisión principal
Separar el trabajo en **2 slugs**:

1. `migrate-skill-forge-to-promptfoo-native`
2. `harden-skill-forge-eval-coverage`

## Por qué 2 slugs
Un único slug mezcla demasiado:
- cierre de migración,
- retiro del grader heredado,
- redefinición de autoridad semántica,
- endurecimiento estructural,
- expansión de cobertura,
- fixtures,
- limpieza documental.

Dos slugs permiten:
- cerrar primero el problema crítico del **falso verde**;
- endurecer después la suite sin mezclar responsabilidades.

## Resultado esperado al final del plan
- Promptfoo decide el `pass/fail` real.
- No existe un grader central ocultando fallos.
- La suite ejecutable tiene una autoridad clara.
- Los triggers requieren un Eval Brief estructuralmente válido.
- Los corner cases de routing importantes quedan cubiertos.
- Offline y live quedan alineados.
- La documentación deja de contradecir la realidad del runtime.

---

# Diagnóstico de partida

## Problema principal
La migración desde el runner local a Promptfoo quedó a medio cerrar.

Hoy conviven tres capas:
- contrato/documentación del skill,
- suite ejecutable de Promptfoo,
- grader heredado en JS.

Eso provoca dos efectos:

1. **Drift semántico**
    - parte de la verdad está en JSON/README/SKILL,
    - parte en YAML de Promptfoo,
    - parte en un grader JS.

2. **Falso verde**
    - el grader calcula score y expectativas,
    - pero devuelve `pass: true` siempre,
    - así que Promptfoo reporta verde aunque haya fallos reales.

## Conclusión estratégica
La salida correcta **no** es reconstruir otro runner encima de Promptfoo.
La salida correcta es **terminar la migración**:

- Promptfoo como runtime oficial;
- assertions nativas como fuente primaria de verdad;
- JS custom solo como escape hatch puntual;
- sin grader central paralelo.

---

# Matriz de autoridad para que el agente no alucine

Esta sección debe considerarse parte del contrato de implementación.

## 1. Promptfoo oficial = sintaxis, capacidades y límites de ejecución
Cuando el agente toque cualquiera de estos puntos, debe basarse **solo** en documentación oficial de Promptfoo:

- estructura de `promptfooconfig.yaml`
- uso de `defaultTest`
- carga de tests desde ficheros externos
- tipos de assertions soportados
- `contains-json`
- `contains-json` con schema
- `javascript` assertions
- uso de `assert-set`
- repetición de runs (`--repeat`) cuando se quiera estabilidad

### Referencias oficiales
- https://www.promptfoo.dev/docs/configuration/guide/
- https://www.promptfoo.dev/docs/configuration/test-cases/
- https://www.promptfoo.dev/docs/configuration/expected-outputs/
- https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/
- https://www.promptfoo.dev/docs/configuration/expected-outputs/javascript/
- https://www.promptfoo.dev/docs/guides/evaluate-coding-agents/
- https://www.promptfoo.dev/docs/integrations/agent-skill/

## 2. Agent Skills = metodología y criterio de calidad de una eval
Cuando el agente necesite decidir **cómo debe pensarse una buena evaluación**, debe apoyarse en Agent Skills:

- assertions con evidencia verificable
- outputs evaluados contra resultados reales
- benchmark legible y justificable
- evitar convertir la eval en una caja opaca

### Referencia oficial
- https://agentskills.io/skill-creation/evaluating-skills

## 3. Repo = contrato específico de `skill-forge`
Cuando la decisión sea sobre comportamiento o contrato de la skill, manda el repo:

- `packs/core/skill-forge/SKILL.md`
- `evals/final-supported-path.md`
- `evals/README.md`
- `evals/cases/skill-forge/README.md`
- la suite canónica de runtime que se decida en OpenSpec

### Regla
Promptfoo **no** decide qué markers exactos debe emitir `skill-forge`.
Promptfoo solo decide **cómo comprobarlos**.

---

# Contrato de implementación para el agente

Pegar este bloque tal cual en el change o en las instrucciones del agente:

```md
## Implementation contract

For Promptfoo syntax, supported assertion types, test file loading, and custom JS hooks, use only promptfoo.dev official documentation referenced in this change.

For evaluation methodology, use Agent Skills guidance as the conceptual reference, but do not infer Promptfoo syntax from it.

For skill-forge routing markers, supported paths, and required output contract, use repository sources only (`SKILL.md`, eval docs, supported-path docs).

Do not introduce undocumented Promptfoo fields, assertion types, or grading layers.
Prefer deterministic assertions before any custom JavaScript.
```

## Guardrail resumido para el agente

```md
Use only documented Promptfoo features referenced in this change.
Do not invent assertion types, config keys, or grading behavior.
Use deterministic assertions first (`starts-with`, `icontains`, `icontains-any`, `regex`, `contains-json` with schema).
Use `javascript` assertions only if the official deterministic assertions cannot express the rule.
Treat `SKILL.md` and supported-path docs as the source of truth for skill-forge markers and boundaries.
Treat Agent Skills as methodological guidance, not as Promptfoo syntax documentation.
```

---

# Política de diseño de la eval

## Reglas
1. **Promptfoo manda** como runtime y juez final del `pass/fail`.
2. **No hay grader central** paralelo.
3. **Deterministic first**.
4. **Schema before JS** cuando haya JSON estructurado.
5. **Frases exactas solo para contrato congelado**, no para todo el output.
6. **No mantener dos suites ejecutables con la misma autoridad**.
7. **No añadir complejidad si Promptfoo ya lo resuelve**.

## Allowed assertion set inicial
Estas son las assertions preferidas para este cambio, porque están documentadas y cubren el caso:

- `starts-with`
- `icontains`
- `icontains-any`
- `contains-all` / `icontains-all` si aplica
- `regex`
- `not-icontains`
- `contains-json`
- `assert-set` solo si hay necesidad real de umbral parcial

## Forbidden until justified
No introducir salvo justificación explícita:

- grader central JS
- `llm-rubric`
- model grading
- nuevas capas de adaptación
- assertions custom genéricas cuando determinísticas basten

---

# Decisiones congeladas del plan

## Autoridad de runtime
Durante esta etapa, la suite canónica de ejecución debe ser:

- `evals/engines/promptfoo/tests/skill-forge.yaml`

## Estado de `suite.v1.json`
- `evals/cases/skill-forge/suite.v1.json` puede mantenerse como artefacto documental/local.
- No debe seguir actuando como segunda fuente de verdad de ejecución mantenida al mismo nivel que el YAML.

## Frases del contrato que sí pueden validarse casi exactas
Reservar exactitud para markers congelados del skill:

- `Classification: trigger`
- `Classification: non-trigger`
- `Classification: stop-and-ask`
- `Freeze the contract before final instructions.`
- `Downstream eval work is out of scope here.`
- `Out of scope for skill-forge.`
- `Scope clarification required.`
- `Eval Brief ready`

## JSON del Eval Brief
- En slug 1: no bloquear la migración con un schema duro si aún no está listo.
- En slug 2: todos los triggers deben usar `contains-json` con schema mínimo útil.

---

# Slug 1 — migrate-skill-forge-to-promptfoo-native

## Objetivo
Cerrar la migración desde el runner/grader heredado hacia **Promptfoo nativo** como ejecutor y fuente real de `pass/fail`.

## Problema que resuelve
Hoy conviven:
- contrato/documentación,
- suite ejecutable,
- grader heredado.

Eso provoca:
- falso verde;
- drift;
- mantenimiento innecesario;
- opacidad sobre dónde vive la lógica real de aprobación/rechazo.

## Resultado esperado
Al cerrar este slug:
- Promptfoo es la única autoridad de `pass/fail`;
- `assertions.cjs` desaparece del flujo soportado;
- `tests/skill-forge.yaml` es la suite canónica de runtime;
- la documentación mínima deja de apuntar a rutas activas equivocadas;
- `run`, `run:offline` y `validate` reflejan fallos reales.

## Alcance
### Entra
- quitar `assertions.cjs` como autoridad de grading;
- mover `pass/fail` a assertions nativas;
- limpiar la config de Promptfoo;
- establecer la suite canónica de runtime;
- ajustar documentación mínima.

### No entra
- schema JSON duro del Eval Brief;
- gran expansión de cobertura;
- generador YAML ↔ JSON;
- model grading;
- reestructuración completa del repo de evals.

---

## Fase 0 — Congelar decisiones de migración

### Tareas tangibles
- Crear el change OpenSpec `migrate-skill-forge-to-promptfoo-native`.
- Escribir `proposal.md` con:
    - problema actual,
    - decisión de usar Promptfoo nativo,
    - retiro del grader heredado,
    - definición de fuente canónica de runtime.
- Escribir `tasks.md` con pasos concretos de migración.
- Añadir `References used by this change` con enlaces oficiales:
    - Promptfoo config guide
    - Promptfoo test cases
    - Promptfoo deterministic assertions
    - Promptfoo javascript assertions
    - Promptfoo agent skill guide
    - Agent Skills evaluating skills
- Añadir una sección de política:
    - deterministic first
    - no central grader
    - Promptfoo decides pass/fail

### Guardrails
- No introducir otra capa adaptadora.
- No dejar ambigüedad sobre qué suite manda.
- No diseñar generación automática todavía.
- No usar una feature de Promptfoo que no esté citada en la documentación oficial del change.

### Gate de cierre
- El change deja por escrito qué es activo, qué es histórico y qué manda.

---

## Fase 1 — Retirar el grader central heredado

### Tareas tangibles
- Editar `evals/engines/promptfoo/promptfooconfig.yaml`:
    - quitar `defaultTest.assert` que apunta a `support/assertions.cjs`
    - eliminar dependencias a `assertions_json` o `assertion_rules_json` si solo existían para ese grader
- Eliminar:
    - `evals/engines/promptfoo/support/assertions.cjs`
- Buscar referencias residuales en scripts/docs/tests.

### Guardrails
- No sustituir `assertions.cjs` por otro grader central nuevo.
- No esconder lógica crítica fuera de `skill-forge.yaml`.
- No mantener un “puente temporal” que luego se vuelva deuda permanente.

### Gate de cierre
- El repo ya no depende funcionalmente de `assertions.cjs`.

---

## Fase 2 — Mover assertions al YAML de Promptfoo

### Tareas tangibles
- Reescribir cada test en:
    - `evals/engines/promptfoo/tests/skill-forge.yaml`
- Añadir assertions inline por caso.
- Documentar en la suite qué assertions son contractuales y cuáles son tolerantes.

### Patrón recomendado por tipo de caso

#### Trigger
Usar assertions del estilo:
- `starts-with: "Classification: trigger"`
- `icontains: "Workflow: new-skill"` o workflow esperado
- `icontains: "Freeze the contract before final instructions."`
- `icontains: "Eval Brief ready"`
- `not-icontains: "Classification: non-trigger"`
- `not-icontains: "Classification: stop-and-ask"`

Para mixed/trigger con downstream:
- `icontains: "Downstream eval work is out of scope here."`

#### Non-trigger
- `starts-with: "Classification: non-trigger"`
- `icontains: "Out of scope for skill-forge."`
- `icontains` de la razón esperada
- `not-icontains: "Eval Brief ready"`
- `not-icontains: "Classification: trigger"`

#### Stop-and-ask
- `starts-with: "Classification: stop-and-ask"`
- `icontains: "Scope clarification required."`
- `icontains-any` con razones válidas
- `not-icontains: "Eval Brief ready"`
- `not-icontains: "Classification: trigger"`
- `not-icontains: "Classification: non-trigger"`

### Guardrails
- No rebajar frases congeladas a tokens débiles si ya forman parte del contrato visible.
- No usar `icontains` para todo indiscriminadamente.
- No introducir syntax de Promptfoo no documentada.

### Gate de cierre
- Cada caso tiene su bloque `assert`.
- El `pass/fail` ya depende solo de Promptfoo nativo.

---

## Fase 3 — Ajustar documentación mínima para cerrar la migración

### Tareas tangibles
- Actualizar `packs/core/skill-forge/SKILL.md`:
    - marcar la ruta legacy como histórica
    - dejar claro cuál es la ruta soportada actual
- Actualizar `evals/README.md`:
    - quitar referencias a `assertions.cjs` como artefacto soportado
- Revisar coherencia con:
    - `evals/cases/skill-forge/README.md`
    - `evals/final-supported-path.md`

### Guardrails
- No intentar resolver en este slug toda la documentación histórica del repo.
- Limpiar solo lo que afecta a la migración activa y a la autoridad semántica.

### Gate de cierre
- No queda ninguna referencia activa que presente `assertions.cjs` como parte del flujo soportado.
- No queda ninguna referencia activa a `packs/core/skill-forge/evals/evals.json` como ruta actual.

---

## Fase 4 — Verificación funcional de la migración

### Tareas tangibles
Ejecutar:
- `npm run promptfoo:validate`
- `npm run promptfoo:run:offline`
- `npm run promptfoo:run`

Comprobar específicamente:
- `with_skill` pasa donde debe pasar;
- `without_skill` falla de forma visible al menos en los casos trigger;
- el resumen ya no muestra “todo verde” artificial.

### Guardrails
- No dar la migración por cerrada si offline pasa solo porque los fixtures son laxos.
- No aceptar “verde” si el detalle de assertions muestra incoherencias.

### Gate de cierre
- Promptfoo reporta fallos reales.
- El verde deja de depender del grader heredado.
- La migración queda cerrada funcionalmente.

---

## Corner cases y riesgos del slug 1

### 1. Falsos positivos por cambiar `hasMarker()` a `icontains`
El grader antiguo usaba pseudo-boundaries con regex.
Pasar todo a `icontains` puede ser menos preciso.

**Mitigación:**
- `starts-with` para clasificación
- `regex` cuando el token importe mucho
- `icontains` para frases largas y estables

### 2. Frases exactas demasiado frágiles
Agent Skills advierte de este riesgo.

**Mitigación:**
reservar exactitud solo para markers congelados del contrato.

### 3. Fixtures offline engañosos
Aunque desaparezca el grader, offline podría seguir pasando con fixtures viejos.

**Mitigación:**
aceptar que el slug 1 cierre la migración, pero dejar visible la dependencia del slug 2 para endurecer fixtures y JSON.

---

## Criterio de done del slug 1
Este slug está hecho cuando:
- Promptfoo es la única autoridad de `pass/fail`;
- `assertions.cjs` ha desaparecido;
- `tests/skill-forge.yaml` es claramente la suite canónica de runtime;
- la documentación mínima ya no contradice la migración;
- los fallos reales aparecen como fallos reales.

---

# Slug 2 — harden-skill-forge-eval-coverage

## Objetivo
Endurecer la suite ya migrada para que `skill-forge` sea fiable como skill que crea skills:
- validación estructural del Eval Brief,
- mejor cobertura,
- protección frente a regresiones reales,
- fixtures alineados,
- documentación final consistente.

## Problema que resuelve
Una vez migrado el runner, todavía quedan riesgos:
- trigger cases que pasan por markers superficiales;
- ausencia de validación estructural del JSON;
- fixtures offline viejos;
- drift documental;
- cobertura insuficiente en boundaries importantes.

## Resultado esperado
Al cerrar este slug:
- los triggers pasarán porque el brief tiene forma correcta, no solo por texto bonito;
- habrá edge cases útiles, no cosméticos;
- offline y live quedarán alineados;
- la documentación dirá lo mismo que el runtime.

## Alcance
### Entra
- schema del Eval Brief;
- `contains-json` con schema en triggers;
- guards de contradicción;
- casos nuevos de alta señal;
- regeneración de fixtures;
- limpieza documental final.

### No entra
- infra adicional compleja;
- métricas de coste/latencia como gate duro;
- generador automático de suites;
- segundo framework de evaluación;
- model grading.

---

## Fase 0 — Crear el change de hardening

### Tareas tangibles
- Crear el change OpenSpec `harden-skill-forge-eval-coverage`.
- Documentar dependencia explícita del slug 1.
- Dejar por escrito:
    - por qué el schema aporta valor,
    - qué corner cases se quieren cubrir,
    - qué mejoras se consideran overkill.
- Añadir una sección `Validation authority`:
    - Promptfoo oficial para `contains-json` con schema
    - Agent Skills para el criterio metodológico
    - repo para markers y contrato de skill-forge

### Guardrails
- No reabrir el debate de migración ya resuelto en el slug 1.
- No meter refactors estructurales colaterales.

### Gate de cierre
- El objetivo del slug 2 queda claramente separado del slug 1.

---

## Fase 1 — Validar estructuralmente el Eval Brief

### Tareas tangibles
- Crear un schema reutilizable, por ejemplo:
    - `evals/contracts/skill-forge/eval-brief-output.schema.json`
- Definir un schema **mínimo pero útil**.
- Añadir `contains-json` con schema a todos los trigger cases del YAML.
- Referenciar el schema desde archivo (`file://...`) según la documentación oficial.

### Campos recomendados mínimos
Exigir como mínimo:
- `skill`
- `authoring`
- `successModel`
- `activationProbes`
- `negativeSignals`
- `sourceRefs`

### Recomendación de dureza
No usar todavía un schema hiperestricto con `additionalProperties: false` por todas partes.
En esta fase interesa validar:
- presencia de bloques importantes,
- tipos básicos,
- arrays donde deben existir,
- forma suficiente para detectar briefs rotos, vacíos o irrelevantes.

### Guardrails
- No usar `contains-json` “a secas”.
- No convertir el schema en una cárcel que rompa por detalles irrelevantes.
- No bloquear extensibilidad futura del brief.

### Gate de cierre
- Un trigger sin JSON válido falla.
- Un trigger con JSON vacío o parcial falla.
- Un trigger con JSON estructuralmente correcto pasa.

---

## Fase 2 — Añadir guards de contradicción

### Tareas tangibles
En todos los tipos de caso, añadir checks cruzados.

#### Trigger
- `not-icontains: "Classification: non-trigger"`
- `not-icontains: "Classification: stop-and-ask"`

#### Non-trigger
- `not-icontains: "Classification: trigger"`
- `not-icontains: "Eval Brief ready"`

#### Stop-and-ask
- `not-icontains: "Classification: trigger"`
- `not-icontains: "Classification: non-trigger"`
- `not-icontains: "Eval Brief ready"`

### Guardrails
- No añadir negaciones redundantes que no aportan señal.
- Proteger contradicciones reales, no wording incidental.

### Gate de cierre
- Outputs internamente incoherentes ya no pasan.

---

## Fase 3 — Expandir cobertura con casos de alta señal

### Casos nuevos recomendados

#### 1. Trigger con ruido no relacionado
Ejemplo:
- petición principal clara de authoring,
- más ruido sobre benchmark/modelos para más tarde.

Debe seguir siendo **trigger**.

#### 2. Runtime-only exact boundary
Caso que fuerce el boundary:
- shared eval runtime implementation
- no skill authoring

Debe ser **non-trigger** y puede comprobar la frase exacta especial del skill si esa frase está congelada en `SKILL.md`.

#### 3. Eval-authoring disfrazado de authoring
Ejemplo:
- “create eval definition / golden cases / benchmark suite”

Debe ser **non-trigger**.

#### 4. Stop-and-ask real por ambigüedad
Ejemplo:
- “refactor this skill”
- sin skill identificada o sin boundary clara

Debe ser **stop-and-ask**.

### Tareas tangibles
- Añadir 2–4 casos nuevos a:
    - `evals/engines/promptfoo/tests/skill-forge.yaml`
- Actualizar el artefacto documental que se siga manteniendo:
    - `evals/cases/skill-forge/suite.v1.json`
    - o dejar clara su condición de histórico/documental
- Añadir una breve explicación de por qué existe cada edge case.

### Guardrails
- No añadir 15 casos de poco valor.
- No duplicar casos casi idénticos.
- No diseñar edge cases exóticos que no protejan regresiones plausibles.

### Gate de cierre
- La cobertura nueva protege boundaries reales del skill.

---

## Fase 4 — Regenerar fixtures offline

### Tareas tangibles
- Ejecutar run live con la nueva suite.
- Regenerar:
    - `evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json`
    - cualquier artefacto derivado necesario en `generated/`
- Verificar que los triggers fixture contienen:
    - clasificación correcta,
    - nota contractual,
    - JSON válido,
    - `Eval Brief ready`

### Guardrails
- No conservar fixtures antiguos solo por comodidad.
- No dejar offline desacoplado del contrato real.
- No cerrar el slug si offline depende de outputs que ya no representan la suite actual.

### Gate de cierre
- `npm run promptfoo:run:offline` refleja la suite endurecida.
- offline y live comparten semántica real.

---

## Fase 5 — Limpieza documental final

### Tareas tangibles
- Alinear:
    - `packs/core/skill-forge/SKILL.md`
    - `evals/README.md`
    - `evals/cases/skill-forge/README.md`
    - `evals/final-supported-path.md`
- Dejar explícito:
    - runtime soportado,
    - artefactos históricos,
    - política de assertions,
    - qué significa que un trigger esté bien formado.

### Guardrails
- No reescribir todo el README del repo.
- Limpiar solo lo que soporte el nuevo estado final.

### Gate de cierre
- La documentación ya no se contradice con el runtime ni con los fixtures.

---

## Fase 6 — Verificación final

### Tareas tangibles
Ejecutar:
- `npm run promptfoo:validate`
- `npm run promptfoo:run:offline`
- `npm run promptfoo:run`

Opcionalmente, una verificación seria de estabilidad:
- run con repetición corta, por ejemplo `--repeat 3`, solo antes de darlo por cerrado.

### Qué comprobar
- `with_skill` pasa de forma consistente;
- `without_skill` falla de forma visible donde debe;
- los triggers requieren JSON estructural válido;
- los casos ambiguos caen en `stop-and-ask`;
- los casos de runtime o eval authoring no activan `skill-forge`.

### Guardrails
- No aceptar un verde global si hay outputs frágiles pero “casualmente” compatibles.
- No convertir el run repetido en requisito duro de cada iteración local.

### Gate de cierre
- La suite endurecida refleja el comportamiento que realmente quieres proteger.

---

## Corner cases y edge cases revisados

### 1. Prohibir `runner`, `grading`, `benchmark` globalmente
No es buena idea como regla general.

El skill prohíbe que ese contenido invada el payload autoral, pero una respuesta puede mencionarlo en una defer note válida.

**Mejora real:**
- validar el JSON con schema,
- reservar negaciones globales solo para contradicciones claras.

### 2. `contains-json` sin schema
Se queda corto.

Puede pasar cualquier JSON válido aunque sea inútil.

**Mejora real:**
- `contains-json` + schema mínimo útil.

### 3. Exactitud excesiva en wording
Agent Skills tiene razón al advertirlo.

**Mejora real:**
- exactitud solo para clasificación, stop marker y frases contractuales congeladas;
- el resto con `icontains-any`, `regex` o estructura JSON.

### 4. Dos fuentes de verdad mantenidas a mano
Sigue siendo un riesgo.

**Mejora real y no overkill:**
- YAML = canónico de runtime
- JSON = documental/histórico o derivado informal

No hace falta todavía un generador automático.

### 5. Schema demasiado rígido
También puede romper más de la cuenta.

**Mejora real:**
- schema mínimo útil ahora;
- endurecimiento incremental después si hace falta.

---

## Criterio de done del slug 2
Este slug está hecho cuando:
- los triggers requieren JSON estructuralmente válido;
- las contradicciones de clasificación quedan protegidas;
- la cobertura adicional protege boundaries reales;
- offline y live están alineados;
- la documentación final refleja el estado real del runtime.

---

# Mejoras que sí aportan y no son overkill

## A. Schema mínimo reutilizable
Relación coste/beneficio alta.

## B. Guards de contradicción
Muy baratos y evitan falsos verdes absurdos.

## C. 2–4 edge cases de alta señal
Aportan más que inflar la suite.

## D. Repetición corta para estabilidad al cierre
Útil antes de dar el slug por terminado.

## E. JS custom solo como escape hatch
Nunca como corazón del grading.

---

# Qué no haría ahora

- model grading para esta primera versión;
- scoring functions complejas;
- métricas de coste/latencia como gates obligatorios;
- generador JSON ↔ YAML;
- reestructuración completa del repo de evals;
- CI sofisticada antes de que offline/live estén estables.

---

# Guardrails globales del plan

- No reintroducir un runner/grader paralelo.
- No mantener dos suites ejecutables con la misma autoridad.
- No usar wording exacto para todo.
- No endurecer tanto el schema que impida evolucionar el brief.
- No añadir cobertura por volumen; solo por protección real.
- No meter overengineering antes de tener offline/live estables.
- No usar features de Promptfoo no citadas en documentación oficial del change.

---

# Criterio final de completitud del plan entero

El plan entero está cerrado cuando:
- `skill-forge` se evalúa con Promptfoo nativo;
- el verde del runner refleja verdad;
- el Eval Brief trigger exige JSON estructural válido;
- los boundaries importantes están protegidos por casos reales;
- offline y live están alineados;
- la documentación y las rutas soportadas ya no se contradicen.

---

# Checklist rápido para otro agente

## Antes de tocar código
- Leer `SKILL.md` de `skill-forge`.
- Leer `evals/final-supported-path.md`.
- Leer la config de Promptfoo actual.
- Leer docs oficiales de Promptfoo relevantes.
- No asumir sintaxis no documentada.

## Al implementar slug 1
- Quitar grader heredado.
- Mover assertions al YAML.
- Verificar que Promptfoo ya decide el pass/fail.
- Limpiar docs mínimas.

## Al implementar slug 2
- Crear schema mínimo útil.
- Añadir `contains-json` con schema a triggers.
- Añadir guards de contradicción.
- Añadir 2–4 edge cases de alta señal.
- Regenerar fixtures.
- Cerrar coherencia documental.

---

# Nota final

La clave de este plan no es “hacer más”, sino **cerrar la migración de verdad** y después endurecer solo donde el valor es claro:

- Promptfoo oficial para implementación,
- Agent Skills para criterio metodológico,
- repo para contrato específico de `skill-forge`.

Ese reparto de autoridad es lo que más reduce la alucinación del agente y el drift de mantenimiento.
