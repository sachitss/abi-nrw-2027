/* ===== Plan-Generator, Heute, Plan, Tag ===== */
(function () {
  const O = window.OFFICIAL;
  const TA3 = {
    migr: "«Emigrar es la mejor escuela de la vida.»", biling: "«En un país con varias lenguas, todos deberían aprender todas.»",
    turismo: "«El turismo es la gallina de los huevos de oro de España.»", pobreza: "«El trabajo infantil es inevitable mientras exista la pobreza.»",
    etnica: "«Reconocer las lenguas indígenas como oficiales cambia poco en la vida real.»", dict: "«Hay que dejar el pasado en paz.»",
    fant: "«La literatura fantástica nos enseña a desconfiar de la realidad.»", chile: "«La literatura puede ser más fuerte que una dictadura.»",
    jovenes: "«Los jóvenes de hoy lo tienen más difícil que sus padres.»", eco: "«La agricultura y el turismo deberían pagar más por el agua.»"
  };
  const MICRO = [["Minijob", "Erkläre einer Freundin aus Sevilla per Nachricht in 3–4 Sätzen, was ein «Minijob» ist."], ["Pfand", "Erkläre deinem Austauschpartner aus Bogotá, wie das Flaschenpfand in Deutschland funktioniert."], ["Ausbildung", "Erkläre einem Freund aus Madrid, was eine duale Ausbildung ist."], ["Abitur", "Erkläre deiner chilenischen Brieffreundin, wie das Abitur in NRW abläuft."], ["Mülltrennung", "Erkläre deiner Gastfamilie aus Valencia die deutsche Mülltrennung."], ["Deutschlandticket", "Erkläre einem Besucher aus México, was das Deutschlandticket ist."]];
  const TEXT_BY_TOPIC = { migr: ["READ", "r1"], pobreza: ["READ", "r2"], fant: ["LIT", "l1"], dict: ["LIT", "l2"], chile: ["LIT", "l2"], etnica: ["READ", "r2"], turismo: ["MED", "sm1"], biling: ["LISTEN", "hv4"] };
  const HV_BY_TOPIC = { turismo: "hv1", pobreza: "hv2", dict: "hv3", chile: "hv3", biling: "hv4", migr: "hv4", etnica: "hv2", fant: "hv3" };
  const READ_BY_TOPIC = { migr: "r1", pobreza: "r2", etnica: "r2", jovenes: "r1", fant: "l1", dict: "l2", chile: "l2" };
  window.TA3 = TA3; window.MICRO = MICRO;

  window.genPlan = function (len, kurs) {
    const k = O.kurse[kurs];
    const fok = O.fokus[kurs].map((f) => f.topic).concat(["jovenes", "eco"]);
    const gset = len <= 30 ? ["indefimpf", "subj1", "conect", "subj2", "rel", "si", "indir", "pasiva", "porpara", "serestar"] : PLANBITS.grammarOrder;
    const special = {};
    special[1] = { kind: "diag", title: "Diagnóstico", sub: "Einstufungstest" };
    special[2] = { kind: "day", topic: "jovenes", gram: "serestar", input: "podcast", title: "Presentación personal", fixSpeak: 6 };
    special[3] = { kind: "day", topic: "turismo", gram: "compar", input: "image", title: "Descripción y comparación", fixSpeak: 0 };
    special[Math.round(len * 0.35)] = { kind: "mock", mock: "m1" };
    special[Math.round(len * 0.55)] = { kind: "mock", mock: "m2" };
    special[Math.round(len * 0.78)] = { kind: "mock", mock: "m3" };
    special[len - 2] = { kind: "mock", mock: "m4" };
    special[len - 1] = { kind: "strategy", title: "Estrategia final", sub: "Zeitmanagement & Operatoren" };
    special[len] = { kind: "final", title: "Repaso final", sub: "Letzte Wiederholung vor dem 15.04." };
    const days = []; let t = 0, g = 0, tk = 0;
    const tasks = PLANBITS.tasks.filter((x) => k.hv || x !== "HV");
    for (let n = 1; n <= len; n++) {
      const phase = n <= len / 3 ? "Grundlagen" : n <= (2 * len) / 3 ? "Vertiefung" : "Prüfungstraining";
      let d = special[n];
      if (!d && n % 7 === 0) d = { kind: "review", title: "Repaso semanal", sub: "Wochenwiederholung" };
      if (d && d.kind === "mock") { const m = MOCKS.find((x) => x.id === d.mock); days.push({ n, phase, kind: "mock", mock: d.mock, title: m.name.split(" – ")[0].replace("Probeklausur", "Examen de prueba"), sub: m.name }); continue; }
      if (d && d.kind !== "day") { days.push(Object.assign({ n, phase }, d)); continue; }
      const topic = d ? d.topic : fok[t % fok.length];
      const gram = d ? d.gram : gset[g % gset.length];
      const input = d ? d.input : PLANBITS.inputs[t % PLANBITS.inputs.length];
      const task = tasks[tk % tasks.length];
      const speak = d && d.fixSpeak != null ? d.fixSpeak : t % SPEAK.length;
      const gr = GRAMMAR.find((x) => x.id === gram);
      days.push({ n, phase, kind: "day", topic, gram, input, task, speak, warm: PLANBITS.warmups[n % PLANBITS.warmups.length], title: d ? d.title : TOPICS[topic].es, sub: gr.t });
      if (!d) { t++; g++; tk++; }
    }
    return days;
  };
  window.planDays = function () { return genPlan(S.planLen, S.kurs); };
  const COMP = [["warm", "Warm-up", "spark"], ["vocab", "Vokabeln", "vocab"], ["gram", "Grammatik", "grammar"], ["input", "Input", "read"], ["task", "Abitur-Aufgabe", "task"], ["speak", "Sprechen", "mic"], ["review", "Wiederholung", "check"], ["prog", "Fortschritt", "target"]];
  window.COMP = COMP;
  window.dayPct = function (n) { const d = S.done[n] || {}; return Math.round((Object.keys(d).length / 8) * 100); };
  function quarter(p) { return Math.floor(p / 25) * 25; }
  window.nextDay = function () { const days = planDays(); return days.find((d) => dayPct(d.n) < 100) || days[days.length - 1]; };
  window.daysToExam = function () { const a = new Date(); a.setHours(0, 0, 0, 0); const b = new Date(2027, 3, 15); return Math.max(0, Math.round((b - a) / 86400000)); };

  /* ---------- HEUTE ---------- */
  window.viewHeute = function (root) {
    const nd = nextDay(), days = planDays();
    const doneDays = days.filter((d) => dayPct(d.n) === 100).length;
    const planP = Math.round((doneDays / days.length) * 100);
    const sk = Object.keys(SKILLS).map((k) => [k, skillPct(k)]);
    const tried = sk.filter((x) => x[1] != null);
    const skillAvg = tried.length ? Math.round(tried.reduce((a, x) => a + x[1], 0) / Object.keys(SKILLS).length) : 0;
    const overall = Math.round(planP * 0.5 + skillAvg * 0.5);
    const weak = tried.slice().sort((a, b) => a[1] - b[1]).slice(0, 3);
    const untried = sk.filter((x) => x[1] == null).map((x) => SKILLS[x[0]]);
    const weekStart = new Date(); weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
    const weekDays = S.days.filter((d) => d >= weekStart.toISOString().slice(0, 10)).length;
    const gWeak = Object.entries(S.gram).filter(([, r]) => r[1] >= 2 && r[0] / r[1] < 0.7).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1])[0];
    const mocks = Object.entries(S.mocks);
    const best = mocks.length ? Math.max(...mocks.map(([, m]) => m.np)) : null;
    root.innerHTML = `
    <section class="hero">
      <div class="hero-l">
        <p class="eyebrow">Spanisch-Abitur · ${esc(O.kurse[S.kurs].name)}</p>
        <h1><span class="big mono">${daysToExam()}</span> Tage bis zur Klausur</h1>
        <p class="muted">${esc(O.examDateLabel)} · Dauer ${O.kurse[S.kurs].dauer} Minuten</p>
      </div>
      <div class="ring" style="--p:${overall}" role="img" aria-label="Gesamte Abiturvorbereitung ${overall} Prozent"><span class="mono">${overall}%</span><small>Vorbereitung</small></div>
    </section>
    ${S.diag ? "" : `<a class="callout" href="#m-diag"><strong>Starte mit dem Einstufungstest.</strong> 15 Minuten, danach empfiehlt dir der Kurs die passende Plan-Länge.</a>`}
    <section class="grid2">
      <div class="panel">
        <div class="ph"><h2>Dein Lernplan heute</h2><span class="tag">${S.planLen}-Tage-Plan</span></div>
        <a class="daycard" href="#tag-${nd.n}">
          <span class="dc-n mono">Tag ${nd.n}</span>
          <span class="dc-t">${esc(nd.title)}</span><span class="dc-s muted">${esc(nd.sub || "")}</span>
          <span class="bar"><span style="width:${dayPct(nd.n)}%"></span></span>
          <span class="dc-p mono">${quarter(dayPct(nd.n))}%</span>
        </a>
        <ul class="recs">
          ${weak[0] ? `<li><span class="sev bad"></span>Schwächster Bereich: <strong>${SKILLS[weak[0][0]]}</strong> (${weak[0][1]} %) → <a href="#${modFor(weak[0][0])}">jetzt üben</a></li>` : ""}
          ${gWeak ? `<li><span class="sev warn"></span>Fehlerhäufung bei <strong>${esc(GRAMMAR.find((x) => x.id === gWeak[0]).t)}</strong> → <a href="#g-${gWeak[0]}">Wiederholungspaket</a></li>` : ""}
          ${S.wrong.length ? `<li><span class="sev warn"></span>${S.wrong.length} Fehler gesammelt → <a href="#m-final">Fehlerliste wiederholen</a></li>` : ""}
          ${untried.length ? `<li><span class="sev"></span>Noch nicht geübt: ${untried.join(", ")}</li>` : ""}
        </ul>
      </div>
      <div class="panel">
        <div class="ph"><h2>Kompetenzen</h2><span class="muted small">Trefferquote</span></div>
        <ul class="skills">${sk.map(([k, p]) => `<li><span>${SKILLS[k]}</span><span class="bar"><span style="width:${p || 0}%" class="${p == null ? "" : p < 50 ? "b-bad" : p < 70 ? "b-warn" : "b-good"}"></span></span><span class="mono small">${p == null ? "–" : p + "%"}</span></li>`).join("")}</ul>
      </div>
    </section>
    <section class="stats">
      <div><span class="mono big2">${doneDays}</span><span>Tage abgeschlossen</span></div>
      <div><span class="mono big2">${streak()}</span><span>Tage Serie</span></div>
      <div><span class="mono big2">${S.xp}</span><span>XP</span></div>
      <div><span class="mono big2">${weekDays}/5</span><span>Wochenziel</span></div>
      <div><span class="mono big2">${best == null ? "–" : best}</span><span>Bestes Probeklausur-Ergebnis (NP)</span></div>
    </section>
    <section class="panel">
      <div class="ph"><h2>Abzeichen</h2><span class="muted small">${S.badges.length}/${BADGES.length}</span></div>
      <ul class="badges">${BADGES.map((b) => `<li class="${S.badges.includes(b[0]) ? "on" : ""}"><strong>${b[1]}</strong><span>${b[2]}</span></li>`).join("")}</ul>
    </section>
    ${window.STANDALONE ? `<section class="panel"><div class="ph"><h2>Deine Daten</h2><span class="muted small">Nur auf diesem Gerät gespeichert</span></div><p class="small">Sichere deinen Fortschritt regelmäßig, z. B. vor einem Gerätewechsel.</p><div class="row"><button class="btn sm" id="bk-exp">Fortschritt sichern</button><label class="btn sm ghost" for="bk-imp">Sicherung laden</label><input type="file" id="bk-imp" accept="application/json,.json" hidden>${/^https?:/.test(location.protocol) ? `<a class="btn sm ghost" href="install.html" target="_blank" rel="noopener">App weitergeben (QR-Code)</a>` : ""}</div>${window.isIOS ? `<p class="small muted">iPhone/iPad: «Fortschritt sichern» öffnet das Teilen-Menü – wähle «In Dateien sichern».</p>` : ""}<p class="small bk-fb"></p></section>` : ""}
    ${mocks.length ? `<section class="panel"><div class="ph"><h2>Probeklausuren</h2></div><table class="tbl"><thead><tr><th>Klausur</th><th>Datum</th><th>Punkte</th><th>Notenpunkte</th></tr></thead><tbody>${mocks.map(([id, m]) => `<tr><td>${esc(MOCKS.find((x) => x.id === id).name)}</td><td>${m.date}</td><td class="mono">${m.total}/${m.max}</td><td class="mono">${m.np}</td></tr>`).join("")}</tbody></table><p class="note">Selbstbewertung nach dem offiziellen Kriterienraster – keine amtliche Note.</p></section>` : ""}`;
    bindBackup(root);
  };
  window.bindBackup = function (root) {
    const e = $("#bk-exp", root), i = $("#bk-imp", root); if (!e) return;
    e.onclick = () => { dl("abi-espanol-fortschritt-" + today() + ".json", JSON.stringify(S, null, 1), "application/json"); $(".bk-fb", root).textContent = "Sicherung gespeichert."; };
    i.onchange = () => { const f = i.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { const d = JSON.parse(r.result); if (!d || typeof d !== "object" || !("kurs" in d)) throw 0; Object.keys(S).forEach((k) => delete S[k]); Object.assign(S, d); save(); rerender(); } catch (x) { $(".bk-fb", root).textContent = "Diese Datei ist keine gültige Sicherung von Abi Español."; } }; r.readAsText(f); };
  };
  function modFor(k) { return { vocab: "m-vocab", grammar: "m-grammar", reading: "m-read", listening: "m-listen", writing: "m-write", mediation: "m-mediation", speaking: "m-speak", exam: "pruefung" }[k]; }
  window.modFor = modFor;

  /* ---------- PLAN ---------- */
  window.viewPlan = function (root) {
    const days = planDays(), dte = daysToExam();
    const latest = (len) => { const d = new Date(O.examDate); d.setDate(d.getDate() - len - 1); return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }); };
    root.innerHTML = `
    <div class="ph"><h1>Lernplan</h1></div>
    <div class="panel">
      <p class="lbl">Vorbereitungszeitraum</p>
      <div class="seg" role="radiogroup" aria-label="Plan-Länge">${[30, 60, 90, 120].map((l) => `<button role="radio" aria-checked="${S.planLen === l}" data-len="${l}"><strong>${l} Tage</strong><small>${{ 30: "Intensiv", 60: "Ausgewogen", 90: "Umfassend", 120: "Langfristig" }[l]}</small><small class="mono">Start spätestens ${latest(l)}</small></button>`).join("")}</div>
      <p class="muted small">Noch ${dte} Tage bis zur Klausur. Die Themen folgen den Fokussierungen 2027 für den ${esc(O.kurse[S.kurs].name)}${O.kurse[S.kurs].hv ? "" : " (ohne Hörverstehen, wie für neu einsetzende Kurse vorgesehen)"}.</p>
    </div>
    <div class="legend"><span><i class="lg p1"></i>Grundlagen</span><span><i class="lg p2"></i>Vertiefung</span><span><i class="lg p3"></i>Prüfungstraining</span><span><i class="lg mk"></i>Probeklausur</span></div>
    <ol class="daylist">${days.map((d) => `<li><a href="#tag-${d.n}" class="dl ${d.kind} ph-${d.phase === "Grundlagen" ? 1 : d.phase === "Vertiefung" ? 2 : 3}">
      <span class="mono dn">${String(d.n).padStart(2, "0")}</span><span class="dt">${esc(d.title)}<small>${esc(d.sub || "")}</small></span><span class="dp mono">${dayPct(d.n)}%</span></a></li>`).join("")}</ol>`;
    $$("[data-len]", root).forEach((b) => b.onclick = () => { S.planLen = +b.dataset.len; save(); rerender(); });
  };

  /* ---------- TAG ---------- */
  let dayStart = 0;
  window.viewTag = function (root, n) {
    const days = planDays(); const d = days.find((x) => x.n === n) || days[0]; n = d.n;
    S.done[n] = S.done[n] || {}; dayStart = Date.now();
    const doneMap = S.done[n];
    root.innerHTML = `
    <a class="back" href="#plan">${icon("back")} Lernplan</a>
    <header class="dayhead">
      <p class="eyebrow">Tag ${n} von ${S.planLen} · ${esc(d.phase)}</p>
      <h1>${esc(d.title)}</h1><p class="muted">${esc(d.sub || "")}${d.topic ? " · " + esc(TOPICS[d.topic].de) : ""}</p>
      <div class="mcard" aria-label="Lernkarte">${COMP.map(([k, l, ic]) => `<a href="#sec-${k}" class="mc ${doneMap[k] ? "on" : ""}" data-k="${k}">${icon(ic)}<span>${l}</span></a>`).join("")}</div>
      <div class="qbar" aria-label="Fortschritt ${dayPct(n)} Prozent">${[0, 25, 50, 75, 100].map((q) => `<span class="${dayPct(n) >= q ? "on" : ""}">${q}%</span>`).join("")}</div>
    </header>
    <div class="secs"></div>
    <nav class="daynav">${n > 1 ? `<a class="btn ghost" href="#tag-${n - 1}">${icon("back")} Tag ${n - 1}</a>` : "<span></span>"}${n < days.length ? `<a class="btn" href="#tag-${n + 1}">Tag ${n + 1} →</a>` : ""}</nav>`;
    const secs = $(".secs", root);
    function sec(k, title, mins, fill) {
      const s = h(`<section class="sec" id="sec-${k}"><div class="sh"><h2>${title}</h2><span class="muted small mono">${mins}</span></div><div class="sb"></div>
        <button class="btn sm ${doneMap[k] ? "done" : "ghost"} mark" data-k="${k}">${doneMap[k] ? icon("check") + " Erledigt" : "Als erledigt markieren"}</button></section>`);
      secs.appendChild(s); fill($(".sb", s)); return s;
    }
    const topicWords = d.topic ? VOCAB.filter((v) => v[2] === d.topic) : VOCAB.filter((v) => v[3] <= 2);
    const shift = (n * 3) % Math.max(1, topicWords.length);
    const words = topicWords.slice(shift).concat(topicWords.slice(0, shift)).slice(0, 6);

    if (d.kind === "diag") {
      sec("warm", "Warm-up", "5 min", (b) => b.innerHTML = `<p>¡Hola! Erzähle dir selbst auf Spanisch in 3 Sätzen, warum du Spanisch gewählt hast.</p>`);
      sec("vocab", "Einstufungstest", "15 min", (b) => { b.innerHTML = `<p>Der Test umfasst 10 Vokabeln, 6 Grammatikfragen, einen kurzen Lese- und Hörteil und eine Schreibprobe.</p><a class="btn" href="#m-diag">Test starten</a>`; });
      ["gram", "input", "task", "speak", "review"].forEach((k) => sec(k, COMP.find((c) => c[0] === k)[1], "", (b) => b.innerHTML = `<p class="muted">Heute Teil des Einstufungstests.</p>`));
    } else if (d.kind === "mock") {
      sec("task", "Probeklausur", "Prüfungszeit", (b) => b.innerHTML = `<p>Heute schreibst du <strong>${esc(MOCKS.find((m) => m.id === d.mock).name)}</strong> unter Zeitbedingungen.</p><a class="btn" href="#mock-${d.mock}">Probeklausur öffnen</a>`);
      ["warm", "vocab", "gram", "input", "speak", "review"].forEach((k) => sec(k, COMP.find((c) => c[0] === k)[1], "", (b) => b.innerHTML = `<p class="muted">Heute entfällt dieser Baustein zugunsten der Probeklausur.</p>`));
    } else if (d.kind === "review" || d.kind === "final" || d.kind === "strategy") {
      sec("warm", "Warm-up", "5 min", (b) => b.innerHTML = `<p>${esc(PLANBITS.warmups[n % PLANBITS.warmups.length])}</p>`);
      sec("vocab", "Vokabeln wiederholen", "15 min", (b) => { b.innerHTML = `<p>Wiederhole die Karten, die du als «nochmal» markiert hast.</p><a class="btn sm" href="#m-vocab">Karteikarten</a>`; });
      sec("gram", "Grammatik wiederholen", "15 min", (b) => { const weakG = Object.entries(S.gram).sort((a, c) => a[1][0] / a[1][1] - c[1][0] / c[1][1]).slice(0, 3); b.innerHTML = weakG.length ? `<p>Deine schwächsten Themen:</p><ul>${weakG.map(([id]) => `<li><a href="#g-${id}">${esc(GRAMMAR.find((x) => x.id === id).t)}</a></li>`).join("")}</ul>` : `<p>Noch keine Fehlerdaten. Wiederhole: <a href="#g-subj1">Subjuntivo</a>, <a href="#g-indefimpf">Indefinido/Imperfecto</a>.</p>`; });
      sec("input", d.kind === "strategy" ? "Prüfungsstrategie" : "Fehlerliste", "15 min", (b) => { b.innerHTML = d.kind === "strategy" ? `<a class="btn sm" href="#m-strategy">So bearbeitest du die Klausur</a> <a class="btn sm ghost" href="#m-operatoren">Operatoren</a>` : (S.wrong.length ? `<ul class="wrongl">${S.wrong.slice(0, 10).map((w) => `<li>${esc(w.t)}</li>`).join("")}</ul>` : `<p class="muted">Noch keine Fehler gesammelt.</p>`); });
      sec("task", d.kind === "final" ? "Endspurt-Checkliste" : "Wochenaufgabe", "20 min", (b) => { b.innerHTML = d.kind === "final" ? `<a class="btn sm" href="#m-final">Endspurt öffnen</a>` : `<p>Schreibe einen Absatz (100 Wörter) zu einem Thema dieser Woche und prüfe ihn mit dem Hinweis-Check.</p><a class="btn sm" href="#m-write">Schreibtraining</a>`; });
      sec("speak", "Sprechen", "5–10 min", (b) => speakWidget(b, SPEAK[n % SPEAK.length]));
      sec("review", "Redemittel", "5 min", (b) => { const cat = REDEMITTEL[n % REDEMITTEL.length]; b.innerHTML = `<p class="lbl">${esc(cat.cat)}</p><ul class="rm">${cat.items.map((i) => `<li><strong lang="es">${esc(i[0])}</strong><span>${esc(i[1])}</span></li>`).join("")}</ul>`; });
    } else {
      const gr = GRAMMAR.find((x) => x.id === d.gram);
      sec("warm", "Warm-up", "5 min", (b) => b.innerHTML = `<p>${esc(d.warm)}</p>`);
      sec("vocab", "Vokabeln", "10–15 min", (b) => {
        b.innerHTML = `<ul class="vl">${words.map((w) => `<li><button class="say" data-say="${esc(w[0])}" aria-label="Aussprache ${esc(w[0])}">${icon("audio")}</button><span lang="es"><strong>${esc(w[0])}</strong>${w[4] ? `<em>${esc(w[4])}</em>` : ""}</span><span>${esc(w[1])}</span>${stars(w[3])}</li>`).join("")}</ul><p class="lbl">Kurztest</p>`;
        words.slice(0, 3).forEach((w, i) => { const pool = VOCAB.filter((v) => v !== w).map((v) => v[1]); const o = [w[1], pool[(n * 7 + i * 11) % pool.length], pool[(n * 13 + i * 5 + 3) % pool.length]]; const order = [0, 1, 2].sort(() => Math.random() - 0.5); MC(b, (i === 1 ? "DE → ES: " : "") + (i === 1 ? w[1] : w[0]), i === 1 ? order.map((j) => [w[0], VOCAB[(n * 7 + j * 5 + 1) % VOCAB.length][0], VOCAB[(n * 3 + j * 9 + 2) % VOCAB.length][0]][j]) : order.map((j) => o[j]), order.indexOf(0), `«${w[0]}» = ${w[1]}.`, null, { skill: "vocab" }); });
      });
      sec("gram", "Grammatik: " + gr.t, "10–15 min", (b) => grammarLesson(b, gr, true));
      sec("input", "Input: " + ({ read: "Lesen", listen: "Hören", podcast: "Podcast", clip: "Erklärclip", image: "Bild/Grafik" }[d.input]), "15–20 min", (b) => inputBlock(b, d));
      sec("task", "Abitur-Aufgabe", "20–30 min", (b) => taskBlock(b, d));
      sec("speak", "Sprechen", "5–10 min", (b) => speakWidget(b, SPEAK[d.speak]));
      sec("review", "Tageswiederholung", "5 min", (b) => { b.innerHTML = `<p class="lbl">Wörter</p><p lang="es">${words.map((w) => esc(w[0])).join(" · ")}</p><p class="lbl">Regel</p><p>${esc(gr.rule)}</p><p class="lbl">Redemittel des Tages</p>${(() => { const c = REDEMITTEL[n % REDEMITTEL.length]; const i = c.items[n % c.items.length]; return `<p lang="es"><strong>${esc(i[0])}</strong> – ${esc(i[1])}</p>`; })()}<p class="lbl">Deine Fehler heute</p>${(() => { const w = S.wrong.filter((x) => x.d === today()); return w.length ? `<ul class="wrongl">${w.map((x) => `<li>${esc(x.t)}</li>`).join("")}</ul>` : `<p class="muted">Keine – oder noch keine Übung gelöst.</p>`; })()}`; });
    }
    sec("prog", "Fortschritts-Check", "", (b) => {
      const sp = (S.time || {})[n] || 0; const todayW = S.wrong.filter((x) => x.d === today()).length;
      const tried = Object.keys(SKILLS).map((k) => [k, skillPct(k)]).filter((x) => x[1] != null).sort((a, c) => a[1] - c[1]);
      b.innerHTML = `<div class="stats mini"><div><span class="mono big2">${dayPct(n)}%</span><span>Tag erledigt</span></div><div><span class="mono big2">${Math.round(sp / 60)} min</span><span>Lernzeit heute</span></div><div><span class="mono big2">${todayW}</span><span>Fehler heute</span></div></div>
      ${tried[0] ? `<p>Schwächster Bereich: <strong>${SKILLS[tried[0][0]]}</strong> (${tried[0][1]} %). Empfehlung: <a href="#${modFor(tried[0][0])}">${SKILLS[tried[0][0]]} wiederholen</a>.</p>` : `<p class="muted">Löse Übungen, damit die Empfehlung erscheint.</p>`}`;
    });
    root.addEventListener("click", (e) => {
      const m = e.target.closest(".mark");
      if (m) { const k = m.dataset.k; if (doneMap[k]) delete doneMap[k]; else { doneMap[k] = 1; addXP(10); markActive(); } save(); checkBadges(); const y = window.scrollY; rerender(); window.scrollTo(0, y); }
      const s = e.target.closest("[data-say]"); if (s) say(s.dataset.say, "es-ES");
    });
  };
  window.leaveTag = function (n) { if (!dayStart || !n) return; S.time = S.time || {}; S.time[n] = (S.time[n] || 0) + Math.round((Date.now() - dayStart) / 1000); dayStart = 0; save(); };

  function inputBlock(b, d) {
    if (d.input === "read") { const id = READ_BY_TOPIC[d.topic] || "r1"; b.innerHTML = `<p>Text: <strong>${esc((READ[id] || LIT[id]).title)}</strong></p><a class="btn sm" href="#${READ[id] ? "read-" + id : "lit-" + id}">Text öffnen</a>`; }
    else if (d.input === "listen") { const id = HV_BY_TOPIC[d.topic] || "hv1"; b.innerHTML = `<p>Hörtext: <strong>${esc(LISTEN[id].title)}</strong> (${esc(LISTEN[id].accent)})</p><a class="btn sm" href="#hv-${id}">Hörübung öffnen</a>`; }
    else if (d.input === "podcast") { const p = PODCASTS[d.n % PODCASTS.length]; b.innerHTML = `<p class="lbl">${esc(p.series)}</p><h3>${esc(p.title)}</h3>`; Player(b, p.seg, { voice: p.voice }); }
    else if (d.input === "clip") { const c = CLIPS[d.n % CLIPS.length]; b.innerHTML = `<p>Erklärclip: <strong>${esc(c.title)}</strong></p><a class="btn sm" href="#clip-${c.id}">Clip ansehen</a>`; }
    else { infographic(b, d.topic); }
  }
  window.infographic = function (b, topic) {
    const sets = {
      turismo: { t: "Bildimpuls: Ein Strand im August", q: "Describe la escena y compara la playa en agosto con la misma playa en enero.", bars: [["enero", 12], ["abril", 35], ["agosto", 96], ["octubre", 40]], unit: "Ocupación de la playa (%)" },
      migr: { t: "Grafik: Warum emigrieren junge Menschen?", q: "Presenta los datos y explica qué motivos te parecen más importantes.", bars: [["trabajo", 64], ["sueldo", 48], ["experiencia", 37], ["estudios", 22]], unit: "Encuesta a 100 jóvenes (%)" },
      pobreza: { t: "Grafik: Womit verbringen Kinder im Markt ihren Tag?", q: "Describe el gráfico y saca conclusiones.", bars: [["vender", 5], ["cargar", 2], ["escuela", 3], ["jugar", 1]], unit: "Horas al día" }
    };
    const s = sets[topic] || sets.turismo; const max = Math.max(...s.bars.map((x) => x[1]));
    b.innerHTML = `<figure class="infog"><figcaption><strong>${esc(s.t)}</strong><span class="tag warn">Beispieldaten, keine echten Statistiken</span></figcaption>
      <svg viewBox="0 0 320 170" role="img" aria-label="${esc(s.unit)}: ${s.bars.map((x) => x[0] + " " + x[1]).join(", ")}">
      ${[0, 0.5, 1].map((g) => `<line x1="40" x2="310" y1="${140 - g * 110}" y2="${140 - g * 110}" class="grid"/><text x="34" y="${144 - g * 110}" class="ax" text-anchor="end">${Math.round(max * g)}</text>`).join("")}
      ${s.bars.map((x, i) => { const hgt = (x[1] / max) * 110; const xx = 55 + i * 66; return `<rect x="${xx}" y="${140 - hgt}" width="40" height="${hgt}" rx="3" class="barr"/><text x="${xx + 20}" y="${134 - hgt}" text-anchor="middle" class="val">${x[1]}</text><text x="${xx + 20}" y="158" text-anchor="middle" class="ax">${esc(x[0])}</text>`; }).join("")}
      </svg><p class="small muted">${esc(s.unit)}</p></figure><p lang="es"><strong>Tarea:</strong> ${esc(s.q)}</p>`;
  };

  function taskBlock(b, d) {
    const k = O.kurse[S.kurs];
    if (d.task === "TA1" || d.task === "TA2") {
      const src = TEXT_BY_TOPIC[d.topic] && TEXT_BY_TOPIC[d.topic][0] !== "MED" && TEXT_BY_TOPIC[d.topic][0] !== "LISTEN" ? TEXT_BY_TOPIC[d.topic] : ["READ", d.n % 2 ? "r1" : "r2"];
      const tx = window[src[0]][src[1]];
      const op = d.task === "TA1" ? ["resumir", "Resume", "Teilaufgabe 1 · AFB I/II"] : ["analizar", "Analiza", "Teilaufgabe 2 · AFB II"];
      const prompt = d.task === "TA1" ? `${op[1]} el contenido del texto «${tx.title}».` : `${op[1]} los recursos que usa el texto «${tx.title}» y su efecto en el lector.`;
      b.innerHTML = `<p class="lbl">${op[2]} · Operator <em lang="es">${op[0]}</em></p><p class="task" lang="es">${esc(prompt)}</p><p><a href="#${src[0] === "READ" ? "read-" : "lit-"}${src[1]}">Text öffnen</a> · <a href="#op-${op[0]}">Was verlangt «${op[0]}»?</a></p>`;
    } else if (d.task === "TA3") {
      b.innerHTML = `<p class="lbl">Teilaufgabe 3 · AFB II/III · Operator <em lang="es">comentar</em></p><p class="task" lang="es">Comenta la afirmación: ${esc(TA3[d.topic] || TA3.jovenes)}</p><p class="hint">Aufbau: Position → 2 Argumente mit Beispielen aus dem Unterricht → Gegenargument («si bien es cierto que…») → Fazit. 200–250 Wörter.</p>`;
    } else if (d.task === "SM") {
      const m = MICRO[d.n % MICRO.length];
      b.innerHTML = `<p class="lbl">Sprachmittlung · Mini-Aufgabe</p><p class="task">${esc(m[1])}</p><p class="hint">Nicht übersetzen, sondern erklären: «En Alemania, … es una especie de …». Danach die große Übung: <a href="#m-mediation">Sprachmittlung</a>.</p>`;
    } else if (d.task === "HV") {
      const id = HV_BY_TOPIC[d.topic] || "hv1";
      b.innerHTML = `<p class="lbl">Hörverstehen · Prüfungsformat</p><p>Bearbeite den Hörtext wie im Abitur: Fragen lesen, zweimal hören, beantworten.</p><a class="btn sm" href="#hv-${id}">${esc(LISTEN[id].title)}</a>`;
    } else {
      b.innerHTML = `<p class="lbl">Operatoren-Training</p><p>Welcher Operator passt?</p>`;
      const ops = OPERATORS.SL; const pick = [ops[(d.n * 3) % ops.length], ops[(d.n * 5 + 4) % ops.length]];
      pick.forEach((o, i) => { const others = ops.filter((x) => x !== o); const opts = [o[0], others[(d.n + i) % others.length][0], others[(d.n + i + 5) % others.length][0]]; const ord = [0, 1, 2].sort(() => Math.random() - 0.5); MC(b, o[1], ord.map((j) => opts[j]), ord.indexOf(0), `«${o[0]}»: ${o[2]}`, null, { skill: "exam" }); });
    }
    const t = h(`<div class="row"></div>`); b.appendChild(t); Timer(t, d.phase === "Prüfungstraining" ? 30 * 60 : 20 * 60, "Bearbeitungszeit");
  }

  /* ---- Grammatiklektion: Erklären → Beispiel → Üben → Prüfung → Fehlerkorrektur ---- */
  window.grammarLesson = function (b, gr, compact) {
    b.innerHTML = `<div class="gsteps">
      <div><p class="lbl">1 · Regel</p><p>${esc(gr.rule)}</p></div>
      <div><p class="lbl">2 · Beispiele</p><ul class="exl" lang="es">${gr.ex.map((x) => `<li><button class="say" data-say="${esc(x)}" aria-label="Vorlesen">${icon("audio")}</button>${esc(x)}</li>`).join("")}</ul></div>
      <div class="drills"><p class="lbl">3 · Übung</p></div>
      <div><p class="lbl">4 · Im Abitur</p><p>${esc(gr.exam)}</p></div>
      <div class="fix"><p class="lbl">5 · Fehler finden</p><p>Was ist falsch? <span lang="es" class="err">${esc(gr.mistake[0])}</span></p><button class="btn sm ghost">Lösung zeigen</button><p class="sol" hidden lang="es">${esc(gr.mistake[1])}</p></div></div>`;
    const dr = $(".drills", b);
    gr.drill.forEach((x) => MC(dr, x[0], x[1], x[2], x[3], null, { skill: "grammar", gram: gr.id }));
    $(".fix button", b).onclick = function () { $(".fix .sol", b).hidden = false; this.remove(); };
    b.addEventListener("click", (e) => { const s = e.target.closest("[data-say]"); if (s && !e.target.closest(".secs")) say(s.dataset.say); });
  };

  /* ---- Sprechen ---- */
  window.speakWidget = function (b, sp) {
    b.innerHTML = `<p class="lbl">${esc(sp.type)} ${stars(sp.lvl)}</p><p class="task" lang="es">${esc(sp.prompt)}</p><div class="row tw"></div>
      ${canRecord() ? `<div class="recwrap"></div>` : `<p class="note">Aufnahme: Das Mikrofon ist in dieser Ansicht gesperrt. Nimm dich mit der Sprachmemo-App deines Handys auf und hör dich danach an. In der installierten Version kannst du direkt hier aufnehmen.</p>`}
      <p class="lbl">Selbstcheck nach dem Sprechen</p><ul class="checks">${sp.check.map((c, i) => `<li><label><input type="checkbox" data-i="${i}"> <span lang="es">${esc(c)}</span></label></li>`).concat(["Flüssig, ohne lange Pausen", "Aussprache klar (r/rr, b/v, Betonung)", "Grammatik überwiegend korrekt"].map((c) => `<li><label><input type="checkbox"> ${esc(c)}</label></li>`)).join("")}</ul>
      <button class="btn sm ghost sp-save">Selbstcheck speichern</button><p class="fb small"></p>`;
    if (canRecord()) Recorder($(".recwrap", b));
    const tw = $(".tw", b); const prep = Timer(tw, sp.prep, "Vorbereitung"); Timer(tw, sp.talk, "Sprechzeit");
    $(".sp-save", b).onclick = () => { const all = $$(".checks input", b); const pct = all.filter((x) => x.checked).length / all.length; recordScore("speaking", pct); $(".fb", b).textContent = `Gespeichert: ${Math.round(pct * 100)} % der Kriterien erfüllt (Selbsteinschätzung).`; };
  };
})();
