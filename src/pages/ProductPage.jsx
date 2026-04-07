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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/api/products/${codice}`);
                setProduct(res.data || null);
                setLoading(false);
            } catch (error) {
                console.error("Errore caricamento prodotto:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [codice]);

    if (loading) {
        return <p className="loading">Caricamento prodotto...</p>;
    }

    if (!product) {
        return <p className="error">Prodotto non trovato.</p>;
    }

    return (
        <div className="product-page">

            <img
                src={product.immagine || "/logo.png"}   // 🔥 fallback corretto
                alt={product.nome}
                className="product-page-image"
            />

            <h1 className="product-page-title">{product.nome}</h1>

            <p className="product-page-code">Codice: {product.codice}</p>

            {product.descrizione && (
                <p className="product-page-desc">{product.descrizione}</p>
            )}

            <p className="product-page-price">
                {product.prezzo_scontato > 0 ? (
                    <>
                        <span className="old-price">{product.prezzo} €</span>
                        <span className="new-price">{product.prezzo_scontato} €</span>
                    </>
                ) : (
                    <span className="normal-price">
                        {product.prezzo_al_kg
                            ? `${product.prezzo} €/Kg`
                            : `${product.prezzo} €`}
                    </span>
                )}
            </p>

            {product.categoria && (
                <p className="product-page-cat">
                    Categoria: {product.categoria}
                </p>
            )}

            {"disponibile" in product && (
                <p className="product-page-stock">
                    Disponibile: {product.disponibile ? "Sì" : "No"}
                </p>
            )}

            <button
                className="btn-add big"
                onClick={() => addToCart(product)}
            >
                Aggiungi al carrello
            </button>
        </div>
    );
};

export default ProductPage;
