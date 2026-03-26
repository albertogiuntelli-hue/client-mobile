import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import "../styles/theme.css";
import "../styles/productlist.css";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/api/products");

                const valid = res.data.filter(
                    (p) => p.nome && p.nome.trim() !== ""
                );

                setProducts(valid);
            } catch (error) {
                console.error("Errore caricamento prodotti:", error);
            }
        };

        fetchProducts();
    }, []);

    const filtered = products.filter((p) =>
        p.nome.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="products-container">
            <h1 className="page-title">Prodotti</h1>

            <input
                type="text"
                placeholder="Cerca prodotto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

            {filtered.length === 0 && <p>Nessun prodotto trovato</p>}

            <div className="product-grid">
                {filtered.map((p) => {
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
