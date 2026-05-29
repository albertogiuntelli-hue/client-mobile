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

            <div className="home-buttons">
                <button
                    className="home-btn"
                    onClick={() => navigate("/prodotti")}
                >
                    Ordina online i prodotti
                </button>

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

                <button
                    className="home-btn"
                    onClick={() => navigate("/chi-siamo")}
                >
                    Chi siamo
                </button>
            </div>
        </div>
    );
}
