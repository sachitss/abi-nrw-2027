/* ===== Mathe: Plan-Generator, Heute, Plan, Tag, gemeinsame Bausteine ===== */
(function () {
  const O = window.OFFICIAL;
  window.K = () => O.kurse[S.kurs];
  window.SG = { A: "Analysis", G: "Geometrie & LA", S: "Stochastik" };
  window.myTopics = () => TOPICS.filter((t) => S.kurs === "LK" || !t.lk);
  window.TP = (id) => TOPICS.find((t) => t.id === id);
  window.TA = (id) => TEILA.find((a) => a.id === id);
  window.TB = (id) => TEILB.find((b) => b.id === id);
  window.lkTag = (x) => (x.lk ? ' <span class="tag off">LK</span>' : "");
  window.daysToExam = function () { const a = new Date(); a.setHours(0, 0, 0, 0); const d = O.dateISO; return Math.max(0, Math.round((new Date(d[0], d[1] - 1, d[2]) - a) / 86400000)); };
  window.npFrom = (pct) => (O.noten.find((r) => pct >= r[0]) || [0, 0])[1];

  /* ---------- Plan ---------- */
  function topicOrder() {
    const by = { A: [], G: [], S: [] }; myTopics().forEach((t) => by[t.sg].push(t.id));
    // Muster A, A, G, S – Analysis hat im Abitur das größte Gewicht
    const res = []; const idx = { A: 0, G: 0, S: 0 }; const pat = ["A", "A", "G", "S"]; let j = 0;
    while (res.length < by.A.length + by.G.length + by.S.length) { const sg = pat[j % 4]; j++; if (idx[sg] < by[sg].length) res.push(by[sg][idx[sg]++]); }
    return res;
  }
  window.genPlan = function (len, kurs) {
    const saved = S.kurs; if (kurs) S.kurs = kurs;
    const order = topicOrder(); S.kurs = saved;
    const special = {};
    special[1] = { kind: "diag", title: "Einstufungstest", sub: "Standort bestimmen" };
    special[Math.round(len * 0.35)] = { kind: "mock", mock: "m1" };
    special[Math.round(len * 0.55)] = { kind: "mock", mock: "m2" };
    special[Math.round(len * 0.78)] = { kind: "mock", mock: "m3" };
    special[len - 2] = { kind: "mock", mock: "m4" };
    special[len - 1] = { kind: "strategy", title: "Prüfungsstrategie", sub: "Zeitplan, Operatoren, Teil A/B" };
    special[len] = { kind: "final", title: "Endspurt", sub: "Letzte Wiederholung vor dem 05.05." };
    const days = []; let t = 0;
    for (let n = 1; n <= len; n++) {
      const phase = n <= len / 3 ? "Grundlagen" : n <= (2 * len) / 3 ? "Vertiefung" : "Prüfungstraining";
      let d = special[n];
      if (!d && n % 7 === 0) d = { kind: "review", title: "Wochenwiederholung", sub: "Gemischte Aufgaben aus allen Sachgebieten" };
      if (d && d.kind === "mock") { const m = MOCKS.find((x) => x.id === d.mock); days.push({ n, phase, kind: "mock", mock: d.mock, title: m.name.split(" – ")[0], sub: m.name.split(" – ")[1] }); continue; }
      if (d) { days.push(Object.assign({ n, phase }, d)); continue; }
      const tid = order[t % order.length]; const pass = Math.floor(t / order.length); t++;
      const tp = TP(tid);
      days.push({ n, phase, kind: "day", topic: tid, pass, title: tp.t, sub: SG[tp.sg] + (pass ? " · Durchgang " + (pass + 1) : "") });
    }
    return days;
  };
  window.planDays = () => genPlan(S.planLen);
  const COMP = [["warm", "Warm-up", "spark"], ["wissen", "Wissen", "read"], ["beispiel", "Beispiel", "pen"], ["ueben", "Üben", "check"], ["labor", "Graph-Labor", "globe"], ["teilA", "Teil A", "target"], ["teilB", "Teil B", "exam"], ["review", "Wiederholung", "clock"]];
  window.COMP = COMP;
  window.dayPct = (n) => Math.round((Object.keys(S.done[n] || {}).length / COMP.length) * 100);
  window.nextDay = () => { const d = planDays(); return d.find((x) => dayPct(x.n) < 100) || d[d.length - 1]; };

  /* ---------- Blitz-Generator (hilfsmittelfrei, exakt berechnet) ---------- */
  function rnd(seed) { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
  window.blitzItem = function (seed) {
    const r = rnd(seed * 7919 + 13), ri = (a, b) => a + Math.floor(r() * (b - a + 1));
    const kind = ri(0, 7);
    if (kind === 0) { const a = ri(1, 5), n = ri(2, 4), b = ri(-5, 5), x0 = ri(-2, 2); return { q: `$f(x)=${a}x^${n}${b < 0 ? "" : "+"}${b}x$. Berechne $f'(${x0})$.`, ans: a * n * x0 ** (n - 1) + b, why: `$f'(x)=${a * n}x^{${n - 1}}${b < 0 ? "" : "+"}${b}$.` }; }
    if (kind === 1) { const a = ri(1, 4) * 2, b = ri(-3, 3), c = ri(1, 3); return { q: `Berechne $\\int_0^{${c}}(${a}x${b < 0 ? "" : "+"}${b})\\,dx$.`, ans: (a * c * c) / 2 + b * c, why: `Stammfunktion $${a / 2}x^2${b < 0 ? "" : "+"}${b}x$.` }; }
    if (kind === 2) { const u = [ri(-3, 3), ri(-3, 3), ri(-3, 3)], v = [ri(-3, 3), ri(-3, 3), ri(-3, 3)]; return { q: `Berechne $\\begin{pmatrix}${u.join("\\\\")}\\end{pmatrix}\\cdot\\begin{pmatrix}${v.join("\\\\")}\\end{pmatrix}$.`, ans: u[0] * v[0] + u[1] * v[1] + u[2] * v[2], why: "Komponentenweise multiplizieren und addieren." }; }
    if (kind === 3) { const n = ri(4, 7), k = ri(1, n - 1); let c = 1; for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i; return { q: `Berechne $\\binom{${n}}{${k}}$.`, ans: Math.round(c), why: `$\\binom{${n}}{${k}}=\\frac{${n}!}{${k}!\\,${n - k}!}$.` }; }
    if (kind === 4) { const T = [[2, 3, 6, 7], [1, 2, 2, 3], [2, 6, 9, 11], [1, 4, 8, 9], [4, 4, 7, 9], [3, 4, 12, 13]][ri(0, 5)]; const s = [ri(0, 1) ? 1 : -1, ri(0, 1) ? 1 : -1]; return { q: `Länge von $\\vec v=\\begin{pmatrix}${T[0] * s[0]}\\\\${T[1]}\\\\${T[2] * s[1]}\\end{pmatrix}$?`, ans: T[3], why: `$\\sqrt{${T[0] ** 2}+${T[1] ** 2}+${T[2] ** 2}}=${T[3]}$.` }; }
    if (kind === 5) { const V = [["\\sin 0", 0], ["\\sin\\tfrac\\pi2", 1], ["\\cos 0", 1], ["\\cos\\pi", -1], ["\\sin\\pi", 0], ["\\cos\\tfrac\\pi2", 0], ["\\sin\\tfrac{3\\pi}2", -1]][ri(0, 6)]; return { q: `$${V[0]}=$`, ans: V[1], why: "Merkwerte am Einheitskreis." }; }
    if (kind === 6) { const k = ri(-3, 4), a = ri(2, 9); return ri(0, 1) ? { q: `$\\ln\\!\\left(e^{${k}}\\right)=$`, ans: k, why: "$\\ln$ und $e$ heben sich auf." } : { q: `$e^{\\ln ${a}}=$`, ans: a, why: "$e^{\\ln a}=a$." }; }
    const p = [0.5, 0.2, 0.1, 0.25][ri(0, 3)], n = ri(2, 3); return { q: `Trefferwahrscheinlichkeit $p=${String(p).replace(".", "{,}")}$, $${n}$ unabhängige Versuche. $P(\\text{kein Treffer})=$`, ans: Math.pow(1 - p, n), why: `$(1-p)^{${n}}$.` };
  };

  /* ---------- Aufgabe lösen mit Selbstbewertung (Teil A und B) ---------- */
  window.Solve = function (host, it, opts) {
    opts = opts || {};
    const isB = !!it.intro; const parts = it.parts; const key = (isB ? "b-" : "a-") + it.id + (opts.ctx || "");
    const el = h(`<div class="solve">
      ${opts.noHead ? "" : `<p class="eyebrow">${isB ? "Prüfungsteil B" : "Prüfungsteil A · hilfsmittelfrei"} · ${SG[it.sg]}${it.lk ? " · LK" : ""}</p><h3>${md(it.t)}</h3>`}
      ${(isB ? it.intro : it.stem) ? `<p class="stem">${md(isB ? it.intro : it.stem)}</p>` : ""}
      <ol class="parts">${parts.map((p, i) => `<li data-i="${i}"><div class="pq"><span class="plab">${isB ? p.lab + ")" : String.fromCharCode(97 + i) + ")"}</span> ${md(p.q)} <span class="be mono">${p.be} BE</span></div>
        ${p.ans != null ? `<div class="row nin"><input class="inp" inputmode="decimal" placeholder="Zahlenergebnis (optional)" aria-label="Zahlenergebnis"><button class="btn sm ghost" data-a="num">Prüfen</button><span class="small nfb"></span></div>` : ""}
        <button class="btn sm ghost" data-a="sol">Lösung zeigen</button>
        <div class="sol" hidden><p>${md(p.loes)}</p><label class="rrow"><span>Deine Punkte</span><input type="range" min="0" max="${p.be}" step="1" value="0" data-be="${i}"><span class="mono small rv">0/${p.be}</span></label></div></li>`).join("")}</ol>
      <p class="rsum small"><strong class="mono">0 / ${parts.reduce((a, p) => a + p.be, 0)}</strong> BE (Selbstbewertung)</p></div>`);
    host.appendChild(el);
    const max = parts.reduce((a, p) => a + p.be, 0);
    function total() { let t = 0; $$("[data-be]", el).forEach((x) => { t += +x.value; x.nextElementSibling.textContent = x.value + "/" + x.max; }); $(".rsum strong", el).textContent = `${t} / ${max}`; if (opts.onScore) opts.onScore(t, max); return t; }
    el.addEventListener("input", (e) => { if (e.target.matches("[data-be]")) { total(); S.topic["score-" + key] = total() / max; save(); } });
    el.addEventListener("click", (e) => {
      const b = e.target.closest("[data-a]"); if (!b) return; const li = b.closest("li"); const p = parts[+li.dataset.i];
      if (b.dataset.a === "sol") { $(".sol", li).hidden = false; b.remove(); }
      if (b.dataset.a === "num") { const v = parseNum($("input.inp", li).value); if (!isFinite(v)) return; const ok = numOk(v, p.ans, p.tol); $(".nfb", li).innerHTML = ok ? `<span class="good">stimmt</span>` : `<span class="bad">weicht ab – vergleiche mit der Lösung</span>`; record(isB ? "modell" : "hmf", ok, null, ok ? null : (isB ? "Teil B " : "Teil A ") + it.id + " " + (isB ? p.lab : "")); record(it.sg, ok); }
    });
    return { total, max, el };
  };

  /* ---------- HEUTE ---------- */
  window.viewHeute = function (root) {
    const nd = nextDay(), days = planDays();
    const doneDays = days.filter((d) => dayPct(d.n) === 100).length;
    const planP = Math.round((doneDays / days.length) * 100);
    const sk = Object.keys(SKILLS).map((k) => [k, skillPct(k)]);
    const tried = sk.filter((x) => x[1] != null);
    const skillAvg = tried.length ? Math.round(tried.reduce((a, x) => a + x[1], 0) / Object.keys(SKILLS).length) : 0;
    const overall = Math.round(planP * 0.5 + skillAvg * 0.5);
    const weak = tried.slice().sort((a, b) => a[1] - b[1]);
    const mocks = Object.entries(S.mocks); const best = mocks.length ? Math.max(...mocks.map(([, m]) => m.np)) : null;
    const weekStart = new Date(); weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
    const weekDays = S.days.filter((d) => d >= weekStart.toISOString().slice(0, 10)).length;
    root.innerHTML = `
    <section class="hero"><div class="hero-l">
      <p class="eyebrow">Mathematik-Abitur · ${esc(K().name)}</p>
      <h1><span class="big mono">${daysToExam()}</span> Tage bis zur Klausur</h1>
      <p class="muted">${esc(O.examDateLabel)} · ${K().dauer} Minuten (Teil A ${K().teilA.min} · Teil B ${K().teilB.min})</p></div>
      <div class="ring" style="--p:${overall}" role="img" aria-label="Vorbereitung ${overall} Prozent"><span class="mono">${overall}%</span><small>Vorbereitung</small></div></section>
    ${S.diag ? "" : `<a class="callout" href="#m-diag"><strong>Starte mit dem Einstufungstest.</strong> 10 Aufgaben aus allen Sachgebieten, danach empfiehlt dir der Kurs die passende Plan-Länge.</a>`}
    <section class="grid2">
      <div class="panel"><div class="ph"><h2>Dein Lernplan heute</h2><span class="tag">${S.planLen}-Tage-Plan</span></div>
        <a class="daycard" href="#tag-${nd.n}"><span class="dc-n mono">Tag ${nd.n}</span><span class="dc-t">${md(nd.title)}</span><span class="dc-s muted">${esc(nd.sub || "")}</span><span class="bar"><span style="width:${dayPct(nd.n)}%"></span></span><span class="dc-p mono">${dayPct(nd.n)}%</span></a>
        <ul class="recs">
          ${weak[0] ? `<li><span class="sev bad"></span>Schwächster Bereich: <strong>${SKILLS[weak[0][0]]}</strong> (${weak[0][1]} %) → <a href="#${recoFor(weak[0][0])}">jetzt üben</a></li>` : ""}
          ${S.wrong.length ? `<li><span class="sev warn"></span>${S.wrong.length} Fehler gesammelt → <a href="#m-final">Fehlerliste</a></li>` : ""}
          <li><span class="sev"></span>Täglich 3 Minuten: <a href="#m-blitz">Kopfrechen-Blitz für Teil A</a></li>
        </ul></div>
      <div class="panel"><div class="ph"><h2>Kompetenzen</h2><span class="muted small">Trefferquote</span></div>
        <ul class="skills">${sk.map(([k, p]) => `<li><span>${SKILLS[k]}</span><span class="bar"><span style="width:${p || 0}%" class="${p == null ? "" : p < 50 ? "b-bad" : p < 70 ? "b-warn" : "b-good"}"></span></span><span class="mono small">${p == null ? "–" : p + "%"}</span></li>`).join("")}</ul></div>
    </section>
    <section class="stats">
      <div><span class="mono big2">${doneDays}</span><span>Tage abgeschlossen</span></div>
      <div><span class="mono big2">${streak()}</span><span>Tage Serie</span></div>
      <div><span class="mono big2">${S.xp}</span><span>XP</span></div>
      <div><span class="mono big2">${weekDays}/5</span><span>Wochenziel</span></div>
      <div><span class="mono big2">${best == null ? "–" : best}</span><span>Beste Probeklausur (NP)</span></div>
    </section>
    <section class="panel"><div class="ph"><h2>Abzeichen</h2><span class="muted small">${S.badges.length}/${BADGES.length}</span></div>
      <ul class="badges">${BADGES.map((b) => `<li class="${S.badges.includes(b[0]) ? "on" : ""}"><strong>${b[1]}</strong><span>${b[2]}</span></li>`).join("")}</ul></section>
    ${window.STANDALONE ? `<section class="panel"><div class="ph"><h2>Deine Daten</h2><span class="muted small">Nur auf diesem Gerät gespeichert</span></div><p class="small">Sichere deinen Fortschritt regelmäßig, z. B. vor einem Gerätewechsel.</p><div class="row"><button class="btn sm" id="bk-exp">Fortschritt sichern</button><label class="btn sm ghost" for="bk-imp">Sicherung laden</label><input type="file" id="bk-imp" accept="application/json,.json" hidden>${/^https?:/.test(location.protocol) ? `<a class="btn sm ghost" href="install.html" target="_blank" rel="noopener">App weitergeben (QR-Code)</a>` : ""}</div>${window.isIOS ? `<p class="small muted">iPhone/iPad: «Fortschritt sichern» öffnet das Teilen-Menü – wähle «In Dateien sichern».</p>` : ""}<p class="small bk-fb"></p></section>` : ""}
    ${mocks.length ? `<section class="panel"><div class="ph"><h2>Probeklausuren</h2></div><div class="tblwrap"><table class="tbl"><thead><tr><th>Klausur</th><th>Datum</th><th>Punkte</th><th>Notenpunkte</th></tr></thead><tbody>${mocks.map(([id, m]) => `<tr><td>${esc(MOCKS.find((x) => x.id === id).name)}</td><td>${m.date}</td><td class="mono">${m.total}/${m.max}</td><td class="mono">${m.np}</td></tr>`).join("")}</tbody></table></div><p class="note">Selbstbewertung mit prozentualem Notenschlüssel – keine amtliche Note.</p></section>` : ""}`;
    const e = $("#bk-exp", root), i = $("#bk-imp", root);
    if (e) { e.onclick = () => { dl("abi-mathe-fortschritt-" + today() + ".json", JSON.stringify(S, null, 1), "application/json"); $(".bk-fb", root).textContent = "Sicherung gespeichert."; };
      i.onchange = () => { const f = i.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { const d = JSON.parse(r.result); if (!d || typeof d !== "object" || !("kurs" in d)) throw 0; Object.keys(S).forEach((k) => delete S[k]); Object.assign(S, d); save(); rerender(); } catch (x) { $(".bk-fb", root).textContent = "Diese Datei ist keine gültige Sicherung von Abi Mathe."; } }; r.readAsText(f); }; }
  };
  window.recoFor = (k) => ({ A: "m-themen", G: "m-themen", S: "m-themen", hmf: "m-teila", modell: "m-teilb", op: "m-operatoren", exam: "pruefung" }[k] || "module");

  /* ---------- PLAN ---------- */
  window.viewPlan = function (root) {
    const days = planDays(), dte = daysToExam();
    const latest = (len) => { const d = new Date(O.examDate); d.setDate(d.getDate() - len - 1); return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }); };
    root.innerHTML = `<div class="ph"><h1>Lernplan</h1></div>
    <div class="panel"><p class="lbl">Vorbereitungszeitraum</p>
      <div class="seg" role="radiogroup" aria-label="Plan-Länge">${[30, 60, 90, 120].map((l) => `<button role="radio" aria-checked="${S.planLen === l}" data-len="${l}"><strong>${l} Tage</strong><small>${{ 30: "Intensiv", 60: "Ausgewogen", 90: "Umfassend", 120: "Langfristig" }[l]}</small><small class="mono">Start spätestens ${latest(l)}</small></button>`).join("")}</div>
      <p class="muted small">Noch ${dte} Tage bis zur Klausur. Die Themen folgen den inhaltlichen Schwerpunkten 2027 für den ${esc(K().name)} (${myTopics().length} Lektionen, Analysis mit doppeltem Gewicht).</p></div>
    <div class="legend"><span><i class="lg p1"></i>Grundlagen</span><span><i class="lg p2"></i>Vertiefung</span><span><i class="lg p3"></i>Prüfungstraining</span><span><i class="lg mk"></i>Probeklausur</span></div>
    <ol class="daylist">${days.map((d) => `<li><a href="#tag-${d.n}" class="dl ${d.kind} ph-${d.phase === "Grundlagen" ? 1 : d.phase === "Vertiefung" ? 2 : 3}"><span class="mono dn">${String(d.n).padStart(2, "0")}</span><span class="dt">${md(d.title)}<small>${esc(d.sub || "")}</small></span><span class="dp mono">${dayPct(d.n)}%</span></a></li>`).join("")}</ol>`;
    $$("[data-len]", root).forEach((b) => (b.onclick = () => { S.planLen = +b.dataset.len; save(); rerender(); }));
  };

  /* ---------- TAG ---------- */
  let dayStart = 0;
  window.viewTag = function (root, n) {
    const days = planDays(); const d = days.find((x) => x.n === n) || days[0]; n = d.n;
    S.done[n] = S.done[n] || {}; dayStart = Date.now(); const doneMap = S.done[n];
    root.innerHTML = `<a class="back" href="#plan">${icon("back")} Lernplan</a>
    <header class="dayhead"><p class="eyebrow">Tag ${n} von ${S.planLen} · ${esc(d.phase)}</p><h1>${md(d.title)}</h1><p class="muted">${esc(d.sub || "")}</p>
      <div class="mcard" aria-label="Lernkarte">${COMP.map(([k, l, ic]) => `<a href="#sec-${k}" class="mc ${doneMap[k] ? "on" : ""}">${icon(ic)}<span>${l}</span></a>`).join("")}</div>
      <div class="qbar" aria-label="Fortschritt ${dayPct(n)} Prozent">${[0, 25, 50, 75, 100].map((q) => `<span class="${dayPct(n) >= q ? "on" : ""}">${q}%</span>`).join("")}</div></header>
    <div class="secs"></div>
    <nav class="daynav">${n > 1 ? `<a class="btn ghost" href="#tag-${n - 1}">${icon("back")} Tag ${n - 1}</a>` : "<span></span>"}${n < days.length ? `<a class="btn" href="#tag-${n + 1}">Tag ${n + 1} →</a>` : ""}</nav>`;
    const secs = $(".secs", root);
    function sec(k, title, mins, fill) {
      const s = h(`<section class="sec" id="sec-${k}"><div class="sh"><h2>${title}</h2><span class="muted small mono">${mins}</span></div><div class="sb"></div>
        <button class="btn sm ${doneMap[k] ? "done" : "ghost"} mark" data-k="${k}">${doneMap[k] ? icon("check") + " Erledigt" : "Als erledigt markieren"}</button></section>`);
      secs.appendChild(s); fill($(".sb", s)); return s;
    }
    const blitz = (b, cnt) => { for (let i = 0; i < cnt; i++) { const it = blitzItem(n * 31 + i * 7 + S.planLen); NumQ(b, it.q, it.ans, 0.001, it.why, null, { skill: "hmf" }); } };
    if (d.kind === "day") {
      const tp = TP(d.topic);
      sec("warm", "Warm-up", "5 min", (b) => { b.innerHTML = `<p>${md(PLANBITS.warmups[n % PLANBITS.warmups.length])}</p><p class="lbl">Blitz (ohne Rechner)</p>`; blitz(b, 2); });
      sec("wissen", "Wissen", "15 min", (b) => { b.innerHTML = `<p class="goal">${md(tp.goal)}</p>${tp.wissen.map((w) => `<p>${md(w)}</p>`).join("")}<p class="lbl">Formeln</p><div class="formeln">${tp.formeln.map((f) => tex(f, true)).join("")}</div><a class="btn sm ghost" href="#t-${tp.id}">Ganze Lektion öffnen</a>`; });
      sec("beispiel", "Beispiel Schritt für Schritt", "10 min", (b) => stepExample(b, tp));
      sec("ueben", "Üben", "15–20 min", (b) => { const u = tp.ueben; const off = (d.pass * 2) % u.length; const pick = u.slice(off).concat(u.slice(0, off)).slice(0, 3); pick.forEach((x) => exercise(b, x, tp.sg)); });
      sec("labor", "Graph-Labor", "10 min", (b) => { if (tp.lab) { b.innerHTML = `<p>Verändere die Parameter und beobachte, was passiert. Formuliere danach einen Merksatz in einem Satz.</p>`; Lab(b, tp.lab); } else { const L = ["tangent", "integral", "trig", "exp", "binom"][n % 5]; b.innerHTML = `<p>Heute ohne eigenes Labor zum Thema – Wiederholung eines anderen Grundbegriffs:</p>`; Lab(b, L); } });
      sec("teilA", "Prüfungsteil A (hilfsmittelfrei)", "10–15 min", (b) => { const pool = TEILA.filter((a) => a.sg === tp.sg && (S.kurs === "LK" || !a.lk)); const own = tp.teilA.filter((i2) => S.kurs === "LK" || !TA(i2).lk); const id = own.length ? own[d.pass % own.length] : pool[n % pool.length].id; b.innerHTML = `<p class="hint">Ohne Rechner und Formelsammlung. Erst lösen, dann Lösung aufdecken und Punkte vergeben.</p>`; Solve(b, TA(id)); });
      sec("teilB", "Prüfungsteil B (mit Hilfsmitteln)", "20–30 min", (b) => teilBPart(b, tp.sg, n));
      sec("review", "Wiederholung", "5–10 min", (b) => { const past = days.filter((x) => x.kind === "day" && x.n < n && x.topic !== d.topic).map((x) => x.topic); b.innerHTML = past.length ? `<p>Aufgaben aus früheren Lektionen (verteiltes Wiederholen):</p>` : `<p>Noch keine früheren Lektionen – heute zwei Blitz-Aufgaben.</p>`; if (!past.length) return blitz(b, 2); [past[(n * 3) % past.length], past[(n * 7 + 1) % past.length]].forEach((pid, i) => { const t2 = TP(pid); exercise(b, t2.ueben[(n + i) % t2.ueben.length], t2.sg); }); });
    } else if (d.kind === "diag") {
      sec("warm", "Warm-up", "5 min", (b) => (b.innerHTML = `<p>Schreibe auf, welche drei Themen du am sichersten und welche drei am unsichersten findest.</p>`));
      sec("wissen", "Einstufungstest", "20 min", (b) => (b.innerHTML = `<p>10 Aufgaben aus Analysis, Geometrie und Stochastik plus Selbsteinschätzung.</p><a class="btn" href="#m-diag">Test starten</a>`));
      COMP.slice(2).forEach(([k, l]) => sec(k, l, "", (b) => (b.innerHTML = `<p class="muted">Heute Teil des Einstufungstests.</p>`)));
    } else if (d.kind === "mock") {
      sec("teilB", "Probeklausur", `${K().dauer} min`, (b) => (b.innerHTML = `<p>Heute schreibst du <strong>${esc(MOCKS.find((m) => m.id === d.mock).name)}</strong> unter Zeitbedingungen: Teil A ${K().teilA.min} Minuten ohne Hilfsmittel, dann Teil B ${K().teilB.min} Minuten.</p><a class="btn" href="#mock-${d.mock}">Probeklausur öffnen</a>`));
      COMP.filter((c) => c[0] !== "teilB").forEach(([k, l]) => sec(k, l, "", (b) => (b.innerHTML = `<p class="muted">Heute entfällt dieser Baustein zugunsten der Probeklausur.</p>`)));
    } else {
      sec("warm", "Warm-up", "5 min", (b) => { b.innerHTML = `<p>${md(PLANBITS.warmups[n % PLANBITS.warmups.length])}</p>`; blitz(b, 3); });
      sec("wissen", d.kind === "strategy" ? "Prüfungsstrategie" : "Formeln wiederholen", "15 min", (b) => (b.innerHTML = d.kind === "strategy" ? `<a class="btn sm" href="#m-strategy">So bearbeitest du die Klausur</a> <a class="btn sm ghost" href="#m-operatoren">Operatoren</a>` : `<p>Gehe den Formelüberblick durch und decke die Formeln ab.</p><a class="btn sm" href="#m-formeln">Formelüberblick</a>`));
      sec("beispiel", "Fehlerliste", "10 min", (b) => (b.innerHTML = S.wrong.length ? `<ul class="wrongl">${S.wrong.slice(0, 10).map((w) => `<li>${md(w.t)}</li>`).join("")}</ul>` : `<p class="muted">Noch keine Fehler gesammelt.</p>`));
      sec("ueben", "Gemischte Übungen", "20 min", (b) => { const ts = myTopics(); [ts[(n * 5) % ts.length], ts[(n * 11 + 3) % ts.length], ts[(n * 13 + 7) % ts.length]].forEach((t2, i) => exercise(b, t2.ueben[(n + i) % t2.ueben.length], t2.sg)); });
      sec("labor", "Graph-Labor", "10 min", (b) => Lab(b, ["binom", "normal", "trig", "schar", "integral", "tangent"].filter((x) => S.kurs === "LK" || (x !== "normal" && x !== "schar"))[n % 4]));
      sec("teilA", d.kind === "final" ? "Endspurt" : "Teil A gemischt", "15 min", (b) => { if (d.kind === "final") { b.innerHTML = `<a class="btn sm" href="#m-final">Endspurt öffnen</a>`; return; } const pool = TEILA.filter((a) => S.kurs === "LK" || !a.lk); Solve(b, pool[(n * 3) % pool.length]); });
      sec("teilB", "Teil B", "30 min", (b) => teilBPart(b, ["A", "G", "S"][n % 3], n));
      sec("review", "Wochenrückblick", "5 min", (b) => { const t2 = Object.keys(SKILLS).map((k) => [k, skillPct(k)]).filter((x) => x[1] != null).sort((a, c) => a[1] - c[1]); b.innerHTML = t2.length ? `<p>Schwächster Bereich: <strong>${SKILLS[t2[0][0]]}</strong> (${t2[0][1]} %). <a href="#${recoFor(t2[0][0])}">Gezielt üben</a></p>` : `<p class="muted">Löse Übungen, damit hier eine Empfehlung erscheint.</p>`; });
    }
    root.addEventListener("click", (e) => {
      const m = e.target.closest(".mark");
      if (m) { const k = m.dataset.k; if (doneMap[k]) delete doneMap[k]; else { doneMap[k] = 1; addXP(10); markActive(); } save(); checkBadges(); const y = window.scrollY; rerender(); window.scrollTo(0, y); }
    });
  };
  window.leaveTag = function (n) { if (!dayStart || !n) return; S.time = S.time || {}; S.time[n] = (S.time[n] || 0) + Math.round((Date.now() - dayStart) / 1000); dayStart = 0; save(); };

  window.exercise = function (b, x, sg) {
    if (x.type === "mc") { const ord = x.o.map((_, i) => i).sort(() => Math.random() - 0.5); MC(b, x.q, ord.map((i) => x.o[i]), ord.indexOf(x.a), x.why, null, { skill: sg }); }
    else NumQ(b, x.q, x.ans, x.tol, x.why, null, { skill: sg });
  };
  window.stepExample = function (b, tp) {
    const bs = tp.beispiel; let k = 0;
    b.innerHTML = `<p class="task">${md(bs.aufgabe)}</p><ol class="steps2"></ol><div class="row"><button class="btn sm" data-a="next">Nächster Schritt</button><button class="btn sm ghost" data-a="all">Alle zeigen</button></div><p class="erg" hidden><strong>Ergebnis:</strong> ${md(bs.ergebnis)}</p>`;
    const ol = $(".steps2", b);
    const show = () => { if (k < bs.schritte.length) { ol.appendChild(h(`<li>${md(bs.schritte[k])}</li>`)); k++; } if (k >= bs.schritte.length) { $(".erg", b).hidden = false; $$("[data-a]", b).forEach((x) => x.remove()); } };
    $('[data-a="next"]', b).onclick = show; $('[data-a="all"]', b).onclick = () => { while (k < bs.schritte.length) show(); };
  };
  window.teilBPart = function (b, sg, n) {
    const pool = TEILB.filter((t) => t.sg === sg && (S.kurs === "LK" || !t.lk)); const task = pool[n % pool.length];
    const pi = n % task.parts.length; const part = task.parts[pi];
    b.innerHTML = `<p class="hint">Mit Rechner (WTR oder CAS) und Formelsammlung. Heute ein Aufgabenteil aus einer Abituraufgabe.</p><p class="lbl">Aus: ${md(task.t)}</p>`;
    Solve(b, { id: task.id, sg: task.sg, lk: task.lk, t: task.t, intro: task.intro, parts: [part] }, { noHead: true, ctx: "-" + part.lab });
    b.appendChild(h(`<p><a href="#b-${task.id}">Ganze Aufgabe ${task.id} bearbeiten</a></p>`));
  };
})();
