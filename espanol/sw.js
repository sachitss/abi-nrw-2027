/* Abi Español 2027 – Offline-Speicher */
const CACHE = "abi-es-2027-1.0.0-d103c072";
const FILES = [
 "./",
 "index.html",
 "ANLEITUNG.html",
 "manifest.webmanifest",
 "fonts/fonts.css",
 "app/data1.js",
 "app/data2.js",
 "app/data3.js",
 "app/data4.js",
 "app/core.js",
 "app/views1.js",
 "app/views2.js",
 "app/views3.js",
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
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("abi-es-2027-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("message", (e) => { if (e.data === "skip") self.skipWaiting(); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match("index.html"))));
});
