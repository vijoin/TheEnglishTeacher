# The English Teacher

Curso de inglés para hispanohablantes, palabra por palabra: ves una palabra o frase con su traducción, la escuchas y lees cómo se usa en tres ejemplos. Cada cierto número de palabras hay un quiz que hay que superar sin errores para avanzar.

## Cómo funciona

1. **Estudia** una palabra o frase por pantalla: traducción, audio (normal y lento), 3 ejemplos de uso con su audio y traducción, y a veces un consejo. Pasa a la siguiente con "Siguiente".
2. **Quiz** después de cada bloque:

   | Cada… | Quiz | Preguntas |
   |---|---|---|
   | 5 palabras | Quiz de la lección | 5 |
   | 20 palabras | Repaso | 10 |
   | 50 palabras | Examen del nivel | 15 |

   Hay que responder cada pregunta para pasar a la siguiente.
3. **Si fallas alguna**, repasas las palabras falladas y el quiz se vuelve a presentar (las falladas siempre se preguntan de nuevo), hasta acertarlas todas.
4. **Al superar el examen** se desbloquea el siguiente nivel.

Tipos de pregunta: qué significa (inglés → español), cómo se dice (español → inglés), escuchar y elegir, y escribir en inglés (perdona erratas pequeñas, pero nunca otra palabra distinta).

## Contenido

6 niveles con 50 palabras y frases cada uno (300 en total, con 900 ejemplos):

1. Primeros pasos (A1)
2. Mi día a día (A1)
3. En la ciudad (A2)
4. De viaje (A2)
5. Trabajo y estudios (B1)
6. Conversación fluida (B1–B2)

## Pantallas

- **Curso**: índice del nivel con el estado de cada paso y botón "Continuar".
- **Vocabulario**: palabras aprendidas, con búsqueda, audio y ejemplos.
- **Ajustes**: tema claro/oscuro, pronunciación automática, voz, velocidad y reinicio del progreso.

El audio usa las voces en inglés del navegador; si no hay ninguna, los botones de audio y las preguntas de escucha no aparecen. El progreso se guarda en el navegador (`localStorage`).

## Empezar

Requiere Node.js 22.

```bash
npm install
npm run dev          # http://localhost:5173
```

| Script | Para qué |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm test` | Pruebas (Vitest + Testing Library) |
| `npm run lint` | Comprobación de tipos |
| `npm run build` | Build de producción en `dist/` |
| `npm run build:single` | Un único HTML autónomo en `dist-single/the-english-teacher.html` |

## Estructura

```
src/
  content/     niveles (level1..6.ts), tipos y construcción del curso
  engine/      lógica pura y probada: pasos 5/20/50, quizzes, corrección
  store/       progreso guardado (Zustand), con migración de versiones
  lib/         router, voz
  components/  piezas de UI reutilizables
  features/    pantallas: curso, estudio, quiz, vocabulario, ajustes
docs/superpowers/  especificaciones y plan
```

## Añadir o editar contenido

Cada nivel es un archivo en `src/content/levels/` con 10 lecciones de 5 elementos:

```ts
{ en: 'How are you?', es: '¿Cómo estás?', kind: 'phrase',
  examples: [
    { en: "How are you? I'm fine, thanks.", es: '¿Cómo estás? Estoy bien, gracias.' },
    { en: 'Hi, Maria! How are you today?', es: '¡Hola, María! ¿Cómo estás hoy?' },
    { en: 'How are you, Mrs. Garcia?', es: '¿Cómo está, señora García?' },
  ],
  alt: ['How are you doing?'],          // otras respuestas válidas al escribir
  note: "Respuesta típica: I'm fine, thanks." }
```

Valida un nivel con `node scripts/check-level.ts <n>`. `npm test` comprueba el curso completo:

- La estructura de cada nivel.
- Que cada elemento tenga 3 ejemplos.
- Que el inglés sea único en todo el curso y el español, único dentro de cada nivel.
- Que ninguna respuesta de otro elemento se acepte como errata.

## Tecnología

Vite · React 19 · TypeScript · Tailwind CSS 4 · Zustand · lucide-react · Vitest
