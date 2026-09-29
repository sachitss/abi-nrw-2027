/* ===== Module ===== */
(function () {
  const O = window.OFFICIAL;
  const MODS = [
    ["m-diag", "Einstufungstest", "target", "Wortschatz, Grammatik, Lesen, Hören, Schreibprobe"],
    ["m-vocab", "Wortschatz", "vocab", VOCAB.length + " Einträge, Karteikarten ES↔DE"],
    ["m-grammar", "Grammatik", "grammar", GRAMMAR.length + " Themen in 5 Schritten"],
    ["m-read", "Leseverstehen", "read", "Blog und Sachtext mit Aufgaben"],
    ["m-listen", "Hörverstehen", "audio", "4 Hörtexte, 3 Akzente, Prüfungsablauf"],
    ["m-write", "Schreiben", "pen", "6 Stufen vom Satz zur Abituraufgabe"],
    ["m-mediation", "Sprachmittlung", "mediate", "Kurz bis Abiturniveau mit Musterlösung"],
    ["m-analysis", "Textanalyse", "flag", "Literarische Texte markieren und analysieren"],
    ["m-speak", "Sprechen", "mic", SPEAK.length + " Formate mit Vorbereitungszeit"],
    ["m-culture", "Kulturwissen", "globe", "Hintergrund zu den Schwerpunkten 2027"],
    ["m-strategy", "Prüfungsstrategie", "clock", "So bearbeitest du die Klausur"],
    ["m-operatoren", "Operatoren", "task", "Offizielle Liste ab Abitur 2025"],
    ["m-redemittel", "Redemittel", "pen", "Phrasen für jede Teilaufgabe"],
    ["m-podcast", "Podcasts", "audio", PODCASTS.length + " Folgen mit Transkript"],
    ["m-video", "Erklärclips", "video", CLIPS.length + " animierte Clips mit Untertiteln"],
    ["pruefung", "Probeklausuren", "exam", "4 Klausuren, von geführt bis Vollsimulation"],
    ["m-final", "Endspurt", "check", "Letzte Wiederholung und Fehlerliste"]
  ];
  window.viewModule = function (root) {
    root.innerHTML = `<div class="ph"><h1>Module</h1></div>
    <div class="modgrid">${MODS.map((m) => `<a class="mod" href="#${m[0]}">${icon(m[2])}<strong>${m[1]}</strong><span>${esc(m[3])}</span></a>`).join("")}</div>
    <p class="note">Alle Übungstexte, Hörtexte und Aufgaben sind eigens erstellt (fiktive Personen). Amtlich sind nur die unter «Grundlagen» als <span class="tag off">Offiziell NRW</span> markierten Vorgaben.</p>`;
  };
  function back(to, label) { return `<a class="back" href="#${to || "module"}">${icon("back")} ${label || "Module"}</a>`; }
  const topicsForKurs = () => O.fokus[S.kurs].map((f) => f.topic).concat(["jovenes", "eco"]);

  /* ---------- Einstufungstest ---------- */
  window.viewDiag = function (root) {
    root.innerHTML = `${back()}<h1>Einstufungstest</h1><p class="muted">Etwa 15 Minuten. Ergebnis: Stärken, Schwächen und eine Empfehlung für die Plan-Länge.</p>
      <section class="sec"><h2>1 · Wortschatz (10)</h2><div class="dv"></div></section>
      <section class="sec"><h2>2 · Grammatik (6)</h2><div class="dg"></div></section>
      <section class="sec"><h2>3 · Lesen</h2><p lang="es" class="quote">${esc(READ.r1.paras[0])}</p><div class="dr"></div></section>
      <section class="sec"><h2>4 · Hören</h2><div class="dlis"></div></section>
      <section class="sec"><h2>5 · Schreibprobe</h2><label for="diag-w">Schreibe 4–6 Sätze: <span lang="es">¿Qué planes tienes para después del Abitur?</span></label><textarea id="diag-w" rows="5"></textarea></section>
      <section class="sec"><h2>6 · Selbsteinschätzung</h2><div class="self">${["Ich verstehe Zeitungsartikel auf Spanisch weitgehend.", "Ich kann eine Meinung mit Argumenten schreiben.", "Ich verstehe Radiobeiträge beim zweiten Hören.", "Ich kann einen deutschen Text sinngemäß auf Spanisch wiedergeben."].map((t, i) => `<div class="selfq"><p>${t}</p><div class="seg4" role="radiogroup">${["kaum", "teilweise", "gut", "sicher"].map((l, j) => `<label><input type="radio" name="self${i}" value="${j}">${l}</label>`).join("")}</div></div>`).join("")}</div></section>
      <button class="btn" id="diag-go">Auswerten</button><div class="dres"></div>`;
    const res = { v: [0, 0], g: [0, 0], r: [0, 0], l: [0, 0] };
    DIAG.vocab.forEach((x) => MC($(".dv", root), x[0], x[1], x[2], "", (ok) => { res.v[1]++; if (ok) res.v[0]++; }, { skill: "vocab" }));
    DIAG.grammar.forEach((id) => { const g = GRAMMAR.find((x) => x.id === id); const d = g.drill[0]; MC($(".dg", root), d[0], d[1], d[2], d[3], (ok) => { res.g[1]++; if (ok) res.g[0]++; }, { skill: "grammar", gram: id }); });
    const r = READ.r1.ex[0]; MC($(".dr", root), r.q, r.o, r.a, r.why, (ok) => { res.r[1]++; if (ok) res.r[0]++; }, { skill: "reading" });
    const hv = LISTEN.hv4; Player($(".dlis", root), [["es", hv.text]], { voice: hv.voice, transcript: false });
    MC($(".dlis", root), hv.q[0].q, hv.q[0].o, hv.q[0].a, "", (ok) => { res.l[1]++; if (ok) res.l[0]++; }, { skill: "listening" });
    MC($(".dlis", root), hv.q[4].q, hv.q[4].o, hv.q[4].a, "", (ok) => { res.l[1]++; if (ok) res.l[0]++; }, { skill: "listening" });
    $("#diag-go", root).onclick = () => {
      const pct = (a) => (a[1] ? Math.round((a[0] / a[1]) * 100) : 0);
      const self = [0, 1, 2, 3].map((i) => { const c = $(`input[name=self${i}]:checked`, root); return c ? +c.value : 1; });
      const words = ($("#diag-w", root).value.trim().match(/\S+/g) || []).length;
      const score = Math.round(pct(res.v) * 0.3 + pct(res.g) * 0.35 + pct(res.r) * 0.1 + pct(res.l) * 0.1 + (self.reduce((a, b) => a + b, 0) / 12) * 15);
      const dte = daysToExam();
      let rec = score < 45 ? 120 : score < 65 ? 90 : score < 80 ? 60 : 30; while (rec > dte && rec > 30) rec -= 30;
      S.diag = { date: today(), score, v: pct(res.v), g: pct(res.g), r: pct(res.r), l: pct(res.l), words, rec }; checkBadges(); save();
      $(".dres", root).innerHTML = `<div class="panel result"><h2>Ergebnis: ${score} / 100</h2><ul class="skills">${[["Wortschatz", pct(res.v)], ["Grammatik", pct(res.g)], ["Lesen", pct(res.r)], ["Hören", pct(res.l)]].map(([l, p]) => `<li><span>${l}</span><span class="bar"><span style="width:${p}%" class="${p < 50 ? "b-bad" : p < 70 ? "b-warn" : "b-good"}"></span></span><span class="mono small">${p}%</span></li>`).join("")}</ul>
        <p>Schreibprobe: ${words} Wörter${words < 30 ? " – versuche beim nächsten Mal mehr zu schreiben." : "."} Prüfe sie mit dem <a href="#m-write">Hinweis-Check</a>.</p>
        <p><strong>Empfehlung: ${rec}-Tage-Plan.</strong> <button class="btn sm" id="diag-apply">Übernehmen</button></p>
        <p class="note">Die Einstufung ist eine Übungsdiagnose dieses Kurses, kein offizieller GER-Test.</p></div>`;
      $("#diag-apply", root).onclick = () => { S.planLen = rec; save(); location.hash = "plan"; };
    };
  };

  /* ---------- Wortschatz ---------- */
  window.viewVocab = function (root) {
    const my = topicsForKurs();
    const st = window._vs = window._vs || { topic: "all", dir: "es", lvl: 0, i: 0, mode: "cards" };
    const list = VOCAB.filter((v) => (st.topic === "all" ? my.includes(v[2]) || v[2] === "texto" : v[2] === st.topic) && (!st.lvl || v[3] === st.lvl));
    const topicOpts = Object.entries(TOPICS).map(([k, t]) => `<option value="${k}" ${st.topic === k ? "selected" : ""}>${esc(t.de)}${my.includes(k) ? "" : k === "texto" ? " (Methode)" : " (nicht Fokus ${O.kurse[S.kurs].short})"}</option>`).join("");
    root.innerHTML = `${back()}<h1>Wortschatz</h1>
      <div class="filters">
        <label>Thema <select id="v-topic"><option value="all">Alle Schwerpunkte ${esc(O.kurse[S.kurs].short)}</option>${topicOpts}</select></label>
        <label>Niveau <select id="v-lvl"><option value="0">alle</option>${[1, 2, 3, 4].map((l) => `<option value="${l}" ${st.lvl === l ? "selected" : ""}>${"★".repeat(l)} ${lvlName(l)}</option>`).join("")}</select></label>
        <div class="seg sm" role="radiogroup" aria-label="Richtung"><button role="radio" aria-checked="${st.dir === "es"}" data-dir="es">ES → DE</button><button role="radio" aria-checked="${st.dir === "de"}" data-dir="de">DE → ES</button></div>
        <div class="seg sm" role="radiogroup" aria-label="Ansicht"><button role="radio" aria-checked="${st.mode === "cards"}" data-mode="cards">Karten</button><button role="radio" aria-checked="${st.mode === "list"}" data-mode="list">Liste</button></div>
      </div><div class="vbody"></div>`;
    const body = $(".vbody", root);
    if (!list.length) body.innerHTML = `<p class="muted">Keine Einträge für diese Auswahl.</p>`;
    else if (st.mode === "list") {
      body.innerHTML = `<div class="tblwrap"><table class="tbl"><thead><tr><th>Español</th><th>Deutsch</th><th>Thema</th><th>Niveau</th></tr></thead><tbody>${list.map((v) => `<tr><td lang="es"><button class="say" data-say="${esc(v[0])}" aria-label="Aussprache">${icon("audio")}</button><strong>${esc(v[0])}</strong>${v[4] ? `<br><small>${esc(v[4])}</small>` : ""}</td><td>${esc(v[1])}</td><td><small>${esc(TOPICS[v[2]].es)}</small></td><td>${stars(v[3])}</td></tr>`).join("")}</tbody></table></div>`;
    } else {
      st.i = st.i % list.length; const v = list[st.i]; const box = S.cards[v[0]] || 0;
      const front = st.dir === "es" ? v[0] : v[1], backT = st.dir === "es" ? v[1] : v[0];
      body.innerHTML = `<p class="muted small mono">${st.i + 1} / ${list.length} · Box ${box}</p>
        <button class="flash" aria-live="polite"><span class="f-front" lang="${st.dir}">${esc(front)}</span><span class="f-back" hidden><span lang="${st.dir === "es" ? "de" : "es"}">${esc(backT)}</span>${v[4] ? `<em lang="es">${esc(v[4])}</em>` : ""}</span><small class="muted">Antippen zum Umdrehen</small></button>
        <div class="row center"><button class="btn ghost" data-k="again">Nochmal</button><button class="btn sm ghost say" data-say="${esc(v[0])}">${icon("audio")} Hören</button><button class="btn" data-k="ok">Gewusst</button></div>
        <p class="small muted">${esc(TOPICS[v[2]].es)} · ${stars(v[3])}</p>`;
      $(".flash", body).onclick = function () { $(".f-front", this).hidden = !$(".f-front", this).hidden; $(".f-back", this).hidden = !$(".f-back", this).hidden; };
      $$("[data-k]", body).forEach((b) => b.onclick = () => { const ok = b.dataset.k === "ok"; S.cards[v[0]] = ok ? Math.min(5, box + 1) : 0; record("vocab", ok, null, ok ? null : "Vokabel: " + v[0] + " = " + v[1]); st.i++; rerender(); });
    }
    $("#v-topic", root).onchange = (e) => { st.topic = e.target.value; st.i = 0; rerender(); };
    $("#v-lvl", root).onchange = (e) => { st.lvl = +e.target.value; st.i = 0; rerender(); };
    $$("[data-dir]", root).forEach((b) => b.onclick = () => { st.dir = b.dataset.dir; rerender(); });
    $$("[data-mode]", root).forEach((b) => b.onclick = () => { st.mode = b.dataset.mode; rerender(); });
    root.addEventListener("click", (e) => { const s = e.target.closest("[data-say]"); if (s) say(s.dataset.say); });
  };

  /* ---------- Grammatik ---------- */
  const ORDERS = [["No creo que sea la mejor solución", "Ich glaube nicht, dass es die beste Lösung ist."], ["Se lo explicaré a Carmen mañana", "Ich werde es Carmen morgen erklären."], ["Si tuviera tiempo viajaría a Chile", "Wenn ich Zeit hätte, würde ich nach Chile reisen."], ["La autora recurre a preguntas retóricas", "Die Autorin greift auf rhetorische Fragen zurück."]];
  window.viewGrammar = function (root) {
    const w = (id) => { const r = S.gram[id]; return r && r[1] ? Math.round((r[0] / r[1]) * 100) + "%" : "–"; };
    root.innerHTML = `${back()}<h1>Grammatik</h1><p class="muted">Jedes Thema: Regel → Beispiele → Übung → Anwendung im Abitur → Fehlerkorrektur.</p>
      <ul class="glist">${GRAMMAR.map((g) => `<li><a href="#g-${g.id}"><span>${esc(g.t)}</span>${stars(g.lvl)}<span class="mono small">${w(g.id)}</span></a></li>`).join("")}</ul>
      <section class="sec"><h2>Satzbau-Puzzle</h2><div class="ord"></div></section>`;
    ORDERS.forEach((o) => Order($(".ord", root), o[0], o[1], null, { skill: "grammar" }));
  };
  window.viewGramTopic = function (root, id) {
    const g = GRAMMAR.find((x) => x.id === id) || GRAMMAR[0];
    const r = S.gram[g.id]; const weak = r && r[1] >= 2 && r[0] / r[1] < 0.7;
    const exs = VOCAB.filter((v) => v[4]).slice((GRAMMAR.indexOf(g) * 4) % 40, (GRAMMAR.indexOf(g) * 4) % 40 + 10);
    root.innerHTML = `${back("m-grammar", "Grammatik")}<h1>${esc(g.t)}</h1><p>${stars(g.lvl)}</p><div class="gl"></div>
      ${weak ? `<section class="sec warnsec"><h2>Wiederholungspaket</h2><p>Du hast bei diesem Thema ${Math.round((r[0] / r[1]) * 100)} % Treffer. Empfohlen:</p><ol><li>Regel oben noch einmal laut lesen</li><li>10 Beispielsätze unten nachsprechen</li><li>Übungen oben erneut lösen (Seite neu öffnen)</li><li>${g.id.startsWith("subj") ? '<a href="#clip-c1">Erklärclip Subjuntivo</a>' : '<a href="#m-podcast">Podcast-Folge hören</a>'}</li><li><a href="#m-write">Schreibaufgabe Stufe 2</a> mit mindestens drei Beispielen dieser Struktur</li><li>Wiederholungstest: diese Seite morgen erneut</li></ol></section>` : ""}
      <section class="sec"><h2>Beispielsätze aus dem Themenwortschatz</h2><ul class="exl" lang="es">${exs.map((v) => `<li><button class="say" data-say="${esc(v[4])}" aria-label="Vorlesen">${icon("audio")}</button>${esc(v[4])}</li>`).join("")}</ul></section>`;
    grammarLesson($(".gl", root), g);
    root.addEventListener("click", (e) => { const s = e.target.closest("[data-say]"); if (s && !e.target.closest(".gl")) say(s.dataset.say); });
  };

  /* ---------- Redemittel ---------- */
  window.viewRedemittel = function (root) {
    root.innerHTML = `${back()}<h1>Redemittel für das Abitur</h1><p class="muted">Spanische Wendung → Erklärung → Beispiel. <span class="tag">Übungsmaterial</span></p>
      ${REDEMITTEL.map((c) => `<section class="sec"><h2>${esc(c.cat)}</h2><ul class="rm">${c.items.map((i) => `<li><strong lang="es">${esc(i[0])}</strong><span>${esc(i[1])}</span><em lang="es">${esc(i[2])}</em></li>`).join("")}</ul></section>`).join("")}`;
  };

  /* ---------- Operatoren ---------- */
  window.viewOperatoren = function (root, focus) {
    root.innerHTML = `${back()}<h1>Operatoren</h1><p><span class="tag off">Offiziell NRW</span> Liste gültig ab Abitur 2025. Erklärungen und Beispielaufgaben in diesem Kurs sind eigene Formulierungen <span class="tag">Übungsmaterial</span>.</p>
      <section class="sec"><h2>Schreiben / Leseverstehen</h2><p class="hint">«TA» = typischer Einsatz in Teilaufgabe 1, 2 oder 3 (Hinweis des Kurses; laut Vorgabe können sich alle Operatoren auf alle Anforderungsbereiche beziehen).</p>
      <div class="opgrid">${OPERATORS.SL.map((o) => `<article class="op ${focus === o[0] ? "hl" : ""}" id="op-${o[0].replace(/ /g, "-")}"><h3 lang="es">${esc(o[0])}</h3><span class="tag">TA ${o[4]}</span><p><strong>Bedeutung:</strong> ${esc(o[1])}</p><p><strong>Was tun:</strong> ${esc(o[2])}</p><p class="task" lang="es">${esc(o[3])}</p></article>`).join("")}</div></section>
      <section class="sec"><h2>Sprachmittlung</h2><ul class="rm">${OPERATORS.SM.map((o) => `<li><strong lang="es">${o[0]}</strong><span>${esc(o[1])}</span></li>`).join("")}</ul></section>
      <section class="sec"><h2>Hörverstehen</h2><ul class="rm">${OPERATORS.HV.map((o) => `<li><strong lang="es">${o[0]}</strong><span>${esc(o[1])}</span></li>`).join("")}</ul></section>
      <section class="sec"><h2>Operator-Blitz (60 Sekunden)</h2><p>Ordne so viele Aufgabenbeschreibungen wie möglich dem richtigen Operator zu.</p><div class="row blt"></div><div class="blitz"></div></section>`;
    const bl = $(".blitz", root); let running = false, score = 0;
    const tm = Timer($(".blt", root), 60, "Zeit", () => { running = false; bl.innerHTML = `<p class="good"><strong>${score} richtig.</strong> ${score > (S.blitz || 0) ? "Neuer persönlicher Bestwert!" : "Bestwert: " + (S.blitz || 0)}</p>`; if (score > (S.blitz || 0)) { S.blitz = score; save(); } recordScore("exam", Math.min(1, score / 8)); });
    function next() {
      if (!running) return; bl.innerHTML = "";
      const o = OPERATORS.SL[Math.floor(Math.random() * OPERATORS.SL.length)]; const others = OPERATORS.SL.filter((x) => x !== o && x[1] !== o[1]).sort(() => Math.random() - 0.5).slice(0, 2);
      const opts = [o, ...others].sort(() => Math.random() - 0.5);
      MC(bl, o[1], opts.map((x) => x[0]), opts.indexOf(o), "", (ok) => { if (ok) score++; setTimeout(next, 500); });
    }
    const st = h(`<button class="btn sm">Blitz starten</button>`); $(".blt", root).prepend(st);
    st.onclick = () => { score = 0; running = true; tm.start(); st.remove(); next(); };
    if (focus) setTimeout(() => { const el = $("#op-" + focus.replace(/ /g, "-")); if (el) el.scrollIntoView({ block: "center" }); }, 50);
  };

  /* ---------- Lesen ---------- */
  window.viewRead = function (root) {
    root.innerHTML = `${back()}<h1>Leseverstehen</h1><p class="muted">Progression: B1 → Abiturniveau. Übungstexte, eigens erstellt.</p>
      <div class="modgrid">${Object.entries(READ).map(([id, r]) => `<a class="mod" href="#read-${id}">${icon("read")}<strong>${esc(r.title)}</strong><span>${esc(r.kind)} · GER ${r.ger} · ${stars(r.lvl)}</span></a>`).join("")}${Object.entries(LIT).map(([id, r]) => `<a class="mod" href="#lit-${id}">${icon("flag")}<strong>${esc(r.title)}</strong><span>${esc(r.kind)} · Abitur · ${stars(r.lvl)}</span></a>`).join("")}</div>`;
  };
  function textHTML(r, id) {
    return `<article class="text" lang="es">${r.paras.map((p, i) => `<p data-p="${i}"><span class="ln mono">${i + 1}</span>${p.replace(/([.!?]»?)\s+/g, "$1\u0001").split("\u0001").map((s, j) => `<span class="s" data-s="${i}-${j}">${esc(s)}</span>`).join(" ")}</p>`).join("")}</article>`;
  }
  window.textHTML = textHTML;
  window.viewReadText = function (root, id) {
    const r = READ[id];
    root.innerHTML = `${back("m-read", "Leseverstehen")}<p class="eyebrow">${esc(r.kind)} · GER ${r.ger} · Übungstext</p><h1 lang="es">${esc(r.title)}</h1>${stars(r.lvl)}
      <div class="split"><div>${textHTML(r)}</div><div class="rex"></div></div>`;
    const ex = $(".rex", root);
    r.ex.forEach((x) => {
      if (x.type === "mc") MC(ex, x.q, x.o, x.a, x.why, null, { skill: "reading" });
      if (x.type === "match") Match(ex, x.q, x.pairs, null, { skill: "reading" });
      if (x.type === "evidence") {
        const e = h(`<div class="ex"><p class="ex-q">${esc(x.q)}</p><p class="hint">Tippe im Text auf den Satz.</p><div class="fb"></div></div>`); ex.appendChild(e);
        let done = false;
        $$(".s", root).forEach((s) => s.addEventListener("click", () => {
          if (done) return; done = true; const ok = s.textContent.includes(x.sentenceKey) && s.dataset.s.startsWith(x.para + "-");
          s.classList.add(ok ? "hl-good" : "hl-bad"); const target = $$(".s", root).find((q) => q.textContent.includes(x.sentenceKey) && q.dataset.s.startsWith(x.para + "-")); if (target) target.classList.add("hl-good");
          $(".fb", e).innerHTML = `<p class="${ok ? "good" : "bad"}"><strong>${ok ? "Richtig." : "Nicht ganz."}</strong> Der Beleg steht in Absatz ${x.para + 1}: «${esc(target ? target.textContent : "")}». Im Abitur mit Zeilenangabe zitieren.</p>`;
          record("reading", ok);
        }));
      }
    });
  };

  /* ---------- Textanalyse (Markieren) ---------- */
  const CATS = [["voc", "Vokabel"], ["ev", "Beleg"], ["sty", "Stilmittel"], ["arg", "Argument"], ["imp", "Wichtig"]];
  window.viewAnalysis = function (root) {
    root.innerHTML = `${back()}<h1>Textanalyse</h1><p class="muted">Pflicht für Aufgabe I (literarischer Text) und Teilaufgabe 2 (analizar/examinar).</p>
      <section class="sec"><h2>Worauf du achtest</h2><div class="chipsinfo">${["Tema", "Estructura", "Personajes", "Relaciones", "Perspectiva narrativa", "Lenguaje", "Recursos estilísticos", "Tono", "Intención", "Contexto", "Argumentación", "Citas"].map((x) => `<span class="tag" lang="es">${x}</span>`).join(" ")}</div>
      <p class="hint">Dreischritt für jeden Absatz deiner Analyse: <strong>These</strong> (La narradora crea tensión…) → <strong>Beleg</strong> (l. 7: «…») → <strong>Wirkung</strong> (Así, el lector…).</p></section>
      <div class="modgrid">${Object.entries(LIT).map(([id, r]) => `<a class="mod" href="#lit-${id}">${icon("flag")}<strong>${esc(r.title)}</strong><span>${esc(r.kind)} · ${esc(TOPICS[r.topic].de)}</span></a>`).join("")}<a class="mod" href="#read-r2">${icon("read")}<strong>${esc(READ.r2.title)}</strong><span>Sachtext-Analyse</span></a></div>`;
  };
  window.viewLit = function (root, id) {
    const r = LIT[id]; S.notes[id] = S.notes[id] || {}; let cat = "ev";
    root.innerHTML = `${back("m-analysis", "Textanalyse")}<p class="eyebrow">${esc(r.kind)} · Übungstext</p><h1 lang="es">${esc(r.title)}</h1>
      <div class="annobar" role="radiogroup" aria-label="Markierfarbe">${CATS.map((c) => `<button role="radio" aria-checked="${c[0] === cat}" data-c="${c[0]}" class="an-${c[0]}">${c[1]}</button>`).join("")}<button class="btn sm ghost" data-clear>Alle Markierungen löschen</button></div>
      <p class="hint">Wähle eine Kategorie und tippe auf einen Satz, um ihn zu markieren. Nochmal tippen entfernt die Markierung.</p>
      <div class="split"><div>${textHTML(r)}</div><div><section class="sec"><h2>Analyse-Schwerpunkte</h2><ul>${r.focus.map((f) => `<li lang="es">${esc(f)}</li>`).join("")}</ul></section>
      <section class="sec"><h2>Deine Markierungen</h2><div class="mylist"></div></section>
      <section class="sec"><h2>Aufgabe</h2><p class="task" lang="es">${id === "l1" ? "Analiza cómo el narrador crea una atmósfera inquietante." : "Analiza cómo se presenta la tensión entre el silencio y el deseo de recordar."}</p><a class="btn sm" href="#m-write">Im Schreibtraining ausarbeiten</a></section></div></div>`;
    function paint() {
      $$(".s", root).forEach((s) => { CATS.forEach((c) => s.classList.remove("an-" + c[0])); const v = S.notes[id][s.dataset.s]; if (v) s.classList.add("an-" + v); });
      const ents = Object.entries(S.notes[id]);
      $(".mylist", root).innerHTML = ents.length ? CATS.map((c) => { const it = ents.filter((e) => e[1] === c[0]); return it.length ? `<p class="lbl"><span class="dot an-${c[0]}"></span>${c[1]}</p><ul class="small">${it.map((e) => { const s = $(`.s[data-s="${e[0]}"]`, root); return `<li lang="es">Abs. ${+e[0].split("-")[0] + 1}: ${esc(s ? s.textContent.slice(0, 80) : "")}…</li>`; }).join("")}</ul>` : ""; }).join("") : `<p class="muted">Noch nichts markiert.</p>`;
    }
    $$("[data-c]", root).forEach((b) => b.onclick = () => { cat = b.dataset.c; $$("[data-c]", root).forEach((x) => x.setAttribute("aria-checked", x === b)); });
    $("[data-clear]", root).onclick = () => { S.notes[id] = {}; save(); paint(); };
    $$(".s", root).forEach((s) => { s.tabIndex = 0; const f = () => { const k = s.dataset.s; if (S.notes[id][k] === cat) delete S.notes[id][k]; else S.notes[id][k] = cat; save(); paint(); }; s.onclick = f; s.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); f(); } }; });
    paint();
  };

  /* ---------- Hören ---------- */
  window.viewListen = function (root) {
    root.innerHTML = `${back()}<h1>Hörverstehen</h1>
      ${O.kurse[S.kurs].hv ? `<p class="muted">Im Abitur: ca. 3 Hörtexte, zusammen ca. 10 Minuten, jeder Text wird zweimal abgespielt, 30 Minuten inklusive Lesezeit. Aufgabenformate: Mehrfachwahl, Zuordnung, Kurzantwort, Ergänzung.</p>` : `<p class="note warn">Im ${esc(O.kurse[S.kurs].name)} wird das Hörverstehen im Abitur 2027 nicht geprüft. Die Übungen trainieren trotzdem dein Sprachverständnis.</p>`}
      <p class="note">Audio entsteht über die Sprachausgabe deines Geräts (verschiedene Akzente, sofern installiert). Es ist kein Originalton.</p>
      <div class="modgrid">${Object.entries(LISTEN).map(([id, l]) => `<a class="mod" href="#hv-${id}">${icon("audio")}<strong>${esc(l.title)}</strong><span>${esc(l.accent)} · ${esc(TOPICS[l.topic].de)} · ${stars(l.lvl)}</span></a>`).join("")}</div>`;
  };
  window.viewHV = function (root, id) {
    const l = LISTEN[id];
    root.innerHTML = `${back("m-listen", "Hörverstehen")}<p class="eyebrow">${esc(l.accent)} · ${stars(l.lvl)}</p><h1 lang="es">${esc(l.title)}</h1>
      <ol class="steps">
        <li><h3>Wortschatz vorab</h3><ul class="vl">${l.pre.map((p) => `<li><span lang="es"><strong>${esc(p[0])}</strong></span><span>${esc(p[1])}</span></li>`).join("")}</ul></li>
        <li><h3>Fragen lesen, dann erstes Hören</h3><div class="pl"></div></li>
        <li><h3>Fragen beantworten</h3><div class="qs"></div></li>
        <li><h3>Zweites Hören</h3><p class="muted">Spiele den Text erneut ab und prüfe deine Antworten.</p></li>
        <li><h3>Lösungen, Transkript, Wortschatz</h3><button class="btn sm ghost" id="hv-sol">Transkript zeigen</button><div class="tr" hidden><p lang="es" class="quote">${esc(l.text)}</p><p class="lbl">Wortschatz wiederholen</p><p lang="es">${l.pre.map((p) => esc(p[0])).join(" · ")}</p></div></li>
      </ol>`;
    Player($(".pl", root), [["es", l.text]], { voice: l.voice, transcript: false });
    const qs = $(".qs", root);
    l.q.forEach((q) => { const lab = `[${q.op}] ${q.q}`; if (q.type === "mc") MC(qs, lab, q.o, q.a, "", null, { skill: "listening" }); else Short(qs, lab, q.keys, q.a, null, { skill: "listening" }); });
    $("#hv-sol", root).onclick = function () { $(".tr", root).hidden = false; this.remove(); };
  };

  /* ---------- Podcasts ---------- */
  window.viewPodcast = function (root) {
    root.innerHTML = `${back()}<h1>Podcasts</h1><p class="muted">Kurze Folgen mit Transkript, Vokabeln und Fragen. Ton über die Sprachausgabe deines Geräts.</p>
      ${window.STANDALONE ? `<p class="note">Offline: Die Folgen laufen ohne Internet, sobald die App installiert ist. Transkripte kannst du als Textdatei speichern.</p>` : `<p class="note">Offline: Herunterladen ist in dieser Ansicht nicht möglich. Du kannst jedes Transkript kopieren und offline lesen.</p>`}<div class="pods"></div>`;
    PODCASTS.forEach((p) => {
      const s = h(`<section class="sec pod"><p class="lbl">${esc(p.series)} · ca. ${p.min} min · ${stars(p.lvl)}</p><h2>${esc(p.title)}</h2><div class="pp"></div>
        <details><summary>Vokabeln</summary><ul class="vl">${p.vocab.map((v) => `<li><span lang="es"><strong>${esc(v[0])}</strong></span><span>${esc(v[1])}</span></li>`).join("")}</ul></details>
        <details><summary>Verständnisfragen</summary><div class="pq"></div></details>
        <button class="btn sm ghost cp">Transkript kopieren</button>${window.STANDALONE ? `<button class="btn sm ghost tdl">Transkript speichern</button>` : ""}<span class="small muted cpfb"></span></section>`);
      $(".pods", root).appendChild(s);
      Player($(".pp", s), p.seg, { voice: p.voice });
      p.q.forEach((q) => MC($(".pq", s), q[0], q[1], q[2], "", null, { skill: "listening" }));
      const tdl = $(".tdl", s); if (tdl) tdl.onclick = () => dl("podcast-" + p.id + "-" + p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".txt", p.series + " – " + p.title + "\n\n" + p.seg.map((x) => (x[0] === "de" ? "[DE] " : "[ES] ") + x[1]).join("\n\n") + "\n\nVokabeln:\n" + p.vocab.map((v) => v[0] + " – " + v[1]).join("\n"));
      $(".cp", s).onclick = () => { const txt = p.title + "\n\n" + p.seg.map((x) => x[1]).join("\n"); navigator.clipboard.writeText(txt).then(() => { $(".cpfb", s).textContent = " Kopiert."; }).catch(() => { $(".cpfb", s).textContent = " Kopieren nicht erlaubt – öffne das Transkript und markiere den Text."; }); };
    });
  };

  /* ---------- Erklärclips ---------- */
  window.viewVideo = function (root) {
    root.innerHTML = `${back()}<h1>Erklärclips</h1><p class="note">Diese Clips sind animierte Folien mit Sprachausgabe und Untertiteln (ES | DE), kein gefilmtes Video.</p>
      <div class="modgrid">${CLIPS.map((c) => `<a class="mod" href="#clip-${c.id}">${icon("video")}<strong>${esc(c.title)}</strong><span>${esc(c.cat)} · ${c.slides.length} Folien · ${stars(c.lvl)}</span></a>`).join("")}</div>`;
  };
  window.viewClip = function (root, id) {
    const c = CLIPS.find((x) => x.id === id) || CLIPS[0]; let i = 0, auto = false, sub = "both", tok = 0;
    root.innerHTML = `${back("m-video", "Erklärclips")}<p class="eyebrow">${esc(c.cat)}</p><h1>${esc(c.title)}</h1>
      <div class="stage" aria-live="polite"><div class="slide"></div><div class="subs"></div></div>
      <div class="row"><button class="btn sm ghost" data-a="prev">${icon("back")} Zurück</button><button class="btn sm" data-a="play">${icon("play")} Abspielen</button><button class="btn sm ghost" data-a="next">Weiter →</button>
      <div class="seg sm" role="radiogroup" aria-label="Untertitel">${[["es", "ES"], ["de", "DE"], ["both", "ES | DE"], ["off", "Aus"]].map(([k, l]) => `<button role="radio" aria-checked="${k === sub}" data-sub="${k}">${l}</button>`).join("")}</div></div>
      <section class="sec"><h2>Fragen</h2><div class="cq"></div></section><section class="sec"><h2>Zusammenfassung</h2><p>${esc(c.summary)}</p><h3>Üben</h3><p><a href="#m-grammar">Grammatik</a> · <a href="#m-mediation">Sprachmittlung</a> · <a href="#m-write">Schreiben</a></p></section>`;
    function show() {
      const s = c.slides[i];
      $(".slide", root).innerHTML = `<span class="mono small">${i + 1}/${c.slides.length}</span><h2>${esc(s.h)}</h2><ul>${s.b.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`;
      $(".subs", root).innerHTML = sub === "off" ? "" : `${sub !== "de" ? `<p lang="es">${esc(s.es)}</p>` : ""}${sub !== "es" ? `<p lang="de">${esc(s.de)}</p>` : ""}`;
      $(".slide", root).classList.remove("in"); void $(".slide", root).offsetWidth; $(".slide", root).classList.add("in");
    }
    function narrate() {
      if (!TTS.ok) return; const my = ++tok; const s = c.slides[i]; speechSynthesis.cancel();
      const u1 = new SpeechSynthesisUtterance(s.es); u1.lang = "es-ES"; const v1 = TTS.pick("es-ES"); if (v1) u1.voice = v1;
      const u2 = new SpeechSynthesisUtterance(s.de); u2.lang = "de-DE"; const v2 = TTS.pick("de-DE"); if (v2) u2.voice = v2;
      u2.onend = () => { if (my !== tok || !auto) return; if (i < c.slides.length - 1) { i++; show(); setTimeout(narrate, 600); } else { auto = false; playB.innerHTML = icon("play") + " Nochmal"; } };
      speechSynthesis.speak(u1); speechSynthesis.speak(u2);
    }
    const playB = $('[data-a="play"]', root);
    root.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.a === "prev" && i > 0) { i--; show(); if (auto) narrate(); }
      if (b.dataset.a === "next" && i < c.slides.length - 1) { i++; show(); if (auto) narrate(); }
      if (b.dataset.a === "play") { if (auto) { auto = false; tok++; speechSynthesis.cancel(); playB.innerHTML = icon("play") + " Abspielen"; } else { if (i === c.slides.length - 1 && playB.textContent.includes("Nochmal")) i = 0; auto = true; show(); narrate(); playB.innerHTML = icon("pause") + " Pause"; } }
      if (b.dataset.sub) { sub = b.dataset.sub; $$("[data-sub]", root).forEach((x) => x.setAttribute("aria-checked", x === b)); show(); }
    });
    show();
    c.q.forEach((q) => MC($(".cq", root), q[0], q[1], q[2], q[3], null, { skill: c.cat === "Grammatik" ? "grammar" : c.cat === "Mediation" ? "mediation" : "exam" }));
  };

  /* ---------- Schreiben ---------- */
  const CONN = ["además", "asimismo", "sin embargo", "no obstante", "en cambio", "por un lado", "por otro lado", "ya que", "puesto que", "debido a", "por lo tanto", "por consiguiente", "de ahí que", "aunque", "si bien", "en definitiva", "en resumen", "en primer lugar", "por último", "mientras que", "a diferencia de", "al igual que", "es decir", "por ejemplo", "en conclusión", "para concluir", "por eso", "así que", "dado que"];
  const ERR = [
    [/\bla (problema|tema|sistema|programa|clima|idioma|mapa|drama)\b/gi, (m) => `«${m}» → Diese Wörter auf -ma sind maskulin: «el ${m.split(" ")[1]}».`],
    [/\bla gente (son|están|tienen|piensan|dicen|van)\b/gi, (m) => `«${m}» → «la gente» ist Singular: la gente es/está/tiene…`],
    [/\bme (gusta|encanta|interesa) (los|las) /gi, (m) => `«${m}…» → bei Plural: me gustan/encantan/interesan los…`],
    [/\b(pero sin embargo|pero no obstante)\b/gi, (m) => `«${m}» → doppelter Gegensatz; nur einen Konnektor verwenden.`],
    [/\beventualmente\b/gi, () => `«eventualmente» ≠ eventuell. Für «eventuell» besser: quizás, posiblemente.`],
    [/\bconsecuente\b/gi, () => `«consecuente» heißt «folgerichtig», nicht «konsequent handeln» im Sinn von streng: evtl. «coherente», «firme».`],
    [/\bmuy mucho\b/gi, () => `«muy mucho» → «muchísimo».`],
    [/\bdepende en\b/gi, () => `«depende en» → «depende de».`],
    [/\bpensar sobre\b/gi, () => `«pensar sobre» → meist «pensar en» (an etwas denken) oder «opinar sobre».`],
    [/\b(es|resulta) (importante|necesario|fundamental|imprescindible|esencial) que (\w+) (tiene|es|hay|hacen|tienen|son|puede|pueden|debe|deben)\b/gi, (m) => `«${m}» → nach Wertung + que steht Subjuntivo (tenga, sea, haya, hagan, tengan, sean, pueda, puedan, deba, deban).`],
    [/\bno creo que (\w+ )?(es|son|tiene|tienen|hay|puede|pueden)\b/gi, (m) => `«${m}» → nach «no creo que» steht Subjuntivo.`],
    [/\bcuando (tendré|tendrá|seré|será|podré|terminaré|vendré|iré)\b/gi, (m) => `«${m}» → nach «cuando» mit Zukunftsbezug: Subjuntivo (tenga, sea, pueda, termine…).`],
    [/\bsi (tendría|sería|podría|haría|habría)\b/gi, (m) => `«${m}» → nach «si» nie Condicional: si tuviera/fuera/pudiera/hiciera/hubiera…`]
  ];
  const ACC = { tambien: "también", despues: "después", ademas: "además", segun: "según", politica: "política", economia: "economía", pais: "país", paises: "países", dificil: "difícil", facil: "fácil", musica: "música", ultimo: "último", publico: "público", unico: "único", tambièn: "también", asi: "así", aqui: "aquí", alli: "allí", jovenes: "jóvenes", examenes: "exámenes", arboles: "árboles", numero: "número", critica: "crítica", pagina: "página" };
  const STOP = new Set("el la los las un una unos unas de del a al y o que en es son se no por para con su sus lo le les me te nos más muy pero como este esta estos estas ese esa hay ha han está están ser mi tu yo él ella ellos también porque cuando".split(" "));
  window.checkText = function (txt, minWords, isLetter) {
    const out = []; const low = txt.toLowerCase(); const words = low.match(/[a-záéíóúñü]+/g) || [];
    out.push([words.length >= minWords ? "good" : "warn", `Umfang: ${words.length} Wörter (Ziel: mindestens ${minWords}).`]);
    const con = CONN.filter((c) => low.includes(c));
    out.push([con.length >= 3 ? "good" : "warn", con.length ? `Konnektoren (${con.length}): ${con.join(", ")}.` : "Keine Konnektoren gefunden. Verknüpfe Gedanken mit sin embargo, además, por lo tanto …"]);
    const freq = {}; words.forEach((w) => { if (w.length > 3 && !STOP.has(w)) freq[w] = (freq[w] || 0) + 1; });
    const rep = Object.entries(freq).filter(([, n]) => n >= 4).map(([w, n]) => `${w} (${n}×)`);
    if (rep.length) out.push(["warn", `Wiederholungen: ${rep.join(", ")}. Nutze Synonyme oder Pronomen.`]);
    const sents = txt.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean); const lens = sents.map((s) => s.split(/\s+/).length);
    if (lens.some((l) => l > 40)) out.push(["warn", "Mindestens ein Satz hat über 40 Wörter. Teile ihn für mehr Klarheit."]);
    if (sents.length >= 4 && lens.every((l) => l < 9)) out.push(["warn", "Nur sehr kurze Sätze. Variiere den Satzbau mit Relativsätzen (que, lo que, cuyo) und Nebensätzen."]);
    const subj = (low.match(/\b(que|para que|ojalá|cuando|aunque) \w*(e|a|en|an|era|iera|ieran|eras)\b/g) || []).length;
    if (minWords >= 120 && !/\b(es (importante|necesario|fundamental|lógico)|para que|no creo que|ojalá|espero que|quiero que|pido que|me preocupa que)\b/.test(low)) out.push(["warn", "Kein typischer Subjuntivo-Auslöser gefunden. Werturteile wie «es necesario que…» zeigen Abiturniveau."]);
    ERR.forEach(([re, f]) => { const m = txt.match(re); if (m) m.slice(0, 2).forEach((x) => out.push(["bad", f(x)])); });
    const acc = words.filter((w) => ACC[w]); if (acc.length) out.push(["bad", `Akzent fehlt: ${[...new Set(acc)].map((w) => w + " → " + ACC[w]).join(", ")}.`]);
    const cion = [...new Set(words.filter((w) => /[^s]cion$|sion$/.test(w) && !/ción$|sión$/.test(w)))]; if (cion.length) out.push(["bad", `Endung -ción/-sión braucht Akzent: ${cion.slice(0, 4).join(", ")}.`]);
    const qw = txt.match(/¿\s*(que|como|donde|cuando|quien|quienes|cual|cuales|cuanto|cuantos|por que)\b/gi); if (qw) out.push(["bad", `Fragewörter tragen Akzent: ${qw.slice(0, 3).join(", ")} → qué, cómo, dónde, cuándo, quién, cuál, cuánto, por qué.`]);
    if (/\?/.test(txt) && !/¿/.test(txt)) out.push(["bad", "Fragezeichen: Spanisch verlangt ¿ am Anfang der Frage."]);
    if (/!/.test(txt) && !/¡/.test(txt)) out.push(["bad", "Ausrufezeichen: Spanisch verlangt ¡ am Anfang."]);
    if (isLetter) { const tu = /\b(tú|te|tu|tienes|puedes|sabes)\b/.test(low), ud = /\b(usted|le ruego|atentamente)\b/.test(low); if (tu && ud) out.push(["warn", "Register gemischt: du-Formen und usted/Formeln zugleich. Einheitlich bleiben."]); if (!/^(\s*)(querid|hola|estimad|señor|señora|muy señor)/i.test(txt)) out.push(["warn", "Brief/E-Mail: Anrede fehlt (Hola…, Querida…, Señor director:)."]); }
    return out;
  };
  window.viewWrite = function (root) {
    const st = window._ws = window._ws || { lvl: 1 };
    const w = WRITE.find((x) => x.lvl === st.lvl);
    const isLetter = /carta|correo|mail|Leserbrief/i.test(w.task);
    root.innerHTML = `${back()}<h1>Schreiben</h1>
      <div class="seg" role="radiogroup" aria-label="Stufe">${WRITE.map((x) => `<button role="radio" aria-checked="${x.lvl === st.lvl}" data-l="${x.lvl}"><strong>Stufe ${x.lvl}</strong><small>${esc(x.name)}</small></button>`).join("")}</div>
      <section class="sec"><p class="task">${esc(w.task)}</p><p class="hint">${esc(w.hint)}</p>
      <label for="wr-${w.lvl}" class="lbl">Dein Text</label><textarea id="wr-${w.lvl}" rows="${w.lvl > 3 ? 14 : 6}" lang="es" spellcheck="true">${esc(S.drafts["w" + w.lvl] || "")}</textarea>
      <div class="row"><span class="mono small wc">0 Wörter</span><button class="btn" id="wr-check">Hinweis-Check</button></div>
      <div class="wfb" aria-live="polite"></div></section>
      ${w.lvl >= 5 ? `<section class="sec"><h2>Selbstbewertung nach dem NRW-Kriterienraster</h2><p class="muted small">Das Raster ist offiziell <span class="tag off">Offiziell NRW</span>; deine Punkte sind eine Selbsteinschätzung.</p><div class="raster"></div></section>` : ""}`;
    const ta = $("textarea", root), wc = $(".wc", root);
    const upd = () => { wc.textContent = (ta.value.trim().match(/\S+/g) || []).length + " Wörter"; S.drafts["w" + w.lvl] = ta.value; save(); };
    ta.oninput = upd; upd();
    $$("[data-l]", root).forEach((b) => b.onclick = () => { st.lvl = +b.dataset.l; rerender(); });
    $("#wr-check", root).onclick = () => {
      const res = checkText(ta.value, w.min, isLetter);
      $(".wfb", root).innerHTML = `<div class="panel"><p class="lbl">Automatischer Hinweis-Check · keine NRW-Bewertung</p><ul class="fbl">${res.map(([k, t]) => `<li class="${k}">${esc(t)}</li>`).join("")}</ul><p class="note small">Der Check findet typische Fehler deutschsprachiger Lernender mit festen Regeln. Er erkennt nicht alle Fehler und bewertet keinen Inhalt. Die Bewertung im Abitur erfolgt durch Lehrkräfte nach dem Kriterienraster.</p></div>`;
      const bad = res.filter((r) => r[0] === "bad").length, good = res.filter((r) => r[0] === "good").length;
      recordScore("writing", Math.max(0, Math.min(1, (good + 2 - bad * 0.5) / 4)));
    };
    if (w.lvl >= 5) raster($(".raster", root), "SL", (tot, max) => {});
  };

  /* ---- Kriterienraster (Selbstbewertung) ---- */
  window.raster = function (host, kind, onChange) {
    const rows = [];
    if (kind === "SL") { rows.push(["Inhalt: Teilaufgabe 1", 12], ["Inhalt: Teilaufgabe 2", 17], ["Inhalt: Teilaufgabe 3", 15]); O.bewertungSL.kriterien.forEach(([g, it]) => it.forEach(([t, p]) => rows.push([g.split(" /")[0] + ": " + t, p]))); }
    else { rows.push(["Inhalt: alle relevanten Informationen adressatengerecht", 20], ["Kommunikative Textgestaltung", 10], ["Ausdrucksvermögen / sprachliche Mittel", 10], ["Sprachrichtigkeit", 10]); }
    const max = rows.reduce((a, r) => a + r[1], 0);
    host.innerHTML = `<div class="rgrid">${rows.map((r, i) => `<label class="rrow"><span>${esc(r[0])}</span><input type="range" min="0" max="${r[1]}" value="0" data-i="${i}" aria-label="${esc(r[0])}"><span class="mono small rv">0/${r[1]}</span></label>`).join("")}</div><p class="rsum"><strong class="mono">0 / ${max}</strong> Punkte</p>`;
    const calc = () => { let t = 0; $$("input", host).forEach((x) => { t += +x.value; x.nextElementSibling.textContent = x.value + "/" + x.max; }); $(".rsum strong", host).textContent = `${t} / ${max}`; if (onChange) onChange(t, max); return t; };
    host.oninput = calc; calc();
    return { total: calc, max };
  };

  /* ---------- Sprachmittlung ---------- */
  window.viewMediation = function (root) {
    root.innerHTML = `${back()}<h1>Sprachmittlung</h1>
      <p><span class="tag off">Offiziell NRW</span> Deutscher Sach-/Gebrauchstext (GK f/LK 450–650 Wörter, GK n 400–500), max. 60 Minuten, 50 Punkte (20 Inhalt, 30 Sprache).</p>
      <section class="sec"><h2>Die sechs Fähigkeiten</h2><ul class="rm">${[["Relevantes erkennen", "Was braucht der Empfänger laut Situation?"], ["Unwichtiges weglassen", "Zahlen, Namen, Details nur, wenn sie helfen."], ["Sinn statt Wörter", "Umformulieren, nie Satz für Satz übersetzen."], ["Empfänger beachten", "Anrede, tú/vosotros vs. usted, Vorwissen."], ["Kultur erklären", "Deutsche Begriffe umschreiben: una especie de…"], ["Register halten", "Formell oder informell – durchgehend."]].map((x) => `<li><strong>${x[0]}</strong><span>${x[1]}</span></li>`).join("")}</ul></section>
      <section class="sec"><h2>Stufe 1 · Kurz</h2><div class="micro"></div></section>
      <div class="modgrid">${Object.entries(MEDIATION).map(([id, m]) => `<a class="mod" href="#sm-${id}">${icon("mediate")}<strong>${esc(m.title)}</strong><span>${esc(m.len)} · ca. ${m.words} Wörter · ${stars(m.lvl)}</span></a>`).join("")}</div>`;
    const mi = $(".micro", root); const m = MICRO[new Date().getDate() % MICRO.length];
    mi.innerHTML = `<p class="task">${esc(m[1])}</p><textarea rows="4" lang="es" aria-label="Deine Erklärung"></textarea><button class="btn sm">Hinweis-Check</button><div class="wfb"></div>`;
    $("button", mi).onclick = () => { const r = checkText($("textarea", mi).value, 30, false); $(".wfb", mi).innerHTML = `<ul class="fbl">${r.map(([k, t]) => `<li class="${k}">${esc(t)}</li>`).join("")}</ul>`; recordScore("mediation", Math.min(1, ($("textarea", mi).value.match(/\S+/g) || []).length / 40)); };
  };
  window.viewSM = function (root, id) {
    const m = MEDIATION[id];
    root.innerHTML = `${back("m-mediation", "Sprachmittlung")}<p class="eyebrow">${esc(m.len)} · Übungstext</p><h1>${esc(m.title)}</h1>
      <section class="sec"><p class="lbl">Situación</p><p lang="es">${esc(m.situation)}</p><p class="lbl">Tarea</p><p class="task" lang="es">${esc(m.task)}</p></section>
      <div class="split"><article class="text src" lang="de">${m.source.map((p, i) => i === 0 ? `<h3>${esc(p)}</h3>` : `<p>${esc(p)}</p>`).join("")}</article>
      <div><section class="sec"><h2>Schritt 1 · Was ist relevant?</h2><p class="hint">Hake an, was in deine E-Mail gehört.</p><ul class="checks rel">${m.relevant.concat(m.irrelevant).sort(() => Math.random() - 0.5).map((x) => `<li><label><input type="checkbox" data-r="${m.relevant.includes(x) ? 1 : 0}"> <span lang="es">${esc(x)}</span></label></li>`).join("")}</ul><button class="btn sm ghost" id="sm-rel">Auswahl prüfen</button><div class="fb"></div></section>
      <section class="sec"><h2>Schritt 2 · Schreiben</h2><div class="row smt"></div><textarea rows="12" lang="es" id="sm-${id}-t" aria-label="Deine Sprachmittlung">${esc(S.drafts["sm" + id] || "")}</textarea><div class="row"><span class="mono small wc"></span><button class="btn sm" id="sm-check">Hinweis-Check</button></div><div class="wfb"></div></section></div></div>
      <section class="sec"><h2>Schritt 3 · Musterlösung und Begründung</h2><button class="btn sm ghost" id="sm-model">Musterlösung zeigen</button><div class="model" hidden><pre class="letter" lang="es">${esc(m.model)}</pre><p class="lbl">Warum so?</p><ul>${m.why.map((w) => `<li>${esc(w)}</li>`).join("")}</ul><p class="lbl">Kulturelle Erklärungen</p><ul>${m.cultural.map((w) => `<li>${esc(w)}</li>`).join("")}</ul></div></section>
      <section class="sec"><h2>Schritt 4 · Selbstbewertung (50 Punkte)</h2><div class="rs"></div><button class="btn sm" id="sm-save">Ergebnis speichern</button><span class="small muted smfb"></span></section>`;
    Timer($(".smt", root), 60 * 60, "Max. 60 Minuten");
    const ta = $("textarea", root); const up = () => { $(".wc", root).textContent = (ta.value.match(/\S+/g) || []).length + " Wörter"; S.drafts["sm" + id] = ta.value; save(); }; ta.oninput = up; up();
    $("#sm-rel", root).onclick = () => { let ok = 0, n = 0; $$(".rel input", root).forEach((c) => { n++; const r = c.dataset.r === "1"; if (c.checked === r) ok++; c.parentElement.classList.add(r ? "isrel" : "notrel"); }); $(".fb", $("#sm-rel", root).parentElement).innerHTML = `<p class="${ok === n ? "good" : "bad"}">${ok} von ${n} richtig eingeschätzt. Grün markiert = relevant, durchgestrichen = weglassen.</p>`; record("mediation", ok / n >= 0.8); };
    $("#sm-check", root).onclick = () => { const r = checkText(ta.value, id === "sm1" ? 120 : 200, true); $(".wfb", root).innerHTML = `<p class="lbl">Automatischer Hinweis-Check · keine NRW-Bewertung</p><ul class="fbl">${r.map(([k, t]) => `<li class="${k}">${esc(t)}</li>`).join("")}</ul>`; };
    $("#sm-model", root).onclick = function () { $(".model", root).hidden = false; this.remove(); };
    const rs = raster($(".rs", root), "SM");
    $("#sm-save", root).onclick = () => { const t = rs.total(); recordScore("mediation", t / 50); $(".smfb", root).textContent = ` ${t}/50 gespeichert (Selbsteinschätzung).`; };
  };

  /* ---------- Sprechen ---------- */
  window.viewSpeak = function (root) {
    root.innerHTML = `${back()}<h1>Sprechen</h1><p class="muted">Frage → Vorbereitungszeit → Sprechen → Selbstcheck. Die Sprechkompetenz wird in NRW in der mündlichen Kommunikationsprüfung (anstelle einer Klausur in der Q-Phase) sowie ggf. in der mündlichen Abiturprüfung überprüft – Details regelt deine Schule.</p><div class="sps"></div>`;
    SPEAK.forEach((s) => { const sec = h(`<section class="sec"></section>`); $(".sps", root).appendChild(sec); speakWidget(sec, s); });
  };

  /* ---------- Kultur ---------- */
  window.viewCulture = function (root) {
    const my = topicsForKurs();
    root.innerHTML = `${back()}<h1>Kulturwissen</h1><p class="muted">Hintergrundwissen zu den Schwerpunkten 2027. <span class="tag">Übungsmaterial</span> Prüfe Details im Unterricht nach.</p>
      <div class="cgrid">${CULTURE.map((c) => `<article class="card ${my.includes(c.topic) ? "" : "dim"}"><p class="lbl">${esc(TOPICS[c.topic].es)}${my.includes(c.topic) ? "" : " · nicht Fokus " + esc(O.kurse[S.kurs].short)}</p><h3>${esc(c.h)}</h3><p>${esc(c.t)}</p></article>`).join("")}</div>`;
  };

  /* ---------- Strategie ---------- */
  window.viewStrategy = function (root) {
    const k = O.kurse[S.kurs];
    root.innerHTML = `${back()}<h1>So bearbeitest du die Spanisch-Abiturprüfung</h1>
      <section class="sec"><h2>Zeitplan für deinen Kurs (${esc(k.short)}, ${k.dauer} Min.)</h2><div class="timeline">${k.teile.map((t) => `<div class="tl-${t.key}" style="flex:${t.min}"><strong>${esc(t.key === "SL" ? "Schreiben/Lesen" : t.key === "SM" ? "Sprachmittlung" : "Hören")}</strong><span class="mono">${t.min} min</span></div>`).join("")}</div>
      <p class="hint">Vorschlag für Schreiben/Lesen (${k.teile.find((t) => t.key === "SL").min} Min.): Auswahl 10 · TA 1: ${Math.round((k.teile.find((t) => t.key === "SL").min - 30) * 0.25)} · TA 2: ${Math.round((k.teile.find((t) => t.key === "SL").min - 30) * 0.38)} · TA 3: ${Math.round((k.teile.find((t) => t.key === "SL").min - 30) * 0.37)} · Korrektur 20 Minuten. (Empfehlung des Kurses)</p></section>
      <ol class="strat">${STRATEGY.map((s) => `<li><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></li>`).join("")}</ol>
      <section class="sec"><h2>Timed: Aufgabe in 90 Sekunden zerlegen</h2><p class="task" lang="es">Comenta –a partir del texto y de lo que has aprendido en clase– la afirmación de la autora de que «sin ayuda del Estado, los proyectos locales solo son un parche».</p><div class="row tt"></div>
      <p class="lbl">Tippe an, was die Aufgabe verlangt:</p><ul class="checks dec">${[["Operator comentar: eigene begründete Meinung", 1], ["Bezug auf den Text", 1], ["Bezug auf Unterrichtswissen", 1], ["Zusammenfassung des ganzen Textes", 0], ["Stilmittelanalyse", 0], ["Schlussfolgerung / Fazit", 1]].map((x) => `<li><label><input type="checkbox" data-r="${x[1]}"> ${esc(x[0])}</label></li>`).join("")}</ul><button class="btn sm ghost" id="dec-ok">Prüfen</button><div class="fb"></div></section>`;
    Timer($(".tt", root), 90, "Zerlegen");
    $("#dec-ok", root).onclick = () => { let ok = 0; const c = $$(".dec input", root); c.forEach((x) => { if (x.checked === (x.dataset.r === "1")) ok++; x.parentElement.classList.add(x.dataset.r === "1" ? "isrel" : "notrel"); }); $(".fb", $("#dec-ok", root).parentElement).innerHTML = `<p class="${ok === c.length ? "good" : "bad"}">${ok}/${c.length}. comentar verlangt keine Zusammenfassung und keine Stilanalyse – das sind Teilaufgabe 1 und 2.</p>`; record("exam", ok === c.length); };
  };

  /* ---------- Endspurt ---------- */
  window.viewFinal = function (root) {
    root.innerHTML = `${back()}<h1>Endspurt</h1>
      <section class="sec"><h2>Deine Fehlerliste</h2>${S.wrong.length ? `<ul class="wrongl">${S.wrong.map((w) => `<li><span class="mono small">${w.d}</span> ${esc(w.t)}</li>`).join("")}</ul><button class="btn sm ghost" id="clr">Liste leeren</button>` : `<p class="muted">Keine Fehler gespeichert.</p>`}</section>
      <section class="sec"><h2>Checkliste für die letzte Woche</h2><ul class="checks">${["Hilfsmittel klären: ein- und zweisprachiges Wörterbuch mitnehmen", "Zeitplan für deinen Kurstyp auswendig können (Strategie)", "Alle Operatoren im Blitz einmal fehlerfrei", "Redemittel je Teilaufgabe: 5 sicher abrufbar", "Zieltextformate: Leserbrief, Brief/E-Mail, Artikel, Blog, Tagebucheintrag – Merkmale wiederholen", "Probeklausur 4 unter Zeitbedingungen geschrieben", "Schwerpunkte 2027 deines Kurses mit je 2 Beispielen", "Subjuntivo, Zeitenfolge, Si-Sätze: je eine Übungsseite"].map((c, i) => `<li><label><input type="checkbox" data-i="${i}" ${(S.final || {})[i] ? "checked" : ""}> ${esc(c)}</label></li>`).join("")}</ul></section>
      <section class="sec"><h2>Alle Grammatikregeln kompakt</h2><dl class="rules">${GRAMMAR.map((g) => `<dt>${esc(g.t)}</dt><dd>${esc(g.rule)}</dd>`).join("")}</dl></section>`;
    const c = $("#clr", root); if (c) c.onclick = () => { S.wrong = []; save(); rerender(); };
    $$(".checks input", root).forEach((x) => x.onchange = () => { S.final = S.final || {}; S.final[x.dataset.i] = x.checked; save(); });
  };
})();
