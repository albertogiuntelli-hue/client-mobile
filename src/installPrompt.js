let deferredPrompt = null;
let callback = null;

export function listenForInstallPrompt(onPromptReady) {
    callback = onPromptReady;

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
