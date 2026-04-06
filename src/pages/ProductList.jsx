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

    if (loading) return <p style={{ padding: "20px" }}>Caricamento prodotti...</p>;

    if (products.length === 0)
        return <p style={{ padding: "20px" }}>Nessun prodotto disponibile.</p>;

    return (
        <div className="products-container">
            <div className="product-grid">
                {products.map((product) => (
                    <Link
                        key={product.codice}
                        to={`/product/${product.codice}`}
                        className="product-card"
                    >
                        {product.immagine && (
                            <img
                                src={product.immagine}
                                alt={product.nome}
                                className="product-img"
                            />
                        )}

                        <div className="product-name">{product.nome}</div>
                        <div className="product-code">Cod: {product.codice}</div>

                        <div className="product-price">
                            € {product.prezzo}
                            {product.prezzo_al_kg === true ? " / Kg" : ""}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
