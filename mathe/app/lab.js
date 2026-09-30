/* ===== Graph-Labor: Funktionsplotter, Histogramm, Normalverteilung (SVG, offline) ===== */
(function () {
  const W = 640, H = 400, PAD = 34;
  const fmtN = (v, d = 2) => (Math.round(v * 10 ** d) / 10 ** d).toString().replace(".", ",");
  window.fmtN = fmtN;
  function niceStep(r) { const e = Math.pow(10, Math.floor(Math.log10(r / 6))); const m = r / 6 / e; return (m < 1.5 ? 1 : m < 3 ? 2 : m < 7 ? 5 : 10) * e; }

  /* Plot: v = {xmin,xmax,ymin,ymax}, fns = [{f, cls, label, dash}], shade = {f, g?, a, b}, pts = [{x,y,label}] */
  function plotSVG(v, fns, shade, pts, vlines) {
    const X = (x) => PAD + ((x - v.xmin) / (v.xmax - v.xmin)) * (W - 2 * PAD);
    const Y = (y) => H - PAD - ((y - v.ymin) / (v.ymax - v.ymin)) * (H - 2 * PAD);
    let g = "";
    const sx = niceStep(v.xmax - v.xmin), sy = niceStep(v.ymax - v.ymin);
    for (let x = Math.ceil(v.xmin / sx) * sx; x <= v.xmax + 1e-9; x += sx) g += `<line class="grid" x1="${X(x)}" x2="${X(x)}" y1="${PAD}" y2="${H - PAD}"/><text class="ax" x="${X(x)}" y="${Math.min(H - PAD + 14, Math.max(PAD + 12, Y(0) + 14))}" text-anchor="middle">${Math.abs(x) < 1e-9 ? "" : fmtN(x)}</text>`;
    for (let y = Math.ceil(v.ymin / sy) * sy; y <= v.ymax + 1e-9; y += sy) g += `<line class="grid" y1="${Y(y)}" y2="${Y(y)}" x1="${PAD}" x2="${W - PAD}"/><text class="ax" y="${Y(y) + 4}" x="${Math.min(W - PAD - 4, Math.max(PAD + 2, X(0) - 5))}" text-anchor="end">${Math.abs(y) < 1e-9 ? "" : fmtN(y)}</text>`;
    if (v.ymin <= 0 && v.ymax >= 0) g += `<line class="axis" x1="${PAD}" x2="${W - PAD}" y1="${Y(0)}" y2="${Y(0)}"/>`;
    if (v.xmin <= 0 && v.xmax >= 0) g += `<line class="axis" y1="${PAD}" y2="${H - PAD}" x1="${X(0)}" x2="${X(0)}"/>`;
    if (shade) {
      const N = 160; let d = ""; const a = Math.max(shade.a, v.xmin), b = Math.min(shade.b, v.xmax);
      if (b > a) {
        for (let i = 0; i <= N; i++) { const x = a + ((b - a) * i) / N; d += (i ? "L" : "M") + X(x).toFixed(1) + "," + Y(clampY(shade.f(x), v)).toFixed(1); }
        for (let i = N; i >= 0; i--) { const x = a + ((b - a) * i) / N; d += "L" + X(x).toFixed(1) + "," + Y(clampY(shade.g ? shade.g(x) : 0, v)).toFixed(1); }
        g += `<path class="shade" d="${d}Z"/>`;
      }
    }
    (vlines || []).forEach((l) => { g += `<line class="vline" x1="${X(l.x)}" x2="${X(l.x)}" y1="${PAD}" y2="${H - PAD}"/>${l.label ? `<text class="lbl" x="${X(l.x) + 4}" y="${PAD + 12}">${l.label}</text>` : ""}`; });
    fns.forEach((fn) => {
      let d = "", pen = false, prev = null; const N = 500;
      for (let i = 0; i <= N; i++) {
        const x = v.xmin + ((v.xmax - v.xmin) * i) / N; let y = fn.f(x);
        if (!isFinite(y) || Math.abs(y) > 1e6 || (prev != null && Math.abs(y - prev) > (v.ymax - v.ymin) * 3)) { pen = false; prev = isFinite(y) ? y : null; continue; }
        d += (pen ? "L" : "M") + X(x).toFixed(1) + "," + Y(clampY(y, v)).toFixed(1); pen = true; prev = y;
      }
      g += `<path class="curve ${fn.cls || ""}" d="${d}" ${fn.dash ? 'stroke-dasharray="6 5"' : ""}/>`;
    });
    (pts || []).forEach((p) => { if (p.x >= v.xmin && p.x <= v.xmax && p.y >= v.ymin && p.y <= v.ymax) g += `<circle class="pt" cx="${X(p.x)}" cy="${Y(p.y)}" r="5"/>${p.label ? `<text class="lbl" x="${X(p.x) + 7}" y="${Y(p.y) - 7}">${p.label}</text>` : ""}`; });
    return `<svg class="plot" viewBox="0 0 ${W} ${H}" role="img" aria-label="Funktionsgraph">${g}</svg>`;
  }
  function clampY(y, v) { const r = v.ymax - v.ymin; return Math.max(v.ymin - r, Math.min(v.ymax + r, y)); }
  window.plotSVG = plotSVG;

  function histSVG(probs, opts) {
    const n = probs.length - 1, maxP = Math.max(...probs) * 1.12 || 1;
    const bw = (W - 2 * PAD) / (n + 1);
    const X = (k) => PAD + k * bw, Y = (p) => H - PAD - (p / maxP) * (H - 2 * PAD);
    let g = "";
    const sy = niceStep(maxP);
    for (let y = 0; y <= maxP + 1e-12; y += sy) g += `<line class="grid" y1="${Y(y)}" y2="${Y(y)}" x1="${PAD}" x2="${W - PAD}"/><text class="ax" x="${PAD - 4}" y="${Y(y) + 4}" text-anchor="end">${fmtN(y, 3)}</text>`;
    probs.forEach((p, k) => { const on = k >= opts.lo && k <= opts.hi; g += `<rect class="${on ? "bar on" : "bar"}" x="${X(k) + 0.5}" y="${Y(p)}" width="${Math.max(1, bw - 1)}" height="${H - PAD - Y(p)}"><title>P(X=${k}) = ${fmtN(p, 4)}</title></rect>`; });
    const step = Math.max(1, Math.ceil((n + 1) / 16));
    for (let k = 0; k <= n; k += step) g += `<text class="ax" x="${X(k) + bw / 2}" y="${H - PAD + 14}" text-anchor="middle">${k}</text>`;
    (opts.lines || []).forEach((l) => { const xx = PAD + (l.x + 0.5) * bw; g += `<line class="vline" x1="${xx}" x2="${xx}" y1="${PAD}" y2="${H - PAD}"/><text class="lbl" x="${xx + 4}" y="${PAD + 12}">${l.label}</text>`; });
    return `<svg class="plot" viewBox="0 0 ${W} ${H}" role="img" aria-label="Histogramm">${g}</svg>`;
  }

  /* ---- Mathematik-Helfer ---- */
  const lnFact = (() => { const c = [0]; for (let i = 1; i <= 1000; i++) c[i] = c[i - 1] + Math.log(i); return (n) => c[n]; })();
  window.binomPMF = (n, p, k) => (k < 0 || k > n ? 0 : p === 0 ? (k === 0 ? 1 : 0) : p === 1 ? (k === n ? 1 : 0) : Math.exp(lnFact(n) - lnFact(k) - lnFact(n - k) + k * Math.log(p) + (n - k) * Math.log(1 - p)));
  function erf(x) { const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return s * y; }
  window.normCDF = (x, m, s) => 0.5 * (1 + erf((x - m) / (s * Math.SQRT2)));
  window.normPDF = (x, m, s) => Math.exp(-0.5 * ((x - m) / s) ** 2) / (s * Math.sqrt(2 * Math.PI));
  window.simpson = function (f, a, b, n = 400) { if (a === b) return 0; const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return (s * h) / 3; };
  const dnum = (f, x) => (f(x + 1e-5) - f(x - 1e-5)) / 2e-5;
  function roots(f, a, b, N = 800) { const r = []; let px = a, py = f(a); for (let i = 1; i <= N; i++) { const x = a + ((b - a) * i) / N, y = f(x); if (isFinite(py) && isFinite(y)) { if (py === 0) r.push(px); else if (py * y < 0) { let lo = px, hi = x; for (let j = 0; j < 50; j++) { const mid = (lo + hi) / 2; if (f(lo) * f(mid) <= 0) hi = mid; else lo = mid; } r.push((lo + hi) / 2); } } px = x; py = y; } return r.filter((x, i, arr) => i === 0 || Math.abs(x - arr[i - 1]) > 1e-4); }

  /* ---- Laborkonfigurationen ---- */
  const LABS = {
    poly: { title: "Ganzrationale Funktion 3. Grades", tex: "f(x)=ax^3+bx^2+cx+d",
      params: [["a", -2, 2, 0.1, 1], ["b", -4, 4, 0.5, -3], ["c", -6, 6, 0.5, -4], ["d", -6, 6, 0.5, 0]],
      view: { xmin: -4, xmax: 6, ymin: -20, ymax: 15 },
      draw(p) { const f = (x) => p.a * x ** 3 + p.b * x ** 2 + p.c * x + p.d; const fp = (x) => 3 * p.a * x * x + 2 * p.b * x + p.c;
        const ns = roots(f, -4, 6), ex = roots(fp, -4, 6);
        return { fns: [{ f }], pts: ns.map((x) => ({ x, y: 0 })).concat(ex.map((x) => ({ x, y: f(x), label: (6 * p.a * x + 2 * p.b < 0 ? "HP" : "TP") }))),
          info: `Nullstellen im Bild: ${ns.map((x) => fmtN(x)).join("; ") || "keine"}<br>Extremstellen: ${ex.map((x) => fmtN(x)).join("; ") || "keine"}<br>${p.a > 0 ? "Für $x\\to+\\infty$ gilt $f(x)\\to+\\infty$." : p.a < 0 ? "Für $x\\to+\\infty$ gilt $f(x)\\to-\\infty$." : "Für $a=0$ ist $f$ quadratisch."}` }; } },
    tangent: { title: "Tangente und Ableitung", tex: "f(x)=\\tfrac13x^3-x^2-3x+2",
      params: [["x_0", -3, 5, 0.1, 0]],
      view: { xmin: -4, xmax: 6, ymin: -12, ymax: 10 },
      draw(p) { const f = (x) => x ** 3 / 3 - x * x - 3 * x + 2, fp = (x) => x * x - 2 * x - 3; const x0 = p.x_0, m = fp(x0), y0 = f(x0);
        return { fns: [{ f }, { f: (x) => m * (x - x0) + y0, cls: "c2" }, { f: fp, cls: "c3", dash: true }], pts: [{ x: x0, y: y0, label: "P" }],
          info: `$f'(${fmtN(x0)})=${fmtN(m)}$ – Steigung der Tangente (rot). Gestrichelt: Graph von $f'$.<br>Tangente: $t(x)=${fmtN(m)}(x-${fmtN(x0)})+${fmtN(y0)}$<br>${Math.abs(m) < 0.15 ? "<strong>Waagerechte Tangente – Kandidat für eine Extremstelle.</strong>" : ""}` }; } },
    exp: { title: "Exponentialfunktion", tex: "f(t)=a\\cdot e^{kt}",
      params: [["a", 0.5, 5, 0.1, 2], ["k", -1, 1, 0.05, 0.3]],
      view: { xmin: -4, xmax: 8, ymin: -1, ymax: 20 },
      draw(p) { const f = (x) => p.a * Math.exp(p.k * x);
        return { fns: [{ f }, { f: (x) => p.k * f(x), cls: "c3", dash: true }], pts: [{ x: 0, y: p.a, label: "a" }],
          info: `${p.k > 0 ? `Wachstum, Verdopplungszeit $T_2=\\tfrac{\\ln 2}{k}\\approx${fmtN(Math.log(2) / p.k)}$` : p.k < 0 ? `Zerfall, Halbwertszeit $\\approx${fmtN(Math.log(2) / -p.k)}$` : "konstant"}.<br>Gestrichelt: $f'(t)=k\\cdot f(t)$ – die Änderungsrate ist proportional zum Bestand.` }; } },
    ln: { title: "ln als Umkehrfunktion von e (LK)", tex: "f(x)=\\ln(x-c),\\ \\ \\bar f(x)=e^x+c",
      params: [["c", -3, 3, 0.5, 0]],
      view: { xmin: -4, xmax: 8, ymin: -4, ymax: 8 },
      draw(p) { return { fns: [{ f: (x) => (x - p.c > 0 ? Math.log(x - p.c) : NaN) }, { f: (x) => Math.exp(x) + p.c, cls: "c2" }, { f: (x) => x, cls: "c3", dash: true }], pts: [{ x: 1 + p.c, y: 0, label: "Nullstelle" }],
        info: `Definitionsbereich von $\\ln(x-${fmtN(p.c)})$: $x>${fmtN(p.c)}$, senkrechte Asymptote $x=${fmtN(p.c)}$. Spiegelung an $y=x$ (gestrichelt) liefert die Umkehrfunktion.` }; } },
    trig: { title: "Sinusfunktion", tex: "f(x)=a\\sin(bx+c)+d",
      params: [["a", -3, 3, 0.1, 2], ["b", 0.25, 3, 0.05, 1], ["c", -3.2, 3.2, 0.1, 0], ["d", -3, 3, 0.1, 1]],
      view: { xmin: -7, xmax: 7, ymin: -6, ymax: 6 },
      draw(p) { const f = (x) => p.a * Math.sin(p.b * x + p.c) + p.d;
        return { fns: [{ f }, { f: () => p.d, cls: "c3", dash: true }], pts: [],
          info: `Amplitude $|a|=${fmtN(Math.abs(p.a))}$, Periode $p=\\tfrac{2\\pi}{b}\\approx${fmtN(2 * Math.PI / p.b)}$, Mittellinie $y=${fmtN(p.d)}$, Wertebereich $[${fmtN(p.d - Math.abs(p.a))};\\,${fmtN(p.d + Math.abs(p.a))}]$, Verschiebung in $x$-Richtung $-\\tfrac cb\\approx${fmtN(-p.c / p.b)}$.` }; } },
    trans: { title: "Transformationen von √x und 1/x", tex: "g(x)=a\\,f(b(x-c))+d",
      params: [["Basis", 0, 1, 1, 0], ["a", -3, 3, 0.5, 1], ["b", 0.5, 3, 0.5, 1], ["c", -3, 3, 0.5, 0], ["d", -3, 3, 0.5, 0]],
      view: { xmin: -6, xmax: 8, ymin: -6, ymax: 6 },
      draw(p) { const base = p.Basis < 0.5 ? (u) => (u >= 0 ? Math.sqrt(u) : NaN) : (u) => (u === 0 ? NaN : 1 / u);
        const g = (x) => p.a * base(p.b * (x - p.c)) + p.d;
        return { fns: [{ f: base, cls: "c3", dash: true }, { f: g }], pts: [],
          info: `Basisfunktion: ${p.Basis < 0.5 ? "$f(x)=\\sqrt x$" : "$f(x)=\\tfrac1x$"} (gestrichelt; Regler „Basis“ auf 0 bzw. 1).<br>Verschiebung um ${fmtN(p.c)} nach rechts und ${fmtN(p.d)} nach oben, Streckfaktor ${fmtN(p.a)} in $y$-Richtung${p.a < 0 ? " mit Spiegelung an der $x$-Achse" : ""}.` }; } },
    schar: { title: "Funktionenschar (LK)", tex: "f_t(x)=x^3-3tx",
      params: [["t", -2, 4, 0.1, 1]],
      view: { xmin: -4, xmax: 4, ymin: -12, ymax: 12 },
      draw(p) { const f = (x) => x ** 3 - 3 * p.t * x; const pts = [];
        if (p.t > 0) { const s = Math.sqrt(p.t); pts.push({ x: s, y: f(s), label: "T" }, { x: -s, y: f(-s), label: "H" }); }
        return { fns: [{ f }, { f: (x) => (x > 0 ? -2 * x ** 3 : NaN), cls: "c3", dash: true }], pts,
          info: p.t > 0 ? `Tiefpunkt $T(${fmtN(Math.sqrt(p.t))}\\,|\\,${fmtN(-2 * p.t ** 1.5)})$. Gestrichelt: Ortskurve $y=-2x^3$ – alle Tiefpunkte liegen darauf.` : `Für $t\\le0$ gibt es keine Extrempunkte ($f_t'(x)=3x^2-3t\\ge0$).` }; } },
    integral: { title: "Bestimmtes Integral und Fläche", tex: "f(x)=\\tfrac12x^2-2",
      params: [["a", -4, 4, 0.1, -3], ["b", -4, 4, 0.1, 3]],
      view: { xmin: -4.5, xmax: 4.5, ymin: -3, ymax: 7 },
      draw(p) { const f = (x) => 0.5 * x * x - 2; const a = Math.min(p.a, p.b), b = Math.max(p.a, p.b);
        const I = simpson(f, a, b); const A = simpson((x) => Math.abs(f(x)), a, b, 800);
        return { fns: [{ f }], shade: { f, a, b }, pts: [{ x: -2, y: 0 }, { x: 2, y: 0 }],
          info: `$\\int_{${fmtN(a)}}^{${fmtN(b)}}f(x)\\,dx\\approx${fmtN(I, 3)}$ (orientiert) &nbsp;·&nbsp; Flächeninhalt $\\approx${fmtN(A, 3)}$.<br>${Math.abs(I - A) > 1e-3 ? "Integral und Flächeninhalt unterscheiden sich, weil Teile unter der $x$-Achse liegen (Nullstellen $\\pm2$)." : "Kein Teil liegt unter der $x$-Achse: Integral = Flächeninhalt."}` }; } }
  };
  window.LABS = LABS;

  window.Lab = function (host, key) {
    if (key === "binom") return BinomLab(host);
    if (key === "normal") return NormalLab(host);
    const L = LABS[key]; if (!L) { host.innerHTML = `<p class="muted">Kein Labor für dieses Thema.</p>`; return; }
    const p = {}; L.params.forEach((q) => (p[q[0]] = q[4]));
    const el = h(`<div class="lab"><p class="lbl">${esc(L.title)}</p><p class="labf">${tex(L.tex, true)}</p><div class="plotbox"></div>
      <div class="sliders">${L.params.map((q) => `<label><span>${tex(q[0] === "Basis" ? "\\text{Basis}" : q[0], false)} = <b class="mono" data-v="${q[0]}">${fmtN(q[4])}</b></span><input type="range" min="${q[1]}" max="${q[2]}" step="${q[3]}" value="${q[4]}" data-p="${q[0]}" aria-label="${esc(q[0])}"></label>`).join("")}</div>
      <p class="labinfo"></p></div>`);
    host.appendChild(el);
    const draw = () => { const r = L.draw(p); $(".plotbox", el).innerHTML = plotSVG(L.view, r.fns, r.shade, r.pts, r.vlines); $(".labinfo", el).innerHTML = md(r.info); };
    el.addEventListener("input", (e) => { const s = e.target.closest("[data-p]"); if (!s) return; p[s.dataset.p] = +s.value; $(`[data-v="${s.dataset.p}"]`, el).textContent = fmtN(+s.value); draw(); });
    draw();
  };

  function BinomLab(host) {
    const st = { n: 20, p: 0.3, lo: 4, hi: 8 };
    const el = h(`<div class="lab"><p class="lbl"></p><div class="plotbox"></div>
      <div class="sliders">${[["n", 1, 100, 1, "$n$"], ["p", 0.01, 0.99, 0.01, "$p$"], ["lo", 0, 100, 1, "von $k$"], ["hi", 0, 100, 1, "bis $k$"]].map((q) => `<label><span>${md(q[4])} = <b class="mono" data-v="${q[0]}"></b></span><input type="range" min="${q[1]}" max="${q[2]}" step="${q[3]}" value="${st[q[0]]}" data-p="${q[0]}"></label>`).join("")}</div><p class="labinfo"></p></div>`);
    host.appendChild(el); el.querySelector(".lbl").innerHTML = md("Binomialverteilung $B(n;p)$");
    function draw() {
      st.lo = Math.min(st.lo, st.n); st.hi = Math.min(Math.max(st.hi, st.lo), st.n);
      const probs = []; for (let k = 0; k <= st.n; k++) probs.push(binomPMF(st.n, st.p, k));
      const mu = st.n * st.p, sg = Math.sqrt(st.n * st.p * (1 - st.p));
      let P = 0; for (let k = st.lo; k <= st.hi; k++) P += probs[k];
      $(".plotbox", el).innerHTML = histSVG(probs, { lo: st.lo, hi: st.hi, lines: [{ x: mu, label: "μ" }].concat(mu - 2 * sg >= 0 ? [{ x: mu - 2 * sg, label: "μ−2σ" }] : []).concat(mu + 2 * sg <= st.n ? [{ x: mu + 2 * sg, label: "μ+2σ" }] : []) });
      ["n", "p", "lo", "hi"].forEach((k) => ($(`[data-v="${k}"]`, el).textContent = fmtN(st[k])));
      $(`[data-p="lo"]`, el).max = st.n; $(`[data-p="hi"]`, el).max = st.n;
      $(".labinfo", el).innerHTML = md(`$\\mu=${fmtN(mu)}$, $\\sigma\\approx${fmtN(sg)}$ ${sg > 3 ? "(Laplace-Bedingung $\\sigma>3$ erfüllt)" : "(σ ≤ 3: σ-Regeln ungenau)"}.<br>$P(${st.lo}\\le X\\le${st.hi})\\approx${fmtN(P, 4)}$ (markierte Balken).`);
    }
    el.addEventListener("input", (e) => { const s = e.target.closest("[data-p]"); if (!s) return; st[s.dataset.p] = +s.value; draw(); });
    draw();
  }

  function NormalLab(host) {
    const st = { mu: 500, sg: 4, a: 492, b: 508 };
    const el = h(`<div class="lab"><p class="lbl"></p><div class="plotbox"></div><div class="sliders">${[["mu", 480, 520, 1, "μ"], ["sg", 1, 10, 0.5, "σ"], ["a", 470, 530, 0.5, "a"], ["b", 470, 530, 0.5, "b"]].map((q) => `<label><span>${q[4]} = <b class="mono" data-v="${q[0]}"></b></span><input type="range" min="${q[1]}" max="${q[2]}" step="${q[3]}" value="${st[q[0]]}" data-p="${q[0]}"></label>`).join("")}</div><p class="labinfo"></p></div>`);
    host.appendChild(el); $(".lbl", el).innerHTML = md("Normalverteilung $N(\\mu;\\sigma)$ – Beispiel Füllmenge in ml");
    function draw() {
      const a = Math.min(st.a, st.b), b = Math.max(st.a, st.b); const f = (x) => normPDF(x, st.mu, st.sg);
      const ymax = f(st.mu) * 1.2; const v = { xmin: 470, xmax: 530, ymin: 0, ymax };
      $(".plotbox", el).innerHTML = plotSVG(v, [{ f }, { f: (x) => normCDF(x, st.mu, st.sg) * ymax * 0.8, cls: "c3", dash: true }], { f, a, b }, [{ x: st.mu - st.sg, y: f(st.mu - st.sg), label: "W" }, { x: st.mu + st.sg, y: f(st.mu + st.sg), label: "W" }], [{ x: st.mu, label: "μ" }]);
      ["mu", "sg", "a", "b"].forEach((k) => ($(`[data-v="${k}"]`, el).textContent = fmtN(st[k])));
      $(".labinfo", el).innerHTML = md(`$P(${fmtN(a)}\\le X\\le ${fmtN(b)})\\approx${fmtN(normCDF(b, st.mu, st.sg) - normCDF(a, st.mu, st.sg), 4)}$ (Fläche). Wendepunkte W bei $\\mu\\pm\\sigma$. Gestrichelt (skaliert): Verteilungsfunktion $\\Phi$.`);
    }
    el.addEventListener("input", (e) => { const s = e.target.closest("[data-p]"); if (!s) return; st[s.dataset.p] = +s.value; draw(); });
    draw();
  }
})();
