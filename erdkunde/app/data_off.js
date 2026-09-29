/* ===== OFFIZIELLE NRW-GRUNDLAGEN · Geographie · Abitur 2027 ===== */
window.OFF = {
  year: 2027,
  dates: { LK: "Dienstag, 13. April 2027, 9:00 Uhr", GK: "Montag, 19. April 2027, 9:00 Uhr" },
  dateISO: { LK: [2027, 3, 13], GK: [2027, 3, 19] },
  dauer: { GK: 240, LK: 300 },
  auswahl: "Drei Prüfungsaufgaben zur Wahl, keine Aufgabenauswahl durch die Schule.",
  hilfsmittel: ["Der in der Oberstufe überwiegend verwendete Atlas (für alle in derselben Auflage)", "Wissenschaftlicher Taschenrechner oder Computer-Algebra-System / modulares Mathematiksystem", "Wörterbuch zur deutschen Rechtschreibung", "Bilinguale Kurse: zusätzlich ein- und zweisprachiges Wörterbuch"],
  kompetenzen: [
    ["Sachkompetenz", "Geographische Strukturen, Prozesse und Zusammenhänge fachlich erfassen, erklären und Fachbegriffe sicher nutzen."],
    ["Methodenkompetenz", "Karten, Diagramme, Statistiken, Texte, Bilder und Modelle selbstständig auswerten und darstellen."],
    ["Urteilskompetenz", "Räumliche Strukturen und Entwicklungen nach fachlichen Kriterien und Wertmaßstäben begründet beurteilen."],
    ["Handlungskompetenz", "Lösungen entwickeln, Maßnahmen planen und räumliche Konflikte reflektiert diskutieren."]
  ],
  aufgabenarten: [["Darstellungsaufgabe", "Sachverhalte zusammenstellen und erläutern"], ["Analyseaufgabe", "Strukturen erfassen, Zusammenhänge herstellen"], ["Erörterungsaufgabe", "Komplexe Gegebenheiten zu eigenständigen Urteilen verarbeiten"], ["Handlungsaufgabe", "Simulative oder reale Szenarien planen und reflektieren"]],
  konstruktion: [
    "Mehrere Teilaufgaben mit materialgestütztem Schwerpunkt, problemorientiert formuliert.",
    "Alle drei Anforderungsbereiche müssen vertreten sein; der Anforderungsbereich II bildet den Schwerpunkt.",
    "Mehrere unterschiedliche Darstellungs- und Arbeitsmittel werden kombiniert; der Materialumfang ist begrenzt.",
    "Die Aufgabe bezieht sich in der Regel auf ein unbekanntes Fallbeispiel, exemplarisch für eine allgemeingeographische Fragestellung.",
    "GK und LK unterscheiden sich in Komplexität, Abstraktion, Fachsprache, Selbstständigkeit und reflexiver Distanz."
  ],
  darstellung: "Mängel in der sprachlichen Richtigkeit können über das Bewertungsraster und/oder nach § 13 Abs. 2 APO-GOSt berücksichtigt werden; zusammen höchstens um bis zu zwei Notenpunkte, ohne doppelte Abwertung desselben Fehlers.",
  // Inhaltsfelder und Schwerpunkte/Fokussierungen 2027 (GK und LK identisch)
  felder: [
    { if: 3, name: "Landwirtschaftliche Strukturen in verschiedenen Klima- und Vegetationszonen", items: [
      ["Landwirtschaftliche Produktion in den Tropen vor dem Hintergrund weltwirtschaftlicher Prozesse", "lw_trop"],
      ["Intensivierung der landwirtschaftlichen Produktion in der gemäßigten Zone und in den Subtropen", "lw_int"],
      ["Landwirtschaft im Spannungsfeld zwischen Ressourcengefährdung und Nachhaltigkeit", "lw_nach"],
      ["Landwirtschaftliche Produktion im Kontext des Klimawandels", "lw_klima"]] },
    { if: 4, name: "Bedeutungswandel von Standortfaktoren", items: [
      ["Strukturwandel industriell geprägter Räume", "ind_struk"],
      ["Herausbildung von Wachstumsregionen", "ind_wachs"],
      ["Veränderung von Raumstrukturen im Kontext von Digitalisierung (digitale Infrastruktur, Onlinehandel, Verlagerung von Arbeitsplätzen, Güter- und Personenverkehre, Pendlerströme)", "digital"]] },
    { if: 5, name: "Stadtentwicklung und Stadtstrukturen", items: [
      ["Merkmale, innere Differenzierung und Wandel von Städten", "stadt_merk"],
      ["Entwicklung urbaner Räume im Kontext des Klimawandels", "stadt_klima"],
      ["Veränderung von Raumstrukturen im Kontext von Digitalisierung (Standortfaktor: siehe IF 4)", "digital"],
      ["Metropolisierung und Marginalisierung als Elemente eines weltweiten Verstädterungsprozesses", "metro"],
      ["Demografischer und sozialer Wandel als Herausforderung für zukunftsorientierte Stadtentwicklung", "stadt_demo"]] },
    { if: 6, name: "Sozioökonomische Entwicklungsstände von Räumen", items: [
      ["Merkmale und Ursachen räumlicher Disparitäten", "disp"],
      ["Demografische Prozesse in ihrer Bedeutung für die Tragfähigkeit von Räumen", "demo"],
      ["Strategien und Instrumente zur Reduzierung regionaler, nationaler und globaler Disparitäten", "disp_strat"]] },
    { if: 7, name: "Dienstleistungen in ihrer Bedeutung für Wirtschafts- und Beschäftigungsstrukturen", items: [
      ["Entwicklung von Wirtschafts- und Beschäftigungsstrukturen im Prozess der Tertiärisierung", "tert"],
      ["Wirtschaftsfaktor Tourismus in seiner Bedeutung für unterschiedlich entwickelte Räume", "tour"]] }
  ],
  sources: [
    { name: "Vorgaben Abitur 2027 – Geographie (14.08.2024)", url: "https://www.standardsicherung.schulministerium.nrw.de/system/files/media/document/file/geographie_2027_gg.pdf" },
    { name: "Operatorenübersicht Geographie (24.09.2015)", url: "https://www.standardsicherung.schulministerium.nrw.de/system/files/media/document/file/af2-ek-o-uebersicht_1.pdf" },
    { name: "Konstruktionsvorgaben Abiturprüfungsaufgaben Geographie (18.12.2015)", url: "https://www.standardsicherung.schulministerium.nrw.de/system/files/media/document/file/konstruktionsvorgaben_geographie.pdf" },
    { name: "Darstellungsleistung / sprachliche Richtigkeit (09.06.2016)", url: "https://www.standardsicherung.schulministerium.nrw.de/system/files/media/document/file/beurteilung_sprachliche_richtigkeit_2.pdf" },
    { name: "Termine Zentralabitur 2027, Anlage A (RdErl. 30.05.2025)", url: "https://www.standardsicherung.schulministerium.nrw.de/system/files/media/document/file/anlage_a_termine_2027_ht.pdf" },
    { name: "Fachseite Geographie GOSt – Standardsicherung NRW", url: "https://www.standardsicherung.schulministerium.nrw.de/zentralabitur-gost/faecher/geographie-gost" },
    { name: "Kernlehrplan Geographie Sek. II (Lehrplannavigator)", url: "https://lehrplannavigator.nrw.de/sekundarstufe-ii/kernlehrplaene-fuer-die-gymnasiale-oberstufe-2013/geographie-gymnasiale-oberstufe" }
  ]
};

/* ===== OPERATOREN (offizielle Liste; Definitionen hier sinngemäß in eigenen Worten) ===== */
/* [Operator, AFB, Bedeutung, Erwartung, Aufbau, Beispielaufgabe] */
window.OPS = [
  ["nennen", "I", "Informationen ohne Kommentar wiedergeben.", "Knappe, vollständige Aufzählung ohne Erklärung.", "Stichpunkte oder kurze Sätze.", "Nenne die Standortfaktoren eines Logistikzentrums (M2)."],
  ["beschreiben", "I–II", "Materialaussagen oder Sachverhalte geordnet, mit eigenen Worten und fachsprachlich wiedergeben.", "Geordnete Wiedergabe mit Zahlen/Belegen, noch keine Ursachen.", "Überblick → Einzelheiten → Auffälligkeiten (mit Materialbeleg).", "Beschreibe die Entwicklung der Beschäftigtenzahlen im Ruhrgebiet (M1)."],
  ["darstellen", "I–II", "Bekannte oder dem Material entnehmbare Informationen geordnet sprachlich oder grafisch verdeutlichen.", "Strukturierte Darstellung von Zusammenhängen, ggf. als Wirkungsgefüge.", "Gliederung nach Aspekten; Pfeile/Begriffe bei grafischer Form.", "Stelle die Folgen der Versiegelung für das Stadtklima dar."],
  ["lokalisieren", "I–II", "Raumbeispiele in bekannte topographische Orientierungsraster einordnen.", "Lage nach Kontinent, Staat, Region, Gradnetz, Nachbarräumen, Naturraum.", "Großraum → Region → Lage im Detail (Atlas nutzen).", "Lokalisiere die Region Almería."],
  ["einordnen / zuordnen", "II", "Einem Raum oder Sachverhalt aufgrund seiner Merkmale einen Platz in einem Ordnungsraster zuweisen.", "Kriterien nennen und begründet einem Modell/Typ zuordnen.", "Merkmal → Kriterium des Rasters → Zuordnung → Begründung.", "Ordne die Stadtstruktur von Lagos einem Stadtmodell zu."],
  ["kennzeichnen", "II", "Einen Raum oder Sachverhalt anhand bestimmter Kriterien begründet charakterisieren.", "Kriteriengeleitete Charakterisierung, nicht bloßes Beschreiben.", "Kriterium 1, 2, 3 … jeweils mit Beleg.", "Kennzeichne die Wirtschaftsstruktur der Region anhand von M1–M3."],
  ["erklären", "II", "Begründungszusammenhänge, Voraussetzungen und Folgen von Strukturen und Prozessen darlegen.", "Ursache-Wirkungs-Ketten, geographisch begründet.", "Aussage → Ursache(n) → Wirkungszusammenhang → Folge.", "Erkläre die Entstehung einer städtischen Wärmeinsel."],
  ["erläutern", "II", "Sachzusammenhänge mit Hilfe zusätzlicher Informationen (Beispiele, Belege) verdeutlichen.", "Wie erklären, aber mit ergänzenden Beispielen und Details.", "Aussage → Erklärung → Beispiel/Beleg → Einordnung.", "Erläutere Pull-Faktoren der Land-Stadt-Wanderung am Beispiel Lagos."],
  ["anwenden", "II–III", "Theorien, Modelle oder Regeln auf einen konkreten Fall übertragen.", "Modell benennen, Merkmale prüfen, Passung und Grenzen zeigen.", "Modell → Merkmale → Übertragung auf Fall → Abweichungen.", "Wende das Modell des demographischen Übergangs auf Nigeria an."],
  ["analysieren", "II–III", "Komplexe Materialien in Einzelaspekten erfassen und Entwicklungen/Zusammenhänge zwischen ihnen aufzeigen.", "Materialgestützte, aspektgeleitete Untersuchung mit Zusammenhängen.", "Leitfrage → Aspekte → Befunde je Material → Zusammenhänge → Zwischenfazit.", "Analysiere die Auswirkungen des Onlinehandels auf die Innenstadt (M1–M4)."],
  ["vergleichen", "II–III", "Gemeinsamkeiten und Unterschiede kriterienbezogen herausarbeiten.", "Vergleichskriterien festlegen, beide Seiten je Kriterium, Fazit.", "Kriterien → Gemeinsamkeiten → Unterschiede → Ergebnis.", "Vergleiche die Tourismusentwicklung auf Mallorca und in Costa Rica."],
  ["beurteilen / bewerten", "III", "Auf Basis von Fachwissen, Material und eigenen Schlüssen unter Offenlegung der Wertmaßstäbe zu einer begründeten, differenzierten Einschätzung kommen.", "Kriterien/Wertmaßstäbe benennen, abwägen, klares Urteil.", "Kriterien → Argumente mit Belegen → Abwägung → begründetes Urteil.", "Beurteile die Nachhaltigkeit der Palmölproduktion in Indonesien."],
  ["(kritisch) Stellung nehmen", "III", "Unterschiedliche Argumente abwägen und zu einer begründeten Einschätzung einer Behauptung kommen.", "Eigene Position zu einer Aussage, Gegenargumente berücksichtigt.", "Aussage klären → Pro/Contra → eigene Position → Begründung.", "Nimm Stellung zur Aussage: «Tourismus ist der beste Weg aus der Armut.»"],
  ["erörtern", "III", "Einen Sachverhalt durch Abwägen von Pro- und Contra-Argumenten klären und eine schlüssige Meinung entwickeln.", "Dialektischer Aufbau mit Fazit.", "Problem → Pro → Contra → Abwägung → Fazit.", "Erörtere, ob eine City-Maut die Innenstadt stärkt."],
  ["überprüfen", "III", "Thesen, Argumentationen oder Darstellungen auf Angemessenheit, Stichhaltigkeit oder Wirksamkeit untersuchen.", "These mit Material und Fachwissen testen; bestätigen, einschränken oder widerlegen.", "These → Prüfkriterien → Befunde → Ergebnis.", "Überprüfe die These, Wachstumsregionen entstünden nur durch staatliche Förderung."]
];
