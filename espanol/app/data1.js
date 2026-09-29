/* ===== OFFIZIELLE NRW-GRUNDLAGEN (Abitur 2027) ===== */
window.OFFICIAL = {
  examDate: "2027-04-15T09:00:00+02:00",
  examDateLabel: "Donnerstag, 15. April 2027, 9:00 Uhr",
  kurse: {
    GKn: {
      name: "Grundkurs neu einsetzend",
      short: "GK n",
      dauer: 255,
      teile: [
        { key: "SM", name: "Sprachmittlung (isoliert)", min: 60, pts: 50, note: "max. 60 Min., deutscher Sach-/Gebrauchstext 400–500 Wörter" },
        { key: "SL", name: "Schreiben / Leseverstehen (integriert)", min: 195, pts: 110, note: "Text max. 550 Wörter, Wahl Aufgabe I (literarisch) oder II (Sachtext)" }
      ],
      ger: "B1 mit Anteilen von B2",
      hv: false
    },
    GKf: {
      name: "Grundkurs fortgeführt",
      short: "GK f",
      dauer: 285,
      teile: [
        { key: "HV", name: "Hörverstehen (isoliert)", min: 30, pts: 40, note: "ca. 3 Hörtexte, zusammen ca. 10 Min., je zweimal gehört" },
        { key: "SM", name: "Sprachmittlung (isoliert)", min: 60, pts: 50, note: "max. 60 Min., deutscher Sach-/Gebrauchstext 450–650 Wörter" },
        { key: "SL", name: "Schreiben / Leseverstehen (integriert)", min: 195, pts: 110, note: "Text max. 800 Wörter, Wahl Aufgabe I oder II" }
      ],
      ger: "B2, in einzelnen Bereichen Anteile von C1",
      hv: true
    },
    LK: {
      name: "Leistungskurs",
      short: "LK",
      dauer: 315,
      teile: [
        { key: "HV", name: "Hörverstehen (isoliert)", min: 30, pts: 40, note: "ca. 3 Hörtexte, zusammen ca. 10 Min., je zweimal gehört; auch inferierendes Hören" },
        { key: "SM", name: "Sprachmittlung (isoliert)", min: 60, pts: 50, note: "max. 60 Min., deutscher Sach-/Gebrauchstext 450–650 Wörter" },
        { key: "SL", name: "Schreiben / Leseverstehen (integriert)", min: 225, pts: 110, note: "Text max. 1.000 Wörter, Wahl Aufgabe I oder II" }
      ],
      ger: "B2 mit Anteilen von C1",
      hv: true
    }
  },
  // Fokussierungen laut Vorgaben 2027 (spanisch wie im Original betitelt)
  fokus: {
    GKn: [
      { t: "Vivir y convivir en una España multicultural y plurilingüe", topic: "migr" },
      { t: "España y el turismo: economía, cultura, sostenibilidad y ocio", topic: "turismo" },
      { t: "Latinoamérica: el desafío de la pobreza infantil", topic: "pobreza" },
      { t: "Latinoamérica: retos y oportunidades de la diversidad étnica", topic: "etnica" },
      { t: "La realidad chilena en la literatura de Antonio Skármeta", topic: "chile" }
    ],
    GKf: [
      { t: "España, país de inmigración y emigración", topic: "migr" },
      { t: "El bilingüismo como faceta de la sociedad española", topic: "biling" },
      { t: "España y el turismo: economía, cultura, sostenibilidad y ocio", topic: "turismo" },
      { t: "Latinoamérica: el desafío de la pobreza infantil", topic: "pobreza" },
      { t: "Latinoamérica: retos y oportunidades de la diversidad étnica", topic: "etnica" },
      { t: "Latinoamérica: libertad y dictadura a partir del siglo XX (con enfoques literarios)", topic: "dict" }
    ],
    LK: [
      { t: "España, país de inmigración y emigración", topic: "migr" },
      { t: "El bilingüismo y sus implicaciones políticas y culturales en la sociedad española", topic: "biling" },
      { t: "España y el turismo: economía, cultura, sostenibilidad y ocio", topic: "turismo" },
      { t: "Lo fantástico en la literatura latinoamericana", topic: "fant" },
      { t: "Latinoamérica: el desafío de la pobreza infantil", topic: "pobreza" },
      { t: "Latinoamérica: retos y oportunidades de la diversidad étnica", topic: "etnica" },
      { t: "España y Latinoamérica: la recuperación de la memoria histórica de las dictaduras del siglo XX (con enfoques literarios)", topic: "dict" }
    ]
  },
  themenfelder: {
    GKn: ["Alltagswirklichkeiten und berufliche Perspektiven junger Menschen", "Gegenwärtige politische und gesellschaftliche Diskussionen", "Historische und kulturelle Entwicklungen", "Globale Herausforderungen und Zukunftsentwürfe"],
    GKf: ["Alltagswirklichkeiten und berufliche Perspektiven junger Menschen", "Gegenwärtige politische und gesellschaftliche Diskussionen", "Historische und kulturelle Entwicklungen", "Globale Herausforderungen und Zukunftsentwürfe"],
    LK: ["Alltagswirklichkeiten und berufliche Perspektiven junger Menschen", "Gegenwärtige politische und gesellschaftliche Diskussionen", "Historische und kulturelle Entwicklungen", "Globale Herausforderungen und Zukunftsentwürfe"]
  },
  zieltexte: ["Leserbrief (carta al director)", "Brief / E-Mail", "Artikel (Zeitung oder Internet)", "Blog", "Tagebucheintrag"],
  hilfsmittel: ["Ein- und zweisprachiges Wörterbuch", "Herkunftssprachliches Wörterbuch (wenn Herkunftssprache nicht Deutsch)", "Wörterbuch zur deutschen Rechtschreibung"],
  bewertungSL: {
    inhalt: 44, sprache: 66,
    kriterien: [
      ["Kommunikative Textgestaltung", [["Ausrichtung auf Intention und Adressat", 6], ["Textsortenmerkmale des Zieltextformats", 4], ["Sachgerecht strukturierter Text", 5], ["Hinreichend ausführlich, ohne Wiederholungen", 4], ["Funktionale Verweise und Zitate", 3]]],
      ["Ausdrucksvermögen / Verfügen über sprachliche Mittel", [["Löst sich vom Wortlaut, formuliert eigenständig", 5], ["Allgemeiner und thematischer Wortschatz", 6], ["Wortschatz zur Textproduktion und Textbesprechung", 4], ["Variabler, angemessener Satzbau", 7]]],
      ["Sprachrichtigkeit", [["Wortschatz", 9], ["Grammatik", 9], ["Orthografie (Rechtschreibung, Zeichensetzung)", 4]]]
    ]
  },
  bewertungSM: { inhalt: 20, textgestaltung: 10, ausdruck: 10, richtigkeit: 10 },
  // Umrechnung Gesamtpunkte (200) -> Notenpunkte laut Konstruktionshinweisen
  noten200: [[190,15],[180,14],[170,13],[160,12],[150,11],[140,10],[130,9],[120,8],[110,7],[100,6],[90,5],[80,4],[66,3],[54,2],[40,1],[0,0]],
  noten160: [[152,15],[144,14],[136,13],[128,12],[120,11],[112,10],[104,9],[96,8],[88,7],[80,6],[72,5],[64,4],[53,3],[43,2],[32,1],[0,0]],
  sources: [
    { name: "Vorgaben Abitur 2027 – Spanisch (geänderte Fassung, 25.08.2025)", url: "https://www.standardsicherung.schulministerium.nrw.de/system/files/media/document/file/spanisch_2027_gg_neu.pdf" },
    { name: "Operatorenübersicht Spanisch, gültig ab Abitur 2025 (23.09.2024)", url: "https://www.standardsicherung.schulministerium.nrw.de/system/files/media/document/file/s_operatoren_ab_abitur2025.pdf" },
    { name: "Konstruktionshinweise Klausuren moderne Fremdsprachen GOSt (27.10.2025)", url: "https://www.standardsicherung.schulministerium.nrw.de/system/files/media/document/file/konstruktionshinweise_klausuren_modernefs_gost_okt2025_0.pdf" },
    { name: "Termine Zentralabitur 2027 (RdErl. 30.05.2025) + Anlage A", url: "https://www.standardsicherung.schulministerium.nrw.de/zentralabitur-gost/termine/2027" },
    { name: "Fachseite Spanisch GOSt – Standardsicherung NRW", url: "https://www.standardsicherung.schulministerium.nrw.de/zentralabitur-gost/faecher/spanisch-gost" },
    { name: "Handreichung Mündliche Prüfungen in den modernen Fremdsprachen (Referenzniveaus)", url: "https://www.standardsicherung.schulministerium.nrw.de/cms/upload/angebote/muendliche_kompetenzen/docs/2014-09_Handreichung_Muendliche_Pruefungen.pdf" },
    { name: "Kernlehrplan Spanisch Sek. II (Lehrplannavigator)", url: "https://lehrplannavigator.nrw.de/sekundarstufe-ii/kernlehrplaene-fuer-die-gymnasiale-oberstufe-2013/spanisch-gymnasiale-oberstufe" }
  ]
};

/* ===== THEMEN (Schlüssel = Vokabelkategorien) ===== */
window.TOPICS = {
  migr: { es: "Migración y convivencia", de: "Migration & Zusammenleben in Spanien", official: true },
  biling: { es: "Bilingüismo y regiones", de: "Regionalsprachen & Autonomien", official: true },
  turismo: { es: "Turismo", de: "Tourismus in Spanien", official: true },
  pobreza: { es: "Pobreza infantil", de: "Kinderarmut in Lateinamerika", official: true },
  etnica: { es: "Diversidad étnica", de: "Ethnische Vielfalt in Lateinamerika", official: true },
  dict: { es: "Dictadura y memoria", de: "Diktatur & historische Erinnerung", official: true },
  fant: { es: "Lo fantástico", de: "Das Fantastische in der Literatur", official: true },
  chile: { es: "Chile y Skármeta", de: "Chile bei Antonio Skármeta", official: true },
  jovenes: { es: "Jóvenes y futuro", de: "Junge Menschen: Alltag & Beruf", official: true, feld: true },
  eco: { es: "Ecología y economía", de: "Ökologie & Ökonomie", official: true, feld: true },
  texto: { es: "Análisis de textos", de: "Wortschatz Textanalyse", official: false }
};

/* ===== VOKABELN: [es, de, topic, level 1-4, Beispiel] ===== */
window.VOCAB = [
  ["la inmigración", "die Einwanderung", "migr", 1, "España pasó de ser un país de emigración a un país de inmigración."],
  ["emigrar", "auswandern", "migr", 1, "Durante la crisis, muchos jóvenes titulados emigraron a Alemania."],
  ["el país de acogida", "das Aufnahmeland", "migr", 2, "El país de acogida debe facilitar la integración."],
  ["la convivencia", "das Zusammenleben", "migr", 2, "La convivencia entre culturas exige respeto mutuo."],
  ["la integración", "die Integration", "migr", 1, "La lengua es la clave de la integración."],
  ["la xenofobia", "die Fremdenfeindlichkeit", "migr", 3, "Las campañas contra la xenofobia empiezan en la escuela."],
  ["estar sin papeles", "ohne Aufenthaltspapiere sein", "migr", 2, "Muchos temporeros están sin papeles y no tienen contrato."],
  ["el cayuco / la patera", "kleines (Flüchtlings-)Boot", "migr", 3, "Cada año llegan cayucos a las Islas Canarias."],
  ["la fuga de cerebros", "die Abwanderung von Fachkräften", "migr", 3, "La fuga de cerebros preocupa a las universidades españolas."],
  ["el/la temporero/a", "der/die Saisonarbeiter/in", "migr", 3, "Los temporeros recogen la fresa en Huelva."],
  ["la sociedad multicultural", "die multikulturelle Gesellschaft", "migr", 1, ""],
  ["regularizar", "legalisieren (Aufenthaltsstatus)", "migr", 3, "El Gobierno regularizó a miles de trabajadores."],

  ["la lengua cooficial", "die kooffizielle Amtssprache", "biling", 2, "El catalán es lengua cooficial en Cataluña."],
  ["la comunidad autónoma", "die autonome Gemeinschaft (Region)", "biling", 1, "España tiene diecisiete comunidades autónomas."],
  ["la inmersión lingüística", "Unterricht überwiegend in der Regionalsprache", "biling", 3, "La inmersión lingüística divide a la opinión pública."],
  ["el euskera / el gallego", "Baskisch / Galicisch", "biling", 1, "En el País Vasco muchos jóvenes estudian en euskera."],
  ["reivindicar", "(ein)fordern, beanspruchen", "biling", 3, "Los independentistas reivindican el derecho a decidir."],
  ["el independentismo", "die Unabhängigkeitsbewegung", "biling", 2, ""],
  ["el Estatuto de Autonomía", "das Autonomiestatut", "biling", 3, ""],
  ["la identidad", "die Identität", "biling", 1, "Hablar gallego forma parte de mi identidad."],
  ["el centralismo", "der Zentralismus", "biling", 3, ""],
  ["la Constitución de 1978", "die Verfassung von 1978", "biling", 2, "La Constitución de 1978 reconoce las lenguas cooficiales."],

  ["el turismo de masas", "der Massentourismus", "turismo", 1, "El turismo de masas transforma la costa."],
  ["la sostenibilidad", "die Nachhaltigkeit", "turismo", 2, ""],
  ["el piso turístico", "die Ferienwohnung (Kurzzeitvermietung)", "turismo", 2, "Los pisos turísticos encarecen el alquiler."],
  ["la turistificación", "die Touristifizierung (Verdrängung durch Tourismus)", "turismo", 3, ""],
  ["la masificación", "die Überfüllung", "turismo", 2, "La masificación de las playas molesta a los vecinos."],
  ["la temporada alta", "die Hauptsaison", "turismo", 1, ""],
  ["el sector servicios", "der Dienstleistungssektor", "turismo", 2, "El sector servicios genera la mayor parte del empleo."],
  ["el ocio", "die Freizeit", "turismo", 1, ""],
  ["encarecer", "verteuern", "turismo", 3, "La demanda turística encarece la vivienda."],
  ["el turismo rural", "der Landtourismus", "turismo", 1, ""],

  ["la pobreza infantil", "die Kinderarmut", "pobreza", 1, ""],
  ["el trabajo infantil", "die Kinderarbeit", "pobreza", 1, "El trabajo infantil impide la escolarización."],
  ["los niños en situación de calle", "Straßenkinder", "pobreza", 2, ""],
  ["la escolarización", "der (regelmäßige) Schulbesuch", "pobreza", 2, ""],
  ["abandonar la escuela", "die Schule abbrechen", "pobreza", 1, "Muchos niños abandonan la escuela para trabajar."],
  ["la desigualdad", "die Ungleichheit", "pobreza", 2, ""],
  ["ganarse la vida", "seinen Lebensunterhalt verdienen", "pobreza", 2, "Jorge se gana la vida vendiendo chicles."],
  ["la economía informal", "die Schattenwirtschaft / informeller Sektor", "pobreza", 3, ""],
  ["el asentamiento informal", "die informelle Siedlung", "pobreza", 3, ""],
  ["la ONG", "die NGO (Nichtregierungsorganisation)", "pobreza", 1, ""],

  ["los pueblos originarios", "die indigenen Völker", "etnica", 2, "Los pueblos originarios reclaman sus tierras."],
  ["la diversidad étnica", "die ethnische Vielfalt", "etnica", 2, ""],
  ["mestizo/a", "Mestize/Mestizin (gemischte Herkunft)", "etnica", 2, ""],
  ["afrodescendiente", "afrikanischer Abstammung", "etnica", 3, ""],
  ["la lengua indígena", "die indigene Sprache", "etnica", 1, "El quechua y el aimara son lenguas indígenas."],
  ["los derechos territoriales", "die Landrechte", "etnica", 3, ""],
  ["la discriminación estructural", "die strukturelle Diskriminierung", "etnica", 3, ""],
  ["reconocer", "anerkennen", "etnica", 2, "Bolivia se reconoce como Estado plurinacional."],

  ["la dictadura", "die Diktatur", "dict", 1, ""],
  ["el golpe de Estado", "der Staatsstreich / Putsch", "dict", 2, "El golpe de Estado de 1973 acabó con el gobierno de Allende."],
  ["la represión", "die Unterdrückung", "dict", 2, ""],
  ["los desaparecidos", "die Verschwundenen", "dict", 2, "Las Madres de Plaza de Mayo buscan a sus hijos desaparecidos."],
  ["la memoria histórica", "die historische Erinnerung(sarbeit)", "dict", 2, ""],
  ["la Guerra Civil", "der Spanische Bürgerkrieg (1936–1939)", "dict", 1, ""],
  ["la Transición", "der Übergang zur Demokratie (nach 1975)", "dict", 2, ""],
  ["la fosa común", "das Massengrab", "dict", 3, "Muchas familias piden exhumar las fosas comunes."],
  ["el exilio", "das Exil", "dict", 2, ""],
  ["la censura", "die Zensur", "dict", 2, ""],
  ["la Ley de Amnistía (1977)", "das Amnestiegesetz (1977)", "dict", 3, ""],
  ["exhumar", "exhumieren (Tote ausgraben)", "dict", 4, ""],

  ["lo fantástico", "das Fantastische", "fant", 2, ""],
  ["el realismo mágico", "der magische Realismus", "fant", 2, ""],
  ["lo sobrenatural", "das Übernatürliche", "fant", 2, ""],
  ["lo cotidiano", "das Alltägliche", "fant", 2, "Lo fantástico irrumpe en lo cotidiano."],
  ["irrumpir", "hereinbrechen, eindringen", "fant", 3, ""],
  ["inquietante", "beunruhigend, unheimlich", "fant", 3, ""],
  ["la ambigüedad", "die Mehrdeutigkeit", "fant", 3, "El final mantiene la ambigüedad."],
  ["verosímil", "glaubwürdig, wahrscheinlich", "fant", 4, ""],
  ["el desenlace", "der Ausgang, die Auflösung", "fant", 3, ""],

  ["el golpe militar de 1973", "der Militärputsch von 1973 (Chile)", "chile", 2, ""],
  ["la Unidad Popular", "das Linksbündnis unter Allende", "chile", 3, ""],
  ["el plebiscito de 1988", "die Volksabstimmung von 1988", "chile", 3, "En el plebiscito ganó el «No» contra Pinochet."],
  ["el cartero", "der Briefträger", "chile", 1, "Mario, el cartero de Neruda, descubre la poesía."],
  ["el compromiso político", "das politische Engagement", "chile", 3, ""],
  ["la metáfora", "die Metapher", "chile", 2, ""],

  ["el paro juvenil", "die Jugendarbeitslosigkeit", "jovenes", 2, ""],
  ["las prácticas", "das Praktikum", "jovenes", 1, "Hice unas prácticas en una empresa de Sevilla."],
  ["independizarse", "von zu Hause ausziehen, selbstständig werden", "jovenes", 2, "Los jóvenes españoles se independizan tarde."],
  ["la precariedad laboral", "die prekäre Arbeitssituation", "jovenes", 3, ""],
  ["la formación profesional (FP)", "die Berufsausbildung", "jovenes", 2, ""],
  ["el mileurista", "jmd., der ca. 1.000 € im Monat verdient", "jovenes", 3, ""],

  ["el cambio climático", "der Klimawandel", "eco", 1, ""],
  ["la sequía", "die Dürre", "eco", 2, "La sequía amenaza la agricultura andaluza."],
  ["las energías renovables", "die erneuerbaren Energien", "eco", 1, ""],
  ["el desarrollo sostenible", "die nachhaltige Entwicklung", "eco", 2, ""],
  ["la deforestación", "die Abholzung", "eco", 2, ""],

  ["la pregunta retórica", "die rhetorische Frage", "texto", 2, ""],
  ["la enumeración", "die Aufzählung", "texto", 2, ""],
  ["la hipérbole", "die Übertreibung", "texto", 3, ""],
  ["la antítesis", "die Antithese", "texto", 3, ""],
  ["la anáfora", "die Anapher", "texto", 3, ""],
  ["el registro coloquial", "die umgangssprachliche Stilebene", "texto", 3, ""],
  ["el narrador omnisciente", "der allwissende Erzähler", "texto", 3, ""],
  ["el tono irónico", "der ironische Ton", "texto", 2, ""],
  ["subrayar", "hervorheben, unterstreichen", "texto", 2, "La autora subraya la urgencia del problema."]
];
