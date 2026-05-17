// Service Worker SEMPRE aggiornato

self.addEventListener("install", (event) => {
    // Forza installazione immediata
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    // Cancella TUTTE le cache esistenti
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.map((key) => caches.delete(key)))
        )
    );

    // Prende subito il controllo delle pagine aperte
    self.clients.claim();
});

// Nessuna cache dei file JS/CSS/HTML → sempre aggiornati
self.addEventListener("fetch", (event) => {
    event.respondWith(fetch(event.request));
});
