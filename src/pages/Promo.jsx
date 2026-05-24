import { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Promo.css";

export default function Promo() {
    const [promo, setPromo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPromo = async () => {
            try {
                const res = await axios.get("/promo");
                const data = res.data || [];

                const parsed = data.map((row) => ({
                    codice: row.codice,
                    nome: row.descrizione,
                    prezzo: row.prezzo, // EURO
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

    // 🔥 FORMATO EURO CORRETTO
    const formatPrice = (value) => {
        if (value === null || value === undefined || value === "" || isNaN(value)) {
            return "—";
        }

        return Number(value).toFixed(2).replace(".", ",") + " €";
    };

    if (loading) return <h2 style={{ textAlign: "center" }}>Caricamento promo...</h2>;

    return (
        <div className="promo-container">
            <h2 className="promo-title">Offerte Speciali</h2>

            <div className="promo-grid">
                {promo.map((p, index) => (
                    <div key={index} className="promo-card">
                        <img
                            src={p.immagine || "/placeholder.png"}
                            alt={p.nome}
                            className="promo-image"
                        />

                        <div className="promo-info">
                            <h3 className="promo-name">{p.nome}</h3>
                            <p className="promo-price">{formatPrice(p.prezzo)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
