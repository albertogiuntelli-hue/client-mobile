import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api/axios";   // ✔️ percorso corretto

export default function ProductPage() {
    const { codice } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [quantity, setQuantity] = useState(1);
    const [weight, setWeight] = useState(100);

    useEffect(() => {
        api.get(`/prodotti/${codice}`).then((res) => {
            setProduct(res.data);
            setLoading(false);
        });
    }, [codice]);

    if (loading) return <p>Caricamento...</p>;
    if (!product) return <p>Prodotto non trovato</p>;

    const isWeightProduct = product.prezzo_al_kg === true;

    const handleAdd = () => {
        if (isWeightProduct) {
            addToCart(product, {
                productType: "peso",
                weight: Number(weight),
                quantity: 0,
            });
        } else {
            addToCart(product, {
                productType: "pezzi",
                quantity: Number(quantity),
                weight: 0,
            });
        }
    };

    return (
        <div className="product-page">
            <h1>{product.nome}</h1>
            <p>{product.descrizione}</p>

            {isWeightProduct ? (
                <>
                    <p>Prezzo al Kg: € {product.prezzo}</p>
                    <label>Seleziona grammi:</label>
                    <select
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    >
                        <option value="100">100g</option>
                        <option value="200">200g</option>
                        <option value="300">300g</option>
                        <option value="400">400g</option>
                        <option value="500">500g</option>
                    </select>
                </>
            ) : (
                <>
                    <p>Prezzo: € {product.prezzo}</p>
                    <label>Quantità:</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </>
            )}

            <button onClick={handleAdd} className="add-btn">
                Aggiungi al carrello
            </button>
        </div>
    );
}
