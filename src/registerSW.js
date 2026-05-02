export function registerSW() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("/sw.js")
                .then((registration) => {
                    console.log("Service Worker registrato:", registration);

                    // Controllo aggiornamenti senza cambiare comportamento
                    registration.onupdatefound = () => {
                        const installingWorker = registration.installing;
                        if (installingWorker) {
                            installingWorker.onstatechange = () => {
                                if (installingWorker.state === "installed") {
                                    if (navigator.serviceWorker.controller) {
                                        console.log("Nuova versione disponibile");
                                    } else {
                                        console.log("App pronta per l'uso offline");
                                    }
                                }
                            };
                        }
                    };
                })
                .catch((err) => console.log("SW registration failed:", err));
        });
    }
}
