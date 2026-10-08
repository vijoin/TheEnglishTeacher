import type { LevelInput } from '../types'

export const level4: LevelInput = {
  id: 4,
  title: 'De viaje',
  subtitle: 'Viaja con confianza: del aeropuerto al hotel y a la playa.',
  cefr: 'A2',
  emoji: '✈️',
  color: 'amber',
  lessons: [
    {
      title: 'En el aeropuerto',
      emoji: '🛫',
      items: [
        {
          en: 'boarding pass',
          es: 'tarjeta de embarque',
          kind: 'word',
          examples: [
            { en: 'Please have your boarding pass ready.', es: 'Por favor, tenga lista su tarjeta de embarque.' },
            { en: 'You can show your boarding pass on your phone.', es: 'Puedes mostrar tu tarjeta de embarque en el celular.' },
            { en: 'I printed our boarding passes at the hotel.', es: 'Imprimí nuestras tarjetas de embarque en el hotel.' },
          ],
        },
        {
          en: 'gate',
          es: 'puerta de embarque',
          kind: 'word',
          examples: [
            { en: 'Our flight leaves from gate 12.', es: 'Nuestro vuelo sale de la puerta 12.' },
            { en: "Our gate changed, so let's walk to B7.", es: 'Cambiaron nuestra puerta, así que caminemos a la B7.' },
            { en: 'Excuse me, is this the right gate for Chicago?', es: 'Disculpe, ¿esta es la puerta correcta para el vuelo a Chicago?' },
          ],
          alt: ['boarding gate'],
          note: '"Gate" es la puerta de embarque; la puerta de una casa o un cuarto es "door".',
        },
        {
          en: 'suitcase',
          es: 'maleta',
          kind: 'word',
          examples: [
            { en: 'My suitcase is very heavy.', es: 'Mi maleta está muy pesada.' },
            { en: 'I need to pack my suitcase tonight.', es: 'Necesito hacer la maleta esta noche.' },
            { en: 'Is this black suitcase yours?', es: '¿Esta maleta negra es tuya?' },
          ],
        },
        {
          en: 'Where is the check-in counter?',
          es: '¿Dónde está el mostrador de check-in?',
          kind: 'phrase',
          examples: [
            { en: 'Excuse me, where is the check-in counter?', es: 'Disculpe, ¿dónde está el mostrador de check-in?' },
            { en: 'Where is the check-in counter? — Over there, on the left.', es: '¿Dónde está el mostrador de check-in? —Allá, a la izquierda.' },
            { en: 'Where is the check-in counter for international flights?', es: '¿Dónde está el mostrador de check-in para vuelos internacionales?' },
          ],
        },
        {
          en: 'How many bags are you checking?',
          es: '¿Cuántas maletas va a documentar?',
          kind: 'phrase',
          examples: [
            { en: 'How many bags are you checking? — Just one.', es: '¿Cuántas maletas va a documentar? —Solo una.' },
            { en: 'Good morning. How many bags are you checking today?', es: 'Buenos días. ¿Cuántas maletas va a documentar hoy?' },
            { en: 'How many bags are you checking? — None, just a backpack.', es: '¿Cuántas maletas va a documentar? —Ninguna, solo una mochila.' },
          ],
          note: '"To check a bag" es documentar (o despachar) una maleta para que vaya en la bodega del avión.',
        },
      ],
    },
    {
      title: 'En el avión',
      emoji: '💺',
      items: [
        {
          en: 'seat belt',
          es: 'cinturón de seguridad',
          kind: 'word',
          examples: [
            { en: 'Please fasten your seat belt.', es: 'Por favor, abróchese el cinturón de seguridad.' },
            { en: 'The seat belt sign is on, so please sit down.', es: 'La señal del cinturón de seguridad está encendida; por favor, siéntese.' },
            { en: 'Put on your seat belt before I start the car.', es: 'Ponte el cinturón de seguridad antes de que arranque el auto.' },
          ],
          alt: ['seatbelt'],
        },
        {
          en: 'aisle seat',
          es: 'asiento de pasillo',
          kind: 'word',
          examples: [
            { en: 'I prefer an aisle seat on long flights.', es: 'Prefiero un asiento de pasillo en vuelos largos.' },
            { en: 'Can I change to an aisle seat, please?', es: '¿Puedo cambiarme a un asiento de pasillo, por favor?' },
            { en: 'My husband likes the window, but I take the aisle seat.', es: 'A mi esposo le gusta la ventana, pero yo tomo el asiento de pasillo.' },
          ],
          note: 'En "aisle" la "s" es muda: se pronuncia "ail". El de ventana es "window seat".',
        },
        {
          en: 'flight attendant',
          es: 'auxiliar de vuelo',
          kind: 'word',
          examples: [
            { en: 'The flight attendant brought me some water.', es: 'La auxiliar de vuelo me trajo agua.' },
            { en: 'Ask the flight attendant if you need anything.', es: 'Pregúntale al auxiliar de vuelo si necesitas algo.' },
            { en: 'My sister works as a flight attendant.', es: 'Mi hermana trabaja como auxiliar de vuelo.' },
          ],
        },
        {
          en: 'Can I have a blanket, please?',
          es: '¿Me puede dar una manta, por favor?',
          kind: 'phrase',
          examples: [
            { en: "It's cold. Can I have a blanket, please?", es: 'Hace frío. ¿Me puede dar una manta, por favor?' },
            { en: 'Can I have a blanket, please? — Sure, here you go.', es: '¿Me puede dar una manta, por favor? —Claro, aquí tiene.' },
            { en: 'Hi, this is room 305. Can I have a blanket, please?', es: 'Hola, le hablo de la habitación 305. ¿Me puede dar una manta, por favor?' },
          ],
          alt: ['Could I have a blanket, please?', 'Can I get a blanket, please?'],
        },
        {
          en: "We're about to land.",
          es: 'Estamos a punto de aterrizar.',
          kind: 'phrase',
          examples: [
            { en: "Wake up! We're about to land.", es: '¡Despierta! Estamos a punto de aterrizar.' },
            { en: "This is your captain speaking. We're about to land.", es: 'Les habla su capitán. Estamos a punto de aterrizar.' },
            { en: "I'm texting you from the plane. We're about to land.", es: 'Te escribo desde el avión. Estamos a punto de aterrizar.' },
          ],
          note: '"To land" es aterrizar y "to take off" es despegar.',
        },
      ],
    },
    {
      title: 'Migración y aduana',
      emoji: '🛂',
      items: [
        {
          en: 'passport',
          es: 'pasaporte',
          kind: 'word',
          examples: [
            { en: 'Can I see your passport, please?', es: '¿Puedo ver su pasaporte, por favor?' },
            { en: 'I need a new passport before our trip.', es: 'Necesito un pasaporte nuevo antes de nuestro viaje.' },
            { en: 'Keep your passport in a safe place.', es: 'Guarda tu pasaporte en un lugar seguro.' },
          ],
        },
        {
          en: 'customs',
          es: 'aduana',
          kind: 'word',
          examples: [
            { en: 'We went through customs very quickly.', es: 'Pasamos la aduana muy rápido.' },
            { en: 'The customs officer opened my suitcase.', es: 'El agente de aduana abrió mi maleta.' },
            { en: 'After customs, my family was waiting for me.', es: 'Después de la aduana, mi familia me estaba esperando.' },
          ],
          note: '"Customs" (aduana) siempre lleva S al final; "custom" significa costumbre.',
        },
        {
          en: 'What is the purpose of your visit?',
          es: '¿Cuál es el motivo de su visita?',
          kind: 'phrase',
          examples: [
            { en: 'What is the purpose of your visit? — Tourism.', es: '¿Cuál es el motivo de su visita? —Turismo.' },
            { en: 'What is the purpose of your visit? — A business meeting.', es: '¿Cuál es el motivo de su visita? —Una reunión de negocios.' },
            { en: 'What is the purpose of your visit? — To see my daughter.', es: '¿Cuál es el motivo de su visita? —Ver a mi hija.' },
          ],
        },
        {
          en: "I'm here on vacation.",
          es: 'Estoy aquí de vacaciones.',
          kind: 'phrase',
          examples: [
            { en: "I'm here on vacation for two weeks.", es: 'Estoy aquí de vacaciones por dos semanas.' },
            { en: "I'm not here for work. I'm here on vacation.", es: 'No estoy aquí por trabajo. Estoy aquí de vacaciones.' },
            { en: "Are you a student here? — No, I'm here on vacation.", es: '¿Eres estudiante aquí? —No, estoy aquí de vacaciones.' },
          ],
          alt: ["I'm on vacation.", "I'm here on holiday."],
          note: 'En EE. UU. se dice "vacation"; en el Reino Unido, "holiday".',
        },
        {
          en: 'I have nothing to declare.',
          es: 'No tengo nada que declarar.',
          kind: 'phrase',
          examples: [
            { en: 'No, sir. I have nothing to declare.', es: 'No, señor. No tengo nada que declarar.' },
            { en: 'I only have clothes and books. I have nothing to declare.', es: 'Solo traigo ropa y libros. No tengo nada que declarar.' },
            { en: 'On the customs form, I wrote that I have nothing to declare.', es: 'En el formulario de aduana escribí que no tengo nada que declarar.' },
          ],
        },
      ],
    },
    {
      title: 'En el hotel',
      emoji: '🏨',
      items: [
        {
          en: 'front desk',
          es: 'recepción',
          kind: 'word',
          examples: [
            { en: 'You can leave your bags at the front desk.', es: 'Puede dejar sus maletas en la recepción.' },
            { en: 'Call the front desk if you need more towels.', es: 'Llama a la recepción si necesitas más toallas.' },
            { en: 'The woman at the front desk was very friendly.', es: 'La señora de la recepción fue muy amable.' },
          ],
          alt: ['reception', 'reception desk'],
          note: 'En EE. UU. se dice "front desk"; "reception" es más común en el Reino Unido.',
        },
        {
          en: 'room key',
          es: 'llave de la habitación',
          kind: 'word',
          examples: [
            { en: 'I left my room key inside the room.', es: 'Dejé la llave de la habitación adentro del cuarto.' },
            { en: "My room key doesn't work. Can you help me?", es: 'Mi llave de la habitación no funciona. ¿Me puede ayudar?' },
            { en: 'Here is your room key. You are in room 214.', es: 'Aquí tiene la llave de la habitación. Es el cuarto 214.' },
          ],
        },
        {
          en: 'double room',
          es: 'habitación doble',
          kind: 'word',
          examples: [
            { en: 'We need a double room for three nights.', es: 'Necesitamos una habitación doble por tres noches.' },
            { en: 'A double room costs ninety dollars a night.', es: 'Una habitación doble cuesta noventa dólares la noche.' },
            { en: 'Do you want a single or a double room?', es: '¿Quiere una habitación sencilla o doble?' },
          ],
        },
        {
          en: 'Is breakfast included?',
          es: '¿El desayuno está incluido?',
          kind: 'phrase',
          examples: [
            { en: 'Is breakfast included in the price?', es: '¿El desayuno está incluido en el precio?' },
            { en: 'Is breakfast included? — Yes, from seven to ten.', es: '¿El desayuno está incluido? —Sí, de siete a diez.' },
            { en: 'The room is cheap, but is breakfast included?', es: 'La habitación es barata, pero ¿el desayuno está incluido?' },
          ],
        },
        {
          en: 'What time is checkout?',
          es: '¿A qué hora hay que dejar la habitación?',
          kind: 'phrase',
          examples: [
            { en: 'What time is checkout? — At eleven.', es: '¿A qué hora hay que dejar la habitación? —A las once.' },
            { en: 'Our flight is at night. What time is checkout?', es: 'Nuestro vuelo es en la noche. ¿A qué hora hay que dejar la habitación?' },
            { en: 'What time is checkout? We need to pack.', es: '¿A qué hora hay que dejar la habitación? Tenemos que empacar.' },
          ],
          alt: ['What time is check-out?', 'What time do I have to check out?'],
        },
      ],
    },
    {
      title: 'Reservas',
      emoji: '📅',
      items: [
        {
          en: 'reservation',
          es: 'reserva',
          kind: 'word',
          examples: [
            { en: 'We have a reservation for two nights.', es: 'Tenemos una reserva por dos noches.' },
            { en: "I made a dinner reservation for eight o'clock.", es: 'Hice una reserva para cenar a las ocho.' },
            { en: "Sorry, we can't find your reservation.", es: 'Lo siento, no encontramos su reserva.' },
          ],
          alt: ['booking'],
          note: 'En EE. UU. se usa más "reservation"; "booking" es muy común en el Reino Unido.',
        },
        {
          en: 'to book',
          es: 'reservar',
          kind: 'word',
          examples: [
            { en: 'I booked a hotel near the beach.', es: 'Reservé un hotel cerca de la playa.' },
            { en: 'We need to book our flights soon.', es: 'Tenemos que reservar los vuelos pronto.' },
            { en: 'Did you book a table for tonight?', es: '¿Reservaste una mesa para esta noche?' },
          ],
          alt: ['to reserve'],
          note: 'Como sustantivo, "book" es libro; como verbo, "to book" es reservar.',
        },
        {
          en: 'Do you have any rooms available?',
          es: '¿Tiene habitaciones disponibles?',
          kind: 'phrase',
          examples: [
            { en: 'Do you have any rooms available this weekend?', es: '¿Tiene habitaciones disponibles este fin de semana?' },
            { en: "Do you have any rooms available? — Sorry, we're full.", es: '¿Tiene habitaciones disponibles? —Lo siento, estamos llenos.' },
            { en: 'Hello, do you have any rooms available for two people?', es: 'Hola, ¿tiene habitaciones disponibles para dos personas?' },
          ],
        },
        {
          en: 'I have a reservation for tonight.',
          es: 'Tengo una reserva para esta noche.',
          kind: 'phrase',
          examples: [
            { en: 'Good evening. I have a reservation for tonight.', es: 'Buenas noches. Tengo una reserva para esta noche.' },
            { en: 'Hi, I have a reservation for tonight. My name is Ana López.', es: 'Hola, tengo una reserva para esta noche. Me llamo Ana López.' },
            { en: 'I have a reservation for tonight, a table for four.', es: 'Tengo una reserva para esta noche, una mesa para cuatro.' },
          ],
        },
        {
          en: "I'd like to cancel my reservation.",
          es: 'Quisiera cancelar mi reserva.',
          kind: 'phrase',
          examples: [
            { en: "I'd like to cancel my reservation for Friday.", es: 'Quisiera cancelar mi reserva del viernes.' },
            { en: "I'm sorry, I'm sick. I'd like to cancel my reservation.", es: 'Lo siento, estoy enfermo. Quisiera cancelar mi reserva.' },
            { en: "I'd like to cancel my reservation. Can I get a refund?", es: 'Quisiera cancelar mi reserva. ¿Me pueden devolver el dinero?' },
          ],
        },
      ],
    },
    {
      title: 'Turismo',
      emoji: '📸',
      items: [
        {
          en: 'tour guide',
          es: 'guía turístico',
          kind: 'word',
          examples: [
            { en: 'Our tour guide speaks English and Spanish.', es: 'Nuestro guía turístico habla inglés y español.' },
            { en: 'The tour guide told us the history of the city.', es: 'El guía turístico nos contó la historia de la ciudad.' },
            { en: "Let's follow the tour guide with the red umbrella.", es: 'Sigamos al guía turístico del paraguas rojo.' },
          ],
          alt: ['guide'],
        },
        {
          en: 'to go sightseeing',
          es: 'hacer turismo',
          kind: 'word',
          examples: [
            { en: "Tomorrow we're going sightseeing in the old town.", es: 'Mañana vamos a hacer turismo en el centro histórico.' },
            { en: "We went sightseeing all day, and now we're tired.", es: 'Hicimos turismo todo el día y ahora estamos cansados.' },
            { en: 'Do you want to go sightseeing after lunch?', es: '¿Quieres hacer turismo después del almuerzo?' },
          ],
        },
        {
          en: 'souvenir',
          es: 'recuerdo (de viaje)',
          kind: 'word',
          examples: [
            { en: 'I bought a souvenir for my mom.', es: 'Compré un recuerdo para mi mamá.' },
            { en: 'This little bag is a souvenir from Mexico.', es: 'Esta bolsita es un recuerdo de México.' },
            { en: 'There are many souvenir shops near the beach.', es: 'Hay muchas tiendas de recuerdos cerca de la playa.' },
          ],
          note: '"Souvenir" es un objeto; un recuerdo en la mente se dice "memory".',
        },
        {
          en: 'Can you take a picture of us?',
          es: '¿Nos puede tomar una foto?',
          kind: 'phrase',
          examples: [
            { en: 'Excuse me, can you take a picture of us?', es: 'Disculpe, ¿nos puede tomar una foto?' },
            { en: 'Can you take a picture of us? — Sure! Smile, everyone!', es: '¿Nos puede tomar una foto? —¡Claro! ¡Sonrían todos!' },
            { en: 'Hey, can you take a picture of us by the lake?', es: 'Oye, ¿nos puedes tomar una foto junto al lago?' },
          ],
          alt: ['Could you take a picture of us?', 'Can you take a photo of us?'],
        },
        {
          en: 'What time does the tour start?',
          es: '¿A qué hora empieza el recorrido?',
          kind: 'phrase',
          examples: [
            { en: 'What time does the tour start tomorrow?', es: '¿A qué hora empieza el recorrido mañana?' },
            { en: 'What time does the tour start? — At nine sharp.', es: '¿A qué hora empieza el recorrido? —A las nueve en punto.' },
            { en: 'What time does the tour start? I want to eat first.', es: '¿A qué hora empieza el recorrido? Quiero comer antes.' },
          ],
        },
      ],
    },
    {
      title: 'Alquilar un auto',
      emoji: '🚗',
      items: [
        {
          en: "driver's license",
          es: 'licencia de conducir',
          kind: 'word',
          examples: [
            { en: "You need a driver's license to rent a car.", es: 'Necesitas licencia de conducir para alquilar un auto.' },
            { en: "Can I see your driver's license, please?", es: '¿Me permite ver su licencia de conducir, por favor?' },
            { en: "My son just got his driver's license.", es: 'Mi hijo acaba de sacar su licencia de conducir.' },
          ],
          alt: ['driver license', 'driving licence'],
          note: 'En el Reino Unido se dice "driving licence".',
        },
        {
          en: 'car insurance',
          es: 'seguro de auto',
          kind: 'word',
          examples: [
            { en: 'Do I need car insurance?', es: '¿Necesito seguro de auto?' },
            { en: 'The car insurance costs twenty dollars a day.', es: 'El seguro de auto cuesta veinte dólares por día.' },
            { en: 'I pay for car insurance every month.', es: 'Pago el seguro de auto cada mes.' },
          ],
          alt: ['auto insurance'],
        },
        {
          en: 'rental car',
          es: 'auto de alquiler',
          kind: 'word',
          examples: [
            { en: 'We picked up the rental car at the airport.', es: 'Recogimos el auto de alquiler en el aeropuerto.' },
            { en: 'The rental car has a full tank of gas.', es: 'El auto de alquiler tiene el tanque lleno.' },
            { en: 'We drove the rental car to the beach.', es: 'Fuimos a la playa en el auto de alquiler.' },
          ],
        },
        {
          en: "I'd like to rent a car for a week.",
          es: 'Quisiera alquilar un auto por una semana.',
          kind: 'phrase',
          examples: [
            { en: "Hello, I'd like to rent a car for a week.", es: 'Hola, quisiera alquilar un auto por una semana.' },
            { en: "I'd like to rent a car for a week. What's the price?", es: 'Quisiera alquilar un auto por una semana. ¿Cuál es el precio?' },
            { en: "I'd like to rent a car for a week, starting Monday.", es: 'Quisiera alquilar un auto por una semana, a partir del lunes.' },
          ],
        },
        {
          en: 'Where do I return the car?',
          es: '¿Dónde devuelvo el auto?',
          kind: 'phrase',
          examples: [
            { en: 'Where do I return the car on Sunday?', es: '¿Dónde devuelvo el auto el domingo?' },
            { en: 'Where do I return the car? — Here at the airport.', es: '¿Dónde devuelvo el auto? —Aquí en el aeropuerto.' },
            { en: 'Where do I return the car? Is it the same office?', es: '¿Dónde devuelvo el auto? ¿Es en la misma oficina?' },
          ],
        },
      ],
    },
    {
      title: 'Emergencias',
      emoji: '🚨',
      items: [
        {
          en: 'help',
          es: 'ayuda',
          kind: 'word',
          examples: [
            { en: "Help! My friend can't swim!", es: '¡Ayuda! ¡Mi amigo no sabe nadar!' },
            { en: 'I need help. I think I broke my arm.', es: 'Necesito ayuda. Creo que me rompí el brazo.' },
            { en: 'Thank you so much for your help.', es: 'Muchas gracias por su ayuda.' },
          ],
          note: 'Para pedir auxilio se grita "Help!". En EE. UU. el número de emergencias es el 911.',
        },
        {
          en: 'ambulance',
          es: 'ambulancia',
          kind: 'word',
          examples: [
            { en: 'Please call an ambulance right now.', es: 'Por favor, llame a una ambulancia ahora mismo.' },
            { en: 'The ambulance arrived in five minutes.', es: 'La ambulancia llegó en cinco minutos.' },
            { en: "Don't move. The ambulance is on its way.", es: 'No se mueva. La ambulancia ya viene en camino.' },
          ],
        },
        {
          en: 'fire',
          es: 'incendio',
          kind: 'word',
          examples: [
            { en: "There's a fire on the third floor!", es: '¡Hay un incendio en el tercer piso!' },
            { en: 'In case of fire, use the stairs.', es: 'En caso de incendio, use las escaleras.' },
            { en: 'The firefighters put out the fire quickly.', es: 'Los bomberos apagaron el incendio rápidamente.' },
          ],
        },
        {
          en: 'Call the police!',
          es: '¡Llame a la policía!',
          kind: 'phrase',
          examples: [
            { en: 'Someone stole my phone! Call the police!', es: '¡Alguien me robó el teléfono! ¡Llame a la policía!' },
            { en: 'There was a car accident! Call the police!', es: '¡Hubo un accidente de auto! ¡Llame a la policía!' },
            { en: 'If you see something strange, call the police.', es: 'Si ve algo extraño, llame a la policía.' },
          ],
        },
        {
          en: "It's an emergency!",
          es: '¡Es una emergencia!',
          kind: 'phrase',
          examples: [
            { en: "Please hurry, it's an emergency!", es: '¡Por favor, apúrese, es una emergencia!' },
            { en: "Can I use your phone? It's an emergency!", es: '¿Puedo usar su teléfono? ¡Es una emergencia!' },
            { en: "Doctor, come quickly! It's an emergency!", es: '¡Doctor, venga rápido! ¡Es una emergencia!' },
          ],
        },
      ],
    },
    {
      title: 'En la playa',
      emoji: '🏖️',
      items: [
        {
          en: 'sunscreen',
          es: 'protector solar',
          kind: 'word',
          examples: [
            { en: "Don't forget to put on sunscreen.", es: 'No olvides ponerte protector solar.' },
            { en: 'This sunscreen is good for kids.', es: 'Este protector solar es bueno para niños.' },
            { en: 'Can I borrow your sunscreen?', es: '¿Me prestas tu protector solar?' },
          ],
          alt: ['sunblock'],
        },
        {
          en: 'lifeguard',
          es: 'salvavidas (persona)',
          kind: 'word',
          examples: [
            { en: "There's no lifeguard on this beach.", es: 'No hay salvavidas en esta playa.' },
            { en: 'The lifeguard told us to get out of the water.', es: 'El salvavidas nos dijo que saliéramos del agua.' },
            { en: 'My brother works as a lifeguard every summer.', es: 'Mi hermano trabaja de salvavidas cada verano.' },
          ],
          note: '"Lifeguard" es la persona; el chaleco salvavidas es "life jacket".',
        },
        {
          en: 'wave',
          es: 'ola',
          kind: 'word',
          examples: [
            { en: 'The waves are very big today.', es: 'Las olas están muy grandes hoy.' },
            { en: 'My son loves to jump over the waves.', es: 'A mi hijo le encanta saltar las olas.' },
            { en: 'This beach is great for surfing because of the waves.', es: 'Esta playa es ideal para surfear por las olas.' },
          ],
          note: 'Como verbo, "to wave" significa saludar con la mano.',
        },
        {
          en: 'Is it safe to swim here?',
          es: '¿Es seguro nadar aquí?',
          kind: 'phrase',
          examples: [
            { en: 'Excuse me, is it safe to swim here?', es: 'Disculpe, ¿es seguro nadar aquí?' },
            { en: 'Is it safe to swim here? — Yes, the water is calm.', es: '¿Es seguro nadar aquí? —Sí, el agua está tranquila.' },
            { en: 'This lake is beautiful. Is it safe to swim here?', es: 'Este lago es hermoso. ¿Es seguro nadar aquí?' },
          ],
        },
        {
          en: 'I got a sunburn.',
          es: 'Me quemé con el sol.',
          kind: 'phrase',
          examples: [
            { en: 'Ouch! I got a sunburn yesterday.', es: '¡Ay! Ayer me quemé con el sol.' },
            { en: 'I fell asleep on the beach, and I got a sunburn.', es: 'Me quedé dormido en la playa y me quemé con el sol.' },
            { en: 'Why is your face red? — I got a sunburn.', es: '¿Por qué tienes la cara roja? —Me quemé con el sol.' },
          ],
          alt: ['I got sunburned.'],
        },
      ],
    },
    {
      title: 'Problemas de viaje',
      emoji: '🧳',
      items: [
        {
          en: 'delayed',
          es: 'retrasado',
          kind: 'word',
          examples: [
            { en: 'Our flight is delayed by two hours.', es: 'Nuestro vuelo tiene dos horas de retraso.' },
            { en: 'The bus is delayed because of the traffic.', es: 'El bus viene retrasado por el tráfico.' },
            { en: "Sorry, I'm late. My train was delayed.", es: 'Perdón por llegar tarde. Mi tren se retrasó.' },
          ],
        },
        {
          en: 'canceled',
          es: 'cancelado',
          kind: 'word',
          examples: [
            { en: 'Our train was canceled because of the snow.', es: 'Nuestro tren fue cancelado por la nieve.' },
            { en: 'Class is canceled today. The teacher is sick.', es: 'La clase de hoy está cancelada. El profesor está enfermo.' },
            { en: 'My flight was canceled, so I need a hotel.', es: 'Cancelaron mi vuelo, así que necesito un hotel.' },
          ],
          alt: ['cancelled'],
          note: '"Canceled" con una L es la forma de EE. UU.; "cancelled" es la británica.',
        },
        {
          en: 'to miss',
          es: 'perder (un vuelo o bus)',
          kind: 'word',
          examples: [
            { en: "Hurry up or we'll miss the flight!", es: '¡Apúrate o vamos a perder el vuelo!' },
            { en: 'I missed the last bus, so I took a taxi.', es: 'Perdí el último bus, así que tomé un taxi.' },
            { en: "If you miss your train, there's another one at six.", es: 'Si pierdes el tren, hay otro a las seis.' },
          ],
          note: '"To miss" es perder un vuelo o un bus; "to lose" es perder un objeto.',
        },
        {
          en: "My suitcase didn't arrive.",
          es: 'Mi maleta no llegó.',
          kind: 'phrase',
          examples: [
            { en: "My suitcase didn't arrive. Where can I report it?", es: 'Mi maleta no llegó. ¿Dónde puedo reportarlo?' },
            { en: "My suitcase didn't arrive, and all my clothes are in it.", es: 'Mi maleta no llegó, y toda mi ropa está adentro.' },
            { en: "Is everything OK? — No, my suitcase didn't arrive.", es: '¿Todo bien? —No, mi maleta no llegó.' },
          ],
          alt: ["My bag didn't arrive.", "My luggage didn't arrive."],
        },
        {
          en: 'I lost my passport.',
          es: 'Perdí mi pasaporte.',
          kind: 'phrase',
          examples: [
            { en: 'I lost my passport. What should I do?', es: 'Perdí mi pasaporte. ¿Qué debo hacer?' },
            { en: 'I need to go to the embassy. I lost my passport.', es: 'Necesito ir a la embajada. Perdí mi pasaporte.' },
            { en: 'Why are you so worried? — I lost my passport!', es: '¿Por qué estás tan preocupado? —¡Perdí mi pasaporte!' },
          ],
        },
      ],
    },
  ],
}
