import type { LevelInput } from '../types'

export const level6: LevelInput = {
  id: 6,
  title: 'Conversación fluida',
  subtitle: 'Expresa ideas, opiniones y sentimientos con naturalidad.',
  cefr: 'B1–B2',
  emoji: '🗣️',
  color: 'indigo',
  lessons: [
    {
      title: 'Conectores',
      emoji: '🔗',
      items: [
        {
          en: 'however',
          es: 'sin embargo',
          kind: 'word',
          examples: [
            { en: 'The movie was long. However, I really enjoyed it.', es: 'La película fue larga. Sin embargo, la disfruté mucho.' },
            { en: 'The hotel was beautiful. However, the service was pretty slow.', es: 'El hotel era hermoso. Sin embargo, el servicio era bastante lento.' },
            { en: 'I studied a lot. However, I still failed the driving test.', es: 'Estudié mucho. Sin embargo, igual reprobé el examen de manejo.' },
          ],
          note: 'Suele ir al inicio de la frase y seguido de coma. En charla informal se usa más "but".',
        },
        {
          en: 'although',
          es: 'aunque',
          kind: 'word',
          examples: [
            { en: 'Although it was raining, we went for a walk.', es: 'Aunque estaba lloviendo, salimos a caminar.' },
            { en: "Although he's only sixteen, he already speaks three languages.", es: 'Aunque solo tiene dieciséis años, ya habla tres idiomas.' },
            { en: 'I enjoyed the trip, although the flight was delayed.', es: 'Disfruté el viaje, aunque el vuelo se retrasó.' },
          ],
          alt: ['though', 'even though'],
        },
        {
          en: 'unless',
          es: 'a menos que',
          kind: 'word',
          examples: [
            { en: 'I won\'t go unless you come with me.', es: 'No iré a menos que vengas conmigo.' },
            { en: "Unless we leave now, we'll miss the train.", es: 'Si no salimos ahora, vamos a perder el tren.' },
            { en: "You can't enter the building unless you have an ID.", es: 'No puedes entrar al edificio a menos que tengas una identificación.' },
          ],
          note: '"Unless" ya es negativo: "unless you come" equivale a "si no vienes".',
        },
        {
          en: 'That\'s why I called you.',
          es: 'Por eso te llamé.',
          kind: 'phrase',
          examples: [
            { en: 'I need your help. That\'s why I called you.', es: 'Necesito tu ayuda. Por eso te llamé.' },
            { en: "I heard you got the job! That's why I called you.", es: '¡Supe que conseguiste el trabajo! Por eso te llamé.' },
            { en: "Your package arrived at my house. That's why I called you.", es: 'Tu paquete llegó a mi casa. Por eso te llamé.' },
          ],
        },
        {
          en: 'On the other hand, it\'s much cheaper.',
          es: 'Por otro lado, es mucho más barato.',
          kind: 'phrase',
          examples: [
            { en: 'The bus is slow. On the other hand, it\'s much cheaper.', es: 'El autobús es lento. Por otro lado, es mucho más barato.' },
            { en: "This apartment is small. On the other hand, it's much cheaper.", es: 'Este departamento es pequeño. Por otro lado, es mucho más barato.' },
            { en: "Cooking at home takes time. On the other hand, it's much cheaper.", es: 'Cocinar en casa toma tiempo. Por otro lado, es mucho más barato.' },
          ],
        },
      ],
    },
    {
      title: 'Phrasal verbs I',
      emoji: '🧩',
      items: [
        {
          en: 'to give up',
          es: 'rendirse',
          kind: 'word',
          examples: [
            { en: 'Don\'t give up! You\'re almost there.', es: '¡No te rindas! Ya casi lo logras.' },
            { en: 'My dad gave up smoking five years ago.', es: 'Mi papá dejó de fumar hace cinco años.' },
            { en: 'I gave up trying to fix the printer myself.', es: 'Dejé de intentar arreglar la impresora yo solo.' },
          ],
          note: 'También significa dejar un hábito: "give up smoking" es dejar de fumar.',
        },
        {
          en: 'to find out',
          es: 'enterarse',
          kind: 'word',
          examples: [
            { en: 'I just found out that Ana is moving.', es: 'Me acabo de enterar de que Ana se muda.' },
            { en: 'Can you find out what time the store opens?', es: '¿Puedes averiguar a qué hora abre la tienda?' },
            { en: 'She was shocked when she found out the truth.', es: 'Se quedó impactada cuando se enteró de la verdad.' },
          ],
        },
        {
          en: 'to put off',
          es: 'posponer',
          kind: 'word',
          examples: [
            { en: 'Stop putting off your homework!', es: '¡Deja de posponer tu tarea!' },
            { en: 'We had to put off the meeting until Friday.', es: 'Tuvimos que posponer la reunión hasta el viernes.' },
            { en: 'I keep putting off going to the dentist.', es: 'Sigo aplazando la visita al dentista.' },
          ],
          alt: ['to postpone'],
        },
        {
          en: 'I\'m looking forward to it.',
          es: 'Lo espero con ansias.',
          kind: 'phrase',
          examples: [
            { en: 'Are you coming to the wedding? Yes, I\'m looking forward to it!', es: '¿Vienes a la boda? ¡Sí, lo espero con ansias!' },
            { en: "Our vacation starts next week. I'm looking forward to it.", es: 'Nuestras vacaciones empiezan la próxima semana. Lo espero con ansias.' },
            { en: "Thanks for the dinner invitation. I'm looking forward to it!", es: 'Gracias por la invitación a cenar. ¡Lo espero con ansias!' },
          ],
          note: 'Después de "look forward to" va sustantivo o -ing: "I look forward to seeing you."',
        },
        {
          en: 'We\'re running out of time.',
          es: 'Se nos está acabando el tiempo.',
          kind: 'phrase',
          examples: [
            { en: 'Hurry up! We\'re running out of time.', es: '¡Apúrate! Se nos está acabando el tiempo.' },
            { en: "Let's skip the last question. We're running out of time.", es: 'Saltemos la última pregunta. Se nos está acabando el tiempo.' },
            { en: "Mom's birthday is tomorrow. We're running out of time!", es: 'El cumpleaños de mamá es mañana. ¡Se nos está acabando el tiempo!' },
          ],
          note: '"Run out of" es quedarse sin algo: "We ran out of milk" es "Se nos acabó la leche".',
        },
      ],
    },
    {
      title: 'Phrasal verbs II',
      emoji: '🔧',
      items: [
        {
          en: 'to turn down',
          es: 'rechazar',
          kind: 'word',
          examples: [
            { en: 'She turned down the invitation to the party.', es: 'Ella rechazó la invitación a la fiesta.' },
            { en: 'He turned down a job offer in New York.', es: 'Él rechazó una oferta de trabajo en Nueva York.' },
            { en: 'The bank turned down my request for a loan.', es: 'El banco rechazó mi solicitud de préstamo.' },
          ],
          alt: ['to reject'],
        },
        {
          en: 'to show up',
          es: 'aparecer',
          kind: 'word',
          examples: [
            { en: 'He showed up two hours late.', es: 'Él apareció dos horas tarde.' },
            { en: 'Only five people showed up to the meeting.', es: 'Solo aparecieron cinco personas en la reunión.' },
            { en: "Don't worry, she always shows up when you need her.", es: 'No te preocupes, ella siempre aparece cuando la necesitas.' },
          ],
          alt: ['to turn up'],
        },
        {
          en: 'to bring up',
          es: 'sacar un tema',
          kind: 'word',
          examples: [
            { en: 'Please don\'t bring up politics at dinner.', es: 'Por favor, no saques el tema de la política en la cena.' },
            { en: "I'll bring up the problem at tomorrow's meeting.", es: 'Mencionaré el problema en la reunión de mañana.' },
            { en: 'Why did you bring up my ex in front of everyone?', es: '¿Por qué sacaste el tema de mi ex delante de todos?' },
          ],
        },
        {
          en: 'She came up with a great idea.',
          es: 'Se le ocurrió una gran idea.',
          kind: 'phrase',
          examples: [
            { en: 'Ana came up with a great idea for the party.', es: 'A Ana se le ocurrió una gran idea para la fiesta.' },
            { en: 'Our teacher came up with a great idea for the project.', es: 'A nuestra maestra se le ocurrió una gran idea para el proyecto.' },
            { en: 'My boss came up with a great idea to save money.', es: 'A mi jefe se le ocurrió una gran idea para ahorrar dinero.' },
          ],
          note: '"Come up with" significa idear o inventar algo, como un plan o una solución.',
        },
        {
          en: 'We get along really well.',
          es: 'Nos llevamos muy bien.',
          kind: 'phrase',
          examples: [
            { en: 'Do you like your roommate? Yes, we get along really well.', es: '¿Te cae bien tu compañero de cuarto? Sí, nos llevamos muy bien.' },
            { en: 'My sister and I fight sometimes, but we get along really well.', es: 'Mi hermana y yo a veces peleamos, pero nos llevamos muy bien.' },
            { en: 'My in-laws are great. We get along really well.', es: 'Mis suegros son geniales. Nos llevamos muy bien.' },
          ],
        },
      ],
    },
    {
      title: 'Dar opiniones',
      emoji: '💭',
      items: [
        {
          en: 'personally',
          es: 'personalmente',
          kind: 'word',
          examples: [
            { en: 'Personally, I prefer the book to the movie.', es: 'Personalmente, prefiero el libro a la película.' },
            { en: 'Personally, I think working from home is better.', es: 'Personalmente, creo que trabajar desde casa es mejor.' },
            { en: "I don't know him personally, but he seems nice.", es: 'No lo conozco personalmente, pero parece amable.' },
          ],
        },
        {
          en: 'overrated',
          es: 'sobrevalorado',
          kind: 'word',
          examples: [
            { en: 'I think that restaurant is totally overrated.', es: 'Creo que ese restaurante está totalmente sobrevalorado.' },
            { en: 'Honestly, I think that famous TV show is overrated.', es: 'Sinceramente, creo que esa serie famosa está sobrevalorada.' },
            { en: 'Some people say coffee is overrated, but I need it.', es: 'Algunos dicen que el café está sobrevalorado, pero yo lo necesito.' },
          ],
          note: 'Lo contrario es "underrated": infravalorado, mejor de lo que la gente cree.',
        },
        {
          en: 'point of view',
          es: 'punto de vista',
          kind: 'word',
          examples: [
            { en: 'I understand your point of view.', es: 'Entiendo tu punto de vista.' },
            { en: 'From my point of view, the plan is too risky.', es: 'Desde mi punto de vista, el plan es demasiado arriesgado.' },
            { en: "Try to see it from your mom's point of view.", es: 'Intenta verlo desde el punto de vista de tu mamá.' },
          ],
          alt: ['viewpoint'],
        },
        {
          en: 'If you ask me, it\'s a bad idea.',
          es: 'Si me preguntas, es una mala idea.',
          kind: 'phrase',
          examples: [
            { en: 'Moving to Alaska? If you ask me, it\'s a bad idea.', es: '¿Mudarte a Alaska? Si me preguntas, es una mala idea.' },
            { en: "Quitting your job now? If you ask me, it's a bad idea.", es: '¿Renunciar a tu trabajo ahora? Si me preguntas, es una mala idea.' },
            { en: "If you ask me, it's a bad idea to lend him money.", es: 'Si me preguntas, es mala idea prestarle dinero.' },
          ],
        },
        {
          en: 'I feel like it\'s too long.',
          es: 'Siento que es demasiado largo.',
          kind: 'phrase',
          examples: [
            { en: 'The movie is good, but I feel like it\'s too long.', es: 'La película es buena, pero siento que es demasiado larga.' },
            { en: "I like the dress, but I feel like it's too long.", es: 'Me gusta el vestido, pero siento que es demasiado largo.' },
            { en: "Should I cut my essay? I feel like it's too long.", es: '¿Debería recortar mi ensayo? Siento que es demasiado largo.' },
          ],
          note: '"I feel like" + frase = me parece que. "I feel like" + -ing = tengo ganas de.',
        },
      ],
    },
    {
      title: 'Acuerdo y desacuerdo',
      emoji: '🤝',
      items: [
        {
          en: 'actually',
          es: 'en realidad',
          kind: 'word',
          examples: [
            { en: 'Actually, I don\'t agree with you.', es: 'En realidad, no estoy de acuerdo contigo.' },
            { en: "She looks young, but she's actually forty-five.", es: 'Parece joven, pero en realidad tiene cuarenta y cinco años.' },
            { en: 'Is this seat free? — Actually, my friend is sitting here.', es: '¿Está libre este asiento? —En realidad, aquí está sentado mi amigo.' },
          ],
          note: '¡Falso amigo! No significa "actualmente" (eso es "currently"). Sirve para corregir con suavidad.',
        },
        {
          en: 'exactly',
          es: 'exactamente',
          kind: 'word',
          examples: [
            { en: 'So we need more time? Exactly!', es: '¿Entonces necesitamos más tiempo? ¡Exactamente!' },
            { en: 'The train leaves at exactly 7:15.', es: 'El tren sale exactamente a las 7:15.' },
            { en: "That's exactly what I was going to say!", es: '¡Eso es exactamente lo que iba a decir!' },
          ],
          alt: ['precisely'],
        },
        {
          en: 'I couldn\'t agree more.',
          es: 'Estoy totalmente de acuerdo.',
          kind: 'phrase',
          examples: [
            { en: 'This city needs more parks. I couldn\'t agree more.', es: 'Esta ciudad necesita más parques. Estoy totalmente de acuerdo.' },
            { en: "Our team needs a long vacation. — I couldn't agree more!", es: 'Nuestro equipo necesita unas largas vacaciones. —¡Estoy totalmente de acuerdo!' },
            { en: "I couldn't agree more with what you said in the meeting.", es: 'Estoy totalmente de acuerdo con lo que dijiste en la reunión.' },
          ],
          alt: ['I totally agree.', 'I completely agree.'],
          note: 'Aunque suena negativo, expresa acuerdo total: no podría estar más de acuerdo.',
        },
        {
          en: 'I\'m not so sure about that.',
          es: 'No estoy tan seguro de eso.',
          kind: 'phrase',
          examples: [
            { en: 'He\'s the best player ever. Hmm, I\'m not so sure about that.', es: 'Es el mejor jugador de la historia. Mmm, no estoy tan seguro de eso.' },
            { en: "This shortcut will save us time. — I'm not so sure about that.", es: 'Este atajo nos va a ahorrar tiempo. —No estoy tan seguro de eso.' },
            { en: "You say it's cheaper online, but I'm not so sure about that.", es: 'Dices que es más barato en línea, pero no estoy tan seguro de eso.' },
          ],
        },
        {
          en: 'Let\'s agree to disagree.',
          es: 'Aceptemos que pensamos distinto.',
          kind: 'phrase',
          examples: [
            { en: 'We\'ll never agree on this. Let\'s agree to disagree.', es: 'Nunca coincidiremos en esto. Aceptemos que pensamos distinto.' },
            { en: "You love winter and I hate it. Let's agree to disagree.", es: 'A ti te encanta el invierno y yo lo odio. Aceptemos que pensamos distinto.' },
            { en: "Okay, let's agree to disagree and order the pizza.", es: 'Bueno, aceptemos que pensamos distinto y pidamos la pizza.' },
          ],
        },
      ],
    },
    {
      title: 'Sentimientos',
      emoji: '💗',
      items: [
        {
          en: 'thrilled',
          es: 'emocionadísimo',
          kind: 'word',
          examples: [
            { en: 'I\'m thrilled about my new job!', es: '¡Estoy emocionadísimo con mi nuevo trabajo!' },
            { en: 'My parents were thrilled when I told them the news.', es: 'Mis papás estaban emocionadísimos cuando les di la noticia.' },
            { en: 'The kids are thrilled to go to the beach this weekend.', es: 'Los niños están emocionadísimos por ir a la playa este fin de semana.' },
          ],
          note: 'Es mucho más intenso que "happy" o "excited".',
        },
        {
          en: 'overwhelmed',
          es: 'abrumado',
          kind: 'word',
          examples: [
            { en: 'I feel overwhelmed with so much to do.', es: 'Me siento abrumado con tantas cosas por hacer.' },
            { en: 'New parents often feel overwhelmed at first.', es: 'Los padres primerizos suelen sentirse abrumados al principio.' },
            { en: 'She was overwhelmed by all the kind messages.', es: 'Estaba abrumada por todos los mensajes cariñosos.' },
          ],
        },
        {
          en: 'embarrassed',
          es: 'avergonzado',
          kind: 'word',
          examples: [
            { en: 'I was so embarrassed when I fell in the street.', es: 'Me dio muchísima vergüenza cuando me caí en la calle.' },
            { en: "Don't be embarrassed. Everyone makes mistakes.", es: 'No te avergüences. Todos cometemos errores.' },
            { en: 'He got embarrassed when he forgot her name.', es: 'Se avergonzó cuando olvidó cómo se llamaba ella.' },
          ],
          note: '¡Falso amigo! "Embarazada" en inglés se dice "pregnant".',
        },
        {
          en: 'I\'m fed up with this.',
          es: 'Estoy harto de esto.',
          kind: 'phrase',
          examples: [
            { en: 'The neighbors are loud again. I\'m fed up with this!', es: 'Los vecinos hacen ruido otra vez. ¡Estoy harto de esto!' },
            { en: "My computer crashed again. I'm fed up with this!", es: 'Mi computadora falló otra vez. ¡Estoy harto de esto!' },
            { en: "Three hours of traffic every day? I'm fed up with this.", es: '¿Tres horas de tráfico todos los días? Estoy harto de esto.' },
          ],
          alt: ['I\'m sick of this.'],
        },
        {
          en: 'What a relief!',
          es: '¡Qué alivio!',
          kind: 'phrase',
          examples: [
            { en: 'We found your dog. What a relief!', es: 'Encontramos a tu perro. ¡Qué alivio!' },
            { en: 'The test was canceled? What a relief!', es: '¿Se canceló el examen? ¡Qué alivio!' },
            { en: "What a relief! The doctor says it's nothing serious.", es: '¡Qué alivio! El doctor dice que no es nada grave.' },
          ],
        },
      ],
    },
    {
      title: 'Modismos',
      emoji: '🍰',
      items: [
        {
          en: 'It\'s a piece of cake.',
          es: 'Es pan comido.',
          kind: 'phrase',
          examples: [
            { en: 'Is the exam hard? No, it\'s a piece of cake.', es: '¿El examen es difícil? No, es pan comido.' },
            { en: "Can you install this app? — Sure, it's a piece of cake.", es: '¿Puedes instalar esta aplicación? —Claro, es pan comido.' },
            { en: "Don't worry about the recipe. It's a piece of cake.", es: 'No te preocupes por la receta. Es pan comido.' },
          ],
        },
        {
          en: 'It costs an arm and a leg.',
          es: 'Cuesta un ojo de la cara.',
          kind: 'phrase',
          examples: [
            { en: 'I love that car, but it costs an arm and a leg.', es: 'Me encanta ese auto, pero cuesta un ojo de la cara.' },
            { en: 'A trip to Hawaii? It costs an arm and a leg!', es: '¿Un viaje a Hawái? ¡Cuesta un ojo de la cara!' },
            { en: "Don't eat at the airport. It costs an arm and a leg.", es: 'No comas en el aeropuerto. Cuesta un ojo de la cara.' },
          ],
        },
        {
          en: 'Speak of the devil!',
          es: '¡Hablando del rey de Roma!',
          kind: 'phrase',
          examples: [
            { en: 'Speak of the devil! We were just talking about you.', es: '¡Hablando del rey de Roma! Justo estábamos hablando de ti.' },
            { en: "Where's Tom today? Oh, speak of the devil! Here he comes.", es: '¿Dónde está Tom hoy? ¡Ay, hablando del rey de Roma! Ahí viene.' },
            { en: 'Speak of the devil! Your sister just texted me.', es: '¡Hablando del rey de Roma! Tu hermana me acaba de escribir.' },
          ],
          note: 'Se dice cuando aparece justo la persona de la que estabas hablando.',
        },
        {
          en: 'My lips are sealed.',
          es: 'Soy una tumba.',
          kind: 'phrase',
          examples: [
            { en: 'Don\'t tell anyone, okay? Don\'t worry, my lips are sealed.', es: 'No le digas a nadie, ¿sí? Tranquilo, soy una tumba.' },
            { en: "Who's the surprise party for? — Sorry, my lips are sealed.", es: '¿Para quién es la fiesta sorpresa? —Lo siento, soy una tumba.' },
            { en: 'I know how the book ends, but my lips are sealed.', es: 'Sé cómo termina el libro, pero soy una tumba.' },
          ],
        },
        {
          en: 'I\'m feeling under the weather.',
          es: 'Me siento un poco indispuesto.',
          kind: 'phrase',
          examples: [
            { en: 'I\'m staying home today. I\'m feeling under the weather.', es: 'Hoy me quedo en casa. Me siento un poco indispuesto.' },
            { en: "Can we meet tomorrow instead? I'm feeling under the weather.", es: '¿Podemos vernos mañana mejor? Me siento un poco indispuesto.' },
            { en: "I'm feeling under the weather, so I'll skip the gym.", es: 'Me siento un poco indispuesto, así que no iré al gimnasio.' },
          ],
          note: 'No tiene que ver con el clima: significa sentirse un poco enfermo.',
        },
      ],
    },
    {
      title: 'Charla casual',
      emoji: '☕',
      items: [
        {
          en: 'small talk',
          es: 'charla casual',
          kind: 'word',
          examples: [
            { en: 'I\'m not very good at small talk.', es: 'No soy muy bueno para la charla casual.' },
            { en: 'We made small talk about the weather in the elevator.', es: 'Tuvimos una charla casual sobre el clima en el elevador.' },
            { en: "Let's skip the small talk and get to the point.", es: 'Dejemos la charla casual y vayamos al grano.' },
          ],
          note: 'Conversación ligera sobre temas como el clima o el fin de semana.',
        },
        {
          en: 'to catch up',
          es: 'ponerse al día',
          kind: 'word',
          examples: [
            { en: 'Let\'s get coffee and catch up!', es: '¡Tomemos un café y pongámonos al día!' },
            { en: 'I missed a week of class, so I need to catch up.', es: 'Falté una semana a clases, así que tengo que ponerme al día.' },
            { en: 'We spent hours catching up after ten years apart.', es: 'Pasamos horas poniéndonos al día después de diez años sin vernos.' },
          ],
        },
        {
          en: 'to run into',
          es: 'encontrarse por casualidad',
          kind: 'word',
          examples: [
            { en: 'I ran into my old teacher at the mall.', es: 'Me encontré por casualidad con mi antiguo profesor en el centro comercial.' },
            { en: 'Guess who I ran into at the airport yesterday!', es: '¡Adivina con quién me encontré en el aeropuerto ayer!' },
            { en: 'If you run into Laura, tell her to call me.', es: 'Si te encuentras con Laura, dile que me llame.' },
          ],
          alt: ['to bump into'],
        },
        {
          en: 'What have you been up to?',
          es: '¿Qué has hecho últimamente?',
          kind: 'phrase',
          examples: [
            { en: 'Hey, Mike! What have you been up to?', es: '¡Hola, Mike! ¿Qué has hecho últimamente?' },
            { en: "You've been so quiet lately. What have you been up to?", es: 'Has estado muy callado. ¿Qué has hecho últimamente?' },
            { en: 'So, what have you been up to since graduation?', es: 'Entonces, ¿qué has hecho desde que te graduaste?' },
          ],
          note: 'Una respuesta típica es "Not much, just working."',
        },
        {
          en: 'It was great talking to you.',
          es: 'Fue un gusto hablar contigo.',
          kind: 'phrase',
          examples: [
            { en: 'I have to go now. It was great talking to you!', es: 'Ya me tengo que ir. ¡Fue un gusto hablar contigo!' },
            { en: "It was great talking to you. Let's do this again soon!", es: 'Fue un gusto hablar contigo. ¡Repitámoslo pronto!' },
            { en: 'Thanks for the interview. It was great talking to you.', es: 'Gracias por la entrevista. Fue un gusto hablar con usted.' },
          ],
          alt: ['It was nice talking to you.'],
        },
      ],
    },
    {
      title: 'Consejos',
      emoji: '💡',
      items: [
        {
          en: 'advice',
          es: 'consejo',
          kind: 'word',
          examples: [
            { en: 'Can I give you some advice?', es: '¿Puedo darte un consejo?' },
            { en: 'My grandma always gives me great advice.', es: 'Mi abuela siempre me da muy buenos consejos.' },
            { en: "Thanks for the advice. I'll try it tomorrow.", es: 'Gracias por el consejo. Lo intentaré mañana.' },
          ],
          note: 'Es incontable: "some advice" o "a piece of advice", nunca "an advice".',
        },
        {
          en: 'should',
          es: 'debería',
          kind: 'word',
          examples: [
            { en: 'You should get more sleep.', es: 'Deberías dormir más.' },
            { en: 'Should I call her or send a text?', es: '¿Debería llamarla o mandarle un mensaje?' },
            { en: 'The package should arrive by Thursday.', es: 'El paquete debería llegar a más tardar el jueves.' },
          ],
        },
        {
          en: 'If I were you, I\'d wait.',
          es: 'Yo que tú, esperaría.',
          kind: 'phrase',
          examples: [
            { en: 'Should I buy it now? If I were you, I\'d wait.', es: '¿Lo compro ahora? Yo que tú, esperaría.' },
            { en: "Prices drop in January. If I were you, I'd wait.", es: 'Los precios bajan en enero. Yo que tú, esperaría.' },
            { en: "If I were you, I'd wait until he calms down.", es: 'Yo que tú, esperaría a que se calme.' },
          ],
          note: 'Se usa "were" con todas las personas: "If I were you".',
        },
        {
          en: 'You\'d better leave now.',
          es: 'Más vale que te vayas ya.',
          kind: 'phrase',
          examples: [
            { en: 'It\'s getting dark. You\'d better leave now.', es: 'Está oscureciendo. Más vale que te vayas ya.' },
            { en: "Your flight is at nine. You'd better leave now.", es: 'Tu vuelo es a las nueve. Más vale que te vayas ya.' },
            { en: "Visiting hours are over, sir. You'd better leave now.", es: 'El horario de visitas terminó, señor. Más vale que se vaya ya.' },
          ],
          alt: ['You had better leave now.'],
          note: '"You\'d better" viene de "you had better" y suena a advertencia.',
        },
        {
          en: 'Why don\'t you take a break?',
          es: '¿Por qué no tomas un descanso?',
          kind: 'phrase',
          examples: [
            { en: 'You look tired. Why don\'t you take a break?', es: 'Te ves cansado. ¿Por qué no tomas un descanso?' },
            { en: "You've been studying all day. Why don't you take a break?", es: 'Llevas todo el día estudiando. ¿Por qué no tomas un descanso?' },
            { en: "Why don't you take a break and come for a walk?", es: '¿Por qué no tomas un descanso y vienes a caminar?' },
          ],
        },
      ],
    },
    {
      title: 'Ganar tiempo al hablar',
      emoji: '⏳',
      items: [
        {
          en: 'well',
          es: 'pues',
          kind: 'word',
          examples: [
            { en: 'Well, I\'m not really sure.', es: 'Pues, no estoy muy seguro.' },
            { en: 'Well, what do you want to do tonight?', es: 'Pues, ¿qué quieres hacer esta noche?' },
            { en: "Did you like it? — Well, it wasn't my favorite.", es: '¿Te gustó? —Pues, no fue mi favorito.' },
          ],
          note: 'Muletilla muy común para pensar un momento antes de responder.',
        },
        {
          en: 'you know',
          es: '¿sabes?',
          kind: 'word',
          examples: [
            { en: 'It was, you know, a little weird.', es: 'Fue, ¿sabes?, un poco raro.' },
            { en: 'I was just, you know, trying to help.', es: 'Solo estaba, ¿sabes?, tratando de ayudar.' },
            { en: "You know, I've never seen the ocean.", es: '¿Sabes? Nunca he visto el mar.' },
          ],
        },
        {
          en: 'I mean',
          es: 'o sea',
          kind: 'word',
          examples: [
            { en: 'It\'s good. I mean, it\'s not perfect.', es: 'Está bien. O sea, no es perfecto.' },
            { en: "Let's meet on Tuesday. I mean, Wednesday.", es: 'Veámonos el martes. O sea, el miércoles.' },
            { en: "I mean, it's not a big deal, right?", es: 'O sea, no es para tanto, ¿no?' },
          ],
          note: 'Sirve para aclarar o corregir lo que acabas de decir.',
        },
        {
          en: 'Let me think.',
          es: 'Déjame pensar.',
          kind: 'phrase',
          examples: [
            { en: 'My favorite movie? Let me think.', es: '¿Mi película favorita? Déjame pensar.' },
            { en: 'Where did I park the car? Let me think.', es: '¿Dónde estacioné el auto? Déjame pensar.' },
            { en: 'Can you lend me fifty dollars? — Hmm, let me think.', es: '¿Me prestas cincuenta dólares? —Mmm, déjame pensar.' },
          ],
          alt: ['Let me see.'],
        },
        {
          en: 'How can I put it?',
          es: '¿Cómo lo digo?',
          kind: 'phrase',
          examples: [
            { en: 'The food was, how can I put it, interesting.', es: 'La comida estaba, ¿cómo lo digo?, interesante.' },
            { en: 'How can I put it? Your idea needs a little work.', es: '¿Cómo lo digo? A tu idea le falta pulirse un poco.' },
            { en: "He's, how can I put it, a bit of a character.", es: 'Es, ¿cómo lo digo?, todo un personaje.' },
          ],
          alt: ['How should I put it?'],
        },
      ],
    },
  ],
}
