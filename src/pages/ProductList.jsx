import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import PopupPeso from "../components/PopupPeso";
import "../styles/theme.css";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popupProduct, setPopupProduct] = useState(null);
    const [search, setSearch] = useState("");

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

    // 🔥 FIX DEFINITIVO: usa addToCart(product, options)
    const handleAddWeight = (product, grams) => {
        const peso = Number(grams);

        if (!peso || peso <= 0) return;

        addToCart(product, {
            productType: "peso",
            quantity: 0,
            weight: peso,
        });

        setPopupProduct(null);
    };

    const filtered = products.filter((p) =>
        p.nome.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="products-container">

            <input
                type="text"
                className="search-box"
                placeholder="Cerca prodotto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="product-grid">
                {filtered.map((product) => (
                    <div key={product.codice} className="product-card">

                        <img
                            src={product.immagine || "/placeholder.png"}
                            alt={product.nome}
                            className="product-img"
                        />

                        <div className="product-name">{product.nome}</div>
                        <div className="product-code">Cod: {product.codice}</div>

                        <div className="product-type">
                            Tipo: {product.a_peso ? "S (peso)" : "N (pezzo)"}
                        </div>

                        <div className="product-price">
                            € {product.prezzo}
                            {product.a_peso ? " / Kg" : ""}
                        </div>

                        {product.a_peso ? (
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
                                    addToCart(product, {
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
                <PopupPeso
                    product={popupProduct}
                    onConfirm={(grams) => handleAddWeight(popupProduct, grams)}
                    onClose={() => setPopupProduct(null)}
                />
            )}
        </div>
    );
}
