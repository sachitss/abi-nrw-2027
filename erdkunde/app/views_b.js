/* ===== Module ===== */
(function () {
  const O = window.OFF;
  const back = (to, l) => `<a class="back" href="#${to || "module"}">${icon("back")} ${l || "Module"}</a>`;
  const MODS = [
    ["m-diag", "Einstufung", "target", "12 Fragen, Planempfehlung"],
    ["m-themen", "Themen 2027", "read", TOPICS.length + " Fokussierungen, IF 3–7"],
    ["m-karten", "Kartenkompetenz", "globe", "Interaktive Karte, Kartentypen"],
    ["m-diagramme", "Diagramme & Statistiken", "grammar", "Klima, Pyramide, Linien, Streuung"],
    ["m-material", "Materialanalyse", "flag", "Fünf Schritte, Beispiel und Übung"],
    ["m-operatoren", "Operatoren", "task", OPS.length + " Operatoren, offizielle Liste"],
    ["m-afb", "Anforderungsbereiche", "spark", "AFB I, II, III erkennen"],
    ["m-begriffe", "Fachbegriffe", "vocab", TOPICS.reduce((a, t) => a + t.terms.length, 0) + " Karteikarten"],
    ["m-faelle", "Fallbeispiele", "globe", CASES.length + " Fälle, durchsuchbar"],
    ["m-rechnen", "Geographisch rechnen", "grammar", "Veränderung, Dichte, Maßstab"],
    ["m-schreiben", "Antworten schreiben", "pen", "Fünf Antwortstrukturen mit Musterantwort"],
    ["m-audio", "Audio", "audio", "3-Minuten-Fachwissen, Fachbegriffe"],
    ["m-podcast", "Podcast", "mic", PODCAST.length + " Folgen mit Quiz"],
    ["m-video", "Erklärclips", "video", CLIPS.length + " Clips mit Fragen"],
    ["m-zeit", "Zeitmanagement", "clock", "Klausur-Timer GK/LK"],
    ["pruefung", "Probeklausuren", "exam", "4 Klausuren, GK- und LK-Fassung"],
    ["m-final", "Endspurt", "check", "Checkliste und Fehlerliste"]
  ];
  window.viewModule = function (root) {
    root.innerHTML = `<div class="ph"><h1>Module</h1></div><div class="modgrid">${MODS.map((m) => `<a class="mod" href="#${m[0]}">${icon(m[2])}<strong>${m[1]}</strong><span>${esc(m[3])}</span></a>`).join("")}</div>
      <p class="note">Amtlich sind nur die unter «Grundlagen» als <span class="tag off">Offiziell NRW</span> markierten Vorgaben. Texte, Daten, Fallbeispiele und Aufgaben sind Übungsmaterial dieses Kurses.</p>`;
  };

  /* ---------- Einstufung ---------- */
  window.viewDiag = function (root) {
    root.innerHTML = `${back()}<h1>Einstufung</h1><p class="muted">12 Fragen · ca. 15 Minuten</p><section class="sec"><h2>Themen</h2><div class="d1"></div></section><section class="sec"><h2>Methoden</h2><div class="d2"></div></section><section class="sec"><h2>Operatoren</h2><div class="d3"></div></section><button class="btn" id="dg">Auswerten</button><div class="dres"></div>`;
    const res = { t: [0, 0], m: [0, 0], o: [0, 0] }; const cnt = (k) => (ok) => { res[k][1]++; if (ok) res[k][0]++; };
    [0, 4, 7, 10, 12, 15].forEach((i) => { const q = TOPICS[i].quiz[0]; MCx($(".d1", root), q[0], q[1], q[2], q[3], q[4], ["sach"], cnt("t")); });
    MCx($(".d2", root), "Ein Monat ist im Klimadiagramm humid, wenn …", ["die Niederschlagssäule über der Temperaturkurve liegt", "die Temperatur über 20 °C liegt", "es mehr als 50 mm regnet"], 0, "Walter-Lieth-Prinzip: 10 °C = 20 mm.", "Temperatur oder feste mm-Grenzen sind kein Kriterium.", ["diagramme"], cnt("m"));
    MCx($(".d2", root), "Index 2025 = 62 bei Basis 2000 = 100 bedeutet …", ["einen Rückgang um 38 %", "einen Rückgang um 62 %", "einen Anstieg um 62 %"], 0, "100 − 62 = 38.", "Der Indexwert ist kein Prozentwert der Veränderung.", ["diagramme"], cnt("m"));
    MCx($(".d2", root), "Maßstab 1:50.000 – 4 cm auf der Karte sind in der Natur …", ["2 km", "20 km", "200 m"], 0, "4 × 50.000 cm = 200.000 cm = 2 km.", "Einheiten umrechnen: 100.000 cm = 1 km.", ["karten"], cnt("m"));
    MCx($(".d3", root), "Welcher Operator verlangt, Kriterien offenzulegen und zu urteilen?", ["beurteilen", "beschreiben", "nennen"], 0, "AFB III.", "Beschreiben und nennen sind Wiedergabe.", ["operatoren"], cnt("o"));
    MCx($(".d3", root), "Welcher Anforderungsbereich ist Schwerpunkt jeder Abituraufgabe?", ["AFB II", "AFB I", "AFB III"], 0, "Laut Konstruktionsvorgaben.", "Alle drei AFB kommen vor, AFB II ist Schwerpunkt.", ["operatoren", "afb2"], cnt("o"));
    MCx($(".d3", root), "Erklären und erläutern unterscheiden sich darin, dass erläutern …", ["zusätzliche Informationen und Beispiele verlangt", "ein Urteil verlangt", "nur Nennen verlangt"], 0, "Erläutern = verdeutlichen mit ergänzenden Informationen.", "Urteil = AFB III; Nennen = AFB I.", ["operatoren"], cnt("o"));
    $("#dg", root).onclick = () => {
      const p = (a) => (a[1] ? Math.round((a[0] / a[1]) * 100) : 0); const sc = Math.round(p(res.t) * 0.5 + p(res.m) * 0.25 + p(res.o) * 0.25);
      let rec = sc < 45 ? 120 : sc < 65 ? 90 : sc < 80 ? 60 : 30; while (rec > daysToExam() && rec > 30) rec -= 30;
      S.diag = { date: today(), sc, rec }; checkBadges(); save();
      $(".dres", root).innerHTML = `<div class="panel result"><h2>Ergebnis: ${sc} / 100</h2><ul class="skills">${[["Themenwissen", p(res.t)], ["Methoden", p(res.m)], ["Operatoren", p(res.o)]].map(([l, v]) => `<li><span>${l}</span><span class="bar"><span style="width:${v}%" class="${v < 50 ? "b-bad" : v < 70 ? "b-warn" : "b-good"}"></span></span><span class="mono small">${v}%</span></li>`).join("")}</ul><p><strong>Empfehlung: ${rec}-Tage-Programm.</strong> <button class="btn sm" id="dga">Übernehmen</button></p><p class="note">Übungsdiagnose dieses Kurses, keine amtliche Einstufung.</p></div>`;
      $("#dga", root).onclick = () => { S.planLen = rec; save(); location.hash = "plan"; };
    };
  };

  /* ---------- Themen ---------- */
  window.viewThemen = function (root) {
    root.innerHTML = `${back()}<h1>Themen 2027</h1><p><span class="tag off">Offiziell NRW</span> Inhaltsfelder und Fokussierungen laut Vorgaben 2027 – für GK und LK gleich.</p>
      ${O.felder.map((f) => `<section class="sec"><h2>Inhaltsfeld ${f.if}: ${esc(f.name)}</h2><div class="modgrid">${[...new Set(f.items.map((i) => i[1]))].map((id) => { const t = TP(id); return `<a class="mod" href="#t-${id}">${icon("read")}<strong>${esc(t.t)}</strong><span>${t.terms.length} Begriffe · ${t.cases.length} Fallbeispiele</span></a>`; }).join("")}</div></section>`).join("")}`;
  };
  window.viewTopic = function (root, id) {
    const t = TP(id); if (!t) return viewThemen(root);
    root.innerHTML = `${back("m-themen", "Themen")}<p class="eyebrow">Inhaltsfeld ${t.if} · <span class="tag off">Fokussierung 2027</span></p><h1>${esc(t.t)}</h1><p class="goal">${esc(t.goal)}</p>
      <div class="split"><div><section class="sec"><h2>Fachwissen</h2>${t.wissen.map((p) => `<p>${esc(p)}</p>`).join("")}<div class="au"></div></section>
      <section class="sec"><h2>Fachbegriffe</h2><ul class="terms">${t.terms.map((x) => `<li><strong>${esc(x[0])}</strong><span>${esc(x[1])}</span></li>`).join("")}</ul></section></div>
      <div><section class="sec"><h2>Karte / Diagramm</h2><div class="vv"></div></section><section class="sec"><h2>Fallbeispiele</h2><ul>${t.cases.map((c) => `<li><a href="#fall-${c}">${esc(CS(c).name)}</a></li>`).join("")}</ul></section></div></div>
      <section class="sec"><h2>Test</h2><div class="tq"></div></section>
      <section class="sec"><h2>Abitur-Aufgabe</h2><p class="lbl">AFB ${t.task.afb} · ${esc(t.task.op)}</p><p class="task">${esc(t.task.prompt)}</p><details><summary>Erwartungshorizont (Übungsmaterial)</summary><ul>${t.task.erw.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></details></section>`;
    Player($(".au", root), [["de", t.t + ". " + t.wissen.join(" ")]], {});
    renderVis(t.vis, $(".vv", root));
    t.quiz.forEach((q) => MCx($(".tq", root), q[0], q[1], q[2], q[3], q[4], ["sach"])); termQuiz($(".tq", root), t, 4);
  };

  /* ---------- Kartenkompetenz ---------- */
  window.viewKarten = function (root) {
    root.innerHTML = `${back()}<h1>Kartenkompetenz</h1>
      <section class="sec"><h2>Fünf Schritte</h2><ol class="steps5 wide">${[["Orientieren", "Titel, Legende, Maßstab, Quelle, Jahr; Lage mit dem Atlas prüfen."], ["Beschreiben", "Verteilungen, Schwerpunkte, Gegensätze mit Werten und Orten."], ["Analysieren", "Zusammenhänge zwischen Merkmalen und Ebenen herstellen."], ["Erklären", "Ursachen mit Fachwissen und Fachbegriffen."], ["Bewerten", "Nur bei AFB-III-Operatoren: Kriterien offenlegen, urteilen."]].map((s) => `<li><strong>${s[0]}</strong> – ${s[1]}</li>`).join("")}</ol></section>
      <section class="sec"><h2>Interaktive Karte</h2><p class="small">Zoomen (+/−, Zwei-Finger), verschieben (ziehen), Ebenen wählen, Legende lesen, Entfernungen messen, Viertel vergleichen.</p><div class="mw"></div></section>
      <section class="sec"><h2>Lokalisieren</h2><p class="task" id="locq"></p><div class="mw2"></div><p class="fb small" id="locfb" aria-live="polite"></p></section>
      <section class="sec"><h2>Kartentypen</h2><div class="kt">${[["Physische Karte", "Relief, Gewässer, Höhenschichten – Naturraum."], ["Politische Karte", "Staaten, Grenzen, Hauptstädte."], ["Thematische Karte", "Ein Sachthema, z. B. Landnutzung oder Klima."], ["Choroplethenkarte", "Flächenfarben nach Wertklassen – nur relative Werte (Dichte, Anteile) sinnvoll."], ["Flusskarte", "Pfeile für Ströme (Pendler, Waren); Breite = Menge."], ["Bevölkerungskarte", "Dichte oder Punktsignaturen."], ["Klimakarte", "Klimazonen, Isothermen, Niederschlag."], ["Agrar- und Wirtschaftskarte", "Anbauzonen, Standorte, Branchen."], ["Stadtplan / Stadtstrukturkarte", "Flächennutzung, Viertel, Infrastruktur."]].map((k) => `<div class="card"><strong>${k[0]}</strong><p class="small">${k[1]}</p></div>`).join("")}</div></section>
      <section class="sec"><h2>Choroplethen- und Flusskarte</h2><div class="cc"></div><div class="cq"></div></section>`;
    MapWidget($(".mw", root), { layer: "use" });
    const targets = [["ind", "Tippe auf das Industrie- und Hafengebiet."], ["west", "Tippe auf die Frischluftschneise im Westen."], ["gws", "Tippe auf die Großwohnsiedlung."], ["cbd", "Tippe auf den Central Business District."], ["log", "Tippe auf den Standort, der vom Onlinehandel profitiert."]];
    let ti = 0; const setQ = () => { $("#locq", root).textContent = targets[ti][1]; };
    setQ();
    MapWidget($(".mw2", root), { layer: "use", onPick: (d) => { const ok = d[0] === targets[ti][0]; $("#locfb", root).innerHTML = `<span class="${ok ? "good" : "bad"}">${ok ? "Richtig" : "Nicht ganz"}: ${esc(d[1])}.</span>${ok ? "" : " Achte auf Nutzung und Lage (Legende)."}`; recordTags(["karten", "afb1"], ok); if (ok) { ti = (ti + 1) % targets.length; setTimeout(setQ, 700); } return true; } });
    renderVis("choropleth", $(".cc", root)); renderVis("map_flows", $(".cc", root));
    const cq = $(".cq", root);
    MCx(cq, "Welche Region hat laut Choroplethenkarte den höchsten Entwicklungsindex?", ["B2 (Hauptstadt)", "D4", "C3"], 0, "B2: 0,94.", "D4 (0,49) und C3 (0,62) liegen deutlich niedriger.", ["karten", "afb1"]);
    MCx(cq, "Welches räumliche Muster zeigt die Choroplethenkarte?", ["Nord-Süd-Gefälle", "Ost-West-Gefälle", "Kein Muster"], 0, "Reihen A/B hoch, D niedrig.", "Die Werte ändern sich vor allem von Nord nach Süd.", ["karten", "afb2"]);
    MCx(cq, "Wie haben sich die Pendlerströme nach Hochtal-Kernstadt von 2019 bis 2025 verändert?", ["Von 4,1 auf 2,9 Tsd. gesunken", "Gestiegen", "Unverändert"], 0, "Jahr umschalten und Pfeil vergleichen.", "Die Pfeilbreite nimmt ab.", ["karten", "afb1"]);
  };

  /* ---------- Diagramme ---------- */
  window.viewDiagramme = function (root) {
    root.innerHTML = `${back()}<h1>Diagramme und Statistiken analysieren</h1>
      <section class="sec"><h2>Vier Fragen</h2><div class="kt">${[["Beschreiben", "Was ist zu sehen? Werte, Trends, Extreme."], ["Analysieren", "Welche Zusammenhänge gibt es?"], ["Erklären", "Warum tritt das Muster auf?"], ["Bewerten", "Welche Bedeutung hat die Entwicklung?"]].map((k) => `<div class="card"><strong>${k[0]}</strong><p class="small">${k[1]}</p></div>`).join("")}</div></section>
      <div class="dg"></div>`;
    const blocks = [
      ["Klimadiagramm", "climate_sahel", [["Wie viele humide Monate hat die Station?", ["4", "6", "1"], 0, "Juni bis September: Der Niederschlag (in mm) ist größer als das Doppelte der Temperatur (in °C), z. B. Juni 75 mm > 2 × 32.", "Im Mai (35 mm < 68) und Oktober (15 mm < 62) ist es arid.", ["diagramme"]]]],
      ["Linien- und Indexdiagramm", "line_sectors", [["Um wie viel Prozent wuchsen die Dienstleistungen 2000–2025?", ["41 %", "141 %", "14,1 %"], 0, "Index 141 − 100 = 41 %.", "Der Indexwert selbst ist nicht die Wachstumsrate.", ["diagramme", "afb1"]]]],
      ["Säulendiagramm (logarithmisch)", "bar_irrig", [["Warum ist hier eine logarithmische Skala sinnvoll?", ["Die Werte unterscheiden sich um mehrere Größenordnungen", "Weil es schöner aussieht", "Weil es nur wenige Werte gibt"], 0, "214 bis 15.415 l/kg – linear wären kleine Werte unsichtbar.", "Gestaltung oder Anzahl der Werte sind keine Gründe.", ["diagramme", "afb2"]]]],
      ["Gruppierte Säulen", "bar_urban", [["Welcher Großraum hatte 1950–2018 den größten Zuwachs des Stadtanteils in Prozentpunkten?", ["Lateinamerika (+40)", "Afrika (+29)", "Europa (+22)"], 0, "81 − 41 = 40 Prozentpunkte.", "Afrika +29, Europa +22.", ["diagramme", "afb2"]]]],
      ["Bevölkerungspyramide", "pyramid_de", [["Welche Folge ergibt sich aus dieser Altersstruktur?", ["Steigender Pflegebedarf und Fachkräftemangel", "Mangel an Schulplätzen", "Hohe Geburtenüberschüsse"], 0, "Urnenform: viele Ältere, wenige Junge.", "Schulplatzmangel und Geburtenüberschuss passen zur Pyramidenform.", ["diagramme", "afb2"]]]],
      ["Streudiagramm", "scatter_regions", [["Welche Aussage ist zulässig?", ["Es gibt einen positiven Zusammenhang; ein Kausalbeweis ist das nicht", "Forschung verursacht immer Wachstum", "Es gibt keinen Zusammenhang"], 0, "Korrelation ≠ Kausalität.", "Das Diagramm zeigt nur gemeinsame Variation.", ["diagramme", "afb3"]]]]
    ];
    blocks.forEach(([h2, vis, qs]) => { const s = h(`<section class="sec"><h2>${h2}</h2></section>`); $(".dg", root).appendChild(s); renderVis(vis, s); qs.forEach((q) => MCx(s, q[0], q[1], q[2], q[3], q[4], q[5])); });
    const t = h(`<section class="sec"><h2>Tabellen, Indexwerte, Wachstumsraten</h2></section>`); $(".dg", root).appendChild(t); calcSet(t, 3);
  };

  /* ---------- Materialanalyse ---------- */
  window.viewMaterial = function (root) {
    root.innerHTML = `${back()}<h1>Materialanalyse</h1><p>Abituraufgaben in Geographie sind materialgestützt und beziehen sich in der Regel auf ein <strong>unbekanntes Fallbeispiel</strong> <span class="tag off">Konstruktionsvorgaben</span>. Trainiere den Weg: Material → Beobachtung → Analyse → Erklärung → Bewertung.</p>
      <section class="sec"><h2>Durchgerechnetes Beispiel</h2><div class="ex1"></div>
      <ol class="msteps done">${[["Material", "Liniendiagramm, Beschäftigte nach Sektoren in Rheinfeld, Index 2000 = 100, 2000–2025, Beispieldaten."], ["Beobachtung", "Industrie sinkt stetig auf 62 (−38 %), Dienstleistungen steigen auf 141 (+41 %). Die Scherenöffnung ist nach 2010 am stärksten."], ["Analyse", "Die Entwicklungen verlaufen gegenläufig; der Zuwachs im III. Sektor gleicht den Verlust aus, wenn die Ausgangszahlen ähnlich groß sind – das zeigt der Index allein nicht."], ["Erklärung", "Bedeutungsverlust harter Standortfaktoren, globale Konkurrenz, Produktivität → Tertiärisierung (Drei-Sektoren-Modell)."], ["Bewertung", "Kriterium Beschäftigungsqualität: neue Jobs verlangen andere Qualifikationen → soziale Herausforderung; Kriterium Flächennutzung: siehe Probeklausur 1."]].map((s) => `<li><strong>${s[0]}</strong><p>${esc(s[1])}</p></li>`).join("")}</ol>
      <p class="hint">Achtung, typischer Fehler: Indexwerte zeigen relative Entwicklungen. Aussagen über absolute Beschäftigtenzahlen brauchen zusätzliche Daten.</p></section>
      <section class="sec"><h2>Übung</h2><div class="ex2"></div></section>`;
    renderVis("line_sectors", $(".ex1", root));
    const b = $(".ex2", root); renderVis("bar_urban", b); materialSheet(b, TP("metro"), CS("lagos"));
  };

  /* ---------- Operatoren ---------- */
  window.viewOperatoren = function (root, focus) {
    root.innerHTML = `${back()}<h1>NRW Geographie Operatoren</h1><p><span class="tag off">Offiziell NRW</span> Operatorenübersicht Geographie mit AFB-Zuordnung. Definitionen hier sinngemäß; Erwartung, Aufbau und Beispiele sind <span class="tag">Übungsmaterial</span>.</p>
      <div class="opgrid">${OPS.map((o) => `<article class="op ${focus === o[0] ? "hl" : ""}" id="op-${o[0].replace(/[^a-z]/g, "")}"><h3>${esc(o[0])}</h3><span class="tag">AFB ${o[1]}</span><p><strong>Definition:</strong> ${esc(o[2])}</p><p><strong>Erwartung:</strong> ${esc(o[3])}</p><p><strong>Aufbau:</strong> ${esc(o[4])}</p><p class="task">${esc(o[5])}</p></article>`).join("")}</div>
      <section class="sec"><h2>Operator-Blitz (60 Sekunden)</h2><div class="row blt"></div><div class="blitz"></div></section>`;
    const bl = $(".blitz", root); let run = false, sc = 0;
    const tm = Timer($(".blt", root), 60, "Zeit", () => { run = false; bl.innerHTML = `<p class="good"><strong>${sc} richtig.</strong> ${sc > (S.blitz || 0) ? "Neuer Bestwert!" : "Bestwert: " + (S.blitz || 0)}</p>`; if (sc > (S.blitz || 0)) { S.blitz = sc; save(); } recordScore(["operatoren"], Math.min(1, sc / 8)); });
    const next = () => { if (!run) return; bl.innerHTML = ""; const o = OPS[Math.floor(Math.random() * OPS.length)]; const oth = OPS.filter((x) => x !== o).sort(() => Math.random() - 0.5).slice(0, 2); const opts = [o, ...oth].sort(() => Math.random() - 0.5); MC(bl, o[2], opts.map((x) => x[0]), opts.indexOf(o), "", (ok) => { if (ok) sc++; setTimeout(next, 450); }); };
    const st = h(`<button class="btn sm">Blitz starten</button>`); $(".blt", root).prepend(st); st.onclick = () => { sc = 0; run = true; tm.start(); st.remove(); next(); };
  };

  /* ---------- AFB ---------- */
  window.viewAFB = function (root) {
    root.innerHTML = `${back()}<h1>Anforderungsbereiche</h1><p><span class="tag off">Konstruktionsvorgaben</span> Alle drei AFB müssen vertreten sein; <strong>AFB II bildet den Schwerpunkt</strong>.</p>
      <div class="kt">${[["AFB I", "Wiedergabe", "nennen, beschreiben, darstellen, lokalisieren"], ["AFB II", "Analyse, Anwendung, Transfer", "erklären, erläutern, einordnen, kennzeichnen, analysieren, vergleichen, anwenden"], ["AFB III", "Urteil, Problemlösung", "beurteilen/bewerten, Stellung nehmen, erörtern, überprüfen"]].map((a) => `<div class="card"><strong>${a[0]} – ${a[1]}</strong><p class="small">${a[2]}</p></div>`).join("")}</div>
      <p class="small muted">Einige Operatoren reichen über zwei Bereiche (z. B. beschreiben I–II, analysieren II–III).</p><section class="sec"><h2>Trainer</h2><div class="ag"></div></section>`;
    afbGame($(".ag", root), 8);
  };

  /* ---------- Fachbegriffe ---------- */
  window.viewBegriffe = function (root) {
    const st = window._bs = window._bs || { f: "all", i: 0, mode: "cards" };
    const list = TOPICS.filter((t) => st.f === "all" || String(t.if) === st.f).flatMap((t) => t.terms.map((x) => [x[0], x[1], t.short, t.if]));
    root.innerHTML = `${back()}<h1>Fachbegriffe</h1><div class="filters"><label>Inhaltsfeld <select id="bf"><option value="all">Alle</option>${O.felder.map((f) => `<option value="${f.if}" ${st.f === String(f.if) ? "selected" : ""}>IF ${f.if}</option>`).join("")}</select></label><div class="seg sm" role="radiogroup">${[["cards", "Karten"], ["list", "Liste"]].map(([k, l]) => `<button role="radio" aria-checked="${st.mode === k}" data-m="${k}">${l}</button>`).join("")}</div></div><div class="bb"></div>`;
    const bb = $(".bb", root);
    if (st.mode === "list") bb.innerHTML = `<ul class="terms">${list.map((x) => `<li><strong>${esc(x[0])}</strong><span>${esc(x[1])} <small class="muted">(${esc(x[2])})</small></span></li>`).join("")}</ul>`;
    else { st.i %= list.length; const x = list[st.i]; bb.innerHTML = `<p class="muted small mono">${st.i + 1}/${list.length} · IF ${x[3]} · ${esc(x[2])}</p><button class="flash"><span class="f-front">${esc(x[0])}</span><span class="f-back" hidden><span>${esc(x[1])}</span></span><small class="muted">Antippen zum Umdrehen</small></button><div class="row center"><button class="btn ghost" data-k="0">Nochmal</button><button class="btn sm ghost say" data-say="${esc(x[0] + ". " + x[1])}">${icon("audio")} Hören</button><button class="btn" data-k="1">Gewusst</button></div>`;
      $(".flash", bb).onclick = function () { $(".f-front", this).hidden = !$(".f-front", this).hidden; $(".f-back", this).hidden = !$(".f-back", this).hidden; };
      $$("[data-k]", bb).forEach((b) => b.onclick = () => { recordTags(["begriffe"], b.dataset.k === "1", b.dataset.k === "1" ? null : "Begriff: " + x[0]); st.i++; rerender(); });
      $(".say", bb).onclick = () => say(x[0] + ". " + x[1]); }
    $("#bf", root).onchange = (e) => { st.f = e.target.value; st.i = 0; rerender(); };
    $$("[data-m]", root).forEach((b) => b.onclick = () => { st.mode = b.dataset.m; rerender(); });
  };

  /* ---------- Fallbeispiele ---------- */
  window.viewFaelle = function (root) {
    const st = window._fs = window._fs || { q: "", t: "all" };
    root.innerHTML = `${back()}<h1>Fallbeispiel-Datenbank</h1><p class="note">Fallbeispiele sind Übungsmaterial und <strong>keine</strong> amtlich vorgeschriebenen Raumbeispiele. Im Abitur kommt in der Regel ein unbekanntes Fallbeispiel vor.</p>
      <div class="filters"><label class="grow">Suche <input id="fq" class="inp" type="search" value="${esc(st.q)}" placeholder="Region, Thema, Begriff …"></label><label>Thema <select id="ft"><option value="all">Alle</option>${TOPICS.map((t) => `<option value="${t.id}" ${st.t === t.id ? "selected" : ""}>${esc(t.short)}</option>`).join("")}</select></label></div><div class="modgrid fl"></div>`;
    const draw = () => { const q = norm(st.q); const res = CASES.filter((c) => (st.t === "all" || c.topics.includes(st.t)) && (!q || norm(JSON.stringify(c)).includes(q))); $(".fl", root).innerHTML = res.length ? res.map((c) => `<a class="mod" href="#fall-${c.id}">${icon("globe")}<strong>${esc(c.name)}</strong><span>${esc(c.region)} · ${esc(c.scale)}</span><span>${c.topics.map((t) => esc(TP(t).short)).join(", ")}</span></a>`).join("") : `<p class="muted">Kein Treffer.</p>`; };
    $("#fq", root).oninput = (e) => { st.q = e.target.value; draw(); }; $("#ft", root).onchange = (e) => { st.t = e.target.value; draw(); }; draw();
  };
  function locator(c) {
    const x = ((c.lon + 180) / 360) * 360, y = ((90 - c.lat) / 180) * 180;
    let s = `<svg viewBox="0 0 360 180" class="loc" role="img" aria-label="Lage im Gradnetz: ${c.lat}° ${c.lat >= 0 ? "N" : "S"}, ${Math.abs(c.lon)}° ${c.lon >= 0 ? "O" : "W"}"><rect width="360" height="180" class="bg"/>`;
    for (let lo = -150; lo <= 150; lo += 30) s += `<line x1="${lo + 180}" x2="${lo + 180}" y1="0" y2="180" class="g"/>`;
    for (let la = -60; la <= 60; la += 30) s += `<line x1="0" x2="360" y1="${90 - la}" y2="${90 - la}" class="g${la === 0 ? " eq" : ""}"/>`;
    [[23.4, "Wendekreis"], [-23.4, ""]].forEach((w) => { s += `<line x1="0" x2="360" y1="${90 - w[0]}" y2="${90 - w[0]}" class="g dash"/>`; });
    s += `<text x="4" y="87" class="ax sm">Äquator</text><circle cx="${x}" cy="${y}" r="5" class="pin"/><circle cx="${x}" cy="${y}" r="11" class="pinr"/></svg>`;
    return s;
  }
  window.viewFall = function (root, id) {
    const c = CS(id); if (!c) return viewFaelle(root); S.casesSeen = S.casesSeen || {}; S.casesSeen[id] = 1; save(); checkBadges();
    const L = (t, arr) => `<div class="card"><strong>${t}</strong><ul class="small">${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`;
    root.innerHTML = `${back("m-faelle", "Fallbeispiele")}<p class="eyebrow">${esc(c.region)} · Maßstab: ${esc(c.scale)} · Übungsmaterial</p><h1>${esc(c.name)}</h1>
      <div class="split"><div><section class="sec"><h2>Lage</h2>${locator(c)}<p class="small">${Math.abs(c.lat)}° ${c.lat >= 0 ? "N" : "S"}, ${Math.abs(c.lon)}° ${c.lon >= 0 ? "O" : "W"} · <strong>Atlas:</strong> ${esc(c.atlas)}</p></section>
      <section class="sec"><h2>Kernfakten</h2><ul>${c.facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></section></div>
      <div><section class="sec"><h2>Statistik / Material</h2><div class="cv"></div></section></div></div>
      <div class="kt">${L("Ursachen", c.causes)}${L("Folgen", c.cons)}${L("Akteure", c.actors)}${L("Konflikte", c.conflicts)}${L("Lösungsansätze", c.sol)}<div class="card"><strong>Nachhaltigkeit</strong><p class="small">${esc(c.sust)}</p><strong>Prüfungsrelevanz</strong><p class="small">${esc(c.exam)}</p></div></div>
      <section class="sec"><h2>Übung</h2><div class="cx"></div></section>`;
    const t = TP(c.topics[0]); renderVis(t.vis, $(".cv", root));
    const items = [[c.causes[0], 0], [c.cons[0], 1], [c.conflicts[0], 2], [c.sol[0], 3]].concat(c.cons[1] ? [[c.cons[1], 1]] : []).concat(c.sol[1] ? [[c.sol[1], 3]] : []);
    Classify($(".cx", root), "Ordne zu.", items, ["Ursache", "Folge", "Konflikt", "Lösung"], ["sach", "handlung", "afb2"]);
  };

  /* ---------- Rechnen ---------- */
  window.viewRechnen = function (root) {
    root.innerHTML = `${back()}<h1>Geographisch rechnen</h1><p class="note">Der wissenschaftliche Taschenrechner ist im Abitur zugelassen <span class="tag off">Vorgaben 2027</span>. Die Aufgabentypen sind Übungsmaterial: Sie trainieren die Auswertung quantitativer Materialien (Methodenkompetenz), keine Mathematik um ihrer selbst willen.</p>
      <div class="kt">${[["Prozentuale Veränderung", "(neu − alt) / alt × 100"], ["Prozentpunkte", "Differenz zweier Anteile (z. B. 43 % − 14 % = 29 Prozentpunkte)"], ["Wachstum über Jahre", "N = N₀ × (1 + p/100)^t"], ["Verdopplungszeit", "≈ 70 / Wachstumsrate (%)"], ["Bevölkerungsdichte", "Einwohner / Fläche (km²)"], ["Maßstab", "Naturstrecke = Kartenstrecke × Maßstabszahl"], ["Index", "Wert / Basiswert × 100"]].map((k) => `<div class="card"><strong>${k[0]}</strong><p class="small mono">${esc(k[1])}</p></div>`).join("")}</div>
      <section class="sec"><h2>Aufgaben</h2><div class="cs"></div><button class="btn sm ghost" id="more">Neue Aufgaben</button></section>`;
    calcSet($(".cs", root), 6); $("#more", root).onclick = () => calcSet($(".cs", root), 3);
  };

  /* ---------- Antworten schreiben ---------- */
  const STRUCT = [
    ["Kurzantwort", "Aussage → Beleg", ["Aussage", "Beleg (Material, Zeile, Wert)"], "Die Industriebeschäftigung ist deutlich gesunken (M1: Index 62 im Jahr 2025).", ["Aussage klar", "Beleg mit Materialangabe"]],
    ["Erklärung", "Aussage → Beleg → Ursache/Zusammenhang", ["Aussage", "Beleg", "Ursache / Zusammenhang"], "In Rheinfeld ging die Industriebeschäftigung stark zurück (M1). Ursache ist der Bedeutungsverlust harter Standortfaktoren: Importkohle war günstiger, die Stahlproduktion wurde in Länder mit geringeren Kosten verlagert. Zugleich stieg die Produktivität, sodass weniger Beschäftigte nötig waren.", ["Ursache-Wirkungs-Kette", "Fachbegriff «Standortfaktor»"]],
    ["Analyse", "Beschreibung → Muster → Zusammenhang → Erklärung", ["Beschreibung", "Muster", "Zusammenhang", "Erklärung"], "M1 zeigt gegenläufige Entwicklungen der Sektoren (Beschreibung). Die Schere öffnet sich besonders nach 2010 (Muster). Flächen der Industrie werden laut M3 für Logistik und Hochschule nachgenutzt (Zusammenhang). Dies entspricht dem Prozess der Tertiärisierung (Erklärung).", ["Mehrere Materialien verknüpft", "Modell benannt"]],
    ["Bewertung", "Kriterien → Argumente → Belege → Abwägung → Fazit", ["Kriterien", "Argumente", "Belege", "Abwägung", "Fazit"], "Als Kriterien lege ich Arbeitsplätze je Hektar und Umweltwirkungen an. Die Hochschule schafft rund 42 Arbeitsplätze je Hektar, die Logistik nur etwa 13 (M3) und verursacht Lkw-Verkehr (M2). Die Logistik bringt jedoch schnell Einnahmen. Insgesamt bewerte ich die Nachnutzung als teilweise gelungen, weil die flächenintensive Logistik den größten Teil der Brache belegt.", ["Kriterien offengelegt", "Rechnung als Beleg", "Klares Fazit"]],
    ["Komplexe Abiturantwort", "Einleitung → Materialanalyse → geographische Erklärung → Bewertung → Schluss", ["Einleitung", "Materialanalyse", "Geographische Erklärung", "Bewertung", "Schluss"], "Einleitung: Thema, Raum, Leitfrage. Hauptteil: Materialien aspektgeleitet auswerten, mit Fachwissen erklären, Kriterien für das Urteil nennen. Schluss: Ergebnis in zwei Sätzen, ggf. Ausblick.", ["Roter Faden", "Operator beachtet"]]
  ];
  window.viewSchreiben = function (root) {
    root.innerHTML = `${back()}<h1>Antworten strukturieren</h1><p class="muted">Wähle eine Struktur, fülle die Bausteine, vergleiche mit der kommentierten Musterantwort.</p><div class="wst"></div>`;
    STRUCT.forEach((s, i) => { const sec = h(`<section class="sec"><h2>${s[0]}</h2><p class="lbl">${esc(s[1])}</p>${s[2].map((p, k) => `<label class="lbl" for="w${i}-${k}">${esc(p)}</label><textarea id="w${i}-${k}" rows="2">${esc(S.drafts["w" + i + "-" + k] || "")}</textarea>`).join("")}<details><summary>Musterantwort mit Kommentar</summary><p class="quote">${esc(s[3])}</p><ul class="small">${s[4].map((x) => `<li>✓ ${esc(x)}</li>`).join("")}</ul></details></section>`); $(".wst", root).appendChild(sec); $$("textarea", sec).forEach((t) => t.oninput = () => { S.drafts[t.id] = t.value; save(); }); });
    const d = h(`<section class="sec"><h2>Darstellungsleistung</h2><p class="small"><span class="tag off">Offiziell NRW</span> ${esc(O.darstellung)}</p><ul class="small"><li>Fachsprache, klare Gliederung, Absätze</li><li>Materialbelege (M1, Zeile, Wert)</li><li>Rechtschreibung und Zeichensetzung prüfen</li></ul></section>`); root.appendChild(d);
  };

  /* ---------- Audio ---------- */
  window.viewAudio = function (root) {
    root.innerHTML = `${back()}<h1>Audio</h1><p class="note">Gesprochen von der Sprachausgabe deines Geräts, Tempo 0,75–1,5×, Transkript zum Mitlesen.</p><div class="al"></div>`;
    TOPICS.forEach((t) => { const s = h(`<section class="sec"><p class="lbl">3-Minuten-Fachwissen · IF ${t.if}</p><h2>${esc(t.t)}</h2><div class="p1"></div><details><summary>Fachbegriffe hören</summary><div class="p2"></div></details></section>`); $(".al", root).appendChild(s); Player($(".p1", s), [["de", t.wissen.join(" ")]], {}); Player($(".p2", s), [["de", t.terms.map((x) => x[0] + ": " + x[1]).join(" ")]], {}); });
  };
  window.viewPodcast = function (root) {
    root.innerHTML = `${back()}<h1>Geographie-Abitur Podcast</h1><div class="pl"></div>`;
    PODCAST.forEach((p) => { const s = h(`<section class="sec"><p class="lbl">Episode ${String(p.n).padStart(2, "0")} · ca. ${p.min} min · ${stars(p.lvl)}</p><h2>${esc(p.t)}</h2><div class="pp"></div><details><summary>Begriffe</summary><ul class="terms">${p.terms.map((x) => `<li><strong>${esc(x[0])}</strong><span>${esc(x[1])}</span></li>`).join("")}</ul></details><details><summary>Quiz (5 Fragen)</summary><div class="pq"></div></details><p class="small"><strong>Prüfungsanwendung:</strong> ${p.topic ? `Nutze die Inhalte in der <a href="#t-${p.topic}">Abitur-Aufgabe des Themas</a>.` : `Wende die Schritte in der <a href="#mock-m1">Probeklausur 1</a> an.`}</p>${window.STANDALONE ? `<button class="btn sm ghost tdl">Transkript speichern</button>` : ""}</section>`); $(".pl", root).appendChild(s); Player($(".pp", s), [["de", p.text]], {}); p.q.forEach((q) => MCx($(".pq", s), q[0], q[1], q[2], q[3], "", ["sach"])); const t = $(".tdl", s); if (t) t.onclick = () => dl(`podcast-${p.n}.txt`, p.t + "\n\n" + p.text); });
  };

  /* ---------- Erklärclips ---------- */
  window.viewVideo = function (root) {
    root.innerHTML = `${back()}<h1>Erklärclips</h1><p class="note">Animierte Folien mit Sprachausgabe und Untertiteln – kein gefilmtes Video.</p><div class="modgrid">${CLIPS.map((c) => `<a class="mod" href="#clip-${c.id}">${icon("video")}<strong>${esc(c.t)}</strong><span>${esc(c.cat)} · ${c.slides.length} Folien · ${c.q.length} Fragen</span></a>`).join("")}</div>`;
  };
  window.viewClip = function (root, id) {
    const c = CLIPS.find((x) => x.id === id) || CLIPS[0]; let i = 0, auto = false, sub = true, tok = 0;
    root.innerHTML = `${back("m-video", "Erklärclips")}<p class="eyebrow">${esc(c.cat)}</p><h1>${esc(c.t)}</h1>
      <div class="stage" aria-live="polite"><div class="slide"></div><div class="subs"></div></div>
      <div class="row"><button class="btn sm ghost" data-a="prev">${icon("back")} Zurück</button><button class="btn sm" data-a="play">${icon("play")} Abspielen</button><button class="btn sm ghost" data-a="next">Weiter →</button><label class="small"><input type="checkbox" id="subs" checked> Untertitel</label></div>
      ${c.visual ? `<section class="sec"><h2>Material zum Clip</h2><div class="cvv"></div></section>` : ""}<section class="sec"><h2>Fragen</h2><div class="cq"></div></section>`;
    const show = () => { const s = c.slides[i]; $(".slide", root).innerHTML = `<span class="mono small">${i + 1}/${c.slides.length}</span><h2>${esc(s[0])}</h2><ul>${s[1].map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`; $(".subs", root).innerHTML = sub ? `<p>${esc(s[2])}</p>` : ""; $(".subs", root).hidden = !sub; $(".slide", root).classList.remove("in"); void $(".slide", root).offsetWidth; $(".slide", root).classList.add("in"); };
    const pb = $('[data-a="play"]', root);
    const narr = () => { if (!TTS.ok) return; const my = ++tok; speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(c.slides[i][2]); u.lang = "de-DE"; const v = TTS.pick("de-DE"); if (v) u.voice = v; u.onend = () => { if (my !== tok || !auto) return; if (i < c.slides.length - 1) { i++; show(); setTimeout(narr, 500); } else { auto = false; pb.innerHTML = icon("play") + " Nochmal"; } }; speechSynthesis.speak(u); };
    root.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; if (b.dataset.a === "prev" && i > 0) { i--; show(); if (auto) narr(); } if (b.dataset.a === "next" && i < c.slides.length - 1) { i++; show(); if (auto) narr(); } if (b.dataset.a === "play") { if (auto) { auto = false; tok++; speechSynthesis.cancel(); pb.innerHTML = icon("play") + " Abspielen"; } else { if (pb.textContent.includes("Nochmal")) i = 0; auto = true; show(); narr(); pb.innerHTML = icon("pause") + " Pause"; } } });
    $("#subs", root).onchange = (e) => { sub = e.target.checked; show(); };
    show(); if (c.visual) renderVis(c.visual, $(".cvv", root));
    c.q.forEach((q) => MCx($(".cq", root), q[0], q[1], q[2], q[3], "", [c.cat.includes("Karte") ? "karten" : c.cat.includes("Diagramm") ? "diagramme" : c.cat.includes("Operator") ? "operatoren" : c.cat.includes("Material") ? "material" : "sach"]));
  };

  /* ---------- Zeitmanagement ---------- */
  window.viewZeit = function (root) {
    const total = O.dauer[S.kurs]; const key = "phases" + S.kurs;
    const def = S.kurs === "LK" ? [["Aufgaben lesen und auswählen", 25], ["Planen und Material sichten", 30], ["Teilaufgabe 1", 35], ["Teilaufgabe 2", 90], ["Teilaufgabe 3", 90], ["Überprüfen", 30]] : [["Aufgaben lesen und auswählen", 20], ["Planen und Material sichten", 25], ["Teilaufgabe 1", 30], ["Teilaufgabe 2", 70], ["Teilaufgabe 3", 70], ["Überprüfen", 25]];
    const ph = S[key] || def;
    root.innerHTML = `${back()}<h1>Klausur-Timer</h1><p><span class="tag off">Vorgaben 2027</span> ${kursName()}: <strong>${total} Minuten einschließlich Auswahlzeit</strong>, drei Aufgaben zur Wahl. Die Aufteilung unten ist ein <strong>anpassbarer Vorschlag</strong> dieses Kurses.</p>
      <section class="sec"><h2>Deine Aufteilung</h2><div class="phs">${ph.map((p, i) => `<label class="rrow"><span>${esc(p[0])}</span><input type="number" min="0" max="${total}" value="${p[1]}" data-i="${i}" class="inp num" aria-label="${esc(p[0])} in Minuten"><span class="small muted">min</span></label>`).join("")}</div><p class="psum"></p><button class="btn sm ghost" id="rst">Vorschlag wiederherstellen</button></section>
      <section class="sec"><h2>Simulation</h2><div class="clock"><span class="mono big" id="rem">${total}:00</span><span id="phn" class="muted">Bereit</span></div><div class="pbar" id="pbar"></div><div class="row"><button class="btn" id="go">Start</button><button class="btn ghost" id="fast">Schnelldurchlauf (1 min = 1 s)</button><button class="btn ghost" id="stop">Stopp</button></div></section>`;
    const sum = () => { const s = ph.reduce((a, p) => a + (+p[1] || 0), 0); $(".psum", root).innerHTML = `Summe: <strong class="mono">${s}</strong> von ${total} Minuten ${s === total ? "✓" : s > total ? "– zu viel" : "– Reserve " + (total - s) + " min"}`; $("#pbar", root).innerHTML = ph.map((p) => `<span style="flex:${Math.max(1, +p[1])}" title="${esc(p[0])}">${esc(p[0].split(" ")[0])}</span>`).join(""); };
    $$(".num", root).forEach((x) => x.oninput = () => { ph[+x.dataset.i][1] = +x.value || 0; S[key] = ph; save(); sum(); });
    $("#rst", root).onclick = () => { delete S[key]; save(); rerender(); }; sum();
    let iv = null; const run = (speed) => { clearInterval(iv); let el = 0; const T = total * 60; iv = setInterval(() => { el += speed; if (el >= T) { clearInterval(iv); $("#rem", root).textContent = "0:00"; $("#phn", root).textContent = "Abgabe"; return; } const left = T - el; $("#rem", root).textContent = fmt(left).replace(/^(\d+):/, (m, a) => a + ":"); let acc = 0, cur = ph[ph.length - 1][0]; for (const p of ph) { acc += p[1] * 60; if (el < acc) { cur = p[0]; break; } } $("#phn", root).textContent = "Jetzt: " + cur; }, 1000); };
    $("#go", root).onclick = () => run(1); $("#fast", root).onclick = () => run(60); $("#stop", root).onclick = () => { clearInterval(iv); $("#phn", root).textContent = "Gestoppt"; };
    window._stopClock = () => clearInterval(iv);
  };

  /* ---------- Endspurt ---------- */
  window.viewFinal = function (root) {
    root.innerHTML = `${back()}<h1>Endspurt</h1><section class="sec"><h2>Checkliste</h2><ul class="checks">${["Atlas der Oberstufe (Schulausgabe) mitnehmen und Register üben", "Taschenrechner prüfen (Batterie)", `Zeitplan für ${O.dauer[S.kurs]} Minuten verinnerlicht`, "Alle Operatoren im Blitz fehlerfrei", "Je Fokussierung ein Fallbeispiel mit Zahlen", "Klimadiagramm, Pyramide, Index, Choroplethenkarte sicher auswerten", "Probeklausur 4 unter Zeit geschrieben", "Struktur für Bewertung/Erörterung sitzt"].map((c, i) => `<li><label><input type="checkbox" data-i="${i}" ${(S.final || {})[i] ? "checked" : ""}> ${esc(c)}</label></li>`).join("")}</ul></section>
      <section class="sec"><h2>Fehlerliste</h2>${S.wrong.length ? `<ul class="wrongl">${S.wrong.map((w) => `<li><span class="mono small">${w.d}</span> ${esc(w.t)}</li>`).join("")}</ul>` : `<p class="muted">Keine Fehler gespeichert.</p>`}</section>
      <section class="sec"><h2>Alle Themen kompakt</h2><dl class="rules">${TOPICS.map((t) => `<dt>${esc(t.t)}</dt><dd>${esc(t.goal)}</dd>`).join("")}</dl></section>`;
    $$(".checks input", root).forEach((x) => x.onchange = () => { S.final = S.final || {}; S.final[x.dataset.i] = x.checked; save(); });
  };
})();
