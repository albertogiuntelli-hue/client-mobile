import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import PopupPeso from "../components/PopupPeso";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";
import "../styles/listino.css";   // 🔥 nuovo CSS dedicato

export default function ListinoCompleto() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popupProduct, setPopupProduct] = useState(null);
    const [search, setSearch] = useState("");
    const [toast, setToast] = useState("");

    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/products")
            .then((res) => {
                const fixed = res.data.map((p) => ({
                    ...p,
                    nome: (p.nome || "").trim(),
                    a_peso: String(p.a_peso || "")
                        .trim()
                        .toUpperCase() === "S"
                        ? "S"
                        : "N",
                    prezzo: Number(String(p.prezzo).replace(",", ".").trim()),
                }));

                setProducts(fixed);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <p style={{ padding: "20px" }}>Caricamento prodotti...</p>;
    }

    const normalize = (str) =>
        str
            .toLowerCase()
            .replace(/\./g, "")
            .replace(/\s+/g, "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    const filtered = products.filter((p) => {
        if (!search) return true;
        const name = normalize(p.nome);
        const term = normalize(search);
        return name.includes(term);
    });

    return (
        <div className="listino-container">
            <button className="back-btn" onClick={() => navigate("/")}>
                ⬅ Torna indietro
            </button>

            <h2 className="listino-title">Listino completo PlusMarket</h2>

            <input
                type="text"
                className="listino-search"
                placeholder="Cerca prodotto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="listino-table">
                {filtered.map((product) => (
                    <div key={product.codice} className="listino-row">
                        <div className="listino-code">{product.codice}</div>
                        <div className="listino-name">{product.nome}</div>
                        <div className="listino-price">
                            € {product.prezzo.toFixed(2)}
                        </div>

                        {product.a_peso === "S" ? (
                            <button
                                className="listino-btn"
                                onClick={() => setPopupProduct(product)}
                            >
                                Peso
                            </button>
                        ) : (
                            <button
                                className="listino-btn"
                                onClick={() => {
                                    addToCart(product, {
                                        productType: "pezzi",
                                        quantity: 1,
                                        weight: 0,
                                    });
                                    setToast("Aggiunto al carrello!");
                                }}
                            >
                                +1
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {popupProduct && (
                <PopupPeso
                    product={popupProduct}
                    onConfirm={(grams) => {
                        addToCart(popupProduct, {
                            productType: "peso",
                            quantity: 0,
                            weight: Number(grams),
                        });
                        setPopupProduct(null);
                        setToast("Aggiunto al carrello!");
                    }}
                    onClose={() => setPopupProduct(null)}
                />
            )}

            {toast && <Toast message={toast} onClose={() => setToast("")} />}
        </div>
    );
}
