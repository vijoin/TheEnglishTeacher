import type { LevelInput } from '../types'

export const level2: LevelInput = {
  id: 2,
  title: 'Mi día a día',
  subtitle: 'Habla de tu rutina, tu casa, la comida y el clima.',
  cefr: 'A1',
  emoji: '☀️',
  color: 'sky',
  lessons: [
    {
      title: 'Rutina de la mañana',
      emoji: '⏰',
      items: [
        {
          en: 'to wake up',
          es: 'despertarse',
          kind: 'word',
          examples: [
            { en: 'I wake up at six every day.', es: 'Me despierto a las seis todos los días.' },
            { en: 'My baby wakes up three times every night.', es: 'Mi bebé se despierta tres veces cada noche.' },
            { en: 'Wake up! Breakfast is ready.', es: '¡Despiértate! El desayuno está listo.' },
          ],
          note: '"To wake up" es despertarse; "to get up" es levantarse de la cama.',
        },
        {
          en: 'to get up',
          es: 'levantarse',
          kind: 'word',
          examples: [
            { en: 'On Sundays I get up at ten.', es: 'Los domingos me levanto a las diez.' },
            { en: 'I get up and make coffee.', es: 'Me levanto y preparo café.' },
            { en: "It's hard to get up on Mondays.", es: 'Cuesta levantarse los lunes.' },
          ],
        },
        {
          en: 'to have breakfast',
          es: 'desayunar',
          kind: 'word',
          examples: [
            { en: 'We have breakfast together every morning.', es: 'Desayunamos juntos todas las mañanas.' },
            { en: 'My dad has breakfast at a cafe near his work.', es: 'Mi papá desayuna en un café cerca de su trabajo.' },
            { en: 'Come on, kids! Have breakfast quickly.', es: '¡Vamos, niños! Desayunen rápido.' },
          ],
          alt: ['to eat breakfast'],
          note: 'Las comidas van con "have": have breakfast, have lunch, have dinner.',
        },
        {
          en: 'I take a shower every morning.',
          es: 'Me ducho todas las mañanas.',
          kind: 'phrase',
          examples: [
            { en: 'I take a shower every morning before work.', es: 'Me ducho todas las mañanas antes del trabajo.' },
            { en: 'Do you shower at night? — No, I take a shower every morning.', es: '¿Te duchas en la noche? —No, me ducho todas las mañanas.' },
            { en: 'I take a shower every morning, even in winter.', es: 'Me ducho todas las mañanas, incluso en invierno.' },
          ],
          alt: ['I shower every morning.'],
        },
        {
          en: 'I brush my teeth after breakfast.',
          es: 'Me cepillo los dientes después del desayuno.',
          kind: 'phrase',
          examples: [
            { en: 'I brush my teeth after breakfast, then I go to work.', es: 'Me cepillo los dientes después del desayuno y luego voy al trabajo.' },
            { en: 'My dentist is happy. I brush my teeth after breakfast.', es: 'Mi dentista está contento. Me cepillo los dientes después del desayuno.' },
            { en: 'Every day, I brush my teeth after breakfast and dinner.', es: 'Todos los días me cepillo los dientes después del desayuno y la cena.' },
          ],
          note: 'Con partes del cuerpo se usa el posesivo: "my teeth", no "the teeth".',
        },
      ],
    },
    {
      title: 'En casa',
      emoji: '🏠',
      items: [
        {
          en: 'kitchen',
          es: 'cocina',
          kind: 'word',
          examples: [
            { en: 'My mom is cooking in the kitchen.', es: 'Mi mamá está cocinando en la cocina.' },
            { en: "The kitchen is small, but it's very clean.", es: 'La cocina es pequeña, pero está muy limpia.' },
            { en: "Where are the kids? — They're in the kitchen.", es: '¿Dónde están los niños? —Están en la cocina.' },
          ],
          note: 'No confundas "kitchen" (cocina) con "chicken" (pollo).',
        },
        {
          en: 'bedroom',
          es: 'dormitorio',
          kind: 'word',
          examples: [
            { en: 'Our house has three bedrooms.', es: 'Nuestra casa tiene tres dormitorios.' },
            { en: 'My bedroom has a big window.', es: 'Mi dormitorio tiene una ventana grande.' },
            { en: 'My sister and I share a bedroom.', es: 'Mi hermana y yo compartimos un dormitorio.' },
          ],
        },
        {
          en: 'living room',
          es: 'sala',
          kind: 'word',
          examples: [
            { en: 'The sofa is in the living room.', es: 'El sofá está en la sala.' },
            { en: 'We watch movies in the living room on Fridays.', es: 'Los viernes vemos películas en la sala.' },
            { en: 'Your living room is beautiful!', es: '¡Tu sala es preciosa!' },
          ],
        },
        {
          en: 'bathroom',
          es: 'baño',
          kind: 'word',
          examples: [
            { en: 'The bathroom is upstairs, next to my bedroom.', es: 'El baño está arriba, al lado de mi dormitorio.' },
            { en: 'Excuse me, where is the bathroom?', es: 'Disculpe, ¿dónde está el baño?' },
            { en: 'Wait, my brother is in the bathroom.', es: 'Espera, mi hermano está en el baño.' },
          ],
        },
        {
          en: 'Make yourself at home.',
          es: 'Siéntete como en casa.',
          kind: 'phrase',
          examples: [
            { en: 'Come in, please. Make yourself at home.', es: 'Pasa, por favor. Siéntete como en casa.' },
            { en: 'Welcome to our new apartment! Make yourself at home.', es: '¡Bienvenido a nuestro nuevo apartamento! Siéntete como en casa.' },
            { en: "There's food in the fridge. Make yourself at home.", es: 'Hay comida en el refrigerador. Siéntete como en casa.' },
          ],
        },
      ],
    },
    {
      title: 'Comida',
      emoji: '🍎',
      items: [
        {
          en: 'bread',
          es: 'pan',
          kind: 'word',
          examples: [
            { en: 'I eat bread with butter for breakfast.', es: 'Como pan con mantequilla en el desayuno.' },
            { en: 'We need bread and milk.', es: 'Necesitamos pan y leche.' },
            { en: 'This bakery makes fresh bread every morning.', es: 'Esta panadería hace pan fresco todas las mañanas.' },
          ],
        },
        {
          en: 'chicken',
          es: 'pollo',
          kind: 'word',
          examples: [
            { en: 'I love chicken with rice.', es: 'Me encanta el pollo con arroz.' },
            { en: "We have chicken soup when we're sick.", es: 'Tomamos sopa de pollo cuando estamos enfermos.' },
            { en: 'Chicken or fish? — Chicken, please.', es: '¿Pollo o pescado? —Pollo, por favor.' },
          ],
        },
        {
          en: 'vegetables',
          es: 'verduras',
          kind: 'word',
          examples: [
            { en: "My kids don't like vegetables.", es: 'A mis hijos no les gustan las verduras.' },
            { en: 'Vegetables are good for you.', es: 'Las verduras son buenas para la salud.' },
            { en: 'I buy fresh vegetables at the market.', es: 'Compro verduras frescas en el mercado.' },
          ],
          alt: ['veggies'],
        },
        {
          en: "I'm very hungry.",
          es: 'Tengo mucha hambre.',
          kind: 'phrase',
          examples: [
            { en: "I'm very hungry. Let's eat!", es: 'Tengo mucha hambre. ¡Comamos!' },
            { en: "Is lunch ready? I'm very hungry.", es: '¿Ya está el almuerzo? Tengo mucha hambre.' },
            { en: "I'm very hungry after the gym.", es: 'Tengo mucha hambre después del gimnasio.' },
          ],
          alt: ["I'm so hungry.", "I'm really hungry."],
          note: 'Se usa "to be": "I\'m hungry". Nunca "I have hunger".',
        },
        {
          en: "What's for dinner?",
          es: '¿Qué hay de cenar?',
          kind: 'phrase',
          examples: [
            { en: "Hi, Mom, I'm home! What's for dinner?", es: '¡Hola, mamá, ya llegué! ¿Qué hay de cenar?' },
            { en: "What's for dinner? — Rice and beans.", es: '¿Qué hay de cenar? —Arroz con frijoles.' },
            { en: "Honey, what's for dinner? — Let's order pizza tonight.", es: 'Amor, ¿qué hay de cenar? —Pidamos pizza esta noche.' },
          ],
        },
      ],
    },
    {
      title: 'Bebidas',
      emoji: '☕',
      items: [
        {
          en: 'water',
          es: 'agua',
          kind: 'word',
          examples: [
            { en: 'Drink more water when it is hot.', es: 'Toma más agua cuando hace calor.' },
            { en: 'Can I have a glass of water, please?', es: '¿Me da un vaso de agua, por favor?' },
            { en: 'Plants need water and sun.', es: 'Las plantas necesitan agua y sol.' },
          ],
        },
        {
          en: 'coffee',
          es: 'café',
          kind: 'word',
          examples: [
            { en: 'I drink two cups of coffee a day.', es: 'Tomo dos tazas de café al día.' },
            { en: "Let's meet for coffee on Saturday.", es: 'Veámonos el sábado para tomar un café.' },
            { en: 'This coffee is too hot!', es: '¡Este café está demasiado caliente!' },
          ],
        },
        {
          en: 'juice',
          es: 'jugo',
          kind: 'word',
          examples: [
            { en: 'My son drinks orange juice with breakfast.', es: 'Mi hijo toma jugo de naranja en el desayuno.' },
            { en: 'Apple juice, please. — Here you go.', es: 'Jugo de manzana, por favor. —Aquí tienes.' },
            { en: 'This juice has a lot of sugar.', es: 'Este jugo tiene mucha azúcar.' },
          ],
        },
        {
          en: "I'm so thirsty!",
          es: '¡Tengo mucha sed!',
          kind: 'phrase',
          examples: [
            { en: "I'm so thirsty! Is there any water?", es: '¡Tengo mucha sed! ¿Hay agua?' },
            { en: "It's very hot today. I'm so thirsty!", es: 'Hoy hace mucho calor. ¡Tengo mucha sed!' },
            { en: "After soccer practice, I'm so thirsty!", es: '¡Después del entrenamiento de fútbol tengo mucha sed!' },
          ],
          alt: ["I'm very thirsty.", "I'm really thirsty."],
        },
        {
          en: 'Would you like a cup of tea?',
          es: '¿Quieres una taza de té?',
          kind: 'phrase',
          examples: [
            { en: 'Come in! Would you like a cup of tea?', es: '¡Pasa! ¿Quieres una taza de té?' },
            { en: 'Would you like a cup of tea? — No, thanks.', es: '¿Quieres una taza de té? —No, gracias.' },
            { en: 'You look tired. Would you like a cup of tea?', es: 'Te ves cansado. ¿Quieres una taza de té?' },
          ],
          note: '"Would you like" es la forma amable de ofrecer algo; es más cortés que "Do you want".',
        },
      ],
    },
    {
      title: 'Días y meses',
      emoji: '📅',
      items: [
        {
          en: 'Monday',
          es: 'lunes',
          kind: 'word',
          examples: [
            { en: 'I work from Monday to Friday.', es: 'Trabajo de lunes a viernes.' },
            { en: 'See you on Monday!', es: '¡Nos vemos el lunes!' },
            { en: 'The store is closed on Mondays.', es: 'La tienda está cerrada los lunes.' },
          ],
          note: 'Días y meses van con mayúscula. Se dice "on Monday" (el lunes) pero "in January" (en enero).',
        },
        {
          en: 'weekend',
          es: 'fin de semana',
          kind: 'word',
          examples: [
            { en: 'I sleep late on the weekend.', es: 'Duermo hasta tarde el fin de semana.' },
            { en: 'Have a nice weekend! — You too.', es: '¡Buen fin de semana! —Igualmente.' },
            { en: 'We visit my grandparents every weekend.', es: 'Visitamos a mis abuelos todos los fines de semana.' },
          ],
        },
        {
          en: 'January',
          es: 'enero',
          kind: 'word',
          examples: [
            { en: 'The year starts in January.', es: 'El año empieza en enero.' },
            { en: "It's very cold here in January.", es: 'Aquí hace mucho frío en enero.' },
            { en: 'My birthday is on January fifth.', es: 'Mi cumpleaños es el cinco de enero.' },
          ],
        },
        {
          en: 'What day is it today?',
          es: '¿Qué día es hoy?',
          kind: 'phrase',
          examples: [
            { en: "What day is it today? — It's Wednesday.", es: '¿Qué día es hoy? —Es miércoles.' },
            { en: 'What day is it today? I need to pay the rent.', es: '¿Qué día es hoy? Tengo que pagar el alquiler.' },
            { en: 'Sorry, what day is it today? I always forget.', es: 'Perdón, ¿qué día es hoy? Siempre lo olvido.' },
          ],
          alt: ['What day is today?'],
        },
        {
          en: 'When is your birthday?',
          es: '¿Cuándo es tu cumpleaños?',
          kind: 'phrase',
          examples: [
            { en: "When is your birthday? — It's in March.", es: '¿Cuándo es tu cumpleaños? —Es en marzo.' },
            { en: 'Our class has a birthday list. When is your birthday?', es: 'Nuestra clase tiene una lista de cumpleaños. ¿Cuándo es tu cumpleaños?' },
            { en: 'When is your birthday? — Today! — Happy birthday!', es: '¿Cuándo es tu cumpleaños? —¡Hoy! —¡Feliz cumpleaños!' },
          ],
        },
      ],
    },
    {
      title: 'La hora',
      emoji: '🕒',
      items: [
        {
          en: "o'clock",
          es: 'en punto',
          kind: 'word',
          examples: [
            { en: "The movie starts at eight o'clock.", es: 'La película empieza a las ocho en punto.' },
            { en: "The bank opens at nine o'clock.", es: 'El banco abre a las nueve en punto.' },
            { en: "Come to my house at five o'clock.", es: 'Ven a mi casa a las cinco en punto.' },
          ],
        },
        {
          en: 'noon',
          es: 'mediodía',
          kind: 'word',
          examples: [
            { en: 'We have lunch at noon.', es: 'Almorzamos al mediodía.' },
            { en: 'See you tomorrow at noon.', es: 'Nos vemos mañana al mediodía.' },
            { en: 'The sun is very strong at noon.', es: 'El sol es muy fuerte al mediodía.' },
          ],
          alt: ['midday'],
        },
        {
          en: 'early',
          es: 'temprano',
          kind: 'word',
          examples: [
            { en: 'I go to bed early on Sundays.', es: 'Me acuesto temprano los domingos.' },
            { en: 'My dad gets up very early.', es: 'Mi papá se levanta muy temprano.' },
            { en: "We're early. The class starts at nine.", es: 'Llegamos temprano. La clase empieza a las nueve.' },
          ],
        },
        {
          en: 'What time is it?',
          es: '¿Qué hora es?',
          kind: 'phrase',
          examples: [
            { en: "What time is it? — It's three o'clock.", es: '¿Qué hora es? —Son las tres en punto.' },
            { en: "Excuse me, what time is it? — It's noon.", es: 'Disculpe, ¿qué hora es? —Es mediodía.' },
            { en: "What time is it? I'm late for work!", es: '¿Qué hora es? ¡Llego tarde al trabajo!' },
          ],
        },
        {
          en: "It's half past seven.",
          es: 'Son las siete y media.',
          kind: 'phrase',
          examples: [
            { en: "Hurry up! It's half past seven.", es: '¡Apúrate! Son las siete y media.' },
            { en: "It's half past seven. Dinner is ready!", es: 'Son las siete y media. ¡La cena está lista!' },
            { en: "It's half past seven. The bus comes at eight.", es: 'Son las siete y media. El autobús pasa a las ocho.' },
          ],
          alt: ["It's seven thirty."],
          note: '"Half past" = y media; "a quarter past" = y cuarto; "a quarter to" = menos cuarto.',
        },
      ],
    },
    {
      title: 'El clima',
      emoji: '🌦️',
      items: [
        {
          en: 'sunny',
          es: 'soleado',
          kind: 'word',
          examples: [
            { en: "It's a sunny day, let's go to the park.", es: 'Es un día soleado, vamos al parque.' },
            { en: 'The beach is great on sunny days.', es: 'La playa es genial en los días soleados.' },
            { en: "I need my sunglasses. It's very sunny!", es: 'Necesito mis lentes de sol. ¡Está muy soleado!' },
          ],
        },
        {
          en: 'cloudy',
          es: 'nublado',
          kind: 'word',
          examples: [
            { en: "It's cloudy, but it isn't raining.", es: 'Está nublado, pero no está lloviendo.' },
            { en: "It's cloudy and cold this morning.", es: 'Esta mañana está nublado y hace frío.' },
            { en: "I don't like cloudy days.", es: 'No me gustan los días nublados.' },
          ],
        },
        {
          en: 'to rain',
          es: 'llover',
          kind: 'word',
          examples: [
            { en: 'It rains a lot in April.', es: 'Llueve mucho en abril.' },
            { en: "Take an umbrella. It's raining.", es: 'Lleva un paraguas. Está lloviendo.' },
            { en: 'Does it rain a lot in your city?', es: '¿Llueve mucho en tu ciudad?' },
          ],
        },
        {
          en: "What's the weather like today?",
          es: '¿Qué tiempo hace hoy?',
          kind: 'phrase',
          examples: [
            { en: "What's the weather like today? — It's sunny and hot.", es: '¿Qué tiempo hace hoy? —Hace sol y calor.' },
            { en: "What's the weather like today? — It's cloudy and windy.", es: '¿Qué tiempo hace hoy? —Está nublado y hace viento.' },
            { en: "Hi, Grandma! What's the weather like today?", es: '¡Hola, abuela! ¿Qué tiempo hace hoy?' },
          ],
          alt: ["How's the weather today?"],
          note: 'Error común: "How is the weather like?". Lo correcto es "What\'s the weather like?".',
        },
        {
          en: "It's very cold today.",
          es: 'Hoy hace mucho frío.',
          kind: 'phrase',
          examples: [
            { en: "It's very cold today, so I'm staying home.", es: 'Hoy hace mucho frío, así que me quedo en casa.' },
            { en: "Close the window, please. It's very cold today.", es: 'Cierra la ventana, por favor. Hoy hace mucho frío.' },
            { en: "It's very cold today. Let's have hot soup.", es: 'Hoy hace mucho frío. Tomemos una sopa caliente.' },
          ],
          note: 'Para el clima se usa "it is": "It\'s cold" = Hace frío. Nunca "It makes cold".',
        },
      ],
    },
    {
      title: 'Ropa',
      emoji: '👕',
      items: [
        {
          en: 'shirt',
          es: 'camisa',
          kind: 'word',
          examples: [
            { en: 'He wears a white shirt to work.', es: 'Él usa camisa blanca para ir al trabajo.' },
            { en: 'I like your shirt! Is it new?', es: '¡Me gusta tu camisa! ¿Es nueva?' },
            { en: 'Do you have this shirt in blue?', es: '¿Tiene esta camisa en azul?' },
          ],
        },
        {
          en: 'pants',
          es: 'pantalones',
          kind: 'word',
          examples: [
            { en: 'These pants are too long for me.', es: 'Estos pantalones me quedan demasiado largos.' },
            { en: 'Can I try on these pants?', es: '¿Puedo probarme estos pantalones?' },
            { en: 'Your pants are dirty. Change them, please.', es: 'Tus pantalones están sucios. Cámbiatelos, por favor.' },
          ],
          alt: ['trousers'],
          note: 'En EE. UU. "pants" son pantalones; en Reino Unido "pants" es ropa interior.',
        },
        {
          en: 'shoes',
          es: 'zapatos',
          kind: 'word',
          examples: [
            { en: 'I need new shoes for the party.', es: 'Necesito zapatos nuevos para la fiesta.' },
            { en: 'Take off your shoes, please.', es: 'Quítate los zapatos, por favor.' },
            { en: 'These shoes are very comfortable.', es: 'Estos zapatos son muy cómodos.' },
          ],
        },
        {
          en: 'What should I wear today?',
          es: '¿Qué me pongo hoy?',
          kind: 'phrase',
          examples: [
            { en: "It's raining. What should I wear today?", es: 'Está lloviendo. ¿Qué me pongo hoy?' },
            { en: 'I have a job interview. What should I wear today?', es: 'Tengo una entrevista de trabajo. ¿Qué me pongo hoy?' },
            { en: 'What should I wear today? — Your blue dress.', es: '¿Qué me pongo hoy? —Tu vestido azul.' },
          ],
          note: '"To wear" = llevar puesto; "to put on" = ponerse una prenda.',
        },
        {
          en: 'Put on your coat.',
          es: 'Ponte el abrigo.',
          kind: 'phrase',
          examples: [
            { en: "It's cold outside. Put on your coat!", es: 'Hace frío afuera. ¡Ponte el abrigo!' },
            { en: "Put on your coat. We're leaving now.", es: 'Ponte el abrigo. Ya nos vamos.' },
            { en: 'Kids, put on your coat and your hat.', es: 'Niños, pónganse el abrigo y el gorro.' },
          ],
        },
      ],
    },
    {
      title: 'Emociones',
      emoji: '😊',
      items: [
        {
          en: 'happy',
          es: 'feliz',
          kind: 'word',
          examples: [
            { en: "I'm happy because it's Friday!", es: '¡Estoy feliz porque es viernes!' },
            { en: 'My grandma is happy to see us.', es: 'Mi abuela está feliz de vernos.' },
            { en: 'Are you happy at your new job?', es: '¿Estás feliz en tu nuevo trabajo?' },
          ],
        },
        {
          en: 'sad',
          es: 'triste',
          kind: 'word',
          examples: [
            { en: 'She is sad because her dog is sick.', es: 'Ella está triste porque su perro está enfermo.' },
            { en: 'Why are you sad? — I miss my family.', es: '¿Por qué estás triste? —Extraño a mi familia.' },
            { en: 'This movie is very sad.', es: 'Esta película es muy triste.' },
          ],
        },
        {
          en: 'tired',
          es: 'cansado',
          kind: 'word',
          examples: [
            { en: "I'm always tired after work.", es: 'Siempre estoy cansado después del trabajo.' },
            { en: 'The baby is tired. She needs a nap.', es: 'La bebé está cansada. Necesita una siesta.' },
            { en: 'Are you tired? — Yes, I want to sleep.', es: '¿Estás cansado? —Sí, quiero dormir.' },
          ],
        },
        {
          en: 'How are you feeling today?',
          es: '¿Cómo te sientes hoy?',
          kind: 'phrase',
          examples: [
            { en: 'How are you feeling today? — Much better, thanks.', es: '¿Cómo te sientes hoy? —Mucho mejor, gracias.' },
            { en: 'Hi, Grandpa. How are you feeling today?', es: 'Hola, abuelo. ¿Cómo te sientes hoy?' },
            { en: 'How are you feeling today? — Not great. I have a cold.', es: '¿Cómo te sientes hoy? —No muy bien. Tengo un resfriado.' },
          ],
          alt: ['How do you feel today?'],
        },
        {
          en: "I'm really bored.",
          es: 'Estoy muy aburrido.',
          kind: 'phrase',
          examples: [
            { en: "There's nothing on TV. I'm really bored.", es: 'No hay nada en la tele. Estoy muy aburrido.' },
            { en: "Mom, I'm really bored. Can we go to the park?", es: 'Mamá, estoy muy aburrido. ¿Podemos ir al parque?' },
            { en: "This class is so long. I'm really bored.", es: 'Esta clase es muy larga. Estoy muy aburrido.' },
          ],
          alt: ["I'm very bored.", "I'm so bored."],
          note: 'Ojo: "I\'m bored" = estoy aburrido; "I\'m boring" = soy aburrido.',
        },
      ],
    },
    {
      title: 'Tiempo libre',
      emoji: '🎨',
      items: [
        {
          en: 'hobby',
          es: 'pasatiempo',
          kind: 'word',
          examples: [
            { en: 'My favorite hobby is painting.', es: 'Mi pasatiempo favorito es pintar.' },
            { en: 'Do you have a hobby? — Yes, I take photos.', es: '¿Tienes algún pasatiempo? —Sí, tomo fotos.' },
            { en: "My dad's hobby is fishing.", es: 'El pasatiempo de mi papá es pescar.' },
          ],
        },
        {
          en: 'to read',
          es: 'leer',
          kind: 'word',
          examples: [
            { en: 'I like to read before bed.', es: 'Me gusta leer antes de dormir.' },
            { en: 'My daughter reads a book every week.', es: 'Mi hija lee un libro cada semana.' },
            { en: 'I read the news on my phone.', es: 'Leo las noticias en mi teléfono.' },
          ],
        },
        {
          en: 'to watch TV',
          es: 'ver televisión',
          kind: 'word',
          examples: [
            { en: 'We watch TV after dinner.', es: 'Vemos televisión después de cenar.' },
            { en: 'The kids watch TV for one hour a day.', es: 'Los niños ven televisión una hora al día.' },
            { en: 'Do you watch TV in the morning? — No, never.', es: '¿Ves televisión en la mañana? —No, nunca.' },
          ],
          alt: ['to watch television'],
        },
        {
          en: 'What do you do in your free time?',
          es: '¿Qué haces en tu tiempo libre?',
          kind: 'phrase',
          examples: [
            { en: 'What do you do in your free time? — I play the guitar.', es: '¿Qué haces en tu tiempo libre? —Toco la guitarra.' },
            { en: 'Nice to meet you! What do you do in your free time?', es: '¡Mucho gusto! ¿Qué haces en tu tiempo libre?' },
            { en: 'What do you do in your free time? — I swim.', es: '¿Qué haces en tu tiempo libre? —Nado.' },
          ],
        },
        {
          en: 'I love playing soccer.',
          es: 'Me encanta jugar al fútbol.',
          kind: 'phrase',
          examples: [
            { en: 'I love playing soccer with my friends.', es: 'Me encanta jugar al fútbol con mis amigos.' },
            { en: "I love playing soccer. It's my favorite sport.", es: 'Me encanta jugar al fútbol. Es mi deporte favorito.' },
            { en: 'I love playing soccer in the park on Sundays.', es: 'Me encanta jugar al fútbol en el parque los domingos.' },
          ],
          alt: ['I love to play soccer.'],
          note: 'En EE. UU. el fútbol es "soccer"; "football" es el fútbol americano.',
        },
      ],
    },
  ],
}
