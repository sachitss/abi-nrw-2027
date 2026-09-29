/* ===== Plan, Heute, Tagespaket ===== */
(function () {
  const O = window.OFF;
  window.TP = (id) => TOPICS.find((t) => t.id === id);
  window.CS = (id) => CASES.find((c) => c.id === id);
  window.kursName = () => (S.kurs === "LK" ? "Leistungskurs" : "Grundkurs");
  window.daysToExam = function () { const a = new Date(); a.setHours(0, 0, 0, 0); const d = O.dateISO[S.kurs]; return Math.max(0, Math.round((new Date(d[0], d[1], d[2]) - a) / 86400000)); };
  window.opInfo = (name) => OPS.find((o) => o[0] === name) || OPS.find((o) => o[0].includes(name)) || OPS[1];

  /* ---- Übungsbausteine ---- */
  window.MCx = function (host, q, opts, a, why, whyNot, tags, onDone) {
    const order = opts.map((o, i) => i).sort(() => Math.random() - 0.5);
    return MC(host, q, order.map((i) => opts[i]), order.indexOf(a), `${why}${whyNot ? " Warum nicht die anderen: " + whyNot : ""}`, onDone, { skill: tags || ["sach"] });
  };
  window.Classify = function (host, q, items, buckets, tags, onDone) {
    const shuffled = items.map((x, i) => ({ t: x[0], b: x[1], i })).sort(() => Math.random() - 0.5);
    const el = h(`<div class="ex cls"><p class="ex-q">${esc(q)}</p><p class="hint">Karte antippen, dann die passende Kategorie antippen (funktioniert mit Finger, Stift, Maus und Tastatur).</p>
      <div class="cards">${shuffled.map((x) => `<button class="card-it" data-i="${x.i}">${esc(x.t)}</button>`).join("")}</div>
      <div class="buckets">${buckets.map((b, k) => `<div class="bucket" data-b="${k}"><button class="b-head">${esc(b)}</button><ul></ul></div>`).join("")}</div><div class="fb" aria-live="polite"></div></div>`);
    host.appendChild(el); let sel = null, ok = 0, tries = 0;
    el.addEventListener("click", (e) => {
      const c = e.target.closest(".card-it"), b = e.target.closest(".bucket");
      if (c && !c.disabled) { $$(".card-it", el).forEach((x) => x.classList.remove("sel")); c.classList.add("sel"); sel = c; return; }
      if (b && sel) {
        tries++; const it = items[+sel.dataset.i];
        if (it[1] === +b.dataset.b) { $("ul", b).insertAdjacentHTML("beforeend", `<li>${esc(it[0])}</li>`); sel.disabled = true; sel.classList.remove("sel"); sel.classList.add("done"); sel = null; ok++; $(".fb", el).innerHTML = `<p class="good">Richtig zugeordnet.${it[2] ? " " + esc(it[2]) : ""}</p>`;
          if (ok === items.length) { const perfect = tries === items.length; $(".fb", el).innerHTML = `<p class="${perfect ? "good" : "bad"}"><strong>Fertig.</strong> ${items.length} Karten mit ${tries} Versuchen.</p>`; recordTags(tags || ["sach"], perfect); if (onDone) onDone(perfect); } }
        else { b.classList.add("shake"); setTimeout(() => b.classList.remove("shake"), 400); $(".fb", el).innerHTML = `<p class="bad">«${esc(it[0])}» gehört nicht zu «${esc(buckets[+b.dataset.b])}».${it[2] ? " Hinweis: " + esc(it[2]) : " Überlege, ob es Ursache, Folge oder Lösung ist."}</p>`; }
      }
    });
  };
  window.termQuiz = function (host, topic, n, tags) {
    const pool = TOPICS.flatMap((t) => t.terms);
    topic.terms.slice(0, n).forEach((tm, k) => {
      const others = pool.filter((x) => x[0] !== tm[0]); const d1 = others[(k * 7 + topic.id.length) % others.length], d2 = others[(k * 13 + 5) % others.length];
      MCx(host, `Welcher Fachbegriff passt? «${tm[1]}»`, [tm[0], d1[0], d2[0] === d1[0] ? others[(k + 3) % others.length][0] : d2[0]], 0, `«${tm[0]}» ist richtig.`, `«${d1[0]}» bedeutet: ${d1[1]}`, tags || ["begriffe", "afb1"]);
    });
  };

  /* ---- Plangenerator ---- */
  const METHODS = [
    { kind: "method", m: "karte", title: "Karten auswerten", sub: "Kartenkompetenz" },
    { kind: "method", m: "diagramm", title: "Diagramme und Statistiken", sub: "Diagrammkompetenz" },
    { kind: "method", m: "material", title: "Materialanalyse", sub: "Material → Beobachtung → Analyse → Erklärung → Bewertung" },
    { kind: "method", m: "operatoren", title: "Operatoren sicher anwenden", sub: "AFB I–III" },
    { kind: "method", m: "rechnen", title: "Geographisch rechnen", sub: "Wachstumsraten, Dichte, Maßstab" },
    { kind: "method", m: "schreiben", title: "Antworten strukturieren", sub: "Vom Kurzantwort bis zur Abiturantwort" },
    { kind: "method", m: "klima", title: "Klimadiagramme", sub: "Klimazonen und Landnutzung" },
    { kind: "method", m: "pyramide", title: "Bevölkerungspyramiden", sub: "Demografie auswerten" }
  ];
  window.METHODS = METHODS;
  window.genPlan = function (len) {
    const special = {};
    special[1] = { kind: "diag", title: "Einstufung", sub: "Standort bestimmen" };
    special[Math.round(len * 0.35)] = { kind: "mock", mock: "m1" };
    special[Math.round(len * 0.55)] = { kind: "mock", mock: "m2" };
    special[Math.round(len * 0.78)] = { kind: "mock", mock: "m3" };
    special[len - 2] = { kind: "mock", mock: "m4" };
    special[len - 1] = { kind: "strategy", title: "Zeitmanagement", sub: `${O.dauer[S.kurs]} Minuten planen` };
    special[len] = { kind: "final", title: "Endspurt", sub: "Letzte Wiederholung" };
    const slots = []; for (let n = 1; n <= len; n++) if (!special[n] && n % 7 !== 0) slots.push(n);
    const methodsUsed = len <= 30 ? METHODS.slice(0, 4) : len <= 60 ? METHODS.slice(0, 6) : METHODS;
    // Sequenz: nach je zwei Themen ein Methodentag, Themen ggf. mehrfach (Vertiefung)
    const seq = []; let ti = 0, mi = 0, pass = 1;
    while (seq.length < slots.length) {
      for (let k = 0; k < 2 && seq.length < slots.length; k++) { seq.push({ kind: "topic", topic: TOPICS[ti].id, pass }); ti++; if (ti === TOPICS.length) { ti = 0; pass++; } }
      if (seq.length < slots.length) { seq.push(Object.assign({}, methodsUsed[mi % methodsUsed.length])); mi++; }
    }
    const days = []; let si = 0;
    for (let n = 1; n <= len; n++) {
      const phase = n <= len / 3 ? "Grundlagen" : n <= (2 * len) / 3 ? "Vertiefung" : "Prüfungstraining";
      let d = special[n];
      if (!d && n % 7 === 0) d = { kind: "review", title: "Wochenwiederholung", sub: "Fachbegriffe und Fehler" };
      if (!d) d = seq[si++];
      d = Object.assign({ n, phase }, d);
      if (d.kind === "topic") { const t = TP(d.topic); d.title = t.t; d.sub = (d.pass > 1 ? "Vertiefung · " : "") + "Inhaltsfeld " + t.if; }
      if (d.kind === "mock") { const m = MOCKS.find((x) => x.id === d.mock); d.title = m.name.split(" – ")[0]; d.sub = m.name.split(" – ")[1]; }
      days.push(d);
    }
    return days;
  };
  window.planDays = () => genPlan(S.planLen);
  window.COMP = [["ziel", "Tagesziel", "target"], ["wissen", "Fachwissen", "read"], ["begriffe", "Fachbegriffe", "vocab"], ["visual", "Karte/Diagramm", "globe"], ["audio", "Audio", "audio"], ["video", "Video", "video"], ["interaktiv", "Interaktiv", "spark"], ["material", "Materialanalyse", "flag"], ["operator", "Operator", "task"], ["abitur", "Abitur-Aufgabe", "exam"], ["wdh", "Wiederholung", "check"], ["test", "Tages-Test", "grammar"]];
  window.dayPct = (n) => Math.round((Object.keys(S.done[n] || {}).length / 12) * 100);
  window.nextDay = () => { const d = planDays(); return d.find((x) => dayPct(x.n) < 100) || d[d.length - 1]; };

  /* ---- Lernzeit je Sitzungslänge ---- */
  window.sessionPlan = function (min) {
    const base = [["audio", "Audio", 5], ["wissen", "Fachwissen", 10], ["karte", "Karte", 5], ["diagramm", "Diagramm", 5], ["video", "Video", 7], ["uebung", "Übungen", 8], ["abitur", "Abitur-Aufgabe", 5]];
    if (min === 30) return [["audio", "Audio", 3], ["wissen", "Fachwissen", 7], ["karte", "Karte/Diagramm", 5], ["uebung", "Übungen", 8], ["abitur", "Abitur-Aufgabe", 7]];
    if (min === 60) return base.map((b) => [b[0], b[1], b[0] === "abitur" ? 12 : b[0] === "uebung" ? 12 : b[2]]).concat([["test", "Tages-Test", 3]]);
    if (min === 90) return base.map((b) => [b[0], b[1], b[0] === "abitur" ? 25 : b[0] === "uebung" ? 12 : b[2]]).concat([["fall", "Fallbeispiel", 10], ["test", "Tages-Test", 6]]);
    return base;
  };

  /* ---------- HEUTE ---------- */
  window.viewHeute = function (root) {
    const nd = nextDay(), days = planDays();
    const doneDays = days.filter((d) => dayPct(d.n) === 100).length;
    const sk = Object.keys(SKILLS).map((k) => [k, skillPct(k)]);
    const tried = sk.filter((x) => x[1] != null);
    const skillAvg = tried.length ? Math.round(tried.reduce((a, x) => a + x[1], 0) / sk.length) : 0;
    const overall = Math.round((doneDays / days.length) * 50 + skillAvg * 0.5);
    const weak = tried.slice().sort((a, b) => a[1] - b[1])[0];
    const sp = sessionPlan(S.session || 45);
    const weekStart = new Date(); weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
    const weekDays = S.days.filter((d) => d >= weekStart.toISOString().slice(0, 10)).length;
    const mocks = Object.entries(S.mocks); const best = mocks.length ? Math.max(...mocks.map(([, m]) => m.np)) : null;
    root.innerHTML = `
    <section class="hero">
      <div><p class="eyebrow">Abitur Geographie NRW · ${kursName()}</p>
        <h1><span class="big mono">${daysToExam()}</span> Tage bis zur Klausur</h1>
        <p class="muted">${esc(O.dates[S.kurs])} · ${O.dauer[S.kurs]} Minuten inkl. Auswahlzeit · 3 Aufgaben zur Wahl</p></div>
      <div class="ring" style="--p:${overall}" role="img" aria-label="Gesamte Vorbereitung ${overall} Prozent"><span class="mono">${overall}%</span><small>Vorbereitung</small></div>
    </section>
    ${S.diag ? "" : `<a class="callout" href="#m-diag"><strong>Starte mit der Einstufung.</strong> 12 Fragen zu Themen, Karten, Diagrammen und Operatoren – danach empfiehlt dir der Kurs eine Plan-Länge.</a>`}
    <section class="dash">
      <div class="panel">
        <div class="ph"><h2>Heute lernen</h2><div class="seg sm" role="radiogroup" aria-label="Lernzeit">${[30, 45, 60, 90].map((m) => `<button role="radio" aria-checked="${(S.session || 45) === m}" data-min="${m}">${m} min</button>`).join("")}</div></div>
        <a class="daycard" href="#tag-${nd.n}"><span class="dc-n mono">Tag ${nd.n}</span><span class="dc-t">${esc(nd.title)}</span><span class="dc-s muted">${esc(nd.sub || "")}</span><span class="bar"><span style="width:${dayPct(nd.n)}%"></span></span><span class="dc-p mono">${dayPct(nd.n)}%</span></a>
        <ul class="sess">${sp.map((x) => `<li><span>${esc(x[1])}</span><span class="mono">${x[2]} min</span></li>`).join("")}<li class="sum"><span>Gesamt</span><span class="mono">${sp.reduce((a, x) => a + x[2], 0)} min</span></li></ul>
      </div>
      <div class="panel">
        <div class="ph"><h2>Kompetenzen</h2><span class="muted small">Trefferquote</span></div>
        <ul class="skills">${sk.map(([k, p]) => `<li><span>${SKILLS[k]}</span><span class="bar"><span style="width:${p || 0}%" class="${p == null ? "" : p < 50 ? "b-bad" : p < 70 ? "b-warn" : "b-good"}"></span></span><span class="mono small">${p == null ? "–" : p + "%"}</span></li>`).join("")}</ul>
      </div>
      <div class="panel rec">
        <div class="ph"><h2>Dein Förderplan</h2></div>
        ${weak ? `<p>Schwächster Bereich: <strong>${SKILLS[weak[0]]}</strong> (${weak[1]} %)</p><ol class="steps5">${recoFor(weak[0]).map((r) => `<li><a href="#${r[1]}">${esc(r[0])}</a></li>`).join("")}</ol>` : `<p class="muted">Löse ein paar Übungen – dann schlägt der Kurs dir fünf passende Schritte vor.</p>`}
      </div>
    </section>
    <section class="stats">
      <div><span class="mono big2">${doneDays}</span><span>Tage abgeschlossen</span></div>
      <div><span class="mono big2">${streak()}</span><span>Tage Serie</span></div>
      <div><span class="mono big2">${S.xp}</span><span>XP</span></div>
      <div><span class="mono big2">${weekDays}/5</span><span>Wochenziel</span></div>
      <div><span class="mono big2">${best == null ? "–" : best}</span><span>Beste Probeklausur (NP)</span></div>
    </section>
    <section class="panel"><div class="ph"><h2>Abzeichen</h2><span class="muted small">${S.badges.length}/${BADGES.length}</span></div>
      <ul class="badges">${BADGES.map((b) => `<li class="${S.badges.includes(b[0]) ? "on" : ""}"><strong>${b[1]}</strong><span>${b[2]}</span></li>`).join("")}</ul></section>`;
    if (window.STANDALONE) root.insertAdjacentHTML("beforeend", `<section class="panel"><div class="ph"><h2>Deine Daten</h2><span class="muted small">Nur auf diesem Gerät gespeichert</span></div><p class="small">Sichere deinen Fortschritt regelmäßig, z. B. vor einem Gerätewechsel.</p><div class="row"><button class="btn sm" id="bk-exp">Fortschritt sichern</button><label class="btn sm ghost" for="bk-imp">Sicherung laden</label><input type="file" id="bk-imp" accept="application/json,.json" hidden>${/^https?:/.test(location.protocol) ? `<a class="btn sm ghost" href="install.html" target="_blank" rel="noopener">App weitergeben (QR-Code)</a>` : ""}</div>${window.isIOS ? `<p class="small muted">iPhone/iPad: „Fortschritt sichern“ öffnet das Teilen-Menü – wähle „In Dateien sichern“.</p>` : ""}<p class="small bk-fb" aria-live="polite"></p></section>`);
    $$("[data-min]", root).forEach((b) => b.onclick = () => { S.session = +b.dataset.min; save(); rerender(); });
    const e = $("#bk-exp", root), i = $("#bk-imp", root);
    if (e) {
      e.onclick = () => { dl("abi-geographie-fortschritt-" + new Date().toISOString().slice(0, 10) + ".json", JSON.stringify(S, null, 1), "application/json"); $(".bk-fb", root).textContent = "Sicherung gespeichert."; };
      i.onchange = () => { const f = i.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { const d = JSON.parse(r.result); if (!d || typeof d !== "object" || !("kurs" in d) || !("skills" in d || "done" in d || "xp" in d)) throw 0; Object.keys(S).forEach((k) => delete S[k]); Object.assign(S, d); save(); rerender(); } catch (x) { $(".bk-fb", root).textContent = "Diese Datei ist keine gültige Sicherung von Abi Geographie."; } }; r.readAsText(f); };
    }
  };
  window.recoFor = function (k) {
    const map = {
      diagramme: [["10-Minuten-Tutorial: Klimadiagramme auswerten", "clip-v2"], ["Interaktives Beispiel: Diagrammtypen", "m-diagramme"], ["Übungsdiagramm: Beschäftigte nach Sektoren", "m-diagramme"], ["Abiturnahe Aufgabe: Strukturwandel (Probeklausur 1)", "mock-m1"], ["Wiederholungstest: Tages-Test eines Thementags", "m-themen"]],
      karten: [["Tutorial: Karten lesen in fünf Schritten", "clip-v1"], ["Interaktive Karte Rheinfeld", "m-karten"], ["Übung: Viertel lokalisieren", "m-karten"], ["Abituraufgabe: Hitze in der Innenstadt", "mock-m2"], ["Wiederholungstest Kartenkompetenz", "m-karten"]],
      material: [["Tutorial: Materialanalyse", "clip-v6"], ["Durchgerechnetes Beispiel", "m-material"], ["Übung mit eigenem Material", "m-material"], ["Abituraufgabe (Probeklausur 1)", "mock-m1"], ["Wiederholung", "m-material"]],
      operatoren: [["Tutorial: beurteilen, bewerten, erörtern", "clip-v5"], ["Operatoren-Übersicht", "m-operatoren"], ["Operator-Blitz", "m-operatoren"], ["Abituraufgabe", "mock-m2"], ["AFB-Trainer", "m-afb"]],
      begriffe: [["Podcast: Fachbegriffe eines Themas hören", "m-audio"], ["Karteikarten", "m-begriffe"], ["Themenseite mit Begriffstest", "m-themen"], ["Abituraufgabe mit Fachsprache", "mock-m1"], ["Karteikarten wiederholen", "m-begriffe"]]
    };
    const afb = [["AFB-Trainer", "m-afb"], ["Operatoren", "m-operatoren"], ["Antworten strukturieren", "m-schreiben"], ["Abituraufgabe", "mock-m2"], ["Tages-Test", "m-themen"]];
    return map[k] || (k.startsWith("afb") ? afb : [["Tutorial passend zum Thema", "m-video"], ["Themenseite", "m-themen"], ["Fallbeispiele", "m-faelle"], ["Abituraufgabe", "mock-m2"], ["Tages-Test wiederholen", "m-themen"]]);
  };

  /* ---------- PLAN ---------- */
  window.viewPlan = function (root) {
    const days = planDays();
    const latest = (len) => { const d = O.dateISO[S.kurs]; const x = new Date(d[0], d[1], d[2]); x.setDate(x.getDate() - len - 1); return x.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }); };
    root.innerHTML = `<div class="ph"><h1>Lernplan</h1></div>
    <div class="panel"><p class="lbl">Programm wählen</p>
      <div class="seg" role="radiogroup" aria-label="Plan-Länge">${[[30, "Intensiv", "Kernwissen, Operatoren, Klausurtraining"], [60, "Ausgewogen", "Wissen, Methoden, Fallbeispiele"], [90, "Umfassend", "Alle Themen, Wiederholungszyklen"], [120, "Langfristig", "Vertiefung, Schwächentraining"]].map(([l, n, d]) => `<button role="radio" aria-checked="${S.planLen === l}" data-len="${l}"><strong>${l} Tage · ${n}</strong><small>${d}</small><small class="mono">Start spätestens ${latest(l)}</small></button>`).join("")}</div>
      <p class="muted small">Noch ${daysToExam()} Tage bis zur ${kursName()}-Klausur. Themen folgen den Fokussierungen 2027 (für GK und LK gleich); Aufgaben unterscheiden sich im Anspruch.</p></div>
    <div class="legend"><span><i class="lg p1"></i>Grundlagen</span><span><i class="lg p2"></i>Vertiefung</span><span><i class="lg p3"></i>Prüfungstraining</span><span><i class="lg mk"></i>Probeklausur</span></div>
    <ol class="daylist">${days.map((d) => `<li><a href="#tag-${d.n}" class="dl ${d.kind} ph-${d.phase === "Grundlagen" ? 1 : d.phase === "Vertiefung" ? 2 : 3}"><span class="mono dn">${String(d.n).padStart(2, "0")}</span><span class="dt">${esc(d.title)}<small>${esc(d.sub || "")}</small></span><span class="dp mono">${dayPct(d.n)}%</span></a></li>`).join("")}</ol>`;
    $$("[data-len]", root).forEach((b) => b.onclick = () => { S.planLen = +b.dataset.len; save(); rerender(); });
  };

  /* ---------- TAGESPAKET ---------- */
  const CLIP_FOR = { lw_trop: "v2", lw_klima: "v2", lw_int: "v6", lw_nach: "v2", ind_struk: "v6", tert: "v6", ind_wachs: "v6", digital: "v1", stadt_merk: "v1", stadt_klima: "v3", metro: "v4", stadt_demo: "v4", demo: "v4", disp: "v1", disp_strat: "v5", tour: "v5" };
  let dayStart = 0;
  window.viewTag = function (root, n) {
    const days = planDays(); const d = days.find((x) => x.n === n) || days[0]; n = d.n; S.done[n] = S.done[n] || {}; const dm = S.done[n]; dayStart = Date.now();
    const mins = Object.fromEntries(sessionPlan(S.session || 45).map((x) => [x[0], x[2]]));
    root.innerHTML = `<a class="back" href="#plan">${icon("back")} Lernplan</a>
      <header class="dayhead"><p class="eyebrow">Tag ${n} von ${S.planLen} · ${esc(d.phase)} · ${kursName()}</p><h1>${esc(d.title)}</h1><p class="muted">${esc(d.sub || "")}</p>
      <div class="mcard" aria-label="Lernkarte des Tages">${COMP.map(([k, l, ic]) => `<a href="#sec-${k}" class="mc ${dm[k] ? "on" : ""}">${icon(ic)}<span>${l}</span></a>`).join("")}</div>
      <div class="qbar" aria-label="Fortschritt ${dayPct(n)} Prozent">${[0, 25, 50, 75, 100].map((q) => `<span class="${dayPct(n) >= q ? "on" : ""}">${q}%</span>`).join("")}</div></header>
      <div class="secs"></div>
      <nav class="daynav">${n > 1 ? `<a class="btn ghost" href="#tag-${n - 1}">${icon("back")} Tag ${n - 1}</a>` : "<span></span>"}${n < days.length ? `<a class="btn" href="#tag-${n + 1}">Tag ${n + 1} →</a>` : ""}</nav>`;
    const secs = $(".secs", root);
    const sec = (k, title, min, fill) => { const s = h(`<section class="sec" id="sec-${k}"><div class="sh"><h2>${title}</h2><span class="muted small mono">${min || ""}</span></div><div class="sb"></div><button class="btn sm ${dm[k] ? "done" : "ghost"} mark" data-k="${k}">${dm[k] ? icon("check") + " Erledigt" : "Als erledigt markieren"}</button></section>`); secs.appendChild(s); fill($(".sb", s)); };
    const all = (fn) => COMP.forEach(([k, l]) => sec(k, l, "", fn));
    if (d.kind === "topic") topicDay(sec, TP(d.topic), d, mins);
    else if (d.kind === "method") methodDay(sec, d, mins);
    else if (d.kind === "mock") { sec("abitur", "Probeklausur", `${O.dauer[S.kurs]} min`, (b) => b.innerHTML = `<p>Heute: <strong>${esc(MOCKS.find((m) => m.id === d.mock).name)}</strong> in der ${kursName()}-Fassung.</p><a class="btn" href="#mock-${d.mock}">Klausur öffnen</a>`); COMP.filter((c) => c[0] !== "abitur").forEach(([k, l]) => sec(k, l, "", (b) => b.innerHTML = `<p class="muted">Entfällt heute zugunsten der Probeklausur.</p>`)); }
    else if (d.kind === "diag") { sec("ziel", "Tagesziel", "", (b) => b.innerHTML = `<p>Ich kenne meine Stärken und Schwächen und wähle das passende Programm.</p>`); sec("test", "Einstufung", "15 min", (b) => b.innerHTML = `<a class="btn" href="#m-diag">Einstufung starten</a>`); COMP.filter((c) => !["ziel", "test"].includes(c[0])).forEach(([k, l]) => sec(k, l, "", (b) => b.innerHTML = `<p class="muted">Teil der Einstufung.</p>`)); }
    else reviewDay(sec, d);
    root.addEventListener("click", (e) => { const m = e.target.closest(".mark"); if (m) { const k = m.dataset.k; if (dm[k]) delete dm[k]; else { dm[k] = 1; addXP(10); markActive(); } save(); checkBadges(); const y = scrollY; rerender(); scrollTo(0, y); } const s = e.target.closest("[data-say]"); if (s) say(s.dataset.say); });
  };
  window.leaveTag = function (n) { if (!dayStart || !n) return; S.time = S.time || {}; S.time[n] = (S.time[n] || 0) + Math.round((Date.now() - dayStart) / 1000); dayStart = 0; save(); };

  function topicDay(sec, t, d, mins) {
    const deep = d.pass > 1 || S.kurs === "LK"; const cs = CS(t.cases[(d.pass - 1) % t.cases.length]);
    sec("ziel", "Tagesziel", "", (b) => b.innerHTML = `<p class="goal">${esc(t.goal)}</p><p class="small muted">Inhaltsfeld ${t.if}: ${esc(O.felder.find((f) => f.if === t.if).name)} <span class="tag off">Offizielle Fokussierung 2027</span></p>`);
    sec("wissen", "Fachwissen", (mins.wissen || 10) + " min", (b) => b.innerHTML = t.wissen.map((p) => `<p>${esc(p)}</p>`).join("") + `<p class="small"><a href="#t-${t.id}">Ganze Themenseite</a> · <a href="#fall-${cs.id}">Fallbeispiel ${esc(cs.name)}</a></p>`);
    sec("begriffe", "Fachbegriffe", "", (b) => { b.innerHTML = `<ul class="terms">${t.terms.map((x) => `<li><button class="say" data-say="${esc(x[0] + ". " + x[1])}" aria-label="Vorlesen: ${esc(x[0])}">${icon("audio")}</button><strong>${esc(x[0])}</strong><span>${esc(x[1])}</span></li>`).join("")}</ul>`; });
    sec("visual", "Karte / Diagramm", (mins.karte || 5) + (mins.diagramm || 0) + " min", (b) => { renderVis(t.vis, b); b.insertAdjacentHTML("beforeend", `<p class="hint">Atlas-Auftrag: ${esc(cs.atlas)}</p>`); });
    sec("audio", "Audio: 3-Minuten-Fachwissen", (mins.audio || 5) + " min", (b) => { Player(b, [["de", t.t + ". " + t.wissen.join(" ")]], {}); b.insertAdjacentHTML("beforeend", `<p class="lbl">Fachbegriffe hören</p>`); Player(b, [["de", t.terms.map((x) => x[0] + ": " + x[1]).join(" ")]], {}); });
    sec("video", "Video", (mins.video || 7) + " min", (b) => { const c = CLIPS.find((x) => x.id === CLIP_FOR[t.id]); b.innerHTML = `<p>Erklärclip: <strong>${esc(c.t)}</strong> (${c.slides.length} Folien, mit Untertiteln und Fragen)</p><a class="btn sm" href="#clip-${c.id}">Clip ansehen</a>`; });
    sec("interaktiv", "Interaktive Übung", (mins.uebung || 8) + " min", (b) => {
      const items = [[cs.causes[0], 0], [cs.causes[1] || cs.causes[0], 0], [cs.cons[0], 1], [cs.cons[1] || cs.cons[0], 1], [cs.conflicts[0], 2], [cs.sol[0], 3], [cs.sol[1] || cs.sol[0], 3]].filter((x, i, a) => a.findIndex((y) => y[0] === x[0]) === i);
      Classify(b, `Wirkungsgefüge «${cs.name}»: Ordne die Karten zu.`, items, ["Ursache", "Folge", "Konflikt", "Lösung"], ["sach", "handlung", "afb2"]);
    });
    sec("material", "Materialanalyse", "", (b) => materialSheet(b, t, cs));
    sec("operator", "Operator: " + t.task.op, "", (b) => { const o = opInfo(t.task.op); b.innerHTML = `<p><strong>${esc(o[0])}</strong> (AFB ${o[1]}): ${esc(o[2])}</p><p class="small"><strong>Erwartung:</strong> ${esc(o[3])}<br><strong>Aufbau:</strong> ${esc(o[4])}</p>`; const others = OPS.filter((x) => x[0] !== o[0]); MCx(b, `Welcher Aufbau passt zum Operator «${o[0]}»?`, [o[4], others[(d.n) % others.length][4], others[(d.n + 5) % others.length][4]], 0, `Das ist die typische Struktur für «${o[0]}».`, "Die anderen Strukturen gehören zu anderen Operatoren.", ["operatoren", "afb" + (o[1].includes("III") ? "3" : o[1].includes("II") ? "2" : "1")]); });
    sec("abitur", "Abitur-Aufgabe", (mins.abitur || 5) + " min", (b) => {
      b.innerHTML = `<p class="lbl">AFB ${t.task.afb} · Operator ${esc(t.task.op)}${deep ? " · erweiterte Anforderung" : ""}</p><p class="task">${esc(t.task.prompt)}${deep ? " Beziehe mindestens zwei Maßstabsebenen und die Perspektiven verschiedener Akteure ein." : ""}</p><div class="row tw"></div><textarea rows="7" aria-label="Deine Antwort" id="ta-${d.n}">${esc(S.drafts["t" + d.n] || "")}</textarea>
        <details><summary>Erwartungshorizont (Übungsmaterial)</summary><ul>${t.task.erw.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></details><p class="lbl">Selbstcheck</p><ul class="checks">${t.task.erw.map((x, i) => `<li><label><input type="checkbox" data-i="${i}"> ${esc(x)}</label></li>`).join("")}</ul><button class="btn sm ghost sc">Selbstcheck speichern</button><span class="small scfb"></span>`;
      Timer($(".tw", b), (mins.abitur || 5) * 60 * (deep ? 1.5 : 1), "Bearbeitungszeit");
      $("textarea", b).oninput = (e) => { S.drafts["t" + d.n] = e.target.value; save(); };
      $(".sc", b).onclick = () => { const c = $$(".checks input", b); const p = c.filter((x) => x.checked).length / c.length; recordScore(["afb" + (t.task.afb.includes("III") ? "3" : "2"), t.task.afb.includes("III") ? "urteil" : "sach", "operatoren"], p); $(".scfb", b).textContent = ` Gespeichert: ${Math.round(p * 100)} % des Erwartungshorizonts.`; };
    });
    sec("wdh", "Wiederholung (verteiltes Lernen)", "", (b) => spaced(b, d));
    sec("test", "Tages-Test", "", (b) => { t.quiz.forEach((q) => MCx(b, q[0], q[1], q[2], q[3], q[4], ["sach", "afb1"])); termQuiz(b, t, 3); const o = opInfo(t.task.op); MCx(b, `Zu welchem Anforderungsbereich gehört «${o[0]}» laut Operatorenliste?`, ["AFB " + o[1], ["AFB I", "AFB II", "AFB III", "AFB I–II", "AFB II–III"].find((x) => x !== "AFB " + o[1]), ["AFB III", "AFB I"].find((x) => x !== "AFB " + o[1])], 0, `«${o[0]}»: AFB ${o[1]}.`, "Die Zuordnung steht in der offiziellen Operatorenübersicht.", ["operatoren"]); });
  }

  window.materialSheet = function (b, t, cs) {
    const steps = [["Material", "Art, Thema, Raum, Zeit, Quelle, Einheit"], ["Beobachtung", "Was zeigt das Material? Werte, Verteilungen, Trends"], ["Analyse", "Welche Zusammenhänge gibt es zwischen den Befunden?"], ["Erklärung", "Warum ist das so? Fachbegriffe und Ursachen"], ["Bewertung", "Welche Bedeutung hat die Entwicklung? Kriterien nennen"]];
    b.innerHTML = `<p>Arbeite mit dem Material oben (${esc(t.short)}) und dem Fallbeispiel <a href="#fall-${cs.id}">${esc(cs.name)}</a>.</p>
      <ol class="msteps">${steps.map((s, i) => `<li><label for="ms-${t.id}-${i}"><strong>${s[0]}</strong> <span class="muted small">${s[1]}</span></label><textarea id="ms-${t.id}-${i}" rows="2">${esc(S.drafts["ms-" + t.id + "-" + i] || "")}</textarea></li>`).join("")}</ol>
      <details><summary>Lösungshinweise</summary><ul><li>Material: ${esc(t.vis.startsWith("climate") ? "Klimadiagramm" : t.vis.startsWith("map") ? "Karte" : "Diagramm")} – Beispieldaten bzw. gerundete Werte (siehe Quellenzeile).</li><li>Erklärung mit Fachbegriffen: ${t.terms.slice(0, 4).map((x) => esc(x[0])).join(", ")}.</li><li>Bewertung: Nachhaltigkeit (ökologisch, ökonomisch, sozial) – ${esc(cs.sust)}</li></ul></details>`;
    $$("textarea", b).forEach((x) => x.oninput = () => { S.drafts[x.id] = x.value; save(); });
    const btn = h(`<button class="btn sm ghost">Analyse als bearbeitet speichern</button>`); b.appendChild(btn);
    btn.onclick = () => { const filled = $$("textarea", b).filter((x) => x.value.trim().length > 15).length; recordScore(["material", "methoden"], filled / 5); btn.textContent = `Gespeichert (${filled}/5 Schritte bearbeitet)`; };
  };

  function spaced(b, d) {
    const days = planDays(); const back = [1, 3, 7].map((k) => days.find((x) => x.n === d.n - k)).filter((x) => x && x.kind === "topic");
    const terms = back.flatMap((x) => TP(x.topic).terms.slice(0, 3).map((t) => [t, TP(x.topic).short])).slice(0, 6);
    if (!terms.length) { b.innerHTML = `<p class="muted">Noch keine früheren Thementage – wiederhole die Fachbegriffe von heute morgen.</p>`; return; }
    b.innerHTML = `<p class="small">Begriffe von vor 1, 3 und 7 Tagen:</p><div class="flipgrid">${terms.map(([t, s], i) => `<button class="flip" data-i="${i}"><span class="ff"><strong>${esc(t[0])}</strong><small>${esc(s)}</small></span><span class="fbk" hidden>${esc(t[1])}</span></button>`).join("")}</div>`;
    $$(".flip", b).forEach((x) => x.onclick = () => { $(".ff", x).hidden = !$(".ff", x).hidden; $(".fbk", x).hidden = !$(".fbk", x).hidden; });
  }

  function methodDay(sec, d, mins) {
    const m = d.m; const link = { karte: "m-karten", diagramm: "m-diagramme", material: "m-material", operatoren: "m-operatoren", rechnen: "m-rechnen", schreiben: "m-schreiben", klima: "m-diagramme", pyramide: "m-diagramme" }[m];
    const goal = { karte: "Ich kann Karten systematisch auswerten: orientieren, beschreiben, analysieren, erklären, bewerten.", diagramm: "Ich kann Diagramme beschreiben, analysieren, erklären und bewerten.", material: "Ich kann mehrere Materialien verknüpft auswerten.", operatoren: "Ich erkenne, was ein Operator verlangt, und ordne ihn einem AFB zu.", rechnen: "Ich berechne Veränderungen, Wachstumsraten, Dichte und Entfernungen sicher.", schreiben: "Ich baue Antworten nach dem Operator auf.", klima: "Ich werte Klimadiagramme aus und ordne sie Klimazonen zu.", pyramide: "Ich werte Bevölkerungspyramiden aus und leite Folgen ab." }[m];
    const vis = { karte: "map_city", diagramm: "line_sectors", material: "line_sectors", operatoren: null, rechnen: "bar_urban", schreiben: null, klima: "climate_sahel", pyramide: "pyramid_de" }[m];
    const clip = { karte: "v1", diagramm: "v6", material: "v6", operatoren: "v5", rechnen: "v6", schreiben: "v5", klima: "v2", pyramide: "v4" }[m];
    sec("ziel", "Tagesziel", "", (b) => b.innerHTML = `<p class="goal">${esc(goal)}</p><p class="small muted">Methodenkompetenz · Kernlehrplan</p>`);
    sec("wissen", "Methodenwissen", "", (b) => b.innerHTML = `<p>Die ausführliche Anleitung mit Übungen findest du im Modul.</p><a class="btn sm" href="#${link}">Modul öffnen</a>`);
    sec("begriffe", "Fachbegriffe", "", (b) => { const t = TOPICS[d.n % TOPICS.length]; b.innerHTML = `<p class="small">Wiederholung: ${esc(t.short)}</p><ul class="terms">${t.terms.slice(0, 6).map((x) => `<li><strong>${esc(x[0])}</strong><span>${esc(x[1])}</span></li>`).join("")}</ul>`; });
    sec("visual", "Karte / Diagramm", "", (b) => { if (vis) renderVis(vis, b); else b.innerHTML = `<p class="muted">Heute ohne Abbildung.</p>`; });
    sec("audio", "Audio", "", (b) => { const p = m === "karte" ? PODCAST[0] : m === "operatoren" || m === "schreiben" ? PODCAST[9] : PODCAST[d.n % PODCAST.length]; b.innerHTML = `<p class="lbl">Podcast-Folge ${p.n}</p><h3>${esc(p.t)}</h3>`; Player(b, [["de", p.text]], {}); });
    sec("video", "Video", "", (b) => { const c = CLIPS.find((x) => x.id === clip); b.innerHTML = `<a class="btn sm" href="#clip-${c.id}">${esc(c.t)}</a>`; });
    sec("interaktiv", "Interaktive Übung", "", (b) => {
      if (m === "operatoren" || m === "schreiben") afbGame(b, 5);
      else if (m === "rechnen") calcSet(b, 4);
      else if (m === "karte") { b.innerHTML = `<p>Öffne die interaktive Karte im Modul und löse die Lokalisierungsaufgaben.</p><a class="btn sm" href="#m-karten">Zur Karte</a>`; }
      else Classify(b, "Welcher Auswertungsschritt ist das?", [["Die Industriebeschäftigung sinkt von 100 auf 62.", 0], ["Der Rückgang der Industrie hängt mit dem Anstieg der Dienstleistungen zusammen.", 1], ["Ursache ist der Bedeutungsverlust harter Standortfaktoren.", 2], ["Für den Arbeitsmarkt ist die Entwicklung nur teilweise positiv, weil …", 3]], ["Beschreiben", "Analysieren", "Erklären", "Bewerten"], ["diagramme", "methoden"]);
    });
    sec("material", "Materialanalyse", "", (b) => materialSheet(b, TP("ind_struk"), CS("ruhr")));
    sec("operator", "Operator", "", (b) => { const o = OPS[d.n % OPS.length]; b.innerHTML = `<p><strong>${esc(o[0])}</strong> (AFB ${o[1]}): ${esc(o[2])}</p><p class="task">${esc(o[5])}</p>`; });
    sec("abitur", "Abitur-Aufgabe", "", (b) => { const set = Object.values(TASKSETS)[d.n % 7]; const tk = set[S.kurs === "LK" ? "lk" : "gk"][1]; b.innerHTML = `<p class="lbl">${esc(set.t)} · AFB ${tk[1]}</p><p class="task">${esc(tk[3])}</p><p class="small"><a href="#pruefung">Zu den Probeklausuren mit Materialien</a></p>`; });
    sec("wdh", "Wiederholung", "", (b) => spaced(b, d));
    sec("test", "Tages-Test", "", (b) => { if (m === "rechnen") calcSet(b, 3); else afbGame(b, 5); });
  }

  function reviewDay(sec, d) {
    sec("ziel", "Tagesziel", "", (b) => b.innerHTML = `<p class="goal">${d.kind === "final" ? "Ich gehe sicher und ruhig in die Klausur." : d.kind === "strategy" ? `Ich teile ${O.dauer[S.kurs]} Minuten sinnvoll auf.` : "Ich festige die Inhalte der Woche."}</p>`);
    sec("wissen", "Überblick", "", (b) => b.innerHTML = `<ul>${O.felder.map((f) => `<li>IF ${f.if}: ${esc(f.name)}</li>`).join("")}</ul>`);
    sec("begriffe", "Fachbegriffe", "", (b) => b.innerHTML = `<a class="btn sm" href="#m-begriffe">Karteikarten</a>`);
    sec("visual", "Karte / Diagramm", "", (b) => renderVis(["choropleth", "bar_urban", "scatter_regions", "climate_trop"][d.n % 4], b));
    sec("audio", "Audio", "", (b) => { const p = PODCAST[d.n % PODCAST.length]; b.innerHTML = `<h3>${esc(p.t)}</h3>`; Player(b, [["de", p.text]], {}); });
    sec("video", "Video", "", (b) => b.innerHTML = `<a class="btn sm" href="#clip-v5">Beurteilen, bewerten, erörtern</a>`);
    sec("interaktiv", "Interaktive Übung", "", (b) => afbGame(b, 6));
    sec("material", d.kind === "strategy" ? "Zeitplan" : "Fehlerliste", "", (b) => { b.innerHTML = d.kind === "strategy" ? `<a class="btn sm" href="#m-zeit">Klausur-Timer öffnen</a>` : S.wrong.length ? `<ul class="wrongl">${S.wrong.slice(0, 10).map((w) => `<li>${esc(w.t)}</li>`).join("")}</ul>` : `<p class="muted">Keine Fehler gesammelt.</p>`; });
    sec("operator", "Operatoren", "", (b) => b.innerHTML = `<a class="btn sm" href="#m-operatoren">Operator-Blitz</a>`);
    sec("abitur", "Abitur-Aufgabe", "", (b) => b.innerHTML = d.kind === "final" ? `<a class="btn sm" href="#m-final">Endspurt-Checkliste</a>` : `<p>Schreibe eine vollständige Antwort zu einer AFB-III-Aufgabe deiner Wahl.</p><a class="btn sm" href="#m-schreiben">Antworten strukturieren</a>`);
    sec("wdh", "Wiederholung", "", (b) => spaced(b, d));
    sec("test", "Tages-Test", "", (b) => { const t = TOPICS[d.n % TOPICS.length]; t.quiz.forEach((q) => MCx(b, q[0], q[1], q[2], q[3], q[4], ["sach"])); termQuiz(b, t, 3); });
  }

  /* ---- AFB-Trainer ---- */
  window.afbGame = function (b, n) {
    const tasks = Object.values(TASKSETS).flatMap((s) => s.gk.concat(s.lk)).sort(() => Math.random() - 0.5).slice(0, n);
    b.insertAdjacentHTML("beforeend", `<p class="small">Ordne die Teilaufgaben dem Anforderungsbereich zu (nach dem Schwerpunkt des Operators).</p>`);
    tasks.forEach((t) => { const main = t[1].includes("III") ? 2 : t[1].includes("II") ? 1 : 0; const afbTag = ["afb1", "afb2", "afb3"][main]; MCx(b, `«${t[3]}»`, ["AFB I – Wiedergabe", "AFB II – Analyse/Anwendung/Transfer", "AFB III – Urteil/Problemlösung"], main, `Operator «${t[2]}»: AFB ${opInfo(t[2])[1]}.`, "Maßgeblich ist der Operator mit seiner Einstufung in der Operatorenliste.", [afbTag, "operatoren"]); });
  };

  /* ---- Rechenaufgaben ---- */
  window.calcTask = function () {
    const r = (a, b) => Math.round(a + Math.random() * (b - a)); const k = r(0, 5);
    if (k === 0) { const a = r(40, 400) * 100, b = Math.round(a * (0.5 + Math.random())); return [`Die Einwohnerzahl stieg von ${a.toLocaleString("de-DE")} auf ${b.toLocaleString("de-DE")}. Berechne die Veränderung in Prozent (1 Nachkommastelle).`, ((b - a) / a) * 100, "%", "Veränderung = (neu − alt) / alt × 100", 0.15]; }
    if (k === 1) { const p = r(20, 900) * 1000, f = r(50, 2000); return [`Eine Region hat ${p.toLocaleString("de-DE")} Einwohner auf ${f.toLocaleString("de-DE")} km². Berechne die Bevölkerungsdichte (Ew./km², ganze Zahl).`, p / f, "Ew./km²", "Dichte = Einwohner / Fläche", 1]; }
    if (k === 2) { const m = [25000, 50000, 100000, 200000][r(0, 3)], cm = r(2, 18); return [`Auf einer Karte im Maßstab 1:${m.toLocaleString("de-DE")} misst eine Strecke ${cm} cm. Wie lang ist sie in der Natur (km, 2 Nachkommastellen)?`, (cm * m) / 100000, "km", "Naturstrecke = Kartenstrecke × Maßstabszahl; 100.000 cm = 1 km", 0.01]; }
    if (k === 3) { const a = r(10, 90) * 1000, g = r(1, 6) / 2, y = r(5, 20); return [`Eine Stadt mit ${a.toLocaleString("de-DE")} Einwohnern wächst jährlich um ${String(g).replace(".", ",")} %. Wie viele Einwohner hat sie nach ${y} Jahren (ganze Zahl)?`, a * Math.pow(1 + g / 100, y), "Ew.", "N = N₀ × (1 + p/100)^t", Math.max(2, a * 0.001)]; }
    if (k === 4) { const g = [0.5, 1, 1.4, 2, 2.5, 3.5][r(0, 5)]; return [`Die Bevölkerung wächst um ${String(g).replace(".", ",")} % pro Jahr. Schätze die Verdopplungszeit mit der 70er-Regel (Jahre, 1 Nachkommastelle).`, 70 / g, "Jahre", "Verdopplungszeit ≈ 70 / Wachstumsrate in %", 0.15]; }
    const v0 = r(60, 140), v1 = r(60, 160); return [`Ein Index lag 2015 bei ${v0} und 2025 bei ${v1} (Basisjahr 2010 = 100). Um wie viel Prozent veränderte sich der Wert zwischen 2015 und 2025 (1 Nachkommastelle)?`, ((v1 - v0) / v0) * 100, "%", "Prozentuale Veränderung zwischen Indexwerten = (neu − alt) / alt × 100 – nicht einfach die Differenz der Indexpunkte", 0.15];
  };
  window.calcSet = function (b, n) {
    for (let i = 0; i < n; i++) {
      const [q, ans, unit, how, tol] = calcTask(); const id = "c" + Math.random().toString(36).slice(2, 7);
      const el = h(`<div class="ex"><label class="ex-q" for="${id}">${esc(q)}</label><div class="row"><input id="${id}" class="inp" inputmode="decimal" autocomplete="off"><span class="muted">${esc(unit)}</span><button class="btn sm">Prüfen</button></div><div class="fb" aria-live="polite"></div></div>`); b.appendChild(el);
      const go = () => { const v = parseFloat($("input", el).value.replace(/\./g, "").replace(",", ".")); if (isNaN(v) || el.dataset.done) return; el.dataset.done = 1; const ok = Math.abs(v - ans) <= tol * (unit === "%" ? 1 : 1) + Math.abs(ans) * 0.002; const shown = unit === "km" ? ans.toFixed(2) : unit === "%" || unit === "Jahre" ? ans.toFixed(1) : Math.round(ans).toLocaleString("de-DE"); $(".fb", el).innerHTML = `<p class="${ok ? "good" : "bad"}"><strong>${ok ? "Richtig." : "Noch nicht."}</strong> Ergebnis: ${String(shown).replace(".", ",")} ${esc(unit)}. Rechenweg: ${esc(how)}.</p>`; recordTags(["methoden", "diagramme"], ok, ok ? null : "Rechnen: " + q); };
      $("button", el).onclick = go; $("input", el).onkeydown = (e) => { if (e.key === "Enter") go(); };
    }
  };
})();
