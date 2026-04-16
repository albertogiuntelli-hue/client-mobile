let deferredPrompt = null;
let callback = null;
let listenerAdded = false;

export function listenForInstallPrompt(onPromptReady) {
    callback = onPromptReady;

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

    deferredPrompt = null;

    return result.outcome === "accepted";
}
