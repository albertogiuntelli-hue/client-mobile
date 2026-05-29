import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import PopupPeso from "../components/PopupPeso";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";
import "../styles/productlist.css";

export default function Promo() {
    const [promo, setPromo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popupProduct, setPopupProduct] = useState(null);
    const [toast, setToast] = useState("");

    const { addToCart } = useCart();
    const navigate = useNavigate();

    const FALLBACK = "/icon-192.png";

    const getImage = (img) => {
        if (!img || img.trim() === "" || img === "null" || img === "undefined") {
            return FALLBACK;
        }
        return img;
    };

    useEffect(() => {
        api.get("/promo")
            .then((res) => {
                const fixed = res.data.map((p) => ({
                    ...p,
                    nome: (p.nome || p.descrizione || "").trim(),
                    a_peso: String(p.a_peso || "")
                        .trim()
                        .toUpperCase() === "S"
                        ? "S"
                        : "N",
                    prezzo: parseFloat(
                        String(p.prezzo).replace(",", ".").trim()
                    ),
                }));

                setPromo(fixed);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Errore caricamento promo:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p style={{ padding: "20px" }}>Caricamento promo...</p>;
    }

    const handleAddWeight = (product, grams) => {
        const peso = Number(grams);
        if (!peso || peso <= 0) return;

        addToCart(product, {
            productType: "peso",
            quantity: 0,
            weight: peso,
        });

        setPopupProduct(null);
        setToast("Aggiunto al carrello!");
    };

    return (
        <div className="products-container">
            <button className="back-btn" onClick={() => navigate("/")}>
                ⬅ Torna indietro
            </button>

            <h2 className="promo-title">Offerte Speciali</h2>

            <div className="product-grid">
                {promo.map((product) => (
                    <div key={product.codice} className="product-card">
                        <span className="badge-offerta">OFFERTA</span>

                        <img
                            src={getImage(product.immagine)}
                            alt={product.nome}
                            className="product-img"
                        />

                        <div className="product-name">{product.nome}</div>
                        <div className="product-code">Cod: {product.codice}</div>

                        <div className="product-type">
                            Tipo: {product.a_peso === "S" ? "S (peso)" : "N (pezzo)"}
                        </div>

                        <div className="product-price">
                            € {product.prezzo.toFixed(2)}
                            {product.a_peso === "S" ? " / Kg" : ""}
                        </div>

                        {product.a_peso === "S" ? (
                            <button
                                className="btn-primary"
                                onClick={() => setPopupProduct(product)}
                            >
                                Scegli quantità
                            </button>
                        ) : (
                            <button
                                className="btn-primary"
                                onClick={() => {
                                    addToCart(product, {
                                        productType: "pezzi",
                                        quantity: 1,
                                        weight: 0,
                                    });
                                    setToast("Aggiunto al carrello!");
                                }}
                            >
                                Aggiungi al carrello
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {popupProduct && (
                <PopupPeso
                    product={popupProduct}
                    onConfirm={(grams) => handleAddWeight(popupProduct, grams)}
                    onClose={() => setPopupProduct(null)}
                />
            )}

            {toast && <Toast message={toast} onClose={() => setToast("")} />}
        </div>
    );
}
