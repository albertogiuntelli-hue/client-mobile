import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

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
        <div className="products-list">
            {products.map((product) => (
                <Link
                    key={product.codice}
                    to={`/prodotti/${product.codice}`}
                    className="product-card"
                >
                    <h3>{product.nome}</h3>

                    {product.prezzo_al_kg === true ? (
                        <p>€ {product.prezzo} / Kg</p>
                    ) : (
                        <p>€ {product.prezzo}</p>
                    )}
                </Link>
            ))}
        </div>
    );
}
