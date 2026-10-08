import type { LevelInput } from '../types'

export const level3: LevelInput = {
  id: 3,
  title: 'En la ciudad',
  subtitle: 'Muévete por la ciudad, haz compras y resuelve trámites.',
  cefr: 'A2',
  emoji: '🏙️',
  color: 'violet',
  lessons: [
    {
      title: 'Lugares',
      emoji: '🏛️',
      items: [
        {
          en: 'library',
          es: 'biblioteca',
          kind: 'word',
          examples: [
            { en: 'I study at the library on Saturdays.', es: 'Estudio en la biblioteca los sábados.' },
            { en: 'The library has free Wi-Fi and quiet rooms.', es: 'La biblioteca tiene wifi gratis y salas tranquilas.' },
            { en: 'My kids borrow three books from the library every week.', es: 'Mis hijos sacan tres libros de la biblioteca cada semana.' },
          ],
          note: 'Falso amigo: "library" es biblioteca; librería se dice "bookstore".',
        },
        {
          en: 'city hall',
          es: 'alcaldía',
          kind: 'word',
          examples: [
            { en: 'We need to go to city hall tomorrow.', es: 'Tenemos que ir a la alcaldía mañana.' },
            { en: 'They got married at city hall last spring.', es: 'Se casaron en la alcaldía la primavera pasada.' },
            { en: 'Is city hall open on Saturdays? — No, only on weekdays.', es: '¿La alcaldía abre los sábados? —No, solo entre semana.' },
          ],
          alt: ['town hall'],
        },
        {
          en: 'downtown',
          es: 'centro (de la ciudad)',
          kind: 'word',
          examples: [
            { en: 'I work downtown, near the main square.', es: 'Trabajo en el centro, cerca de la plaza principal.' },
            { en: "Let's go downtown for dinner tonight.", es: 'Vamos al centro a cenar esta noche.' },
            { en: 'Parking downtown is very expensive.', es: 'Estacionar en el centro es muy caro.' },
          ],
          alt: ['city center'],
          note: 'Se usa sin "the" ni "to": "I work downtown", "Let\'s go downtown".',
        },
        {
          en: 'Is there a park near here?',
          es: '¿Hay un parque cerca de aquí?',
          kind: 'phrase',
          examples: [
            { en: 'Is there a park near here? — Yes, two blocks away.', es: '¿Hay un parque cerca de aquí? —Sí, a dos cuadras.' },
            { en: 'Excuse me, is there a park near here for running?', es: 'Disculpe, ¿hay un parque cerca de aquí para correr?' },
            { en: 'Is there a park near here? The kids want to play.', es: '¿Hay un parque cerca de aquí? Los niños quieren jugar.' },
          ],
          alt: ['Is there a park nearby?'],
        },
        {
          en: 'I live in the suburbs.',
          es: 'Vivo en las afueras.',
          kind: 'phrase',
          examples: [
            { en: 'I live in the suburbs, so I take the train.', es: 'Vivo en las afueras, así que tomo el tren.' },
            { en: 'Where do you live? — I live in the suburbs.', es: '¿Dónde vives? —Vivo en las afueras.' },
            { en: 'I live in the suburbs, and I have a big yard.', es: 'Vivo en las afueras y tengo un patio grande.' },
          ],
          alt: ['I live on the outskirts.'],
          note: '"Suburbs" son zonas residenciales, no "suburbios" (barrios pobres).',
        },
      ],
    },
    {
      title: 'Direcciones',
      emoji: '🧭',
      items: [
        {
          en: 'corner',
          es: 'esquina',
          kind: 'word',
          examples: [
            { en: 'The pharmacy is on the corner.', es: 'La farmacia está en la esquina.' },
            { en: "Let's meet on the corner, next to the café.", es: 'Nos vemos en la esquina, al lado del café.' },
            { en: 'Put the plant in the corner of the room.', es: 'Pon la planta en el rincón de la habitación.' },
          ],
          note: '"On the corner" = en la esquina (de la calle); "in the corner" = en el rincón.',
        },
        {
          en: 'block',
          es: 'cuadra',
          kind: 'word',
          examples: [
            { en: 'The bank is three blocks from here.', es: 'El banco está a tres cuadras de aquí.' },
            { en: 'I walk five blocks to work every day.', es: 'Camino cinco cuadras hasta el trabajo todos los días.' },
            { en: "There's a new café on our block.", es: 'Hay un café nuevo en nuestra cuadra.' },
          ],
        },
        {
          en: 'traffic light',
          es: 'semáforo',
          kind: 'word',
          examples: [
            { en: 'Turn right at the traffic light.', es: 'Dobla a la derecha en el semáforo.' },
            { en: 'Stop! The traffic light is red.', es: '¡Para! El semáforo está en rojo.' },
            { en: "The traffic lights aren't working today.", es: 'Los semáforos no están funcionando hoy.' },
          ],
        },
        {
          en: 'How do I get to the station?',
          es: '¿Cómo llego a la estación?',
          kind: 'phrase',
          examples: [
            { en: 'Excuse me, how do I get to the station?', es: 'Disculpe, ¿cómo llego a la estación?' },
            { en: 'How do I get to the station? — Walk straight for two blocks.', es: '¿Cómo llego a la estación? —Camine derecho dos cuadras.' },
            { en: "I'm lost. How do I get to the station from here?", es: 'Estoy perdido. ¿Cómo llego a la estación desde aquí?' },
          ],
          alt: ['How can I get to the station?'],
        },
        {
          en: 'Turn left at the corner.',
          es: 'Dobla a la izquierda en la esquina.',
          kind: 'phrase',
          examples: [
            { en: 'Go straight ahead and turn left at the corner.', es: 'Sigue derecho y dobla a la izquierda en la esquina.' },
            { en: "Turn left at the corner, and you'll see the bank.", es: 'Dobla a la izquierda en la esquina y verás el banco.' },
            { en: 'Please turn left at the corner. My house is the blue one.', es: 'Por favor, doble a la izquierda en la esquina. Mi casa es la azul.' },
          ],
          note: 'Ojo: "right" es derecha, pero "straight" es derecho (recto).',
        },
      ],
    },
    {
      title: 'Transporte',
      emoji: '🚌',
      items: [
        {
          en: 'bus stop',
          es: 'parada de autobús',
          kind: 'word',
          examples: [
            { en: "I'll wait for you at the bus stop.", es: 'Te espero en la parada de autobús.' },
            { en: 'The bus stop is in front of the school.', es: 'La parada de autobús está frente a la escuela.' },
            { en: 'Many people were waiting at the bus stop this morning.', es: 'Mucha gente esperaba en la parada de autobús esta mañana.' },
          ],
        },
        {
          en: 'subway',
          es: 'metro',
          kind: 'word',
          examples: [
            { en: 'The subway is faster than the bus.', es: 'El metro es más rápido que el autobús.' },
            { en: 'I take the subway to work every morning.', es: 'Tomo el metro para ir al trabajo cada mañana.' },
            { en: 'The subway is very crowded at rush hour.', es: 'El metro está muy lleno en la hora pico.' },
          ],
          alt: ['metro'],
          note: 'En Reino Unido se dice "the underground" o "the tube".',
        },
        {
          en: 'to get off',
          es: 'bajarse',
          kind: 'word',
          examples: [
            { en: 'We get off at the next stop.', es: 'Nos bajamos en la próxima parada.' },
            { en: 'Where do I get off for the museum?', es: '¿Dónde me bajo para ir al museo?' },
            { en: 'She got off the train and called her mom.', es: 'Ella se bajó del tren y llamó a su mamá.' },
          ],
          note: 'Lo contrario es "to get on" (subirse al autobús o al tren).',
        },
        {
          en: 'Does this bus go downtown?',
          es: '¿Este autobús va al centro?',
          kind: 'phrase',
          examples: [
            { en: 'Does this bus go downtown? — No, take the number 12.', es: '¿Este autobús va al centro? —No, toma el número 12.' },
            { en: 'Excuse me, driver. Does this bus go downtown?', es: 'Disculpe, conductor. ¿Este autobús va al centro?' },
            { en: "I'm not sure. Does this bus go downtown on Sundays?", es: 'No estoy seguro. ¿Este autobús va al centro los domingos?' },
          ],
        },
        {
          en: 'How often does the bus come?',
          es: '¿Cada cuánto pasa el autobús?',
          kind: 'phrase',
          examples: [
            { en: 'How often does the bus come? — Every ten minutes.', es: '¿Cada cuánto pasa el autobús? —Cada diez minutos.' },
            { en: 'How often does the bus come on weekends? — Every half hour.', es: '¿Cada cuánto pasa el autobús los fines de semana? —Cada media hora.' },
            { en: 'Oh no, we missed it! How often does the bus come?', es: '¡Ay, no, lo perdimos! ¿Cada cuánto pasa el autobús?' },
          ],
          alt: ['How often does the bus run?'],
        },
      ],
    },
    {
      title: 'De compras',
      emoji: '🛍️',
      items: [
        {
          en: 'cash',
          es: 'efectivo',
          kind: 'word',
          examples: [
            { en: 'Sorry, I only have cash.', es: 'Lo siento, solo tengo efectivo.' },
            { en: 'Do you take cash, or only cards?', es: '¿Aceptan efectivo o solo tarjetas?' },
            { en: 'I always carry some cash for the bus.', es: 'Siempre llevo algo de efectivo para el autobús.' },
          ],
        },
        {
          en: 'receipt',
          es: 'recibo',
          kind: 'word',
          examples: [
            { en: 'Keep your receipt if you want to return it.', es: 'Guarda tu recibo si quieres devolverlo.' },
            { en: 'Can I have a receipt, please? — Here you go.', es: '¿Me da un recibo, por favor? —Aquí tiene.' },
            { en: 'I keep all my receipts in this box.', es: 'Guardo todos mis recibos en esta caja.' },
          ],
          note: 'Se pronuncia /ri-SÍT/: la "p" no suena.',
        },
        {
          en: 'on sale',
          es: 'en oferta',
          kind: 'word',
          examples: [
            { en: 'These jackets are on sale this week.', es: 'Estas chaquetas están en oferta esta semana.' },
            { en: 'I bought these shoes on sale for twenty dollars.', es: 'Compré estos zapatos en oferta por veinte dólares.' },
            { en: "Is this TV on sale? — Yes, it's thirty percent off.", es: '¿Este televisor está en oferta? —Sí, tiene treinta por ciento de descuento.' },
          ],
          note: '"On sale" = con descuento; "for sale" = a la venta.',
        },
        {
          en: 'Can I pay by card?',
          es: '¿Puedo pagar con tarjeta?',
          kind: 'phrase',
          examples: [
            { en: 'Can I pay by card? — Yes, of course.', es: '¿Puedo pagar con tarjeta? —Sí, claro.' },
            { en: "I don't have any cash. Can I pay by card?", es: 'No tengo efectivo. ¿Puedo pagar con tarjeta?' },
            { en: "That's twelve dollars. — Can I pay by card?", es: 'Son doce dólares. —¿Puedo pagar con tarjeta?' },
          ],
          alt: ['Can I pay with a card?', 'Can I pay by credit card?'],
        },
        {
          en: "I'm just looking, thanks.",
          es: 'Solo estoy mirando, gracias.',
          kind: 'phrase',
          examples: [
            { en: "Can I help you? — I'm just looking, thanks.", es: '¿Le puedo ayudar? —Solo estoy mirando, gracias.' },
            { en: "I'm just looking, thanks. I'll let you know if I need help.", es: 'Solo estoy mirando, gracias. Le aviso si necesito ayuda.' },
            { en: "The salesperson smiled, and I said, 'I'm just looking, thanks.'", es: 'La vendedora sonrió y le dije: "Solo estoy mirando, gracias".' },
          ],
          alt: ["I'm just looking, thank you."],
        },
      ],
    },
    {
      title: 'En el supermercado',
      emoji: '🛒',
      items: [
        {
          en: 'shopping cart',
          es: 'carrito de compras',
          kind: 'word',
          examples: [
            { en: 'Put the water in the shopping cart.', es: 'Pon el agua en el carrito de compras.' },
            { en: 'Can you push the shopping cart, please?', es: '¿Puedes empujar el carrito de compras, por favor?' },
            { en: 'My little boy loves to ride in the shopping cart.', es: 'A mi hijo pequeño le encanta ir sentado en el carrito de compras.' },
          ],
          alt: ['cart'],
        },
        {
          en: 'aisle',
          es: 'pasillo',
          kind: 'word',
          examples: [
            { en: 'The rice is in aisle five.', es: 'El arroz está en el pasillo cinco.' },
            { en: 'Excuse me, which aisle is the bread in?', es: 'Disculpe, ¿en qué pasillo está el pan?' },
            { en: 'Would you like a window seat or an aisle seat?', es: '¿Quiere un asiento de ventana o de pasillo?' },
          ],
          note: 'Se pronuncia /áil/, como "I\'ll": la "s" no suena.',
        },
        {
          en: 'expiration date',
          es: 'fecha de vencimiento',
          kind: 'word',
          examples: [
            { en: 'Always check the expiration date on the milk.', es: 'Siempre revisa la fecha de vencimiento de la leche.' },
            { en: "Don't eat this yogurt. It's past the expiration date.", es: 'No comas este yogur. Ya pasó la fecha de vencimiento.' },
            { en: "What's the expiration date on your credit card?", es: '¿Cuál es la fecha de vencimiento de tu tarjeta de crédito?' },
          ],
          alt: ['expiry date'],
        },
        {
          en: 'Where can I find the eggs?',
          es: '¿Dónde puedo encontrar los huevos?',
          kind: 'phrase',
          examples: [
            { en: 'Where can I find the eggs? — Next to the milk.', es: '¿Dónde puedo encontrar los huevos? —Junto a la leche.' },
            { en: 'Where can I find the eggs? I looked everywhere!', es: '¿Dónde puedo encontrar los huevos? ¡Busqué por todas partes!' },
            { en: "Where can I find the eggs? — Sorry, we're out today.", es: '¿Dónde puedo encontrar los huevos? —Lo siento, hoy no nos quedan.' },
          ],
          alt: ['Where are the eggs?'],
        },
        {
          en: 'Do you need a bag?',
          es: '¿Necesita una bolsa?',
          kind: 'phrase',
          examples: [
            { en: 'Do you need a bag? — No, thanks, I have one.', es: '¿Necesita una bolsa? —No, gracias, tengo una.' },
            { en: 'Do you need a bag? They cost ten cents each.', es: '¿Necesita una bolsa? Cuestan diez centavos cada una.' },
            { en: 'Do you need a bag for that? — No, I can carry it.', es: '¿Necesita una bolsa para eso? —No, lo llevo en la mano.' },
          ],
        },
      ],
    },
    {
      title: 'En el restaurante',
      emoji: '🍽️',
      items: [
        {
          en: 'waiter',
          es: 'mesero',
          kind: 'word',
          examples: [
            { en: 'The waiter brought us the menu.', es: 'El mesero nos trajo el menú.' },
            { en: "Let's ask the waiter for more bread.", es: 'Vamos a pedirle más pan al mesero.' },
            { en: 'My brother works as a waiter on weekends.', es: 'Mi hermano trabaja de mesero los fines de semana.' },
          ],
          alt: ['server'],
          note: 'Para una mujer: "waitress". La palabra neutra "server" sirve para ambos.',
        },
        {
          en: 'tip',
          es: 'propina',
          kind: 'word',
          examples: [
            { en: 'We left a twenty percent tip.', es: 'Dejamos una propina del veinte por ciento.' },
            { en: 'Is the tip included in the check?', es: '¿La propina está incluida en la cuenta?' },
            { en: 'The delivery driver was fast, so I gave a big tip.', es: 'El repartidor fue rápido, así que le di una buena propina.' },
          ],
          note: 'En EE. UU. se suele dejar entre 15 % y 20 % de propina.',
        },
        {
          en: 'A table for two, please.',
          es: 'Una mesa para dos, por favor.',
          kind: 'phrase',
          examples: [
            { en: 'Good evening. A table for two, please.', es: 'Buenas noches. Una mesa para dos, por favor.' },
            { en: 'How many people? — A table for two, please.', es: '¿Cuántas personas? —Una mesa para dos, por favor.' },
            { en: 'A table for two, please. Do you have one outside?', es: 'Una mesa para dos, por favor. ¿Tienen una afuera?' },
          ],
        },
        {
          en: 'Are you ready to order?',
          es: '¿Están listos para pedir?',
          kind: 'phrase',
          examples: [
            { en: "Are you ready to order? — Yes, I'd like the soup.", es: '¿Están listos para pedir? —Sí, quisiera la sopa.' },
            { en: 'Are you ready to order? — Not yet, one more minute.', es: '¿Están listos para pedir? —Todavía no, un minuto más.' },
            { en: "Are you ready to order? I'm so hungry!", es: '¿Estás listo para pedir? ¡Tengo mucha hambre!' },
          ],
        },
        {
          en: 'Can we have the check, please?',
          es: '¿Nos trae la cuenta, por favor?',
          kind: 'phrase',
          examples: [
            { en: "We're finished. Can we have the check, please?", es: 'Ya terminamos. ¿Nos trae la cuenta, por favor?' },
            { en: "Can we have the check, please? We'd like to pay separately.", es: '¿Nos trae la cuenta, por favor? Queremos pagar por separado.' },
            { en: 'Can we have the check, please? — Of course, one moment.', es: '¿Nos trae la cuenta, por favor? —Claro, un momento.' },
          ],
          alt: ['Could we have the check, please?', 'Can we get the check, please?', 'Can we have the bill, please?'],
          note: 'En EE. UU. se dice "check"; en Reino Unido, "bill".',
        },
      ],
    },
    {
      title: 'En el banco',
      emoji: '🏦',
      items: [
        {
          en: 'bank account',
          es: 'cuenta bancaria',
          kind: 'word',
          examples: [
            { en: 'I need a bank account for my salary.', es: 'Necesito una cuenta bancaria para mi sueldo.' },
            { en: 'You can send the money to my bank account.', es: 'Puedes enviar el dinero a mi cuenta bancaria.' },
            { en: 'My daughter opened her first bank account today.', es: 'Mi hija abrió su primera cuenta bancaria hoy.' },
          ],
        },
        {
          en: 'ATM',
          es: 'cajero automático',
          kind: 'word',
          examples: [
            { en: 'I took out money from the ATM.', es: 'Saqué dinero del cajero automático.' },
            { en: 'Is there an ATM inside the mall?', es: '¿Hay un cajero automático dentro del centro comercial?' },
            { en: 'The ATM kept my card, so I called the bank.', es: 'El cajero automático se quedó con mi tarjeta, así que llamé al banco.' },
          ],
          alt: ['cash machine'],
        },
        {
          en: 'to withdraw',
          es: 'retirar (dinero)',
          kind: 'word',
          examples: [
            { en: 'I want to withdraw two hundred dollars.', es: 'Quiero retirar doscientos dólares.' },
            { en: 'You can withdraw cash at any ATM.', es: 'Puedes retirar efectivo en cualquier cajero automático.' },
            { en: 'She withdrew some money for the trip.', es: 'Ella retiró algo de dinero para el viaje.' },
          ],
          alt: ['to take out'],
          note: 'Pasado irregular: withdrew. En el día a día también se dice "to take out money".',
        },
        {
          en: "I'd like to open an account.",
          es: 'Quisiera abrir una cuenta.',
          kind: 'phrase',
          examples: [
            { en: "Good morning. I'd like to open an account.", es: 'Buenos días. Quisiera abrir una cuenta.' },
            { en: "How can I help you? — I'd like to open an account.", es: '¿En qué le puedo ayudar? —Quisiera abrir una cuenta.' },
            { en: "I'd like to open an account for my small business.", es: 'Quisiera abrir una cuenta para mi pequeño negocio.' },
          ],
          alt: ['I want to open an account.'],
        },
        {
          en: 'I forgot my PIN.',
          es: 'Olvidé mi PIN.',
          kind: 'phrase',
          examples: [
            { en: "I forgot my PIN, so I can't use my card.", es: 'Olvidé mi PIN, así que no puedo usar mi tarjeta.' },
            { en: 'I forgot my PIN again! Can you help me?', es: '¡Olvidé mi PIN otra vez! ¿Me puede ayudar?' },
            { en: 'Sorry, I forgot my PIN. Can I pay in cash?', es: 'Perdón, olvidé mi PIN. ¿Puedo pagar en efectivo?' },
          ],
        },
      ],
    },
    {
      title: 'En la farmacia',
      emoji: '💊',
      items: [
        {
          en: 'prescription',
          es: 'receta médica',
          kind: 'word',
          examples: [
            { en: 'You need a prescription for this medicine.', es: 'Necesitas una receta médica para este medicamento.' },
            { en: 'The doctor gave me a prescription for antibiotics.', es: 'El médico me dio una receta para antibióticos.' },
            { en: "I'm here to pick up my prescription.", es: 'Vengo a recoger mi medicamento recetado.' },
          ],
          note: 'Falso amigo: "recipe" es receta de cocina, no receta médica.',
        },
        {
          en: 'painkiller',
          es: 'analgésico',
          kind: 'word',
          examples: [
            { en: 'Take a painkiller and rest.', es: 'Toma un analgésico y descansa.' },
            { en: 'Do you have any painkillers? I have a headache.', es: '¿Tienes algún analgésico? Me duele la cabeza.' },
            { en: 'The painkiller helped, and I slept well.', es: 'El analgésico me ayudó y dormí bien.' },
          ],
          alt: ['pain reliever'],
        },
        {
          en: 'cough syrup',
          es: 'jarabe para la tos',
          kind: 'word',
          examples: [
            { en: 'This cough syrup tastes terrible.', es: 'Este jarabe para la tos sabe horrible.' },
            { en: 'Take a spoonful of cough syrup before bed.', es: 'Toma una cucharada de jarabe para la tos antes de dormir.' },
            { en: 'Do you have cough syrup for children?', es: '¿Tiene jarabe para la tos para niños?' },
          ],
        },
        {
          en: 'I have a sore throat.',
          es: 'Me duele la garganta.',
          kind: 'phrase',
          examples: [
            { en: 'I have a sore throat. Do you have anything for it?', es: 'Me duele la garganta. ¿Tiene algo para eso?' },
            { en: "I have a sore throat, so I can't sing today.", es: 'Me duele la garganta, así que hoy no puedo cantar.' },
            { en: "What's wrong? — I have a sore throat and a fever.", es: '¿Qué te pasa? —Me duele la garganta y tengo fiebre.' },
          ],
          alt: ['My throat hurts.'],
        },
        {
          en: 'How often should I take it?',
          es: '¿Cada cuánto debo tomarlo?',
          kind: 'phrase',
          examples: [
            { en: 'How often should I take it? — Every eight hours.', es: '¿Cada cuánto debo tomarlo? —Cada ocho horas.' },
            { en: 'Thank you, doctor. How often should I take it?', es: 'Gracias, doctor. ¿Cada cuánto debo tomarlo?' },
            { en: 'I forgot what the doctor said. How often should I take it?', es: 'Olvidé lo que dijo el médico. ¿Cada cuánto debo tomarlo?' },
          ],
          alt: ['How often do I take it?'],
        },
      ],
    },
    {
      title: 'Correo y trámites',
      emoji: '📮',
      items: [
        {
          en: 'post office',
          es: 'oficina de correos',
          kind: 'word',
          examples: [
            { en: 'The post office closes at five.', es: 'La oficina de correos cierra a las cinco.' },
            { en: 'I picked up a package at the post office.', es: 'Recogí un paquete en la oficina de correos.' },
            { en: "There's always a long line at the post office.", es: 'Siempre hay una fila larga en la oficina de correos.' },
          ],
        },
        {
          en: 'stamp',
          es: 'estampilla',
          kind: 'word',
          examples: [
            { en: 'I need two stamps for these letters.', es: 'Necesito dos estampillas para estas cartas.' },
            { en: 'How much is a stamp for a letter to Peru?', es: '¿Cuánto cuesta la estampilla de una carta a Perú?' },
            { en: 'My grandfather collects stamps from around the world.', es: 'Mi abuelo colecciona estampillas de todo el mundo.' },
          ],
        },
        {
          en: 'to fill out',
          es: 'llenar (un formulario)',
          kind: 'word',
          examples: [
            { en: 'Please fill out this form.', es: 'Por favor, llene este formulario.' },
            { en: 'I filled out the job application online.', es: 'Llené la solicitud de empleo en línea.' },
            { en: 'Did you fill out the survey? It only takes five minutes.', es: '¿Llenaste la encuesta? Solo toma cinco minutos.' },
          ],
          alt: ['to fill in'],
          note: 'En inglés británico se dice "to fill in".',
        },
        {
          en: "I'd like to mail this package.",
          es: 'Quisiera enviar este paquete.',
          kind: 'phrase',
          examples: [
            { en: "I'd like to mail this package to Colombia.", es: 'Quisiera enviar este paquete a Colombia.' },
            { en: "I'd like to mail this package. How much will it cost?", es: 'Quisiera enviar este paquete. ¿Cuánto va a costar?' },
            { en: "It's a gift for my mom. I'd like to mail this package.", es: 'Es un regalo para mi mamá. Quisiera enviar este paquete.' },
          ],
          alt: ["I'd like to send this package."],
          note: 'En EE. UU. se dice "to mail"; en Reino Unido, "to post".',
        },
        {
          en: 'What documents do I need?',
          es: '¿Qué documentos necesito?',
          kind: 'phrase',
          examples: [
            { en: 'What documents do I need? — Your ID and a photo.', es: '¿Qué documentos necesito? —Su identificación y una foto.' },
            { en: "I want to get a driver's license. What documents do I need?", es: 'Quiero sacar la licencia de conducir. ¿Qué documentos necesito?' },
            { en: 'What documents do I need? We want to rent an apartment.', es: '¿Qué documentos necesito? Queremos alquilar un apartamento.' },
          ],
        },
      ],
    },
    {
      title: 'Vecinos y comunidad',
      emoji: '🏘️',
      items: [
        {
          en: 'neighbor',
          es: 'vecino',
          kind: 'word',
          examples: [
            { en: 'My neighbor has a big dog.', es: 'Mi vecino tiene un perro grande.' },
            { en: 'Our neighbors are very friendly.', es: 'Nuestros vecinos son muy amables.' },
            { en: 'My neighbor waters my plants when I travel.', es: 'Mi vecina riega mis plantas cuando viajo.' },
          ],
          alt: ['neighbour'],
        },
        {
          en: 'neighborhood',
          es: 'barrio',
          kind: 'word',
          examples: [
            { en: "It's a quiet neighborhood with lots of trees.", es: 'Es un barrio tranquilo con muchos árboles.' },
            { en: 'I grew up in this neighborhood.', es: 'Crecí en este barrio.' },
            { en: 'There are great restaurants in my neighborhood.', es: 'Hay restaurantes muy buenos en mi barrio.' },
          ],
          alt: ['neighbourhood'],
        },
        {
          en: 'noisy',
          es: 'ruidoso',
          kind: 'word',
          examples: [
            { en: 'The street is very noisy at night.', es: 'La calle es muy ruidosa de noche.' },
            { en: 'Our new neighbors are a little noisy.', es: 'Nuestros nuevos vecinos son un poco ruidosos.' },
            { en: "I can't study here. This café is too noisy.", es: 'No puedo estudiar aquí. Este café es demasiado ruidoso.' },
          ],
        },
        {
          en: 'I just moved in next door.',
          es: 'Acabo de mudarme al lado.',
          kind: 'phrase',
          examples: [
            { en: "Hi! I'm Ana. I just moved in next door.", es: '¡Hola! Soy Ana. Acabo de mudarme al lado.' },
            { en: 'Are you new here? — Yes, I just moved in next door.', es: '¿Eres nuevo aquí? —Sí, acabo de mudarme al lado.' },
            { en: 'I just moved in next door. Is there a good bakery nearby?', es: 'Acabo de mudarme al lado. ¿Hay una buena panadería cerca?' },
          ],
          alt: ['I just moved next door.'],
        },
        {
          en: 'Could you turn the music down, please?',
          es: '¿Podrías bajar la música, por favor?',
          kind: 'phrase',
          examples: [
            { en: "It's late. Could you turn the music down, please?", es: 'Es tarde. ¿Podrías bajar la música, por favor?' },
            { en: 'Could you turn the music down, please? The baby is sleeping.', es: '¿Podrías bajar la música, por favor? El bebé está durmiendo.' },
            { en: "Could you turn the music down, please? I can't hear you.", es: '¿Podrías bajar la música, por favor? No te escucho.' },
          ],
          alt: ['Could you turn down the music, please?', 'Can you turn the music down, please?'],
        },
      ],
    },
  ],
}
