import { useEffect, useState } from "react";
import { listenForInstallPrompt, triggerInstall } from "../installPrompt";

export default function InstallBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        listenForInstallPrompt(() => {
            setVisible(true);
        });
    }, []);

    if (!visible) return null;

    return (
        <div className="install-banner">
            <p>Installa l'app PlusMarket sul tuo dispositivo</p>

            <button
                className="install-btn"
                onClick={async () => {
                    const ok = await triggerInstall();
                    if (ok) setVisible(false);
                }}
            >
                Installa
            </button>

            <button
                className="close-btn"
                onClick={() => setVisible(false)}
            >
                Chiudi
            </button>
        </div>
    );
}
