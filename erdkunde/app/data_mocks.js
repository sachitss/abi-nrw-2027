/* ===== PROBEKLAUSUREN (eigene Aufgaben im Stil der NRW-Vorgaben; keine Originalprüfungen) ===== */
/* Punkteraster = Übungsraster dieses Kurses (Inhalt 80 / Darstellung 20); die NRW-Dokumente legen keine Punkteverteilung fest. */
window.TASKSETS = {
A1: { t: "Strukturwandel in der Modellstadt Rheinfeld", topic: "ind_struk", raum: "Rheinfeld (fiktive Stadt in NRW)",
  mats: [
    { k: "chart", vis: "line_sectors", cap: "M1 Beschäftigte in Rheinfeld nach Sektoren, Index 2000 = 100 (Beispieldaten)" },
    { k: "text", cap: "M2 Zeitungsbericht (Übungstext)", body: "Wo früher die Hochöfen des Stahlwerks Rheinhütte standen, entsteht der «Rheinpark Campus». Die Stadt hat die 60 Hektar große Brache 2016 gekauft und saniert. Heute arbeiten dort ein Logistikunternehmen, ein Rechenzentrum und ein Institut der Fachhochschule. «Die neuen Jobs verlangen andere Qualifikationen», sagt die Leiterin des Jobcenters. Viele ehemalige Stahlarbeiter seien in Rente gegangen oder arbeiteten heute im Sicherheitsdienst oder in der Pflege. Kritiker bemängeln, dass das Logistikzentrum viel Fläche bei wenigen Arbeitsplätzen verbrauche und zusätzlichen Lkw-Verkehr bringe." },
    { k: "table", cap: "M3 Nutzung ehemaliger Industrieflächen in Rheinfeld 2025 (Beispieldaten)", head: ["Nutzung", "Fläche (ha)", "Arbeitsplätze"], rows: [["Logistik", 32, 410], ["Rechenzentrum", 6, 60], ["Hochschule/Forschung", 9, 380], ["Freizeit/Grün", 13, 25]] }
  ],
  gk: [
    ["1", "I", "beschreiben", "Beschreibe die Entwicklung der Beschäftigung in Rheinfeld (M1).", 20, ["Industrie: Rückgang von 100 auf 62 (−38 %)", "Dienstleistungen: Anstieg auf 141 (+41 %)", "Gegenläufige Entwicklung, stetiger Verlauf"]],
    ["2", "II", "erklären", "Erkläre den Wandel mithilfe von M1–M3 und deinem Fachwissen.", 32, ["Standortfaktoren verlieren an Bedeutung (Kohle, Erz)", "Globale Konkurrenz, Produktivität", "Tertiärisierung, neue Branchen (M2, M3)", "Qualifikationsproblem (M2)"]],
    ["3", "III", "beurteilen", "Beurteile die Nachnutzung der Industriebrache für die Entwicklung Rheinfelds.", 28, ["Kriterien: Arbeitsplätze je Hektar, Qualität, Umwelt, Image", "Logistik: viel Fläche, wenig Jobs (M3: ca. 13 je ha), Verkehr", "Hochschule: viele, qualifizierte Jobs je Fläche (ca. 42 je ha)", "Begründetes Urteil"]]],
  lk: [
    ["1", "I", "beschreiben", "Beschreibe die Entwicklung der Beschäftigung in Rheinfeld (M1).", 16, ["Werte und Veränderungen in Prozent", "Gegenläufiger Trend"]],
    ["2", "II", "analysieren", "Analysiere den Strukturwandel Rheinfelds unter Einbeziehung der Flächenproduktivität (M1–M3).", 34, ["Arbeitsplätze je Hektar berechnen und vergleichen", "Qualifikationsverschiebung", "Zusammenhang mit Standortfaktoren"]],
    ["3", "III", "überprüfen", "Überprüfe die These des Oberbürgermeisters: «Rheinfeld hat den Strukturwandel geschafft.»", 30, ["Prüfkriterien", "Belege pro/contra aus M1–M3", "Einschränkungen: Beschäftigungslücke, Flächenverbrauch", "Ergebnis"]]] },
A2: { t: "Hitze in der Innenstadt von Rheinfeld", topic: "stadt_klima", raum: "Rheinfeld (fiktiv)",
  mats: [
    { k: "chart", vis: "map_heat", cap: "M1 Nächtliche Temperaturabweichung vom Umland bei einer Hitzewetterlage (Beispieldaten)" },
    { k: "table", cap: "M2 Maßnahmenvorschläge der Stadtverwaltung (Beispieldaten)", head: ["Maßnahme", "Kosten (Mio. €)", "Kühlwirkung", "Umsetzungszeit"], rows: [["Entsiegelung Marktplatz + Bäume", 4.5, "hoch (lokal)", "2 Jahre"], ["Dachbegrünung Förderprogramm", 2.0, "mittel", "5 Jahre"], ["Freihaltung Frischluftschneise West", 0.3, "hoch (großräumig)", "sofort"], ["Klimaanlagen in Schulen", 6.0, "nur innen", "1 Jahr"]] },
    { k: "text", cap: "M3 Stellungnahme eines Investors (Übungstext)", body: "Die Stadt braucht dringend 1.200 neue Wohnungen. Der Grüngürtel im Westen ist die letzte große Fläche in Innenstadtnähe. Mit einer klugen Bebauung und Dachgärten können wir Wohnraum schaffen und gleichzeitig etwas für das Klima tun. Wer hier nur an Kaltluft denkt, vergisst die Familien, die keine Wohnung finden." }
  ],
  gk: [
    ["1", "I", "beschreiben", "Beschreibe die räumliche Verteilung der nächtlichen Überwärmung (M1).", 20, ["Maximum in Altstadt/CBD und Industriegebiet", "Geringe Werte an Park, Fluss, Grüngürtel", "Werte aus der Legende"]],
    ["2", "II", "erklären", "Erkläre die Entstehung dieses Musters.", 30, ["Versiegelung, Baustoffe als Wärmespeicher", "Fehlende Verdunstung, Abwärme", "Kühlende Wirkung von Grün und Wasser"]],
    ["3", "III", "bewerten", "Bewerte die Maßnahmen aus M2 unter Berücksichtigung von M3.", 30, ["Kriterien offenlegen", "Frischluftschneise: günstig, großräumig – Konflikt mit Wohnungsbau (M3)", "Klimaanlagen: keine Wirkung auf Stadtklima", "Priorisierung, Urteil"]]],
  lk: [
    ["1", "I–II", "kennzeichnen", "Kennzeichne das Stadtklima Rheinfelds anhand von M1.", 18, ["Kriteriengeleitet: Intensität, Verteilung, Gradienten"]],
    ["2", "II", "erläutern", "Erläutere Ursachen und Folgen der Wärmeinsel für unterschiedliche Bevölkerungsgruppen.", 30, ["Ursachen", "Vulnerable Gruppen, soziale Ungleichheit (dichte Altbauviertel)", "Beispiele"]],
    ["3", "III", "erörtern", "Erörtere den Zielkonflikt zwischen Wohnungsbau im Grüngürtel und Klimaanpassung (M1–M3).", 32, ["Pro Bebauung", "Contra", "Kompromisse (Nachverdichtung Bestand, Aufstockung)", "Fazit"]]] },
A3: { t: "Gemüse aus Almería", topic: "lw_int", raum: "Provinz Almería (Spanien)",
  mats: [
    { k: "chart", vis: "bar_irrig", cap: "M1 Wasserfußabdruck ausgewählter Produkte, Liter je kg (globale Durchschnittswerte, gerundet, nach Water Footprint Network)" },
    { k: "chart", vis: "climate_almeria", cap: "M2 Klimadiagramm einer Station an der Küste von Almería (gerundete Werte)" },
    { k: "text", cap: "M3 Reportage (Übungstext)", body: "Zwischen Sierra de Gádor und Mittelmeer glitzern Tausende Gewächshäuser in der Sonne. Tomaten, Paprika und Gurken reifen hier auch im Januar. Das Wasser kommt überwiegend aus Grundwasserleitern, deren Spiegel seit Jahren sinkt; eine Entsalzungsanlage soll Abhilfe schaffen. Die Arbeit erledigen vielfach Menschen aus Marokko und Westafrika. Manche wohnen in selbst gebauten Hütten zwischen den Gewächshäusern. Die Erzeugergenossenschaften betonen, dass sie Tropfbewässerung und Nützlinge einsetzen." }
  ],
  gk: [
    ["1", "I–II", "lokalisieren", "Lokalisiere den Raum Almería und kennzeichne seine klimatischen Bedingungen (M2, Atlas).", 20, ["Südostspanien, Andalusien, Mittelmeerküste", "Semiarid: sehr geringer Niederschlag, milde Winter, heiße Sommer"]],
    ["2", "II", "erläutern", "Erläutere Merkmale und Voraussetzungen des intensiven Gemüseanbaus in Almería.", 30, ["Gewächshäuser, Bewässerung, Agrobusiness", "Klima, Nähe EU-Markt, Arbeitskräfte", "Beispiele aus M3"]],
    ["3", "III", "erörtern", "Erörtere die Nachhaltigkeit des Anbaus.", 30, ["Ökonomisch, ökologisch, sozial", "Wasser (M1, M3), Plastik, Arbeitsbedingungen", "Fazit"]]],
  lk: [
    ["1", "I–II", "lokalisieren", "Lokalisiere den Raum und kennzeichne die naturräumlichen Voraussetzungen (M2, Atlas).", 16, ["Lage, Relief, Klima"]],
    ["2", "II", "analysieren", "Analysiere den Zusammenhang von Klima, Wasserbedarf und Exportorientierung (M1–M3).", 32, ["Virtuelles Wasser exportiert", "Humid/arid-Bilanz", "Weltmarkt, Saison"]],
    ["3", "III", "beurteilen", "Beurteile, ob Meerwasserentsalzung die Probleme des Anbaus löst.", 32, ["Kriterien", "Energie, Kosten, Sole", "Soziale Probleme bleiben", "Urteil"]]] },
A4: { t: "Megastadt Lagos", topic: "metro", raum: "Lagos (Nigeria)",
  mats: [
    { k: "chart", vis: "bar_urban", cap: "M1 Anteil der Stadtbevölkerung nach Großräumen 1950 und 2018 (gerundet, nach UN World Urbanization Prospects 2018)" },
    { k: "chart", vis: "pyramid_ng", cap: "M2 Altersstruktur einer jungen, wachsenden Bevölkerung (modellhafte Darstellung)" },
    { k: "text", cap: "M3 Bericht (Übungstext)", body: "Jeden Tag kommen neue Menschen nach Lagos. Sie hoffen auf Arbeit auf den Märkten, in Werkstätten oder als Fahrer. Viele finden eine Unterkunft nur in Makoko, einer Siedlung aus Holzhäusern auf Pfählen in der Lagune. Während am Atlantik die Neubaustadt Eko Atlantic für wohlhabende Käufer entsteht, fehlen in vielen Vierteln Kanalisation und sauberes Wasser. Die Regierung setzt auf neue Buslinien und eine Stadtbahn." }
  ],
  gk: [
    ["1", "I", "darstellen", "Stelle die Entwicklung der Verstädterung in Afrika im globalen Vergleich dar (M1).", 20, ["Afrika: niedriger Ausgangswert, starker Anstieg", "Vergleich mit Europa/Amerika"]],
    ["2", "II", "erläutern", "Erläutere Ursachen des Wachstums von Lagos (M1–M3).", 30, ["Natürliches Wachstum (M2)", "Land-Stadt-Wanderung, Push/Pull", "Wirtschaftszentrum"]],
    ["3", "III", "beurteilen", "Beurteile die Stadtentwicklung von Lagos im Hinblick auf soziale Gerechtigkeit.", 30, ["Kriterien", "Fragmentierung (Makoko vs. Eko Atlantic)", "Nahverkehr als Chance", "Urteil"]]],
  lk: [
    ["1", "II", "anwenden", "Wende das Modell des demographischen Übergangs auf M2 an.", 20, ["Phase, Begründung, Grenzen"]],
    ["2", "II", "analysieren", "Analysiere Ursachen und Formen der Marginalisierung in Lagos (M1–M3).", 30, ["Metropolisierung, informeller Sektor, Fragmentierung"]],
    ["3", "III", "erörtern", "Erörtere, ob Slum-Upgrading in Makoko einer Umsiedlung vorzuziehen ist.", 30, ["Pro/Contra", "Akteure", "Fazit"]]] },
A5: { t: "Tourismus auf der Insel Palmera", topic: "tour", raum: "Palmera (fiktiver Inselstaat)",
  mats: [
    { k: "chart", vis: "bar_season", cap: "M1 Ankünfte internationaler Gäste nach Monaten (Beispieldaten)" },
    { k: "table", cap: "M2 Verwendung von 100 € Tourismusausgaben (Beispieldaten)", head: ["Verbleib", "All-inclusive-Resort", "Lokale Gästehäuser"], rows: [["Ausländische Unternehmen/Importe", 72, 28], ["Löhne auf der Insel", 16, 38], ["Lokale Zulieferer", 7, 26], ["Steuern", 5, 8]] },
    { k: "text", cap: "M3 Interview mit einer Fischerin (Übungstext)", body: "Früher haben wir am Nordstrand gefischt. Heute gehört er zum Resort, wir dürfen dort nicht mehr anlegen. Meine Tochter arbeitet im Hotel als Zimmermädchen – aber nur von Dezember bis April. Im Sommer ist hier nichts los. Seit die Gemeinde Tauchtouren mit Einheimischen anbietet, verdienen einige Familien besser." }
  ],
  gk: [
    ["1", "I", "beschreiben", "Beschreibe die Saisonalität des Tourismus (M1).", 20, ["Hochsaison Dez–Apr", "Tiefpunkt Juni–Sept", "Werte"]],
    ["2", "II", "vergleichen", "Vergleiche die wirtschaftlichen Effekte von Resort- und Gästehaustourismus (M2, M3).", 30, ["Sickerrate 72 % vs. 28 %", "Lokale Einkommen, Zulieferer", "Beschäftigungsqualität"]],
    ["3", "III", "(kritisch) Stellung nehmen", "Nimm Stellung zur Aussage der Regierung: «Mehr Resorts bedeuten mehr Wohlstand für Palmera.»", 30, ["Aussage prüfen", "Argumente aus M1–M3", "Eigene Position"]]],
  lk: [
    ["1", "I–II", "kennzeichnen", "Kennzeichne die Tourismusstruktur Palmeras (M1–M3).", 18, ["Saisonalität, Abhängigkeit, Formen"]],
    ["2", "II", "analysieren", "Analysiere die regionalwirtschaftlichen Effekte unter Berücksichtigung von Multiplikator und Sickerrate.", 32, ["Rechnerischer Vergleich", "Multiplikator"]],
    ["3", "III", "beurteilen", "Beurteile Community-based Tourism als Entwicklungsstrategie für Palmera.", 30, ["Kriterien", "Chancen/Grenzen", "Urteil"]]] },
A6: { t: "Homeoffice und Pendeln in der Region Südwestfeld", topic: "digital", raum: "Region Südwestfeld (fiktiv)",
  mats: [
    { k: "chart", vis: "map_flows", cap: "M1 Pendlerströme in die Kernstadt 2019 und 2025 (Beispieldaten)" },
    { k: "table", cap: "M2 Kennzahlen der Region (Beispieldaten)", head: ["Kennzahl", "2019", "2025"], rows: [["Beschäftigte mit ≥ 2 Homeoffice-Tagen (%)", 9, 31], ["Haushalte mit Glasfaser (%)", 18, 57], ["Leerstand Büroflächen Kernstadt (%)", 4, 11], ["Einwohner Gemeinde Hochtal", 8200, 9100]] },
    { k: "text", cap: "M3 Aus dem Gemeinderat Hochtal (Übungstext)", body: "Seit der Glasfaseranschluss liegt, ziehen junge Familien aus der Stadt zu uns. Sie arbeiten zwei, drei Tage zu Hause und fahren nur noch selten die 55 Kilometer in die Kernstadt. Der Bäcker hat wieder mehr Kundschaft, im alten Bahnhof ist ein Coworking-Space entstanden. Gleichzeitig steigen die Grundstückspreise, und die Busverbindung reicht in den Stoßzeiten nicht aus." }
  ],
  gk: [
    ["1", "I", "beschreiben", "Beschreibe die Veränderung der Pendlerströme (M1, M2).", 20, ["Stärke der Ströme", "Herkunftsgemeinden", "Kennzahlen"]],
    ["2", "II", "erklären", "Erkläre die Veränderungen im Zusammenhang mit der Digitalisierung.", 30, ["Homeoffice, Glasfaser als Standortfaktor", "Wohnkosten", "Folgen für Kernstadt und Umland"]],
    ["3", "III", "beurteilen", "Beurteile die Entwicklung aus Sicht der Gemeinde Hochtal.", 30, ["Kriterien", "Chancen/Risiken (M3)", "Urteil"]]],
  lk: [
    ["1", "I–II", "beschreiben", "Beschreibe die Veränderungen (M1, M2) und berechne die relativen Veränderungen.", 18, ["Prozentwerte"]],
    ["2", "II", "analysieren", "Analysiere die räumlichen Folgen der Digitalisierung für Kernstadt und Umland.", 32, ["Büroleerstand, Einzelhandel, Verkehr, Suburbanisierung"]],
    ["3", "III", "erörtern", "Erörtere, ob die Kernstadt Büroflächen in Wohnungen umwandeln sollte.", 30, ["Pro/Contra", "Fazit"]]] },
A7: { t: "Kakao und fairer Handel", topic: "lw_trop", raum: "Côte d'Ivoire",
  mats: [
    { k: "table", cap: "M1 Wer erhält wie viel vom Preis einer Tafel Schokolade? (Beispielrechnung, gerundet)", head: ["Akteur", "Anteil (%)"], rows: [["Kakaobäuerinnen und -bauern", 7], ["Zwischenhandel/Transport im Anbauland", 4], ["Verarbeitung/Hersteller", 35], ["Handel (Supermarkt)", 44], ["Steuern", 10]] },
    { k: "chart", vis: "climate_trop", cap: "M2 Klimadiagramm einer Station im tropischen Tiefland (gerundete Werte)" },
    { k: "text", cap: "M3 Porträt (Übungstext)", body: "Awa Koné bewirtschaftet vier Hektar Kakao im Westen der Côte d'Ivoire. Die Bäume ihres Vaters sind alt, der Ertrag sinkt. Neue Flächen gibt es nur noch am Rand des Waldschutzgebiets. Seit ihre Kooperative fair gehandelt verkauft, erhält sie eine Prämie, mit der das Dorf einen Brunnen gebaut hat. Den größten Teil ihrer Ernte muss sie trotzdem zum staatlich festgelegten Preis verkaufen." }
  ],
  gk: [
    ["1", "I", "darstellen", "Stelle die Verteilung des Endpreises dar (M1).", 20, ["Anteile, Gegensatz Anbau vs. Verarbeitung/Handel"]],
    ["2", "II", "erläutern", "Erläutere Ursachen der geringen Einkommen im Kakaoanbau.", 30, ["Wertschöpfung im Norden, Weltmarkt, Terms of Trade", "Alte Bäume, Landknappheit (M3)"]],
    ["3", "III", "beurteilen", "Beurteile den fairen Handel als Instrument zur Verbesserung der Lebensbedingungen.", 30, ["Kriterien", "Prämie, Mindestpreis vs. geringe Mengen", "Urteil"]]],
  lk: [
    ["1", "II", "einordnen / zuordnen", "Ordne M2 einer Klimazone zu und erkläre die Eignung für Kakao.", 18, ["Immerfeuchte/wechselfeuchte Tropen"]],
    ["2", "II", "analysieren", "Analysiere die Wertschöpfungskette von Kakao (M1, M3).", 32, ["Stufen, Machtverhältnisse, räumliche Verteilung"]],
    ["3", "III", "überprüfen", "Überprüfe die These: «Nur die Verarbeitung im Anbauland kann die Armut der Kakaobauern beenden.»", 30, ["Prüfkriterien, Belege, Ergebnis"]]] }
};
window.MOCKS = [
  { id: "m1", name: "Probeklausur 1 – Geführt", sets: ["A1"], guided: true, lvl: 2 },
  { id: "m2", name: "Probeklausur 2 – Standard", sets: ["A2"], lvl: 3 },
  { id: "m3", name: "Probeklausur 3 – Anspruchsvoll", sets: ["A3", "A4"], lvl: 3 },
  { id: "m4", name: "Probeklausur 4 – Vollsimulation (3 Aufgaben zur Wahl)", sets: ["A5", "A6", "A7"], full: true, lvl: 4 }
];
