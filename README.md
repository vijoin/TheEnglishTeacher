# The English Teacher

Curso interactivo de inglés para hispanohablantes, inspirado en el clásico *The English Teacher*, con una interfaz moderna: aprendes palabras y frases en lecciones cortas y el curso te pone a prueba en un ritmo fijo de **5 → 20 → 50**.

| Cada… | Actividad | Preguntas | Para aprobar |
|---|---|---|---|
| 5 palabras | ⚡ Quiz rápido de la lección | 8 | 70 % |
| 20 palabras | 🎯 Repaso de las últimas 20 | 15 | 75 % |
| 50 palabras | 🏆 Examen del nivel (desbloquea el siguiente) | 25 | 80 % |

## Qué incluye

- **6 niveles, 300 palabras y frases** con traducción, ejemplo y consejos: Primeros pasos (A1), Mi día a día (A1), En la ciudad (A2), De viaje (A2), Trabajo y estudios (B1) y Conversación fluida (B1–B2).
- **Ruta de aprendizaje** con nodos que se desbloquean en orden; cada nivel se abre al aprobar el examen del anterior.
- **Pronunciación** con la voz del navegador (velocidad normal y lenta).
- **Seis tipos de pregunta**: qué significa, cómo se dice, escucha y elige, escribe la respuesta (tolera erratas pequeñas y contracciones), ordena la frase y une las parejas.
- **Gamificación**: XP, racha diaria, meta diaria, estrellas por resultado, combos, confeti y sonidos.
- **Vocabulario** con búsqueda, filtros y práctica de los errores pendientes.
- **Perfil y ajustes**: tema claro/oscuro/sistema, meta diaria, sonidos, autopronunciación, voz y velocidad, reinicio de progreso.
- Diseño responsive (móvil y escritorio), accesible con teclado (`1`–`4` para elegir, `Enter` para comprobar y continuar, `←`/`→` en las lecciones) y respeta "reducir movimiento".
- El progreso se guarda en el navegador (`localStorage`); si no está disponible, la app sigue funcionando en memoria.

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
| `npm run build:single` | Un único HTML autónomo en `dist-single/the-english-teacher.html` (se abre con doble clic, sin servidor) |
| `npm run preview` | Sirve `dist/` |

## Estructura

```
src/
  content/     niveles (level1..6.ts), tipos y construcción del curso
  engine/      lógica pura y probada: ruta 5/20/50, quizzes, corrección, puntuación, rachas
  store/       progreso persistente (Zustand)
  lib/         router por hash, voz, efectos de sonido, confeti
  components/  piezas de UI reutilizables
  features/    pantallas: ruta, lección, quiz, resultados, vocabulario, perfil
docs/superpowers/  especificación de diseño y plan de implementación
```

## Añadir o editar contenido

Cada nivel es un archivo en `src/content/levels/` con 10 lecciones de 5 elementos:

```ts
{ en: 'How are you?', es: '¿Cómo estás?', kind: 'phrase',
  example: { en: "How are you? I'm fine, thanks.", es: '¿Cómo estás? Estoy bien, gracias.' },
  alt: ['How are you doing?'],          // otras respuestas válidas al escribir
  note: "Respuesta típica: I'm fine, thanks." }
```

Valida un nivel con `node scripts/check-level.ts <n>`; `npm test` comprueba el curso completo (estructura, inglés único en todo el curso y español único dentro de cada nivel, para que las opciones de los quizzes no sean ambiguas).

## Tecnología

Vite · React 19 · TypeScript · Tailwind CSS 4 · Motion · Zustand · lucide-react · canvas-confetti · Vitest
