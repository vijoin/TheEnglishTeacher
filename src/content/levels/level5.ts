import type { LevelInput } from '../types'

export const level5: LevelInput = {
  id: 5,
  title: 'Trabajo y estudios',
  subtitle: 'Comunícate con seguridad en la oficina, en clase y en entrevistas.',
  cefr: 'B1',
  emoji: '💼',
  color: 'rose',
  lessons: [
    {
      title: 'Profesiones',
      emoji: '👷',
      items: [
        {
          en: 'lawyer',
          es: 'abogado',
          kind: 'word',
          examples: [
            { en: 'My sister is a lawyer at a big firm.', es: 'Mi hermana es abogada en un bufete grande.' },
            { en: 'You should talk to a lawyer before you sign that contract.', es: 'Deberías hablar con un abogado antes de firmar ese contrato.' },
            { en: 'She studied for years to become a lawyer.', es: 'Estudió durante años para llegar a ser abogada.' },
          ],
        },
        {
          en: 'engineer',
          es: 'ingeniero',
          kind: 'word',
          examples: [
            { en: 'He works as an engineer for a car company.', es: 'Trabaja como ingeniero en una empresa de autos.' },
            { en: 'Engineers designed this bridge to survive strong earthquakes.', es: 'Los ingenieros diseñaron este puente para resistir terremotos fuertes.' },
            { en: 'My son wants to be a software engineer someday.', es: 'Mi hijo quiere ser ingeniero de software algún día.' },
          ],
          note: 'El acento va en la última sílaba: en-gi-NEER.',
        },
        {
          en: 'accountant',
          es: 'contador',
          kind: 'word',
          examples: [
            { en: 'Our accountant helps us with taxes every year.', es: 'Nuestro contador nos ayuda con los impuestos cada año.' },
            { en: 'The accountant found a mistake in our monthly expenses.', es: 'El contador encontró un error en nuestros gastos mensuales.' },
            { en: 'Small businesses often hire an accountant during tax season.', es: 'Los negocios pequeños suelen contratar a un contador en temporada de impuestos.' },
          ],
        },
        {
          en: 'What do you do for a living?',
          es: '¿A qué te dedicas?',
          kind: 'phrase',
          examples: [
            { en: "What do you do for a living? — I'm a nurse.", es: '¿A qué te dedicas? —Soy enfermera.' },
            { en: 'Nice to meet you, Tom. What do you do for a living?', es: 'Mucho gusto, Tom. ¿A qué te dedicas?' },
            { en: 'What do you do for a living? — I run a small bakery.', es: '¿A qué te dedicas? —Tengo una pequeña panadería.' },
          ],
          alt: ['What do you do?'],
          note: 'Más natural que "What is your job?". En confianza basta con "What do you do?".',
        },
        {
          en: "I'm self-employed.",
          es: 'Trabajo por cuenta propia.',
          kind: 'phrase',
          examples: [
            { en: "I'm self-employed, so I choose my own hours.", es: 'Trabajo por cuenta propia, así que elijo mi horario.' },
            { en: "I'm self-employed now. I left my office job last year.", es: 'Ahora trabajo por cuenta propia. Dejé mi trabajo de oficina el año pasado.' },
            { en: "Do you work for a company? — No, I'm self-employed.", es: '¿Trabajas para una empresa? —No, trabajo por cuenta propia.' },
          ],
        },
      ],
    },
    {
      title: 'En la oficina',
      emoji: '🏢',
      items: [
        {
          en: 'coworker',
          es: 'compañero de trabajo',
          kind: 'word',
          examples: [
            { en: 'My coworkers and I have lunch together on Fridays.', es: 'Mis compañeros de trabajo y yo almorzamos juntos los viernes.' },
            { en: "One of my coworkers is leaving, so we're buying her a cake.", es: 'Una de mis compañeras de trabajo se va, así que le vamos a comprar un pastel.' },
            { en: 'I asked a coworker to cover my shift on Saturday.', es: 'Le pedí a un compañero de trabajo que me cubriera el turno del sábado.' },
          ],
          alt: ['colleague', 'co-worker'],
          note: '"Colleague" es un sinónimo un poco más formal.',
        },
        {
          en: 'boss',
          es: 'jefe',
          kind: 'word',
          examples: [
            { en: 'My boss wants the report this afternoon.', es: 'Mi jefe quiere el informe esta tarde.' },
            { en: 'If you need a day off, ask your boss first.', es: 'Si necesitas un día libre, pídeselo primero a tu jefe.' },
            { en: 'Our new boss is friendly and always listens to ideas.', es: 'Nuestra nueva jefa es amable y siempre escucha las ideas.' },
          ],
        },
        {
          en: 'stapler',
          es: 'engrapadora',
          kind: 'word',
          examples: [
            { en: 'Can I borrow your stapler for a second?', es: '¿Me prestas tu engrapadora un segundo?' },
            { en: 'The stapler is empty. Do we have more staples?', es: 'La engrapadora está vacía. ¿Tenemos más grapas?' },
            { en: 'The teacher keeps a stapler and tape on her desk.', es: 'La maestra tiene una engrapadora y cinta adhesiva en su escritorio.' },
          ],
        },
        {
          en: "I'm working from home today.",
          es: 'Hoy trabajo desde casa.',
          kind: 'phrase',
          examples: [
            { en: "I'm working from home today, so call my cell.", es: 'Hoy trabajo desde casa, así que llama a mi celular.' },
            { en: "I'm working from home today because my daughter is sick.", es: 'Hoy trabajo desde casa porque mi hija está enferma.' },
            { en: "Are you coming to the office? — No, I'm working from home today.", es: '¿Vienes a la oficina? —No, hoy trabajo desde casa.' },
          ],
          note: 'En chats de trabajo se abrevia WFH (working from home).',
        },
        {
          en: 'I need to make some copies.',
          es: 'Necesito sacar unas copias.',
          kind: 'phrase',
          examples: [
            { en: 'I need to make some copies before the meeting.', es: 'Necesito sacar unas copias antes de la reunión.' },
            { en: 'Is the copier free? I need to make some copies.', es: '¿Está libre la fotocopiadora? Necesito sacar unas copias.' },
            { en: 'I need to make some copies of my ID for the bank.', es: 'Necesito sacar unas copias de mi identificación para el banco.' },
          ],
          note: 'Se dice "make copies", no "take copies".',
        },
      ],
    },
    {
      title: 'Reuniones',
      emoji: '👥',
      items: [
        {
          en: 'meeting',
          es: 'reunión',
          kind: 'word',
          examples: [
            { en: 'The meeting starts at ten in room B.', es: 'La reunión empieza a las diez en la sala B.' },
            { en: "Sorry I'm late. My last meeting ran long.", es: 'Perdón por llegar tarde. Mi última reunión se alargó.' },
            { en: "The school has a parents' meeting every month.", es: 'La escuela tiene una reunión de padres cada mes.' },
          ],
        },
        {
          en: 'agenda',
          es: 'orden del día',
          kind: 'word',
          examples: [
            { en: 'The first item on the agenda is the budget.', es: 'El primer punto del orden del día es el presupuesto.' },
            { en: 'Please send me the agenda before the meeting tomorrow.', es: 'Por favor, envíame el orden del día antes de la reunión de mañana.' },
            { en: 'Is there anything else on the agenda today?', es: '¿Hay algo más en el orden del día de hoy?' },
          ],
          note: 'Falso amigo: "agenda" es el orden del día; la libreta para anotar citas es "planner".',
        },
        {
          en: 'conference room',
          es: 'sala de juntas',
          kind: 'word',
          examples: [
            { en: "We're meeting in the conference room after lunch.", es: 'Nos reunimos en la sala de juntas después del almuerzo.' },
            { en: 'Someone left a laptop in the conference room.', es: 'Alguien dejó una computadora portátil en la sala de juntas.' },
            { en: 'Can I book the conference room for Thursday morning?', es: '¿Puedo reservar la sala de juntas para el jueves por la mañana?' },
          ],
          alt: ['meeting room'],
        },
        {
          en: "Let's get started.",
          es: 'Empecemos.',
          kind: 'phrase',
          examples: [
            { en: "Okay, everyone's here. Let's get started.", es: 'Bueno, ya están todos. Empecemos.' },
            { en: "Good morning, class. Let's get started with chapter five.", es: 'Buenos días, clase. Empecemos con el capítulo cinco.' },
            { en: "We have a lot to paint today, so let's get started.", es: 'Hoy tenemos mucho que pintar, así que empecemos.' },
          ],
          alt: ["Let's begin.", "Let's start."],
        },
        {
          en: 'Does anyone have any questions?',
          es: '¿Alguien tiene alguna pregunta?',
          kind: 'phrase',
          examples: [
            { en: "That's all from me. Does anyone have any questions?", es: 'Eso es todo de mi parte. ¿Alguien tiene alguna pregunta?' },
            { en: 'Does anyone have any questions before we start the test?', es: '¿Alguien tiene alguna pregunta antes de empezar el examen?' },
            { en: "That's the end of the tour. Does anyone have any questions?", es: 'Ese es el final del recorrido. ¿Alguien tiene alguna pregunta?' },
          ],
        },
      ],
    },
    {
      title: 'Correos electrónicos',
      emoji: '📧',
      items: [
        {
          en: 'attachment',
          es: 'archivo adjunto',
          kind: 'word',
          examples: [
            { en: 'I forgot to include the attachment in my email.', es: 'Olvidé incluir el archivo adjunto en mi correo.' },
            { en: 'The attachment is too large to send by email.', es: 'El archivo adjunto es demasiado grande para enviarlo por correo.' },
            { en: "Don't open attachments from people you don't know.", es: 'No abras archivos adjuntos de personas que no conoces.' },
          ],
        },
        {
          en: 'inbox',
          es: 'bandeja de entrada',
          kind: 'word',
          examples: [
            { en: 'My inbox is full of unread messages.', es: 'Mi bandeja de entrada está llena de mensajes sin leer.' },
            { en: 'I check my inbox first thing every morning.', es: 'Reviso mi bandeja de entrada a primera hora cada mañana.' },
            { en: 'Your message went to spam, not to my inbox.', es: 'Tu mensaje llegó a la carpeta de spam, no a mi bandeja de entrada.' },
          ],
        },
        {
          en: 'to forward',
          es: 'reenviar',
          kind: 'word',
          examples: [
            { en: "Could you forward me the client's email?", es: '¿Podrías reenviarme el correo del cliente?' },
            { en: "I'll forward your question to the sales team.", es: 'Le reenviaré tu pregunta al equipo de ventas.' },
            { en: "Please don't forward this message to anyone outside the company.", es: 'Por favor, no reenvíes este mensaje a nadie fuera de la empresa.' },
          ],
          note: 'Responder es "to reply"; enviar el correo a otra persona es "to forward".',
        },
        {
          en: 'Please find the report attached.',
          es: 'Adjunto el informe.',
          kind: 'phrase',
          examples: [
            { en: 'Hi Mark, please find the report attached. Best, Ana.', es: 'Hola, Mark: adjunto el informe. Saludos, Ana.' },
            { en: 'Dear Professor Kim, please find the report attached.', es: 'Estimado profesor Kim: adjunto el informe.' },
            { en: 'As promised, please find the report attached. Let me know your thoughts.', es: 'Como le prometí, adjunto el informe. Quedo atento a sus comentarios.' },
          ],
          alt: ["I've attached the report.", 'Attached is the report.'],
          note: 'Fórmula típica de correos formales. Más sencillo: "I\'ve attached the report."',
        },
        {
          en: 'Thank you for your quick reply.',
          es: 'Gracias por su pronta respuesta.',
          kind: 'phrase',
          examples: [
            { en: 'Dear Ms. Lee, thank you for your quick reply.', es: 'Estimada Sra. Lee: gracias por su pronta respuesta.' },
            { en: 'Thank you for your quick reply. That solves my problem.', es: 'Gracias por su pronta respuesta. Eso resuelve mi problema.' },
            { en: 'Hi Sam, thank you for your quick reply. See you Monday!', es: 'Hola, Sam: gracias por tu pronta respuesta. ¡Nos vemos el lunes!' },
          ],
          alt: ['Thanks for your quick reply.', 'Thank you for your prompt reply.'],
        },
      ],
    },
    {
      title: 'Llamadas',
      emoji: '📞',
      items: [
        {
          en: 'voicemail',
          es: 'buzón de voz',
          kind: 'word',
          examples: [
            { en: 'I left a message on your voicemail.', es: 'Te dejé un mensaje en el buzón de voz.' },
            { en: 'His phone was off, so it went straight to voicemail.', es: 'Su teléfono estaba apagado, así que me mandó directo al buzón de voz.' },
            { en: "I have three new voicemails from the dentist's office.", es: 'Tengo tres mensajes de voz nuevos del consultorio del dentista.' },
          ],
        },
        {
          en: 'extension',
          es: 'extensión (telefónica)',
          kind: 'word',
          examples: [
            { en: 'Please call me at extension 204.', es: 'Por favor, llámame a la extensión 204.' },
            { en: "What's your extension? — It's 315.", es: '¿Cuál es tu extensión? —Es la 315.' },
            { en: 'For the front desk, dial extension zero.', es: 'Para comunicarse con la recepción, marque la extensión cero.' },
          ],
        },
        {
          en: 'to dial',
          es: 'marcar (un número)',
          kind: 'word',
          examples: [
            { en: 'Dial the area code first, then the number.', es: 'Marca primero el código de área y luego el número.' },
            { en: 'In an emergency, dial 911.', es: 'En caso de emergencia, marca el 911.' },
            { en: 'I think I dialed the wrong number. Sorry!', es: 'Creo que marqué el número equivocado. ¡Perdón!' },
          ],
        },
        {
          en: "Who's calling, please?",
          es: '¿De parte de quién?',
          kind: 'phrase',
          examples: [
            { en: "Can I speak to Mr. Ruiz? — Who's calling, please?", es: '¿Puedo hablar con el Sr. Ruiz? —¿De parte de quién?' },
            { en: "Hello, Dr. Park's office. Who's calling, please?", es: 'Hola, consultorio del Dr. Park. ¿De parte de quién?' },
            { en: "Who's calling, please? — It's Laura from the bank.", es: '¿De parte de quién? —Habla Laura, del banco.' },
          ],
          alt: ['May I ask who is calling?'],
          note: 'Para identificarte al teléfono se dice "This is Ana", no "I am Ana".',
        },
        {
          en: 'Can I take a message?',
          es: '¿Quiere dejar un mensaje?',
          kind: 'phrase',
          examples: [
            { en: "She's in a meeting right now. Can I take a message?", es: 'Ella está en una reunión ahora. ¿Quiere dejar un mensaje?' },
            { en: "Sorry, he's not home. Can I take a message?", es: 'Lo siento, él no está en casa. ¿Quiere dejar un mensaje?' },
            { en: 'Can I take a message? — Yes, ask her to call me.', es: '¿Quiere dejar un mensaje? —Sí, dígale que me llame.' },
          ],
          alt: ['Would you like to leave a message?', 'May I take a message?'],
        },
      ],
    },
    {
      title: 'Entrevista de trabajo',
      emoji: '🤝',
      items: [
        {
          en: 'résumé',
          es: 'currículum',
          kind: 'word',
          examples: [
            { en: 'Please send your résumé before Friday.', es: 'Por favor, envíe su currículum antes del viernes.' },
            { en: 'I updated my résumé with my new job.', es: 'Actualicé mi currículum con mi nuevo trabajo.' },
            { en: 'Keep your résumé short, clear, and easy to read.', es: 'Mantén tu currículum breve, claro y fácil de leer.' },
          ],
          alt: ['resume', 'CV'],
          note: 'En EE. UU. se dice "résumé"; en el Reino Unido, "CV".',
        },
        {
          en: 'salary',
          es: 'salario',
          kind: 'word',
          examples: [
            { en: 'The salary is good, but the hours are long.', es: 'El salario es bueno, pero las jornadas son largas.' },
            { en: 'She asked for a higher salary at her new job.', es: 'Pidió un salario más alto en su nuevo trabajo.' },
            { en: "What's the starting salary for this position?", es: '¿Cuál es el salario inicial para este puesto?' },
          ],
        },
        {
          en: 'to hire',
          es: 'contratar',
          kind: 'word',
          examples: [
            { en: 'The company is hiring two new designers.', es: 'La empresa está contratando a dos diseñadores nuevos.' },
            { en: 'We hired a plumber to fix the kitchen sink.', es: 'Contratamos a un plomero para arreglar el fregadero de la cocina.' },
            { en: 'Were you hired right after the interview?', es: '¿Te contrataron justo después de la entrevista?' },
          ],
          note: 'Lo contrario es "to fire" (despedir).',
        },
        {
          en: 'Tell me about yourself.',
          es: 'Hábleme de usted.',
          kind: 'phrase',
          examples: [
            { en: 'Good morning. Please sit down and tell me about yourself.', es: 'Buenos días. Siéntese, por favor, y hábleme de usted.' },
            { en: 'So, tell me about yourself. Where did you grow up?', es: 'A ver, háblame de ti. ¿Dónde creciste?' },
            { en: 'Tell me about yourself. Why do you want this job?', es: 'Hábleme de usted. ¿Por qué quiere este trabajo?' },
          ],
          note: 'Pregunta clásica de entrevista: resume tu experiencia y estudios en un minuto.',
        },
        {
          en: "I'm a fast learner.",
          es: 'Aprendo rápido.',
          kind: 'phrase',
          examples: [
            { en: "I don't have much experience, but I'm a fast learner.", es: 'No tengo mucha experiencia, pero aprendo rápido.' },
            { en: "I'm a fast learner, so I can start right away.", es: 'Aprendo rápido, así que puedo empezar de inmediato.' },
            { en: "Don't worry about the new software. I'm a fast learner.", es: 'No te preocupes por el nuevo programa. Aprendo rápido.' },
          ],
          alt: ['I learn quickly.', 'I learn fast.'],
        },
      ],
    },
    {
      title: 'En clase',
      emoji: '🎓',
      items: [
        {
          en: 'homework',
          es: 'tarea',
          kind: 'word',
          examples: [
            { en: 'We have a lot of homework for tomorrow.', es: 'Tenemos mucha tarea para mañana.' },
            { en: 'Did you finish your homework before dinner?', es: '¿Terminaste la tarea antes de la cena?' },
            { en: "The teacher didn't give us any homework this weekend.", es: 'El maestro no nos dejó tarea este fin de semana.' },
          ],
          note: 'Es incontable y se usa con "do": "do your homework", nunca "homeworks".',
        },
        {
          en: 'classmate',
          es: 'compañero de clase',
          kind: 'word',
          examples: [
            { en: 'My classmate helped me with the project.', es: 'Mi compañero de clase me ayudó con el proyecto.' },
            { en: "I'm meeting some old classmates for coffee on Saturday.", es: 'El sábado voy a tomar café con unos antiguos compañeros de clase.' },
            { en: 'If you miss a class, ask a classmate for the notes.', es: 'Si faltas a clase, pídele los apuntes a un compañero.' },
          ],
        },
        {
          en: 'grade',
          es: 'calificación',
          kind: 'word',
          examples: [
            { en: 'She got a good grade on her math test.', es: 'Sacó una buena calificación en su examen de matemáticas.' },
            { en: 'What grade did you get on your essay?', es: '¿Qué calificación sacaste en tu ensayo?' },
            { en: 'You need good grades to get that scholarship.', es: 'Necesitas buenas calificaciones para obtener esa beca.' },
          ],
          alt: ['mark'],
          note: '"Grade" también es el año escolar: "She\'s in fifth grade."',
        },
        {
          en: 'I passed the exam!',
          es: '¡Aprobé el examen!',
          kind: 'phrase',
          examples: [
            { en: 'Great news, Mom! I passed the exam!', es: '¡Buenas noticias, mamá! ¡Aprobé el examen!' },
            { en: 'I studied all week, and I passed the exam!', es: 'Estudié toda la semana, ¡y aprobé el examen!' },
            { en: 'You look happy! What happened? — I passed the exam!', es: '¡Te ves contento! ¿Qué pasó? —¡Aprobé el examen!' },
          ],
          alt: ['I passed the test!'],
          note: 'Falso amigo: "to pass" es aprobar. Reprobar es "to fail".',
        },
        {
          en: 'Work in pairs, please.',
          es: 'Trabajen en parejas, por favor.',
          kind: 'phrase',
          examples: [
            { en: 'Open your books to page 20 and work in pairs, please.', es: 'Abran sus libros en la página 20 y trabajen en parejas, por favor.' },
            { en: 'For this activity, work in pairs, please.', es: 'Para esta actividad, trabajen en parejas, por favor.' },
            { en: 'Welcome to the cooking class. Work in pairs, please.', es: 'Bienvenidos a la clase de cocina. Trabajen en parejas, por favor.' },
          ],
        },
      ],
    },
    {
      title: 'Tecnología',
      emoji: '💻',
      items: [
        {
          en: 'password',
          es: 'contraseña',
          kind: 'word',
          examples: [
            { en: 'Never share your password with anyone.', es: 'Nunca compartas tu contraseña con nadie.' },
            { en: 'I forgot my password, so I had to reset it.', es: 'Olvidé mi contraseña, así que tuve que restablecerla.' },
            { en: "What's the Wi-Fi password? — It's on the fridge.", es: '¿Cuál es la contraseña del wifi? —Está en el refrigerador.' },
          ],
        },
        {
          en: 'to download',
          es: 'descargar',
          kind: 'word',
          examples: [
            { en: 'You can download the app for free.', es: 'Puedes descargar la aplicación gratis.' },
            { en: "The file is still downloading. It's really big.", es: 'El archivo todavía se está descargando. Es muy grande.' },
            { en: 'I downloaded a few movies for the long flight.', es: 'Descargué unas películas para el vuelo largo.' },
          ],
          note: 'Lo contrario es "to upload" (subir un archivo).',
        },
        {
          en: 'to log in',
          es: 'iniciar sesión',
          kind: 'word',
          examples: [
            { en: "I can't log in to my work account.", es: 'No puedo iniciar sesión en mi cuenta del trabajo.' },
            { en: 'Log in with your email address and password.', es: 'Inicia sesión con tu correo electrónico y tu contraseña.' },
            { en: 'Students log in to the website to see their grades.', es: 'Los estudiantes inician sesión en el sitio web para ver sus calificaciones.' },
          ],
          alt: ['to sign in'],
          note: 'Para cerrar sesión se dice "to log out".',
        },
        {
          en: 'My computer froze.',
          es: 'Se me congeló la computadora.',
          kind: 'phrase',
          examples: [
            { en: 'My computer froze and I lost my work.', es: 'Se me congeló la computadora y perdí mi trabajo.' },
            { en: 'Sorry, I missed your message. My computer froze again.', es: 'Perdón, no vi tu mensaje. Se me congeló la computadora otra vez.' },
            { en: 'Can you hear me now? My computer froze during the call.', es: '¿Ya me escuchas? Se me congeló la computadora durante la llamada.' },
          ],
          note: '"Froze" es el pasado irregular de "freeze" (congelarse).',
        },
        {
          en: 'Have you tried restarting it?',
          es: '¿Ya intentaste reiniciarlo?',
          kind: 'phrase',
          examples: [
            { en: 'My phone is really slow. — Have you tried restarting it?', es: 'Mi teléfono está muy lento. —¿Ya intentaste reiniciarlo?' },
            { en: "The Wi-Fi isn't working. — Have you tried restarting it?", es: 'El wifi no funciona. —¿Ya intentaste reiniciarlo?' },
            { en: 'Before you call tech support, have you tried restarting it?', es: 'Antes de llamar a soporte técnico, ¿ya intentaste reiniciarlo?' },
          ],
        },
      ],
    },
    {
      title: 'Proyectos y plazos',
      emoji: '📅',
      items: [
        {
          en: 'deadline',
          es: 'fecha límite',
          kind: 'word',
          examples: [
            { en: 'The deadline for the project is next Friday.', es: 'La fecha límite del proyecto es el próximo viernes.' },
            { en: 'Can we extend the deadline by one week?', es: '¿Podemos extender la fecha límite una semana?' },
            { en: 'The deadline to apply for the program is March 1st.', es: 'La fecha límite para postularse al programa es el 1 de marzo.' },
          ],
        },
        {
          en: 'budget',
          es: 'presupuesto',
          kind: 'word',
          examples: [
            { en: 'We need to stay within the budget.', es: 'Necesitamos mantenernos dentro del presupuesto.' },
            { en: 'Our vacation budget is about two thousand dollars.', es: 'Nuestro presupuesto para las vacaciones es de unos dos mil dólares.' },
            { en: 'The school cut its budget for art classes.', es: 'La escuela recortó su presupuesto para las clases de arte.' },
          ],
        },
        {
          en: 'to postpone',
          es: 'posponer',
          kind: 'word',
          examples: [
            { en: 'They postponed the launch until March.', es: 'Pospusieron el lanzamiento hasta marzo.' },
            { en: 'The game was postponed because of the rain.', es: 'El partido se pospuso por la lluvia.' },
            { en: 'Can we postpone our meeting until tomorrow afternoon?', es: '¿Podemos posponer nuestra reunión hasta mañana por la tarde?' },
          ],
        },
        {
          en: "We're behind schedule.",
          es: 'Vamos atrasados con el cronograma.',
          kind: 'phrase',
          examples: [
            { en: "We're behind schedule, so we need to work faster.", es: 'Vamos atrasados con el cronograma, así que debemos trabajar más rápido.' },
            { en: "The house won't be ready in May. We're behind schedule.", es: 'La casa no estará lista en mayo. Vamos atrasados con el cronograma.' },
            { en: "We're behind schedule. Can you stay late tonight?", es: 'Vamos atrasados con el cronograma. ¿Puedes quedarte hasta tarde hoy?' },
          ],
          note: 'Lo contrario es "We\'re ahead of schedule" (vamos adelantados).',
        },
        {
          en: "I'll have it ready by Monday.",
          es: 'Lo tendré listo para el lunes.',
          kind: 'phrase',
          examples: [
            { en: "Don't worry about the report. I'll have it ready by Monday.", es: 'No te preocupes por el informe. Lo tendré listo para el lunes.' },
            { en: "Is the presentation done? — I'll have it ready by Monday.", es: '¿Ya está lista la presentación? —La tendré lista para el lunes.' },
            { en: "Your car needs a new part. I'll have it ready by Monday.", es: 'Su auto necesita una pieza nueva. Lo tendré listo para el lunes.' },
          ],
          note: '"By" + fecha indica el límite: "a más tardar el lunes".',
        },
      ],
    },
    {
      title: 'Opiniones en el trabajo',
      emoji: '💡',
      items: [
        {
          en: 'feedback',
          es: 'retroalimentación',
          kind: 'word',
          examples: [
            { en: 'Thanks for your feedback on my presentation.', es: 'Gracias por tu retroalimentación sobre mi presentación.' },
            { en: 'Customer feedback helps us improve our service.', es: 'Los comentarios de los clientes nos ayudan a mejorar nuestro servicio.' },
            { en: 'My teacher gave me some useful feedback on my essay.', es: 'Mi maestra me hizo comentarios útiles sobre mi ensayo.' },
          ],
          note: 'Es incontable: "some feedback", no "a feedback". También se traduce como "comentarios".',
        },
        {
          en: 'proposal',
          es: 'propuesta',
          kind: 'word',
          examples: [
            { en: 'The manager approved our proposal for the new website.', es: 'El gerente aprobó nuestra propuesta para el nuevo sitio web.' },
            { en: 'Please send us your proposal by the end of the month.', es: 'Por favor, envíenos su propuesta antes de fin de mes.' },
            { en: "They rejected my proposal, but I'll try again.", es: 'Rechazaron mi propuesta, pero lo intentaré de nuevo.' },
          ],
        },
        {
          en: 'approach',
          es: 'enfoque',
          kind: 'word',
          examples: [
            { en: 'I think we need a different approach.', es: 'Creo que necesitamos un enfoque diferente.' },
            { en: 'Her approach to teaching kids is very creative.', es: 'Su enfoque para enseñar a los niños es muy creativo.' },
            { en: "Let's try a new approach to saving money this year.", es: 'Probemos un nuevo enfoque para ahorrar dinero este año.' },
          ],
        },
        {
          en: 'Could I make a suggestion?',
          es: '¿Puedo hacer una sugerencia?',
          kind: 'phrase',
          examples: [
            { en: "Could I make a suggestion? Let's ask the client first.", es: '¿Puedo hacer una sugerencia? Preguntemos primero al cliente.' },
            { en: 'Could I make a suggestion? Maybe we could meet online instead.', es: '¿Puedo hacer una sugerencia? Tal vez podríamos reunirnos en línea.' },
            { en: 'That dress is nice, but could I make a suggestion?', es: 'Ese vestido es lindo, pero ¿puedo hacer una sugerencia?' },
          ],
          alt: ['May I make a suggestion?', 'Can I make a suggestion?'],
        },
        {
          en: 'I have some concerns about this plan.',
          es: 'Tengo algunas inquietudes sobre este plan.',
          kind: 'phrase',
          examples: [
            { en: 'I have some concerns about this plan. It seems too expensive.', es: 'Tengo algunas inquietudes sobre este plan. Parece demasiado caro.' },
            { en: 'Honestly, I have some concerns about this plan. Who will pay?', es: 'Sinceramente, tengo algunas inquietudes sobre este plan. ¿Quién va a pagar?' },
            { en: 'I have some concerns about this plan, especially the short timeline.', es: 'Tengo algunas inquietudes sobre este plan, sobre todo por el plazo tan corto.' },
          ],
          note: 'Forma diplomática de mostrar dudas o desacuerdo en el trabajo.',
        },
      ],
    },
  ],
}
