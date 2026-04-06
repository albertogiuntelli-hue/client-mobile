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
                // 🔥 Prende TUTTI i prodotti
                const res = await api.get("/products");

                // 🔥 Cerca quello con il codice giusto
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

    if (loading) {
        return <p className="loading">Caricamento prodotto...</p>;
    }

    if (!product) {
        return <p className="error">Prodotto non trovato.</p>;
    }

    return (
        <div className="product-page">

            {/* Immagine */}
            <img
                src={product.immagine}
                alt={product.nome}
                className="product-page-image"
            />

            {/* Nome */}
            <h1 className="product-page-title">{product.nome}</h1>

            {/* Codice */}
            <p className="product-page-code">Codice: {product.codice}</p>

            {/* Descrizione */}
            <p className="product-page-desc">{product.descrizione}</p>

            {/* Prezzo */}
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

            {/* Categoria */}
            {product.categoria && (
                <p className="product-page-cat">
                    Categoria: {product.categoria}
                </p>
            )}

            {/* Disponibilità */}
            {"disponibile" in product && (
                <p className="product-page-stock">
                    Disponibile: {product.disponibile ? "Sì" : "No"}
                </p>
            )}

            {/* Pulsante carrello */}
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
