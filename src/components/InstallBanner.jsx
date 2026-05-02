import { triggerInstall } from "../installPrompt";

export default function InstallBanner({ visible, onClose }) {
    if (!visible) return null;

    const handleInstall = async () => {
        console.log("Tentativo di installazione...");
        const accepted = await triggerInstall();
        console.log("Installazione accettata?", accepted);
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#ffffff",
                padding: "15px 20px",
                borderRadius: "12px",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                zIndex: 9999,
                textAlign: "center",
                width: "90%",
                maxWidth: "350px"
            }}
        >
            {/* Pulsante chiudi (opzionale, non rompe nulla) */}
            {onClose && (
                <button
                    onClick={onClose}
                    aria-label="Chiudi"
                    style={{
                        position: "absolute",
                        top: "5px",
                        right: "10px",
                        background: "transparent",
                        border: "none",
                        fontSize: "18px",
                        cursor: "pointer"
                    }}
                >
                    ×
                </button>
            )}

            <p style={{ margin: 0, marginBottom: "10px", fontWeight: "bold" }}>
                Installa l'app PlusMarket
            </p>

            <button
                onClick={handleInstall}
                style={{
                    padding: "10px 20px",
                    background: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px"
                }}
            >
                Installa
            </button>
        </div>
    );
}
