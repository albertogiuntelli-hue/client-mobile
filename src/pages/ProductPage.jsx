import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import "../styles/theme.css";

const ProductPage = () => {
    const { codice } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    // 🔵 quantità in etti (solo per prodotti a peso)
    const [etti, setEtti] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get("/products");
                const found = res.data.find((p) => p.codice === codice);
                setProduct(found || null);
                setLoading(false);
            } catch (error) {
                console.error("Errore caricamento prodotto:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [codice]);

    if (loading) return <p className="loading">Caricamento prodotto...</p>;
    if (!product) return <p className="error">Prodotto non trovato.</p>;

    // 🔵 Aggiunta al carrello con gestione ETTO → KG
    const handleAdd = () => {
        if (product.a_peso) {
            const kg = etti * 0.1; // conversione
            addToCart(product, kg);
        } else {
            addToCart(product, 1);
        }
    };

    return (
        <div className="product-page">

            <img
                src={product.immagine}
                alt={product.nome}
                className="product-page-image"
            />

            <h1 className="product-page-title">{product.nome}</h1>
            <p className="product-page-code">Codice: {product.codice}</p>

            <p className="product-page-price">
                {product.prezzoSco > 0 ? (
                    <>
                        <span className="old-price">{product.prezzo} €</span>
                        <span className="new-price">{product.prezzoSco} €</span>
                    </>
                ) : (
                    <span className="normal-price">{product.prezzo} €</span>
                )}
            </p>

            {/* 🔵 SE IL PRODOTTO È A PESO → INPUT ETTO */}
            {product.a_peso && (
                <div className="etti-box">
                    <label>Quanti etti vuoi?</label>
                    <input
                        type="number"
                        min="1"
                        max="50"
                        value={etti}
                        onChange={(e) => setEtti(parseInt(e.target.value) || 1)}
                        className="etti-input"
                    />
                </div>
            )}

            <button className="btn-add big" onClick={handleAdd}>
                Aggiungi al carrello
            </button>
        </div>
    );
};

export default ProductPage;
