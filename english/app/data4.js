/* ===== PODCASTS (Sprachausgabe über das Gerät) ===== */
window.PODCASTS = [
  { id: "p1", series: "5 Minuten Englisch", title: "Simple past or present perfect?", lvl: 1, min: 4,
    seg: [
      ["de", "Willkommen bei fünf Minuten Englisch. Heute: simple past oder present perfect. Wir starten mit zwei Sätzen."],
      ["en", "Britain left the European Union in 2020. Since then, the debate about Europe has not gone away."],
      ["de", "Im ersten Satz steht ein Zeitpunkt, 2020. Deshalb simple past. Im zweiten Satz geht es um einen Zeitraum bis heute, since then. Deshalb present perfect."],
      ["en", "Have you ever been to Lagos? I went there last summer."],
      ["de", "Ever fragt nach Erfahrung bis jetzt: present perfect. Last summer ist ein abgeschlossener Zeitpunkt: simple past. Merksatz für die Klausur: Zeitpunkt genannt, simple past. Bezug zu jetzt, present perfect."]
    ],
    vocab: [["since then", "seitdem"], ["ever", "jemals"], ["last summer", "letzten Sommer"]],
    q: [["Welche Zeitform nach «in 2016»?", ["simple past", "present perfect"], 0], ["«The number of refugees ___ since 2015.»", ["rose", "has risen"], 1]] },
  { id: "p2", series: "Abitur English", title: "Mediation in six steps", lvl: 3, min: 5,
    seg: [
      ["de", "Abitur English. Heute die Sprachmittlung. Du hast maximal sechzig Minuten und einen deutschen Sach- oder Gebrauchstext mit etwa 450 bis 650 Wörtern."],
      ["de", "Schritt eins: Lies zuerst die Aufgabe, nicht den Text. Wer ist der Empfänger, was will er wissen, welches Format?"],
      ["de", "Schritt zwei: Markiere im deutschen Text nur, was für diesen Empfänger wichtig ist. Alles andere lässt du weg."],
      ["de", "Schritt drei: Übersetze nicht Satz für Satz. Formuliere die Idee neu, zum Beispiel so:"],
      ["en", "According to the article, more and more German schools are restricting the use of smartphones."],
      ["de", "Schritt vier: Erkläre kulturelle Begriffe, statt sie zu übersetzen. Zum Beispiel das Abitur:"],
      ["en", "The Abitur is the final exam at German secondary schools, which you need to go to university."],
      ["de", "Schritt fünf: Halte das Format ein. Eine E-Mail braucht Anrede, Anlass und Schluss. Schritt sechs: Plane zehn Minuten zum Korrigieren ein. Die Darstellungsleistung zählt dreißig von fünfzig Punkten."]
    ],
    vocab: [["according to", "laut"], ["to restrict", "einschränken"], ["a kind of", "eine Art von"]],
    q: [["Was liest du bei der Sprachmittlung zuerst?", ["Den deutschen Text", "Die Aufgabe mit Situation"], 1], ["Wie viele der 50 Punkte entfallen auf die Darstellungsleistung?", ["20", "30"], 1]] },
  { id: "p3", series: "Listen and answer", title: "Saturday at the farmers' market", lvl: 2, min: 3, voice: "en-US",
    seg: [
      ["en", "It's eight in the morning at the farmers' market in Portland, Oregon. Rosa has been selling honey here for fifteen years."],
      ["en", "Today her grandson Eli, who is sixteen, is helping her. He comes every Saturday because he's saving for a trip to Europe."],
      ["en", "I like the people here, Eli says. But during the week I'd rather study. I want to become an engineer and build solar farms."],
      ["en", "Rosa smiles. I never went to college. That's why I want him to have every chance I didn't have."]
    ],
    vocab: [["farmers' market", "Bauernmarkt"], ["to save for", "sparen für"], ["solar farm", "Solarpark"]],
    q: [["How old is Eli?", ["fifteen", "sixteen"], 1], ["What does Eli want to become?", ["an engineer", "a farmer"], 0], ["Why does Eli work at the market?", ["He is saving for a trip", "His school requires it"], 0]] },
  { id: "p4", series: "Culture Bites", title: "One country, many voices: Nigeria", lvl: 2, min: 4, voice: "en-NG",
    seg: [
      ["en", "Nigeria is the most populous country in Africa. More than five hundred languages are spoken there. The largest ethnic groups are the Hausa and Fulani in the north, the Yoruba in the south-west and the Igbo in the south-east."],
      ["en", "English is the official language, a legacy of British colonial rule, which ended in 1960. Today it works as a lingua franca between people who speak different first languages. Many Nigerians also speak Pidgin, a creole that mixes English with local languages."],
      ["en", "Writers like Chinua Achebe and Chimamanda Ngozi Adichie have shown that English can be made Nigerian: full of proverbs, rhythms and words from Igbo or Yoruba."],
      ["de", "Merke für das Abitur: Mehrsprachigkeit, Englisch als Erbe der Kolonialzeit – im LK unter dem Stichwort Aneignung und Abgrenzung."]
    ],
    vocab: [["populous", "bevölkerungsreich"], ["lingua franca", "Verkehrssprache"], ["legacy", "Erbe, Vermächtnis"]],
    q: [["When did British colonial rule in Nigeria end?", ["1960", "1914"], 0], ["What is Pidgin?", ["A creole mixing English with local languages", "An official exam"], 0]] },
  { id: "p5", series: "Phrase of the day", title: "While it is true that…", lvl: 3, min: 2,
    seg: [
      ["de", "Redemittel des Tages: While it is true that. Damit räumst du ein Gegenargument ein, bevor du widersprichst."],
      ["en", "While it is true that social media connects people, it can also make them feel more isolated."],
      ["de", "Das Redemittel passt perfekt in Teilaufgabe drei, wenn du kommentierst oder diskutierst. Achte darauf, dass nach dem Komma deine eigentliche Position folgt."],
      ["en", "While it is true that the monarchy attracts tourists, this alone does not justify its existence."]
    ],
    vocab: [["to connect", "verbinden"], ["isolated", "isoliert"], ["to justify", "rechtfertigen"]],
    q: [["Wofür nutzt du «While it is true that…»?", ["Gegenargument einräumen", "Zusammenfassung"], 0]] },
  { id: "p6", series: "Culture Bites", title: "The American Dream in three sentences", lvl: 3, min: 3, voice: "en-US",
    seg: [
      ["en", "In 1776, the Declaration of Independence named life, liberty and the pursuit of happiness as unalienable rights."],
      ["en", "The phrase American Dream itself was popularised much later, in 1931, by the historian James Truslow Adams, who described a land in which life should be better and richer for everyone."],
      ["en", "Today, people argue whether that promise still holds, or whether rising inequality has turned the dream into a myth."],
      ["de", "Für das Abitur: Ideale wie Freiheit, Gleichheit und Aufstieg immer mit Realitäten konfrontieren – Ungleichheit, Rassismus, soziale Mobilität."]
    ],
    vocab: [["unalienable rights", "unveräußerliche Rechte"], ["to popularise", "bekannt machen"], ["inequality", "Ungleichheit"]],
    q: [["Which document names 'the pursuit of happiness'?", ["The Declaration of Independence", "The Bill of Rights"], 0], ["Who popularised the phrase 'American Dream'?", ["James Truslow Adams", "Abraham Lincoln"], 0]] }
];

/* ===== ERKLÄRCLIPS (animierte Folien mit Sprachausgabe; ersetzen Video) ===== */
window.CLIPS = [
  { id: "c1", title: "Conditional sentences in 4 minutes", cat: "Grammatik", lvl: 2,
    slides: [
      { h: "Type 1: real", b: ["If + present → will", "If it rains, we will stay at home."], en: "Type one is about real possibilities in the future.", de: "Typ eins beschreibt reale Möglichkeiten in der Zukunft." },
      { h: "Type 2: unreal present", b: ["If + past → would + infinitive", "If I were Prime Minister, I would …"], en: "Type two is about unlikely or imaginary situations.", de: "Typ zwei beschreibt unwahrscheinliche oder gedachte Situationen." },
      { h: "Type 3: unreal past", b: ["If + past perfect → would have + past participle", "If she had known, she would have left."], en: "Type three is about things that did not happen in the past.", de: "Typ drei beschreibt, was in der Vergangenheit nicht passiert ist." },
      { h: "The golden rule", b: ["Never 'would' in the if-clause!", "✗ If I would have time … ✓ If I had time …"], en: "Never use would in the if-clause.", de: "Niemals would im if-Satz." }
    ],
    q: [["«If the government ___ more money, schools would improve.»", ["invested", "would invest"], 0, "Type 2: if + past."], ["«If they had listened, they ___ the mistake.»", ["would avoid", "would have avoided"], 1, "Type 3: would have + past participle."]],
    summary: "Type 1: if + present → will. Type 2: if + past → would. Type 3: if + past perfect → would have done. Nie would im if-Satz." },
  { id: "c2", title: "Mediation: relevance, not translation", cat: "Mediation", lvl: 3,
    slides: [
      { h: "Read the task", b: ["Situation: who, why?", "Task: operator + text type + focus"], en: "First, read the situation and the task.", de: "Lies zuerst Situation und Aufgabe." },
      { h: "Filter", b: ["What does the addressee need?", "Numbers and names only if they help"], en: "Select only the information that is relevant for the addressee.", de: "Wähle nur Informationen, die für den Empfänger relevant sind." },
      { h: "Paraphrase", b: ["Meaning, not words", "Compensation: a kind of …, which means …"], en: "Convey the meaning, not the words.", de: "Übertrage den Sinn, nicht die Wörter." },
      { h: "Text type", b: ["Greeting & reason for writing", "Paragraphs", "Closing"], en: "An e-mail needs a greeting, a reason for writing and a closing.", de: "Eine E-Mail braucht Anrede, Anlass und Schluss." }
    ],
    q: [["Ein Detail steht im Text, ist aber für den Empfänger unwichtig. Was tust du?", ["Weglassen", "Wörtlich übersetzen"], 0, "Relevanzprinzip: Sprachmittlung ist keine Übersetzung."], ["«Berufsschule» hat kein englisches Pendant. Was tust du?", ["Umschreiben und erklären", "Das deutsche Wort unkommentiert stehen lassen"], 0, "Kulturelle Begriffe erklären (Kompensationsstrategie)."]],
    summary: "Aufgabe → filtern → umformulieren → Textsorte. Kulturspezifisches erklären." },
  { id: "c3", title: "Analyse or comment?", cat: "Prüfungsstrategie", lvl: 3,
    slides: [
      { h: "Task 2: analyse", b: ["Claim", "Evidence with line reference", "Explain the effect"], en: "To analyse means to explain how the text creates an effect.", de: "Analysieren heißt erklären, wie der Text eine Wirkung erzeugt." },
      { h: "No opinion in task 2", b: ["Not: I think the author is right …", "But: By using irony, the author criticises …"], en: "In the analysis, you do not give your personal opinion.", de: "In der Analyse gibst du keine persönliche Meinung." },
      { h: "Task 3: comment / discuss", b: ["Position", "Arguments + examples (from class!)", "Counter-argument", "Conclusion"], en: "To comment means to give your opinion with arguments and examples.", de: "Kommentieren heißt: Meinung mit Argumenten und Beispielen." }
    ],
    q: [["Wohin gehört «In my view …»?", ["Teilaufgabe 2", "Teilaufgabe 3"], 1, "Eigene Meinung gehört zu comment/discuss/assess (TA 3)."]],
    summary: "Analyse = Mittel + Wirkung mit Belegen. Comment = begründete Meinung." },
  { id: "c4", title: "Writing a speech", cat: "Prüfungsstrategie", lvl: 3,
    slides: [
      { h: "Address your audience", b: ["Ladies and gentlemen, dear fellow students …", "Say who you are and why you speak"], en: "A speech starts by addressing the audience directly.", de: "Eine Rede beginnt mit der direkten Anrede des Publikums." },
      { h: "Rhetorical devices", b: ["Rhetorical questions", "Rule of three", "Inclusive 'we'", "Anaphora"], en: "Use rhetorical devices, but do not overdo it.", de: "Nutze rhetorische Mittel, aber übertreibe nicht." },
      { h: "Clear structure", b: ["Signposting: First of all … Secondly … Finally …", "Examples the audience knows"], en: "Signposting helps listeners follow your argument.", de: "Wegweiser-Formulierungen helfen dem Publikum, zu folgen." },
      { h: "Strong ending", b: ["Appeal / call to action", "Thank you for your attention."], en: "End with a clear appeal and thank your audience.", de: "Ende mit einem klaren Appell und bedanke dich." }
    ],
    q: [["Was gehört NICHT in eine Rede?", ["Direkte Anrede", "Zeilenangaben wie (l. 12)"], 1, "Zeilenangaben gehören zu Analyse, nicht zur Rede."]],
    summary: "Anrede – Anliegen – gegliederte Argumente mit rhetorischen Mitteln – Appell – Dank." }
];

/* ===== SPRECHEN ===== */
window.SPEAK = [
  { type: "Bildbeschreibung", prep: 60, talk: 90, lvl: 1, prompt: "Imagine a photo: a crowded underground train in London. Almost everyone is looking at a smartphone. In the foreground, an elderly man is reading a paper newspaper and smiling. Describe the photo and explain what it says about media use today.", check: ["In the foreground / background", "Describe people and atmosphere", "Explain the message (contrast)", "Give a short opinion"] },
  { type: "Kurzvortrag", prep: 120, talk: 180, lvl: 3, prompt: "Give a three-minute talk on the question: Is the American Dream still alive?", check: ["Introduction with the question", "2–3 aspects with linking words", "Examples (mobility, inequality, immigration)", "Conclusion"] },
  { type: "Dialog / Rollenspiel", prep: 60, talk: 120, lvl: 2, prompt: "You are on an exchange in Manchester. Your host family wants to ban phones at the dinner table – for you too. Give your opinion and suggest a compromise.", check: ["React politely", "Argue with respect", "Suggest (What if …? How about …?)", "Reach an agreement"] },
  { type: "Diskussion", prep: 90, talk: 150, lvl: 3, prompt: "Should statues of people linked to slavery and colonialism be removed from public places? Defend a position and respond to a counter-argument.", check: ["Clear position", "2 arguments", "Counter-argument + response", "Examples (UK, USA)"] },
  { type: "Argumentation", prep: 60, talk: 120, lvl: 3, prompt: "'Artificial intelligence will create more jobs than it destroys.' Do you agree? Give reasons and examples.", check: ["Position", "Example from the world of work", "Counter-argument", "Conclusion"] },
  { type: "Spontane Reaktion", prep: 15, talk: 60, lvl: 2, prompt: "Your friend says: 'After the Abitur I'm going to Nigeria for a year to work at a school in Lagos.' React spontaneously.", check: ["React (Wow! / Really?)", "Ask 2 questions", "Give a piece of advice"] },
  { type: "Vorstellung (persönlich)", prep: 30, talk: 60, lvl: 1, prompt: "Introduce yourself: who you are, what you find interesting about English-speaking countries and what you plan to do after the Abitur.", check: ["Personal details", "Interests", "Future plans (going to / will / plan to)"] }
];

/* ===== SCHREIBEN (6 Stufen) ===== */
window.WRITE = [
  { lvl: 1, name: "Satzbau", task: "Combine the two statements into one sentence using a linking word: 'Social media helps people stay in touch.' / 'It can make people feel lonely.'", hint: "however, although, while, whereas", min: 10 },
  { lvl: 2, name: "Absatz", task: "Write a paragraph (60–80 words) about the advantages and disadvantages of studying abroad.", hint: "On the one hand / on the other hand / moreover / however", min: 60 },
  { lvl: 3, name: "Summary", task: "Summarize the blog post 'Why I Logged Off for a Year' (Modul Lesen) in 80–100 words.", hint: "Simple present, 3rd person, keine Zitate, keine Meinung. «In her blog post, the author describes …»", min: 80 },
  { lvl: 4, name: "Analyse", task: "Analyse how the speaker in 'Whose History?' tries to convince the audience (150–200 words).", hint: "Enumeration, rhetorical question, antithesis, inclusive 'let us'. Claim → evidence (l. …) → effect.", min: 150 },
  { lvl: 5, name: "Comment", task: "Comment on the statement: 'The American Dream has become a myth.' (200–250 words)", hint: "Position – arguments with examples from class – counter-argument (While it is true that …) – conclusion", min: 200 },
  { lvl: 6, name: "Komplette Abituraufgabe", task: "Write a letter to the editor of a British newspaper in response to the speech 'Whose History?', in which you give your own view on what should happen to the statue. (300–350 words)", hint: "Leserbrief: Dear Editor, – Bezug (title, date) – Position – Argumente – Vorschlag – Yours faithfully, Name, Ort.", min: 300 }
];

/* ===== KULTURWISSEN (Übungsmaterial) ===== */
window.CULTURE = [
  { topic: "uk", h: "Tradition und Wandel im UK", t: "Das Vereinigte Königreich ist eine konstitutionelle Monarchie mit parlamentarischem System (House of Commons, House of Lords) und besteht aus England, Schottland, Wales und Nordirland. Seit 1999 haben Schottland, Wales und Nordirland eigene Parlamente bzw. Versammlungen (devolution). Seit September 2022 ist Charles III König. Debatten: Rolle der Monarchie, Klassengesellschaft, NHS, Lebenshaltungskosten, Unabhängigkeitsbestrebungen in Schottland." },
  { topic: "ukself", h: "Empire, Commonwealth, Brexit", t: "Das Britische Empire war das größte Kolonialreich der Geschichte. Viele frühere Kolonien sind heute im Commonwealth verbunden. Ab 1948 (Ankunft der Empire Windrush) kamen viele Menschen aus der Karibik ins UK; der Windrush-Skandal (2018) zeigte, wie langjährige Einwohner fälschlich als illegal behandelt wurden. Beim Referendum am 23. Juni 2016 stimmten knapp 52 % für den EU-Austritt; das UK verließ die EU am 31. Januar 2020. Debatten: Nostalgie, Souveränität, Umgang mit kolonialer Vergangenheit (Statuen, Museen, Restitution)." },
  { topic: "us", h: "Politik und Gesellschaft der USA", t: "Die Verfassung von 1787 teilt die Macht zwischen Kongress, Präsident und Supreme Court (checks and balances). Ein Zwei-Parteien-System prägt die Politik; die Polarisierung zwischen Demokraten und Republikanern hat stark zugenommen. Dauerthemen: Waffenrecht (Second Amendment), Einwanderung, Abtreibung, Rolle des Supreme Court, Medienlandschaft." },
  { topic: "dream", h: "Ideale und Realitäten", t: "Die Unabhängigkeitserklärung (1776) nennt Leben, Freiheit und das Streben nach Glück als unveräußerliche Rechte. Der Begriff «American Dream» wurde 1931 vom Historiker James Truslow Adams populär gemacht. Die Bürgerrechtsbewegung (u. a. Brown v. Board of Education 1954, Civil Rights Act 1964, Voting Rights Act 1965) kämpfte gegen Rassentrennung. Heute stehen soziale Mobilität, Vermögensungleichheit und struktureller Rassismus im Zentrum der Debatte, ob der Traum noch erreichbar ist." },
  { topic: "nigeria", h: "Nigeria heute", t: "Nigeria ist das bevölkerungsreichste Land Afrikas, eine föderale Republik mit 36 Bundesstaaten und der Hauptstadt Abuja; Lagos ist die größte Stadt. Es werden über 500 Sprachen gesprochen, Englisch ist Amtssprache. Größte Gruppen: Hausa-Fulani, Yoruba, Igbo. Seit 1999 ist Nigeria wieder eine Zivilregierung (Vierte Republik). Themen: Ölwirtschaft, Korruption, junge Bevölkerung, Tech-Szene, Nollywood, Afrobeats, Auswanderung («japa»), Proteste wie #EndSARS (2020)." },
  { topic: "ngcol", h: "Das Erbe der britischen Herrschaft (LK)", t: "1914 legte die Kolonialmacht Nord- und Südnigeria zu einer Kolonie zusammen (amalgamation). Großbritannien regierte vielerorts über lokale Herrscher (indirect rule). Nigeria wurde am 1. Oktober 1960 unabhängig. Der Biafra-Krieg (1967–1970) prägt die Erinnerung bis heute. Das Englische wurde zur Verkehrssprache – Autoren wie Chinua Achebe («Things Fall Apart», 1958) eigneten es sich an und erzählten die Geschichte aus afrikanischer Sicht. Debatten: Grenzen und Institutionen aus der Kolonialzeit, Restitution der Benin-Bronzen (1897 von britischen Truppen geplündert)." },
  { topic: "identity", h: "Identität", t: "Zentrale Fragen: Wer bin ich zwischen Erwartungen von Familie, Peergroup und Gesellschaft? Coming-of-age-Geschichten zeigen Ambitionen und Hindernisse (Herkunft, Geld, Diskriminierung). Spannungsfeld Konformität vs. Individualismus – auch in digitalen Räumen (Selbstdarstellung, Vergleich)." },
  { topic: "diversity", h: "Vielfalt als Chance und Herausforderung", t: "Ethnische, kulturelle, soziale, sexuelle und geschlechtliche Vielfalt: Gleichberechtigung, Antidiskriminierung, Repräsentation in Medien und Politik, Inklusion. Beispiele: multikulturelle Städte wie London, Debatten über LGBTQ+-Rechte in den USA und im UK, soziale Ungleichheit." },
  { topic: "media", h: "Journalismus und soziale Medien", t: "Journalismus zwischen Information und Unterhaltung: Qualitätspresse vs. Boulevard, Infotainment, Clickbait. Soziale Medien ermöglichen Teilhabe (Bürgerjournalismus, Aktivismus) und Manipulation (Desinformation, Filterblasen, Algorithmen, Deepfakes). Stichworte: media literacy, fact-checking, Regulierung von Plattformen." },
  { topic: "lit", h: "Klassische und multimodale Literatur", t: "Klassische Formate (Roman, Kurzgeschichte, Drama, Lyrik – z. B. Shakespeare) und multimodale Formate (Graphic Novel, Film, Spoken Word, Podcast-Fiction, Games, BookTok). Fragen: Wie verändert das Medium die Erzählung? Welche Chancen bieten Bild, Ton, Interaktivität? Wer entscheidet über den Kanon?" },
  { topic: "global", h: "Globalisierung, Migration, Arbeitsmarkt", t: "Nachhaltigkeit auf drei Ebenen: sozial (faire Arbeit), ökologisch (Klima, Ressourcen), wirtschaftlich (Handel, Lieferketten). Migration: Flucht, Arbeitsmigration, Brain Drain, Rücküberweisungen. Globaler Arbeitsmarkt: Chancengleichheit, Wettbewerb und Kooperation, Plattformökonomie, Auslagerung." },
  { topic: "tech", h: "Fortschritt als Chance und Herausforderung", t: "Künstliche Intelligenz, Automatisierung, Gentechnik, Überwachung, Datenschutz. Leitfragen: Wer profitiert, wer trägt die Risiken? Wie viel Regulierung braucht Innovation? Welche ethischen Grenzen gibt es?" },
  { topic: "dystopia", h: "Utopien und Dystopien", t: "Dystopien überzeichnen Tendenzen der Gegenwart als Warnung (cautionary tale): Überwachung, Kontrolle, Manipulation, Klimakatastrophe. Klassiker: George Orwell, «Nineteen Eighty-Four» (1949); Aldous Huxley, «Brave New World» (1932); Margaret Atwood, «The Handmaid's Tale» (1985); Kazuo Ishiguro, «Never Let Me Go» (2005). Typisch: totalitärer Staat, Euphemismen, Held/in beginnt zu zweifeln oder rebelliert." }
];

/* ===== PRÜFUNGSSTRATEGIE ===== */
window.STRATEGY = [
  ["Aufgabe lesen", "Unterstreiche Operator, Fokus und ggf. Zieltextformat. Frage dich: Was genau wird verlangt – und was nicht?"],
  ["Operatoren verstehen", "TA 1 wiedergeben (summarize, outline, describe), TA 2 untersuchen (analyse, examine, characterize, explain), TA 3 bewerten oder gestalten (comment, discuss, assess, write)."],
  ["Zeit einteilen", "Hörverstehen ist fest getaktet (30 Min.). Sprachmittlung max. 60 Min. Für Schreiben/Lesen: Auswahl ca. 10 Min., je Teilaufgabe planen, 15–20 Min. Korrektur."],
  ["Antwort planen", "Stichpunkte auf Englisch, Reihenfolge festlegen, passende Redemittel notieren."],
  ["Belege nutzen", "In TA 2 jede Aussage mit Zeilenangabe belegen: (l. 12) oder '…' (ll. 4–5). Zitate kurz halten und in eigene Sätze einbauen."],
  ["Struktur", "Einleitungssatz, Absätze pro Aspekt, linking words, kurzer Schluss. Keine Einleitung in TA 2 und 3 wiederholen."],
  ["Grammatik prüfen", "Checkliste: 3rd-person -s, Zeitformen (simple past vs. present perfect), if-Sätze ohne would, Adverbien (-ly), Satzstellung S-V-O."],
  ["Wortschatz prüfen", "Wiederholungen ersetzen, false friends vermeiden (become, actual, sensible, eventually), Wörterbuch für Kollokationen nutzen."],
  ["Typische Fehler", "*informations/advices → information/advice, *the most people → most people, *he don't → he doesn't, *since two years → for two years, *I am agree → I agree, *make a photo → take a photo, *discuss about → discuss."],
  ["Letzte 10 Minuten", "Nichts Neues mehr schreiben. Verben, Endungen (-s, -ed, -ly), Rechtschreibung (BE oder AE einheitlich!), Kommas bei non-defining relative clauses, Absätze erkennbar?"]
];

/* ===== PROBEKLAUSUREN ===== */
window.MOCKS = [
  { id: "m1", name: "Probeklausur 1 – Geführt", lvl: 2, guided: true, hv: ["hv4"], sm: "sm1",
    sl: [{ text: "r1", src: "READ", label: "Aufgabe II (Sach-/Gebrauchstext)", tasks: [
      ["1", "Summarize the author's experiences during her year offline.", "Simple present, 3rd person, nur Kernaussagen (Entscheidung, Anfang, Vorteile, Nachteile, Fazit)."],
      ["2", "Analyse how the author makes her experiences vivid for the reader.", "Simile (keys), Kontraste, Aufzählung, persönlicher Ton, Schluss."],
      ["3a", "Comment on the statement: 'Being offline is a luxury only few can afford.'", "Meinung + Beispiele aus dem Unterricht (digital participation, work, school)."],
      ["3b", "Write a comment on the blog post from the point of view of a teenager who runs a successful social media channel.", "Blog-Kommentar: direkte Anrede, informell, Bezug auf ihren Text."]
    ] }] },
  { id: "m2", name: "Probeklausur 2 – Standard", lvl: 3, hv: ["hv1", "hv2"], sm: "sm1",
    sl: [{ text: "l1", src: "LIT", label: "Aufgabe I (literarischer Text)", tasks: [
      ["1", "Outline what happens to Nia during the Quiet Hour.", ""],
      ["2", "Analyse how the author creates the impression of a controlled society.", ""],
      ["3a", "'Dystopian fiction is not about the future, it is about the present.' Comment on this statement, referring to the story and to other dystopian texts you have dealt with in class.", ""],
      ["3b", "Continue the story: Write what happens the next evening at seven o'clock.", ""]
    ] }] },
  { id: "m3", name: "Probeklausur 3 – Anspruchsvoll", lvl: 4, hv: ["hv3", "hv4"], sm: "sm2",
    sl: [{ text: "r3", src: "READ", label: "Aufgabe II (Sach-/Gebrauchstext)", tasks: [
      ["1", "Summarize the speaker's view of the statue and her proposal.", ""],
      ["2", "Examine the rhetorical strategies the speaker uses to win over her audience.", ""],
      ["3a", "Discuss to what extent Britain's national self-image is still shaped by its colonial past. Refer to what you have learned in class.", ""],
      ["3b", "Write a letter to the editor of the local newspaper in which you respond to the speech.", ""]
    ] }] },
  { id: "m4", name: "Probeklausur 4 – Vollsimulation", lvl: 4, full: true, hv: ["hv1", "hv2", "hv3"], sm: "sm2",
    sl: [
      { text: "l2", src: "LIT", label: "Aufgabe I (Drama)", tasks: [
        ["1", "Outline the conflict between Temi and her mother.", ""],
        ["2", "Analyse how the conflict is presented, focusing on the dialogue and the stage directions.", ""],
        ["3a", "'Parents who migrate do it for their children – so the children owe them a safe career.' Assess this view, referring to the scene and to what you have learned in class.", ""],
        ["3b", "Write a continuation of the scene: Temi's father enters the kitchen. (LK: dramatische Form mit Regieanweisungen)", ""]
      ] },
      { text: "r2", src: "READ", label: "Aufgabe II (Sachtext)", tasks: [
        ["1", "Summarize the article's findings on life in Harlow Falls.", ""],
        ["2", "Examine how the author presents the townspeople's attitude towards the American Dream.", ""],
        ["3a", "Discuss whether the American Dream is still achievable for young people today.", ""],
        ["3b", "Write a speech for the town's Fourth of July celebration in which the mayor addresses the community's hopes and fears.", ""]
      ] }
    ] }
];

/* ===== DIAGNOSE ===== */
window.DIAG = {
  vocab: [
    ["devolution", ["Übertragung von Befugnissen an Regionen", "Revolution", "Entwicklung"], 0],
    ["the wealth gap", ["die Vermögensschere", "die Steuerlücke", "der Wohlstand"], 0],
    ["to emigrate", ["einwandern", "auswandern", "umziehen"], 1],
    ["prejudice", ["die Voraussage", "das Vorurteil", "der Vorsitz"], 1],
    ["surveillance", ["die Überwachung", "das Überleben", "die Umfrage"], 0],
    ["to appropriate", ["zustimmen", "sich aneignen", "angemessen sein"], 1],
    ["peer pressure", ["Zeitdruck", "Gruppendruck", "Leistungsdruck"], 1],
    ["sensible", ["sensibel", "vernünftig", "spürbar"], 1],
    ["tuition", ["die Intuition", "die Studiengebühr", "die Tradition"], 1],
    ["a cautionary tale", ["eine warnende Erzählung", "ein Märchen", "eine Anekdote"], 0]
  ],
  grammar: ["pastpp", "cond", "relative", "gerinf", "false", "adjadv"]
};

/* ===== PLAN-BAUSTEINE ===== */
window.PLANBITS = {
  grammarOrder: ["pastpp", "prog", "quant", "adjadv", "wordorder", "linking", "false", "future", "pastperf", "modals", "passive", "relative", "reported", "cond", "gerinf", "partic", "emphasis"],
  inputs: ["read", "listen", "podcast", "clip", "image"],
  tasks: ["TA1", "TA2", "SM", "TA3", "HV", "OP"],
  warmups: [
    "Question of the day: If you could change one law in your country, what would it be?",
    "Nenne in 60 Sekunden 8 englische Wörter zum heutigen Thema.",
    "Bildimpuls: Stell dir die Oxford Street in London am Samstag vor. Beschreibe sie in 3 Sätzen.",
    "Grammatik-Blitz: Bilde 3 Sätze mit «If I were …» (conditional type 2).",
    "Question of the day: Which object would you keep to remember your family in 80 years' time?",
    "Wiederhole laut 5 Redemittel aus der Kategorie Argumentieren.",
    "Question of the day: Would you move abroad for work? Where and why?",
    "Bildimpuls: Ein Teenager filmt eine Demonstration mit dem Handy. Was denkt er? (3 Sätze)"
  ]
};
