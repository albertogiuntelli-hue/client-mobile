import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
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

    if (loading) return <p style={{ padding: "20px" }}>Caricamento prodotti...</p>;

    const addWeightedProduct = (product, grams) => {
        const qtyKg = grams / 1000;
        const prezzo = product.prezzo * qtyKg;

        addToCart({
            ...product,
            productType: "peso",
            weight: grams,
            quantity: 0,
            prezzo: prezzo.toFixed(2),
        });

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
                                    addToCart({
                                        ...product,
                                        productType: "pezzi",
                                        quantity: 1,
                                        weight: 0,
                                    })
                                }
                            >
                                Aggiungi al carrello
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {popupProduct && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h3>{popupProduct.nome}</h3>
                        <p>Seleziona la quantità in grammi:</p>

                        <div className="popup-buttons">
                            {[100, 200, 300].map((g) => (
                                <button
                                    key={g}
                                    className="btn-secondary"
                                    onClick={() => addWeightedProduct(popupProduct, g)}
                                >
                                    {g} g
                                </button>
                            ))}
                        </div>

                        <input
                            type="number"
                            placeholder="Inserisci grammi"
                            className="popup-input"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    addWeightedProduct(
                                        popupProduct,
                                        Number(e.target.value)
                                    );
                                }
                            }}
                        />

                        <button
                            className="btn-cancel"
                            onClick={() => setPopupProduct(null)}
                        >
                            Annulla
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
