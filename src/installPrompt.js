let deferredPrompt = null;
let callback = null;
let listenerAdded = false;

export function listenForInstallPrompt(onPromptReady) {
    callback = onPromptReady;

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
