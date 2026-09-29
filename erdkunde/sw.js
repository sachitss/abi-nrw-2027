/* Abi Geographie NRW 2027 – Offline-Speicher */
const CACHE = "abi-geo-2027-1.0.0-feb7c690";
const FILES = [
 "./",
 "index.html",
 "ANLEITUNG.html",
 "manifest.webmanifest",
 "fonts/fonts.css",
 "app/data_off.js",
 "app/data_topics.js",
 "app/data_cases.js",
 "app/data_media.js",
 "app/data_mocks.js",
 "app/data_dims.js",
 "app/core.js",
 "app/vis.js",
 "app/views_a.js",
 "app/views_b.js",
 "app/views_c.js",
 "fonts/atkinson-hyperlegible-latin-400-italic.woff2",
 "fonts/atkinson-hyperlegible-latin-400-normal.woff2",
 "fonts/atkinson-hyperlegible-latin-700-normal.woff2",
 "fonts/bricolage-grotesque-latin-500-normal.woff2",
 "fonts/bricolage-grotesque-latin-700-normal.woff2",
 "fonts/bricolage-grotesque-latin-800-normal.woff2",
 "fonts/jetbrains-mono-latin-400-normal.woff2",
 "fonts/jetbrains-mono-latin-600-normal.woff2",
 "icons/apple-touch-icon.png",
 "icons/favicon-48.png",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/icon-maskable-512.png",
 "install.html",
 "app/qrcode.js"
];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES))); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("abi-geo-2027-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("message", (e) => { if (e.data === "skip") self.skipWaiting(); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match("index.html"))));
});
