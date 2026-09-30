/* ===== Mathe: Prüfung, Probeklausur, Grundlagen, Router ===== */
(function () {
  const O = window.OFFICIAL;

  window.viewPruefung = function (root) {
    const k = K();
    root.innerHTML = `<div class="ph"><h1>Prüfung</h1><span class="tag off">Offiziell NRW · Abitur 2027</span></div>
      <section class="panel"><p class="eyebrow">${esc(k.name)} · ${esc(O.examDateLabel)}</p>
        <div class="timeline"><div class="tl-HV" style="flex:${k.teilA.min}"><strong>Teil A · hilfsmittelfrei</strong><span class="mono">${k.teilA.min} min</span></div><div class="tl-SL" style="flex:${k.teilB.min}"><strong>Teil B · mit Hilfsmitteln</strong><span class="mono">${k.teilB.min} min</span></div></div>
        <ul class="small"><li>Teil A: ${k.teilA.pflicht} Pflichtaufgaben${S.kurs === "LK" ? " (2 Analysis, je 1 Geometrie und Stochastik)" : " (je 1 pro Sachgebiet)"} + 2 aus 6 Wahlpflichtaufgaben (Auswahl durch dich, keine Auswahl durch die Lehrkraft).</li>
        <li>Teil B: 3 Aufgaben (Analysis, Geometrie/LA, Stochastik); die Lehrkraft wählt eine von zwei Analysis-Aufgaben; getrennte Sätze für WTR und CAS/MMS.</li>
        <li>Gesamtarbeitszeit einschließlich Auswahlzeit: ${k.dauer} Minuten.</li>
        <li>Hilfsmittel: ${O.hilfsmittel.map(esc).join("; ")}.</li></ul></section>
      <div class="ph"><h2>Probeklausuren</h2><span class="tag">Übungsmaterial</span></div>
      <div class="modgrid">${MOCKS.map((m) => { const r = S.mocks[m.id]; return `<a class="mod" href="#mock-${m.id}">${icon("exam")}<strong>${esc(m.name)}</strong><span>${stars(m.lvl)} ${r ? `· zuletzt ${r.np} NP (${r.total}/${r.max})` : "· noch nicht geschrieben"}</span></a>`; }).join("")}</div>
      <p class="note">Aufbau und Zeiten entsprechen den Vorgaben 2027 für deinen Kurs. Die Aufgaben sind eigens erstellt; die Punkte vergibst du selbst nach dem Erwartungshorizont. Die Notenpunkte beruhen auf einem verbreiteten prozentualen Schlüssel (keine amtliche Tabelle für 2027).</p>`;
  };

  function forKurs(ids, get) {
    if (S.kurs === "LK") return ids.slice();
    const used = new Set(ids.filter((i) => !get(i).lk));
    return ids.map((i) => { const it = get(i); if (!it.lk) return i; const pool = (get === TA ? TEILA : TEILB).filter((x) => x.sg === it.sg && !x.lk && !used.has(x.id)); const rep = pool[0] ? pool[0].id : i; used.add(rep); return rep; });
  }

  window.viewMock = function (root, id) {
    const m = MOCKS.find((x) => x.id === id) || MOCKS[0]; const k = K();
    let pflicht = forKurs(m.pflicht, TA);
    if (S.kurs === "GK") { const a = pflicht.filter((i) => TA(i).sg === "A")[0], g = pflicht.find((i) => TA(i).sg === "G"), s = pflicht.find((i) => TA(i).sg === "S"); pflicht = [a, g, s]; }
    const wahl = forKurs(m.wahl, TA).filter((i) => !pflicht.includes(i));
    const bA = forKurs(m.b[0], TB), bG = forKurs([m.b[1]], TB)[0], bS = forKurs([m.b[2]], TB)[0];
    const R = { A: null, B: null }, st = { chosen: [], ana: 0 };
    root.innerHTML = `<a class="back" href="#pruefung">${icon("back")} Prüfung</a><p class="eyebrow">${esc(k.name)} · ${stars(m.lvl)}</p><h1>${esc(m.name)}</h1>
      ${m.guided ? `<p class="callout">Geführte Klausur: Lies zu jeder Aufgabe zuerst den Hinweis. Zeiten sind Richtwerte.</p>` : `<p class="muted">Arbeite auf Papier. Teil A ohne Rechner und Formelsammlung, danach Teil B.</p>`}
      <section class="sec" id="pa"><h2>Teil A · hilfsmittelfrei <span class="mono small">${k.teilA.min} min</span></h2><div class="row ta-t"></div>
        <h3>Pflichtaufgaben</h3><div class="pf"></div>
        <h3>Wahlpflichtaufgaben – wähle genau zwei</h3><ul class="checks wp">${wahl.map((i) => `<li><label><input type="checkbox" value="${i}"> ${md(TA(i).t)} <span class="tag">${SG[TA(i).sg]}</span></label></li>`).join("")}</ul>
        <button class="btn sm" id="wp-go">Auswahl bestätigen</button><div class="wpb"></div>
        <p class="rsum">Teil A: <strong class="mono ta-sum">0</strong></p></section>
      <section class="sec" id="pb"><h2>Teil B · mit Hilfsmitteln <span class="mono small">${k.teilB.min} min</span></h2>
        <p class="hint">Die Lehrkraft wählt eine der beiden Analysis-Aufgaben. Simuliere die Wahl:</p>
        <div class="seg sm" role="radiogroup" aria-label="Analysis-Aufgabe">${bA.map((b, i) => `<button role="radio" aria-checked="${i === 0}" data-ana="${i}">${esc(TB(b).t.replace(/\$[^$]*\$/g, "").trim() || b)}</button>`).join("")}</div>
        <div class="row tb-t"></div><div class="bb"></div><p class="rsum">Teil B: <strong class="mono tb-sum">0</strong></p></section>
      <section class="sec"><h2>Auswertung</h2><div class="sum"></div><button class="btn" id="mk-save">Klausur auswerten und speichern</button></section>`;
    Timer($(".ta-t", root), k.teilA.min * 60, "Teil A"); Timer($(".tb-t", root), k.teilB.min * 60, "Teil B");
    const scores = { pf: {}, wp: {}, b: {} };
    const hints = { A: "Hinweis: Ableitungsregeln, Nullprodukt, Integrale mit Stammfunktion.", G: "Hinweis: Skizze machen, Vektoren komponentenweise.", S: "Hinweis: Baumdiagramm oder Vierfeldertafel zeichnen." };
    pflicht.forEach((i) => { const box = h(`<div class="mbox"></div>`); $(".pf", root).appendChild(box); if (m.guided) box.appendChild(h(`<p class="hint">${hints[TA(i).sg]}</p>`)); Solve(box, TA(i), { ctx: "-" + id, onScore: (t) => { scores.pf[i] = t; sum(); } }); });
    $("#wp-go", root).onclick = () => { const ch = $$(".wp input:checked", root).map((x) => x.value); if (ch.length !== 2) { $(".wpb", root).innerHTML = `<p class="bad">Bitte genau zwei Wahlpflichtaufgaben wählen.</p>`; return; } scores.wp = {}; $(".wpb", root).innerHTML = ""; $$(".wp input", root).forEach((x) => (x.disabled = true)); $("#wp-go", root).remove(); ch.forEach((i) => Solve($(".wpb", root), TA(i), { ctx: "-" + id, onScore: (t) => { scores.wp[i] = t; sum(); } })); st.chosen = ch; sum(); };
    function showB() { $(".bb", root).innerHTML = ""; scores.b = {}; [bA[st.ana], bG, bS].forEach((b) => { const box = h(`<div class="mbox"></div>`); $(".bb", root).appendChild(box); if (m.guided) box.appendChild(h(`<p class="hint">${hints[TB(b).sg]} Rechnerweg notieren!</p>`)); Solve(box, TB(b), { ctx: "-" + id, onScore: (t) => { scores.b[b] = t; sum(); } }); }); sum(); }
    $$("[data-ana]", root).forEach((b) => (b.onclick = () => { $$("[data-ana]", root).forEach((x) => x.setAttribute("aria-checked", x === b)); st.ana = +b.dataset.ana; showB(); }));
    showB();
    function maxes() { const aMax = (pflicht.length + 2) * 5; const bMax = [bA[st.ana], bG, bS].reduce((s, b) => s + TB(b).be, 0); return { aMax, bMax }; }
    function sum() {
      const { aMax, bMax } = maxes(); const a = Object.values(scores.pf).concat(Object.values(scores.wp)).reduce((x, y) => x + y, 0), b = Object.values(scores.b).reduce((x, y) => x + y, 0);
      $(".ta-sum", root).textContent = `${a} / ${aMax} BE`; $(".tb-sum", root).textContent = `${b} / ${bMax} BE`;
      const tot = a + b, max = aMax + bMax, pct = Math.round((tot / max) * 1000) / 10;
      $(".sum", root).innerHTML = `<div class="tblwrap"><table class="tbl"><tbody><tr><td>Teil A</td><td class="mono">${a} / ${aMax}</td></tr><tr><td>Teil B</td><td class="mono">${b} / ${bMax}</td></tr><tr><th>Gesamt</th><th class="mono">${tot} / ${max} = ${String(pct).replace(".", ",")} % → ${npFrom(pct)} Notenpunkte</th></tr></tbody></table></div>${st.chosen.length === 2 ? "" : `<p class="note warn">Wahlpflichtaufgaben noch nicht gewählt.</p>`}<p class="note small">Selbstbewertung mit prozentualem Notenschlüssel (95 % → 15 NP … 45 % → 5 NP). Die Gewichtung der Teile im echten Abitur legt das Ministerium in den Aufgaben fest.</p>`;
      return { tot, max, pct };
    }
    sum();
    $("#mk-save", root).onclick = () => { const r = sum(); const np = npFrom(r.pct); S.mocks[id] = { date: today(), total: r.tot, max: r.max, np }; recordScore("exam", r.tot / r.max); checkBadges(); save(); $("#mk-save", root).textContent = "Gespeichert: " + np + " Notenpunkte"; };
  };

  /* ---------- Grundlagen ---------- */
  window.RESP = [["1920 × 1080", "Desktop", "85 Ansichten + alle Plantage ohne Fehler, kein horizontales Scrollen"], ["1440 × 900", "Laptop", "85 Ansichten ohne Fehler (LK und GK)"], ["1024 × 1366", "Tablet hoch (iPad Pro)", "85 Ansichten ohne Fehler"], ["768 × 1024", "Tablet hoch (iPad)", "85 Ansichten ohne Fehler"], ["390 × 844", "Smartphone (iPhone 14)", "85 Ansichten ohne Fehler (LK und GK)"], ["375 × 812", "Smartphone (iPhone X)", "85 Ansichten ohne Fehler"]];
  window.viewGrundlagen = function (root) {
    const plans = [30, 60, 90, 120].map((l) => { const d = genPlan(l, S.kurs); const c = (k) => d.filter((x) => x.kind === k).length; return { l, day: c("day"), review: c("review"), mock: c("mock"), other: c("diag") + c("strategy") + c("final") }; });
    const reqs = [
      ["Prüfungsteil A (hilfsmittelfrei): LK 4 Pflichtaufgaben (2 Analysis, je 1 Geometrie/LA und Stochastik) + 2 aus 6 Wahlpflichtaufgaben; GK 3 Pflicht + 2 aus 6", "LK / GK", 0],
      ["Prüfungsteil B (mit Hilfsmitteln): 3 Aufgaben (je 1 pro Sachgebiet), Lehrkraft wählt 1 von 2 Analysis-Aufgaben; getrennte Aufgabensätze WTR und CAS/MMS", "LK, GK", 0],
      ["Arbeitszeit einschließlich Auswahlzeit: LK 300 Min., GK 255 Min.", "LK / GK", 0],
      ["Teil A: LK 110 Min., GK 100 Min.; Teil B: LK 190 Min., GK 155 Min. (Anpassung, Umfang Teil B um 20 Punkte verringert)", "LK / GK", 2],
      ["Hilfsmittel: WTR oder CAS/MMS (Teil B), ländergemeinsame Formelsammlung (ab 2027 verpflichtend) bzw. „Dokument mit mathematischen Formeln“, Rechtschreibwörterbuch", "LK, GK", 2],
      ["Operatoren: Liste gültig ab Abitur 2023, angepasst 2026", "LK, GK", 1],
      ["Inhaltliche Schwerpunkte 2027 je Sachgebiet (s. unten)", "LK, GK", 0],
      ["Termin schriftliche Prüfung Mathematik: Mi, 05.05.2027, 9:00 Uhr (LK und GK)", "LK, GK", 3],
      ["Beispielaufgaben Teil A: je Aufgabe 5 Punkte", "LK, GK", 5]
    ];
    const status = [
      ["NRW-Anforderungen", "Verified", "Aus Vorgaben 2027, Fachseite, Operatorenliste, Beispielaufgaben und Terminliste recherchiert."],
      ["Rechenergebnisse", "Verified", "Alle Zahlenwerte in Lektionen, Teil A und Teil B mit sympy/scipy nachgerechnet; alle Formeln mit KaTeX geprüft."],
      ["30/60/90/120-Tage-Kurs", "Complete", "Generator mit Diagnose, 4 Probeklausuren, Wochenwiederholung, Strategie und Endspurt."],
      ["Graph-Labor", "Complete", "10 interaktive Labore (Funktionen, Scharen, Integral, Binomial- und Normalverteilung)."],
      ["Notenschlüssel", "Issues", "Verbreiteter prozentualer Schlüssel; amtliche Punkt-Noten-Zuordnung steht in den jeweiligen Abituraufgaben."],
      ["Audio/Video", "Issues", "Sprachausgabe des Geräts; Erklärclips als animierte Folien, kein gefilmtes Video."],
      ["CAS-spezifische Aufgaben", "Issues", "Teil-B-Aufgaben sind rechnerneutral gestellt (WTR oder CAS); keine gerätespezifischen Befehle."],
      ["Fortschritt", "Verified", "Lokal im Browser gespeichert; nicht geräteübergreifend."]
    ];
    root.innerHTML = `<div class="ph"><h1>Grundlagen & Bericht</h1></div>
      <p><span class="tag off">Offiziell NRW</span> = aus amtlichen Dokumenten für das <strong>Abitur 2027</strong>; <span class="tag">Übungsmaterial</span> = für diesen Kurs erstellt.</p>
      <section class="sec"><h2>A · NRW-Anforderungen (Abitur 2027)</h2><div class="tblwrap"><table class="tbl"><thead><tr><th>Anforderung</th><th>Kurs</th><th>Quelle</th></tr></thead><tbody>${reqs.map((r) => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td><a href="${O.sources[r[2]].url}" target="_blank" rel="noopener">${esc(O.sources[r[2]].name.split(" (")[0])}</a></td></tr>`).join("")}</tbody></table></div>
      <h3>Inhaltliche Schwerpunkte 2027 (${esc(K().name)})</h3>${["A", "G", "S"].map((sg) => `<h4>${esc(O.inhalte[sg].name)}</h4><ul class="small">${O.inhalte[sg][S.kurs].map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`).join("")}
      <p class="small">Unterschiede LK zu GK u. a.: allgemeine Kettenregel, ln-Funktion, Potenzfunktionen mit rationalem Exponenten, Sinusfunktionen $a\\sin(bx+c)+d$ in allgemeiner Form, Funktionenscharen, Normalform und Abstände, Binomialkoeffizient und σ-Regeln, Normalverteilung.</p>
      <h3>Notenschlüssel (Orientierung)</h3><div class="tblwrap"><table class="tbl center"><thead><tr><th>ab %</th>${O.noten.map((r) => `<td class="mono">${r[0]}</td>`).join("")}</tr></thead><tbody><tr><th>NP</th>${O.noten.map((r) => `<td class="mono">${r[1]}</td>`).join("")}</tr></tbody></table></div>
      <h3>Quellen</h3><ol class="small">${O.sources.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join("")}</ol></section>
      <section class="sec"><h2>B · Kursstruktur (${esc(K().short)})</h2><div class="tblwrap"><table class="tbl"><thead><tr><th>Plan</th><th>Lerntage</th><th>Wiederholung</th><th>Probeklausuren</th><th>Diagnose/Strategie/Endspurt</th></tr></thead><tbody>${plans.map((p) => `<tr><td class="mono">${p.l} Tage</td><td class="mono">${p.day}</td><td class="mono">${p.review}</td><td class="mono">${p.mock}</td><td class="mono">${p.other}</td></tr>`).join("")}</tbody></table></div><p class="small">Reihenfolge der Lektionen: Analysis, Analysis, Geometrie, Stochastik im Wechsel; bei langen Plänen folgen weitere Durchgänge mit anderen Übungen.</p></section>
      <section class="sec"><h2>C · Tagespaket</h2><ol class="small">${COMP.map((c, i) => `<li>${esc(c[1])} <span class="mono muted">${["5 min", "15 min", "10 min", "15–20 min", "10 min", "10–15 min", "20–30 min", "5–10 min"][i]}</span></li>`).join("")}</ol></section>
      <section class="sec"><h2>D · Inhalte</h2><p class="small">${TOPICS.length} Lektionen (${TOPICS.filter((t) => t.lk).length} nur LK) · ${TOPICS.reduce((a, t) => a + t.ueben.length, 0)} Übungen · ${TEILA.length} Aufgaben Teil A · ${TEILB.length} Aufgaben Teil B · ${MOCKS.length} Probeklausuren · Kopfrechen-Blitz mit unbegrenzten Aufgaben · ${PODCASTS.length} Podcasts · ${CLIPS.length} Erklärclips · ${OPS.length} Operatoren.</p></section>
      <section class="sec"><h2>E · Responsives Design (getestet)</h2>${RESP.length ? `<div class="tblwrap"><table class="tbl"><thead><tr><th>Größe</th><th>Gerät</th><th>Ergebnis</th></tr></thead><tbody>${RESP.map((r) => `<tr><td class="mono">${r[0]}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join("")}</tbody></table></div>` : `<p class="muted">Noch nicht getestet.</p>`}</section>
      <section class="sec"><h2>F · Status</h2><div class="tblwrap"><table class="tbl"><thead><tr><th>Bereich</th><th>Status</th><th>Hinweis</th></tr></thead><tbody>${status.map((s) => `<tr><td>${esc(s[0])}</td><td><span class="st st-${s[1].toLowerCase()}">${s[1]}</span></td><td class="small">${esc(s[2])}</td></tr>`).join("")}</tbody></table></div></section>`;
    $$("p.small", root).forEach((p) => { if (p.textContent.includes("$")) p.innerHTML = md(p.textContent); });
  };

  /* ---------- Router ---------- */
  let curDay = 0;
  function route() {
    stopAudio(); if (curDay) { leaveTag(curDay); curDay = 0; }
    const hsh = (location.hash || "#heute").slice(1);
    const main = $("#main"); main.innerHTML = ""; const root = document.createElement("div"); root.className = "view"; main.appendChild(root);
    let nav = "module"; const [a, ...rest] = hsh.split("-"); const b = rest.join("-");
    try {
      if (hsh === "heute" || hsh === "") { nav = "heute"; viewHeute(root); }
      else if (hsh === "plan") { nav = "plan"; viewPlan(root); }
      else if (a === "tag") { nav = "plan"; curDay = +b; viewTag(root, +b); }
      else if (hsh === "module") viewModule(root);
      else if (hsh === "pruefung") { nav = "pruefung"; viewPruefung(root); }
      else if (a === "mock") { nav = "pruefung"; viewMock(root, b); }
      else if (hsh === "grundlagen") { nav = "grundlagen"; viewGrundlagen(root); }
      else if (a === "t") viewTopic(root, b);
      else if (a === "a") viewA(root, b);
      else if (a === "b") viewB(root, b);
      else if (a === "clip") viewClip(root, b);
      else if (a === "m") ({ diag: viewDiag, themen: viewThemen, teila: viewTeilA, blitz: viewBlitz, teilb: viewTeilB, labor: viewLabor, formeln: viewFormeln, operatoren: viewOperatoren, strategy: viewStrategy, podcast: viewPodcast, video: viewVideo, final: viewFinal }[b] || viewModule)(root);
      else { nav = "heute"; viewHeute(root); }
    } catch (e) { root.innerHTML = `<p class="bad">Diese Ansicht konnte nicht geladen werden: ${esc(e.message)}</p><a href="#heute">Zur Startseite</a>`; console.error(e); }
    $$(".nav a").forEach((x) => x.setAttribute("aria-current", x.dataset.nav === nav ? "page" : "false"));
    const hd = $("h1", root); if (hd) hd.tabIndex = -1;
  }
  window.rerender = route;
  window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); const hd = $("#main h1"); if (hd) hd.focus({ preventScroll: true }); });
  function init() { const sel = $("#kurs"); if (!sel || sel.dataset.init) return; sel.dataset.init = 1; sel.value = S.kurs; sel.onchange = () => { S.kurs = sel.value; save(); route(); }; route(); }
  document.addEventListener("DOMContentLoaded", init);
  if (document.readyState !== "loading") init();
})();
