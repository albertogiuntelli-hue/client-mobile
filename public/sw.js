self.addEventListener("install", (event) => {
    console.log("Service Worker installato");
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker attivo");
    return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => {
            return (
                cached ||
                fetch(event.request).then((response) => {
                    return caches.open("plusmarket-cache").then((cache) => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                })
            );
        })
    );
});
