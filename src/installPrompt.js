let deferredPrompt = null;
let callback = null;
let listenerAdded = false;

// Rileva se siamo su iOS (iPhone/iPad)
function isIOS() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return /iPhone|iPad|iPod/i.test(ua);
}

export function listenForInstallPrompt(onPromptReady) {
    callback = onPromptReady;

    // iPhone NON supporta beforeinstallprompt → non aggiungere listener
    if (isIOS()) {
        console.log("iOS rilevato: beforeinstallprompt non supportato");
        return;
    }

    if (listenerAdded) return;
    listenerAdded = true;

    window.addEventListener("beforeinstallprompt", (e) => {
        console.log("beforeinstallprompt intercettato");
        e.preventDefault();
        deferredPrompt = e;
        if (callback) callback();
    });
}

export async function triggerInstall() {
    // iPhone → installazione manuale
    if (isIOS()) {
        console.log("Installazione automatica non supportata su iOS");
        return false;
    }

    if (!deferredPrompt) {
        console.log("Nessun prompt di installazione disponibile");
        return false;
    }

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    deferredPrompt = null;

    console.log("Risultato installazione:", result.outcome);

    return result.outcome === "accepted";
}
