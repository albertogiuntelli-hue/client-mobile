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

                // 🔥 PARSING CORRETTO PER IL FORMATO DEL BACKEND
                const parsed = data.map((row) => {
                    const raw = Object.values(row)[0]; // prende la stringa intera
                    const parts = raw.split(",");

                    return {
                        codice: parts[0]?.trim(),
                        nome: parts[1]?.trim(),
                        prezzo: parts[2]?.trim(),
                        a_peso: parts[3]?.trim(),
                        immagine: parts[4]?.trim(),
                    };
                });

                setPromo(parsed);
            } catch (err) {
                console.error("Errore caricamento promo:", err);
            }
            setLoading(false);
        };

        loadPromo();
    }, []);

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
                            <p className="promo-price">
                                {p.prezzo ? Number(p.prezzo).toFixed(2) + " €" : "—"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
