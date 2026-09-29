/* ===== ÜBUNGSTEXTE (eigens erstellt, fiktive Personen) ===== */
window.LISTEN = {
  hv1: { title: "Barcelona: vecinos y maletas", voice: "es-ES", accent: "España", topic: "turismo", lvl: 3,
    pre: [["la maleta con ruedas", "der Rollkoffer"], ["el propietario", "der Eigentümer"], ["la licencia", "die Genehmigung"], ["renovar", "verlängern, erneuern"]],
    text: "Radio Litoral. Clara Ruiz informa desde la Barceloneta, en Barcelona. Son las diez de la mañana y por las calles estrechas del barrio ya circulan decenas de maletas con ruedas. Aquí vive Montse, de setenta y dos años. Nació en este edificio y dice que antes conocía a todos sus vecinos. «Ahora cada semana veo caras nuevas. Los que nos hemos quedado somos gente mayor», explica. El problema, según la asociación de vecinos, es que muchos propietarios prefieren alquilar a turistas porque ganan en un fin de semana lo que antes ganaban en un mes. Por eso, los alquileres para las familias del barrio han subido muchísimo. Jordi, un joven camarero, lleva dos años buscando piso en la zona donde trabaja. Al final se ha ido a vivir a una ciudad a cuarenta minutos en tren. El ayuntamiento ha anunciado que no renovará las licencias de pisos turísticos en los próximos años. Los propietarios hablan de un ataque a la propiedad privada; los vecinos, en cambio, dicen que es la última oportunidad para salvar el barrio.",
    q: [
      { type: "mc", op: "marcar", q: "¿Qué observa la periodista al llegar?", o: ["Mucha gente de viaje con equipaje", "Calles vacías", "Obras en las calles"], a: 0 },
      { type: "mc", op: "marcar", q: "Montse cuenta que…", o: ["se mudó al barrio hace poco", "hoy apenas conoce a la gente de su edificio", "alquila su piso a visitantes"], a: 1 },
      { type: "mc", op: "marcar", q: "Según los vecinos, los dueños prefieren a los visitantes porque…", o: ["causan menos problemas", "pagan mucho más en poco tiempo", "se quedan varios meses"], a: 1 },
      { type: "mc", op: "marcar", q: "Jordi…", o: ["ha encontrado un piso en el barrio", "vive fuera de la ciudad y va en tren al trabajo", "quiere abrir su propio bar"], a: 1 },
      { type: "short", op: "completar", q: "El ayuntamiento no va a renovar las ______ de pisos turísticos.", keys: ["licencia"], a: "licencias" },
      { type: "short", op: "contestar", q: "¿Cómo califican la medida los propietarios? (1–4 palabras)", keys: ["ataque", "propiedad"], a: "un ataque a la propiedad privada" }
    ] },
  hv2: { title: "Oaxaca: un espacio entre los puestos", voice: "es-MX", accent: "México", topic: "pobreza", lvl: 3,
    pre: [["el puesto", "der Marktstand"], ["alcanzar (Mex.)", "reichen (Geld)"], ["los chavos (Mex.)", "die Kinder/Jugendlichen"], ["la beca", "das Stipendium"], ["desconfiar", "misstrauen"]],
    text: "Hoy estamos con Rosa Méndez, educadora en un mercado de Oaxaca. Rosa, ¿cómo es un día normal para los niños con los que trabajas? Mira, muchos llegan a las seis de la mañana con sus papás. Ayudan a cargar la fruta, a vender, a cuidar a sus hermanitos. No es que los padres no quieran que estudien; es que sin ese dinero no alcanza para comer. ¿Y qué hace su proyecto? Abrimos un espacio dentro del mismo mercado, entre los puestos de flores. Ahí los niños hacen la tarea, leen y juegan un rato. Tenemos horarios flexibles: si un niño tiene que vender en la mañana, viene en la tarde. ¿Funciona? Poco a poco. Al principio los papás desconfiaban. Pensaban que íbamos a denunciarlos. Ahora ellos mismos nos traen a los chavos. Este año, veinte niños que ya no iban a la escuela se inscribieron otra vez. ¿Qué necesitan? Más voluntarios y, sobre todo, que el gobierno garantice becas para las familias. Con una beca, el niño deja de ser una fuente de ingreso.",
    q: [
      { type: "short", op: "apuntar", q: "¿A qué hora llegan muchos niños al mercado?", keys: ["seis", "6"], a: "a las seis de la mañana" },
      { type: "mc", op: "marcar", q: "Según Rosa, los padres…", o: ["no valoran la educación", "dependen del dinero que ganan los niños", "no saben leer"], a: 1 },
      { type: "mc", op: "marcar", q: "El espacio del proyecto se encuentra…", o: ["en una escuela cercana", "en el propio mercado", "en la casa de Rosa"], a: 1 },
      { type: "mc", op: "marcar", q: "Al principio, los padres…", o: ["temían tener problemas con las autoridades", "pagaban una cuota", "trabajaban como voluntarios"], a: 0 },
      { type: "short", op: "completar", q: "Este año, ___ niños volvieron a la escuela.", keys: ["veinte", "20"], a: "veinte" },
      { type: "short", op: "contestar", q: "¿Qué pide Rosa al gobierno?", keys: ["beca"], a: "becas para las familias" }
    ] },
  hv3: { title: "Buenos Aires: un lugar para la memoria", voice: "es-AR", accent: "Argentina", topic: "dict", lvl: 4,
    pre: [["el centro clandestino de detención", "geheimes Haftzentrum"], ["el sobreviviente", "der/die Überlebende"], ["la prueba judicial", "das Beweismittel vor Gericht"], ["acá (Arg.)", "hier"]],
    text: "Estamos en la avenida del Libertador, en Buenos Aires, frente a un edificio blanco con columnas. Durante la última dictadura militar, entre 1976 y 1983, aquí funcionó uno de los mayores centros clandestinos de detención del país. Hoy es un espacio para la memoria. Martín, guía del sitio, nos recibe en la entrada. «Muchos visitantes llegan pensando que van a ver un museo con vitrinas», cuenta. «Pero acá se decidió no reconstruir nada. Mostramos las paredes tal como quedaron, porque son una prueba judicial.» Cada año pasan miles de estudiantes. Martín dice que lo que más les impacta son los relatos de los sobrevivientes, que se escuchan en grabaciones en cada sala. «Los chicos preguntan mucho: cómo pudo pasar, por qué los vecinos no hicieron nada. Esas preguntas son el motivo por el que existe este lugar.» En 2023, la UNESCO incluyó el sitio en su lista del Patrimonio Mundial.",
    q: [
      { type: "mc", op: "marcar", q: "Durante la dictadura, el edificio fue…", o: ["una cárcel secreta", "una escuela de arte", "la sede del gobierno"], a: 0 },
      { type: "mc", op: "marcar", q: "¿Por qué no se reconstruyó el lugar?", o: ["Por falta de dinero", "Porque sirve como evidencia en los juicios", "Porque lo prohibió la UNESCO"], a: 1 },
      { type: "mc", op: "marcar", q: "A los estudiantes les impresionan sobre todo…", o: ["las fotos antiguas", "los testimonios grabados", "las visitas nocturnas"], a: 1 },
      { type: "short", op: "apuntar", q: "Apunta el año del reconocimiento de la UNESCO.", keys: ["2023"], a: "2023" },
      { type: "mc", op: "marcar", q: "(LK, inferierend) ¿Qué actitud muestra Martín?", o: ["Indiferente", "Comprometida: ve su trabajo como una tarea educativa", "Resignada"], a: 1 }
    ] },
  hv4: { title: "Uxía y el gallego", voice: "es-ES", accent: "España (Galicia)", topic: "biling", lvl: 2,
    pre: [["el instituto", "das Gymnasium / die weiterführende Schule"], ["la aldea", "das Dorf, der Weiler"], ["dar vergüenza", "peinlich sein"]],
    text: "Me llamo Uxía, tengo diecinueve años y soy de un pueblo cerca de Lugo. En mi casa siempre se habló gallego: con mis abuelos, con mis padres, con los vecinos. Pero cuando llegué al instituto en Santiago me di cuenta de que muchos compañeros de la ciudad hablaban castellano entre ellos y usaban el gallego solo en clase. Al principio me daba un poco de vergüenza, porque algunos decían que el gallego era de aldea. Con el tiempo cambié de opinión: empecé a grabar vídeos cortos en gallego sobre música y moda, y ahora me sigue mucha gente joven. Creo que una lengua no se salva con leyes, sino cuando la gente joven la usa para las cosas de su vida. Eso sí, también es importante que en la escuela se enseñe bien, porque si no, en dos generaciones se pierde.",
    q: [
      { type: "mc", op: "marcar", q: "¿Dónde aprendió Uxía el gallego?", o: ["En la escuela", "En su familia", "En internet"], a: 1 },
      { type: "mc", op: "marcar", q: "En Santiago, muchos compañeros…", o: ["hablaban solo gallego", "preferían el castellano fuera de clase", "no conocían el gallego"], a: 1 },
      { type: "short", op: "completar", q: "Algunos pensaban que el gallego era una lengua del ______.", keys: ["aldea", "campo", "pueblo", "rural"], a: "campo / de aldea" },
      { type: "short", op: "contestar", q: "¿Qué publica Uxía hoy en gallego?", keys: ["video", "vídeo"], a: "vídeos cortos (música y moda)" },
      { type: "mc", op: "marcar", q: "Para Uxía, una lengua sobrevive sobre todo si…", o: ["hay más leyes", "los jóvenes la usan en su día a día", "se prohíbe el castellano"], a: 1 }
    ] }
};

window.READ = {
  r1: { title: "Mi vida en Stuttgart", kind: "Blog", lvl: 2, ger: "B1", topic: "migr",
    paras: [
      "Hace tres años hice las maletas y me fui a Stuttgart. En Zaragoza había terminado Ingeniería, pero las ofertas que encontraba eran prácticas sin sueldo o contratos de tres meses. En Alemania, en cambio, una empresa de automoción me ofreció un contrato indefinido a las dos semanas de enviar mi currículum.",
      "Los primeros meses fueron duros. Tenía un nivel básico de alemán, no entendía el dialecto suabo y echaba de menos a mi familia, la luz de mi ciudad y las cenas a las diez de la noche. Aquí la gente cena a las seis y media. ¡Todavía me cuesta!",
      "Hoy hablo alemán con soltura, tengo amigos de muchos países y he aprendido cosas que nunca habría imaginado: separar la basura en cinco contenedores, ser puntual de verdad y disfrutar de un domingo en el que todo está cerrado.",
      "Mucha gente me pregunta si voy a volver. La respuesta es: sí, pero no ahora. Me gustaría volver cuando en España haya más oportunidades para los jóvenes y los sueldos permitan independizarse antes de los treinta. Mientras tanto, cada vez que vuelvo de vacaciones, llevo en la maleta jamón, aceite… y un poco de nostalgia."
    ],
    ex: [
      { type: "mc", q: "¿Por qué se fue Laura a Alemania?", o: ["Por amor", "Por la falta de trabajo estable en España", "Para estudiar alemán"], a: 1, why: "Párrafo 1: en España solo encontraba prácticas sin sueldo o contratos cortos." },
      { type: "mc", q: "¿Qué le resultó difícil al principio?", o: ["El horario de las comidas", "El trabajo en la empresa", "Encontrar piso"], a: 0, why: "Párrafo 2: echaba de menos cenar a las diez; en Alemania se cena a las seis y media." },
      { type: "match", q: "Relaciona cada párrafo con un título.", pairs: [["Párrafo 1", "La decisión de irse"], ["Párrafo 2", "Un comienzo difícil"], ["Párrafo 3", "Lo que ha aprendido"], ["Párrafo 4", "¿Volver o quedarse?"]] },
      { type: "mc", q: "«echaba de menos» significa…", o: ["vermisste", "verlor", "wünschte sich"], a: 0, why: "echar de menos = vermissen. Vokabel im Kontext." },
      { type: "evidence", q: "Tippe den Satz an, der zeigt, dass Laura unter bestimmten Bedingungen zurückkehren möchte.", para: 3, sentenceKey: "Me gustaría volver" }
    ] },
  r2: { title: "Infancias en la calle: el trabajo que no se ve", kind: "Artículo (Sachtext)", lvl: 3, ger: "B2", topic: "pobreza",
    paras: [
      "Son las siete de la tarde en un semáforo de Lima. Tomás, de once años, espera a que el disco se ponga en rojo para correr entre los coches con un paquete de caramelos. Tiene noventa segundos. Sonríe, insiste, da las gracias aunque nadie le compre nada. Cuando el semáforo cambia a verde, vuelve a la acera. Así, una y otra vez, hasta la medianoche.",
      "Tomás no es una excepción. En América Latina, millones de niños y niñas trabajan para completar los ingresos de su familia: venden en la calle, cargan mercancía en los mercados, limpian parabrisas o trabajan en el campo durante la cosecha. Muchos de ellos combinan el trabajo con la escuela; otros, simplemente, dejan de ir.",
      "¿Quién es responsable? ¿Los padres, que mandan a sus hijos a la calle? ¿Los conductores, que miran hacia otro lado? ¿O un sistema que obliga a elegir entre comer hoy y estudiar para mañana? Los expertos coinciden en que el trabajo infantil no se explica por la falta de amor de las familias, sino por la pobreza, la informalidad y la ausencia de protección social.",
      "Hay caminos para salir de este círculo. Algunos países han introducido ayudas económicas condicionadas: las familias reciben dinero si sus hijos van a la escuela y a los controles médicos. Organizaciones locales ofrecen comedores, clases de refuerzo y espacios donde los niños pueden, sencillamente, ser niños. Sin embargo, estas iniciativas llegan solo a una parte de la población y dependen a menudo de fondos que cambian cada año.",
      "Tomás quiere ser piloto. «Para ver la ciudad desde arriba», dice, y señala el cielo naranja sobre los coches. Su sueño no debería depender de cuántos caramelos venda esta noche."
    ],
    ex: [
      { type: "mc", q: "¿Qué función tiene el primer párrafo?", o: ["Presentar estadísticas", "Acercar el tema al lector mediante un caso concreto", "Criticar a los conductores"], a: 1, why: "Einstieg mit Einzelschicksal (Tomás) = anschaulicher, emotionaler Zugang." },
      { type: "mc", q: "Según el texto, la causa principal del trabajo infantil es…", o: ["el desinterés de los padres", "la pobreza y la falta de protección social", "la falta de escuelas"], a: 1, why: "Párrafo 3: «no se explica por la falta de amor… sino por la pobreza…»" },
      { type: "mc", q: "¿Qué recurso predomina en el tercer párrafo?", o: ["Preguntas retóricas", "Metáforas", "Diálogo"], a: 0, why: "Drei Fragen ohne erwartete Antwort → preguntas retóricas; sie aktivieren den Leser." },
      { type: "mc", q: "El último párrafo…", o: ["retoma el caso inicial y apela al lector", "presenta una solución política", "resume las estadísticas"], a: 0, why: "Rahmenstruktur: Rückkehr zu Tomás + normative Schlussaussage («no debería»)." },
      { type: "evidence", q: "Tippe den Satz an, der die Grenzen der Hilfsprojekte zeigt.", para: 3, sentenceKey: "Sin embargo" }
    ] }
};

window.LIT = {
  l1: { title: "El piso trece", kind: "Cuento (fantástico)", author: "Übungstext", lvl: 4, topic: "fant",
    paras: [
      "Desde hacía once años, Anselmo Ferrari subía cada mañana en el mismo ascensor del edificio de la calle Corrientes. Conocía de memoria el ruido de sus cables, el espejo manchado, el botón del doce que había que apretar dos veces.",
      "Aquel lunes de junio, el ascensor no se detuvo en el doce. Siguió subiendo, lento, como si dudara, y se abrió en un pasillo que Anselmo no había visto nunca. En la pared, una placa de bronce decía: «Piso 13». Él sabía muy bien que el edificio no tenía piso trece. Todos lo sabían.",
      "El pasillo olía a café recién hecho. Al fondo, una puerta entreabierta dejaba salir una luz amarilla y el sonido de una máquina de escribir. Anselmo se acercó. Sobre el escritorio había una carpeta con su nombre. Dentro, en hojas numeradas, alguien había anotado todo lo que él había hecho en los últimos once años: cada llegada, cada café, cada suspiro frente a la ventana.",
      "La última hoja estaba en blanco, salvo por una línea escrita a máquina: «Lunes. Anselmo descubre el piso trece». La tinta todavía estaba húmeda.",
      "Bajó por la escalera, corriendo, contando los pisos en voz alta. Doce, once, diez. Nadie en la oficina notó su palidez. Al día siguiente, el ascensor volvió a detenerse en el doce, como siempre. Anselmo no dijo nada. Pero desde entonces, cada vez que alguien escribe a máquina, deja de respirar un instante y escucha."
    ],
    focus: ["Irrupción de lo insólito en lo cotidiano (párr. 2)", "Detalles realistas que dan verosimilitud (párr. 1)", "Narrador en tercera persona, focalizado en Anselmo", "Ambigüedad del final: ¿realidad o alucinación?", "Tensión: pasillo, olor, luz, sonido (percepción sensorial)"] },
  l2: { title: "La caja de lata", kind: "Relato", author: "Übungstext", lvl: 4, topic: "dict",
    paras: [
      "Cuando murió la abuela, a Lucía le tocó vaciar el armario del dormitorio. Mamá había dicho que no tenía fuerzas, que ya lo haría otro día, pero los otros días fueron pasando y el armario seguía oliendo a lavanda y a silencio.",
      "Detrás de las mantas de invierno encontró una caja de lata con un dibujo de galletas medio borrado. Dentro había una foto de dos muchachos riendo delante de una fuente, una carta sin sobre y un carné de maestro de 1936 a nombre de Julián Ortega.",
      "—Mamá, ¿quién es Julián? —preguntó durante la cena.",
      "Su madre dejó el tenedor sobre el plato con mucho cuidado, como si pudiera romperse.",
      "—Era el hermano de la abuela. Se lo llevaron en el verano del treinta y seis. No volvió.",
      "—¿Adónde se lo llevaron?",
      "—Eso nunca se preguntaba en esta casa.",
      "Lucía releyó la carta aquella noche. La letra era pequeña y ordenada, de maestro. Hablaba de los alumnos, de un mapa nuevo para la escuela, de una canción que quería enseñar a su hermana. No hablaba de miedo. Al final, Julián había escrito: «Guárdame la foto hasta que vuelva».",
      "La abuela la había guardado ochenta años. Lucía cerró la caja, buscó en internet la asociación que abría fosas en la provincia y escribió un correo. Tardó mucho en pulsar «enviar». Cuando por fin lo hizo, sintió que en algún lugar alguien respiraba más tranquilo."
    ],
    focus: ["Silencio familiar vs. deseo de saber (generaciones)", "Objetos como portadores de memoria (caja, foto, carta)", "Diálogo breve y cortado = tabú", "Comparación «como si pudiera romperse»", "Final abierto y simbólico"] }
};

window.MEDIATION = {
  sm1: { title: "Mallorca: Einheimische gegen Massentourismus", lvl: 2, words: 190, topic: "turismo", len: "kurz",
    situation: "Tu amigo Pablo, de Salamanca, prepara una presentación para su clase de Economía sobre cómo se ve el turismo en España desde el extranjero. Has encontrado este artículo alemán.",
    task: "Escribe un correo electrónico a Pablo e infórmale sobre las protestas y las propuestas que menciona el artículo.",
    source: [
      "Mallorca: „Nuestra tierra, nuestro futuro“",
      "Palma de Mallorca. Mehrere tausend Menschen sind am Wochenende durch die Innenstadt von Palma gezogen. Auf ihren Schildern stand „Menos turismo, más vida“. Die Demonstrierenden – viele von ihnen junge Mallorquiner – beklagen, dass sie sich die Mieten auf ihrer eigenen Insel nicht mehr leisten können.",
      "„Ich arbeite als Krankenpfleger und wohne mit 29 Jahren noch bei meinen Eltern“, sagt Toni, einer der Organisatoren. Viele Wohnungen würden inzwischen über Online-Plattformen an Urlauber vermietet.",
      "Die Protestbewegung fordert unter anderem eine Obergrenze für Kreuzfahrtschiffe im Hafen von Palma, strengere Kontrollen illegaler Ferienwohnungen und eine höhere Touristenabgabe, deren Einnahmen in sozialen Wohnungsbau fließen sollen.",
      "Nicht alle teilen diese Sicht. Der Hotelverband betont, dass der Tourismus einen großen Teil der Arbeitsplätze auf der Insel sichere. Auch deutsche Urlauber zeigen sich überrascht: „Wir kommen seit zwanzig Jahren hierher und wussten nicht, dass es solche Probleme gibt“, sagt ein Ehepaar aus Köln."
    ],
    relevant: ["Protesta masiva en Palma, mayoría jóvenes", "Motivo: alquileres imposibles de pagar (ej. enfermero de 29 años vive con sus padres)", "Pisos alquilados a turistas por plataformas", "Propuestas: límite de cruceros, controles de pisos ilegales, ecotasa más alta para vivienda social", "Postura contraria: hoteleros – empleo", "Visión alemana: turistas alemanes sorprendidos"],
    irrelevant: ["Número exacto de manifestantes", "Nombre de la calle / el fin de semana concreto", "Ciudad de origen del matrimonio (Köln) – opcional"],
    cultural: ["«Touristenabgabe» → en Baleares ya existe un impuesto turístico (ecotasa); explicar que se pide subirla"],
    model: "Hola, Pablo:\n\n¿Qué tal va tu presentación? He encontrado un artículo en un periódico alemán sobre Mallorca que te puede venir muy bien, porque muestra cómo se ve el tema desde Alemania.\n\nCuenta que miles de personas, sobre todo jóvenes, se manifestaron en Palma bajo el lema «Menos turismo, más vida». Se quejan de que ya no pueden pagar un alquiler en su propia isla. Uno de los organizadores, un enfermero de 29 años, todavía vive con sus padres. Según el artículo, muchos pisos se alquilan ahora a turistas a través de plataformas en internet.\n\nLos manifestantes proponen limitar el número de cruceros en el puerto, controlar más los pisos turísticos ilegales y subir la ecotasa para construir viviendas sociales con ese dinero.\n\nEl artículo también da la otra versión: los hoteleros recuerdan que el turismo crea gran parte del empleo de la isla. Lo curioso para tu presentación es que algunos turistas alemanes dicen que no sabían nada de estos problemas.\n\nSi quieres, te mando el enlace.\n¡Un abrazo y suerte!\n[Nombre]",
    why: ["Anrede + Anlass (Präsentation) → Adressatenbezug", "Nur relevante Infos, eigene Sätze statt Übersetzung", "Konnektoren: según, también, lo curioso", "Kultureller Bezug: ecotasa erklärt", "E-Mail-Merkmale: Gruß, Abschluss, Angebot"] },
  sm2: { title: "Spanische Pflegekräfte in Deutschland", lvl: 3, words: 470, topic: "migr", len: "Abiturniveau",
    situation: "Tu amiga Carmen, de Granada, termina este año Enfermería. Está pensando en trabajar en Alemania, pero tiene dudas. Encuentras este artículo en una revista alemana.",
    task: "Redacta un correo electrónico a Carmen y explícale qué experiencias han hecho las enfermeras españolas en Alemania según el artículo y qué deberían tener en cuenta.",
    source: [
      "Zwischen Heimweh und Karriere: Spanische Pflegekräfte in Deutschland",
      "Als Marta García vor sieben Jahren in Frankfurt ankam, hatte sie einen Koffer, ein Anerkennungsverfahren und einen Deutschkurs auf B1-Niveau hinter sich. „Ich dachte, das reicht“, erzählt die 33-Jährige aus Valencia und lacht. „Am ersten Tag auf der Station habe ich fast nichts verstanden – vor allem nicht die Abkürzungen.“",
      "Marta ist eine von vielen Pflegekräften aus Spanien, die in den vergangenen Jahren nach Deutschland gekommen sind. Deutsche Kliniken und Pflegeheime suchen seit Langem händeringend Personal; in Spanien dagegen fanden junge Absolventinnen nach dem Studium oft nur befristete Verträge von wenigen Wochen.",
      "Doch der Neustart ist nicht immer leicht. Viele Spanierinnen berichten, dass sie sich in Deutschland zunächst „degradiert“ fühlten. Denn in Spanien ist die Pflege ein vierjähriges Universitätsstudium, und Pflegekräfte übernehmen dort Aufgaben, die in Deutschland teilweise Ärztinnen und Ärzten vorbehalten sind – etwa bestimmte Injektionen oder das Legen von Zugängen. Gleichzeitig gehört in Deutschland die sogenannte Grundpflege, also das Waschen und Anziehen von Patientinnen und Patienten, selbstverständlich zu den Aufgaben. „Das hat mich anfangs gekränkt“, sagt Marta. „Heute sehe ich, dass es einfach ein anderes System ist.“",
      "Zu den größten Hürden zählt neben der Sprache die Bürokratie. Um als Pflegefachkraft arbeiten zu dürfen, müssen ausländische Abschlüsse offiziell anerkannt werden. Das Verfahren kann mehrere Monate dauern, und bis dahin arbeiten viele als Pflegehelferinnen – mit deutlich geringerem Gehalt.",
      "Es gibt aber auch Positives. Die meisten Verträge sind unbefristet, die Bezahlung ist höher als in Spanien, und viele Kliniken bieten Fortbildungen an. Marta hat inzwischen eine Weiterbildung zur Intensivpflegerin abgeschlossen. Einige Arbeitgeber unterstützen neue Kolleginnen außerdem bei der Wohnungssuche und bezahlen Sprachkurse bis zum Niveau B2.",
      "Ob sie zurückgehen will? Marta zögert. „Meine Mutter fragt jedes Mal am Telefon. Vielleicht irgendwann. Aber ich habe hier inzwischen ein Leben.“ Ihr Rat an junge Kolleginnen in Spanien: „Lernt Deutsch, bevor ihr kommt – und zwar mehr, als ihr glaubt. Und fragt genau nach, was im Vertrag steht.“"
    ],
    relevant: ["Mucha demanda de personal en Alemania vs. contratos cortos en España", "Dificultad: idioma (B1 no basta, abreviaturas)", "Diferencia de sistemas: en España grado universitario con más competencias; en Alemania, higiene y cuidado básico (Grundpflege) forman parte del trabajo", "Burocracia: reconocimiento del título, meses; mientras tanto trabajan como auxiliares con menos sueldo", "Ventajas: contratos indefinidos, mejor sueldo, formación (ej. cuidados intensivos), ayuda con piso y cursos hasta B2", "Consejos: aprender más alemán antes, revisar el contrato"],
    irrelevant: ["Frankfurt, edad exacta de Marta", "La madre que llama por teléfono (salvo como detalle de nostalgia)"],
    cultural: ["«Grundpflege» no tiene equivalente directo: explicarlo (lavar y vestir a los pacientes)", "«Anerkennungsverfahren» → proceso de reconocimiento/homologación del título", "«Pflegehelferin» → auxiliar de enfermería"],
    model: "Querida Carmen:\n\nMe dijiste que estás pensando en venir a trabajar a Alemania, así que te escribo porque he leído un artículo muy interesante sobre enfermeras españolas aquí.\n\nLo positivo primero: en Alemania faltan muchísimos enfermeros, y los contratos suelen ser indefinidos y mejor pagados que en España. Además, muchos hospitales ofrecen formación; una enfermera valenciana, por ejemplo, se ha especializado en cuidados intensivos. Algunos empleadores incluso ayudan a buscar piso y pagan cursos de alemán hasta el nivel B2.\n\nPero también hay dificultades. La más grande es el idioma: esta enfermera llegó con un B1 y el primer día casi no entendía nada, sobre todo las abreviaturas. Otra cosa que debes saber es que el sistema es diferente. En España estudiáis cuatro años en la universidad y hacéis tareas que aquí a veces solo hacen los médicos. En cambio, en Alemania forma parte del trabajo lo que llaman «Grundpflege», es decir, lavar y vestir a los pacientes. Muchas españolas se sienten al principio como si hubieran bajado de categoría.\n\nAdemás, tu título tiene que ser reconocido oficialmente, y ese trámite puede durar varios meses. Mientras tanto, muchas trabajan como auxiliares y ganan bastante menos.\n\nLos consejos del artículo son claros: aprende más alemán del que crees necesario antes de venir y lee muy bien tu contrato.\n\nSi te decides, ¡aquí me tienes para ayudarte!\nUn abrazo,\n[Nombre]",
    why: ["Struktur nach Relevanz für Carmen (Pro → Contra → Rat), nicht nach Textreihenfolge", "Kulturspezifisches erklärt (Grundpflege, Anerkennung)", "Details weggelassen (Frankfurt, Alter)", "vosotros-Form passend für Spanien", "Register: freundlich-informell, aber klar gegliedert"] }
};
