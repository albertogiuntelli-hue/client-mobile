import { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Promo.css";

export default function Promo() {
    const [promo, setPromo] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔥 Fallback logo sicuro (ESISTE sul backend)
    const FALLBACK =
        "https://backend-nuova-production.up.railway.app/plusmarket-logo.png";

    const getImage = (img) => {
        if (
            !img ||
            img.trim() === "" ||
            img === "null" ||
            img === "undefined" ||
            img.toLowerCase() === "immagine promo"
        ) {
            return FALLBACK;
        }

        // Se è già un URL completo
        if (img.startsWith("http")) return img;

        // Altrimenti è un nome file → lo prendo dal backend
        return `https://backend-nuova-production.up.railway.app/api/images/${img}`;
    };

    useEffect(() => {
        const loadPromo = async () => {
            try {
                const res = await axios.get("/promo");
                const data = res.data || [];

                const parsed = data.map((row) => ({
                    codice: row.codice,
                    nome: row.descrizione,
                    prezzo: row.prezzo,
                    immagine: row.immagine,
                }));

                setPromo(parsed);
            } catch (err) {
                console.error("Errore caricamento promo:", err);
            }
            setLoading(false);
        };

        loadPromo();
    }, []);

    const formatPrice = (value) => {
        if (value === null || value === undefined || value === "" || isNaN(value)) {
            return "—";
        }

        return Number(value)
            .toFixed(2)
            .replace(".", ",");
    };

    if (loading) return <h2 style={{ textAlign: "center" }}>Caricamento promo...</h2>;

    return (
        <div className="promo-container">
            <h2 className="promo-title">Offerte Speciali</h2>

            <div className="promo-grid">
                {promo.map((p, index) => (
                    <div key={index} className="promo-card">
                        <img
                            src={getImage(p.immagine)}
                            alt={p.nome}
                            className="promo-image"
                        />

                        <div className="promo-info">
                            <h3 className="promo-name">{p.nome}</h3>
                            <p className="promo-price">
                                € {String(formatPrice(p.prezzo))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
