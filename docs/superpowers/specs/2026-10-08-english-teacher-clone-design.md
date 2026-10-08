# The English Teacher — clon interactivo moderno (diseño)

Fecha: 2026-10-08

## 1. Entendimiento

**Lo que pidió el usuario**

- Un clon del curso interactivo "The English Teacher" (Opus).
- Enseña palabras y frases en inglés.
- Hace quizzes periódicos: cada 5 palabras/frases, luego cada 20, luego cada 50.
- Se van desbloqueando niveles.
- UI/UX actual (moderna).

**Supuestos (el usuario pidió avanzar sin pausas; se pueden corregir luego)**

- Público: hispanohablantes que aprenden inglés → interfaz en español neutro.
- Aplicación web estática (sin backend), progreso guardado en el navegador (`localStorage`).
- Sin marca "Opus": la app se llama "The English Teacher" (nombre del repo).
- Audio de pronunciación con la síntesis de voz del navegador (Web Speech API), sin archivos de audio.
- Contenido propio: 6 niveles × 50 elementos = 300 palabras y frases con traducción y ejemplo.

**Criterios de éxito**

1. Puedo estudiar lecciones de 5 elementos (palabra/frase + traducción + ejemplo + audio).
2. Tras cada 5 elementos hay un quiz rápido; tras 20, un repaso; tras 50, un examen de nivel.
3. Cada paso se desbloquea al completar el anterior; el siguiente nivel se desbloquea al aprobar el examen de 50.
4. El progreso persiste entre recargas.
5. Funciona bien en móvil y escritorio, con modo claro/oscuro, animaciones suaves y accesible con teclado.

## 2. Estructura del curso

- **Nivel** = 10 lecciones temáticas × 5 elementos = 50 elementos.
- **Ruta de un nivel** (23 nodos):

```
L1 Q5 L2 Q5 L3 Q5 L4 Q5 R20(1–20)
L5 Q5 L6 Q5 L7 Q5 L8 Q5 R20(21–40)
L9 Q5 L10 Q5 E50(1–50)
```

  - `L` lección (5 elementos nuevos)
  - `Q5` quiz rápido sobre los 5 elementos de la lección anterior
  - `R20` repaso de los últimos 20 elementos
  - `E50` examen del nivel (los 50 elementos)
- **Desbloqueo**: el nodo *n* está disponible cuando el nodo *n−1* está completado. El primer nodo del nivel *k+1* se desbloquea al aprobar `E50` del nivel *k*. Los nodos completados se pueden repetir.
- **Aprobación**: Q5 ≥ 70 %, R20 ≥ 75 %, E50 ≥ 80 %. Una lección se completa al recorrer sus 5 tarjetas.
- **Estrellas**: 1 = aprobado, 2 = ≥ 90 %, 3 = 100 %. Se guarda la mejor marca.

### Niveles

| # | Título | Nivel MCER aprox. |
|---|--------|-------------------|
| 1 | Primeros pasos | A1 |
| 2 | Mi día a día | A1 |
| 3 | En la ciudad | A2 |
| 4 | De viaje | A2 |
| 5 | Trabajo y estudios | B1 |
| 6 | Conversación fluida | B1–B2 |

Cada nivel mezcla palabras (~60 %) y frases (~40 %).

### Modelo de contenido

```ts
type ItemKind = 'word' | 'phrase'
interface ItemInput {
  en: string            // "How are you?"
  es: string            // "¿Cómo estás?"
  kind: ItemKind
  example?: { en: string; es: string }
  alt?: string[]        // respuestas alternativas en inglés aceptadas al escribir
  note?: string         // consejo breve en español
}
interface LessonInput { title: string; items: ItemInput[] /* exactamente 5 */ }
interface LevelInput {
  id: number; title: string; subtitle: string; cefr: string
  emoji: string; color: LevelColor; lessons: LessonInput[] /* exactamente 10 */
}
```

Los ids estables se derivan de la posición: elemento `1-03-2` (nivel 1, lección 3, elemento 2), nodo `1:7`.

## 3. Tipos de pregunta

| Tipo | Enunciado | Respuesta |
|------|-----------|-----------|
| `choice-en-es` | Inglés (con audio) | Elegir la traducción entre 4 |
| `choice-es-en` | Español | Elegir el inglés entre 4 |
| `listen` | Solo audio | Elegir el inglés entre 4 (se omite si no hay voz) |
| `type` | Español | Escribir en inglés (palabras y frases cortas) |
| `build` | Español | Ordenar fichas de palabras (frases de ≥ 3 palabras, + 2 distractoras) |
| `match` | — | Emparejar 4–5 pares inglés ↔ español |

- **Distractores**: del mismo nivel y mismo tipo (palabra/frase), sin textos ni traducciones repetidas; se completan con otros niveles si hiciera falta.
- **Respuesta escrita**: normalización (minúsculas, sin puntuación ni tildes, apóstrofos rectos, contracciones expandidas `I'm → i am`, espacios colapsados). También se aceptan `alt`. Si la distancia de Levenshtein es pequeña (≤ 1 para ≤ 8 caracteres, ≤ 2 para más largos) cuenta como correcta y se avisa "casi: revisa la ortografía".
- **Emparejar**: es correcta si se completa sin errores.

### Composición

| Quiz | Preguntas | Composición |
|------|-----------|-------------|
| Q5 | 8 | 1 emparejar (5) + cada elemento 1 vez + 2 extra con otro tipo |
| R20 | 15 | 14 individuales (prioriza elementos con errores) + 1 emparejar (4) |
| E50 | 25 | 24 individuales (más `type`/`build`) + 1 emparejar (4) |

La puntuación es el porcentaje de preguntas acertadas al primer intento. No se repiten preguntas falladas dentro del quiz.

## 4. Gamificación

- **XP**: lección +10; quiz +2 por acierto, +5 si aprueba; examen de nivel aprobado +50 extra.
- **Racha diaria**: cualquier actividad completada en el día; si el último día fue ayer, suma 1; si fue antes, se reinicia a 1.
- **Meta diaria** de XP (10/20/30/50, por defecto 20) con anillo de progreso.
- **Repaso de errores**: práctica libre con hasta 10 elementos fallados; no afecta al desbloqueo y da XP.
- Confeti y sonidos (WebAudio sintetizado, desactivables) al aprobar.

## 5. Pantallas

1. **Aprender (inicio)**: cabecera con racha, XP y meta diaria. Niveles como secciones con banner de color y progreso. Ruta en zigzag con nodos bloqueados, disponibles (pulso + "¡Empieza!") y completados (estrellas). Los niveles bloqueados se muestran colapsados con su requisito. Al cargar se desplaza al nodo actual.
2. **Lección**: pantalla completa con barra de progreso y botón cerrar. Una tarjeta por elemento: inglés grande, botones de audio normal/lento, traducción, ejemplo con audio, insignia palabra/frase y nota. Al final, un resumen de los 5 elementos → "Empezar quiz".
3. **Quiz**: barra de progreso, pregunta, hoja inferior de retroalimentación verde/roja con la respuesta correcta y audio, botón "Continuar". Atajos: 1–4 para elegir, Enter para comprobar o continuar.
4. **Resultados**: porcentaje, estrellas animadas, XP, aprobado o no, lista de "para repasar" con audio, botones Continuar/Reintentar.
5. **Vocabulario**: elementos aprendidos con búsqueda inglés/español, filtro por nivel y tipo, audio, marca "para repasar" y botón "Practicar errores".
6. **Perfil y ajustes**: estadísticas, tema (sistema/claro/oscuro), efectos de sonido, velocidad y voz, meta diaria y reiniciar progreso (con confirmación).

Navegación: barra inferior en móvil y lateral en escritorio. Rutas por hash: `#/`, `#/play/1:7`, `#/practice`, `#/vocab`, `#/profile`.

## 6. Arquitectura

**Stack**: Vite 7 + React 19 + TypeScript 5.9 + Tailwind CSS 4 + Motion 12 + Zustand 5 (persist) + lucide-react + canvas-confetti. Pruebas con Vitest 3 + Testing Library + jsdom.

```
src/
  content/   types.ts, levels/level1..6.ts, index.ts (curso con ids derivados)
  engine/    random.ts, path.ts, quiz.ts, answer.ts, scoring.ts, streak.ts   ← lógica pura, probada
  store/     progress.ts (zustand + persist, almacenamiento seguro)
  lib/       speech.ts (TTS), sfx.ts (WebAudio), router.ts (hash), cn.ts
  components/ UI reutilizable (Button, ProgressBar, AudioButton, Sheet, Stars, Ring…)
  features/  path/, lesson/, quiz/, results/, vocab/, profile/
  App.tsx, main.tsx, index.css
```

- El motor (`engine/`) es puro y determinista: recibe un RNG con semilla para generar quizzes reproducibles en las pruebas.
- El estado de los nodos (bloqueado/disponible/completado) se **deriva** del progreso y no se almacena.
- El almacenamiento está envuelto en try/catch: si `localStorage` falla, la app funciona en memoria.

## 7. Manejo de errores y casos límite

- Sin síntesis de voz → se ocultan los botones de audio y no se generan preguntas `listen`.
- Cambios de contenido → el progreso guarda ids de nodos y elementos; un id desconocido se ignora.
- Salir a mitad de lección o quiz → diálogo de confirmación; no se guarda el resultado parcial.
- Persistencia versionada (`version: 1`) para migraciones futuras.

## 8. Pruebas

- **Contenido**: 6 niveles, 10 lecciones × 5 elementos, sin inglés duplicado dentro del curso, campos no vacíos.
- **Ruta**: 23 nodos por nivel con la secuencia exacta; reglas de desbloqueo entre nodos y niveles.
- **Quiz**: cantidades por tipo de nodo; cada elemento de Q5 aparece; opciones únicas que incluyen la correcta; sin `listen` cuando no hay audio; fichas de `build` correctas.
- **Respuestas**: normalización, contracciones, alternativas y tolerancia a errores tipográficos.
- **Puntuación**: umbrales, estrellas y XP. **Racha**: mismo día, ayer, salto.
- **Store**: completar nodos, mejor marca, desbloqueo y reinicio.
- **UI (humo)**: la app renderiza la ruta; completar una lección habilita su quiz; un quiz responde y muestra resultados.

## 9. Fuera de alcance

Cuentas de usuario y sincronización, backend, PWA/offline, reconocimiento de voz y archivos de audio grabados.
