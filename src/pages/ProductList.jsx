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

    // 🔥 Modalità offerte attiva se arrivo da /prodotti?promo=true
    const isPromoPage =
        new URLSearchParams(window.location.search).get("promo") === "true";

    useEffect(() => {
        const endpoint = isPromoPage
            ? "https://backend-nuova-production.up.railway.app/api/promo"
            : "https://backend-nuova-production.up.railway.app/api/prodotti";

        fetch(endpoint)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
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

    // 🔥 FILTRO RICERCA
    const filtered = products.filter((p) => {
        if (!search) return true;

        const name = normalize(p.nome);
        const term = normalize(search);

        if (name.includes(term)) return true;

        const distance = levenshtein(name, term);
        if (distance <= 3) return true;

        if (term.length > 4 && name.startsWith(term.slice(0, 4))) return true;

        if (name.length > 4 && term.startsWith(name.slice(0, 4))) return true;

        return false;
    });

    return (
        <div className="products-container">
            <button className="back-btn" onClick={() => navigate("/")}>
                ⬅ Torna indietro
            </button>

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

                        {/* 🔥 BADGE OFFERTA DIAGONALE */}
                        {isPromoPage && (
                            <span className="badge-offerta">OFFERTA</span>
                        )}

                        <img
                            src={product.immagine || "/placeholder.png"}
                            alt={product.nome}
                            className="product-img"
                        />

                        <div className="product-name">{product.nome}</div>
                        <div className="product-code">Cod: {product.codice}</div>

                        <div className="product-type">
                            Tipo: {product.a_peso === "S" ? "S (peso)" : "N (pezzo)"}
                        </div>

                        <div className="product-price">
                            € {product.prezzo}
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
