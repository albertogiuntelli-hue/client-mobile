import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import "../styles/productlist.css";

export default function Promo() {
    const [promo, setPromo] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchPromo = async () => {
            try {
                const res = await api.get("/promo");

                const valid = res.data.filter(
                    (p) => p.nome && p.nome.trim() !== ""
                );

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

            {promo.length === 0 && <p>Nessuna promo disponibile</p>}

            <div className="product-grid">
                {promo.map((p) => {
                    const prezzoFinale =
                        p.prezzoSco > 0 ? p.prezzoSco : p.prezzo;

                    return (
                        <div key={p.codice} className="product-card">
                            <img
                                src={p.immagine || "/placeholder.png"}
                                alt={p.nome}
                                className="product-image"
                            />

                            <h3 className="product-name">{p.nome}</h3>

                            <p className="product-code">Codice: {p.codice}</p>

                            <p className="product-price">
                                € {prezzoFinale.toFixed(2)}
                            </p>

                            <button
                                className="btn-add"
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
