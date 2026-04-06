let deferredPrompt = null;
let callback = null;
let listenerAdded = false;

export function listenForInstallPrompt(onPromptReady) {
    callback = onPromptReady;

    // Evita di aggiungere più listener
    if (listenerAdded) return;
    listenerAdded = true;

    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (callback) callback();
    });
}

export async function triggerInstall() {
    if (!deferredPrompt) return false;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    // Reset dopo l’uso
    deferredPrompt = null;

    return result.outcome === "accepted";
}
