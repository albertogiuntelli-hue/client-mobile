export default function Grazie() {
    return (
        <div
            style={{
                padding: "40px 20px",
                textAlign: "center",
            }}
        >
            <img
                src="/icon-192.png"
                alt="PlusMarket"
                style={{ width: "90px", marginBottom: "20px" }}
            />

            <h2 style={{ marginBottom: "10px" }}>Grazie per il tuo ordine!</h2>

            <p style={{ fontSize: "18px", marginBottom: "30px" }}>
                Abbiamo ricevuto il tuo ordine su WhatsApp.
                Ti risponderemo il prima possibile.
            </p>

            <a
                href="/"
                style={{
                    display: "inline-block",
                    padding: "12px 20px",
                    background: "#28a745",
                    color: "#fff",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "18px",
                }}
            >
                Torna alla Home
            </a>
        </div>
    );
}
