import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/theme.css";

export default function Home() {
    const navigate = useNavigate();

    // Lingua salvata
    const [lang, setLang] = useState(localStorage.getItem("lang") || "it");

    const texts = {
        it: {
            slogan: "Il tuo negozio di fiducia vicino a te ogni giorno",
            sito: "www.plusmarket.it",
            offerte: "Ordina online le offerte",
            listino: "Listino completo PlusMarket",
            condizioni: "Condizioni di vendita",
            chiSiamo: "Chi siamo e dove siamo"
        },
        en: {
            slogan: "Your trusted store near you every day",
            sito: "www.plusmarket.it",
            offerte: "Order online the offers",
            listino: "Full PlusMarket price list",
            condizioni: "Terms of sale",
            chiSiamo: "About us and where we are"
        },
        de: {
            slogan: "Ihr vertrauenswürdiger Laden in Ihrer Nähe jeden Tag",
            sito: "www.plusmarket.it",
            offerte: "Online Angebote bestellen",
            listino: "Komplette PlusMarket Preisliste",
            condizioni: "Verkaufsbedingungen",
            chiSiamo: "Wer wir sind und wo wir sind"
        },
        pl: {
            slogan: "Twój zaufany sklep blisko Ciebie każdego dnia",
            sito: "www.plusmarket.it",
            offerte: "Zamów oferty online",
            listino: "Pełny cennik PlusMarket",
            condizioni: "Warunki sprzedaży",
            chiSiamo: "Kim jesteśmy i gdzie jesteśmy"
        }
    };

    const changeLang = (l) => {
        setLang(l);
        localStorage.setItem("lang", l);
    };

    return (
        <div className="home-container">
            <img
                src="/icon-192.png"
                alt="PlusMarket Logo"
                className="home-logo"
            />

            <h1 className="home-title">PlusMarket Giuntelli</h1>

            {/* Selettore lingue */}
            <div style={{ marginBottom: "15px", fontSize: "22px" }}>
                <span style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => changeLang("it")}>🇮🇹</span>
                <span style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => changeLang("en")}>🇬🇧</span>
                <span style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => changeLang("de")}>🇩🇪</span>
                <span style={{ cursor: "pointer" }} onClick={() => changeLang("pl")}>🇵🇱</span>
            </div>

            <p style={{ fontSize: "18px", marginTop: "10px", marginBottom: "5px" }}>
                {texts[lang].slogan}
            </p>

            <p
                style={{
                    fontSize: "16px",
                    marginBottom: "20px",
                    color: "#0066cc",
                    fontWeight: "bold"
                }}
            >
                {texts[lang].sito}
            </p>

            <div className="home-buttons">

                <button className="home-btn" onClick={() => navigate("/prodotti?promo=true")}>
                    {texts[lang].offerte}
                </button>

                <button className="home-btn" onClick={() => navigate("/listino")}>
                    {texts[lang].listino}
                </button>

                <button className="home-btn" onClick={() => navigate("/condizioni")}>
                    {texts[lang].condizioni}
                </button>

                <button
                    className="home-btn"
                    style={{ backgroundColor: "#8B4513", color: "white" }}
                    onClick={() => navigate("/chi-siamo")}
                >
                    {texts[lang].chiSiamo}
                </button>

            </div>
        </div>
    );
}
