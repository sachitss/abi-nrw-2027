/* ===== GRAMMATIK: Erklären → Beispiel → Üben → Prüfungsanwendung → Fehlerkorrektur ===== */
/* ex: [Frage, [Optionen], richtigerIndex, Erklärung] */
window.GRAMMAR = [
  { id: "pastpp", t: "Simple past vs. present perfect", lvl: 1,
    rule: "Simple past = abgeschlossene Handlung zu einem vergangenen, genannten Zeitpunkt (yesterday, in 2016, when …, ago). Present perfect = Vergangenes mit Bezug zur Gegenwart, ohne Zeitpunkt (ever, never, already, yet, so far, since, for + bis jetzt).",
    ex: ["The UK voted to leave the EU in 2016.", "Britain has changed a lot since the referendum.", "Have you ever read a Nigerian novel?"],
    mistake: ["*I have seen the film last week.", "I saw the film last week. (Zeitpunkt genannt → simple past)"],
    exam: "Im summary gilt: Handlung eines Textes im simple present wiedergeben. Past/present perfect nur für Vorgeschichte (Before the story begins, she has lost her job …).",
    drill: [
      ["Nigeria ___ independent in 1960.", ["has become", "became"], 1, "Jahreszahl → simple past."],
      ["Since the pandemic, many people ___ from home.", ["have worked", "worked"], 0, "since + bis jetzt → present perfect (auch: have been working)."],
      ["The author ___ three novels so far.", ["wrote", "has written"], 1, "so far = bis jetzt → present perfect."]
    ] },
  { id: "prog", t: "Simple vs. progressive", lvl: 1,
    rule: "Simple = Gewohnheit, Fakten, Abfolge von Handlungen, Zustandsverben (know, believe, own, seem). Progressive = gerade im Verlauf, vorübergehend, Hintergrund einer Handlung, sich verändernde Situation (is getting worse).",
    ex: ["Lagos is growing faster than any other African city.", "She usually takes the bus.", "While he was scrolling, the notification popped up."],
    mistake: ["*I am knowing the answer.", "I know the answer. (Zustandsverb → simple)"],
    exam: "Analyse: «The narrator is presenting …» ist unnötig – für Textaussagen simple present: «The narrator presents …».",
    drill: [
      ["Look! The protesters ___ towards Parliament.", ["march", "are marching"], 1, "Gerade jetzt im Verlauf → progressive."],
      ["Many teenagers ___ news mainly on social media.", ["get", "are getting"], 0, "Gewohnheit/allgemeine Tatsache → simple present."],
      ["The article ___ that fake news spreads faster than facts.", ["is claiming", "claims"], 1, "Aussage eines Textes → simple present."]
    ] },
  { id: "pastperf", t: "Past perfect", lvl: 2,
    rule: "had + past participle = Vorvergangenheit: Handlung vor einem anderen Zeitpunkt in der Vergangenheit.",
    ex: ["When she arrived in London, her brother had already moved to Manchester.", "He had never used a smartphone before he joined the army."],
    mistake: ["*When I arrived, the film already started.", "When I arrived, the film had already started."],
    exam: "Kreative Aufgaben (Fortführung einer Geschichte, Tagebucheintrag): Rückblenden mit past perfect markieren.",
    drill: [
      ["By the time the police came, the crowd ___.", ["dispersed", "had dispersed"], 1, "Vorzeitig zur Ankunft der Polizei → past perfect."],
      ["Adaeze realised she ___ her passport at home.", ["had left", "has left"], 0, "Vorvergangenheit in einer Vergangenheitserzählung → past perfect."]
    ] },
  { id: "future", t: "Future forms", lvl: 1,
    rule: "will = spontane Entscheidung, Vorhersage, Versprechen. going to = Absicht, Vorhersage mit sichtbarem Anzeichen. Present progressive = feste Verabredung. Simple present = Fahrplan. Future progressive/perfect: will be doing / will have done.",
    ex: ["By the time we finish school, we will have written dozens of essays.", "I'm going to study in Manchester.", "We're meeting the exchange students on Friday."],
    mistake: ["*If it will rain, we stay inside.", "If it rains, we will stay inside. (kein will im if-Satz)"],
    exam: "Kommentar/Rede: Prognosen differenziert formulieren – «is likely to», «may well», «will probably».",
    drill: [
      ["Look at those clouds – it ___ rain.", ["will", "is going to"], 1, "Sichtbares Anzeichen → going to."],
      ["By the end of the decade, AI ___ many routine jobs.", ["will have replaced", "replaces"], 0, "Abgeschlossen bis zu einem Zukunftspunkt → future perfect."],
      ["When she ___ her Abitur, she will travel to Ghana.", ["will finish", "finishes"], 1, "Zeitsatz (when) mit Zukunftsbezug → simple present."]
    ] },
  { id: "cond", t: "Conditional sentences (if)", lvl: 2,
    rule: "Type 1: if + present → will. Type 2 (unwahrscheinlich/irreal Gegenwart): if + past → would + inf. Type 3 (irreal Vergangenheit): if + past perfect → would have + past participle. Mixed: if + past perfect → would + inf (Folge heute). Nie would im if-Satz.",
    ex: ["If the government invests in schools, fewer young people will leave.", "If I were the Prime Minister, I would abolish tuition fees.", "If Britain had stayed in the EU, trade would have been easier."],
    mistake: ["*If I would have time, I would help.", "If I had time, I would help."],
    exam: "Teilaufgabe 3 (comment/discuss): Hypothesen mit type 2 zeigen Satzbau-Vielfalt («If social media were regulated more strictly, …»).",
    drill: [
      ["If the platforms ___ their algorithms, users would see more diverse views.", ["changed", "would change"], 0, "Type 2: if + past."],
      ["If she had known about the scholarship, she ___.", ["would apply", "would have applied"], 1, "Type 3: would have + past participle."],
      ["If you ___ the text carefully, you will find the irony.", ["read", "will read"], 0, "Type 1: if + present."]
    ] },
  { id: "passive", t: "Passive", lvl: 2,
    rule: "be (in der passenden Zeitform) + past participle (+ by). Nutzen: Handelnde unwichtig/unbekannt, Sachtext-Stil. Auch: «is said to», «is believed to» (Nominativ mit Infinitiv).",
    ex: ["The protests were organised online.", "The novel has been translated into over 50 languages.", "The film is said to be based on a true story."],
    mistake: ["*The law was pass in 2020.", "The law was passed in 2020. (-ed nicht vergessen)"],
    exam: "Analyse unpersönlich: «The reader is drawn into the scene», «Tension is created by short sentences».",
    drill: [
      ["The Benin Bronzes ___ by British soldiers in 1897.", ["looted", "were looted"], 1, "Die Bronzen wurden geplündert → Passiv."],
      ["A new law ___ at the moment.", ["is being discussed", "is discussed"], 0, "Gerade im Verlauf → present progressive passive."],
      ["The author is believed ___ in Lagos in the 1980s.", ["to live", "to have lived"], 1, "Vorzeitig → perfect infinitive."]
    ] },
  { id: "reported", t: "Reported speech", lvl: 2,
    rule: "Einleitendes Verb in der Vergangenheit → backshift: present → past, past/present perfect → past perfect, will → would, can → could. Orts-/Zeitangaben anpassen (today → that day, here → there). Fragen: Wortstellung wie Aussagesatz (She asked where I lived).",
    ex: ["'I'm leaving tomorrow.' → He said he was leaving the next day.", "'Do you trust the news?' → She asked whether I trusted the news."],
    mistake: ["*She asked me where do I live.", "She asked me where I lived."],
    exam: "Sprachmittlung und summary: Aussagen wiedergeben mit variablen Verben: claim, point out, argue, admit, warn, stress.",
    drill: [
      ["'We will win,' the candidate said. → The candidate said they ___ win.", ["will", "would"], 1, "will → would."],
      ["'Where is the station?' → He asked me where the station ___.", ["was", "is it"], 0, "Indirekte Frage: Aussage-Wortstellung + backshift."],
      ["'I have never been abroad.' → She said she ___ abroad.", ["had never been", "has never been"], 0, "present perfect → past perfect."]
    ] },
  { id: "relative", t: "Relative clauses", lvl: 2,
    rule: "who (Personen), which (Dinge), that (beides, nur notwendige Sätze), whose (dessen/deren). Defining = notwendig, ohne Komma; non-defining = Zusatzinfo, mit Kommas, nie «that». Contact clause: Relativpronomen als Objekt kann wegfallen (the book I read). «which» kann sich auf den ganzen Satz beziehen.",
    ex: ["Chimamanda Ngozi Adichie, who was born in Enugu, writes about identity.", "The app that I use most is WhatsApp.", "He apologised, which surprised everyone."],
    mistake: ["*London, that is the capital, is expensive.", "London, which is the capital, is expensive."],
    exam: "Summary: Relativsätze verdichten Informationen in einem Satz.",
    drill: [
      ["The journalist ___ article went viral received death threats.", ["who", "whose"], 1, "dessen Artikel → whose."],
      ["Nigeria, ___ has over 500 languages, uses English as an official language.", ["that", "which"], 1, "Non-defining (Kommas) → which, nie that."],
      ["She lost her job, ___ forced her to move back home.", ["which", "what"], 0, "Bezug auf den ganzen Satz → which."]
    ] },
  { id: "gerinf", t: "Gerund vs. infinitive", lvl: 3,
    rule: "Gerund nach: enjoy, avoid, risk, mind, consider, suggest, admit, be used to, look forward to, after Präpositionen. To-infinitive nach: want, decide, hope, refuse, manage, afford, plan. Bedeutungsunterschied: stop/remember/forget/try + gerund vs. + to-infinitive.",
    ex: ["Many young Nigerians consider moving abroad.", "She stopped to check her phone. / She stopped checking her phone.", "I'm looking forward to hearing from you."],
    mistake: ["*I look forward to hear from you.", "I look forward to hearing from you. («to» ist hier Präposition)"],
    exam: "Formeller Brief/E-Mail: «I look forward to hearing from you.» – Klassiker für die Schlussformel.",
    drill: [
      ["The government refused ___ the report.", ["publishing", "to publish"], 1, "refuse + to-infinitive."],
      ["Critics suggest ___ social media for under-16s.", ["banning", "to ban"], 0, "suggest + gerund."],
      ["I remember ___ the Queen's funeral on TV in 2022.", ["watching", "to watch"], 0, "remember + gerund = sich an etwas Vergangenes erinnern."]
    ] },
  { id: "partic", t: "Participle constructions", lvl: 3,
    rule: "Nebensätze verkürzen: present participle (-ing) für aktive/gleichzeitige Handlung, past participle für passive Bedeutung, having + past participle für Vorzeitigkeit. Subjekt muss in beiden Satzteilen gleich sein (sonst «dangling participle»).",
    ex: ["Feeling homesick, she called her mother.", "Written in 1949, the novel still feels relevant.", "Having finished school, he moved to Lagos."],
    mistake: ["*Walking home, the rain started.", "While I was walking home, the rain started. (Subjekt verschieden)"],
    exam: "Analyse auf Abiturniveau: «Using short sentences, the author creates tension.» – kompakt und elegant (Kriterium Satzbau).",
    drill: [
      ["___ in 1958, 'Things Fall Apart' is a classic of African literature.", ["Publishing", "Published"], 1, "Passivische Bedeutung → past participle."],
      ["___ the article, I disagree with the author.", ["Having read", "Read"], 0, "Vorzeitig und aktiv → having + past participle."],
      ["The author uses irony, ___ the politicians' hypocrisy.", ["exposing", "exposed"], 0, "Aktive Folgehandlung → present participle."]
    ] },
  { id: "adjadv", t: "Adjective vs. adverb", lvl: 1,
    rule: "Adjektiv beschreibt Nomen oder steht nach be, seem, look, feel, sound, taste. Adverb beschreibt Verb, Adjektiv oder Satz. Unregelmäßig: good → well, fast → fast, hard → hard (hardly = kaum).",
    ex: ["The narrator describes the city vividly.", "The situation seems hopeless.", "She hardly spoke."],
    mistake: ["*The author describes the scene very good.", "The author describes the scene very well."],
    exam: "Häufiger Punktabzug in Sprachrichtigkeit: «He argues convincingly», nicht «convincing».",
    drill: [
      ["The poem ends ___.", ["abrupt", "abruptly"], 1, "Beschreibt das Verb ends → Adverb."],
      ["The character's reaction sounds ___.", ["honest", "honestly"], 0, "Nach sound → Adjektiv."],
      ["She works ___ to pay for university.", ["hardly", "hard"], 1, "hard = hart; hardly = kaum."]
    ] },
  { id: "modals", t: "Modal verbs", lvl: 2,
    rule: "must = Pflicht/Überzeugung; mustn't = darf nicht (Verbot!); needn't / don't have to = muss nicht. should = Rat. Vermutung: must be (sicher), might/could be (möglich), can't be (sicher nicht). Vergangenheit: must have done, should have done.",
    ex: ["Students mustn't use their phones during the exam.", "You needn't bring a dictionary – there will be one.", "The author must have lived abroad; she knows every detail."],
    mistake: ["*You mustn't come if you don't want to.", "You don't have to come if you don't want to. (mustn't = Verbot)"],
    exam: "Kommentar: Forderungen abstufen – «should be regulated», «ought to», «must be banned».",
    drill: [
      ["The report ___ be wrong – it is based on reliable data.", ["can't", "mustn't"], 0, "Logische Schlussfolgerung (sicher nicht) → can't."],
      ["You ___ pay; the museum is free.", ["mustn't", "don't have to"], 1, "Keine Notwendigkeit → don't have to / needn't."],
      ["The government ___ acted sooner. (Kritik)", ["should have", "must"], 0, "Kritik an Vergangenem → should have + past participle."]
    ] },
  { id: "false", t: "False friends", lvl: 2,
    rule: "Typische Fallen: become (≠ bekommen → get), eventually (= schließlich; eventuell = possibly), actual (= tatsächlich; aktuell = current), sensible (= vernünftig; sensibel = sensitive), gymnasium (= Turnhalle), chef (= Koch; Chef = boss), consequent (≠ konsequent → consistent), undertaker (= Bestatter; Unternehmer = entrepreneur).",
    ex: ["The current debate is about AI.", "She is very sensitive to criticism.", "Eventually, the protesters went home."],
    mistake: ["*The actual situation in Nigeria is difficult.", "The current situation in Nigeria is difficult."],
    exam: "Kriterium Wortschatz (9 Punkte): False friends gehören zu den häufigsten Fehlern deutscher Lernender.",
    drill: [
      ["Many graduates ___ jobs abroad.", ["become", "get"], 1, "bekommen = get; become = werden."],
      ["The ___ government plans new laws.", ["actual", "current"], 1, "aktuell = current."],
      ["It would be ___ to check the facts first.", ["sensible", "sensitive"], 0, "vernünftig = sensible."]
    ] },
  { id: "linking", t: "Linking words", lvl: 1,
    rule: "Addition: moreover, furthermore, in addition. Contrast: however, nevertheless, whereas, while, on the other hand. Concession: although, even though, despite + noun/-ing. Cause: because, since, as, due to. Result: therefore, consequently, as a result. Conclusion: all in all, to sum up.",
    ex: ["Social media connects people; however, it can also isolate them.", "Despite the risks, many young people migrate.", "Although the novel is short, it is complex."],
    mistake: ["*Despite it was raining, we went out.", "Although it was raining … / Despite the rain … (despite nie mit Satz)"],
    exam: "Kriterium «sachgerecht strukturierter Text»: jeder Absatz beginnt mit einem klaren Verknüpfungswort.",
    drill: [
      ["___ the high costs, the project was a success.", ["Although", "Despite"], 1, "Vor Nomen → despite."],
      ["Fake news spreads quickly. ___, fact-checkers can hardly keep up.", ["Consequently", "Whereas"], 0, "Folge → consequently."],
      ["Some see the monarchy as a symbol of unity, ___ others regard it as outdated.", ["whereas", "therefore"], 0, "Gegenüberstellung im Satz → whereas."]
    ] },
  { id: "wordorder", t: "Word order", lvl: 1,
    rule: "S-V-O fest: Subjekt, Verb, Objekt – auch nach Adverbialen am Satzanfang (keine Inversion wie im Deutschen!). Häufigkeitsadverbien vor dem Vollverb, nach be. Ort vor Zeit (at school yesterday).",
    ex: ["In 2016 the British people voted to leave the EU.", "She has always wanted to live in New York.", "He is often late."],
    mistake: ["*Yesterday went I to the cinema.", "Yesterday I went to the cinema."],
    exam: "Keine deutschen Satzstellungsmuster übertragen – sonst Abzug in Grammatik und Satzbau.",
    drill: [
      ["Choose the correct sentence:", ["In the text describes the author a protest.", "In the text, the author describes a protest."], 1, "Kein Verb-zweit wie im Deutschen: Subjekt vor Verb."],
      ["Choose the correct sentence:", ["She reads never the newspaper.", "She never reads the newspaper."], 1, "Häufigkeitsadverb vor dem Vollverb."]
    ] },
  { id: "emphasis", t: "Emphasis: cleft sentences & inversion", lvl: 4,
    rule: "Cleft sentence: It is/was … that … ; What … is … . Inversion nach negativen/einschränkenden Ausdrücken am Satzanfang: Never have I …, Not only does …, Hardly had … when, Only then did …, Under no circumstances should …",
    ex: ["It is the ending that makes the story so disturbing.", "What the author criticises is the hypocrisy of politicians.", "Not only does the article inform, but it also entertains."],
    mistake: ["*Not only the article informs, but also entertains.", "Not only does the article inform, but it also entertains."],
    exam: "LK-Niveau im Kommentar oder in einer Rede: gezielt 1–2 Inversionen/Cleft sentences für Nachdruck, nicht übertreiben.",
    drill: [
      ["Never before ___ so much misinformation online.", ["there has been", "has there been"], 1, "Negativer Ausdruck am Satzanfang → Inversion."],
      ["___ worries me most is the loss of privacy.", ["What", "That"], 0, "Cleft sentence mit What …"],
      ["Only then ___ the truth.", ["did she realise", "she realised"], 0, "Only then → Inversion mit did."]
    ] },
  { id: "quant", t: "Articles & quantifiers", lvl: 1,
    rule: "Kein Artikel bei allgemeinen Aussagen mit abstrakten Nomen oder Plural (Society is changing; Teenagers love music), bei most people, in hospital/at school/at university (Institution). much/little + nicht zählbar, many/few + zählbar. information, advice, news, research sind unzählbar.",
    ex: ["Most people use social media every day.", "The news is shocking.", "Life in the city is expensive."],
    mistake: ["*The most people think that the society is unfair.", "Most people think that society is unfair."],
    exam: "«informations», «advices», «the most people» – vermeidbare Fehler, die im Raster Punkte kosten.",
    drill: [
      ["___ people believe that climate change is real.", ["Most", "The most"], 0, "Allgemein → most (ohne the)."],
      ["She gave me some useful ___.", ["advices", "advice"], 1, "advice ist unzählbar."],
      ["There is too ___ traffic in London.", ["much", "many"], 0, "traffic ist unzählbar → much."]
    ] }
];

/* ===== REDEMITTEL: [en, Erklärung, Beispiel] ===== */
window.REDEMITTEL = [
  { cat: "Einleitung / Summary", items: [
    ["The article '…' by …, published in … on …, deals with …", "Textsorte, Autor, Quelle, Thema in einem Satz", "The article 'Why Gen Z is quitting social media' by Sarah Hill, published in The Guardian in 2025, deals with young people's changing attitudes to online platforms."],
    ["The excerpt from the novel … by … is about …", "Literarischen Auszug einordnen", "The excerpt from the novel 'The Glass Coast' by Mark Ellis is about a young girl's first day in London."],
    ["The author points out / states / claims that …", "Aussagen wiedergeben (variable Verben)", "The author points out that algorithms reward outrage."],
    ["According to the text, …", "Information aus dem Text", "According to the text, many young doctors are considering emigrating."]
  ] },
  { cat: "Analyse", items: [
    ["The author makes use of … in order to …", "Mittel + Zweck", "The author makes use of rhetorical questions in order to involve the reader."],
    ["This is underlined by …", "Beleg einleiten", "This is underlined by the enumeration in line 12."],
    ["… creates / conveys an atmosphere of …", "Wirkung beschreiben", "The short sentences convey an atmosphere of panic."],
    ["The use of … suggests / implies that …", "Deutung", "The use of military vocabulary suggests that the narrator feels under attack."],
    ["The tone is (ironic, sarcastic, matter-of-fact, emotional)", "Ton bestimmen", "The tone is matter-of-fact at first but becomes increasingly emotional."],
    ["The story is told by a first-person narrator, which …", "Erzählperspektive + Wirkung", "The story is told by a first-person narrator, which allows the reader to share her doubts."],
    ["(l. 7) / (ll. 12–14)", "Zeilenangabe als Beleg", "She calls the city 'a machine that never sleeps' (l. 7)."]
  ] },
  { cat: "Argumentieren", items: [
    ["In my view, … / From my point of view, …", "Eigene Meinung", "In my view, social media platforms must take more responsibility."],
    ["It is often argued that … However, …", "Gegenposition aufgreifen und entkräften", "It is often argued that the monarchy attracts tourists. However, the palaces would attract them anyway."],
    ["On the one hand … on the other hand …", "Abwägen", "On the one hand, globalisation creates jobs; on the other hand, it puts pressure on wages."],
    ["While it is true that …, …", "Einräumung", "While it is true that AI saves time, it also threatens jobs."],
    ["A case in point is …", "Beispiel anführen", "A case in point is the #EndSARS movement in Nigeria."],
    ["This leads to the conclusion that …", "Schlussfolgerung", "This leads to the conclusion that regulation is necessary."],
    ["I strongly disagree with the claim that …", "Widerspruch", "I strongly disagree with the claim that the American Dream is dead."]
  ] },
  { cat: "Sprachmittlung", items: [
    ["I came across an article in … that might interest you.", "Einstieg mit Anlass", "I came across an article in a German newspaper that might interest you for your project."],
    ["The article explains / reports that …", "Information wiedergeben", "The article reports that many German schools now ban phones during breaks."],
    ["What is most relevant for you is that …", "Relevanz für Empfänger", "What is most relevant for you is that the programme is open to international students."],
    ["In Germany, a '…' is a kind of …", "Kulturspezifischen Begriff erklären", "In Germany, a 'Ausbildung' is a kind of apprenticeship that combines school and work."],
    ["If you want to know more, …", "Abschluss mit Angebot", "If you want to know more, I can send you the link."]
  ] },
  { cat: "Rede / Leserbrief / Blog", items: [
    ["Ladies and gentlemen, dear fellow students, …", "Anrede (Rede)", "Ladies and gentlemen, dear fellow students, today I want to talk about our future."],
    ["Dear Sir or Madam, / Dear Editor,", "Anrede (Leserbrief)", "Dear Editor, I am writing in response to your article '…' (May 3)."],
    ["I am writing in response to …", "Anlass Leserbrief", "I am writing in response to your article on smartphone bans."],
    ["Let's face it: …", "Appell / informelle Zuspitzung (Blog, Rede)", "Let's face it: none of us reads the terms and conditions."],
    ["Thank you for your attention.", "Schluss Rede", ""],
    ["Yours faithfully / Yours sincerely", "Grußformel (Name unbekannt / bekannt)", ""]
  ] },
  { cat: "Schluss", items: [
    ["All in all, … / To sum up, …", "Zusammenfassen", "All in all, the text shows that identity is never fixed."],
    ["Taking everything into account, I believe that …", "Abschließende Position", "Taking everything into account, I believe that the benefits outweigh the risks."],
    ["It remains to be seen whether …", "Offener Ausblick", "It remains to be seen whether the new law will make a difference."]
  ] }
];

/* ===== OPERATOREN (offizielle Liste ab Abitur 2025; Erklärungen in eigenen Worten) ===== */
/* [Operator, Bedeutung, Was tun, Beispielaufgabe, typische TA] – ta = Übungshinweis, nicht amtlich */
window.OPERATORS = {
  SL: [
    ["summarize / sum up", "Die wesentlichen Punkte knapp zusammenfassen", "Nur Kernaussagen, eigene Worte, simple present, keine Zitate, keine Wertung.", "Summarize the information given in the article on young people's use of news apps.", 1],
    ["outline", "Hauptmerkmale, Struktur oder Grundgedanken wiedergeben", "Gezielt Hauptpunkte darstellen, ohne Details.", "Outline the narrator's situation at the beginning of the excerpt.", 1],
    ["state", "Hauptaspekte kurz und klar darstellen", "Knapp, präzise, ohne Begründung.", "State the author's main criticism of reality TV.", 1],
    ["describe", "Genau darstellen, wie jemand/etwas ist", "Geordnet beschreiben, noch nicht deuten.", "Describe the setting of the story.", 1],
    ["analyse", "Einzelne Aspekte genau beschreiben und erklären", "These → Beleg (Zeile) → Wirkung. Form und Inhalt verbinden.", "Analyse how the author tries to convince the reader.", 2],
    ["examine", "Bestimmte Aspekte gründlich beschreiben und erklären", "Wie analyse, aber auf einen vorgegebenen Aspekt fokussiert.", "Examine the relationship between the two sisters.", 2],
    ["characterize / write a characterization", "Eine Figur gründlich analysieren", "Direkte und indirekte Charakterisierung, Belege, Entwicklung der Figur.", "Write a characterization of the protagonist.", 2],
    ["explain", "Etwas mit Gründen und Details verständlich machen", "Ursachen, Zusammenhänge, Hintergründe klar erläutern.", "Explain why the narrator decides to leave.", 2],
    ["illustrate", "Mit Beispielen erläutern", "Aussage + konkrete Beispiele (Text, Unterricht).", "Illustrate the author's view of London with examples from the text.", 2],
    ["interpret", "Bedeutung, Zweck oder Botschaft erklären", "Deutung begründen, Belege, ggf. Symbole und Titel einbeziehen.", "Interpret the title of the short story.", 2],
    ["point out", "Bestimmte Aspekte finden und erklären", "Gezielt heraussuchen und kurz erläutern.", "Point out the differences between the two speakers' views.", 2],
    ["compare", "Gemeinsamkeiten und Unterschiede aufzeigen", "Vergleichskriterien festlegen, Punkt für Punkt, Fazit.", "Compare the narrator's attitude to Lagos with that of her mother.", 2],
    ["assess / evaluate", "Begründet über Art oder Qualität von etwas urteilen", "Kriterien nennen, abwägen, zu einem Urteil kommen.", "Assess the effectiveness of the measures suggested by the author.", 3],
    ["comment (on)", "Eigene Meinung klar äußern und mit Belegen/Gründen stützen", "Position, Argumente mit Beispielen, Gegenargument, Fazit.", "Comment on the statement: 'Social media has made us lonelier, not more connected.'", 3],
    ["discuss", "Argumente für und gegen etwas abwägen und zu einem begründeten Schluss kommen", "Beide Seiten gewichten, begründetes Fazit.", "Discuss whether the American Dream is still achievable today.", 3],
    ["write (+ Textsorte)", "Einen Text mit bestimmten Merkmalen verfassen", "Zieltextformat (Rede, Leserbrief, Blog, Fortführung …) und Adressat einhalten.", "Write a speech for a school debate in which you argue for or against a smartphone ban.", 3]
  ],
  SM: [
    ["explain", "Etwas verständlich machen, ggf. kulturelle Unterschiede berücksichtigen"],
    ["outline", "Hauptpunkte knapp wiedergeben und kulturelle Aspekte klären"],
    ["present", "Hauptpunkte knapp darstellen und kulturelle Aspekte klären"],
    ["summarize / sum up", "Hauptpunkte knapp zusammenfassen und kulturelle Aspekte klären"],
    ["write (+ Textsorte)", "Einen Text mit bestimmten Merkmalen verfassen (z. B. E-Mail, Artikel)"]
  ],
  HV: [
    ["complete / fill in", "Satz, Tabelle oder Lücke ergänzen"],
    ["list / name", "Aufzählen / benennen"],
    ["match", "Zuordnen"],
    ["state", "Knapp angeben"],
    ["tick", "Richtige Lösung ankreuzen"]
  ]
};
