import type { LevelInput } from '../types'

export const level1: LevelInput = {
  id: 1,
  title: 'Primeros pasos',
  subtitle: 'Saluda, preséntate y da tus primeros pasos en inglés.',
  cefr: 'A1',
  emoji: '👋',
  color: 'emerald',
  lessons: [
    {
      title: 'Saludos',
      emoji: '👋',
      items: [
        {
          en: 'hello',
          es: 'hola',
          kind: 'word',
          examples: [
            { en: 'Hello, my name is Tom.', es: 'Hola, me llamo Tom.' },
            { en: 'Hello? Is Maria there?', es: '¿Hola? ¿Está María?' },
            { en: 'The kids say hello to the teacher.', es: 'Los niños saludan a la maestra.' },
          ],
          alt: ['hi'],
        },
        {
          en: 'goodbye',
          es: 'adiós',
          kind: 'word',
          examples: [
            { en: 'Goodbye, Anna! See you later.', es: '¡Adiós, Anna! Hasta luego.' },
            { en: 'Say goodbye to Grandma, kids.', es: 'Niños, despídanse de la abuela.' },
            { en: 'Goodbye, everyone! Have a good weekend.', es: '¡Adiós a todos! Que tengan un buen fin de semana.' },
          ],
          alt: ['bye'],
        },
        {
          en: 'Good morning!',
          es: '¡Buenos días!',
          kind: 'phrase',
          examples: [
            { en: 'Good morning, Mr. Brown!', es: '¡Buenos días, señor Brown!' },
            { en: 'Good morning, everyone! Welcome to class.', es: '¡Buenos días a todos! Bienvenidos a la clase.' },
            { en: 'Good morning, Dad! Is breakfast ready?', es: '¡Buenos días, papá! ¿Ya está el desayuno?' },
          ],
        },
        {
          en: 'Good night!',
          es: '¡Buenas noches!',
          kind: 'phrase',
          examples: [
            { en: 'Good night, Mom! See you tomorrow.', es: '¡Buenas noches, mamá! Hasta mañana.' },
            { en: 'Good night, kids. Sleep well!', es: 'Buenas noches, niños. ¡Que duerman bien!' },
            { en: 'Thanks for dinner. Good night!', es: 'Gracias por la cena. ¡Buenas noches!' },
          ],
          note: 'Solo para despedirse o al ir a dormir. Para saludar de noche se dice "Good evening".',
        },
        {
          en: 'How are you?',
          es: '¿Cómo estás?',
          kind: 'phrase',
          examples: [
            { en: "How are you? I'm fine, thanks.", es: '¿Cómo estás? Estoy bien, gracias.' },
            { en: 'Hi, Maria! How are you today?', es: '¡Hola, María! ¿Cómo estás hoy?' },
            { en: 'How are you, Mrs. Garcia? — Very well, thank you.', es: '¿Cómo está, señora García? —Muy bien, gracias.' },
          ],
        },
      ],
    },
    {
      title: 'Cortesía',
      emoji: '🙏',
      items: [
        {
          en: 'please',
          es: 'por favor',
          kind: 'word',
          examples: [
            { en: 'A coffee, please.', es: 'Un café, por favor.' },
            { en: 'Can I have some water, please?', es: '¿Me da un poco de agua, por favor?' },
            { en: 'Please close the door.', es: 'Cierra la puerta, por favor.' },
          ],
        },
        {
          en: 'thank you',
          es: 'gracias',
          kind: 'word',
          examples: [
            { en: 'Thank you very much!', es: '¡Muchas gracias!' },
            { en: 'Thank you for the gift!', es: '¡Gracias por el regalo!' },
            { en: 'Here is your coffee. — Thank you!', es: 'Aquí tiene su café. —¡Gracias!' },
          ],
          alt: ['thanks'],
        },
        {
          en: 'sorry',
          es: 'lo siento',
          kind: 'word',
          examples: [
            { en: "I'm so sorry!", es: '¡Lo siento mucho!' },
            { en: "Sorry, I'm late!", es: '¡Perdón por llegar tarde!' },
            { en: 'Sorry, the store is closed today.', es: 'Lo siento, la tienda está cerrada hoy.' },
          ],
        },
        {
          en: 'Excuse me.',
          es: 'Disculpe.',
          kind: 'phrase',
          examples: [
            { en: 'Excuse me, are you Mr. Lee?', es: 'Disculpe, ¿es usted el señor Lee?' },
            { en: 'Excuse me, where is the bathroom?', es: 'Disculpe, ¿dónde está el baño?' },
            { en: 'Excuse me, is this seat free?', es: 'Disculpe, ¿este asiento está libre?' },
          ],
          note: 'Para pedir permiso o llamar la atención. Para disculparte por un error, usa "sorry".',
        },
        {
          en: "You're welcome.",
          es: 'De nada.',
          kind: 'phrase',
          examples: [
            { en: "You're welcome, Tom! Have a nice day.", es: '¡De nada, Tom! Que tengas un buen día.' },
            { en: "Thanks, Mom! — You're welcome, sweetie.", es: '¡Gracias, mamá! —De nada, cariño.' },
            { en: "You're welcome. Come back soon!", es: 'De nada. ¡Vuelva pronto!' },
          ],
        },
      ],
    },
    {
      title: 'Presentarse',
      emoji: '🙋',
      items: [
        {
          en: 'name',
          es: 'nombre',
          kind: 'word',
          examples: [
            { en: 'My name is Laura.', es: 'Mi nombre es Laura.' },
            { en: "What is your dog's name?", es: '¿Cómo se llama tu perro?' },
            { en: 'Please write your name here.', es: 'Escriba su nombre aquí, por favor.' },
          ],
        },
        {
          en: 'last name',
          es: 'apellido',
          kind: 'word',
          examples: [
            { en: 'My last name is Smith.', es: 'Mi apellido es Smith.' },
            { en: 'What is your last name?', es: '¿Cuál es tu apellido?' },
            { en: 'Can you spell your last name?', es: '¿Puede deletrear su apellido?' },
          ],
          alt: ['surname'],
        },
        {
          en: "What's your name?",
          es: '¿Cómo te llamas?',
          kind: 'phrase',
          examples: [
            { en: "Hi! What's your name? I'm Sofia.", es: '¡Hola! ¿Cómo te llamas? Soy Sofía.' },
            { en: "Hi, I'm your new neighbor. What's your name?", es: 'Hola, soy tu nuevo vecino. ¿Cómo te llamas?' },
            { en: "Good afternoon. What's your name, please?", es: 'Buenas tardes. ¿Cómo se llama, por favor?' },
          ],
        },
        {
          en: 'Nice to meet you.',
          es: 'Mucho gusto.',
          kind: 'phrase',
          examples: [
            { en: "I'm Tom. Nice to meet you.", es: 'Soy Tom. Mucho gusto.' },
            { en: 'This is my sister, Eva. — Nice to meet you!', es: 'Ella es mi hermana, Eva. —¡Mucho gusto!' },
            { en: 'Nice to meet you, Mr. Diaz. Please come in.', es: 'Mucho gusto, señor Díaz. Pase, por favor.' },
          ],
          alt: ['Pleased to meet you.'],
          note: 'Se responde con "Nice to meet you too."',
        },
        {
          en: "I'm from Mexico.",
          es: 'Soy de México.',
          kind: 'phrase',
          examples: [
            { en: "Where are you from? I'm from Mexico.", es: '¿De dónde eres? Soy de México.' },
            { en: "I'm from Mexico. My husband is from Colombia.", es: 'Soy de México. Mi esposo es de Colombia.' },
            { en: "I'm from Mexico, from Guadalajara.", es: 'Soy de México, de Guadalajara.' },
          ],
        },
      ],
    },
    {
      title: 'Números',
      emoji: '🔢',
      items: [
        {
          en: 'three',
          es: 'tres',
          kind: 'word',
          examples: [
            { en: 'I have three brothers.', es: 'Tengo tres hermanos.' },
            { en: "It's three o'clock.", es: 'Son las tres.' },
            { en: 'A table for three, please.', es: 'Una mesa para tres, por favor.' },
          ],
          note: 'La "th" se pronuncia con la punta de la lengua entre los dientes.',
        },
        {
          en: 'fifteen',
          es: 'quince',
          kind: 'word',
          examples: [
            { en: 'My sister is fifteen.', es: 'Mi hermana tiene quince años.' },
            { en: 'The bus comes in fifteen minutes.', es: 'El autobús llega en quince minutos.' },
            { en: 'This book is fifteen dollars.', es: 'Este libro cuesta quince dólares.' },
          ],
          note: 'No lo confundas con "fifty" (50). En "fifteen" la fuerza va al final: fif-TEEN.',
        },
        {
          en: 'twenty',
          es: 'veinte',
          kind: 'word',
          examples: [
            { en: 'There are twenty people here.', es: 'Hay veinte personas aquí.' },
            { en: 'My room is number twenty.', es: 'Mi habitación es la número veinte.' },
            { en: 'My cousin is twenty.', es: 'Mi primo tiene veinte años.' },
          ],
        },
        {
          en: 'How old are you?',
          es: '¿Cuántos años tienes?',
          kind: 'phrase',
          examples: [
            { en: "How old are you? I'm ten.", es: '¿Cuántos años tienes? Tengo diez.' },
            { en: "How old are you, Grandma? — I'm eighty!", es: '¿Cuántos años tienes, abuela? —¡Tengo ochenta!' },
            { en: 'Happy birthday! How old are you today?', es: '¡Feliz cumpleaños! ¿Cuántos años cumples hoy?' },
          ],
        },
        {
          en: "I'm thirty years old.",
          es: 'Tengo treinta años.',
          kind: 'phrase',
          examples: [
            { en: "Hi, I'm Ana. I'm thirty years old.", es: 'Hola, soy Ana. Tengo treinta años.' },
            { en: "I'm thirty years old and I'm a teacher.", es: 'Tengo treinta años y soy maestra.' },
            { en: "Today is my birthday. I'm thirty years old!", es: '¡Hoy es mi cumpleaños! Cumplo treinta años.' },
          ],
          alt: ["I'm thirty."],
          note: 'La edad se dice con "to be": "I am thirty", nunca "I have thirty".',
        },
      ],
    },
    {
      title: 'Colores',
      emoji: '🎨',
      items: [
        {
          en: 'red',
          es: 'rojo',
          kind: 'word',
          examples: [
            { en: 'She has a red car.', es: 'Ella tiene un auto rojo.' },
            { en: 'I like red apples.', es: 'Me gustan las manzanas rojas.' },
            { en: 'Stop! The light is red.', es: '¡Alto! El semáforo está en rojo.' },
          ],
          note: 'El color va antes del sustantivo: "a red car" (un auto rojo).',
        },
        {
          en: 'blue',
          es: 'azul',
          kind: 'word',
          examples: [
            { en: 'The sky is blue.', es: 'El cielo es azul.' },
            { en: 'He has blue eyes.', es: 'Él tiene ojos azules.' },
            { en: 'I want the blue shirt, please.', es: 'Quiero la camisa azul, por favor.' },
          ],
        },
        {
          en: 'black',
          es: 'negro',
          kind: 'word',
          examples: [
            { en: 'My cat is black.', es: 'Mi gato es negro.' },
            { en: 'I like black coffee.', es: 'Me gusta el café negro.' },
            { en: 'She has long black hair.', es: 'Ella tiene el pelo largo y negro.' },
          ],
        },
        {
          en: 'What color is it?',
          es: '¿De qué color es?',
          kind: 'phrase',
          examples: [
            { en: "What color is it? It's white.", es: '¿De qué color es? Es blanco.' },
            { en: 'Your new car? What color is it? — Blue.', es: '¿Tu auto nuevo? ¿De qué color es? —Azul.' },
            { en: 'Look at this flower. What color is it?', es: 'Mira esta flor. ¿De qué color es?' },
          ],
          alt: ['What colour is it?'],
        },
        {
          en: 'My favorite color is green.',
          es: 'Mi color favorito es el verde.',
          kind: 'phrase',
          examples: [
            { en: 'My favorite color is green. What about you?', es: 'Mi color favorito es el verde. ¿Y el tuyo?' },
            { en: 'My favorite color is green, like the trees.', es: 'Mi color favorito es el verde, como los árboles.' },
            { en: 'I love this bag! My favorite color is green.', es: '¡Me encanta esta bolsa! Mi color favorito es el verde.' },
          ],
          alt: ['My favourite colour is green.'],
        },
      ],
    },
    {
      title: 'La familia',
      emoji: '👨‍👩‍👧',
      items: [
        {
          en: 'mother',
          es: 'madre',
          kind: 'word',
          examples: [
            { en: 'My mother is from Peru.', es: 'Mi madre es de Perú.' },
            { en: 'This is my mother, Rosa.', es: 'Ella es mi madre, Rosa.' },
            { en: 'My mother makes great soup.', es: 'Mi madre hace una sopa deliciosa.' },
          ],
          alt: ['mom'],
        },
        {
          en: 'father',
          es: 'padre',
          kind: 'word',
          examples: [
            { en: 'My father is very tall.', es: 'Mi padre es muy alto.' },
            { en: 'My father works in a bank.', es: 'Mi padre trabaja en un banco.' },
            { en: 'Is your father at home?', es: '¿Tu padre está en casa?' },
          ],
          alt: ['dad'],
          note: 'Ojo: "parents" significa padres (papá y mamá), no "parientes".',
        },
        {
          en: 'brother',
          es: 'hermano',
          kind: 'word',
          examples: [
            { en: 'My brother is twelve.', es: 'Mi hermano tiene doce años.' },
            { en: 'My little brother is very funny.', es: 'Mi hermano menor es muy gracioso.' },
            { en: 'Do you have any brothers or sisters?', es: '¿Tienes hermanos o hermanas?' },
          ],
        },
        {
          en: 'I have two sisters.',
          es: 'Tengo dos hermanas.',
          kind: 'phrase',
          examples: [
            { en: 'I have two sisters and one brother.', es: 'Tengo dos hermanas y un hermano.' },
            { en: 'I have two sisters. They live in Bogota.', es: 'Tengo dos hermanas. Viven en Bogotá.' },
            { en: 'I have two sisters, but no brothers.', es: 'Tengo dos hermanas, pero no tengo hermanos.' },
          ],
        },
        {
          en: 'Do you have children?',
          es: '¿Tienes hijos?',
          kind: 'phrase',
          examples: [
            { en: 'Do you have children? Yes, two girls.', es: '¿Tienes hijos? Sí, dos niñas.' },
            { en: 'Are you married? Do you have children?', es: '¿Estás casado? ¿Tienes hijos?' },
            { en: 'Do you have children? — No, but I have a dog.', es: '¿Tienes hijos? —No, pero tengo un perro.' },
          ],
          note: '"Children" (hijos, niños) es el plural irregular de "child".',
        },
      ],
    },
    {
      title: 'Personas y pronombres',
      emoji: '👥',
      items: [
        {
          en: 'I',
          es: 'yo',
          kind: 'word',
          examples: [
            { en: 'I am Carlos.', es: 'Yo soy Carlos.' },
            { en: 'I like pizza and ice cream.', es: 'Me gusta la pizza y el helado.' },
            { en: 'I work in a hospital.', es: 'Trabajo en un hospital.' },
          ],
          note: '"I" siempre se escribe con mayúscula, incluso en medio de la oración.',
        },
        {
          en: 'you',
          es: 'tú',
          kind: 'word',
          examples: [
            { en: 'You are my friend.', es: 'Tú eres mi amigo.' },
            { en: 'Are you hungry?', es: '¿Tienes hambre?' },
            { en: 'Thank you! You are very kind.', es: '¡Gracias! Usted es muy amable.' },
          ],
          note: '"You" sirve para tú, usted y ustedes. El verbo no cambia.',
        },
        {
          en: 'we',
          es: 'nosotros',
          kind: 'word',
          examples: [
            { en: 'We are from Chile.', es: 'Nosotros somos de Chile.' },
            { en: 'We live in a small apartment.', es: 'Vivimos en un departamento pequeño.' },
            { en: 'We study English together.', es: 'Estudiamos inglés juntos.' },
          ],
        },
        {
          en: 'they',
          es: 'ellos',
          kind: 'word',
          examples: [
            { en: 'They are my parents.', es: 'Ellos son mis padres.' },
            { en: 'They live in Canada.', es: 'Ellos viven en Canadá.' },
            { en: 'Where are the kids? — They are at school.', es: '¿Dónde están los niños? —Están en la escuela.' },
          ],
          note: '"They" sirve para ellos y ellas.',
        },
        {
          en: 'He is my friend.',
          es: 'Él es mi amigo.',
          kind: 'phrase',
          examples: [
            { en: 'This is Leo. He is my friend.', es: 'Este es Leo. Él es mi amigo.' },
            { en: 'Who is that boy? — He is my friend.', es: '¿Quién es ese niño? —Es mi amigo.' },
            { en: 'He is my friend from work.', es: 'Él es mi amigo del trabajo.' },
          ],
        },
      ],
    },
    {
      title: 'Objetos cotidianos',
      emoji: '🔑',
      items: [
        {
          en: 'key',
          es: 'llave',
          kind: 'word',
          examples: [
            { en: 'I have the key.', es: 'Yo tengo la llave.' },
            { en: 'This key is for the car.', es: 'Esta llave es del auto.' },
            { en: 'Here is your room key.', es: 'Aquí tiene la llave de su habitación.' },
          ],
        },
        {
          en: 'book',
          es: 'libro',
          kind: 'word',
          examples: [
            { en: 'This book is very good.', es: 'Este libro es muy bueno.' },
            { en: 'I read a book every night.', es: 'Leo un libro todas las noches.' },
            { en: 'Open your books, please.', es: 'Abran sus libros, por favor.' },
          ],
        },
        {
          en: 'cell phone',
          es: 'celular',
          kind: 'word',
          examples: [
            { en: 'My cell phone is black.', es: 'Mi celular es negro.' },
            { en: 'What is your cell phone number?', es: '¿Cuál es tu número de celular?' },
            { en: 'Please turn off your cell phone.', es: 'Por favor, apague su celular.' },
          ],
          alt: ['cellphone', 'phone', 'mobile phone'],
        },
        {
          en: 'Is this your pen?',
          es: '¿Este es tu bolígrafo?',
          kind: 'phrase',
          examples: [
            { en: 'Excuse me, is this your pen?', es: 'Disculpe, ¿este es su bolígrafo?' },
            { en: 'Is this your pen? — Yes, thank you!', es: '¿Este es tu bolígrafo? —¡Sí, gracias!' },
            { en: "Is this your pen? It's on the floor.", es: '¿Este es tu bolígrafo? Está en el piso.' },
          ],
        },
        {
          en: 'Where are my keys?',
          es: '¿Dónde están mis llaves?',
          kind: 'phrase',
          examples: [
            { en: "Where are my keys? I can't find them.", es: '¿Dónde están mis llaves? No las encuentro.' },
            { en: 'Mom, where are my keys? — On the table.', es: 'Mamá, ¿dónde están mis llaves? —En la mesa.' },
            { en: "Oh no! Where are my keys? I'm late!", es: '¡Ay, no! ¿Dónde están mis llaves? ¡Voy tarde!' },
          ],
        },
      ],
    },
    {
      title: 'Preguntas básicas',
      emoji: '❓',
      items: [
        {
          en: 'what',
          es: 'qué',
          kind: 'word',
          examples: [
            { en: 'What is this?', es: '¿Qué es esto?' },
            { en: 'What is your favorite food?', es: '¿Cuál es tu comida favorita?' },
            { en: 'What do you want for dinner?', es: '¿Qué quieres de cenar?' },
          ],
          note: 'A veces se traduce "cuál": "What is your name?" = ¿Cuál es tu nombre?',
        },
        {
          en: 'who',
          es: 'quién',
          kind: 'word',
          examples: [
            { en: 'Who is she?', es: '¿Quién es ella?' },
            { en: 'Who is your teacher?', es: '¿Quién es tu maestro?' },
            { en: 'Who is at the door?', es: '¿Quién está en la puerta?' },
          ],
        },
        {
          en: 'why',
          es: 'por qué',
          kind: 'word',
          examples: [
            { en: 'Why are you here?', es: '¿Por qué estás aquí?' },
            { en: 'Why are you sad?', es: '¿Por qué estás triste?' },
            { en: 'Why do you study English? — Because I like it.', es: '¿Por qué estudias inglés? —Porque me gusta.' },
          ],
          note: 'Para responder "porque" se usa "because".',
        },
        {
          en: 'Where do you live?',
          es: '¿Dónde vives?',
          kind: 'phrase',
          examples: [
            { en: 'Where do you live? I live in Lima.', es: '¿Dónde vives? Vivo en Lima.' },
            { en: 'Where do you live, Mr. Gomez? — In an apartment downtown.', es: '¿Dónde vive, señor Gómez? —En un departamento en el centro.' },
            { en: 'Where do you live now, Ana?', es: '¿Dónde vives ahora, Ana?' },
          ],
        },
        {
          en: "I don't know.",
          es: 'No sé.',
          kind: 'phrase',
          examples: [
            { en: "Where is Tom? I don't know.", es: '¿Dónde está Tom? No sé.' },
            { en: "I don't know his name.", es: 'No sé cómo se llama.' },
            { en: "What time is it? — Sorry, I don't know.", es: '¿Qué hora es? —Perdón, no sé.' },
          ],
        },
      ],
    },
    {
      title: 'Comunicación básica',
      emoji: '💬',
      items: [
        {
          en: "I don't understand.",
          es: 'No entiendo.',
          kind: 'phrase',
          examples: [
            { en: "Sorry, I don't understand.", es: 'Perdón, no entiendo.' },
            { en: "I don't understand this word.", es: 'No entiendo esta palabra.' },
            { en: "I don't understand. Can you help me?", es: 'No entiendo. ¿Me puedes ayudar?' },
          ],
        },
        {
          en: 'Can you repeat that, please?',
          es: '¿Puedes repetirlo, por favor?',
          kind: 'phrase',
          examples: [
            { en: 'Sorry, can you repeat that, please?', es: 'Perdón, ¿puedes repetirlo, por favor?' },
            { en: "Can you repeat that, please? It's very noisy here.", es: '¿Puedes repetirlo, por favor? Hay mucho ruido aquí.' },
            { en: 'Can you repeat that, please? — Sure. Room twelve.', es: '¿Puede repetirlo, por favor? —Claro. Habitación doce.' },
          ],
          alt: ['Could you repeat that, please?'],
        },
        {
          en: 'Can you speak more slowly?',
          es: '¿Puedes hablar más despacio?',
          kind: 'phrase',
          examples: [
            { en: 'Can you speak more slowly, please?', es: '¿Puedes hablar más despacio, por favor?' },
            { en: "Can you speak more slowly? My English isn't very good.", es: '¿Puedes hablar más despacio? Mi inglés no es muy bueno.' },
            { en: 'Sorry, can you speak more slowly? — Of course.', es: 'Perdón, ¿puede hablar más despacio? —Claro que sí.' },
          ],
          alt: ['Could you speak more slowly?', 'Can you speak slower?'],
        },
        {
          en: 'How do you say this in English?',
          es: '¿Cómo se dice esto en inglés?',
          kind: 'phrase',
          examples: [
            { en: 'Excuse me, how do you say this in English?', es: 'Disculpe, ¿cómo se dice esto en inglés?' },
            { en: 'How do you say this in English? — "Spoon."', es: '¿Cómo se dice esto en inglés? —Se dice "spoon".' },
            { en: 'Teacher, how do you say this in English?', es: 'Maestra, ¿cómo se dice esto en inglés?' },
          ],
        },
        {
          en: 'Do you speak Spanish?',
          es: '¿Hablas español?',
          kind: 'phrase',
          examples: [
            { en: 'Do you speak Spanish? Yes, a little.', es: '¿Hablas español? Sí, un poco.' },
            { en: 'Do you speak Spanish? — No, only English.', es: '¿Hablas español? —No, solo inglés.' },
            { en: 'Excuse me, do you speak Spanish? I need help.', es: 'Disculpe, ¿habla español? Necesito ayuda.' },
          ],
          note: 'Los idiomas se escriben con mayúscula en inglés: Spanish, English.',
        },
      ],
    },
  ],
}
