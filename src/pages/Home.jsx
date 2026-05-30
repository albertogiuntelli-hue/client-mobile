import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <img
                src="/icon-192.png"
                alt="PlusMarket Logo"
                className="home-logo"
            />

            <h1 className="home-title">PlusMarket Giuntelli</h1>

            {/* Testo descrittivo */}
            <p style={{ fontSize: "18px", marginTop: "10px", marginBottom: "5px" }}>
                Il tuo negozio di fiducia vicino a te ogni giorno
            </p>

            {/* www.plusmarket.it in blu */}
            <p
                style={{
                    fontSize: "16px",
                    marginBottom: "20px",
                    color: "#0066cc",
                    fontWeight: "bold"
                }}
            >
                www.plusmarket.it
            </p>

            <div className="home-buttons">

                <button
                    className="home-btn"
                    onClick={() => navigate("/prodotti?promo=true")}
                >
                    Ordina online le offerte
                </button>

                <button
                    className="home-btn"
                    onClick={() => navigate("/listino")}
                >
                    Listino completo PlusMarket
                </button>

                <button
                    className="home-btn"
                    onClick={() => navigate("/condizioni")}
                >
                    Condizioni di vendita
                </button>

                {/* Pulsante Chi siamo in marrone bello */}
                <button
                    className="home-btn"
                    style={{
                        backgroundColor: "#8B4513",
                        color: "white"
                    }}
                    onClick={() => navigate("/chi-siamo")}
                >
                    Chi siamo
                </button>

            </div>
        </div>
    );
}
