/* ===== GRAMMATIK: Erklären → Beispiel → Üben → Prüfungsanwendung → Fehlerkorrektur ===== */
/* ex: [Frage, [Optionen], richtigerIndex, Erklärung] */
window.GRAMMAR = [
  { id: "serestar", t: "Ser y estar", lvl: 1,
    rule: "ser = Identität, Herkunft, Beruf, Eigenschaft, Uhrzeit, Ort von Ereignissen. estar = Ort von Personen/Dingen, Zustand, Ergebnis einer Veränderung, estar + Gerundio.",
    ex: ["Mario es cartero y es de Isla Negra.", "Hoy Mario está nervioso porque la carta está en la mesa.", "La fiesta es en casa de Beatriz."],
    mistake: ["*La reunión está en el aula 12.", "La reunión es en el aula 12. (Ereignis → ser)"],
    exam: "In der Analyse: «El protagonista está desesperado» (Zustand in der Szene) vs. «es un hombre desconfiado» (Charakterzug).",
    drill: [
      ["La situación de los temporeros ___ muy precaria este año.", ["es", "está"], 1, "Momentaufnahme/Zustand → estar. «es precaria» ginge nur als dauerhafte Eigenschaft."],
      ["El concierto contra el racismo ___ en la plaza mayor.", ["es", "está"], 0, "Ort eines Ereignisses → ser."],
      ["Jorge ___ un niño trabajador y responsable.", ["es", "está"], 0, "Charaktereigenschaft → ser."]
    ] },
  { id: "porpara", t: "Por y para", lvl: 1,
    rule: "para = Ziel, Zweck, Empfänger, Frist, Richtung. por = Grund, Ursache, Weg/Mittel, Zeitraum, Tausch, Urheber im Passiv.",
    ex: ["Estudia para ser médica.", "Emigró por la crisis.", "La novela fue escrita por Skármeta."],
    mistake: ["*Lucharon para la libertad.", "Lucharon por la libertad. (Beweggrund, für etwas kämpfen → por)"],
    exam: "Im Passiv (Analyse): «El artículo fue publicado por El País».",
    drill: [
      ["Muchos jóvenes se van a Alemania ___ encontrar trabajo.", ["por", "para"], 1, "Zweck (um zu …) → para + Infinitiv."],
      ["Los vecinos protestan ___ el aumento de los alquileres.", ["por", "para"], 0, "Grund/Anlass → por."],
      ["Tengo que entregar el blog ___ el viernes.", ["por", "para"], 1, "Frist → para."]
    ] },
  { id: "indefimpf", t: "Indefinido vs. imperfecto", lvl: 2,
    rule: "Indefinido = abgeschlossene Handlung, neue Handlung, Handlungskette (Vordergrund). Imperfecto = Beschreibung, Gewohnheit, Rahmen, laufende Handlung (Hintergrund).",
    ex: ["Cuando llegó la carta, Mario dormía.", "De niña, iba cada verano al pueblo.", "En 1975 murió Franco y empezó la Transición."],
    mistake: ["*El sábado fui a la playa y después hacía la cena.", "…y después hice la cena. (Handlungskette → indefinido)"],
    exam: "Beim Zusammenfassen einer Erzählung wechselt man meist ins Präsens (resumen). Zitate im Original bleiben unverändert.",
    drill: [
      ["Mientras la abuela ___ la historia, empezó a llover.", ["contó", "contaba"], 1, "Laufende Handlung, in die etwas Neues einbricht → imperfecto."],
      ["En 1988 los chilenos ___ «No» en el plebiscito.", ["votaron", "votaban"], 0, "Abgeschlossenes Ereignis zu einem Zeitpunkt → indefinido."],
      ["De pequeño, Luis ___ los domingos en el mercado.", ["trabajó", "trabajaba"], 1, "Gewohnheit in der Vergangenheit → imperfecto."]
    ] },
  { id: "perfindef", t: "Pretérito perfecto vs. indefinido", lvl: 2,
    rule: "In Spanien: perfecto für Vergangenes in einem noch andauernden Zeitraum (hoy, esta semana, este año, nunca, ya). indefinido für abgeschlossene Zeiträume (ayer, en 2010, el año pasado). In Lateinamerika wird oft auch für nahe Vergangenheit das indefinido verwendet.",
    ex: ["Este año han llegado más turistas que nunca.", "El año pasado llegaron 85 millones de turistas.", "¿Ya has leído el cuento?"],
    mistake: ["*Ayer he visto a Marta.", "Ayer vi a Marta."],
    exam: "In Sachtexten aus Spanien: «El Gobierno ha aprobado una ley» = aktuell relevante Nachricht.",
    drill: [
      ["Esta semana el ayuntamiento ___ nuevas medidas.", ["aprobó", "ha aprobado"], 1, "«esta semana» = noch nicht abgeschlossener Zeitraum → perfecto (Spanien)."],
      ["En 2022 España ___ la Ley de Memoria Democrática.", ["ha aprobado", "aprobó"], 1, "Abgeschlossenes Jahr → indefinido."],
      ["Nunca ___ en un piso turístico.", ["he dormido", "dormí"], 0, "«nunca» (bis jetzt) → perfecto."]
    ] },
  { id: "pluscuam", t: "Pluscuamperfecto", lvl: 2,
    rule: "había + participio = Vorvergangenheit: Handlung vor einer anderen vergangenen Handlung.",
    ex: ["Cuando volvió del exilio, su pueblo había cambiado por completo.", "Ya habían cerrado la frontera."],
    mistake: ["*Cuando llegué, la clase empezó ya.", "Cuando llegué, la clase ya había empezado."],
    exam: "Nützlich für Figurenvorgeschichte in der Analyse: «Antes de la escena, la protagonista había perdido a su padre.»",
    drill: [
      ["Cuando la policía llegó, los manifestantes ya ___.", ["se fueron", "se habían ido"], 1, "Vorzeitigkeit zur Ankunft der Polizei → pluscuamperfecto."],
      ["La abuela nunca ___ de su hermano hasta aquel día.", ["había hablado", "hablaba"], 0, "Vorzeitig und abgeschlossen bis zu einem Punkt → pluscuamperfecto."]
    ] },
  { id: "subj1", t: "Subjuntivo presente (Auslöser)", lvl: 2,
    rule: "Subjuntivo nach Wunsch/Aufforderung (querer que, pedir que), Gefühl (me alegra que, temer que), Wertung (es importante/necesario/lógico que), Zweifel/Verneinung von Meinung (no creo que, dudo que). Voraussetzung: Subjektwechsel.",
    ex: ["Es necesario que el Gobierno actúe.", "No creo que el turismo sea el único problema.", "Me preocupa que tantos niños trabajen."],
    mistake: ["*Es importante que los jóvenes tienen oportunidades.", "…que los jóvenes tengan oportunidades."],
    exam: "Teilaufgabe 3 (comentar): Werturteile fast immer mit subjuntivo – das zeigt Sprachvielfalt (Kriterium Satzbau).",
    drill: [
      ["Es fundamental que las ONG ___ con el Estado.", ["colaboran", "colaboren"], 1, "Wertung «es fundamental que» → subjuntivo."],
      ["Creo que la inmersión lingüística ___ ventajas.", ["tiene", "tenga"], 0, "Bejahtes «creo que» → indicativo. Erst «no creo que» verlangt subjuntivo."],
      ["Los vecinos piden que el ayuntamiento ___ los pisos turísticos.", ["limita", "limite"], 1, "Aufforderung «pedir que» → subjuntivo."]
    ] },
  { id: "subj2", t: "Subjuntivo nach Konjunktionen", lvl: 3,
    rule: "Immer subjuntivo: para que, sin que, antes de que, a no ser que, con tal de que. Zeitkonjunktionen (cuando, en cuanto, hasta que) mit Zukunftsbezug → subjuntivo. aunque + subj. = selbst wenn (hypothetisch/unerheblich), aunque + ind. = obwohl (Tatsache).",
    ex: ["Cuando termine el bachillerato, haré un año sabático.", "La ONG trabaja para que los niños vuelvan a la escuela.", "Aunque llueva, iremos."],
    mistake: ["*Cuando tendré 18 años…", "Cuando tenga 18 años…"],
    exam: "Im Blog oder Leserbrief (produktive Aufgabe) zeigt «para que» + subj. Zweckformulierung auf Abiturniveau.",
    drill: [
      ["Cuando ___ el examen, iré a Valencia.", ["apruebo", "apruebe"], 1, "Zeitkonjunktion mit Zukunftsbezug → subjuntivo."],
      ["Los padres trabajan para que sus hijos ___ estudiar.", ["pueden", "puedan"], 1, "«para que» verlangt immer subjuntivo."],
      ["Aunque ___ muchos turistas, la ciudad vive de ellos. (Tatsache)", ["molestan", "molesten"], 0, "Tatsache → aunque + indicativo = obwohl."]
    ] },
  { id: "si", t: "Bedingungssätze (si)", lvl: 3,
    rule: "Real: si + presente → presente/futuro/imperativo. Irreal Gegenwart: si + imperfecto de subjuntivo → condicional. Irreal Vergangenheit: si + pluscuamperfecto de subjuntivo → condicional compuesto.",
    ex: ["Si llueve, no vamos.", "Si tuviera dinero, viajaría a Chile.", "Si hubiera sabido la verdad, habría actuado de otra manera."],
    mistake: ["*Si tendría tiempo, te ayudaría.", "Si tuviera tiempo, te ayudaría. (nie condicional nach si)"],
    exam: "Perfekt für Teilaufgabe 3 (Tagebucheintrag, innerer Monolog): «Si mi hermano no hubiera emigrado…»",
    drill: [
      ["Si el Gobierno ___ más en educación, habría menos trabajo infantil.", ["invertiría", "invirtiera"], 1, "Irrealer Bedingungssatz → si + imperfecto de subjuntivo."],
      ["Si ___ tiempo mañana, te llamo.", ["tengo", "tuviera"], 0, "Reale Bedingung → si + presente."],
      ["Si la protagonista hubiera hablado antes, ___ la tragedia.", ["habría evitado", "evitaría"], 0, "Irreal Vergangenheit → condicional compuesto."]
    ] },
  { id: "futcond", t: "Futuro y condicional", lvl: 2,
    rule: "Futuro simple: Zukunft, Vermutung in der Gegenwart («Serán las ocho»). Condicional: Höflichkeit, Ratschlag, Zukunft in der Vergangenheit, Vermutung über Vergangenes.",
    ex: ["En 2050 faltará agua en el sur.", "Deberías leer el artículo.", "Dijo que volvería pronto."],
    mistake: ["*Dijo que volverá mañana. (bei Vergangenheit im Hauptsatz)", "Dijo que volvería al día siguiente."],
    exam: "Ratschläge in Sprachmittlungs-E-Mails: «Te recomendaría que…», «Podrías…».",
    drill: [
      ["El ministro anunció que ___ nuevas medidas.", ["tomará", "tomaría"], 1, "Zukunft aus Sicht der Vergangenheit → condicional."],
      ["¿Dónde está Ana? – No sé, ___ en la biblioteca.", ["estará", "estaría"], 0, "Vermutung über die Gegenwart → futuro."]
    ] },
  { id: "pron", t: "Objektpronomen", lvl: 2,
    rule: "Direktes Objekt: lo, la, los, las. Indirektes: le, les. Zusammen: le/les wird zu se (se lo doy). Stellung: vor dem konjugierten Verb oder angehängt an Infinitiv/Gerundio/bejahten Imperativ.",
    ex: ["¿La carta? Se la di a Mario.", "Quiero explicártelo.", "Dímelo."],
    mistake: ["*Le lo dije.", "Se lo dije."],
    exam: "Vermeidet Wiederholungen – Kriterium «ohne unnötige Wiederholungen».",
    drill: [
      ["¿Has enviado el correo a Julieta? – Sí, ya ___ he enviado.", ["le lo", "se lo"], 1, "le + lo → se lo."],
      ["Los datos del artículo: tengo que ___ a mi amigo.", ["explicárselos", "explicarlos le"], 0, "Pronomen hängen am Infinitiv: indirektes (se) vor direktem (los)."]
    ] },
  { id: "rel", t: "Relativsätze", lvl: 3,
    rule: "que (Standard), quien(es) (Personen nach Präposition), el/la/los/las que, el cual (nach Präposition, gehoben), lo que (das, was), cuyo/a (dessen/deren, stimmt mit dem Folgenden überein), donde.",
    ex: ["La chica con quien hablé es de Bilbao.", "Lo que más me sorprende es el final.", "El autor, cuya novela leímos, vive en Chile."],
    mistake: ["*El chico que su padre es médico…", "El chico cuyo padre es médico…"],
    exam: "Relativsätze verdichten Informationen im resumen (Teilaufgabe 1).",
    drill: [
      ["___ el autor critica es la hipocresía de los políticos.", ["Que", "Lo que"], 1, "«Das, was» → lo que."],
      ["La ONG, ___ objetivo es escolarizar a los niños, recibe ayuda de Europa.", ["cuyo", "cuya"], 0, "cuyo richtet sich nach «objetivo» (maskulin)."],
      ["Los jóvenes con ___ hablé quieren emigrar.", ["que", "quienes"], 1, "Personen nach Präposition → quienes (auch: los que)."]
    ] },
  { id: "conect", t: "Konnektoren", lvl: 2,
    rule: "Zusatz: además, asimismo. Gegensatz: sin embargo, no obstante, en cambio. Grund: ya que, puesto que, debido a. Folge: por lo tanto, por consiguiente, de ahí que (+subj.). Einräumung: aunque, si bien. Abschluss: en definitiva, en resumen.",
    ex: ["El turismo crea empleo; sin embargo, encarece la vivienda.", "Puesto que el texto es irónico, …", "De ahí que muchos jóvenes emigren."],
    mistake: ["*Pero, sin embargo, …", "Nur eines davon verwenden."],
    exam: "Kriterium «sachgerecht strukturierter Text»: Absätze mit Konnektoren verbinden.",
    drill: [
      ["El sector turístico genera empleo. ___, muchos contratos son temporales.", ["Además", "No obstante"], 1, "Gegensatz → no obstante."],
      ["Los alquileres suben; ___, muchos vecinos abandonan el centro.", ["por consiguiente", "aunque"], 0, "Folge → por consiguiente."],
      ["___ el protagonista tiene miedo, no dice nada.", ["Por lo tanto", "Como"], 1, "Grund am Satzanfang → como."]
    ] },
  { id: "pasiva", t: "Passiv", lvl: 3,
    rule: "ser + participio (+ por): Vorgangspassiv, v. a. in Sachtexten. Häufiger: pasiva refleja (se + Verb in 3. Person, kongruent). estar + participio: Zustandspassiv.",
    ex: ["La ley fue aprobada en 2022.", "Se construyeron muchos hoteles.", "La playa está contaminada."],
    mistake: ["*Se vende pisos.", "Se venden pisos."],
    exam: "Unpersönliche Formulierung in Analyse: «Se trata de un artículo…», «Se nota que…».",
    drill: [
      ["En la costa ___ demasiados hoteles.", ["se construyó", "se construyeron"], 1, "pasiva refleja: Verb kongruent mit «hoteles» (Plural)."],
      ["El cuento ___ en 1956.", ["fue publicado", "estuvo publicado"], 0, "Vorgang → ser + participio."]
    ] },
  { id: "indir", t: "Indirekte Rede", lvl: 3,
    rule: "Einleitendes Verb in Vergangenheit → Zeitverschiebung: presente → imperfecto, indefinido/perfecto → pluscuamperfecto, futuro → condicional, imperativo → imperfecto de subjuntivo. Orts-/Zeitangaben anpassen (hoy → aquel día, aquí → allí).",
    ex: ["«Vuelvo mañana» → Dijo que volvía al día siguiente.", "«Ven» → Le pidió que viniera."],
    mistake: ["*Le pidió que viene.", "Le pidió que viniera."],
    exam: "Sprachmittlung: Aussagen aus dem deutschen Text wiedergeben («La autora afirma que…»).",
    drill: [
      ["«Estoy cansada», dijo Rosa. → Rosa dijo que ___ cansada.", ["está", "estaba"], 1, "presente → imperfecto."],
      ["«Cierra la puerta», me pidió. → Me pidió que ___ la puerta.", ["cerraba", "cerrara"], 1, "Aufforderung → imperfecto de subjuntivo."],
      ["«Hemos perdido todo», contaron. → Contaron que lo ___ perdido todo.", ["habían", "han"], 0, "perfecto → pluscuamperfecto."]
    ] },
  { id: "perif", t: "Gerundio und Verbalperiphrasen", lvl: 2,
    rule: "estar + gerundio (Verlauf), seguir + gerundio (weiterhin), llevar + Zeit + gerundio (seit), acabar de + inf. (gerade), volver a + inf. (wieder), dejar de + inf. (aufhören).",
    ex: ["Lleva tres años viviendo en Berlín.", "Sigue buscando a su hermano.", "Dejó de trabajar a los doce años."],
    mistake: ["*Estoy sabiendo la respuesta.", "Zustandsverben (saber, tener) nicht mit estar + gerundio."],
    exam: "Periphrasen machen den Stil variabel (Kriterium Ausdrucksvermögen).",
    drill: [
      ["Las madres ___ más de cuarenta años buscando a sus hijos.", ["llevan", "siguen"], 0, "Zeitdauer + gerundio → llevar (seit … tun). seguir bräuchte keine Dauerangabe."],
      ["Mi hermano ___ fumar el año pasado.", ["dejó de", "volvió a"], 0, "aufhören → dejar de + inf."]
    ] },
  { id: "imper", t: "Imperativ", lvl: 1,
    rule: "Bejaht tú: 3. Pers. Sg. presente (habla). Verneint und usted/ustedes: Formen des subjuntivo (no hables, hable usted). Pronomen: angehängt beim bejahten, vorangestellt beim verneinten Imperativ.",
    ex: ["Lee el artículo y dime qué piensas.", "No te preocupes.", "Siéntese, por favor."],
    mistake: ["*No hablas tan alto.", "No hables tan alto."],
    exam: "Blog / Leserbrief: Appell an die Leser («Pensad antes de reservar un piso turístico»).",
    drill: [
      ["No ___ la basura en la playa. (tú)", ["tiras", "tires"], 1, "Verneinter Imperativ → subjuntivo."],
      ["___ el correo antes de enviarlo. (tú, revisar + lo)", ["Revísalo", "Lo revisa"], 0, "Bejahter Imperativ: Pronomen wird angehängt, Akzent setzen."]
    ] },
  { id: "compar", t: "Vergleiche", lvl: 1,
    rule: "más/menos + Adj. + que; tan + Adj. + como; tanto/a/os/as + Subst. + como. Unregelmäßig: mejor, peor, mayor, menor. Vor Zahlen: más de.",
    ex: ["Barcelona recibe más turistas que Madrid.", "El problema es tan grave como antes.", "Más de la mitad de los jóvenes…"],
    mistake: ["*más bueno que", "mejor que"],
    exam: "Operator comparar: Gemeinsamkeiten (al igual que, tanto … como) und Unterschiede (mientras que, a diferencia de).",
    drill: [
      ["Hoy hay ___ turistas ___ hace diez años.", ["más … que", "tan … como"], 0, "Ungleichheit mit Substantiv → más … que."],
      ["En el pueblo viven ___ 500 personas.", ["más que", "más de"], 1, "Vor Zahlen → más de."]
    ] }
];

/* ===== REDEMITTEL: [es, Erklärung, Beispiel] ===== */
window.REDEMITTEL = [
  { cat: "Einleitung", items: [
    ["El texto «…», publicado en … en …, trata de …", "Textsorte, Quelle, Thema in einem Satz", "El artículo «Vecinos contra maletas», publicado en El País en 2025, trata de las protestas contra el turismo de masas."],
    ["Se trata de un fragmento de la novela … de …", "Literarischen Auszug einordnen", "Se trata de un fragmento del cuento «El piso trece»."],
    ["El tema central es …", "Hauptthema benennen", "El tema central es la búsqueda de un familiar desaparecido."],
    ["En lo que sigue voy a analizar …", "Aufbau der eigenen Antwort ankündigen", "En lo que sigue voy a analizar los recursos que usa la autora."]
  ] },
  { cat: "Beschreiben & Vergleichen", items: [
    ["Al igual que …, …", "Gemeinsamkeit", "Al igual que Jorge, muchos niños trabajan en la calle."],
    ["A diferencia de …, …", "Unterschied", "A diferencia de su madre, Lucía quiere saber la verdad."],
    ["mientras que", "Gegenüberstellung im Satz", "Los turistas buscan sol, mientras que los vecinos buscan tranquilidad."],
    ["Tanto … como …", "Beides zugleich", "Tanto el narrador como el lector dudan de lo ocurrido."]
  ] },
  { cat: "Analyse", items: [
    ["El autor / la autora recurre a …", "Stilmittel benennen", "La autora recurre a preguntas retóricas para implicar al lector."],
    ["Mediante … consigue …", "Mittel + Wirkung verbinden (Form–Inhalt)", "Mediante la enumeración consigue transmitir el caos de la ciudad."],
    ["Esto se ve reflejado en la línea …", "Beleg einleiten", "Esto se ve reflejado en la línea 12: «…»."],
    ["Con ello pretende …", "Absicht/Intention", "Con ello pretende despertar la conciencia del lector."],
    ["El tono es … (irónico, crítico, melancólico)", "Ton bestimmen", "El tono es irónico, sobre todo en el título."],
    ["El narrador en primera persona permite …", "Erzählperspektive + Wirkung", "El narrador en primera persona permite al lector compartir su inseguridad."]
  ] },
  { cat: "Argumentieren", items: [
    ["Desde mi punto de vista, …", "Eigene Meinung (Indikativ)", "Desde mi punto de vista, la ecotasa es necesaria."],
    ["No creo que + subj.", "Verneinte Meinung", "No creo que prohibir los pisos turísticos sea la solución."],
    ["Por un lado …, por otro lado …", "Abwägen", "Por un lado, el turismo crea empleo; por otro lado, expulsa a los vecinos."],
    ["Si bien es cierto que …, …", "Gegenargument einräumen", "Si bien es cierto que la ONG ayuda, no sustituye al Estado."],
    ["Un ejemplo claro de ello es …", "Beispiel anführen", "Un ejemplo claro de ello es Mallorca."],
    ["Estoy de acuerdo con …, sin embargo …", "Teilweise Zustimmung", "Estoy de acuerdo con el autor; sin embargo, olvida el papel de los jóvenes."],
    ["Me opongo a la idea de que + subj.", "Widerspruch", "Me opongo a la idea de que la pobreza sea inevitable."]
  ] },
  { cat: "Sprachmittlung", items: [
    ["He leído un artículo en … que te puede interesar.", "Einstieg mit Anlass für den Empfänger", "He leído un artículo en la revista Der Spiegel que te puede interesar para tu proyecto."],
    ["Según el texto, …", "Information aus Quelle wiedergeben", "Según el texto, cada vez más enfermeras españolas trabajan en Alemania."],
    ["Lo más importante para ti es que …", "Relevanz für Empfänger markieren", "Lo más importante para ti es que las prácticas son remuneradas."],
    ["En Alemania, el/la … es una especie de …", "Kulturspezifischen Begriff erklären (statt übersetzen)", "En Alemania, la «Ausbildung» es una especie de formación profesional dual."],
    ["Si quieres saber más, …", "Abschluss mit Angebot", "Si quieres saber más, te mando el enlace."]
  ] },
  { cat: "Schluss", items: [
    ["En resumen / En definitiva, …", "Zusammenfassen", "En definitiva, el texto muestra que la memoria es un deber colectivo."],
    ["Para concluir, cabe destacar que …", "Wichtigsten Punkt hervorheben", "Para concluir, cabe destacar que el problema tiene solución."],
    ["Por todo ello, considero que …", "Abschließende Position", "Por todo ello, considero que el turismo debe regularse."]
  ] }
];

/* ===== OPERATOREN (offizielle Liste ab Abitur 2025; Erklärungen hier in eigenen Worten) ===== */
/* ta = typische Teilaufgabe (Übungshinweis, nicht amtlich) */
window.OPERATORS = {
  SL: [
    ["resumir", "Das Wesentliche knapp in eigenen Worten wiedergeben", "Nur Kernaussagen, keine Details, keine eigene Wertung, Präsens.", "Resume lo que dice el artículo sobre los pisos turísticos en Valencia.", 1],
    ["presentar", "Etwas oder jemanden vorstellen", "Personen, Situation oder Positionen geordnet darstellen.", "Presenta a la protagonista y su relación con su abuela.", 1],
    ["describir", "Geordnet und logisch beschreiben", "Merkmale einer Situation/Figur systematisch nennen, ohne Deutung.", "Describe la situación de la familia al principio del cuento.", 1],
    ["exponer", "Bestimmte Aspekte darlegen, ohne alle Details", "Ausgewählte Punkte klar darstellen, gezielt statt vollständig.", "Expón los argumentos del alcalde a favor de la ecotasa.", 1],
    ["retratar", "Aus einer bestimmten Sicht darstellen / porträtieren", "Figur mit Belegen aus einem bestimmten Blickwinkel charakterisieren.", "Retrata al abuelo desde la perspectiva de su nieta.", 2],
    ["analizar", "Einzelne Aspekte untersuchen und erklären – mit Blick auf die Gesamtaussage", "These → Beleg (Zitat, Zeile) → Wirkung. Form und Inhalt verbinden.", "Analiza cómo el narrador crea una atmósfera inquietante.", 2],
    ["examinar", "Bestimmte Aspekte gründlich untersuchen und erklären", "Wie analizar, aber auf einen Aspekt fokussiert und in die Tiefe.", "Examina el comportamiento de los vecinos y su efecto en el lector.", 2],
    ["explicar", "Etwas verständlich machen", "Ursachen, Zusammenhänge, Hintergründe klar erläutern.", "Explica por qué Lucía decide abrir la caja.", 2],
    ["comparar", "Beziehungen, Gemeinsamkeiten und Unterschiede herausarbeiten", "Kriterien festlegen, dann Punkt für Punkt vergleichen, Fazit.", "Compara la situación de Tomás con la de otros niños que conoces de clase.", 2],
    ["comentar", "Persönlich Stellung nehmen, logisch argumentiert, gestützt auf Text, Fachwissen oder Erfahrung", "Position, Argumente mit Beispielen, Gegenargument, Schluss.", "Comenta la afirmación: «El turismo es la gallina de los huevos de oro».", 3],
    ["discutir", "Pro und Contra herausarbeiten, abwägen und zu einem Schluss kommen", "Beide Seiten gewichten, begründetes Fazit.", "Discute las ventajas y los límites de la inmersión lingüística.", 3],
    ["evaluar", "Wert oder Stand von etwas bestimmen", "Kriterien nennen, messen, zu einem Urteil kommen.", "Evalúa el éxito de las medidas contra la masificación en Mallorca.", 3],
    ["juzgar", "Positiv oder negativ bewerten, mit logischen Argumenten", "Klares Urteil, begründet.", "Juzga la decisión de la madre de callar el pasado.", 3],
    ["expresar su opinión", "Die eigene Meinung begründet äußern", "Klare Meinung mit Argumenten.", "Expresa tu opinión sobre la ecotasa.", 3],
    ["escribir", "Einen Text nach vorgegebenen Kriterien verfassen", "Zieltextformat (Blog, Brief …) einhalten, Adressat beachten.", "Escribe la entrada de diario de Lucía esa misma noche.", 3],
    ["redactar", "Einen Text nach vorgegebenen Kriterien verfassen", "Wie escribir; oft Leserbrief oder Artikel.", "Redacta una carta al director en la que respondes al artículo.", 3]
  ],
  SM: [
    ["comunicar", "Informationen passend zu Text und Situation übermitteln"],
    ["explicar", "Etwas verständlich machen, passend zu Text und Situation"],
    ["informar", "Jemanden über etwas in Kenntnis setzen"],
    ["presentar", "Etwas/jemanden vorstellen, passend zur Situation"],
    ["resumir", "Informationen zusammengefasst übermitteln, passend zur Situation"]
  ],
  HV: [
    ["apuntar", "notieren (z. B. eine Zahl, einen Begriff)"],
    ["completar", "Satz / Tabelle ergänzen"],
    ["rellenar", "Lücken füllen"],
    ["contestar", "Fragen (kurz) beantworten"],
    ["marcar", "Richtige Lösung ankreuzen"],
    ["relacionar", "Zuordnen"],
    ["tomar apuntes", "Stichpunkte notieren"]
  ]
};
