/* ===== Karten und Diagramme (SVG, responsiv, barrierearm) ===== */
(function () {
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const f1 = (n) => (Math.round(n * 10) / 10).toLocaleString("de-DE");

  /* ---------- Datensätze ---------- */
  const D = {
    climate_trop: { name: "Station im Amazonastiefland", note: "3° S · 60° W · 50 m · gerundete Werte, typisch für Manaus (Brasilien)", T: [26.1, 26.0, 26.2, 26.3, 26.5, 26.6, 26.7, 27.3, 27.8, 27.7, 27.3, 26.7], P: [260, 290, 310, 290, 250, 110, 80, 55, 80, 110, 180, 220] },
    climate_sahel: { name: "Station in der Sahelzone", note: "13° N · 2° O · 220 m · gerundete Werte, typisch für Niamey (Niger)", T: [24, 27, 31, 34, 34, 32, 29, 28, 29, 31, 29, 25], P: [0, 0, 3, 6, 35, 75, 145, 190, 85, 15, 1, 0] },
    climate_almeria: { name: "Station an der Küste Almerías", note: "37° N · 2° W · 20 m · gerundete Werte", T: [12.5, 13, 14.5, 16, 18.8, 22.5, 25.5, 26, 24, 20, 16.5, 13.5], P: [25, 22, 18, 20, 12, 4, 1, 2, 12, 25, 30, 28] },
    bar_irrig: { title: "Wasserfußabdruck (Liter je kg)", unit: "l/kg", src: "Globale Durchschnittswerte, gerundet (Water Footprint Network)", bars: [["Tomaten", 214], ["Kartoffeln", 287], ["Weizen", 1827], ["Reis", 2497], ["Rindfleisch", 15415]], log: true },
    line_aral: { title: "Fläche des Aralsees (km²)", src: "Gerundete Näherungswerte aus verschiedenen Quellen", x: [1960, 1970, 1980, 1990, 2000, 2010, 2020], series: [["Fläche", [68000, 60000, 51000, 36000, 24000, 14000, 8500]]], unit: "km²" },
    line_sectors: { title: "Beschäftigte nach Sektoren, Index 2000 = 100", src: "Beispieldaten Modellstadt Rheinfeld", x: [2000, 2005, 2010, 2015, 2020, 2025], series: [["Industrie (II)", [100, 88, 79, 71, 66, 62]], ["Dienstleistungen (III)", [100, 108, 117, 126, 134, 141]]], unit: "Index" },
    bar_urban: { title: "Anteil Stadtbevölkerung (%)", src: "Gerundet nach UN World Urbanization Prospects 2018", groups: ["1950", "2018"], cats: [["Afrika", 14, 43], ["Asien", 18, 50], ["Europa", 52, 74], ["Lateinamerika", 41, 81], ["Nordamerika", 64, 82], ["Welt", 30, 55]] },
    bar_season: { title: "Ankünfte internationaler Gäste (Tsd.)", src: "Beispieldaten Inselstaat Palmera", bars: [["J", 38], ["F", 41], ["M", 44], ["A", 36], ["M", 18], ["J", 9], ["J", 11], ["A", 12], ["S", 8], ["O", 15], ["N", 27], ["D", 40]] },
    scatter_regions: { title: "Forschungsausgaben und Beschäftigungswachstum", src: "Beispieldaten für 10 Regionen", xl: "Forschungsausgaben (% des BIP)", yl: "Beschäftigungswachstum 2015–2025 (%)", pts: [[0.8, -2, "R1"], [1.1, 1, "R2"], [1.5, 3, "R3"], [1.9, 2, "R4"], [2.3, 6, "R5"], [2.8, 7, "R6"], [3.2, 9, "R7"], [3.9, 12, "R8"], [4.4, 11, "R9"], [5.6, 16, "R10"]] }
  };
  window.VISDATA = D;
  const MON = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

  function wrap(svg, cap, src, extra) {
    return `<figure class="vis">${cap ? `<figcaption><strong>${esc(cap)}</strong></figcaption>` : ""}<div class="vis-box">${svg}</div>${src ? `<p class="vis-src">${esc(src)}</p>` : ""}${extra || ""}</figure>`;
  }

  /* ---------- Klimadiagramm (Walter/Lieth-Prinzip, 10 °C = 20 mm) ---------- */
  function climate(key) {
    const d = D[key]; const W = 360, H = 250, L = 42, R = 318, T = 20, B = 210;
    const tMax = 62, tMin = -10; const y = (t) => B - ((t - tMin) / (tMax - tMin)) * (B - T); // Temperaturachse
    const py = (p) => p <= 100 ? y(p / 2) : y(50 + (p - 100) / 20); // über 100 mm im Maßstab 1:10
    const bw = (R - L) / 12;
    const tAvg = d.T.reduce((a, b) => a + b, 0) / 12, pSum = d.P.reduce((a, b) => a + b, 0);
    const humid = d.P.filter((p, i) => p / 2 > d.T[i]).length;
    const pts = d.T.map((t, i) => `${L + bw * (i + 0.5)},${y(t)}`).join(" ");
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Klimadiagramm ${esc(d.name)}: Jahresmitteltemperatur ${f1(tAvg)} Grad, Jahresniederschlag ${Math.round(pSum)} Millimeter, ${humid} humide Monate">`;
    for (let t = -10; t <= 50; t += 10) s += `<line x1="${L}" x2="${R}" y1="${y(t)}" y2="${y(t)}" class="g"/><text x="${L - 5}" y="${y(t) + 4}" class="ax t-temp" text-anchor="end">${t}</text>`;
    [0, 20, 40, 60, 80, 100, 200, 300].forEach((p) => { s += `<text x="${R + 5}" y="${py(p) + 4}" class="ax t-prec">${p}</text>`; });
    s += `<line x1="${L}" x2="${R}" y1="${y(50)}" y2="${y(50)}" class="g dash"/>`;
    s += `<text x="${R + 5}" y="${T - 6}" class="ax t-prec">mm</text><text x="${L - 5}" y="${T - 6}" class="ax t-temp" text-anchor="end">°C</text>`;
    d.P.forEach((p, i) => { const top = py(p); s += `<rect x="${L + bw * i + 3}" y="${top}" width="${bw - 6}" height="${y(0) - top}" class="prec"/>`; });
    s += `<polyline points="${pts}" class="temp"/>`;
    d.T.forEach((t, i) => { s += `<circle cx="${L + bw * (i + 0.5)}" cy="${y(t)}" r="2.6" class="tdot"/>`; });
    MON.forEach((m, i) => { s += `<text x="${L + bw * (i + 0.5)}" y="${B + 16}" class="ax" text-anchor="middle">${m}</text>`; });
    s += `<text x="${L}" y="${H - 4}" class="ax">Ø ${f1(tAvg)} °C · ${Math.round(pSum)} mm · ${humid} humide Monate</text></svg>`;
    const table = `<details class="vis-data"><summary>Werte als Tabelle</summary><div class="tblwrap"><table class="tbl mini"><tr><th></th>${MON.map((m) => `<th>${m}</th>`).join("")}</tr><tr><th>°C</th>${d.T.map((v) => `<td>${f1(v)}</td>`).join("")}</tr><tr><th>mm</th>${d.P.map((v) => `<td>${v}</td>`).join("")}</tr></table></div></details>`;
    return wrap(s, "Klimadiagramm: " + d.name, d.note + " · Niederschläge über 100 mm im Maßstab 1:10 gestaucht", table);
  }

  /* ---------- Balken ---------- */
  function bars(key) {
    const d = D[key]; const W = 360, H = 230, L = 46, R = 350, T = 16, B = 180; const n = d.bars.length;
    const max = Math.max(...d.bars.map((b) => b[1]));
    const val = (v) => (d.log ? Math.log10(v) / Math.log10(max * 1.2) : v / (max * 1.1));
    const bw = (R - L) / n;
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(d.title)}: ${d.bars.map((b) => b[0] + " " + b[1]).join(", ")}">`;
    const ticks = d.log ? [10, 100, 1000, 10000] : [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(max * 1.1 * f));
    ticks.forEach((t) => { const yy = B - val(Math.max(t, 1)) * (B - T); if (t === 0 || d.log || true) s += `<line x1="${L}" x2="${R}" y1="${d.log ? yy : B - (t / (max * 1.1)) * (B - T)}" y2="${d.log ? yy : B - (t / (max * 1.1)) * (B - T)}" class="g"/><text x="${L - 4}" y="${(d.log ? yy : B - (t / (max * 1.1)) * (B - T)) + 4}" class="ax" text-anchor="end">${t.toLocaleString("de-DE")}</text>`; });
    d.bars.forEach((b, i) => { const hh = val(b[1]) * (B - T); const x = L + bw * i + bw * 0.18; s += `<rect x="${x}" y="${B - hh}" width="${bw * 0.64}" height="${hh}" rx="2" class="bar"/><text x="${x + bw * 0.32}" y="${B - hh - 4}" class="val" text-anchor="middle">${b[1].toLocaleString("de-DE")}</text><text x="${x + bw * 0.32}" y="${B + 15}" class="ax" text-anchor="middle">${esc(b[0])}</text>`; });
    s += `</svg>`;
    return wrap(s, d.title, d.src + (d.log ? " · logarithmische Skala" : ""));
  }

  /* ---------- Gruppierte Balken ---------- */
  function groupBars(key) {
    const d = D[key]; const W = 360, H = 240, L = 34, R = 352, T = 16, B = 190; const n = d.cats.length; const cw = (R - L) / n;
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(d.title)}: ${d.cats.map((c) => `${c[0]} ${d.groups[0]} ${c[1]} Prozent, ${d.groups[1]} ${c[2]} Prozent`).join("; ")}">`;
    [0, 25, 50, 75, 100].forEach((t) => { const yy = B - (t / 100) * (B - T); s += `<line x1="${L}" x2="${R}" y1="${yy}" y2="${yy}" class="g"/><text x="${L - 4}" y="${yy + 4}" class="ax" text-anchor="end">${t}</text>`; });
    d.cats.forEach((c, i) => { [1, 2].forEach((g) => { const hh = (c[g] / 100) * (B - T); const x = L + cw * i + cw * 0.12 + (g - 1) * cw * 0.38; s += `<rect x="${x}" y="${B - hh}" width="${cw * 0.34}" height="${hh}" rx="2" class="${g === 1 ? "bar2" : "bar"}"/><text x="${x + cw * 0.17}" y="${B - hh - 3}" class="val sm" text-anchor="middle">${c[g]}</text>`; }); s += `<text x="${L + cw * (i + 0.5)}" y="${B + 15}" class="ax" text-anchor="middle">${esc(c[0].slice(0, 9))}</text>`; });
    s += `<rect x="${L}" y="${H - 18}" width="10" height="10" class="bar2"/><text x="${L + 14}" y="${H - 9}" class="ax">${d.groups[0]}</text><rect x="${L + 60}" y="${H - 18}" width="10" height="10" class="bar"/><text x="${L + 74}" y="${H - 9}" class="ax">${d.groups[1]}</text></svg>`;
    return wrap(s, d.title, d.src);
  }

  /* ---------- Linien ---------- */
  function lines(key) {
    const d = D[key]; const W = 360, H = 230, L = 50, R = 340, T = 16, B = 180;
    const all = d.series.flatMap((s) => s[1]); const max = Math.max(...all) * 1.08, min = Math.min(0, Math.min(...all));
    const x = (i) => L + (i / (d.x.length - 1)) * (R - L), y = (v) => B - ((v - min) / (max - min)) * (B - T);
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(d.title)}: ${d.series.map((se) => se[0] + " " + se[1].join(", ")).join("; ")}">`;
    for (let k = 0; k <= 4; k++) { const v = min + ((max - min) * k) / 4; s += `<line x1="${L}" x2="${R}" y1="${y(v)}" y2="${y(v)}" class="g"/><text x="${L - 4}" y="${y(v) + 4}" class="ax" text-anchor="end">${Math.round(v).toLocaleString("de-DE")}</text>`; }
    d.x.forEach((xx, i) => { s += `<text x="${x(i)}" y="${B + 15}" class="ax" text-anchor="middle">${xx}</text>`; });
    d.series.forEach((se, k) => {
      s += `<polyline points="${se[1].map((v, i) => `${x(i)},${y(v)}`).join(" ")}" class="line l${k}"/>`;
      se[1].forEach((v, i) => { s += `<circle cx="${x(i)}" cy="${y(v)}" r="${i === se[1].length - 1 ? 4 : 2.5}" class="dot d${k}"/>`; });
      const last = se[1][se[1].length - 1]; s += `<text x="${R - 2}" y="${y(last) - 7}" class="val l${k}t" text-anchor="end">${last.toLocaleString("de-DE")}</text>`;
    });
    s += d.series.map((se, k) => `<rect x="${L + k * 150}" y="${H - 18}" width="12" height="4" class="lg${k}"/><text x="${L + 16 + k * 150}" y="${H - 12}" class="ax">${esc(se[0])}</text>`).join("") + `</svg>`;
    return wrap(s, d.title, d.src);
  }

  /* ---------- Streudiagramm ---------- */
  function scatter(key) {
    const d = D[key]; const W = 360, H = 250, L = 42, R = 345, T = 14, B = 200;
    const xm = 6, ymin = -4, ymax = 18; const x = (v) => L + (v / xm) * (R - L), y = (v) => B - ((v - ymin) / (ymax - ymin)) * (B - T);
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(d.title)}. Positiver Zusammenhang: ${d.pts.map((p) => `${p[2]} ${p[0]} Prozent, ${p[1]} Prozent`).join("; ")}">`;
    [-4, 0, 4, 8, 12, 16].forEach((v) => { s += `<line x1="${L}" x2="${R}" y1="${y(v)}" y2="${y(v)}" class="g${v === 0 ? " zero" : ""}"/><text x="${L - 4}" y="${y(v) + 4}" class="ax" text-anchor="end">${v}</text>`; });
    [0, 1, 2, 3, 4, 5, 6].forEach((v) => { s += `<text x="${x(v)}" y="${B + 14}" class="ax" text-anchor="middle">${v}</text>`; });
    d.pts.forEach((p) => { s += `<circle cx="${x(p[0])}" cy="${y(p[1])}" r="5" class="sdot"/><text x="${x(p[0]) + 7}" y="${y(p[1]) - 5}" class="ax">${p[2]}</text>`; });
    s += `<text x="${(L + R) / 2}" y="${H - 18}" class="ax" text-anchor="middle">${esc(d.xl)}</text><text x="12" y="${(T + B) / 2}" class="ax" transform="rotate(-90 12 ${(T + B) / 2})" text-anchor="middle">${esc(d.yl)}</text></svg>`;
    return wrap(s, d.title, d.src);
  }

  /* ---------- Bevölkerungspyramiden (Modell) ---------- */
  function pyramid(key) {
    const shapes = {
      pyramid_ng: { name: "Junge, wachsende Bevölkerung (Pyramidenform)", m: [8.6, 7.4, 6.4, 5.4, 4.5, 3.8, 3.2, 2.6, 2.1, 1.7, 1.3, 1.0, 0.7, 0.5, 0.3, 0.2], note: "Modellhafte Darstellung, angelehnt an die Altersstruktur Nigerias" },
      pyramid_de: { name: "Alternde Bevölkerung (Urnenform)", m: [2.3, 2.4, 2.4, 2.5, 2.8, 3.2, 3.3, 3.2, 3.1, 3.0, 3.4, 4.0, 3.8, 3.1, 2.6, 2.3], note: "Modellhafte Darstellung, angelehnt an die Altersstruktur Deutschlands" }
    };
    const d = shapes[key]; const W = 360, H = 250, C = 180, T = 12, B = 222; const n = d.m.length; const bh = (B - T) / n; const sx = 17;
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bevölkerungspyramide, ${esc(d.name)}">`;
    d.m.forEach((v, i) => { const yy = B - bh * (i + 1); const w = v * sx; const wf = v * sx * (i > 12 ? 1.12 : 0.98); s += `<rect x="${C - 12 - w}" y="${yy + 1}" width="${w}" height="${bh - 2}" class="pm"/><rect x="${C + 12}" y="${yy + 1}" width="${wf}" height="${bh - 2}" class="pf"/>`; if (i % 2 === 0) s += `<text x="${C}" y="${yy + bh - 3}" class="ax sm" text-anchor="middle">${i * 5}</text>`; });
    s += `<text x="${C - 20}" y="${H - 6}" class="ax" text-anchor="end">Männer</text><text x="${C + 20}" y="${H - 6}" class="ax">Frauen</text><text x="${C}" y="${T + 2}" class="ax sm" text-anchor="middle">Alter</text>`;
    [0, 4, 8].forEach((v) => { s += `<text x="${C - 12 - v * sx}" y="${B + 12}" class="ax sm" text-anchor="middle">${v}</text><text x="${C + 12 + v * sx}" y="${B + 12}" class="ax sm" text-anchor="middle">${v}</text>`; });
    s += `</svg>`;
    return wrap(s, d.name, d.note + " · Anteil an der Gesamtbevölkerung in %");
  }

  /* ---------- Choroplethenkarte (fiktive Regionen, Sechsecke) ---------- */
  const REG = [["A1", 0, 0, 0.92], ["A2", 1, 0, 0.88], ["A3", 2, 0, 0.9], ["A4", 3, 0, 0.8], ["B1", 0, 1, 0.85], ["B2", 1, 1, 0.94], ["B3", 2, 1, 0.83], ["B4", 3, 1, 0.71], ["C1", 0, 2, 0.74], ["C2", 1, 2, 0.69], ["C3", 2, 2, 0.62], ["C4", 3, 2, 0.58], ["D1", 0, 3, 0.66], ["D2", 1, 3, 0.57], ["D3", 2, 3, 0.52], ["D4", 3, 3, 0.49]];
  function choropleth() {
    const W = 360, H = 250, r = 30; const cls = (v) => (v >= 0.85 ? "c4" : v >= 0.75 ? "c3" : v >= 0.6 ? "c2" : "c1");
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Choroplethenkarte fiktiver Regionen, Entwicklungsindex: ${REG.map((q) => q[0] + " " + q[3]).join(", ")}. Norden höher, Süden niedriger.">`;
    REG.forEach(([id, c, rr, v]) => { const cx = 50 + c * r * 1.75 + (rr % 2) * r * 0.87, cy = 36 + rr * r * 1.5; const pts = [0, 1, 2, 3, 4, 5].map((k) => { const a = (Math.PI / 3) * k + Math.PI / 6; return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`; }).join(" "); s += `<polygon points="${pts}" class="ch ${cls(v)}"/><text x="${cx}" y="${cy - 2}" class="ax sm" text-anchor="middle">${id}</text><text x="${cx}" y="${cy + 11}" class="val sm" text-anchor="middle">${String(v).replace(".", ",")}</text>`; });
    s += `<text x="258" y="20" class="ax">Index</text>` + [["c4", "≥ 0,85"], ["c3", "0,75–0,84"], ["c2", "0,60–0,74"], ["c1", "< 0,60"]].map((l, i) => `<rect x="258" y="${30 + i * 20}" width="14" height="14" class="ch ${l[0]}"/><text x="278" y="${41 + i * 20}" class="ax">${l[1]}</text>`).join("");
    s += `<text x="258" y="130" class="ax">N ↑</text><text x="258" y="146" class="ax sm">Hauptstadt: B2</text><text x="258" y="160" class="ax sm">Hafen: A1</text></svg>`;
    return wrap(s, "Entwicklungsindex der Regionen im Staat Aurelia", "Fiktive Regionen, Beispieldaten (Index aus Einkommen, Bildung, Lebenserwartung)");
  }

  /* ---------- Pendlerkarte ---------- */
  function flows(state) {
    const yr = state || "2025"; const W = 360, H = 250;
    const towns = [["Kernstadt", 180, 120, 0], ["Hochtal", 60, 40, 55], ["Seebach", 300, 50, 28], ["Brückau", 320, 200, 18], ["Waldheim", 50, 210, 40], ["Neumark", 200, 225, 12]];
    const v = { "2019": [0, 4.1, 6.2, 5.4, 3.0, 7.8], "2025": [0, 2.9, 4.6, 4.9, 2.2, 6.1] }[yr];
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Pendlerströme in die Kernstadt ${yr}: ${towns.slice(1).map((t, i) => t[0] + " " + v[i + 1] + " Tausend").join(", ")}"><defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" class="arrh"/></marker></defs>`;
    s += `<path d="M20 150 Q120 100 180 120 T350 90" class="road"/><text x="24" y="146" class="ax sm">A 44</text>`;
    towns.slice(1).forEach((t, i) => { const w = v[i + 1] * 1.6; const dx = towns[0][1] - t[1], dy = towns[0][2] - t[2]; const len = Math.hypot(dx, dy); const ex = towns[0][1] - (dx / len) * 22, ey = towns[0][2] - (dy / len) * 22; s += `<line x1="${t[1]}" y1="${t[2]}" x2="${ex}" y2="${ey}" class="flow" stroke-width="${w}" marker-end="url(#arr)"/><text x="${(t[1] + ex) / 2 + 6}" y="${(t[2] + ey) / 2 - 4}" class="val sm">${String(v[i + 1]).replace(".", ",")}</text>`; });
    towns.forEach((t, i) => { s += `<circle cx="${t[1]}" cy="${t[2]}" r="${i === 0 ? 18 : 8}" class="${i === 0 ? "core" : "town"}"/><text x="${t[1]}" y="${t[2] + (i === 0 ? 4 : 22)}" class="ax${i === 0 ? " inv" : ""}" text-anchor="middle">${t[0]}</text>${i ? `<text x="${t[1]}" y="${t[2] + 33}" class="ax sm" text-anchor="middle">${t[3]} km</text>` : ""}`; });
    s += `<text x="8" y="16" class="ax">Pendler je Werktag (Tsd.), ${yr}</text></svg>`;
    return s;
  }
  function flowsFig() {
    return `<figure class="vis" data-flows><figcaption><strong>Pendlerströme in die Kernstadt, Region Südwestfeld</strong></figcaption><div class="seg sm" role="radiogroup" aria-label="Jahr"><button role="radio" aria-checked="false" data-yr="2019">2019</button><button role="radio" aria-checked="true" data-yr="2025">2025</button></div><div class="vis-box fl">${flows("2025")}</div><p class="vis-src">Fiktive Region, Beispieldaten · Pfeilbreite = Zahl der Pendler</p></figure>`;
  }

  /* ---------- Interaktive Stadtkarte «Rheinfeld» ---------- */
  // Distrikte: [id, Name, Nutzung, Polygon, Nacht-ΔT °C, Grünanteil %, Einwohner/km², Mietindex]
  const DIST = [
    ["alt", "Altstadt", "Mischnutzung/Einzelhandel", "450,300 520,280 560,330 530,390 460,395 425,345", 5.8, 6, 9800, 124],
    ["cbd", "Bankenviertel (CBD)", "Büro/Dienstleistung", "560,330 640,300 690,350 650,410 590,420 530,390", 6.2, 4, 3200, 131],
    ["gruend", "Gründerzeitviertel", "Wohnen, dicht", "400,230 520,200 640,230 640,300 560,330 520,280 450,300 425,345 380,330", 4.6, 12, 14200, 112],
    ["ind", "Industrie- und Hafengebiet", "Gewerbe/Industrie", "640,410 760,380 840,430 820,520 700,520 650,470", 5.1, 5, 400, 70],
    ["gws", "Großwohnsiedlung Ost", "Wohnen, Hochhäuser", "690,230 800,210 860,280 820,350 760,380 690,350 640,300 640,230", 3.9, 28, 11200, 81],
    ["sued", "Südstadt", "Wohnen, gemischt", "425,345 460,395 530,390 590,420 650,470 600,540 470,550 390,470", 3.4, 22, 7600, 96],
    ["park", "Stadtpark", "Grünfläche", "300,300 380,330 390,470 330,480 280,400", 0.9, 92, 0, null],
    ["west", "Grüngürtel West (Frischluftschneise)", "Wald/Landwirtschaft", "40,160 300,200 300,300 280,400 230,560 40,560", 0.2, 88, 150, null],
    ["nord", "Villenviertel Nord", "Wohnen, locker", "300,60 560,40 700,90 690,230 640,230 520,200 400,230 300,200", 2.4, 46, 3100, 138],
    ["suburb", "Neubaugebiet Ostfeld", "Einfamilienhäuser", "860,280 980,250 990,420 840,430 820,350", 1.8, 38, 2600, 103],
    ["log", "Logistikpark A 44", "Logistik", "820,520 990,480 990,640 760,640 700,520", 3.2, 8, 0, null]
  ];
  const SHORT = { cbd: "CBD", gruend: "Gründerzeit", ind: "Hafen/Industrie", gws: "Großwohnsiedl.", west: "Grüngürtel", nord: "Villenviertel", suburb: "Ostfeld", log: "Logistikpark" };
  const LAYERS = {
    use: { name: "Flächennutzung", legend: [["u-wohn", "Wohnen"], ["u-misch", "Mischnutzung/Innenstadt"], ["u-gew", "Gewerbe/Industrie/Logistik"], ["u-gruen", "Grün/Wald"]] },
    heat: { name: "Nächtliche Überwärmung (°C)", legend: [["h5", "> 5"], ["h4", "4–5"], ["h3", "3–4"], ["h2", "1,5–3"], ["h1", "< 1,5"]] },
    green: { name: "Grünanteil (%)", legend: [["g4", "> 60"], ["g3", "25–60"], ["g2", "10–25"], ["g1", "< 10"]] },
    flood: { name: "Überschwemmungsgebiet HQ100", legend: [["fl", "Überflutungsfläche bei 100-jährlichem Hochwasser"]] },
    oepnv: { name: "Stadtbahn und Haltestellen", legend: [["ov", "Stadtbahnlinie"]] }
  };
  function useClass(n) { return /Grün|Wald/.test(n) ? "u-gruen" : /Gewerbe|Logistik|Industrie/.test(n) ? "u-gew" : /Misch|Büro/.test(n) ? "u-misch" : "u-wohn"; }
  function heatClass(t) { return t > 5 ? "h5" : t >= 4 ? "h4" : t >= 3 ? "h3" : t >= 1.5 ? "h2" : "h1"; }
  function greenClass(g) { return g > 60 ? "g4" : g >= 25 ? "g3" : g >= 10 ? "g2" : "g1"; }
  window.CITY = DIST;
  function cityMap(opts) {
    opts = opts || {}; const layer = opts.layer || "use"; const id = "cm" + Math.random().toString(36).slice(2, 7);
    const fill = (d) => layer === "heat" ? heatClass(d[4]) : layer === "green" ? greenClass(d[5]) : useClass(d[2]);
    let s = `<svg viewBox="0 0 1000 650" class="citysvg" id="${id}" role="img" aria-label="Karte der Modellstadt Rheinfeld, Ebene ${LAYERS[layer].name}"><g class="pz">`;
    s += `<rect x="0" y="0" width="1000" height="650" class="bg"/>`;
    DIST.forEach((d) => { s += `<polygon points="${d[3]}" class="dist ${layer === "flood" || layer === "oepnv" ? useClass(d[2]) + " dim" : fill(d)}" data-id="${d[0]}" tabindex="0" aria-label="${esc(d[1])}"/>`; });
    s += `<path d="M0 470 C 150 430, 260 520, 360 500 S 560 460, 640 470 S 820 560, 1000 560" class="river"/><text x="120" y="455" class="lbl it">Rhein</text>`;
    if (layer === "flood") s += `<path d="M0 450 C 150 400, 260 490, 360 470 S 560 430, 640 440 S 820 530, 1000 530 L 1000 600 C 820 600, 700 510, 640 505 S 460 540, 360 535 S 150 470, 0 500 Z" class="flood"/>`;
    s += `<path d="M20 600 C 300 610, 600 620, 990 470" class="motorway"/><text x="880" y="500" class="lbl">A 44</text>`;
    if (layer === "oepnv") { s += `<polyline points="100,120 300,200 450,300 560,330 690,350 860,300 960,300" class="tram"/><polyline points="420,60 500,200 520,280 530,390 520,520 480,620" class="tram"/>`; [[300, 200], [450, 300], [560, 330], [690, 350], [860, 300], [500, 200], [530, 390], [520, 520]].forEach((p) => { s += `<circle cx="${p[0]}" cy="${p[1]}" r="9" class="stop"/>`; }); }
    DIST.forEach((d) => { const pts = d[3].split(" ").map((p) => p.split(",").map(Number)); const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length, cy = pts.reduce((a, p) => a + p[1], 0) / pts.length; s += `<text x="${cx}" y="${cy}" class="lbl dl" text-anchor="middle">${esc(SHORT[d[0]] || d[1].split(" (")[0])}</text>${layer === "heat" ? `<text x="${cx}" y="${cy + 24}" class="lbl val" text-anchor="middle">+${String(d[4]).replace(".", ",")} °C</text>` : ""}${layer === "green" ? `<text x="${cx}" y="${cy + 24}" class="lbl val" text-anchor="middle">${d[5]} %</text>` : ""}`; });
    s += `<g class="measure"></g></g>`;
    s += `<g class="scale" transform="translate(30,610)"><rect x="0" y="0" width="100" height="8" class="sb1"/><rect x="100" y="0" width="100" height="8" class="sb2"/><text x="0" y="-6" class="lbl sm">0</text><text x="100" y="-6" class="lbl sm" text-anchor="middle">500 m</text><text x="200" y="-6" class="lbl sm" text-anchor="middle">1 km</text></g><g transform="translate(960,40)"><path d="M0 -22 L9 10 L0 4 L-9 10 Z" class="north"/><text x="0" y="28" class="lbl sm" text-anchor="middle">N</text></g></svg>`;
    return { svg: s, id };
  }
  window.LAYERS = LAYERS;

  /* Interaktiver Kartenbaustein: Zoom, Verschieben, Ebenen, Legende, Messen, Suchen, Vergleichen */
  window.MapWidget = function (host, opts) {
    opts = opts || {}; let layer = opts.layer || "use"; let mode = "info"; let scale = 1, tx = 0, ty = 0; let mpts = [], cmp = [];
    const el = document.createElement("div"); el.className = "mapw";
    host.appendChild(el);
    function render() {
      const m = cityMap({ layer });
      el.innerHTML = `<div class="map-tools" role="toolbar" aria-label="Kartenwerkzeuge">
        <label class="lyr">Ebene <select aria-label="Kartenebene">${Object.entries(LAYERS).map(([k, l]) => `<option value="${k}" ${k === layer ? "selected" : ""}>${l.name}</option>`).join("")}</select></label>
        <div class="seg sm" role="radiogroup" aria-label="Werkzeug">${[["info", "Info"], ["measure", "Messen"], ["compare", "Vergleichen"]].map(([k, l]) => `<button role="radio" aria-checked="${k === mode}" data-mode="${k}">${l}</button>`).join("")}</div>
        <div class="zoom"><button data-z="in" aria-label="Vergrößern">+</button><button data-z="out" aria-label="Verkleinern">−</button><button data-z="reset" aria-label="Ansicht zurücksetzen">⤢</button></div></div>
        <div class="map-view">${m.svg}</div>
        <div class="legend"><strong>${LAYERS[layer].name}</strong>${LAYERS[layer].legend.map((l) => `<span><i class="sw ${l[0]}"></i>${l[1]}</span>`).join("")}</div>
        <div class="map-out" aria-live="polite">${mode === "measure" ? "Tippe zwei Punkte auf der Karte an, um die Entfernung zu messen." : mode === "compare" ? "Tippe zwei Viertel an, um sie zu vergleichen." : "Tippe ein Viertel an, um seine Merkmale zu sehen. Ziehen verschiebt, + und − zoomen."}</div>
        <p class="vis-src">Modellstadt Rheinfeld: fiktive Stadt, Beispieldaten · Maßstab: 100 Karteneinheiten = 500 m</p>`;
      const svg = el.querySelector("svg"), g = svg.querySelector(".pz"); apply();
      function apply() { g.setAttribute("transform", `translate(${tx} ${ty}) scale(${scale})`); }
      el.querySelector("select").onchange = (e) => { layer = e.target.value; render(); };
      el.querySelectorAll("[data-mode]").forEach((b) => b.onclick = () => { mode = b.dataset.mode; mpts = []; cmp = []; render(); });
      el.querySelectorAll("[data-z]").forEach((b) => b.onclick = () => { const z = b.dataset.z; if (z === "reset") { scale = 1; tx = ty = 0; } else { const f = z === "in" ? 1.35 : 1 / 1.35; const ns = Math.min(4, Math.max(1, scale * f)); tx = 500 - (500 - tx) * (ns / scale); ty = 325 - (325 - ty) * (ns / scale); scale = ns; } clamp(); apply(); });
      function clamp() { tx = Math.min(0, Math.max(1000 - 1000 * scale, tx)); ty = Math.min(0, Math.max(650 - 650 * scale, ty)); }
      function toMap(ev) { const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY; const p = pt.matrixTransform(svg.getScreenCTM().inverse()); return [(p.x - tx) / scale, (p.y - ty) / scale]; }
      let drag = null, moved = false; const pointers = new Map(); let pinch0 = 0;
      svg.addEventListener("pointerdown", (e) => { pointers.set(e.pointerId, e); if (pointers.size === 2) { const [a, b] = [...pointers.values()]; pinch0 = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); } drag = { x: e.clientX, y: e.clientY, tx, ty }; moved = false; });
      svg.addEventListener("pointermove", (e) => {
        if (!pointers.has(e.pointerId)) return; pointers.set(e.pointerId, e);
        if (pointers.size === 2) { const [a, b] = [...pointers.values()]; const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); if (pinch0) { const ns = Math.min(4, Math.max(1, scale * d / pinch0)); tx = 500 - (500 - tx) * (ns / scale); ty = 325 - (325 - ty) * (ns / scale); scale = ns; pinch0 = d; clamp(); apply(); moved = true; } return; }
        if (!drag || scale === 1) return; const r = svg.getBoundingClientRect(); const k = 1000 / r.width; const dx = (e.clientX - drag.x) * k, dy = (e.clientY - drag.y) * k; if (Math.abs(dx) + Math.abs(dy) > 6) moved = true; tx = drag.tx + dx; ty = drag.ty + dy; clamp(); apply();
      });
      const up = (e) => { pointers.delete(e.pointerId); if (pointers.size < 2) pinch0 = 0; if (pointers.size === 0) drag = null; };
      svg.addEventListener("pointerup", up); svg.addEventListener("pointercancel", up);
      svg.addEventListener("click", (e) => {
        if (moved) return; const out = el.querySelector(".map-out");
        if (mode === "measure") {
          const p = toMap(e); mpts.push(p); const mg = svg.querySelector(".measure");
          mg.innerHTML += `<circle cx="${p[0]}" cy="${p[1]}" r="8" class="mpt"/>`;
          if (mpts.length === 2) { const [a, b] = mpts; const d = Math.hypot(a[0] - b[0], a[1] - b[1]) * 5; mg.innerHTML += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="mline"/>`; out.innerHTML = `Entfernung: <strong>${d >= 1000 ? (d / 1000).toFixed(2).replace(".", ",") + " km" : Math.round(d) + " m"}</strong> (Luftlinie). Rechnung: Kartenstrecke × 5 m je Karteneinheit.`; mpts = []; if (window.recordTags) recordTags(["karten", "methoden"], true); }
          else out.textContent = "Ersten Punkt gesetzt – tippe den zweiten Punkt an.";
          return;
        }
        const t = e.target.closest(".dist"); if (!t) return; const d = DIST.find((x) => x[0] === t.dataset.id);
        const info = (x) => `<strong>${esc(x[1])}</strong><br>Nutzung: ${esc(x[2])}<br>Nächtliche Überwärmung: +${String(x[4]).replace(".", ",")} °C<br>Grünanteil: ${x[5]} %<br>Einwohner je km²: ${x[6].toLocaleString("de-DE")}${x[7] ? `<br>Mietindex (Stadt = 100): ${x[7]}` : ""}`;
        if (opts.onPick && opts.onPick(d, t)) return;
        if (mode === "compare") { cmp.push(d); t.classList.add("sel"); if (cmp.length === 2) { const [a, b] = cmp; out.innerHTML = `<div class="cmp"><div>${info(a)}</div><div>${info(b)}</div></div><p class="small">Unterschied Überwärmung: ${String(Math.abs(a[4] - b[4]).toFixed(1)).replace(".", ",")} °C · Grünanteil: ${Math.abs(a[5] - b[5])} Prozentpunkte</p>`; cmp = []; setTimeout(() => svg.querySelectorAll(".sel").forEach((x) => x.classList.remove("sel")), 1500); } else out.innerHTML = `${esc(d[1])} gewählt – tippe ein zweites Viertel an.`; return; }
        out.innerHTML = info(d);
      });
      svg.addEventListener("keydown", (e) => { const t = e.target.closest(".dist"); if (t && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); t.dispatchEvent(new MouseEvent("click", { bubbles: true })); } });
    }
    render();
    return { setLayer(l) { layer = l; render(); }, el };
  };

  /* ---------- Einheitlicher Aufruf ---------- */
  window.renderVis = function (key, host) {
    let html = "";
    if (key && key.startsWith("climate")) html = climate(key);
    else if (key === "bar_irrig" || key === "bar_season") html = bars(key);
    else if (key === "bar_urban") html = groupBars(key);
    else if (key === "line_aral" || key === "line_sectors") html = lines(key);
    else if (key === "scatter_regions") html = scatter(key);
    else if (key && key.startsWith("pyramid")) html = pyramid(key);
    else if (key === "choropleth" || key === "bar_sdg") html = choropleth();
    else if (key === "map_flows") html = flowsFig();
    else if (key === "map_city" || key === "map_heat") { if (host) { const box = document.createElement("div"); box.className = "vis"; box.innerHTML = `<figcaption><strong>Modellstadt Rheinfeld${key === "map_heat" ? ": nächtliche Überwärmung bei Hitzewetterlage" : ""}</strong></figcaption>`; host.appendChild(box); MapWidget(box, { layer: key === "map_heat" ? "heat" : "use" }); return; } html = cityMap({ layer: key === "map_heat" ? "heat" : "use" }).svg; }
    if (!host) return html;
    const d = document.createElement("div"); d.innerHTML = html; const fig = d.firstElementChild; host.appendChild(fig);
    if (key === "map_flows") fig.querySelectorAll("[data-yr]").forEach((b) => b.onclick = () => { fig.querySelectorAll("[data-yr]").forEach((x) => x.setAttribute("aria-checked", x === b)); fig.querySelector(".fl").innerHTML = flows(b.dataset.yr); });
  };
})();
