import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import PopupPeso from "../components/PopupPeso";
import "../styles/theme.css";

const ProductPage = () => {
    const { codice } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [popupOpen, setPopupOpen] = useState(false);

    const { addToCart } = useCart();

    // 🔥 Fallback logo sicuro (ESISTE sul backend)
    const FALLBACK =
        "https://backend-nuova-production.up.railway.app/plusmarket-logo.png";

    const getImage = (img) => {
        if (
            !img ||
            img.trim() === "" ||
            img === "null" ||
            img === "undefined"
        ) {
            return FALLBACK;
        }

        if (img.startsWith("http")) return img;

        return `https://backend-nuova-production.up.railway.app/api/images/${img}`;
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${codice}`);
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

    const handleAddWeight = (grams) => {
        const peso = parseFloat(String(grams).replace(",", ".").trim()) || 0;
        if (peso <= 0) return;

        addToCart(product, {
            productType: "peso",
            quantity: 0,
            weight: peso,
        });

        setPopupOpen(false);
    };

    const handleAddPiece = () => {
        addToCart(product, {
            productType: "pezzi",
            quantity: 1,
            weight: 0,
        });
    };

    return (
        <div className="product-page">

            <img
                src={getImage(product.immagine)}
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

            {product.a_peso === "S" ? (
                <button
                    className="btn-add big"
                    onClick={() => setPopupOpen(true)}
                >
                    Scegli quantità
                </button>
            ) : (
                <button
                    className="btn-add big"
                    onClick={handleAddPiece}
                >
                    Aggiungi 1 pezzo
                </button>
            )}

            {popupOpen && (
                <PopupPeso
                    product={product}
                    onConfirm={handleAddWeight}
                    onClose={() => setPopupOpen(false)}
                />
            )}
        </div>
    );
};

export default ProductPage;
