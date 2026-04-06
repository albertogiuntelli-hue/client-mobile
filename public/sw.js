self.addEventListener("install", () => {
    console.log("Service Worker installato");
    self.skipWaiting();
});

self.addEventListener("activate", () => {
    console.log("Service Worker attivo");
    return self.clients.claim();
});

// 🔥 VERSIONE PULITA: NIENTE CACHE BLOCCATE
self.addEventListener("fetch", (event) => {
    event.respondWith(fetch(event.request));
});
