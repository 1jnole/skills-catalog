# Fase 5 — Endurecimiento de la evaluación sin cambiar de tool

## Objetivo

Aumentar la **fiabilidad** de la capa de evaluación usando únicamente capacidades nativas de Promptfoo y la estructura ya creada en fases anteriores.

Esta fase **no** cambia el contrato de la skill ni introduce un runner nuevo.  
La meta es que la señal de evaluación deje de depender tanto de texto superficial y pase a depender más de:

- estructura
- invariantes del contrato
- checks críticos explícitos
- semántica correcta por suite

---

## Contexto de partida

### Estado esperado al entrar en esta fase

Se asume que ya existen, o están cerradas, estas decisiones previas:

- `skill-forge/SKILL.md` ya actúa como contrato portable de la skill
- el engine operativo soportado sigue siendo **Promptfoo**
- la evaluación ya está separada en:
    - **contract suite**
    - **uplift suite**
- los providers ya no están embebidos rígidamente en la config principal
- la modularización de Promptfoo ya ha reducido duplicación básica entre configs/tests/providers/prompts

### Problema que resuelve esta fase

Aunque la separación por suites mejora mucho la semántica, todavía puede quedar un problema típico:

> la suite pasa o falla por **frases concretas** más que por la **corrección real del contrato**

Eso genera dos riesgos:

1. **fragilidad por rewording**  
   pequeños cambios inocentes rompen la suite

2. **falsos positivos superficiales**  
   el modelo dice las palabras correctas, pero no respeta bien el boundary

---

## Resultado esperado al cerrar esta fase

Al terminar esta fase, la evaluación debería ser más fuerte en estos términos:

### Contract suite
- valida el contrato de manera más **estructural**
- falla con dureza si se rompe algo crítico
- depende menos de wording accidental

### Uplift suite
- mide mejor señales comparables
- deja de exigir al baseline lo que solo corresponde al modo con skill
- produce una lectura más clara de mejora relativa

### Lectura final buscada
- `contract` responde: **“¿cumple?”**
- `uplift` responde: **“¿aporta valor?”**

---

## Alcance de la fase

### Sí entra
- endurecer assertions
- introducir métricas explícitas
- usar `defaultTest` o piezas compartidas si ya encaja con la modularización anterior
- reforzar hard-fail en checks críticos
- reducir dependencia de `icontains` donde sea razonable
- mejorar semántica de la uplift suite sin cambiar de herramienta

### No entra
- cambiar `SKILL.md`
- cambiar el schema canónico del brief salvo bug claro
- introducir un runner propio
- cambiar de engine
- crear una capa de ejecución agent-level adicional
- introducir una matriz grande multi-vendor
- rediseñar los casos fuente desde cero

---

## Archivos a tocar

### Modificar
- `evals/engines/promptfoo/tests/skill-forge.contract.yaml`
- `evals/engines/promptfoo/tests/skill-forge.uplift.yaml`
- `evals/engines/promptfoo/promptfooconfig.yaml`
- `evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`
- `evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
- `evals/engines/promptfoo/README.md`

### Posibles creaciones
- `evals/engines/promptfoo/tests/defaults.yaml`
- `evals/engines/promptfoo/tests/shared/*.yaml`
- `evals/engines/promptfoo/reports/README.md` si hace falta aclarar semántica de métricas

### Mantener estables
- `skill-forge/SKILL.md`
- `evals/contracts/skill-forge/eval-brief-output.schema.json`
- `evals/cases/skill-forge/suite.v1.json`
- prompts base `with-skill.txt` / `without-skill.txt` salvo necesidad menor

---

## Tareas tangibles

---

### TSK-F5-01 — Clasificar assertions en críticas vs auxiliares

## Qué hacer
Revisar las assertions actuales de ambas suites y clasificarlas en dos grupos:

### Críticas
Las que definen si el contrato o la clasificación se ha roto de verdad.

### Auxiliares
Las que ayudan a detectar deriva o regresión, pero no deberían ser la única causa de fallo duro.

## Candidatas a críticas

### Contract suite
- `classification` correcta
- `workflow` correcto cuando aplica
- schema / JSON estructural válido
- marker terminal `Eval Brief ready`
- ausencia de clasificaciones incompatibles (`non-trigger`, `stop-and-ask` cuando no tocan)

### Uplift suite
- `classification` correcta
- distinción correcta entre:
    - trigger
    - non-trigger
    - stop-and-ask
- marker terminal solo cuando el caso lo exige

## Guardrails
- no cambies todavía todos los tests a la vez sin clasificar antes
- no des por “crítica” una assertion solo porque existe
- no conviertas checks cosméticos en gate duro

## Output esperado
Una lista clara, documentada en comentarios o README, de:
- assertions críticas
- assertions auxiliares

---

### TSK-F5-02 — Endurecer la contract suite con checks estructurales

## Qué hacer
Modificar `skill-forge.contract.yaml` para que el peso de la validación descanse menos en frases literales y más en estructura y shape.

## Instrucción concreta
Mantener algunos markers externos si son parte del contrato visible, pero reforzar:

- validación de JSON embebido o estructurado
- validación contra schema
- invariantes de campos
- ausencia de payloads incompatibles

## Dirección esperada
Reducir dependencia de cadenas como:
- `Freeze the contract before final instructions.`

y depender más de que el brief:
- exista
- valide
- tenga la forma esperada
- no se salga del boundary

## Guardrails
- no elimines todos los markers textuales si siguen siendo parte del contrato
- no conviertas la suite en una eval semántica blanda
- no metas judge LLM si el criterio puede expresarse de forma determinista

## Output esperado
La contract suite pasa a ser más resistente a rewording y más estricta con el artefacto contractual.

---

### TSK-F5-03 — Introducir métricas explícitas para checks críticos

## Qué hacer
Añadir métricas nombradas a las assertions importantes para que el resultado de Promptfoo sea más interpretable.

## Ejemplos de métricas
- `classification`
- `workflow`
- `schema_valid`
- `terminal_marker`
- `out_of_scope_behavior`
- `stop_and_ask_behavior`

## Intención
Que el reporte no sea solo:
- pass/fail global

sino también:
- qué parte falló
- cuántas veces
- en qué dimensión

## Guardrails
- no nombres métricas redundantes o ambiguas
- no mezcles una métrica con varias semánticas
- no rompas la legibilidad por exceso de granularidad

## Output esperado
Los resultados permiten entender con más precisión qué dimensión falla.

---

### TSK-F5-04 — Definir hard-fail para lo que realmente rompe contrato

## Qué hacer
Usar capacidades nativas de Promptfoo como:
- `threshold`
- scoring controlado
- `assertScoringFunction`

solo si hace falta, para que ciertos fallos críticos tumben el test aunque otras assertions pasen.

## Casos típicos de hard-fail
### Contract suite
- clasificación errónea
- schema inválido
- falta del marker terminal cuando el caso lo exige

### Uplift suite
- clasificación incompatible con el caso
- comportamiento terminal cuando no toca
- trigger/non-trigger invertido

## Guardrails
- no conviertas toda la suite en hard-fail absoluto
- no añadas scoring custom por deporte
- usa scoring custom solo donde el comportamiento por defecto de Promptfoo no exprese bien la severidad

## Output esperado
Los fallos críticos dejan de quedar diluidos por averages o checks secundarios.

---

### TSK-F5-05 — Limpiar la uplift suite para que mida comparación, no conformidad completa

## Qué hacer
Revisar `skill-forge.uplift.yaml` para asegurar que no exige al baseline `without_skill` el mismo nivel contractual que al modo con skill.

## Cambio esperado
La uplift suite debe centrarse en señales comparables como:

- clasificación correcta
- tasa de trigger correcta
- tasa de non-trigger correcta
- tasa de stop-and-ask correcta
- marker terminal solo cuando aplica

No debe exigir al baseline:
- brief completo perfecto
- shape contractual fuerte que solo tiene sentido con la skill activa

## Guardrails
- no conviertas uplift en otra contract suite duplicada
- no uses uplift como gate contractual principal
- no sobrecargues la comparación con demasiadas condiciones de salida

## Output esperado
La uplift suite responde mejor a:
> “¿con skill rinde mejor que sin skill?”

---

### TSK-F5-06 — Extraer defaults compartidos solo si reducen complejidad real

## Qué hacer
Si tras endurecer ambas suites aparece duplicación clara y estable, extraer defaults compartidos a:

```text
evals/engines/promptfoo/tests/defaults.yaml
```

o a ficheros compartidos equivalentes.

## Qué puede ir ahí
- provider defaults si aplica por config
- assertions auxiliares recurrentes
- transformaciones compartidas
- thresholds comunes razonables

## Guardrails
- no modularices por estética
- no ocultes lógica importante en demasiadas capas
- si compartirlo hace más difícil entender la suite, no lo extraigas

## Output esperado
Menos duplicación, sin perder legibilidad.

---

### TSK-F5-07 — Actualizar README del engine con la nueva semántica fuerte

## Qué hacer
Actualizar `evals/engines/promptfoo/README.md` para reflejar:

- qué garantiza la contract suite
- qué no garantiza
- qué garantiza la uplift suite
- qué no garantiza
- qué checks son críticos
- por qué no se usa un runner propio

## Debe quedar claro
- `contract` = gate de conformidad
- `uplift` = comparación operativa
- Promptfoo sigue siendo el engine soportado
- el endurecimiento se hace con capacidades nativas del engine

## Guardrails
- no documentes features que aún no existan
- no metas teoría larga si no cambia decisiones de implementación
- no reintroduzcas acoplamiento conceptual con un proveedor concreto

## Output esperado
La documentación del engine explica correctamente la nueva fiabilidad del sistema.

---

### TSK-F5-08 — Verificación final de robustez mínima

## Qué hacer
Ejecutar una verificación manual corta sobre los casos más representativos:

- 2 trigger claros
- 2 non-trigger claros
- 1 stop-and-ask claro
- 1 caso con wording ligeramente reformulado

## Objetivo
Comprobar dos cosas:

1. que la suite no se rompe por rewording inocente
2. que sí se rompe cuando el boundary se incumple de verdad

## Guardrails
- no convertir esta verificación en una recalibración completa del dataset
- no mezclar aquí cambios de casos fuente
- no reescribir casos masivamente en esta fase

## Output esperado
Confianza razonable en que la suite detecta errores reales y no solo cambios de phrasing.

---

## Guardarraíles globales de la fase

### No hacer en Fase 5
- no crear un runner alternativo
- no cambiar de Promptfoo
- no introducir judge LLM donde un check determinista sirve
- no rediseñar todo `cases/`
- no tocar el core de la skill
- no mezclar endurecimiento con expansión grande de alcance

### Mantener estable
- contrato de la skill
- boundary del Eval Brief
- separación contract vs uplift
- agnosticismo de proveedor en el core

---

## Output esperado de la fase

## Estado final en disco

```text
evals/
  contracts/
    skill-forge/
      eval-brief-output.schema.json
  cases/
    skill-forge/
      suite.v1.json
      pilot-suite.v1.json
  engines/
    promptfoo/
      README.md
      promptfooconfig.yaml
      promptfooconfig.uplift.with-skill.yaml
      promptfooconfig.uplift.without-skill.yaml
      tests/
        skill-forge.contract.yaml
        skill-forge.uplift.yaml
        defaults.yaml          # opcional
```

## Semántica final esperada

### Contract suite
- más estricta
- más estructural
- menos frágil

### Uplift suite
- más comparativa
- menos confusa
- más útil para leer valor real de la skill

---

## Definición de completitud

La Fase 5 está cerrada cuando se cumplen estas condiciones:

1. la contract suite depende más de estructura que de phrasing accidental
2. los fallos críticos pueden tumbar el test aunque otros checks pasen
3. la uplift suite ya no exige al baseline lo que pertenece al modo con skill
4. los resultados son más interpretables por métrica
5. Promptfoo sigue siendo la única tool de ejecución soportada

---

## PR sugerido

### Título
```md
phase-5: harden promptfoo evaluation semantics without changing the engine
```

### Alcance del PR
Medio.  
Debe tocar semántica de evaluación, pero sin reabrir arquitectura ya cerrada.

---

## Nota de continuidad

La siguiente fase natural después de esta ya no sería de estructura básica, sino de **calibración y expansión controlada del dataset**:

- detectar falsos positivos
- detectar falsos negativos
- revisar near-misses
- mejorar cobertura sin inflar ruido
