/* ===== Mathe: Module ===== */
(function () {
  const O = window.OFFICIAL;
  const back = (to, label) => `<a class="back" href="#${to || "module"}">${icon("back")} ${label || "Module"}</a>`;
  const MODS = () => [
    ["m-diag", "Einstufungstest", "target", "10 Aufgaben, Empfehlung für die Plan-Länge"],
    ["m-themen", "Lektionen", "read", myTopics().length + " Themen: Wissen, Beispiel, Übungen"],
    ["m-teila", "Prüfungsteil A", "target", TEILA.filter((a) => S.kurs === "LK" || !a.lk).length + " hilfsmittelfreie Aufgaben mit Lösung"],
    ["m-blitz", "Kopfrechen-Blitz", "spark", "60 Sekunden ohne Rechner, unbegrenzt neue Aufgaben"],
    ["m-teilb", "Prüfungsteil B", "exam", TEILB.filter((b) => S.kurs === "LK" || !b.lk).length + " Abituraufgaben mit Erwartungshorizont"],
    ["m-labor", "Graph-Labor", "globe", "Funktionen, Scharen, Integrale, Verteilungen interaktiv"],
    ["m-formeln", "Formelüberblick", "grammar", "Alle Formeln der Lektionen auf einer Seite"],
    ["m-operatoren", "Operatoren", "task", "Offizielle Liste mit Beispielen und Quiz"],
    ["m-strategy", "Prüfungsstrategie", "clock", "Ablauf, Zeitplan, typische Fehler"],
    ["m-podcast", "Podcasts", "audio", PODCASTS.length + " Folgen mit Transkript"],
    ["m-video", "Erklärclips", "video", CLIPS.length + " animierte Clips mit Sprachausgabe"],
    ["pruefung", "Probeklausuren", "exam", MOCKS.length + " Klausuren, Teil A und B unter Zeitbedingungen"],
    ["m-final", "Endspurt", "check", "Fehlerliste, Checkliste, Formeln"]
  ];
  window.viewModule = function (root) {
    root.innerHTML = `<div class="ph"><h1>Module</h1></div>
    <div class="modgrid">${MODS().map((m) => `<a class="mod" href="#${m[0]}">${icon(m[2])}<strong>${m[1]}</strong><span>${esc(m[3])}</span></a>`).join("")}</div>
    <p class="note">Alle Aufgaben, Beispiele und Probeklausuren sind eigens erstellt; alle Zahlenwerte wurden per Computeralgebra nachgerechnet. Amtlich sind nur die unter «Grundlagen» als <span class="tag off">Offiziell NRW</span> markierten Vorgaben.</p>`;
  };

  /* ---------- Einstufung ---------- */
  window.viewDiag = function (root) {
    root.innerHTML = `${back()}<h1>Einstufungstest</h1><p class="muted">Etwa 20 Minuten, ohne Rechner. Ergebnis: Stärken je Sachgebiet und eine Empfehlung für die Plan-Länge.</p>
      <section class="sec"><h2>Aufgaben</h2><div class="dq"></div></section>
      <section class="sec"><h2>Selbsteinschätzung</h2>${["Ich kann Funktionen sicher ableiten (Produkt- und Kettenregel).", "Ich kann Ebenengleichungen aufstellen und Schnittpunkte berechnen.", "Ich kann Aufgaben zur Binomialverteilung mit dem Rechner lösen.", "Ich kann Sachaufgaben (Modellierung) strukturiert bearbeiten."].map((t, i) => `<div class="selfq"><p>${t}</p><div class="seg4" role="radiogroup">${["kaum", "teilweise", "gut", "sicher"].map((l, j) => `<label><input type="radio" name="self${i}" value="${j}">${l}</label>`).join("")}</div></div>`).join("")}</section>
      <button class="btn" id="diag-go">Auswerten</button><div class="dres"></div>`;
    const res = { A: [0, 0], G: [0, 0], S: [0, 0] };
    DIAG.topics.map(TP).filter((t) => S.kurs === "LK" || !t.lk).forEach((t) => { const x = t.ueben[0]; const cb = (ok) => { res[t.sg][1]++; if (ok) res[t.sg][0]++; }; if (x.type === "mc") MC($(".dq", root), x.q, x.o, x.a, x.why, cb, { skill: t.sg }); else NumQ($(".dq", root), x.q, x.ans, x.tol, x.why, cb, { skill: t.sg }); });
    $("#diag-go", root).onclick = () => {
      const pct = (a) => (a[1] ? Math.round((a[0] / a[1]) * 100) : 0);
      const self = [0, 1, 2, 3].map((i) => { const c = $(`input[name=self${i}]:checked`, root); return c ? +c.value : 1; });
      const score = Math.round(pct(res.A) * 0.4 + pct(res.G) * 0.2 + pct(res.S) * 0.2 + (self.reduce((a, b) => a + b, 0) / 12) * 20);
      let rec = score < 45 ? 120 : score < 65 ? 90 : score < 80 ? 60 : 30; while (rec > daysToExam() && rec > 30) rec -= 30;
      S.diag = { date: today(), score, A: pct(res.A), G: pct(res.G), S: pct(res.S), rec }; checkBadges(); save();
      $(".dres", root).innerHTML = `<div class="panel result"><h2>Ergebnis: ${score} / 100</h2><ul class="skills">${[["Analysis", pct(res.A)], ["Geometrie", pct(res.G)], ["Stochastik", pct(res.S)]].map(([l, p]) => `<li><span>${l}</span><span class="bar"><span style="width:${p}%" class="${p < 50 ? "b-bad" : p < 70 ? "b-warn" : "b-good"}"></span></span><span class="mono small">${p}%</span></li>`).join("")}</ul>
        <p><strong>Empfehlung: ${rec}-Tage-Plan.</strong> <button class="btn sm" id="diag-apply">Übernehmen</button></p><p class="note">Übungsdiagnose dieses Kurses, keine amtliche Einstufung. Unbeantwortete Aufgaben zählen nicht.</p></div>`;
      $("#diag-apply", root).onclick = () => { S.planLen = rec; save(); location.hash = "plan"; };
    };
  };

  /* ---------- Lektionen ---------- */
  window.viewThemen = function (root) {
    root.innerHTML = `${back()}<h1>Lektionen</h1><p class="muted">Jede Lektion: Ziel → Wissen → Formeln → Beispiel Schritt für Schritt → Übungen → Teil-A-Aufgabe → Graph-Labor.</p>
      ${["A", "G", "S"].map((sg) => `<section class="sec"><h2>${SG[sg]}</h2><ul class="glist">${TOPICS.filter((t) => t.sg === sg).map((t) => { const off = S.kurs === "GK" && t.lk; return `<li><a href="#t-${t.id}" class="${off ? "dimlink" : ""}"><span>${md(t.t)}</span>${off ? '<span class="tag">nur LK</span>' : ""}<span class="mono small">${t.ueben.length}</span></a></li>`; }).join("")}</ul></section>`).join("")}`;
  };
  window.viewTopic = function (root, id) {
    const t = TP(id) || TOPICS[0];
    root.innerHTML = `${back("m-themen", "Lektionen")}<p class="eyebrow">${SG[t.sg]}${t.lk ? " · nur Leistungskurs" : ""}</p><h1>${md(t.t)}</h1>
      <section class="sec"><p class="goal">${md(t.goal)}</p>${t.wissen.map((w) => `<p>${md(w)}</p>`).join("")}</section>
      <section class="sec"><h2>Formeln</h2><div class="formeln">${t.formeln.map((f) => tex(f, true)).join("")}</div></section>
      <section class="sec"><h2>Beispiel Schritt für Schritt</h2><div class="bsp"></div></section>
      <section class="sec"><h2>Übungen</h2><div class="ueb"></div></section>
      ${t.teilA.length ? `<section class="sec"><h2>Prüfungsteil A zu diesem Thema</h2><div class="ta"></div></section>` : ""}
      ${t.lab ? `<section class="sec"><h2>Graph-Labor</h2><div class="lb"></div></section>` : ""}`;
    stepExample($(".bsp", root), t);
    t.ueben.forEach((x) => exercise($(".ueb", root), x, t.sg));
    t.teilA.forEach((a) => Solve($(".ta", root), TA(a)));
    if (t.lab) Lab($(".lb", root), t.lab);
  };

  /* ---------- Teil A ---------- */
  window.viewTeilA = function (root) {
    const k = K().teilA;
    root.innerHTML = `${back()}<h1>Prüfungsteil A · hilfsmittelfrei</h1>
      <p><span class="tag off">Offiziell NRW</span> ${esc(K().name)}: ${k.pflicht} Pflichtaufgaben${S.kurs === "LK" ? " (2 Analysis, je 1 Geometrie und Stochastik)" : " (je 1 pro Sachgebiet)"} und 2 aus 6 Wahlpflichtaufgaben (je 2 pro Sachgebiet), ${k.min} Minuten einschließlich Auswahlzeit. Jede Aufgabe hat in den Beispielaufgaben 5 Punkte.</p>
      <p class="hint">Nur Zeichengeräte und Rechtschreibwörterbuch. Erst vollständig auf Papier lösen, dann Lösung aufdecken und ehrlich bewerten.</p>
      ${["A", "G", "S"].map((sg) => `<section class="sec"><h2>${SG[sg]}</h2><ul class="glist">${TEILA.filter((a) => a.sg === sg).map((a) => { const off = S.kurs === "GK" && a.lk; const sc = S.topic["score-a-" + a.id]; return `<li><a href="#a-${a.id}" class="${off ? "dimlink" : ""}"><span>${md(a.t)}</span>${off ? '<span class="tag">nur LK</span>' : ""}<span class="mono small">${sc == null ? "5 BE" : Math.round(sc * 100) + "%"}</span></a></li>`; }).join("")}</ul></section>`).join("")}`;
  };
  window.viewA = function (root, id) {
    const a = TA(id) || TEILA[0];
    root.innerHTML = `${back("m-teila", "Prüfungsteil A")}<div class="row"></div><div class="host"></div>`;
    Timer($(".row", root), 9 * 60, "Richtzeit");
    Solve($(".host", root), a);
  };
  window.viewBlitz = function (root) {
    root.innerHTML = `${back()}<h1>Kopfrechen-Blitz</h1><p class="muted">Ableitungen, Integrale, Skalarprodukte, Binomialkoeffizienten, Sinuswerte, $e$ und $\\ln$ – ohne Rechner. Jede Runde erzeugt neue Aufgaben mit exakt berechneten Lösungen.</p>
      <section class="sec"><div class="row blt"></div><div class="blitz"></div></section>
      <section class="sec"><h2>Ohne Zeitdruck üben</h2><div class="free"></div><button class="btn sm ghost" id="more">5 neue Aufgaben</button></section>`;
    root.querySelector(".muted").innerHTML = md(root.querySelector(".muted").textContent);
    const bl = $(".blitz", root); let running = false, score = 0, seed = Date.now() % 100000;
    const tm = Timer($(".blt", root), 60, "Zeit", () => { running = false; bl.innerHTML = `<p class="good"><strong>${score} richtig.</strong> ${score > (S.blitz || 0) ? "Neuer persönlicher Bestwert!" : "Bestwert: " + (S.blitz || 0)}</p>`; if (score > (S.blitz || 0)) { S.blitz = score; save(); } recordScore("hmf", Math.min(1, score / 8)); });
    function next() { if (!running) return; bl.innerHTML = ""; const it = blitzItem(seed++); NumQ(bl, it.q, it.ans, 0.001, it.why, (ok) => { if (ok) score++; setTimeout(next, ok ? 400 : 1600); }); const inp = $("input", bl); if (inp) inp.focus(); }
    const st = h(`<button class="btn sm">Blitz starten</button>`); $(".blt", root).prepend(st);
    st.onclick = () => { score = 0; running = true; tm.start(); st.remove(); next(); };
    const more = () => { for (let i = 0; i < 5; i++) { const it = blitzItem(seed++ * 3); NumQ($(".free", root), it.q, it.ans, 0.001, it.why, null, { skill: "hmf" }); } };
    $("#more", root).onclick = more; more();
  };

  /* ---------- Teil B ---------- */
  window.viewTeilB = function (root) {
    root.innerHTML = `${back()}<h1>Prüfungsteil B · mit Hilfsmitteln</h1>
      <p><span class="tag off">Offiziell NRW</span> ${esc(K().name)}: drei Aufgaben (je eine aus Analysis, Geometrie, Stochastik), ${K().teilB.min} Minuten. Die Lehrkraft wählt eine von zwei Analysis-Aufgaben aus; es gibt getrennte Aufgabensätze für WTR und CAS/MMS.</p>
      <p class="hint">Rechnerwege immer mathematisch notieren (Ansatz + Ergebnis). Punktzahlen in diesem Kurs sind Übungswerte.</p>
      ${["A", "G", "S"].map((sg) => `<section class="sec"><h2>${SG[sg]}</h2><ul class="glist">${TEILB.filter((b) => b.sg === sg).map((b) => { const off = S.kurs === "GK" && b.lk; const sc = S.topic["score-b-" + b.id]; return `<li><a href="#b-${b.id}" class="${off ? "dimlink" : ""}"><span>${md(b.t)}</span>${off ? '<span class="tag">nur LK</span>' : ""}<span class="mono small">${sc == null ? b.be + " BE" : Math.round(sc * 100) + "%"}</span></a></li>`; }).join("")}</ul></section>`).join("")}`;
  };
  window.viewB = function (root, id) {
    const b = TB(id) || TEILB[0];
    root.innerHTML = `${back("m-teilb", "Prüfungsteil B")}<div class="row"></div><div class="host"></div>`;
    Timer($(".row", root), Math.round((K().teilB.min / 3) * 60), "Richtzeit (⅓ von Teil B)");
    Solve($(".host", root), b);
  };

  /* ---------- Labor ---------- */
  window.viewLabor = function (root) {
    const keys = ["poly", "tangent", "exp", "trig", "trans", "integral", "binom"].concat(S.kurs === "LK" ? ["ln", "schar", "normal"] : []);
    const names = { poly: "Ganzrationale Funktionen", tangent: "Tangente & Ableitung", exp: "Exponentialfunktion", trig: "Sinusfunktion", trans: "Transformationen", integral: "Integral & Fläche", binom: "Binomialverteilung", ln: "ln-Funktion (LK)", schar: "Funktionenschar (LK)", normal: "Normalverteilung (LK)" };
    const st = window._lab = window._lab || { k: "tangent" }; if (!keys.includes(st.k)) st.k = keys[0];
    root.innerHTML = `${back()}<h1>Graph-Labor</h1><div class="seg" role="radiogroup" aria-label="Labor">${keys.map((k) => `<button role="radio" aria-checked="${k === st.k}" data-k="${k}"><strong>${names[k]}</strong></button>`).join("")}</div><div class="lh"></div>`;
    Lab($(".lh", root), st.k);
    $$("[data-k]", root).forEach((b) => (b.onclick = () => { st.k = b.dataset.k; rerender(); }));
  };

  /* ---------- Formeln ---------- */
  window.viewFormeln = function (root) {
    root.innerHTML = `${back()}<h1>Formelüberblick</h1><p class="muted">In Teil B hast du die ländergemeinsame Formelsammlung (bzw. das „Dokument mit mathematischen Formeln“). In Teil A nicht – dort musst du die Grundlagen können. <label class="inl"><input type="checkbox" id="hide"> Formeln verdecken (Selbsttest)</label></p>
      ${["A", "G", "S"].map((sg) => `<section class="sec"><h2>${SG[sg]}</h2>${myTopics().filter((t) => t.sg === sg).map((t) => `<h3>${md(t.t)}</h3><div class="formeln fm">${t.formeln.map((f) => `<div class="fcard" tabindex="0">${tex(f, true)}</div>`).join("")}</div>`).join("")}</section>`).join("")}`;
    $("#hide", root).onchange = (e) => root.classList.toggle("hidef", e.target.checked);
    root.addEventListener("click", (e) => { const c = e.target.closest(".fcard"); if (c) c.classList.toggle("peek"); });
  };

  /* ---------- Operatoren ---------- */
  window.viewOperatoren = function (root) {
    root.innerHTML = `${back()}<h1>Operatoren</h1><p><span class="tag off">Offiziell NRW</span> Liste gültig ab Abitur 2023 (angepasst 2026). Erklärungen und Beispiele sind eigene Formulierungen <span class="tag">Übungsmaterial</span>.</p>
      <div class="opgrid">${OPS.map((o) => `<article class="op"><h3>${esc(o[0])}</h3><p>${md(o[1])}</p><p class="task">${md(o[2])}</p></article>`).join("")}</div>
      <section class="sec"><h2>Operator-Quiz</h2><div class="oq"></div></section>`;
    const pick = OPS.slice().sort(() => Math.random() - 0.5).slice(0, 5);
    pick.forEach((o) => { const others = OPS.filter((x) => x !== o).sort(() => Math.random() - 0.5).slice(0, 2); const opts = [o, ...others].sort(() => Math.random() - 0.5); MC($(".oq", root), "Welcher Operator passt? " + o[1], opts.map((x) => x[0]), opts.indexOf(o), "«" + o[0] + "»", null, { skill: "op" }); });
  };

  /* ---------- Strategie ---------- */
  window.viewStrategy = function (root) {
    const k = K();
    root.innerHTML = `${back()}<h1>So bearbeitest du die Mathe-Abiturprüfung</h1>
      <section class="sec"><h2>Zeitplan (${esc(k.short)}, ${k.dauer} Min.)</h2><div class="timeline"><div class="tl-HV" style="flex:${k.teilA.min}"><strong>Teil A · ohne Hilfsmittel</strong><span class="mono">${k.teilA.min} min</span></div><div class="tl-SL" style="flex:${k.teilB.min}"><strong>Teil B · mit Hilfsmitteln</strong><span class="mono">${k.teilB.min} min</span></div></div>
      <p class="hint">Vorschlag Teil A: 5 Min. Wahlpflicht auswählen, je Aufgabe ca. ${Math.round((k.teilA.min - 15) / (k.teilA.pflicht + 2))} Min., 10 Min. Kontrolle. Teil B: je Aufgabe ca. ${Math.round((k.teilB.min - 10) / 3)} Min., 10 Min. Kontrolle. (Empfehlung des Kurses)</p></section>
      <ol class="strat">${STRATEGY.map((s) => `<li><h3>${esc(s[0])}</h3><p>${md(s[1])}</p></li>`).join("")}</ol>
      <section class="sec"><h2>Wahlpflicht in 5 Minuten wählen</h2><p>Lies die sechs Aufgabentitel und wähle die zwei, die du am sichersten lösen kannst. Danach siehst du die Aufgaben.</p><div class="wp"></div><button class="btn sm" id="wp-ok">Auswahl bestätigen</button><div class="wpres"></div></section>`;
    const pool = TEILA.filter((a) => S.kurs === "LK" || !a.lk); const six = ["A", "A", "G", "G", "S", "S"].map((sg, i) => pool.filter((a) => a.sg === sg)[(i % 2) + 3] || pool.filter((a) => a.sg === sg)[i % 2]);
    $(".wp", root).innerHTML = `<ul class="checks">${six.map((a, i) => `<li><label><input type="checkbox" data-i="${i}"> ${md(a.t)} <span class="tag">${SG[a.sg]}</span></label></li>`).join("")}</ul>`;
    Timer($(".wp", root), 300, "Auswahlzeit");
    $("#wp-ok", root).onclick = () => { const ch = $$(".wp input:checked", root).map((x) => six[+x.dataset.i]); if (ch.length !== 2) { $(".wpres", root).innerHTML = `<p class="bad">Bitte genau zwei Aufgaben wählen.</p>`; return; } $(".wpres", root).innerHTML = ""; ch.forEach((a) => Solve($(".wpres", root), a)); };
  };

  /* ---------- Podcasts & Clips ---------- */
  window.viewPodcast = function (root) {
    root.innerHTML = `${back()}<h1>Podcasts</h1><p class="muted">Kurze Folgen mit Transkript und Fragen. Ton über die Sprachausgabe deines Geräts.</p><div class="pods"></div>`;
    PODCASTS.forEach((p) => {
      const s = h(`<section class="sec pod"><p class="lbl">${esc(p.series)} · ca. ${p.min} min · ${stars(p.lvl)}</p><h2>${esc(p.title)}</h2><div class="pp"></div><details><summary>Begriffe</summary><ul class="vl">${p.vocab.map((v) => `<li><span><strong>${esc(v[0])}</strong></span><span>${esc(v[1])}</span></li>`).join("")}</ul></details><details><summary>Verständnisfragen</summary><div class="pq"></div></details></section>`);
      $(".pods", root).appendChild(s); Player($(".pp", s), p.seg, {}); p.q.forEach((q) => MC($(".pq", s), q[0], q[1], q[2], "", null, { skill: "exam" }));
    });
  };
  window.viewVideo = function (root) {
    root.innerHTML = `${back()}<h1>Erklärclips</h1><p class="note">Animierte Folien mit Sprachausgabe und Untertiteln, kein gefilmtes Video.</p><div class="modgrid">${CLIPS.map((c) => `<a class="mod" href="#clip-${c.id}">${icon("video")}<strong>${esc(c.title)}</strong><span>${esc(c.cat)} · ${c.slides.length} Folien · ${stars(c.lvl)}</span></a>`).join("")}</div>`;
  };
  window.viewClip = function (root, id) {
    const c = CLIPS.find((x) => x.id === id) || CLIPS[0]; let i = 0, auto = false, tok = 0, sub = true;
    root.innerHTML = `${back("m-video", "Erklärclips")}<p class="eyebrow">${esc(c.cat)}</p><h1>${esc(c.title)}</h1>
      <div class="stage" aria-live="polite"><div class="slide"></div><div class="subs"></div></div>
      <div class="row"><button class="btn sm ghost" data-a="prev">${icon("back")} Zurück</button><button class="btn sm" data-a="play">${icon("play")} Abspielen</button><button class="btn sm ghost" data-a="next">Weiter →</button><button class="btn sm ghost" data-a="sub">Untertitel an/aus</button></div>
      <section class="sec"><h2>Fragen</h2><div class="cq"></div></section><section class="sec"><h2>Zusammenfassung</h2><p>${md(c.summary)}</p></section>`;
    function show() { const s = c.slides[i]; $(".slide", root).innerHTML = `<span class="mono small">${i + 1}/${c.slides.length}</span><h2>${md(s.h)}</h2><ul>${s.b.map((b) => `<li>${md(b)}</li>`).join("")}</ul>`; $(".subs", root).innerHTML = sub ? `<p>${esc(s.t)}</p>` : ""; $(".slide", root).classList.remove("in"); void $(".slide", root).offsetWidth; $(".slide", root).classList.add("in"); }
    const playB = $('[data-a="play"]', root);
    function narrate() { if (!TTS.ok) return; const my = ++tok; speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(c.slides[i].t); u.lang = "de-DE"; const v = TTS.pick("de-DE"); if (v) u.voice = v; u.onend = () => { if (my !== tok || !auto) return; if (i < c.slides.length - 1) { i++; show(); setTimeout(narrate, 600); } else { auto = false; playB.innerHTML = icon("play") + " Nochmal"; } }; speechSynthesis.speak(u); }
    root.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.a === "prev" && i > 0) { i--; show(); if (auto) narrate(); }
      if (b.dataset.a === "next" && i < c.slides.length - 1) { i++; show(); if (auto) narrate(); }
      if (b.dataset.a === "sub") { sub = !sub; show(); }
      if (b.dataset.a === "play") { if (auto) { auto = false; tok++; speechSynthesis.cancel(); playB.innerHTML = icon("play") + " Abspielen"; } else { if (i === c.slides.length - 1 && playB.textContent.includes("Nochmal")) i = 0; auto = true; show(); narrate(); playB.innerHTML = icon("pause") + " Pause"; } } });
    show(); c.q.forEach((q) => MC($(".cq", root), q[0], q[1], q[2], q[3], null, { skill: c.cat === "Analysis" ? "A" : c.cat === "Geometrie" ? "G" : "S" }));
  };

  /* ---------- Endspurt ---------- */
  window.viewFinal = function (root) {
    root.innerHTML = `${back()}<h1>Endspurt</h1>
      <section class="sec"><h2>Deine Fehlerliste</h2>${S.wrong.length ? `<ul class="wrongl">${S.wrong.map((w) => `<li><span class="mono small">${w.d}</span> ${md(w.t)}</li>`).join("")}</ul><button class="btn sm ghost" id="clr">Liste leeren</button>` : `<p class="muted">Keine Fehler gespeichert.</p>`}</section>
      <section class="sec"><h2>Checkliste für die letzte Woche</h2><ul class="checks">${["Rechner geprüft: Bogenmaß, Batterien, Prüfungsmodus, Befehle für Normal-/Binomialverteilung", "Formelsammlung kennen: Wo stehen Ableitungsregeln, Abstandsformeln, Verteilungen?", "Ableitungen aller Grundfunktionen im Schlaf (Teil A)", "Pfadregeln, Vierfeldertafel und Gegenereignis sicher", "Ebenengleichungen umrechnen, Schnittpunkte, Winkel (Sinus bei Gerade–Ebene!)", "Operatoren: angeben – berechnen – zeigen – beurteilen unterscheiden", "Probeklausur 4 unter Zeitbedingungen geschrieben", "Antwortsätze mit Einheiten bei allen Sachaufgaben"].map((c, i) => `<li><label><input type="checkbox" data-i="${i}" ${(S.final || {})[i] ? "checked" : ""}> ${esc(c)}</label></li>`).join("")}</ul></section>
      <section class="sec"><h2>Alle Lektionsziele</h2><dl class="rules">${myTopics().map((t) => `<dt>${md(t.t)}</dt><dd>${md(t.goal)}</dd>`).join("")}</dl></section>`;
    const c = $("#clr", root); if (c) c.onclick = () => { S.wrong = []; save(); rerender(); };
    $$(".checks input", root).forEach((x) => (x.onchange = () => { S.final = S.final || {}; S.final[x.dataset.i] = x.checked; save(); }));
  };
})();
