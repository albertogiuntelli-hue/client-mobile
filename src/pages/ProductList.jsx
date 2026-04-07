import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import PopupPeso from "../components/PopupPeso";
import "../styles/theme.css";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popupProduct, setPopupProduct] = useState(null);

    const { addToCart } = useCart();

    useEffect(() => {
        api.get("/api/products")
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Errore caricamento prodotti:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p style={{ padding: "20px" }}>Caricamento prodotti...</p>;
    }

    // 🔥 Funzione corretta per aggiungere prodotti a peso
    const handleAddWeight = (product, grams) => {
        if (!grams || grams <= 0) return;

        addToCart(
            {
                ...product,
                productType: "peso",
                quantity: 0,
                weight: grams,
            },
            {
                productType: "peso",
                quantity: 0,
                weight: grams,
            }
        );

        setPopupProduct(null);
    };

    return (
        <div className="products-container">
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.codice} className="product-card">

                        <img
                            src={product.immagine || "/placeholder.png"}
                            alt={product.nome}
                            className="product-img"
                        />

                        <div className="product-name">{product.nome}</div>
                        <div className="product-code">Cod: {product.codice}</div>

                        <div className="product-type">
                            Tipo: {product.prezzo_al_kg ? "S (peso)" : "N (pezzo)"}
                        </div>

                        <div className="product-price">
                            € {product.prezzo}
                            {product.prezzo_al_kg ? " / Kg" : ""}
                        </div>

                        {product.prezzo_al_kg ? (
                            <button
                                className="btn-primary"
                                onClick={() => setPopupProduct(product)}
                            >
                                Scegli quantità
                            </button>
                        ) : (
                            <button
                                className="btn-primary"
                                onClick={() =>
                                    addToCart(
                                        {
                                            ...product,
                                            productType: "pezzi",
                                            quantity: 1,
                                            weight: 0,
                                        },
                                        {
                                            productType: "pezzi",
                                            quantity: 1,
                                            weight: 0,
                                        }
                                    )
                                }
                            >
                                Aggiungi al carrello
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* 🔥 Popup Peso */}
            {popupProduct && (
                <PopupPeso
                    product={popupProduct}
                    onConfirm={(grams) => handleAddWeight(popupProduct, grams)}
                    onClose={() => setPopupProduct(null)}
                />
            )}
        </div>
    );
}
