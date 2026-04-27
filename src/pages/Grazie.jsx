import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

export default function Grazie() {
    const navigate = useNavigate();

    return (
        <div
            className="products-container"
            style={{
                textAlign: "center",
                padding: "30px",
                maxWidth: "480px",
                margin: "0 auto",
            }}
        >
            <h1 className="page-title">Grazie per il tuo ordine!</h1>

            <p style={{ fontSize: "18px", marginTop: "20px" }}>
                Il tuo ordine è stato inviato correttamente.
            </p>

            <p style={{ fontSize: "16px", marginTop: "10px" }}>
                Ti contatteremo appena sarà pronto.
            </p>

            <hr style={{ margin: "30px 0", opacity: 0.3 }} />

            <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                📄 Puoi anche visionare le
            </p>

            <a
                href="/condizioni"
                style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#4E9F3D",
                    textDecoration: "underline",
                }}
            >
                Condizioni di vendita dell’app
            </a>

            {/* 🔙 Tasto grande torna alla Home */}
            <button
                className="btn-home"
                onClick={() => navigate("/")}
            >
                Torna alla Home
            </button>

            <p style={{ marginTop: "30px", fontSize: "14px", opacity: 0.7 }}>
                PlusMarket Giuntelli
            </p>
        </div>
    );
}


