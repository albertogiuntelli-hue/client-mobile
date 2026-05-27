import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import PopupPeso from "../components/PopupPeso";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";
import "../styles/productlist.css";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popupProduct, setPopupProduct] = useState(null);
    const [search, setSearch] = useState("");
    const [toast, setToast] = useState("");

    const { addToCart } = useCart();
    const navigate = useNavigate();

    const isPromoPage =
        new URLSearchParams(window.location.search).get("promo") === "true";

    useEffect(() => {
        const endpoint = isPromoPage
            ? "https://backend-nuova-production.up.railway.app/api/promo"
            : "https://backend-nuova-production.up.railway.app/api/products";

        fetch(endpoint)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Errore caricamento prodotti:", err);
                setLoading(false);
            });
    }, [isPromoPage]);

    if (loading) {
        return <p style={{ padding: "20px" }}>Caricamento prodotti...</p>;
    }

    if (!isPromoPage && products.length === 0) {
        return (
            <div className="products-container">
                <button className="back-btn" onClick={() => navigate("/")}>
                    ⬅ Torna indietro
                </button>

                <h2 style={{ textAlign: "center", marginTop: "40px" }}>
                    Pagina in allestimento
                </h2>
            </div>
        );
    }

    const formatPrice = (value) => {
        if (!value && value !== 0) return "—";
        return Number(value).toFixed(2).replace(".", ",");
    };

    // 🔥 FALLBACK IMMAGINE SICURO (ESISTE DAVVERO)
    const FALLBACK =
        "https://backend-nuova-production.up.railway.app/plusmarket-logo.png";

    // 🔥 LOGICA IMMAGINE PROMO STABILE
    const getImage = (img) => {
        if (!isPromoPage) return null;

        if (
            !img ||
            img.trim() === "" ||
            img === "null" ||
            img === "undefined" ||
            img.toLowerCase() === "immagine promo"
        ) {
            return FALLBACK;
        }

        if (img.startsWith("http")) return img;

        return `https://backend-nuova-production.up.railway.app/api/images/${img}`;
    };

    const normalize = (str) =>
        str
            .toLowerCase()
            .replace(/\./g, "")
            .replace(/\s+/g, "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    function levenshtein(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) matrix[i] = [i];
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                matrix[i][j] =
                    b.charAt(i - 1) === a.charAt(j - 1)
                        ? matrix[i - 1][j - 1]
                        : Math.min(
                            matrix[i - 1][j - 1] + 1,
                            matrix[i][j - 1] + 1,
                            matrix[i - 1][j] + 1
                        );
            }
        }

        return matrix[b.length][a.length];
    }

    const filtered = products.filter((p) => {
        if (!search) return true;

        const name = normalize(p.nome || p.descrizione || "");
        const term = normalize(search);

        if (name.includes(term)) return true;

        const distance = levenshtein(name, term);
        if (distance <= 3) return true;

        return false;
    });

    return (
        <div className="products-container">
            <button className="back-btn" onClick={() => navigate("/")}>
                ⬅ Torna indietro
            </button>

            <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
                {isPromoPage ? "Offerte Speciali" : "Listino completo Plusmarket"}
            </h2>

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
                        {isPromoPage && (
                            <span className="badge-offerta">OFFERTA</span>
                        )}

                        {isPromoPage && (
                            <img
                                src={getImage(product.immagine)}
                                alt={product.nome || product.descrizione}
                                className="product-img"
                            />
                        )}

                        <div className="product-name">
                            {product.nome || product.descrizione}
                        </div>

                        <div className="product-code">Cod: {product.codice}</div>

                        <div className="product-price">
                            € {String(formatPrice(product.prezzo))}
                        </div>

                        {isPromoPage && (
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

                        {!isPromoPage && (
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
                                Aggiungi
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
