/* ===== Prüfung, Grundlagen/Bericht, Router ===== */
(function () {
  const O = window.OFF;
  const NP = [[95, 15], [90, 14], [85, 13], [80, 12], [75, 11], [70, 10], [65, 9], [60, 8], [55, 7], [50, 6], [45, 5], [40, 4], [33, 3], [27, 2], [20, 1], [0, 0]];
  const np = (p) => (NP.find((r) => p >= r[0]) || [0, 0])[1];

  window.viewPruefung = function (root) {
    root.innerHTML = `<div class="ph"><h1>Prüfung</h1><span class="tag off">Offiziell NRW · Abitur 2027</span></div>
      <section class="panel"><div class="kgrid">${["GK", "LK"].map((k) => `<div class="card ${S.kurs === k ? "cur" : ""}"><strong>${k === "LK" ? "Leistungskurs" : "Grundkurs"}</strong><p class="mono">${O.dauer[k]} Minuten inkl. Auswahlzeit</p><p class="small">${esc(O.dates[k])}</p></div>`).join("")}</div>
        <ul class="small"><li>${esc(O.auswahl)}</li><li>Hilfsmittel: ${O.hilfsmittel.map(esc).join("; ")}.</li>${O.konstruktion.map((k) => `<li>${esc(k)}</li>`).join("")}</ul></section>
      <div class="ph"><h2>Probeklausuren (${kursName()}-Fassung)</h2><span class="tag">Übungsmaterial</span></div>
      <div class="modgrid">${MOCKS.map((m) => { const r = S.mocks[m.id + S.kurs]; return `<a class="mod" href="#mock-${m.id}">${icon("exam")}<strong>${esc(m.name)}</strong><span>${m.sets.length} Aufgabe${m.sets.length > 1 ? "n zur Wahl" : ""} · ${stars(m.lvl)}</span><span>${r ? `zuletzt ${r.np} NP (${r.total}/100)` : "noch nicht geschrieben"}</span></a>`; }).join("")}</div>
      <p class="note">Eigene Aufgaben im Stil der Konstruktionsvorgaben – keine Originalprüfungen (Prüfungsaufgaben unterliegen Rechtebeschränkungen). Die Punkteverteilung (Inhalt 80, Darstellung 20) ist ein Übungsraster dieses Kurses; die NRW-Dokumente legen keine Punkte fest.</p>`;
  };

  function matHTML(m, i) {
    if (m.k === "text") return `<figure class="mat"><figcaption><strong>${esc(m.cap)}</strong></figcaption><p class="quote">${esc(m.body)}</p></figure>`;
    if (m.k === "table") return `<figure class="mat"><figcaption><strong>${esc(m.cap)}</strong></figcaption><div class="tblwrap"><table class="tbl"><thead><tr>${m.head.map((x) => `<th>${esc(x)}</th>`).join("")}</tr></thead><tbody>${m.rows.map((r) => `<tr>${r.map((c) => `<td class="${typeof c === "number" ? "mono" : ""}">${typeof c === "number" ? c.toLocaleString("de-DE") : esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></figure>`;
    return `<figure class="mat" data-vis="${m.vis}"><figcaption><strong>${esc(m.cap)}</strong></figcaption><div class="mv"></div></figure>`;
  }

  window.viewMock = function (root, id) {
    const m = MOCKS.find((x) => x.id === id) || MOCKS[0]; const K = S.kurs; const ver = K === "LK" ? "lk" : "gk";
    root.innerHTML = `<a class="back" href="#pruefung">${icon("back")} Prüfung</a><p class="eyebrow">${kursName()} · ${stars(m.lvl)}</p><h1>${esc(m.name)}</h1>
      <div class="row"><div class="timer big-t"><span class="t-l">Gesamtzeit ${O.dauer[K]} min inkl. Auswahl</span><span class="t-v mono" id="mt">${O.dauer[K]}:00</span><button class="btn sm ghost" id="mts">Start</button></div></div>
      ${m.guided ? `<p class="callout">Geführte Klausur: Unter jeder Teilaufgabe siehst du den Erwartungshorizont als Hilfe.</p>` : ""}
      <section class="sec" id="wahl"><h2>${m.sets.length > 1 ? "Aufgabe auswählen" : "Aufgabe"}</h2><div class="kgrid">${m.sets.map((sid) => { const s = TASKSETS[sid]; return `<button class="card pick" data-s="${sid}"><strong>${esc(s.t)}</strong><span class="small">${esc(s.raum)} · ${esc(TP(s.topic).short)}</span><ul class="small">${s[ver].map((t) => `<li>${t[0]}. ${esc(t[2])} (AFB ${t[1]})</li>`).join("")}</ul></button>`; }).join("")}</div></section>
      <div id="work"></div>`;
    let left = O.dauer[K] * 60, iv = null;
    $("#mts", root).onclick = function () { if (iv) { clearInterval(iv); iv = null; this.textContent = "Weiter"; return; } this.textContent = "Pause"; iv = setInterval(() => { left--; $("#mt", root).textContent = fmt(Math.max(0, left)); if (left <= 0) { clearInterval(iv); $("#mt", root).textContent = "Abgabe"; } }, 1000); };
    window._stopClock = () => clearInterval(iv);
    const pick = (sid) => {
      $$(".pick", root).forEach((b) => b.classList.toggle("cur", b.dataset.s === sid));
      const s = TASKSETS[sid]; const tasks = s[ver];
      const w = $("#work", root);
      w.innerHTML = `<section class="sec"><h2>${esc(s.t)}</h2><p class="small muted">Raumbeispiel: ${esc(s.raum)} · Materialien M1–M${s.mats.length} · Beispieldaten und Übungstexte</p><div class="split"><div class="mats">${s.mats.map(matHTML).join("")}</div>
        <div>${tasks.map((t, i) => `<div class="tk"><p class="task"><strong>${t[0]}.</strong> ${esc(t[3])} <span class="tag">AFB ${t[1]}</span> <span class="tag">${t[4]} P.</span></p><textarea rows="${i === 0 ? 5 : 9}" id="mk-${id}-${sid}-${i}" aria-label="Antwort Teilaufgabe ${t[0]}">${esc(S.drafts[`mk-${id}-${sid}-${i}`] || "")}</textarea>
          <details ${m.guided ? "open" : ""}><summary>Erwartungshorizont</summary><ul class="checks">${t[5].map((e, k) => `<li><label><input type="checkbox" data-t="${i}"> ${esc(e)}</label></li>`).join("")}</ul></details></div>`).join("")}
        <section class="sec"><h2>Selbstbewertung (Übungsraster)</h2><div class="rgrid">${tasks.map((t, i) => `<label class="rrow"><span>Teilaufgabe ${t[0]} (AFB ${t[1]})</span><input type="range" min="0" max="${t[4]}" value="0" data-r="${i}"><span class="mono small rv">0/${t[4]}</span></label>`).join("")}<label class="rrow"><span>Darstellungsleistung (Struktur, Fachsprache, Belege, Sprache)</span><input type="range" min="0" max="20" value="0" data-r="d"><span class="mono small rv">0/20</span></label></div><p class="rsum"></p><p class="small muted">Tipp: Hake im Erwartungshorizont ab, was du geschrieben hast – der Regler wird vorgeschlagen.</p><button class="btn" id="mks">Auswerten und speichern</button><span class="small" id="mkf"></span></section></div></div></section>`;
      $$(".mat[data-vis]", w).forEach((f) => renderVis(f.dataset.vis, $(".mv", f)));
      $$("textarea", w).forEach((t) => t.oninput = () => { S.drafts[t.id] = t.value; save(); });
      const calc = () => { let tot = 0; $$(".rgrid input", w).forEach((x) => { x.nextElementSibling.textContent = x.value + "/" + x.max; tot += +x.value; }); $(".rsum", w).innerHTML = `<strong class="mono">${tot}/100</strong> Punkte → <strong>${np(tot)} Notenpunkte</strong> <span class="small muted">(übliche Umrechnung 100-Punkte-Skala, Übungsraster)</span>`; return tot; };
      $(".rgrid", w).oninput = calc; calc();
      $$(".checks input", w).forEach((c) => c.onchange = () => { const i = +c.dataset.t; const all = $$(`.checks input[data-t="${i}"]`, w); const r = $(`.rgrid input[data-r="${i}"]`, w); r.value = Math.round((all.filter((x) => x.checked).length / all.length) * +r.max); calc(); });
      $("#mks", w).onclick = () => { const tot = calc(); S.mocks[id + K] = { date: today(), total: tot, max: 100, np: np(tot), set: sid }; tasks.forEach((t, i) => { const r = $(`.rgrid input[data-r="${i}"]`, w); const p = +r.value / +r.max; recordScore([["afb1", "afb2", "afb3"][t[1].includes("III") ? 2 : t[1].includes("II") ? 1 : 0], "material"], p); }); recordScore(["methoden", "urteil"], tot / 100); checkBadges(); save(); $("#mkf", w).textContent = ` Gespeichert: ${np(tot)} Notenpunkte.`; };
      w.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    $$(".pick", root).forEach((b) => b.onclick = () => pick(b.dataset.s));
    if (m.sets.length === 1) pick(m.sets[0]);
  };

  /* ---------- Grundlagen & Bericht ---------- */
  window.RESP_DIMS = window.RESP_DIMS || null;
  window.viewGrundlagen = function (root) {
    const src = (i) => `<a href="${O.sources[i].url}" target="_blank" rel="noopener">${esc(O.sources[i].name.split(" (")[0])}</a>`;
    const reqs = [["Abiturjahrgang", "2027 (für 2028/2029 gelten eigene Vorgaben, hier nicht verwendet)", 0], ["Kernlehrplan", "Kernlehrplan Geographie Sek. II (2013/14); alle Kompetenzerwartungen bis Ende Q-Phase obligatorisch", 6], ["Abiturvorgaben", "Vorgaben 2027 Geographie, Stand 14.08.2024", 0], ["Prüfungsdauer", "GK 240 min, LK 300 min, jeweils einschließlich Auswahlzeit", 0], ["Aufgabenstruktur", "Drei Prüfungsaufgaben zur Wahl, keine Vorauswahl durch die Schule; mehrere Teilaufgaben, materialgestützt", 0], ["Hilfsmittel", O.hilfsmittel.join("; "), 0], ["Operatoren", OPS.length + " Operatoren (beurteilen/bewerten und einordnen/zuordnen je gemeinsam definiert) mit AFB-Zuordnung", 1], ["Anforderungsbereiche", "Alle drei AFB vertreten, AFB II Schwerpunkt", 2], ["Kompetenzbereiche", "Sach-, Methoden-, Urteils-, Handlungskompetenz", 6], ["Fokussierungen", "Inhaltsfelder 3–7, für GK und LK identisch (s. unten)", 0], ["Termine", "LK Di 13.04.2027, GK Mo 19.04.2027, 9:00 Uhr", 4], ["Darstellungsleistung", "Absenkung insgesamt bis zu zwei Notenpunkte; keine doppelte Abwertung", 3]];
    const plans = [30, 60, 90, 120].map((l) => { const d = genPlan(l); const c = (k) => d.filter((x) => x.kind === k).length; const topics = new Set(d.filter((x) => x.kind === "topic").map((x) => x.topic)).size; return [l, c("topic"), topics, c("method"), c("review"), c("mock"), c("diag") + c("strategy") + c("final")]; });
    const status = [
      ["Offizielle Anforderungen", "Verified", "Aus Vorgaben 2027, Operatorenübersicht, Konstruktionsvorgaben, Darstellungsleistung, Terminerlass recherchiert."],
      ["30-Tage-Programm", "Issues", "Generiert; nicht alle 16 Fokussierungen passen in 30 Tage (siehe Tabelle B)."],
      ["60-Tage-Programm", "Complete", "Alle 16 Fokussierungen, 6 Methodentage, 4 Probeklausuren."],
      ["90-Tage-Programm", "Complete", "Alle Themen, Vertiefungsdurchgang, Wiederholungszyklen."],
      ["120-Tage-Programm", "Complete", "Zwei Themendurchgänge, alle Methodentage."],
      ["GK", "Verified", "240 min, eigene Aufgabenfassung je Probeklausur."],
      ["LK", "Verified", "300 min, anspruchsvollere Teilaufgaben je Probeklausur."],
      ["Audio", "Issues", "Sprachausgabe des Geräts, kein Originalton; Audio nicht als Datei speicherbar (Transkripte schon, in der installierten Version)."],
      ["Podcast", "Issues", "10 Episoden mit Transkript und 5-Fragen-Quiz; Audio nicht als Datei speicherbar."],
      ["Video", "Issues", "6 animierte Erklärclips mit Untertiteln und Fragen, kein gefilmtes Video."],
      ["Interaktive Übungen", "Verified", "Mehrfachwahl, Zuordnen/Klassifizieren, Karteikarten, Rechnen, Timer, Kartenaufgaben – getestet."],
      ["Karten", "Verified", "Interaktive Karte mit Zoom, Verschieben, 5 Ebenen, Legende, Messen, Vergleichen – getestet. Keine realen Kartengrundlagen (Atlas nutzen)."],
      ["Statistiken & Diagramme", "Issues", "Klimadiagramme, Pyramiden, Linien, Säulen, Streuung, Choroplethen, Flusskarte – getestet. Es fehlen Kreisdiagramme sowie Satelliten- und Luftbilder (keine lizenzfreien Bilddaten eingebunden)."],
      ["Operatorentraining", "Verified", "Alle Operatoren der offiziellen Liste mit Blitz-Übung."],
      ["Probeklausuren", "Issues", "4 Klausuren, 7 Aufgaben mit GK/LK-Fassung; Bewertung als Selbsteinschätzung."],
      ["Adaptives Lernen", "Verified", "12 Kompetenzbereiche, Förderplan mit 5 Schritten zum schwächsten Bereich."],
      ["Tablet", RESP_DIMS ? "Verified" : "Issues", "Siehe Tabelle F."],
      ["Mobil", RESP_DIMS ? "Verified" : "Issues", "Siehe Tabelle F."],
      ["Barrierefreiheit", "Issues", "Kontraste, Fokus, Transkripte, Untertitel, Diagramm-Alternativtexte und Wertetabellen umgesetzt; kein Test mit echtem Screenreader."],
      ["Fortschritt", "Verified", "Lokal im Browser; nicht geräteübergreifend." + (window.STANDALONE ? " Sichern/Laden als Datei auf der Startseite." : "")],
      ["Offline", window.STANDALONE ? "Verified" : "Issues", window.STANDALONE ? "Installierbare App mit Offline-Speicher; Arbeitsblätter druckbar; Transkripte speicherbar." : "In dieser Webansicht nur mit Internet; Offline-Version als Download verfügbar."]
    ];
    root.innerHTML = `<div class="ph"><h1>Grundlagen & Bericht</h1></div>
      <p><span class="tag off">Offiziell NRW</span> = aus amtlichen Dokumenten für das Abitur 2027 · <span class="tag">Übungsmaterial</span> = für diesen Kurs erstellt.</p>
      <section class="sec"><h2>A · NRW-Anforderungen</h2><div class="tblwrap"><table class="tbl"><thead><tr><th>Bereich</th><th>Anforderung</th><th>Quelle</th></tr></thead><tbody>${reqs.map((r) => `<tr><td><strong>${esc(r[0])}</strong></td><td>${esc(r[1])}</td><td>${src(r[2])}</td></tr>`).join("")}</tbody></table></div>
        <h3>Inhaltsfelder und Fokussierungen 2027 (GK = LK)</h3>${O.felder.map((f) => `<p><strong>IF ${f.if}: ${esc(f.name)}</strong></p><ul class="small">${f.items.map((i) => `<li>${esc(i[0])}</li>`).join("")}</ul>`).join("")}
        <p class="small muted">Die Digitalisierungs-Fokussierung ist in den Vorgaben den Inhaltsfeldern 4 und 5 zugeordnet.</p>
        <h3>Kompetenzbereiche</h3><ul class="small">${O.kompetenzen.map((k) => `<li><strong>${k[0]}:</strong> ${esc(k[1])}</li>`).join("")}</ul>
        <h3>Aufgabenarten (Kernlehrplan, Kap. 4)</h3><ul class="small">${O.aufgabenarten.map((k) => `<li><strong>${k[0]}:</strong> ${esc(k[1])}</li>`).join("")}</ul>
        <h3>Quellen</h3><ol class="small">${O.sources.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join("")}</ol></section>
      <section class="sec"><h2>B · Kursstruktur</h2><div class="tblwrap"><table class="tbl"><thead><tr><th>Programm</th><th>Thementage</th><th>Verschiedene Themen</th><th>Methodentage</th><th>Wiederholung</th><th>Probeklausuren</th><th>Einstufung/Zeit/Endspurt</th></tr></thead><tbody>${plans.map((p) => `<tr>${p.map((v, i) => `<td class="mono">${i === 0 ? v + " Tage" : v + (i === 2 ? " / 16" : "")}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>
      <section class="sec"><h2>C · Tagespaket</h2><ol class="small">${COMP.map((c) => `<li>${esc(c[1])}</li>`).join("")}</ol><p class="small">Lernzeit wählbar: 30, 45, 60 oder 90 Minuten (Aufteilung auf der Startseite).</p></section>
      <section class="sec"><h2>D · Multimedia</h2><ul class="small"><li>Audio: ${TOPICS.length} × 3-Minuten-Fachwissen, ${TOPICS.length} × Fachbegriffe hören</li><li>Podcast: ${PODCAST.length} Episoden</li><li>Video: ${CLIPS.length} animierte Clips</li><li>Karten: interaktive Stadtkarte (5 Ebenen), Choroplethen-, Flusskarte, Lagekarten</li><li>Diagramme: Klima (3), Pyramiden (2), Linien, Säulen, Streuung</li><li>Übungen, Karteikarten (${TOPICS.reduce((a, t) => a + t.terms.length, 0)}), Fallbeispiele (${CASES.length}), Probeklausuren (${MOCKS.length})</li></ul></section>
      <section class="sec"><h2>E · Prüfungsvorbereitung</h2><div class="tblwrap"><table class="tbl"><tbody>${[["Sach-, Methoden-, Urteils-, Handlungskompetenz", "Tracking + Übungen in jedem Tagespaket"], ["AFB I–III", "AFB-Trainer, Kennzeichnung in allen Aufgaben"], ["Operatoren", "Modul + Blitz"], ["Materialanalyse", "Modul + Tagespaket"], ["Karten / Statistiken / Diagramme", "Module"], ["Fallbeispiele", CASES.length + " Fälle"], ["Klausurtraining / Zeitmanagement", "Timer GK/LK mit eigener Aufteilung"], ["Mock-Abitur", "4 Klausuren, GK und LK"]].map((r) => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join("")}</tbody></table></div></section>
      <section class="sec"><h2>F · Responsives Design – gemessene Größen</h2>${RESP_DIMS ? `<div class="tblwrap"><table class="tbl"><thead><tr><th>Komponente</th>${RESP_DIMS.sizes.map((s) => `<th class="mono">${s}</th>`).join("")}</tr></thead><tbody>${RESP_DIMS.rows.map((r) => `<tr><td><strong>${esc(r[0])}</strong></td>${r.slice(1).map((c) => `<td class="small mono">${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="small muted">Gerenderte Breite × Höhe in px und Position (x, y), gemessen in Chromium am ${RESP_DIMS.date}. Kein horizontales Scrollen in ${RESP_DIMS.views} Ansichten je Größe.</p>` : `<p class="muted">Noch nicht gemessen.</p>`}</section>
      <section class="sec"><h2>G · Status</h2><div class="tblwrap"><table class="tbl"><thead><tr><th>Bereich</th><th>Status</th><th>Hinweis</th></tr></thead><tbody>${status.map((s) => `<tr><td>${esc(s[0])}</td><td><span class="st st-${s[1].toLowerCase()}">${s[1]}</span></td><td class="small">${esc(s[2])}</td></tr>`).join("")}</tbody></table></div></section>`;
  };

  /* ---------- Router ---------- */
  let curDay = 0;
  function route() {
    stopAudio(); if (window._stopClock) { window._stopClock(); window._stopClock = null; } if (curDay) { leaveTag(curDay); curDay = 0; }
    const hsh = (location.hash || "#heute").slice(1); const main = $("#main"); main.innerHTML = ""; const root = document.createElement("div"); root.className = "view"; main.appendChild(root);
    const i = hsh.indexOf("-"); const a = i < 0 ? hsh : hsh.slice(0, i), b = i < 0 ? "" : hsh.slice(i + 1); let nav = "module";
    const M = { diag: viewDiag, themen: viewThemen, karten: viewKarten, diagramme: viewDiagramme, material: viewMaterial, operatoren: viewOperatoren, afb: viewAFB, begriffe: viewBegriffe, faelle: viewFaelle, rechnen: viewRechnen, schreiben: viewSchreiben, audio: viewAudio, podcast: viewPodcast, video: viewVideo, zeit: viewZeit, final: viewFinal };
    try {
      if (!hsh || hsh === "heute") { nav = "heute"; viewHeute(root); }
      else if (hsh === "plan") { nav = "plan"; viewPlan(root); }
      else if (a === "tag") { nav = "plan"; curDay = +b; viewTag(root, +b); }
      else if (hsh === "module") viewModule(root);
      else if (hsh === "pruefung") { nav = "pruefung"; viewPruefung(root); }
      else if (a === "mock") { nav = "pruefung"; viewMock(root, b); }
      else if (hsh === "grundlagen") { nav = "grundlagen"; viewGrundlagen(root); }
      else if (a === "m" && M[b]) M[b](root);
      else if (a === "t") viewTopic(root, b);
      else if (a === "fall") viewFall(root, b);
      else if (a === "clip") viewClip(root, b);
      else if (a === "op") viewOperatoren(root, b);
      else { nav = "heute"; viewHeute(root); }
    } catch (e) { root.innerHTML = `<p class="bad">Diese Ansicht konnte nicht geladen werden: ${esc(e.message)}</p><a href="#heute">Zur Startseite</a>`; console.error(e); }
    $$(".nav a").forEach((x) => x.setAttribute("aria-current", x.dataset.nav === nav ? "page" : "false"));
    if (window.STANDALONE && (["tag", "mock", "t", "fall"].includes(a) || ["m-operatoren", "m-begriffe", "m-rechnen", "m-schreiben"].includes(hsh))) { const h1 = $("h1", root); if (h1) { const pb = document.createElement("button"); pb.className = "btn sm ghost prt"; pb.type = "button"; pb.textContent = "Als Arbeitsblatt drucken / PDF"; pb.onclick = () => { $$("details", root).forEach((d) => d.open = true); const nb = window.NATIVE_IOS && window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.printPage; if (nb) nb.postMessage((($("h1", root) || {}).textContent || "Arbeitsblatt").trim()); else window.print(); }; h1.parentNode.insertBefore(pb, h1); } }
    const hd = $("h1", root); if (hd) hd.tabIndex = -1;
  }
  window.rerender = route;
  window.addEventListener("hashchange", () => { route(); scrollTo(0, 0); const hd = $("#main h1"); if (hd) hd.focus({ preventScroll: true }); });
  const init = () => { const sel = $("#kurs"); sel.value = S.kurs; sel.onchange = () => { S.kurs = sel.value; save(); route(); }; route(); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
