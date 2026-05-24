import { useNavigate } from "react-router-dom";
import logo from "../../public/icon-192.png";
import "../styles/theme.css";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <img src={logo} alt="PlusMarket Giuntelli" className="home-logo" />

            <div className="home-buttons">
                {/* 🔥 Bottone offerte → usa query promo=true */}
                <button
                    className="home-btn"
                    onClick={() => navigate("/prodotti?promo=true")}
                >
                    ORDINA ONLINE LE OFFERTE
                </button>

                <button
                    className="home-btn"
                    onClick={() => navigate("/prodotti")}
                >
                    ORDINA ONLINE I PRODOTTI
                </button>

                <button
                    className="home-btn"
                    onClick={() => navigate("/condizioni")}
                >
                    CONDIZIONI DI VENDITA
                </button>
            </div>

            <p className="home-description">
                Il tuo negozio di fiducia, vicino a te ogni giorno.
            </p>

            <a
                href="https://www.plusmarket.it"
                target="_blank"
                rel="noopener noreferrer"
                className="home-link"
            >
                www.plusmarket.it
            </a>

            <button
                className="home-btn-secondary"
                onClick={() => navigate("/chi-siamo")}
            >
                CHI SIAMO
            </button>
        </div>
    );
}
