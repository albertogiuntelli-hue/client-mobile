// Nome della cache (cambialo quando vuoi forzare un aggiornamento)
const CACHE_NAME = "plusmarket-cache-v1";

// File da mettere subito in cache
const ASSETS_TO_CACHE = [
    "/",
    "/index.html",
    "/manifest.json",
    "/icon-192.png",
    "/icon-512.png",
];

// Installazione SW → cache iniziale
self.addEventListener("install", (event) => {
    self.skipWaiting(); // aggiorna subito
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Attivazione SW → pulizia cache vecchie
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim(); // controlla subito tutte le pagine
});

// Strategia: Network first, fallback cache
self.addEventListener("fetch", (event) => {
    // Ignora richieste esterne tipo chrome-extension
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Salva in cache la risposta aggiornata
                const cloned = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, cloned);
                });
                return response;
            })
            .catch(() => {
                // Offline → prova la cache
                return caches.match(event.request).then((cached) => {
                    return (
                        cached ||
                        caches.match("/index.html") // fallback offline
                    );
                });
            })
    );
});
