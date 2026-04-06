import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/ProductList.css"; // IMPORTANTE: importa il CSS corretto

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <p>Caricamento prodotti...</p>;

    return (
        <div className="products-container">
            <div className="product-grid">
                {products.map((product) => (
                    <Link
                        key={product.codice}
                        to={`/prodotti/${product.codice}`}
                        className="product-card"
                    >
                        <div className="product-name">{product.nome}</div>
                        <div className="product-code">Cod: {product.codice}</div>

                        {product.prezzo_al_kg === true ? (
                            <div className="product-price">€ {product.prezzo} / Kg</div>
                        ) : (
                            <div className="product-price">€ {product.prezzo}</div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}
