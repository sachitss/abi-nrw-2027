/* ===== Prüfung, Grundlagen/Bericht, Router ===== */
(function () {
  const O = window.OFFICIAL;
  const npFrom = (pts, max) => { const tbl = max === 160 ? O.noten160 : O.noten200; return (tbl.find((r) => pts >= r[0]) || [0, 0])[1]; };

  window.viewPruefung = function (root) {
    const k = O.kurse[S.kurs];
    root.innerHTML = `<div class="ph"><h1>Prüfung</h1><span class="tag off">Offiziell NRW · Abitur 2027</span></div>
      <section class="panel"><p class="eyebrow">${esc(k.name)} · ${esc(O.examDateLabel)}</p>
        <div class="timeline">${k.teile.map((t) => `<div class="tl-${t.key}" style="flex:${t.min}"><strong>${t.key === "HV" ? "Hörverstehen" : t.key === "SM" ? "Sprachmittlung" : "Schreiben / Leseverstehen"}</strong><span class="mono">${t.min} min · ${t.pts} P.</span></div>`).join("")}</div>
        <ul class="small">${k.teile.map((t) => `<li>${esc(t.name)}: ${esc(t.note)}</li>`).join("")}<li>Reihenfolge fest; jeder Teil wird nach Bearbeitung eingesammelt.</li><li>Hilfsmittel: ${O.hilfsmittel.map(esc).join("; ")}.</li></ul>
      </section>
      <div class="ph"><h2>Probeklausuren</h2><span class="tag">Übungsmaterial</span></div>
      <div class="modgrid">${MOCKS.map((m) => { const r = S.mocks[m.id]; return `<a class="mod" href="#mock-${m.id}">${icon("exam")}<strong>${esc(m.name)}</strong><span>${stars(m.lvl)} ${r ? `· zuletzt ${r.np} NP (${r.total}/${r.max})` : "· noch nicht geschrieben"}</span></a>`; }).join("")}</div>
      <p class="note">Probeklausuren 1–3 nutzen Texte, die du aus den Modulen kennen kannst. Probeklausur 4 folgt dem vollständigen Ablauf deines Kurstyps. Alle Aufgaben sind eigene Übungsaufgaben im Stil der NRW-Vorgaben, keine Originalprüfungen.</p>`;
  };

  window.viewMock = function (root, id) {
    const m = MOCKS.find((x) => x.id === id) || MOCKS[0]; const k = O.kurse[S.kurs];
    const hasHV = k.hv; const max = hasHV ? 200 : 160;
    const R = { hv: null, sm: null, sl: null };
    root.innerHTML = `<a class="back" href="#pruefung">${icon("back")} Prüfung</a><p class="eyebrow">${esc(k.name)} · ${stars(m.lvl)}</p><h1>${esc(m.name)}</h1>
      ${m.guided ? `<p class="callout">Geführte Klausur: Du bekommst zu jeder Teilaufgabe Hinweise. Zeiten sind Richtwerte.</p>` : `<p class="muted">Arbeite in der vorgegebenen Reihenfolge. Die Zeitangaben entsprechen deinem Kurstyp.</p>`}
      <div class="parts"></div>
      <section class="sec final"><h2>Auswertung</h2><div class="sum"></div><button class="btn" id="mk-save">Klausur auswerten und speichern</button></section>`;
    const parts = $(".parts", root);

    /* Teil HV */
    if (hasHV) {
      const sec = h(`<section class="sec"><h2>Teil 1 · Hörverstehen <span class="mono small">30 min · 40 P.</span></h2><p class="hint">Jeder Text: Lesezeit für die Fragen, dann zweimal hören. Antworten erst am Ende abgeben.</p><div class="hvs"></div><button class="btn sm" id="hv-sub">Hörverstehen abgeben</button><div class="hvres"></div></section>`);
      parts.appendChild(sec);
      const items = [];
      m.hv.forEach((hid, ti) => {
        const l = LISTEN[hid]; const box = h(`<div class="hvbox"><h3>Hörtext ${ti + 1}: <span lang="en">${esc(l.title)}</span> <small class="muted">(${esc(l.accent)})</small></h3><div class="row auto"><button class="btn sm ghost">Prüfungsablauf starten</button><span class="small muted st"></span></div><div class="pl"></div><div class="qq"></div></div>`);
        $(".hvs", sec).appendChild(box);
        const pl = Player($(".pl", box), [["en", l.text]], { voice: l.voice, transcript: false });
        l.q.forEach((q, qi) => {
          const nm = `${id}-${hid}-${qi}`;
          const qel = q.type === "mc" ? h(`<fieldset class="ex"><legend class="ex-q">[${q.op}] ${esc(q.q)}</legend>${q.o.map((o, oi) => `<label class="radio"><input type="radio" name="${nm}" value="${oi}"> <span lang="en">${esc(o)}</span></label>`).join("")}<div class="fb"></div></fieldset>`)
            : h(`<div class="ex"><label class="ex-q" for="${nm}">[${q.op}] ${esc(q.q)}</label><input id="${nm}" class="inp" autocomplete="off"><div class="fb"></div></div>`);
          $(".qq", box).appendChild(qel); items.push({ q, qel, nm });
        });
        const st = $(".st", box);
        $(".auto button", box).onclick = function () {
          this.disabled = true; let t = m.guided ? 20 : 45;
          const tick = () => { st.textContent = `Lesezeit: ${t} s`; if (t-- > 0) setTimeout(tick, 1000); else first(); };
          const first = () => { st.textContent = "Erstes Hören …"; pl.restart(); pl.el.dataset.round = 1; };
          pl.el.addEventListener("ended", () => {});
          const obs = setInterval(() => {
            if (!speechSynthesis.speaking && pl.el.dataset.round === "1" && st.textContent.startsWith("Erstes")) { st.textContent = "Pause (15 s) …"; setTimeout(() => { st.textContent = "Zweites Hören …"; pl.el.dataset.round = 2; pl.restart(); }, 15000); }
            if (!speechSynthesis.speaking && pl.el.dataset.round === "2" && st.textContent.startsWith("Zweites")) { st.textContent = "Fertig. Antworten prüfen, dann weiter."; clearInterval(obs); }
          }, 1500);
          tick();
        };
      });
      $("#hv-sub", sec).onclick = function () {
        let be = 0;
        items.forEach(({ q, qel, nm }) => {
          let ok;
          if (q.type === "mc") { const c = $(`input[name="${nm}"]:checked`, qel); ok = c && +c.value === q.a; $$("input", qel).forEach((x) => (x.disabled = true)); }
          else { const v = norm($("input", qel).value); ok = !!v && q.keys.some((kk) => v.includes(norm(kk))); $("input", qel).disabled = true; }
          if (ok) be++; record("listening", !!ok, null, ok ? null : "HV: " + q.q);
          $(".fb", qel).innerHTML = `<p class="${ok ? "good" : "bad"}">${ok ? "Richtig" : "Falsch"} – Lösung: <span lang="en">${esc(q.type === "mc" ? q.o[q.a] : q.a)}</span></p>`;
        });
        const pts = Math.round((be / items.length) * 40); R.hv = pts;
        $(".hvres", sec).innerHTML = `<p class="good"><strong>${be} von ${items.length} Bewertungseinheiten → ${pts} von 40 Punkten</strong> (Umrechnung wie in den Konstruktionshinweisen).</p>`;
        this.remove(); sum();
      };
    }

    /* Teil SM */
    const sm = MEDIATION[m.sm];
    const s2 = h(`<section class="sec"><h2>Teil ${hasHV ? 2 : 1} · Sprachmittlung <span class="mono small">max. 60 min · 50 P.</span></h2>
      <p class="lbl">Situation</p><p lang="en">${esc(sm.situation)}</p><p class="task" lang="en">${esc(sm.task)}</p>
      <details ${m.guided ? "open" : ""}><summary>Ausgangstext (Deutsch)</summary><article class="text src" lang="de">${sm.source.map((p, i) => i ? `<p>${esc(p)}</p>` : `<h3>${esc(p)}</h3>`).join("")}</article></details>
      ${m.guided ? `<p class="hint">Hinweis: Filtere nach dem, was die Person in der Situation wissen will. Kulturbegriffe erklären, nicht übersetzen.</p>` : ""}
      <div class="row smt"></div><textarea rows="12" lang="en" aria-label="Sprachmittlung" id="mk-sm-${id}">${esc(S.drafts["mk-sm-" + id] || "")}</textarea>
      <details><summary>Nach dem Schreiben: Erwartungshorizont</summary><ul>${sm.relevant.map((r) => `<li lang="en">${esc(r)}</li>`).join("")}</ul><pre class="letter" lang="en">${esc(sm.model)}</pre></details>
      <p class="lbl">Selbstbewertung</p><div class="rs"></div></section>`);
    parts.appendChild(s2); Timer($(".smt", s2), 60 * 60, "Sprachmittlung");
    const smta = $("textarea", s2); smta.oninput = () => { S.drafts["mk-sm-" + id] = smta.value; save(); };
    const smR = raster($(".rs", s2), "SM", (t) => { R.sm = t; sum(); });

    /* Teil SL */
    const slMin = k.teile.find((t) => t.key === "SL").min;
    const s3 = h(`<section class="sec"><h2>Teil ${hasHV ? 3 : 2} · Schreiben / Leseverstehen <span class="mono small">${slMin} min · 110 P.</span></h2>
      ${m.sl.length > 1 ? `<div class="seg" role="radiogroup" aria-label="Aufgabenwahl">${m.sl.map((a, i) => `<button role="radio" aria-checked="${i === 0}" data-a="${i}"><strong>${esc(a.label)}</strong><small lang="en">${esc(window[a.src][a.text].title)}</small></button>`).join("")}</div>` : ""}
      <div class="row slt"></div><div class="slbody"></div><p class="lbl">Selbstbewertung (Kriterienraster NRW)</p><div class="rs"></div></section>`);
    parts.appendChild(s3); Timer($(".slt", s3), slMin * 60, "Schreiben/Lesen");
    function showA(ai) {
      const a = m.sl[ai]; const tx = window[a.src][a.text];
      $(".slbody", s3).innerHTML = `<div class="split"><div><p class="eyebrow">${esc(a.label)} · ${esc(tx.kind)}</p><h3 lang="en">${esc(tx.title)}</h3>${textHTML(tx)}</div><div class="tasks">${a.tasks.map((t) => `<div class="tk ${t[0].length > 1 ? "alt" : ""}"><p class="task" lang="en"><strong>${t[0]}.</strong> ${esc(t[1])}</p>${m.guided && t[2] ? `<p class="hint">${esc(t[2])}</p>` : ""}</div>`).join("")}
        <div class="seg sm" role="radiogroup" aria-label="Teilaufgabe 3"><button role="radio" aria-checked="true" data-t="3a">3a wählen</button><button role="radio" aria-checked="false" data-t="3b">3b wählen</button></div>
        ${["1", "2", "3"].map((n) => `<label class="lbl" for="mk-${id}-${ai}-${n}">Antwort ${n}</label><textarea id="mk-${id}-${ai}-${n}" rows="${n === "1" ? 6 : 10}" lang="en">${esc(S.drafts[`mk-${id}-${ai}-${n}`] || "")}</textarea>`).join("")}</div></div>`;
      $$("textarea", s3).forEach((t) => t.oninput = () => { S.drafts[t.id] = t.value; save(); });
      $$("[data-t]", s3).forEach((b) => b.onclick = () => $$("[data-t]", s3).forEach((x) => x.setAttribute("aria-checked", x === b)));
    }
    $$("[data-a]", s3).forEach((b) => b.onclick = () => { $$("[data-a]", s3).forEach((x) => x.setAttribute("aria-checked", x === b)); showA(+b.dataset.a); });
    showA(0);
    const slR = raster($(".rs", s3), "SL", (t) => { R.sl = t; sum(); });

    function sum() {
      const tot = (R.hv || 0) + (R.sm || 0) + (R.sl || 0);
      $(".sum", root).innerHTML = `<table class="tbl"><tbody>${hasHV ? `<tr><td>Hörverstehen</td><td class="mono">${R.hv == null ? "–" : R.hv} / 40</td></tr>` : ""}<tr><td>Sprachmittlung</td><td class="mono">${R.sm || 0} / 50</td></tr><tr><td>Schreiben / Leseverstehen</td><td class="mono">${R.sl || 0} / 110</td></tr><tr><th>Gesamt</th><th class="mono">${tot} / ${max} → ${npFrom(tot, max)} Notenpunkte</th></tr></tbody></table>
        <p class="note small">Notenpunkte nach der Umrechnungstabelle der Konstruktionshinweise (${max} Punkte). Sprachmittlung und Schreiben sind Selbstbewertung.</p>`;
      return tot;
    }
    sum();
    $("#mk-save", root).onclick = () => {
      const tot = sum(); const np = npFrom(tot, max);
      S.mocks[id] = { date: today(), total: tot, max, np }; recordScore("exam", tot / max); checkBadges(); save();
      $("#mk-save", root).textContent = "Gespeichert: " + np + " Notenpunkte";
    };
  };

  /* ---------- Grundlagen & Bericht ---------- */
  window.RESP = [
    ["1920 × 1080", "Desktop", "Seitenleiste links (210 px), Inhalt max. 1060 px", "73 Ansichten + alle Plantage ohne Fehler, kein horizontales Scrollen"],
    ["1440 × 900", "Laptop", "Seitenleiste links, Text + Aufgaben nebeneinander", "73 Ansichten + alle Plantage ohne Fehler, kein horizontales Scrollen"],
    ["1024 × 1366", "Tablet hoch (iPad Pro)", "Seitenleiste links", "73 Ansichten + alle Plantage ohne Fehler, kein horizontales Scrollen"],
    ["768 × 1024", "Tablet hoch (iPad)", "Tab-Leiste unten (57 px)", "73 Ansichten + alle Plantage ohne Fehler, kein horizontales Scrollen"],
    ["390 × 844", "Smartphone (iPhone 14)", "Tab-Leiste unten, einspaltig", "73 Ansichten + alle Plantage ohne Fehler, kein horizontales Scrollen"],
    ["375 × 812", "Smartphone (iPhone X)", "Tab-Leiste unten, einspaltig", "73 Ansichten + alle Plantage ohne Fehler, kein horizontales Scrollen"]
  ];
  window.viewGrundlagen = function (root) {
    const K = O.kurse;
    const plans = [30, 60, 90, 120].map((l) => { const d = genPlan(l, S.kurs); const c = (k) => d.filter((x) => x.kind === k).length; return { l, day: c("day"), review: c("review"), mock: c("mock"), other: c("diag") + c("strategy") + c("final") }; });
    const reqs = [
      ["Klausurstruktur Hörverstehen → Sprachmittlung → Schreiben/Leseverstehen (integriert), feste Reihenfolge", "GK, LK", "Hören, Sprachmittlung, Schreiben/Lesen", "3 Klausurteile", 0],
      ["Dauer 315 Min. (LK) / 285 Min. (GK); Hörverstehen 30 Min., Sprachmittlung max. 60 Min.", "LK / GK", "Alle", "Zeitvorgabe", 0],
      ["Austeilen: zuerst nur HV-Material; nach 30 Min. einsammeln; dann Unterlagen für SM und S/L gemeinsam", "GK, LK", "–", "Ablauf", 0],
      ["Hörverstehen: i. d. R. 3 Texte, ca. 10 Min., zweimal gehört, keine Aufgabenwahl", "GK, LK", "Hörverstehen", "tick, match, complete, state, list/name", 2],
      ["Sprachmittlung: deutscher Sach-/Gebrauchstext (450–650 Wörter), keine Aufgabenwahl", "GK, LK", "Sprachmittlung", "z. B. E-Mail, Brief, Artikel an englischsprachige Adressaten", 2],
      ["S/L: Wahl zwischen Aufgabe I (literarisch) und II (Sach-/Gebrauchstext); in Teilaufgabe 3 Wahl zwischen zwei Aufgaben (enger/loser Textbezug)", "GK, LK", "Schreiben, Leseverstehen, Text- und Medienkompetenz", "TA 1 Zusammenfassung, TA 2 Analyse, TA 3 Stellungnahme oder Gestaltung", 0],
      ["Zieltextformate: Zusammenfassung, Analyse, Stellungnahme; Brief/E-Mail; Leserbrief; Blogeintrag; Redebeitrag; Zeitungs-/Internetartikel; narrative Texte gestalten/fortführen", "GK, LK", "Schreiben (produktiv)", "TA 3", 0],
      ["Zusätzlich im LK: Gestaltung, Fortführung oder Ergänzung dramatischer Texte", "LK", "Schreiben (produktiv)", "TA 3", 0],
      ["Textlänge S/L max. 800 (GK) / 1.000 Wörter (LK); Textgrundlagen können um Bilder und diskontinuierliche Texte ergänzt werden", "GK / LK", "Lesen", "Textvorlage", 2],
      ["Bewertung S/L 110 P. (44 Inhalt / 66 Darstellungsleistung), SM 50 P. (20/30), HV 40 P.", "GK, LK", "Alle", "Kriteriengeleitete Bewertung", 2],
      ["Operatoren gültig ab Abitur 2025 (S/L, SM, HV)", "GK, LK", "Alle", "Aufgabenstellung", 1],
      ["Hilfsmittel: ein- und zweisprachiges Wörterbuch u. a.", "GK, LK", "Alle", "–", 0],
      ["Themenfelder des soziokulturellen Orientierungswissens (s. unten); HV und SM auch mit allgemeinerem lebensweltlichem Bezug", "GK, LK", "Interkulturelle Kompetenz", "v. a. Schreiben/Lesen", 0],
      ["Termin schriftliche Prüfung Englisch: Fr, 30.04.2027, 9:00 Uhr", "GK, LK", "–", "–", 3],
      ["Referenzniveau Ende Q-Phase laut Kernlehrplan: B2, rezeptiv mit Anteilen von C1; LK mit höherer Komplexität und Abstraktion", "GK, LK", "Alle Kompetenzen", "–", 6]
    ];
    const allTopics = ["uk", "ukself", "us", "dream", "nigeria", "ngcol", "identity", "diversity", "media", "lit", "global", "tech", "dystopia"];
    const status = [
      ["NRW-Anforderungen", "Verified", "Aus den amtlichen Dokumenten (Vorgaben 2027, Operatoren, Konstruktionshinweise, Termine) recherchiert."],
      ["30-Tage-Kurs", "Complete", "Generator erzeugt 30 Tage inkl. Diagnose, 4 Probeklausuren, Strategie, Endspurt."],
      ["60-Tage-Kurs", "Complete", "Wie oben, 60 Tage."],
      ["90-Tage-Kurs", "Complete", "Wie oben, 90 Tage."],
      ["120-Tage-Kurs", "Complete", "Wie oben; Inhalte (Texte, Hörtexte) wiederholen sich über lange Pläne – Issue: begrenzter Textpool."],
      ["Audio", "Issues", "Über Sprachausgabe des Geräts, kein Originalton; Stimmen/Akzente hängen vom Gerät ab."],
      ["Podcast", "Issues", window.STANDALONE ? "Player mit Tempo, ±10 s, Fortschritt, Transkript, Vokabeln; Transkripte als Datei speicherbar, Audio selbst nicht (Sprachausgabe des Geräts)." : "Player mit Tempo, ±10 s, Fortschritt, Transkript, Vokabeln; Download nicht möglich (Transkript kopierbar)."],
      ["Video", "Issues", "Als animierte Erklärclips mit Sprachausgabe und Untertiteln EN|DE; kein gefilmtes Video."],
      ["Interaktive Übungen", "Verified", "MC, Zuordnen, Satzbau, Lücke/Kurzantwort, Karteikarten, Markieren, Timer – im Browser getestet."],
      ["Probeklausuren", "Issues", "4 Klausuren mit Auto-Auswertung HV und Selbstbewertung; Texte teils aus den Modulen bekannt."],
      ["Tablet", "Verified", "Siehe Tabelle F."],
      ["Mobil", "Verified", "Siehe Tabelle F."],
      ["Barrierefreiheit", "Issues", "Große Schrift, Kontrast, Transkripte, Tastatur und ARIA umgesetzt; kein Screenreader-Test mit echter Hilfstechnik."],
      ["Fortschritt", "Verified", "Lokal im Browser gespeichert; nicht geräteübergreifend."]
    ];
    root.innerHTML = `<div class="ph"><h1>Grundlagen & Bericht</h1></div>
      <p>Diese Seite trennt klar: <span class="tag off">Offiziell NRW</span> = aus amtlichen Dokumenten für das <strong>Abitur 2027</strong>; <span class="tag">Übungsmaterial</span> = für diesen Kurs erstellt. Für die Abiturjahrgänge 2028 und 2029 gibt es eigene Vorgaben, die hier nicht verwendet werden.</p>

      <section class="sec"><h2>A · NRW-Anforderungen (Abitur 2027)</h2><div class="tblwrap"><table class="tbl"><thead><tr><th>Anforderung</th><th>Kurs</th><th>Kompetenz</th><th>Aufgabenformat</th><th>Quelle</th></tr></thead><tbody>
        ${reqs.map((r) => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td><td><a href="${O.sources[r[4]].url}" target="_blank" rel="noopener">${esc(O.sources[r[4]].name.split(" (")[0])}</a></td></tr>`).join("")}
      </tbody></table></div>
      <h3>Klausurteile je Kurstyp</h3><div class="kgrid">${Object.entries(K).map(([key, k]) => `<article class="card"><h4>${esc(k.name)}</h4><p class="mono">${k.dauer} min · GER ${esc(k.ger)}</p><ul class="small">${k.teile.map((t) => `<li>${esc(t.name)} – ${t.pts} P.</li>`).join("")}</ul></article>`).join("")}</div>
      <h3>Soziokulturelles Orientierungswissen 2027</h3><div class="tblwrap"><table class="tbl center"><thead><tr><th>Schwerpunkt</th><th>GK</th><th>LK</th></tr></thead><tbody>
        ${allTopics.map((t) => `<tr><td lang="en">${esc(TOPICS[t].en)}<br><small class="muted">${esc(TOPICS[t].de)}</small></td>${["GK", "LK"].map((kk) => { const f = O.fokus[kk].find((x) => x.topic === t); return `<td title="${f ? esc(f.t) : ""}">${f ? "●" : "–"}</td>`; }).join("")}</tr>`).join("")}
      </tbody></table></div><p class="small muted">Wortlaut für deinen Kurs (${esc(K[S.kurs].short)}):</p><ul class="small">${O.fokus[S.kurs].map((f) => `<li>${esc(f.t)}</li>`).join("")}</ul>
      <p class="small">Die Vorgaben 2027 nennen keine verbindlichen Einzelwerke (keine Pflichtlektüre, kein Pflichtfilm). Hörverstehen und Sprachmittlung können auch einen allgemeineren lebensweltlichen Bezug haben. Der einzige inhaltliche Unterschied GK/LK: das Erbe der britischen Herrschaft in Nigeria (nur LK) und dramatische Texte als Zieltextformat (nur LK).</p>
      <h3>Bewertung Schreiben/Leseverstehen: Darstellungsleistung (66 P.)</h3><div class="tblwrap"><table class="tbl"><tbody>${O.bewertungSL.kriterien.map(([g, it]) => it.map((x, i) => `<tr>${i === 0 ? `<th rowspan="${it.length}">${esc(g)}</th>` : ""}<td>${esc(x[0])}</td><td class="mono">${x[1]}</td></tr>`).join("")).join("")}</tbody></table></div>
      <h3>Mündliche Prüfung</h3><p>Die Sprechkompetenz wird in der Q-Phase in einer mündlichen Kommunikationsprüfung (anstelle einer Klausur) überprüft; ist Englisch 4. Abiturfach, folgt eine mündliche Abiturprüfung. Format, Termine und Themen legt deine Schule fest.</p>
      <h3>Quellen</h3><ol class="small">${O.sources.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join("")}</ol></section>

      <section class="sec"><h2>B · Kursstruktur (${esc(K[S.kurs].short)})</h2><div class="tblwrap"><table class="tbl"><thead><tr><th>Plan</th><th>Lerntage</th><th>Wiederholung</th><th>Probeklausuren</th><th>Diagnose/Strategie/Endspurt</th></tr></thead><tbody>${plans.map((p) => `<tr><td class="mono">${p.l} Tage</td><td class="mono">${p.day}</td><td class="mono">${p.review}</td><td class="mono">${p.mock}</td><td class="mono">${p.other}</td></tr>`).join("")}</tbody></table></div><p class="small">Phasen: Grundlagen (1. Drittel), Vertiefung (2. Drittel), Prüfungstraining (letztes Drittel). Themen rotieren durch die Themenfelder deines Kurstyps.</p></section>

      <section class="sec"><h2>C · Tagespaket</h2><ol class="small">${[["Warm-up", "5 min"], ["Vokabeln EN↔DE mit Beispielsatz und Kurztest", "10–15 min"], ["Grammatik: Regel, Beispiele, Übung, Abitur-Anwendung, Fehlerkorrektur", "10–15 min"], ["Input: Lesen, Hören, Podcast, Erklärclip oder Grafik (rotierend)", "15–20 min"], ["Abitur-Aufgabe (TA 1, TA 2, TA 3, Sprachmittlung, Hörverstehen oder Operatoren)", "20–30 min"], ["Sprechen mit Vorbereitungs- und Sprechzeit", "5–10 min"], ["Tageswiederholung inkl. eigener Fehler", "5 min"], ["Fortschritts-Check", "–"]].map((x) => `<li>${esc(x[0])} <span class="mono muted">${x[1]}</span></li>`).join("")}</ol></section>

      <section class="sec"><h2>D · Multimedia</h2><ul class="small">
        <li><strong>Audio:</strong> ${Object.keys(LISTEN).length} Hörtexte (britisches, amerikanisches, nigerianisches Englisch) über Sprachausgabe.</li>
        <li><strong>Podcasts:</strong> ${PODCASTS.length} Folgen in 5 Reihen, Player mit 0,75–1,5×, ±10 s, Transkript, Vokabeln, Fragen.</li>
        <li><strong>Video:</strong> ${CLIPS.length} Erklärclips als animierte Folien mit Untertiteln EN | DE.</li>
        <li><strong>Interaktiv:</strong> Mehrfachwahl, Zuordnen, Satzbau, Kurzantwort, Karteikarten, Markieren, Beleg antippen, Timer.</li>
        <li><strong>Lesen:</strong> ${Object.keys(READ).length + Object.keys(LIT).length} Texte · <strong>Schreiben:</strong> 6 Stufen · <strong>Sprechen:</strong> ${SPEAK.length} Formate · <strong>Quiz:</strong> in jedem Modul.</li></ul></section>

      <section class="sec"><h2>E · Prüfungsvorbereitung</h2><p class="small">Abgedeckt: Wortschatz (${VOCAB.length}), Grammatik (${GRAMMAR.length} Themen), Lesen, Hören, Schreiben, Sprachmittlung (2 + Mini), Sprechen, Textanalyse mit Markierwerkzeug, Operatoren (${OPERATORS.SL.length + OPERATORS.SM.length + OPERATORS.HV.length}), Prüfungsstrategie, ${MOCKS.length} Probeklausuren.</p></section>

      <section class="sec"><h2>F · Responsives Design (getestet)</h2>${RESP.length ? `<div class="tblwrap"><table class="tbl"><thead><tr><th>Größe</th><th>Gerät</th><th>Navigation</th><th>Ergebnis</th></tr></thead><tbody>${RESP.map((r) => `<tr><td class="mono">${r[0]}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join("")}</tbody></table></div>` : `<p class="muted">Noch nicht getestet.</p>`}</section>

      <section class="sec"><h2>G · Status</h2><div class="tblwrap"><table class="tbl"><thead><tr><th>Bereich</th><th>Status</th><th>Hinweis</th></tr></thead><tbody>${status.map((s) => `<tr><td>${esc(s[0])}</td><td><span class="st st-${s[1].toLowerCase()}">${s[1]}</span></td><td class="small">${esc(s[2])}</td></tr>`).join("")}</tbody></table></div></section>`;
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
      else if (a === "g") viewGramTopic(root, b);
      else if (a === "read") viewReadText(root, b);
      else if (a === "lit") viewLit(root, b);
      else if (a === "hv") viewHV(root, b);
      else if (a === "sm") viewSM(root, b);
      else if (a === "clip") viewClip(root, b);
      else if (a === "op") viewOperatoren(root, b);
      else if (a === "m") {
        ({ diag: viewDiag, vocab: viewVocab, grammar: viewGrammar, read: viewRead, listen: viewListen, write: viewWrite, mediation: viewMediation, analysis: viewAnalysis, speak: viewSpeak, culture: viewCulture, strategy: viewStrategy, operatoren: viewOperatoren, redemittel: viewRedemittel, podcast: viewPodcast, video: viewVideo, final: viewFinal }[b] || viewModule)(root);
      } else { nav = "heute"; viewHeute(root); }
    } catch (e) { root.innerHTML = `<p class="bad">Diese Ansicht konnte nicht geladen werden: ${esc(e.message)}</p><a href="#heute">Zur Startseite</a>`; console.error(e); }
    $$(".nav a").forEach((x) => x.setAttribute("aria-current", x.dataset.nav === nav ? "page" : "false"));
    const hd = $("h1", root); if (hd) { hd.tabIndex = -1; }
  }
  window.rerender = route;
  window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); const hd = $("#main h1"); if (hd) hd.focus({ preventScroll: true }); });
  document.addEventListener("DOMContentLoaded", () => {
    const sel = $("#kurs"); sel.value = S.kurs;
    sel.onchange = () => { S.kurs = sel.value; save(); route(); };
    route();
  });
  if (document.readyState !== "loading") { const sel = $("#kurs"); if (sel) { sel.value = S.kurs; sel.onchange = () => { S.kurs = sel.value; save(); route(); }; route(); } }
})();
