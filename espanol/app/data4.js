/* ===== PODCASTS (Sprachausgabe über das Gerät) ===== */
window.PODCASTS = [
  { id: "p1", series: "5 Minuten Spanisch", title: "Ser y estar sin miedo", lvl: 1, min: 4,
    seg: [
      ["de", "Willkommen bei fünf Minuten Spanisch. Heute: ser und estar. Wir starten mit zwei Sätzen."],
      ["es", "Mario es cartero. Hoy Mario está muy nervioso."],
      ["de", "Im ersten Satz geht es um den Beruf, also um Identität. Deshalb ser. Im zweiten Satz geht es um einen Zustand in diesem Moment. Deshalb estar."],
      ["es", "La fiesta es en la playa. Pero mis amigos están en la playa desde las cinco."],
      ["de", "Achtung, Falle: Ein Ereignis, also die Fiesta, findet statt, deshalb ser. Personen befinden sich irgendwo, deshalb estar."],
      ["es", "La sopa está fría. Este invierno es muy frío."],
      ["de", "Die Suppe ist gerade kalt: Zustand. Der Winter ist kalt: Eigenschaft. Merksatz für die Klausur: Charakter mit ser, Stimmung mit estar."]
    ],
    vocab: [["el cartero", "der Briefträger"], ["nervioso", "nervös"], ["frío", "kalt"]],
    q: [["¿Qué verbo usas para el lugar de una fiesta?", ["ser", "estar"], 0], ["«La protagonista ___ triste en esta escena.»", ["es", "está"], 1]] },
  { id: "p2", series: "Abitur Español", title: "Sprachmittlung in 6 Schritten", lvl: 3, min: 5,
    seg: [
      ["de", "Abitur Español. Heute die Sprachmittlung. Du hast maximal sechzig Minuten und einen deutschen Text."],
      ["de", "Schritt eins: Lies zuerst die Aufgabe, nicht den Text. Wer ist der Empfänger, was will er wissen, welches Format?"],
      ["de", "Schritt zwei: Markiere im deutschen Text nur, was für diesen Empfänger wichtig ist. Alles andere lässt du weg."],
      ["de", "Schritt drei: Übersetze nicht Satz für Satz. Formuliere die Idee neu, zum Beispiel so:"],
      ["es", "Según el artículo, muchos jóvenes ya no pueden pagar un alquiler en su propia isla."],
      ["de", "Schritt vier: Erkläre kulturelle Begriffe, statt sie zu übersetzen. Zum Beispiel die Ausbildung:"],
      ["es", "En Alemania, la Ausbildung es una especie de formación profesional dual."],
      ["de", "Schritt fünf: Halte das Format ein. Eine E-Mail braucht Anrede, Anlass und Schluss. Schritt sechs: Plane zehn Minuten zum Korrigieren ein. Die Sprache zählt dreißig von fünfzig Punkten."]
    ],
    vocab: [["según", "laut"], ["una especie de", "eine Art von"], ["el alquiler", "die Miete"]],
    q: [["Was liest du bei der Sprachmittlung zuerst?", ["Den deutschen Text", "Die Aufgabe mit Situation"], 1], ["Wie viele der 50 Punkte entfallen auf die Sprache?", ["20", "30"], 1]] },
  { id: "p3", series: "Escucha y responde", title: "Una mañana en el mercado", lvl: 2, min: 3, voice: "es-MX",
    seg: [
      ["es", "Son las siete de la mañana en el mercado de Coyoacán. Doña Elena abre su puesto de frutas desde hace treinta años."],
      ["es", "Hoy la ayuda su nieto Diego, que tiene doce años. Diego no va a la escuela los sábados, así que acompaña a su abuela."],
      ["es", "Me gusta venir, dice Diego, pero entre semana prefiero estudiar. Quiero ser veterinario."],
      ["es", "Doña Elena sonríe. Yo no pude terminar la primaria. Por eso quiero que él estudie todo lo que pueda."]
    ],
    vocab: [["el puesto", "der Stand"], ["el nieto", "der Enkel"], ["la primaria", "die Grundschule"]],
    q: [["¿Cuántos años tiene Diego?", ["diez", "doce"], 1], ["¿Qué quiere ser Diego?", ["veterinario", "vendedor"], 0], ["La abuela quiere que Diego…", ["trabaje con ella", "estudie"], 1]] },
  { id: "p4", series: "Cultura Hispana", title: "Las lenguas de España", lvl: 2, min: 4,
    seg: [
      ["es", "En España no solo se habla castellano. La Constitución de 1978 establece que el castellano es la lengua oficial del Estado, y que las demás lenguas de España son también oficiales en sus comunidades autónomas."],
      ["es", "El catalán se habla en Cataluña, en las Islas Baleares y, con el nombre de valenciano, en la Comunidad Valenciana. El gallego se habla en Galicia, y el euskera, una lengua que no tiene relación con el latín, en el País Vasco y en parte de Navarra."],
      ["es", "Durante la dictadura de Franco, el uso público de estas lenguas fue reprimido. Por eso, para muchas personas, hablar su lengua es también una cuestión de identidad y de memoria."],
      ["de", "Merke für das Abitur: kooffizielle Sprachen, Autonomiestatute und die Debatte um die inmersión lingüística in der Schule."]
    ],
    vocab: [["cooficial", "kooffiziell"], ["reprimir", "unterdrücken"], ["el euskera", "Baskisch"]],
    q: [["¿Qué lengua no viene del latín?", ["el gallego", "el euskera"], 1], ["¿Qué pasó con estas lenguas durante el franquismo?", ["Fueron reprimidas", "Fueron obligatorias"], 0]] },
  { id: "p5", series: "Redemittel des Tages", title: "Si bien es cierto que…", lvl: 3, min: 2,
    seg: [
      ["de", "Redemittel des Tages: si bien es cierto que. Damit räumst du ein Gegenargument ein, bevor du widersprichst."],
      ["es", "Si bien es cierto que el turismo crea empleo, también es verdad que expulsa a los vecinos del centro."],
      ["de", "Nach si bien es cierto que steht der Indikativ. Das Redemittel passt perfekt in Teilaufgabe drei, wenn du kommentierst oder diskutierst."],
      ["es", "Si bien es cierto que las ONG ayudan mucho, no pueden sustituir al Estado."]
    ],
    vocab: [["si bien", "wenngleich, zwar"], ["sustituir", "ersetzen"], ["expulsar", "vertreiben"]],
    q: [["Welcher Modus folgt auf «si bien es cierto que»?", ["Indikativ", "Subjuntivo"], 0]] }
];

/* ===== ERKLÄRCLIPS (animierte Folien mit Sprachausgabe; ersetzen Video) ===== */
window.CLIPS = [
  { id: "c1", title: "Subjuntivo in 4 Minuten", cat: "Grammatik", lvl: 2,
    slides: [
      { h: "Wann Subjuntivo?", b: ["Wunsch & Aufforderung", "Gefühl", "Wertung", "Zweifel / Verneinung"], es: "El subjuntivo aparece cuando expresamos deseos, emociones, valoraciones o dudas.", de: "Der Subjuntivo erscheint bei Wünschen, Gefühlen, Wertungen oder Zweifeln." },
      { h: "Subjektwechsel", b: ["Quiero estudiar. (gleiches Subjekt → Infinitiv)", "Quiero que estudies. (anderes Subjekt → subj.)"], es: "Si el sujeto cambia, usamos que más subjuntivo.", de: "Wenn das Subjekt wechselt, benutzen wir que plus Subjuntivo." },
      { h: "Die Falle: creer", b: ["Creo que es verdad. → Indikativ", "No creo que sea verdad. → Subjuntivo"], es: "Creo que va con indicativo. No creo que va con subjuntivo.", de: "Creo que steht mit Indikativ. No creo que steht mit Subjuntivo." },
      { h: "Im Abitur", b: ["Es necesario que el Gobierno actúe.", "Me preocupa que tantos niños trabajen."], es: "En el comentario, las valoraciones con subjuntivo muestran un buen nivel.", de: "Im Kommentar zeigen Wertungen mit Subjuntivo ein gutes Niveau." }
    ],
    q: [["«No pienso que el texto ___ objetivo.»", ["es", "sea"], 1, "Verneinte Meinung → subjuntivo."], ["«Quiero ___ en Madrid.» (yo)", ["que viva", "vivir"], 1, "Gleiches Subjekt → Infinitiv."]],
    summary: "Subjuntivo nach Wunsch, Gefühl, Wertung, Zweifel – nur bei Subjektwechsel. Bejahtes creer/pensar → Indikativ." },
  { id: "c2", title: "Sprachmittlung: Relevanz statt Übersetzung", cat: "Mediation", lvl: 3,
    slides: [
      { h: "Die Aufgabe lesen", b: ["Situación: wer, warum?", "Tarea: Operator + Format + Fokus"], es: "Primero lee la situación y la tarea.", de: "Lies zuerst Situation und Aufgabe." },
      { h: "Filtern", b: ["Was braucht der Empfänger?", "Zahlen & Namen nur, wenn sie helfen"], es: "Selecciona solo la información relevante para el destinatario.", de: "Wähle nur die Informationen, die für den Empfänger relevant sind." },
      { h: "Umformulieren", b: ["Idee statt Wortlaut", "Kompensation: una especie de…, es decir…"], es: "Transmite el sentido, no las palabras.", de: "Übertrage den Sinn, nicht die Wörter." },
      { h: "Format", b: ["Anrede & Anlass", "Gegliederte Absätze", "Gruß"], es: "Un correo necesita saludo, motivo y despedida.", de: "Eine E-Mail braucht Anrede, Anlass und Verabschiedung." }
    ],
    q: [["Ein Detail steht im Text, ist aber für den Empfänger unwichtig. Was tust du?", ["Weglassen", "Wörtlich übersetzen"], 0, "Relevanzprinzip: Sprachmittlung ist keine Übersetzung."], ["«Grundpflege» hat kein spanisches Pendant. Was tust du?", ["Umschreiben und erklären", "Das deutsche Wort ohne Erklärung stehen lassen"], 0, "Kulturelle Begriffe erklären (Kompensationsstrategie)."]],
    summary: "Aufgabe → filtern → umformulieren → Format. Kulturspezifisches erklären." },
  { id: "c3", title: "Analizar oder comentar?", cat: "Prüfungsstrategie", lvl: 3,
    slides: [
      { h: "Teilaufgabe 2: analizar", b: ["These", "Beleg mit Zeilenangabe", "Wirkung erklären"], es: "Analizar es explicar cómo el texto produce un efecto.", de: "Analysieren heißt erklären, wie der Text eine Wirkung erzeugt." },
      { h: "Keine Meinung in TA 2", b: ["Nicht: Me parece mal…", "Sondern: Mediante la ironía, el autor critica…"], es: "En el análisis no das tu opinión personal.", de: "In der Analyse gibst du keine persönliche Meinung." },
      { h: "Teilaufgabe 3: comentar", b: ["Position", "Argumente + Beispiele (Unterricht!)", "Gegenargument", "Fazit"], es: "Comentar es opinar con argumentos y ejemplos.", de: "Kommentieren heißt: Meinung mit Argumenten und Beispielen." }
    ],
    q: [["In welcher Teilaufgabe gehört «Desde mi punto de vista…» hin?", ["Teilaufgabe 2", "Teilaufgabe 3"], 1, "Eigene Meinung gehört zu comentar/discutir (TA 3)."]],
    summary: "Analizar = Form + Wirkung mit Belegen. Comentar = begründete Meinung." }
];

/* ===== SPRECHEN ===== */
window.SPEAK = [
  { type: "Bildbeschreibung", prep: 60, talk: 90, lvl: 1, prompt: "Imagina una foto: una playa llena de sombrillas; al fondo, grandes hoteles; en primer plano, un vecino mayor con una pancarta «Turistas: bienvenidos, pero no tantos». Describe la foto y explica qué problema muestra.", check: ["En primer plano / al fondo", "Describir personas y ambiente", "Explicar el problema (masificación)", "Dar una breve opinión"] },
  { type: "Kurzvortrag", prep: 120, talk: 180, lvl: 3, prompt: "Presenta en 3 minutos las causas y consecuencias del trabajo infantil en Latinoamérica.", check: ["Introducción con el tema", "2–3 causas con conectores", "2 consecuencias", "Conclusión"] },
  { type: "Dialog / Rollenspiel", prep: 60, talk: 120, lvl: 2, prompt: "Eres estudiante de intercambio en Valencia. Tu familia de acogida quiere alquilar su piso a turistas en verano. Da tu opinión y propón una alternativa.", check: ["Saludar y reaccionar", "Argumentar con respeto", "Proponer (¿Y si…?)", "Llegar a un acuerdo"] },
  { type: "Diskussion", prep: 90, talk: 150, lvl: 3, prompt: "¿Deberían los colegios de Cataluña enseñar principalmente en catalán? Defiende una postura y responde a un contraargumento.", check: ["Postura clara", "2 argumentos", "Contraargumento + respuesta", "Subjuntivo (no creo que…)"] },
  { type: "Argumentation", prep: 60, talk: 120, lvl: 3, prompt: "«Hay que dejar el pasado en paz.» ¿Estás de acuerdo? Argumenta con ejemplos de España o de Latinoamérica.", check: ["Posición", "Ejemplo histórico (fosas, desaparecidos…)", "Argumento contrario", "Conclusión"] },
  { type: "Spontane Reaktion", prep: 15, talk: 60, lvl: 2, prompt: "Tu amigo te dice: «Después del Abitur me voy un año a Chile de voluntario.» Reacciona espontáneamente.", check: ["Reaccionar (¡Qué bien! / ¿En serio?)", "Hacer 2 preguntas", "Dar un consejo"] },
  { type: "Vorstellung (persönlich)", prep: 30, talk: 60, lvl: 1, prompt: "Preséntate: quién eres, qué te interesa de la cultura hispana y qué planes tienes después del Abitur.", check: ["Datos personales", "Intereses", "Futuro (cuando termine… + subj.)"] }
];

/* ===== SCHREIBEN (6 Stufen) ===== */
window.WRITE = [
  { lvl: 1, name: "Satzbau", task: "Verbinde die zwei Aussagen zu einem Satz mit Konnektor: «El turismo crea empleo.» / «Los alquileres suben.»", hint: "sin embargo, aunque, mientras que", min: 8 },
  { lvl: 2, name: "Absatz", task: "Schreibe einen Absatz (60–80 Wörter) über die Vor- und Nachteile, im Ausland zu arbeiten.", hint: "por un lado / por otro lado / además / en cambio", min: 60 },
  { lvl: 3, name: "Zusammenfassung", task: "Resume el blog «Mi vida en Stuttgart» (Modul Lesen) en 80–100 palabras.", hint: "Präsens, 3. Person, keine Zitate, keine Meinung. «En su blog, Laura cuenta que…»", min: 80 },
  { lvl: 4, name: "Analyse", task: "Analiza cómo el artículo «Infancias en la calle» intenta implicar al lector (120–150 palabras).", hint: "Caso de Tomás, preguntas retóricas, marco (inicio–final). These → Beleg → Wirkung.", min: 120 },
  { lvl: 5, name: "Argumentation", task: "Comenta: «La ecotasa es la mejor manera de combatir el turismo de masas.» (180–220 palabras)", hint: "Position – Argumente – Gegenargument (si bien es cierto que) – Fazit", min: 180 },
  { lvl: 6, name: "Komplette Abituraufgabe", task: "Redacta una carta al director de un periódico español en la que respondes al artículo «Infancias en la calle» y propones medidas concretas. (250–300 palabras)", hint: "Leserbrief: Bezug auf Artikel (título, fecha), Anrede «Señor director:», Argumente, Vorschläge, Gruß, Name, Ort.", min: 250 }
];

/* ===== KULTURWISSEN (Übungsmaterial) ===== */
window.CULTURE = [
  { topic: "migr", h: "Von der Auswanderung zur Einwanderung", t: "In den 1960er-Jahren wanderten viele Spanierinnen und Spanier als Gastarbeiter u. a. nach Deutschland aus. Ab den 1990er-Jahren wurde Spanien selbst Einwanderungsland (Lateinamerika, Marokko, Osteuropa). Nach der Finanzkrise 2008 verließen erneut viele junge Hochqualifizierte das Land." },
  { topic: "biling", h: "Kooffizielle Sprachen", t: "Laut Verfassung von 1978 ist Kastilisch Amtssprache des Staates; Katalanisch/Valencianisch, Galicisch und Baskisch sind in ihren autonomen Gemeinschaften kooffiziell. Unter Franco war ihr öffentlicher Gebrauch unterdrückt." },
  { topic: "turismo", h: "Tourismus als Motor und Problem", t: "Spanien gehört zu den meistbesuchten Ländern der Welt. Der Tourismus schafft viele Arbeitsplätze, führt aber zu Wohnungsmangel, Überfüllung und Wasserknappheit. Städte wie Barcelona und die Balearen regulieren Ferienwohnungen und erheben Tourismusabgaben." },
  { topic: "pobreza", h: "Kinderarbeit in Lateinamerika", t: "Ursachen: Armut, informelle Wirtschaft, fehlende soziale Absicherung, Distanz zur Schule auf dem Land. Ansätze: Sozialprogramme mit Bedingungen (Schulbesuch), NGOs, Schulspeisung, flexible Lernangebote." },
  { topic: "etnica", h: "Indigene Völker und Afrodescendientes", t: "Viele Länder Lateinamerikas sind multiethnisch und mehrsprachig (z. B. Quechua, Aymara, Guaraní, Mapudungun). Bolivien definiert sich seit der Verfassung von 2009 als plurinationaler Staat. Diskriminierung, Landrechte und Sprachrechte sind zentrale Themen." },
  { topic: "dict", h: "Diktaturen im 20. Jahrhundert", t: "Spanien: Franco-Diktatur 1939–1975, danach Transición; Ley de Memoria Histórica (2007) und Ley de Memoria Democrática (2022). Chile: Putsch 1973 gegen Allende, Diktatur Pinochet bis 1990. Argentinien: Militärdiktatur 1976–1983, «desaparecidos», Madres de Plaza de Mayo." },
  { topic: "chile", h: "Antonio Skármeta", t: "Chilenischer Autor (geb. 1940), ging nach dem Putsch 1973 ins Exil (u. a. nach Deutschland). Bekannt v. a. durch «Ardiente paciencia» (Briefträger Mario und Pablo Neruda) und Texte über das Leben unter der Diktatur und das Plebiszit von 1988." },
  { topic: "fant", h: "Lo fantástico", t: "Das Fantastische entsteht, wenn Unerklärliches in eine realistisch gezeichnete Alltagswelt einbricht und Figur wie Leser im Zweifel lässt. Wichtige Autoren: Jorge Luis Borges, Julio Cortázar; verwandt, aber nicht identisch: der magische Realismus (Gabriel García Márquez)." },
  { topic: "jovenes", h: "Junge Menschen in Spanien", t: "Hohe Jugendarbeitslosigkeit im EU-Vergleich, viele befristete Verträge, spätes Ausziehen von zu Hause (im Schnitt um die 30). Die duale Ausbildung (FP dual) wird ausgebaut." },
  { topic: "eco", h: "Wasser und Klima", t: "Dürreperioden treffen v. a. Süd- und Ostspanien; Landwirtschaft (z. B. Gewächshäuser in Almería) und Tourismus konkurrieren um Wasser. Spanien baut Solar- und Windenergie stark aus." }
];

/* ===== PRÜFUNGSSTRATEGIE ===== */
window.STRATEGY = [
  ["Aufgabe lesen", "Unterstreiche Operator, Fokus und ggf. Zieltextformat. Frage dich: Was genau wird verlangt – und was nicht?"],
  ["Operatoren verstehen", "TA 1 wiedergeben (resumir/presentar), TA 2 untersuchen (analizar/examinar), TA 3 bewerten oder gestalten (comentar/discutir/escribir)."],
  ["Zeit einteilen", "Hörverstehen ist fest getaktet (30 Min.). Sprachmittlung max. 60 Min. Für Schreiben/Lesen: Auswahl ca. 10 Min., je Teilaufgabe planen, 15–20 Min. Korrektur."],
  ["Antwort planen", "Stichpunkte auf Spanisch, Reihenfolge festlegen, passende Redemittel notieren."],
  ["Belege nutzen", "In TA 2 jede Aussage mit Zeilenangabe belegen: (l. 12) oder «…» (ll. 4–5)."],
  ["Struktur", "Einleitungssatz, Absätze pro Aspekt, Konnektoren, kurzer Schluss. Keine Einleitung in TA 2 und 3 wiederholen."],
  ["Grammatik prüfen", "Checkliste: Kongruenz, ser/estar, Vergangenheitszeiten, subjuntivo nach Wertung, Akzente."],
  ["Wortschatz prüfen", "Wiederholungen ersetzen (Synonyme), Wörterbuch für Genus und Präpositionen nutzen."],
  ["Typische Fehler", "*la problema → el problema, *la gente son → la gente es, *me gusta los libros → me gustan, *es importante que tienen → tengan, *más o menos (als Füllwort), fehlende Akzente (también, después, más, está)."],
  ["Letzte 10 Minuten", "Nicht mehr Neues schreiben. Verben, Endungen, Akzente, Satzzeichen (¿ ¡) prüfen, Absätze erkennbar?"]
];

/* ===== PROBEKLAUSUREN ===== */
window.MOCKS = [
  { id: "m1", name: "Probeklausur 1 – Geführt", lvl: 2, guided: true, hv: ["hv1"], sm: "sm1",
    sl: [{ text: "r1", src: "READ", label: "Aufgabe II (Sachtext/Blog)", tasks: [
      ["1", "Resume las experiencias de Laura en Alemania.", "Präsens, 3. Person, nur Kernaussagen (Grund, Anfang, heute, Zukunft)."],
      ["2", "Analiza cómo la autora presenta su vida en Alemania en comparación con España.", "Gegenüberstellungen (en cambio), Aufzählungen, Ausrufe, Humor, Schlussbild der Koffer."],
      ["3a", "Comenta la afirmación: «Emigrar es la mejor escuela de la vida».", "Meinung + Beispiele aus dem Unterricht (fuga de cerebros)."],
      ["3b", "Escribe un comentario en el blog de Laura desde el punto de vista de un joven que se ha quedado en España.", "Blog-Kommentar: direkte Anrede, informell, Bezug auf ihren Text."]
    ] }] },
  { id: "m2", name: "Probeklausur 2 – Standard", lvl: 3, hv: ["hv4", "hv1"], sm: "sm1",
    sl: [{ text: "l1", src: "LIT", label: "Aufgabe I (literarisch)", tasks: [
      ["1", "Resume lo que le sucede a Anselmo.", ""],
      ["2", "Analiza cómo el narrador crea una atmósfera inquietante.", ""],
      ["3a", "Comenta: «Lo fantástico nos obliga a dudar de nuestra rutina».", ""],
      ["3b", "Escribe la entrada de diario de Anselmo la noche de aquel lunes.", ""]
    ] }] },
  { id: "m3", name: "Probeklausur 3 – Anspruchsvoll", lvl: 4, hv: ["hv2", "hv3"], sm: "sm2",
    sl: [{ text: "r2", src: "READ", label: "Aufgabe II (Sachtext)", tasks: [
      ["1", "Resume la situación de los niños trabajadores según el artículo.", ""],
      ["2", "Analiza la intención de la autora y los recursos que utiliza para conseguirla.", ""],
      ["3a", "Discute las posibilidades y los límites de las ayudas condicionadas y de las ONG para combatir el trabajo infantil.", ""],
      ["3b", "Redacta una carta al director como respuesta al artículo.", ""]
    ] }] },
  { id: "m4", name: "Probeklausur 4 – Vollsimulation", lvl: 4, full: true, hv: ["hv1", "hv2", "hv3"], sm: "sm2",
    sl: [
      { text: "l2", src: "LIT", label: "Aufgabe I (literarisch)", tasks: [
        ["1", "Resume lo que Lucía descubre sobre su familia.", ""],
        ["2", "Analiza cómo se presenta la tensión entre el silencio y el deseo de recordar.", ""],
        ["3a", "Comenta la afirmación de un político: «Hay que dejar el pasado en paz». Ten en cuenta lo que has aprendido en clase sobre la memoria histórica.", ""],
        ["3b", "Escribe la respuesta que Lucía recibe de la asociación y la reacción de su madre al leerla.", ""]
      ] },
      { text: "r2", src: "READ", label: "Aufgabe II (Sachtext)", tasks: [
        ["1", "Resume la información del artículo sobre el trabajo infantil en América Latina.", ""],
        ["2", "Examina la estructura del texto y su efecto en el lector.", ""],
        ["3a", "Evalúa las medidas mencionadas en el texto a partir de lo que has aprendido en clase.", ""],
        ["3b", "Tomás tiene ahora veinticinco años. Escribe un artículo para un blog en el que cuenta cómo salió de la calle.", ""]
      ] }
    ] }
];

/* ===== DIAGNOSE ===== */
window.DIAG = {
  vocab: [
    ["el paro juvenil", ["Jugendarbeitslosigkeit", "Jugendzentrum", "Jugendstreik"], 0],
    ["la sequía", ["die Dürre", "die Sicherheit", "die Sekte"], 0],
    ["emigrar", ["einwandern", "auswandern", "wandern"], 1],
    ["la desigualdad", ["die Gleichgültigkeit", "die Ungleichheit", "die Uneinigkeit"], 1],
    ["el golpe de Estado", ["der Staatsstreich", "der Staatsbesuch", "die Staatsschuld"], 0],
    ["reivindicar", ["verzichten", "einfordern", "verteidigen"], 1],
    ["la convivencia", ["die Bequemlichkeit", "das Zusammenleben", "die Überzeugung"], 1],
    ["encarecer", ["verteuern", "vermissen", "einsperren"], 0],
    ["la beca", ["die Bank", "das Stipendium", "der Becher"], 1],
    ["lo cotidiano", ["das Alltägliche", "das Tägliche Brot", "die Zeitung"], 0]
  ],
  grammar: ["serestar", "porpara", "indefimpf", "subj1", "si", "rel"]
};

/* ===== PLAN-BAUSTEINE ===== */
window.PLANBITS = {
  grammarOrder: ["serestar", "porpara", "perfindef", "indefimpf", "pluscuam", "compar", "pron", "conect", "imper", "futcond", "subj1", "subj2", "rel", "perif", "pasiva", "indir", "si"],
  inputs: ["read", "listen", "podcast", "clip", "image"],
  tasks: ["TA1", "TA2", "SM", "TA3", "HV", "OP"],
  warmups: [
    "Pregunta del día: ¿Qué harías si fueras alcalde/sa de una ciudad turística?",
    "Nenne in 60 Sekunden 8 spanische Wörter zum heutigen Thema.",
    "Bildimpuls: Stell dir eine volle Strandpromenade im August vor. Beschreibe sie in 3 Sätzen.",
    "Grammatik-Blitz: Bilde 3 Sätze mit «es importante que» + subjuntivo.",
    "Pregunta del día: ¿Qué objeto guardarías para recordar a tu familia dentro de 80 años?",
    "Wiederhole laut 5 Redemittel aus der Kategorie Argumentieren.",
    "Pregunta del día: ¿Emigrarías para trabajar? ¿Adónde y por qué?",
    "Bildimpuls: Ein Kind verkauft an einer Ampel Süßigkeiten. Was denkt es? (3 Sätze)"
  ]
};
