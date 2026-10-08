# The English Teacher v2: rediseño simple

Fecha: 2026-10-08 · Reemplaza las secciones 3–5 de `2026-10-08-english-teacher-clone-design.md`; el resto (contenido, ritmo 5/20/50, desbloqueo de niveles y arquitectura) se mantiene.

## Lo que pidió el usuario

> "Es un clon demasiado parecido a Duolingo, puede haber problemas de copyright, quiero algo más simple. Una palabra o frase. Con algunos ejemplos de cómo se usa, el sonido de cómo se escucha, y avanzar a la siguiente palabra. Luego, el mecanismo de los quizzes que obligue a responder para avanzar, y si no responde bien tiene que volver a repasar lo que respondió mal y volver a presentar el quiz."

## Flujo

1. **Estudio**: una palabra o frase por pantalla.
   - La pantalla muestra el inglés, la traducción, el sonido (normal y lento), **3 ejemplos de uso** (cada uno con audio y traducción) y un consejo opcional.
   - Botones "Anterior" y "Siguiente". Tras la quinta palabra se pasa al quiz.
2. **Quiz** cada 5 palabras (5 preguntas), cada 20 (10 preguntas) y cada 50 (15 preguntas, examen del nivel).
   - Hay que responder cada pregunta para avanzar: no se puede saltar.
   - Tras responder se ve si acertó y la respuesta correcta, y luego "Siguiente pregunta".
3. **Resultado**:
   - Todo correcto: el quiz queda superado y se continúa. Al superar el examen de 50 se desbloquea el siguiente nivel.
   - Con algún fallo: es **obligatorio repasar** las palabras falladas, una por una, con la misma tarjeta de estudio. Al terminar, **se vuelve a presentar el quiz** sobre las mismas palabras, con preguntas y orden nuevos y con las falladas incluidas siempre. El ciclo se repite hasta superarlo sin errores.
4. Salir a mitad de lección o de quiz pide confirmación y no guarda nada de ese intento.

## Tipos de pregunta

Opción múltiple inglés → español, opción múltiple español → inglés, escuchar y elegir (solo si hay voz) y escribir en inglés (respuestas cortas, con tolerancia a erratas pequeñas). Se eliminan "ordenar fichas" y "unir parejas".

## Pantallas

- **Curso** (inicio): selector de nivel (los bloqueados indican qué los desbloquea) y botón "Continuar" con el siguiente paso. Debajo, el **índice del nivel** como el de un libro: lecciones, quizzes, repasos y examen, cada uno con su estado (hecho, siguiente o bloqueado).
- **Estudio**, **Quiz**, **Resultado** y **Repaso de fallos**, a pantalla completa con barra de progreso fina y botón para cerrar.
- **Vocabulario**: palabras aprendidas con búsqueda y audio.
- **Ajustes**: tema, pronunciación automática, voz, velocidad y reiniciar progreso.
- **Modo de prueba** (añadido a pedido del usuario): el interruptor "Desbloquear todos los niveles" en Ajustes abre todos los pasos sin completar los anteriores. Está desactivado por defecto y el inicio muestra un aviso mientras está activo.

## Lo que se elimina

Mapa en zigzag con nodos redondos, XP, rachas, meta diaria, estrellas, combos, confeti, efectos de sonido, botones "3D", hoja inferior verde/roja de feedback, colores por nivel, emojis decorativos, práctica de errores separada y las dependencias `motion` y `canvas-confetti`.

## Identidad visual

- Estilo de **ficha de estudio**: superficies planas con bordes finos, radios pequeños, un único acento azul tinta y colores semánticos sobrios para acierto y error.
- Tipografía Lexend, diseñada para la legibilidad.
- Modo claro y oscuro con tokens CSS; la app respeta el tema del sistema y el del anfitrión.

## Datos

- Contenido: `examples: Example[]` (exactamente 3) reemplaza a `example`.
- Progreso v2: pasos completados, contador de fallos por palabra (prioriza las débiles en repasos y exámenes) y ajustes. La migración desde v1 conserva los pasos completados, los fallos y los ajustes compatibles.

## Pruebas

- **Contenido**: 3 ejemplos por elemento.
- **Motor**: tamaños de quiz 5/10/15; solo cuatro tipos de pregunta; el reintento incluye las palabras falladas; superar exige el 100 %.
- **Store**: solo se completa un paso con el 100 %; los fallos se cuentan; la migración v1→v2 funciona.
- **UI**: estudiar 5 tarjetas lleva al quiz; no se puede avanzar sin responder; un fallo obliga a repasar y luego repite el quiz; acertar todo completa el paso.
