# Fase 6 — Calibración y expansión controlada del dataset

## Objetivo

Cerrar la brecha entre:

- una suite **bien estructurada**
- y una suite **realmente fiable para tu workflow**

En esta fase ya no se trata de reorganizar Promptfoo ni de separar responsabilidades.  
La meta es comprobar que los casos actuales y los nuevos casos:

- detectan errores reales
- no premian wording superficial
- reducen falsos positivos y falsos negativos
- cubren mejor los bordes de `skill-contract-forge`

---

## Contexto de partida

### Estado esperado al entrar en esta fase

Se asume que ya están cerradas estas bases:

- la skill ya está desacoplada del engine
- existe una **contract suite** clara
- existe una **uplift suite** separada
- los providers ya están desacoplados o encaminados
- Promptfoo ya está modularizado lo suficiente
- la evaluación ya está endurecida en lo estructural

### Problema que resuelve esta fase

Aunque la arquitectura ya esté bien, todavía puede ocurrir esto:

- los casos son pocos o demasiado “bonitos”
- faltan near-misses
- faltan reformulaciones reales
- faltan casos que estresen la frontera entre:
    - `trigger`
    - `non-trigger`
    - `stop-and-ask`

Esta fase existe para que la suite deje de ser solo correcta “en papel” y pase a ser **diagnóstica**.

---

## Estructura de la fase

Esta fase se divide en **3 slugs** para que no se convierta en un PR demasiado grande ni demasiado ambiguo:

- **Slug 6A** — Calibración manual inicial
- **Slug 6B** — Expansión controlada del dataset
- **Slug 6C** — Cierre operativo y criterios de mantenimiento

---

# Slug 6A — Calibración manual inicial

## Objetivo

Validar que la suite automatizada se parece razonablemente a tu criterio humano.

## Qué problema ataca

Ahora mismo Promptfoo puede decir:
- pass
- fail

pero eso no garantiza que:
- el caso esté bien diseñado
- la assertion mida lo correcto
- el wording no esté engañando a la suite

## Tareas tangibles

### TSK-F6A-01 — Definir una muestra corta de auditoría manual

## Qué hacer
Seleccionar una muestra pequeña pero representativa de casos.

## Tamaño recomendado
Entre **12 y 20 casos**.

## Reparto recomendado
- **4–6 trigger claros**
- **3–4 non-trigger claros**
- **2–3 stop-and-ask claros**
- **2–4 near-misses o ambiguos realistas**

## Fuente sugerida
Partir de:
- `evals/cases/skill-contract-forge/suite.v1.json`
- `evals/cases/skill-contract-forge/pilot-suite.v1.json`
- y, si hace falta, crear un subconjunto de auditoría manual

## Guardrails
- no metas 50 casos
- no intentes calibrar toda la suite de golpe
- no elijas solo los casos más fáciles

## Output esperado
Una muestra pequeña, explícita y trazable para revisión humana.

---

### TSK-F6A-02 — Ejecutar la muestra en contract suite y uplift suite

## Qué hacer
Correr la muestra seleccionada contra:

- contract suite
- uplift with-skill
- uplift without-skill

## Intención
Tener evidencia comparable de:
- comportamiento contractual
- comportamiento comparativo

## Guardrails
- no mezclar resultados sin etiquetarlos
- no sobrescribir artefactos sin separar runs
- no interpretar uplift como gate

## Output esperado
Tres salidas comparables por caso:
- contract
- uplift with_skill
- uplift without_skill

---

### TSK-F6A-03 — Revisar manualmente los resultados

## Qué hacer
Para cada caso de la muestra, marcar manualmente:

- correcto
- incorrecto
- dudoso / revisable

## Dimensiones mínimas a revisar
- clasificación correcta
- workflow correcto cuando aplica
- respeto del boundary
- uso correcto del marker terminal
- si el resultado “parece correcto” pero realmente no lo es

## Guardrails
- no revisar solo el score global
- no quedarte en “Promptfoo lo ha dado por bueno”
- no asumir que una validación estructural equivale a corrección semántica total

## Output esperado
Una tabla o nota breve de auditoría con:
- falsos positivos
- falsos negativos
- casos dudosos
- patrones de fallo

---

### TSK-F6A-04 — Extraer patrones de error

## Qué hacer
Agrupar los fallos encontrados en categorías simples.

## Categorías sugeridas
- wording pass / semantic fail
- schema pass / boundary fail
- wrong classification
- ambiguous workflow handling
- false stop-and-ask
- missed stop-and-ask

## Guardrails
- no inventar una taxonomía complejísima
- usa categorías accionables
- si un fallo no se repite, no lo conviertas en sistema

## Output esperado
Una lista pequeña de patrones de error reales que sirva para orientar el siguiente slug.

---

## Criterio de cierre del Slug 6A

El slug está cerrado cuando:
1. existe una muestra manual auditada
2. ya sabes dónde está acertando la suite
3. ya sabes dónde aún da señales débiles o engañosas
4. tienes patrones de error utilizables para ampliar dataset

---

# Slug 6B — Expansión controlada del dataset

## Objetivo

Ampliar cobertura sin inflar ruido ni convertir `evals/cases` en un cajón de prompts aleatorios.

## Qué problema ataca

Una vez detectados los patrones de fallo, toca convertirlos en casos útiles y mantenibles.

## Regla principal

**No añadir casos por cantidad.**  
Añadir casos solo si cubren una frontera o un fallo detectado.

---

## Tareas tangibles

### TSK-F6B-01 — Crear buckets explícitos de ampliación

## Qué hacer
Agrupar los nuevos casos en buckets pequeños y con intención clara.

## Buckets sugeridos
- `near-miss-trigger`
- `near-miss-non-trigger`
- `near-miss-stop-and-ask`
- `reworded-trigger`
- `reworded-negative`
- `boundary-mixed-request`

## Guardrails
- no crear buckets decorativos
- cada bucket debe responder a un patrón de error detectado en 6A
- si no hay patrón, no hay bucket

## Output esperado
Un mapa pequeño de buckets de ampliación con justificación.

---

### TSK-F6B-02 — Añadir casos nuevos de near-miss

## Qué hacer
Añadir casos que estén cerca del límite entre clasificaciones.

## Ejemplos de intención
- parece trigger, pero realmente pide runtime downstream
- parece refactor de skill, pero falta target concreto
- mezcla skill authoring con repo policy
- mezcla authoring con benchmark o eval runtime

## Guardrails
- no usar prompts artificialmente raros
- deben sonar plausibles en tu workflow real
- no reescribir casos existentes si el problema es falta de borde

## Output esperado
Un conjunto pequeño de casos que tensen de verdad la frontera de `skill-contract-forge`.

---

### TSK-F6B-03 — Añadir reformulaciones realistas

## Qué hacer
Para algunos casos ya existentes, añadir reformulaciones equivalentes con distinto wording.

## Intención
Reducir dependencia de phrasing accidental.

## Guardrails
- no dupliques 10 veces el mismo prompt
- con 1–2 reformulaciones buenas por patrón suele bastar
- que la reformulación mantenga intención, no cambie el caso

## Output esperado
Mejor cobertura frente a rewording sin inflar artificialmente la suite.

---

### TSK-F6B-04 — Mantener separación entre fuente y suite

## Qué hacer
Asegurar que los nuevos casos se integran en:
- `evals/cases/...`
  y luego se consumen desde las suites, en vez de codificarlos directamente en tests YAML si tu estructura ya está separada así.

## Guardrails
- no vuelvas a duplicar casos entre varias capas sin necesidad
- no conviertas tests YAML en la fuente primaria del contenido del caso
- la fuente de verdad del caso debe seguir siendo clara

## Output esperado
Los casos nuevos se incorporan sin romper la separación entre:
- contratos
- casos
- engine configs/tests

---

### TSK-F6B-05 — Revalidar contract y uplift con la ampliación

## Qué hacer
Correr de nuevo:
- contract suite
- uplift with_skill
- uplift without_skill

sobre el conjunto ampliado.

## Qué mirar
- si aparecen falsos positivos nuevos
- si el baseline empieza a comportarse “demasiado bien”
- si algunos casos deberían vivir solo en contract o solo en uplift

## Guardrails
- no metas todos los nuevos casos en ambas suites por defecto
- cada caso debe vivir donde aporte señal
- si un caso no informa nada nuevo, bórralo

## Output esperado
Un dataset ampliado pero todavía legible, con señal real.

---

## Criterio de cierre del Slug 6B

El slug está cerrado cuando:
1. la ampliación responde a fallos observados, no a intuiciones vagas
2. los nuevos casos cubren mejor las fronteras reales
3. la suite sigue siendo legible y mantenible
4. no has inflado ruido ni duplicación

---

# Slug 6C — Cierre operativo y criterios de mantenimiento

## Objetivo

Dejar definido cómo se mantiene esta calidad sin reabrir el sistema entero cada vez que se toque una skill o una suite.

## Qué problema ataca

Sin criterio de mantenimiento, el dataset vuelve a degradarse:
- casos duplicados
- buckets sin sentido
- prompts “bonitos” pero inútiles
- crecimiento sin señal

---

## Tareas tangibles

### TSK-F6C-01 — Definir criterios para añadir un caso nuevo

## Qué hacer
Documentar reglas sencillas para aceptar o rechazar un caso nuevo.

## Reglas sugeridas
Un caso nuevo entra solo si:
- cubre una frontera no cubierta
- captura un falso positivo/falso negativo observado
- añade una reformulación útil
- mejora lectura comparativa entre with/without skill

No entra si:
- repite intención ya cubierta
- solo cambia estilo sin aportar señal
- es demasiado artificial
- no afecta decisiones del sistema

## Output esperado
Un criterio explícito de admisión de casos.

---

### TSK-F6C-02 — Definir criterios para retirar o fusionar casos

## Qué hacer
Documentar cuándo conviene:
- borrar un caso
- fusionarlo con otro
- moverlo de suite
- degradarlo a piloto o archivo

## Intención
Evitar inflación silenciosa del dataset.

## Output esperado
Un criterio de poda y mantenimiento.

---

### TSK-F6C-03 — Documentar el workflow de evolución del dataset

## Qué hacer
Actualizar el README relevante para dejar claro este flujo:

1. detectar fallo o hueco
2. auditar manualmente si hace falta
3. añadir caso o reformulación
4. decidir si vive en contract o uplift
5. rerun
6. revisar si realmente aporta señal

## Guardrails
- no convertir el README en un tratado
- dejar instrucciones accionables
- mantenerlo alineado con el estado real del repo

## Output esperado
Un workflow corto y operativo para evolucionar el dataset.

---

### TSK-F6C-04 — Definir el punto de “suficientemente bueno”

## Qué hacer
Dejar por escrito cuándo **parar** y considerar que la suite ya es útil para trabajo diario.

## Señales razonables
- los errores críticos conocidos ya tienen cobertura
- la contract suite protege bien el boundary
- la uplift suite da una señal comparativa útil
- los nuevos cambios ya no provocan sorpresas frecuentes
- los casos adicionales ya aportan poco valor marginal

## Guardrails
- no perseguir cobertura infinita
- no intentar modelar todos los prompts posibles
- preferir señal útil sobre volumen

## Output esperado
Un criterio realista de cierre operativo.

---

## Criterio de cierre del Slug 6C

El slug está cerrado cuando:
1. existe criterio para añadir casos
2. existe criterio para retirar/fusionar casos
3. el workflow de mantenimiento está documentado
4. está definido cuándo dejar de ampliar por ampliar

---

# Guardarraíles globales de la fase

## No hacer en Fase 6
- no reabrir arquitectura ya cerrada
- no introducir otro engine
- no cambiar el contrato de la skill salvo bug claro
- no convertir la calibración en una investigación infinita
- no crecer el dataset sin patrón de error detrás

## Mantener estable
- separación contract vs uplift
- agnosticismo de proveedor en el core
- Promptfoo como engine soportado
- contratos y cases como capas separadas

---

# Output esperado de la fase

## Estado final conceptual

```text
evals/
  contracts/
    skill-contract-forge/
      eval-brief-output.schema.json
  cases/
    skill-contract-forge/
      suite.v1.json
      pilot-suite.v1.json
      # posibles ampliaciones justificadas o buckets adicionales
  engines/
    promptfoo/
      promptfooconfig.yaml
      promptfooconfig.uplift.with-skill.yaml
      promptfooconfig.uplift.without-skill.yaml
      tests/
        skill-contract-forge.contract.yaml
        skill-contract-forge.uplift.yaml
```

## Resultado real esperado

Al cerrar esta fase, deberías poder decir:

- la suite no solo está bien organizada
- también está **calibrada**
- y cuando falla, suele fallar por algo que importa

---

# Definición de completitud

La Fase 6 está cerrada cuando:

1. has auditado manualmente una muestra representativa
2. has identificado patrones reales de error
3. has ampliado el dataset con intención clara
4. has evitado inflar ruido
5. has documentado cómo seguir manteniéndolo sin reinventar el sistema

---

## PR sugeridos

### Opción recomendada
Hacer **3 PRs**, uno por slug:

- `phase-6a: calibrate evaluation against manual review`
- `phase-6b: expand dataset with near-misses and rewordings`
- `phase-6c: document dataset maintenance rules`

### Opción aceptable
Un solo PR si el volumen final es pequeño y no mezcla demasiadas decisiones.

---

## Nota de continuidad

Después de esta fase, ya no estarías en “montar el sistema base”, sino en modo:

- estabilización
- mantenimiento
- ampliaciones puntuales con criterio
