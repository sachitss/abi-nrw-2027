/* Abi Mathe 2027 – Offline-Speicher */
const CACHE = "abi-ma-2027-1.0.0-a1";
const FILES = [
 "./",
 "ANLEITUNG.html",
 "app/core.js",
 "app/data.js",
 "app/katex/fonts/KaTeX_AMS-Regular.woff2",
 "app/katex/fonts/KaTeX_Caligraphic-Bold.woff2",
 "app/katex/fonts/KaTeX_Caligraphic-Regular.woff2",
 "app/katex/fonts/KaTeX_Fraktur-Bold.woff2",
 "app/katex/fonts/KaTeX_Fraktur-Regular.woff2",
 "app/katex/fonts/KaTeX_Main-Bold.woff2",
 "app/katex/fonts/KaTeX_Main-BoldItalic.woff2",
 "app/katex/fonts/KaTeX_Main-Italic.woff2",
 "app/katex/fonts/KaTeX_Main-Regular.woff2",
 "app/katex/fonts/KaTeX_Math-BoldItalic.woff2",
 "app/katex/fonts/KaTeX_Math-Italic.woff2",
 "app/katex/fonts/KaTeX_SansSerif-Bold.woff2",
 "app/katex/fonts/KaTeX_SansSerif-Italic.woff2",
 "app/katex/fonts/KaTeX_SansSerif-Regular.woff2",
 "app/katex/fonts/KaTeX_Script-Regular.woff2",
 "app/katex/fonts/KaTeX_Size1-Regular.woff2",
 "app/katex/fonts/KaTeX_Size2-Regular.woff2",
 "app/katex/fonts/KaTeX_Size3-Regular.woff2",
 "app/katex/fonts/KaTeX_Size4-Regular.woff2",
 "app/katex/fonts/KaTeX_Typewriter-Regular.woff2",
 "app/katex/katex.min.css",
 "app/katex/katex.min.js",
 "app/lab.js",
 "app/qrcode.js",
 "app/views1.js",
 "app/views2.js",
 "app/views3.js",
 "fonts/atkinson-hyperlegible-latin-400-italic.woff2",
 "fonts/atkinson-hyperlegible-latin-400-normal.woff2",
 "fonts/atkinson-hyperlegible-latin-700-normal.woff2",
 "fonts/bricolage-grotesque-latin-500-normal.woff2",
 "fonts/bricolage-grotesque-latin-700-normal.woff2",
 "fonts/bricolage-grotesque-latin-800-normal.woff2",
 "fonts/fonts.css",
 "fonts/jetbrains-mono-latin-400-normal.woff2",
 "fonts/jetbrains-mono-latin-600-normal.woff2",
 "icons/apple-touch-icon.png",
 "icons/favicon-48.png",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/icon-maskable-512.png",
 "index.html",
 "install.html",
 "manifest.webmanifest"
];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES))); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("abi-ma-2027-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("message", (e) => { if (e.data === "skip") self.skipWaiting(); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match("index.html"))));
});
