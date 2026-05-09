import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import "../styles/productlist.css";

export default function Promo() {
    const [promo, setPromo] = useState([]);
    const [dataInizio, setDataInizio] = useState(null);
    const [dataFine, setDataFine] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchPromo = async () => {
            try {
                // 1️⃣ Carico le promo
                const resPromo = await api.get("/api/promo");

                // 2️⃣ Carico le date del blocco promo
                const resDate = await api.get("/api/promo/dates");

                const { data_inizio, data_fine } = resDate.data;

                setDataInizio(data_inizio);
                setDataFine(data_fine);

                // 3️⃣ Converto le date in oggetti Date
                const start = new Date(data_inizio);
                const end = new Date(data_fine);
                const today = new Date();

                // 4️⃣ Filtro le promo valide
                const valid = resPromo.data.filter((p) => {
                    const hasName = p.descrizione || p.nome;
                    const inRange = today >= start && today <= end;
                    return hasName && inRange;
                });

                setPromo(valid);
            } catch (error) {
                console.error("Errore caricamento promo:", error);
            }
        };

        fetchPromo();
    }, []);

    return (
        <div className="products-container">
            <h1 className="page-title">Offerte Speciali</h1>

            {/* 🔥 Banner date promo */}
            {dataInizio && dataFine && (
                <p
                    style={{
                        background: "#f5f5f5",
                        padding: "10px",
                        borderRadius: "8px",
                        fontSize: "16px",
                        marginBottom: "20px",
                        textAlign: "center",
                    }}
                >
                    Offerte valide dal <strong>{dataInizio}</strong> al{" "}
                    <strong>{dataFine}</strong>
                </p>
            )}

            {promo.length === 0 && <p>Nessuna promo disponibile</p>}

            <div className="product-grid">
                {promo.map((p) => {
                    const prezzoFinale =
                        p.prezzoSco > 0 ? p.prezzoSco : p.prezzo;

                    return (
                        <div key={p.codice} className="product-card">

                            {/* 🔥 BADGE DIAGONALE OFFERTA */}
                            <span className="badge-offerta">OFFERTA</span>

                            <img
                                src={p.immagine || "/placeholder.png"}
                                alt={p.descrizione || p.nome}
                                className="product-img"
                            />

                            <h3 className="product-name">
                                {p.descrizione || p.nome}
                            </h3>

                            <p className="product-code">Codice: {p.codice}</p>

                            <p className="product-price">
                                € {prezzoFinale.toFixed(2)}
                            </p>

                            <button
                                className="btn-primary"
                                onClick={() => addToCart(p)}
                            >
                                Aggiungi al carrello
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
