/* ===== Kern: Zustand, Helfer, Sprachausgabe, Übungsbausteine ===== */
(function () {
  const KEY = "abiGEO2027";
  const defaults = { kurs: "GK", planLen: 90, session: 45, done: {}, skills: {}, gram: {}, xp: 0, days: [], diag: null, mocks: {}, cards: {}, notes: {}, drafts: {}, badges: [], wrong: [] };
  let S;
  let raw = null; try { raw = localStorage.getItem(KEY); } catch (e) {}
  if (!raw && typeof window.__NATIVE_STATE === "string") raw = window.__NATIVE_STATE; // iOS-App: Sicherung aus dem App-Speicher
  try { S = Object.assign({}, defaults, JSON.parse(raw || "{}")); } catch (e) { S = Object.assign({}, defaults); }
  const nativePersist = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.persist;
  function save() { const j = JSON.stringify(S); try { localStorage.setItem(KEY, j); } catch (e) {} if (nativePersist) { try { nativePersist.postMessage(j); } catch (e) {} } }
  window.S = S; window.save = save;

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (t) => String(t == null ? "" : t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const norm = (t) => String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ ]/g, " ").trim();
  function h(html) { const d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstElementChild; }
  function stars(n) { return '<span class="stars" aria-label="Schwierigkeit ' + n + ' von 4" title="' + ["", "Leicht", "Mittel", "Abitur", "Fortgeschritten"][n] + '">' + "★".repeat(n) + '<span class="off">' + "★".repeat(4 - n) + "</span></span>"; }
  function lvlName(n) { return ["", "Leicht", "Mittel", "Abitur", "Fortgeschritten"][n]; }
  const today = () => new Date().toISOString().slice(0, 10);
  Object.assign(window, { $, $$, esc, norm, h, stars, lvlName, today });

  /* ---- Fortschritt ---- */
  window.SKILLS = { sach: "Sachkompetenz", methoden: "Methodenkompetenz", urteil: "Urteilskompetenz", handlung: "Handlungskompetenz", begriffe: "Fachbegriffe", karten: "Karten", diagramme: "Diagramme", material: "Materialanalyse", operatoren: "Operatoren", afb1: "AFB I", afb2: "AFB II", afb3: "AFB III" };
  window.record = function (skill, correct, gramId, label) { recordTags(Array.isArray(skill) ? skill : [skill], correct, label); };
  window.recordTags = function (tags, correct, label) {
    (tags || []).forEach((k) => { const r = S.skills[k] || [0, 0]; r[0] += correct ? 1 : 0; r[1] += 1; S.skills[k] = r; });
    if (!correct && label) { S.wrong.unshift({ d: today(), t: label }); S.wrong = S.wrong.slice(0, 40); }
    addXP(correct ? 5 : 1); markActive(); save();
    if (window.onProgress) window.onProgress();
  };
  window.recordScore = function (skill, pct) { // pct 0..1, zählt wie 10 Items
    if (Array.isArray(skill)) { skill.forEach((k) => recordScore(k, pct)); return; }
    const r = S.skills[skill] || [0, 0]; r[0] += Math.round(pct * 10); r[1] += 10; S.skills[skill] = r; addXP(Math.round(pct * 30)); markActive(); save();
  };
  function addXP(n) { S.xp = (S.xp || 0) + n; checkBadges(); }
  window.addXP = addXP;
  function markActive() { const t = today(); if (!S.days.includes(t)) S.days.push(t); }
  window.markActive = markActive;
  window.skillPct = function (k) { const r = S.skills[k]; return r && r[1] ? Math.round((r[0] / r[1]) * 100) : null; };
  window.streak = function () {
    const set = new Set(S.days); let n = 0; const d = new Date();
    if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
    while (set.has(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  };
  window.BADGES = [
    ["first", "Erster Schritt", "Erste Übung gelöst", () => S.xp > 0],
    ["streak3", "Drei am Stück", "3 Tage Lernserie", () => streak() >= 3],
    ["streak7", "Wochenserie", "7 Tage Lernserie", () => streak() >= 7],
    ["xp500", "500 XP", "500 Erfahrungspunkte", () => S.xp >= 500],
    ["diag", "Standort bestimmt", "Einstufungstest abgeschlossen", () => !!S.diag],
    ["mock", "Unter Prüfungsbedingungen", "Eine Probeklausur ausgewertet", () => Object.keys(S.mocks).length > 0],
    ["days10", "Zehn Lerntage", "10 Plantage vollständig", () => Object.values(S.done).filter((d) => Object.keys(d).length >= 12).length >= 10],
    ["cases", "Fallbeispiel-Profi", "10 Fallbeispiele geöffnet", () => Object.keys(S.casesSeen || {}).length >= 10]
  ];
  function checkBadges() { BADGES.forEach((b) => { if (!S.badges.includes(b[0]) && b[3]()) S.badges.push(b[0]); }); }
  window.checkBadges = checkBadges;

  /* ---- Sprachausgabe (Web Speech API) ---- */
  const TTS = { ok: "speechSynthesis" in window, voices: [] };
  function loadVoices() { try { TTS.voices = speechSynthesis.getVoices(); } catch (e) {} }
  if (TTS.ok) { loadVoices(); try { speechSynthesis.onvoiceschanged = loadVoices; } catch (e) {} }
  TTS.pick = function (lang) {
    const v = TTS.voices; if (!v.length) return null;
    return v.find((x) => x.lang.replace("_", "-") === lang) || v.find((x) => x.lang.startsWith(lang.slice(0, 2))) || null;
  };
  TTS.hasSpanish = () => TTS.ok && TTS.voices.some((x) => x.lang.startsWith("es"));
  window.TTS = TTS;

  function chunks(segs) { // [[lang, text]] -> [{lang, text, dur}]
    const out = [];
    segs.forEach(([lang, text]) => {
      const parts = text.match(/[^.!?…]+[.!?…]+[»"]?\s*|[^.!?…]+$/g) || [text];
      parts.forEach((p) => { p = p.trim(); if (p) out.push({ lang, text: p, dur: Math.max(1.2, p.split(/\s+/).length / 2.6) }); });
    });
    return out;
  }
  let active = null;
  window.stopAudio = function () { if (active) active.pause(); };

  /* Player: Podcast/Hörtext. opts: {voice, transcript:bool, speeds, onEnd, compact} */
  window.Player = function (host, segs, opts) {
    opts = opts || {};
    const c = chunks(segs.map(([l, t]) => [l === "es" ? (opts.voice || "es-ES") : l === "de" ? (opts.voice || "de-DE") : l, t]));
    const total = c.reduce((a, x) => a + x.dur, 0);
    let idx = 0, playing = false, rate = 1, token = 0;
    const el = h(`<div class="player" role="group" aria-label="Audio-Player">
      <div class="p-row">
        <button class="p-btn" data-a="back" aria-label="10 Sekunden zurück">−10</button>
        <button class="p-btn p-main" data-a="play" aria-label="Abspielen">${icon("play")}</button>
        <button class="p-btn" data-a="fwd" aria-label="10 Sekunden vor">+10</button>
        <div class="p-speed" role="radiogroup" aria-label="Geschwindigkeit">${[0.75, 1, 1.25, 1.5].map((s) => `<button role="radio" aria-checked="${s === 1}" data-s="${s}">${s}×</button>`).join("")}</div>
      </div>
      <div class="p-bar" role="slider" tabindex="0" aria-label="Fortschritt" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="p-fill"></div></div>
      <div class="p-time mono"><span class="p-cur">0:00</span><span>~${fmt(total)}</span></div>
      ${TTS.ok ? "" : '<p class="note warn">Dieses Gerät bietet keine Sprachausgabe. Nutze das Transkript.</p>'}
      <p class="note p-novoice" hidden>Keine deutsche Stimme gefunden – es wird die Standardstimme genutzt.</p>
      ${opts.transcript === false ? "" : `<details class="p-tr"><summary>Transkript</summary><div class="p-lines">${c.map((x, i) => `<span data-i="${i}" lang="${x.lang.slice(0, 2)}">${esc(x.text)} </span>`).join("")}</div></details>`}
    </div>`);
    host.appendChild(el);
    const fill = $(".p-fill", el), cur = $(".p-cur", el), playBtn = $('[data-a="play"]', el), bar = $(".p-bar", el);
    function elapsed() { let t = 0; for (let i = 0; i < idx; i++) t += c[i].dur; return t; }
    function ui() {
      const pct = total ? (elapsed() / total) * 100 : 0; fill.style.width = pct + "%"; bar.setAttribute("aria-valuenow", Math.round(pct));
      cur.textContent = fmt(elapsed() / rate); playBtn.innerHTML = icon(playing ? "pause" : "play"); playBtn.setAttribute("aria-label", playing ? "Pause" : "Abspielen");
      $$(".p-lines span", el).forEach((s) => s.classList.toggle("now", +s.dataset.i === idx && playing));
    }
    function speakNext() {
      if (!playing) return;
      if (idx >= c.length) { playing = false; idx = 0; ui(); if (opts.onEnd) opts.onEnd(); return; }
      const my = ++token; const x = c[idx];
      const u = new SpeechSynthesisUtterance(x.text); u.lang = x.lang; u.rate = rate;
      const v = TTS.pick(x.lang); if (v) u.voice = v; else $(".p-novoice", el).hidden = false;
      u.onend = () => { if (my !== token) return; idx++; ui(); speakNext(); };
      u.onerror = () => { if (my !== token) return; playing = false; ui(); };
      speechSynthesis.speak(u); ui();
    }
    const api = {
      play() { if (!TTS.ok) return; if (active && active !== api) active.pause(); active = api; playing = true; speechSynthesis.cancel(); speakNext(); },
      pause() { playing = false; token++; try { speechSynthesis.cancel(); } catch (e) {} ui(); },
      seekSec(d) { let t = elapsed() + d * rate; t = Math.max(0, Math.min(total - 0.1, t)); let acc = 0, i = 0; while (i < c.length - 1 && acc + c[i].dur <= t) { acc += c[i].dur; i++; } idx = i; if (playing) { token++; speechSynthesis.cancel(); speakNext(); } else ui(); },
      restart() { idx = 0; api.play(); },
      el
    };
    el.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.a === "play") playing ? api.pause() : api.play();
      if (b.dataset.a === "back") api.seekSec(-10);
      if (b.dataset.a === "fwd") api.seekSec(10);
      if (b.dataset.s) { rate = +b.dataset.s; $$(".p-speed button", el).forEach((x) => x.setAttribute("aria-checked", x === b)); if (playing) { token++; speechSynthesis.cancel(); speakNext(); } }
    });
    bar.addEventListener("click", (e) => { const r = bar.getBoundingClientRect(); const t = ((e.clientX - r.left) / r.width) * total; api.seekSec((t - elapsed()) / rate); });
    bar.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") api.seekSec(10); if (e.key === "ArrowLeft") api.seekSec(-10); });
    ui();
    return api;
  };
  function fmt(s) { s = Math.round(s); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }
  window.fmt = fmt;
  window.say = function (text, lang) { if (!TTS.ok) return; speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = lang || "de-DE"; const v = TTS.pick(u.lang); if (v) u.voice = v; speechSynthesis.speak(u); };

  /* ---- Icons (inline SVG) ---- */
  const IC = {
    play: '<path d="M8 5v14l11-7z"/>', pause: '<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>',
    today: '<path d="M4 5h16v15H4zM4 9h16M9 3v4M15 3v4" fill="none" stroke="currentColor" stroke-width="2"/>',
    plan: '<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" fill="none" stroke="currentColor" stroke-width="2"/>',
    mods: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="none" stroke="currentColor" stroke-width="2"/>',
    exam: '<path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13l2 2 4-4" fill="none" stroke="currentColor" stroke-width="2"/>',
    info: '<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 10v7M12 7v.01" fill="none" stroke="currentColor" stroke-width="2"/>',
    audio: '<path d="M4 10v4h4l5 4V6L8 10zM16 9a4 4 0 0 1 0 6" fill="none" stroke="currentColor" stroke-width="2"/>',
    video: '<path d="M4 6h11v12H4zM15 10l5-3v10l-5-3" fill="none" stroke="currentColor" stroke-width="2"/>',
    read: '<path d="M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z" fill="none" stroke="currentColor" stroke-width="2"/>',
    vocab: '<path d="M5 4h11l3 3v13H5zM9 10h6M9 14h4" fill="none" stroke="currentColor" stroke-width="2"/>',
    pen: '<path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3" fill="none" stroke="currentColor" stroke-width="2"/>',
    mic: '<path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM6 11a6 6 0 0 0 12 0M12 17v4" fill="none" stroke="currentColor" stroke-width="2"/>',
    task: '<path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h3" fill="none" stroke="currentColor" stroke-width="2"/>',
    check: '<path d="M5 12l4 4 10-10" fill="none" stroke="currentColor" stroke-width="2.4"/>',
    back: '<path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" fill="none" stroke="currentColor" stroke-width="2"/>',
    grammar: '<path d="M4 18L9 6h1l5 12M6 14h7M16 10h4M18 8v4" fill="none" stroke="currentColor" stroke-width="2"/>',
    globe: '<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    mediate: '<path d="M4 7h10M10 3l4 4-4 4M20 17H10M14 13l-4 4 4 4" fill="none" stroke="currentColor" stroke-width="2"/>',
    target: '<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 11v2" fill="none" stroke="currentColor" stroke-width="2"/>',
    clock: '<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2"/>',
    flag: '<path d="M5 21V4h11l-2 4 2 4H5" fill="none" stroke="currentColor" stroke-width="2"/>'
  };
  window.icon = function (n) { return `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${IC[n] || ""}</svg>`; };

  /* ---- Übung: Multiple Choice ---- */
  window.MC = function (host, q, opts, correct, why, onDone, meta) {
    meta = meta || {};
    const id = "mc" + Math.random().toString(36).slice(2, 8);
    const el = h(`<div class="ex" role="group" aria-labelledby="${id}">
      <p class="ex-q" id="${id}">${esc(q)}</p>
      <div class="opts">${opts.map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join("")}</div>
      <div class="fb" aria-live="polite"></div></div>`);
    host.appendChild(el);
    el.addEventListener("click", (e) => {
      const b = e.target.closest(".opt"); if (!b || el.dataset.done) return;
      el.dataset.done = 1; const i = +b.dataset.i, ok = i === correct;
      $$(".opt", el).forEach((x) => { x.disabled = true; if (+x.dataset.i === correct) x.classList.add("right"); });
      if (!ok) b.classList.add("wrong");
      $(".fb", el).innerHTML = `<p class="${ok ? "good" : "bad"}"><strong>${ok ? "Richtig." : "Nicht ganz."}</strong> ${ok ? "" : "Deine Wahl: «" + esc(opts[i]) + "». "}${esc(why || "")}</p>`;
      if (meta.skill) record(meta.skill, ok, meta.gram, ok ? null : q);
      if (onDone) onDone(ok);
    });
    return el;
  };

  /* ---- Übung: Kurzantwort mit Schlüsselwörtern ---- */
  window.Short = function (host, q, keys, answer, onDone, meta) {
    meta = meta || {};
    const id = "sa" + Math.random().toString(36).slice(2, 8);
    const el = h(`<div class="ex"><label class="ex-q" for="${id}">${esc(q)}</label>
      <div class="row"><input id="${id}" class="inp" autocomplete="off" autocapitalize="off" spellcheck="false"><button class="btn sm">Prüfen</button></div>
      <div class="fb" aria-live="polite"></div></div>`);
    host.appendChild(el);
    const inp = $("input", el);
    function check() {
      if (el.dataset.done || !inp.value.trim()) return; el.dataset.done = 1;
      const v = norm(inp.value); const ok = keys.some((k) => v.includes(norm(k)));
      inp.disabled = true; $("button", el).disabled = true;
      $(".fb", el).innerHTML = `<p class="${ok ? "good" : "bad"}"><strong>${ok ? "Richtig." : "Noch nicht."}</strong> Erwartet: «${esc(answer)}». ${ok ? "" : "Prüfe Rechenweg und Einheit."}</p>`;
      if (meta.skill) record(meta.skill, ok, null, ok ? null : q);
      if (onDone) onDone(ok);
    }
    $("button", el).onclick = check; inp.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
    return el;
  };

  /* ---- Übung: Zuordnen (antippen statt ziehen) ---- */
  window.Match = function (host, q, pairs, onDone, meta) {
    meta = meta || {};
    const right = pairs.map((p, i) => ({ t: p[1], i })).sort(() => Math.random() - 0.5);
    const el = h(`<div class="ex"><p class="ex-q">${esc(q)}</p><p class="hint">Tippe links ein Element an, dann rechts die passende Lösung.</p>
      <div class="match"><div class="m-col">${pairs.map((p, i) => `<button class="m-l" data-i="${i}">${esc(p[0])}</button>`).join("")}</div>
      <div class="m-col">${right.map((r) => `<button class="m-r" data-i="${r.i}">${esc(r.t)}</button>`).join("")}</div></div>
      <div class="fb" aria-live="polite"></div></div>`);
    host.appendChild(el);
    let sel = null, okN = 0, tries = 0;
    el.addEventListener("click", (e) => {
      const l = e.target.closest(".m-l"), r = e.target.closest(".m-r");
      if (l && !l.disabled) { $$(".m-l", el).forEach((x) => x.classList.remove("sel")); l.classList.add("sel"); l.setAttribute("aria-pressed", "true"); sel = l; }
      if (r && sel && !r.disabled) {
        tries++;
        if (r.dataset.i === sel.dataset.i) { r.disabled = sel.disabled = true; r.classList.add("right"); sel.classList.add("right"); sel.classList.remove("sel"); okN++; sel = null;
          if (okN === pairs.length) { const ok = tries === pairs.length; $(".fb", el).innerHTML = `<p class="${ok ? "good" : "bad"}"><strong>Fertig.</strong> ${pairs.length} Paare mit ${tries} Versuchen.</p>`; if (meta.skill) record(meta.skill, ok); if (onDone) onDone(ok); } }
        else { r.classList.add("shake"); setTimeout(() => r.classList.remove("shake"), 400); $(".fb", el).innerHTML = `<p class="bad">«${esc(r.textContent)}» passt nicht zu «${esc(sel.textContent)}». Achte auf den Kerninhalt.</p>`; }
      }
    });
    return el;
  };

  /* ---- Übung: Satzbau (Wörter antippen) ---- */
  window.Order = function (host, sentence, de, onDone, meta) {
    meta = meta || {};
    const words = sentence.split(" "); const shuffled = words.map((w, i) => ({ w, i })).sort(() => Math.random() - 0.5);
    const el = h(`<div class="ex"><p class="ex-q">Bilde den Satz: <em>${esc(de)}</em></p>
      <div class="built" aria-live="polite"></div><div class="chips">${shuffled.map((x) => `<button class="chip" data-w="${esc(x.w)}">${esc(x.w)}</button>`).join("")}</div>
      <div class="row"><button class="btn sm ghost" data-a="reset">Zurücksetzen</button><button class="btn sm" data-a="check">Prüfen</button></div><div class="fb"></div></div>`);
    host.appendChild(el);
    const built = $(".built", el); let seq = [];
    el.addEventListener("click", (e) => {
      const c = e.target.closest(".chip"), a = e.target.closest("[data-a]");
      if (c && !c.disabled) { c.disabled = true; seq.push(c.dataset.w); built.textContent = seq.join(" "); }
      if (a && a.dataset.a === "reset") { seq = []; built.textContent = ""; $$(".chip", el).forEach((x) => (x.disabled = false)); $(".fb", el).innerHTML = ""; }
      if (a && a.dataset.a === "check" && seq.length) {
        const ok = seq.join(" ") === sentence;
        $(".fb", el).innerHTML = `<p class="${ok ? "good" : "bad"}"><strong>${ok ? "Richtig." : "Noch nicht."}</strong> ${ok ? "" : "Lösung: «" + esc(sentence) + "». Achte auf die Stellung von Pronomen und Verb."}</p>`;
        if (meta.skill && !el.dataset.done) { el.dataset.done = 1; record(meta.skill, ok, meta.gram, ok ? null : "Satzbau: " + sentence); }
        if (onDone) onDone(ok);
      }
    });
  };

  /* ---- Nur in der installierten Version: Dateien speichern, Aufnahme ---- */
  window.isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  window.dl = function (name, data, type) {
    const blob = data instanceof Blob ? data : new Blob([data], { type: type || "text/plain;charset=utf-8" });
    const bridge = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.saveFile;
    if (bridge) { // native iOS-App: Datei an das Teilen-Menü übergeben
      const r = new FileReader(); r.onload = () => bridge.postMessage({ name, mime: blob.type || "application/octet-stream", data: String(r.result).split(",")[1] }); r.readAsDataURL(blob); return;
    }
    if (window.isIOS && navigator.canShare) { // Safari / Home-Bildschirm-App: Teilen-Menü (Dateien sichern)
      try { const f = new File([blob], name, { type: blob.type }); if (navigator.canShare({ files: [f] })) { navigator.share({ files: [f], title: name }).catch(() => {}); return; } } catch (e) {}
    }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  };
  window.canRecord = () => !!(window.STANDALONE && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  window.Recorder = function (host) {
    const el = h(`<div class="rec"><button class="btn sm rec-b">${icon("mic")} Aufnahme starten</button><span class="small muted rec-s"></span><div class="rec-out"></div></div>`);
    host.appendChild(el); let mr = null, parts = [], t0 = 0, iv = null;
    const b = $(".rec-b", el), st = $(".rec-s", el), out = $(".rec-out", el);
    b.onclick = async () => {
      if (mr && mr.state === "recording") { mr.stop(); return; }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        parts = []; mr = new MediaRecorder(stream); mr.ondataavailable = (e) => parts.push(e.data);
        mr.onstop = () => { stream.getTracks().forEach((t) => t.stop()); clearInterval(iv); const blob = new Blob(parts, { type: mr.mimeType || "audio/webm" }); const url = URL.createObjectURL(blob); const ext = (mr.mimeType || "").includes("mp4") ? "m4a" : "webm";
          out.innerHTML = `<audio controls src="${url}"></audio><button class="btn sm ghost rec-dl">Aufnahme speichern</button>`; $(".rec-dl", out).onclick = () => dl("sprechen-" + today() + "." + ext, blob);
          b.innerHTML = icon("mic") + " Neue Aufnahme"; b.classList.remove("recording"); st.textContent = "Hör dich an und nutze dann den Selbstcheck."; };
        mr.start(); t0 = Date.now(); b.innerHTML = icon("pause") + " Aufnahme stoppen"; b.classList.add("recording");
        iv = setInterval(() => { st.textContent = "Aufnahme läuft · " + fmt((Date.now() - t0) / 1000); }, 500);
      } catch (e) { st.textContent = "Kein Zugriff auf das Mikrofon. Erlaube den Zugriff in den Browser-Einstellungen."; }
    };
  };

  /* ---- Timer ---- */
  window.Timer = function (host, sec, label, onEnd) {
    const el = h(`<div class="timer" role="timer" aria-live="off"><span class="t-l">${esc(label)}</span><span class="t-v mono">${fmt(sec)}</span><button class="btn sm ghost">Start</button></div>`);
    host.appendChild(el); let left = sec, iv = null;
    const btn = $("button", el), v = $(".t-v", el);
    function tick() { left--; v.textContent = fmt(Math.max(0, left)); if (left <= 60) el.classList.add("low"); if (left <= 0) { clearInterval(iv); iv = null; btn.textContent = "Neu"; el.classList.add("end"); if (onEnd) onEnd(); } }
    btn.onclick = () => { if (iv) { clearInterval(iv); iv = null; btn.textContent = "Weiter"; } else { if (left <= 0) { left = sec; el.classList.remove("end", "low"); } iv = setInterval(tick, 1000); btn.textContent = "Pause"; } };
    return { el, start() { if (!iv) btn.click(); }, stop() { if (iv) { clearInterval(iv); iv = null; } } };
  };
})();
