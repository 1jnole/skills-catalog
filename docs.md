# PLANS.md - Guia de implementacion por fases (OPSX / OpenSpec 1.1.1)

## Objetivo

Estandarizar una forma de ejecutar cambios en fases pequeñas, con tareas acotadas, trazabilidad y un cierre claro.
Este documento usa OpenSpec (OPSX) como flujo principal y define tambien cuando conviene NO usar OpenSpec.

## 0) Cuando usar OpenSpec y cuando no

Usa OpenSpec en este repo cuando el cambio tenga alcance funcional o tecnico no trivial.
No lo uses cuando el costo de artefactos supere el valor.

| Caso | Recomendacion |
| --- | --- |
| Feature nueva, refactor con riesgo, cambio multi-archivo, cambio con handoff | Usar OpenSpec |
| Cambio minimo (typo, docs puntuales, ajuste trivial de 1 archivo) | Flujo sin OpenSpec |

Por que SI aplica OpenSpec aqui:
- El repo ya tiene estructura `openspec/`.
- El CLI esta disponible localmente (`openspec 1.1.1`).
- Hay gate unico de cierre: `npm run verify`.

## 1) Preflight rapido

Ejecuta estos comandos antes de empezar:

```bash
openspec --version
openspec schemas --json
openspec list --json
```

Opcional para linea base del estado actual:

```bash
npm run verify
```

Criterio de salida de esta fase:
- CLI accesible.
- Schema `spec-driven` visible.
- Estado de cambios conocido (sin asumir contexto).

## 2) Fase A - Definir el cambio (sin codigo)

1. Elige un slug en kebab-case, por ejemplo `improve-skill-indexing`.
2. Crea el cambio:

```bash
openspec new change "<slug>"
```

3. Revisa estado y dependencias de artefactos:

```bash
openspec status --change "<slug>" --json
```

4. Obtiene instrucciones del primer artefacto:

```bash
openspec instructions proposal --change "<slug>" --json
```

5. Redacta `proposal` con alcance, no-objetivos y criterio de exito.

Criterio de salida de esta fase:
- Carpeta `openspec/changes/<slug>/` creada.
- Primer artefacto definido con objetivos claros y limites explicitos.

## 3) Fase B - Completar artefactos hasta quedar apply-ready

Trabaja en este orden en `spec-driven`:
1. `proposal`
2. `specs`
3. `design`
4. `tasks`

Ciclo recomendado:
1. Consultar estado.
2. Crear el siguiente artefacto en estado `ready`.
3. Volver a consultar estado.
4. Repetir hasta completar `tasks`.

Comandos utiles:

```bash
openspec status --change "<slug>" --json
openspec instructions specs --change "<slug>" --json
openspec instructions design --change "<slug>" --json
openspec instructions tasks --change "<slug>" --json
openspec validate "<slug>" --type change
```

Criterio de apply-ready:
- `tasks` existe y esta accionable.
- El cambio valida sin errores bloqueantes.
- El alcance queda cerrado para implementacion incremental.

## 4) Fase C - Implementacion por tareas acotadas

Regla principal: una tarea a la vez, diff minimo, sin mezclar objetivos.

Para cada tarea:
1. Define micro-objetivo.
2. Define limite explicito (que NO entra).
3. Implementa solo los archivos necesarios.
4. Ejecuta checks del bloque.
5. Marca evidencia del resultado.

Plantilla de tarea acotada:
- Objetivo:
- Fuera de alcance:
- Archivos esperados:
- Criterio de aceptacion:
- Riesgo principal:

Practica recomendada:
- Si falla una verificacion, aplica loop corto: leer error -> ajuste minimo -> reintentar el mismo comando.
- Evita refactors no pedidos durante la misma tarea.

## 5) Fase D - Verificacion y evidencia

Gate obligatorio del repo:

```bash
npm run verify
```

Registra evidencia minima por iteracion:

| Item | Evidencia |
| --- | --- |
| Comando | `npm run verify` |
| Resultado | PASS o FAIL |
| Fecha | YYYY-MM-DD HH:mm |
| Notas | errores relevantes o decision tomada |

Criterio de salida de esta fase:
- Verificacion final en PASS.
- Evidencia escrita y trazable a la tarea.

## 6) Fase E - Cierre y archive

Si el cambio OpenSpec quedo completo:

```bash
openspec archive "<slug>"
```

Opciones avanzadas:
- `--skip-specs`: solo para cambios infra/tooling/doc-only.
- `--no-validate`: evitar salvo excepcion justificada.

Criterio de salida:
- Cambio archivado.
- Estado limpio para iniciar el siguiente cambio.

## 7) Flujo alternativo sin OpenSpec (cuando NO conviene)

Usalo solo en cambios realmente pequenos.

Pasos:
1. Define objetivo en 3 lineas (que cambia, por que, que queda fuera).
2. Implementa el ajuste directo.
3. Ejecuta:

```bash
npm run verify
```

4. Registra mini evidencia en PR/nota tecnica.

Por que no usar OpenSpec en este caso:
- El trabajo es tan acotado que el overhead de artefactos no agrega valor real.

## 8) Checklist final de salida

- Flujo elegido correctamente (OpenSpec o no OpenSpec).
- Tareas acotadas y con criterio de aceptacion.
- `npm run verify` en PASS.
- Evidencia registrada.
- Si hubo OpenSpec, cambio archivado cuando correspondia.

## 9) Routing de prompts (estable vs experimental)

Usar prompts **estables por defecto**. Los prompts `opsx-*` son opcionales y experimentales.

| Momento | Prompt recomendado | Alternativa experimental | Fallback CLI |
| --- | --- | --- | --- |
| Crear cambio | `/prompts:openspec-proposal` | `/prompts:opsx-new` | `openspec new change "<slug>"` + `openspec instructions proposal --change "<slug>" --json` |
| Completar artefactos | Continuar con `openspec instructions` por artefacto | `/prompts:opsx-continue` | `openspec instructions <artifact> --change "<slug>" --json` |
| Implementar tasks | `/prompts:openspec-apply` | `/prompts:opsx-apply` | ejecutar `tasks.md` una tarea a la vez + `openspec validate "<slug>" --type change` |
| Explorar opciones | (no obligatorio) | `/prompts:opsx-explore` | inspeccion manual + `openspec status --change "<slug>" --json` |
| One-shot (solo si aplica) | (evitar por defecto) | `/prompts:opsx-ff` | crear artefactos uno a uno con `openspec instructions` |
| Cierre | `/prompts:openspec-archive` | (ninguna) | `openspec archive "<slug>"` |

Reglas:
- Si un prompt experimental introduce ambiguedad o deriva del alcance, volver inmediatamente al flujo estable.
- Mantener evidencia por tarea en `openspec/changes/<slug>/tasks.md`.
- Para cambios grandes, dividir en slugs atomicos en lugar de aplicar todo en un solo change.

## Comandos resumen

```bash
# Preflight
openspec --version
openspec schemas --json
openspec list --json

# Crear y preparar cambio
openspec new change "<slug>"
openspec status --change "<slug>" --json
openspec instructions proposal --change "<slug>" --json
openspec instructions specs --change "<slug>" --json
openspec instructions design --change "<slug>" --json
openspec instructions tasks --change "<slug>" --json
openspec validate "<slug>" --type change

# Gate final
npm run verify

# Cierre
openspec archive "<slug>"
```
