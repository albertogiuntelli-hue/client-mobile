import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

export default function Carrello() {
    const {
        items,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        total,
    } = useCart();

    const navigate = useNavigate();

    if (items.length === 0) {
        return <p className="empty-cart">Il carrello è vuoto.</p>;
    }

    // 🔥 Calcolo prezzo corretto per ogni prodotto
    const getItemPrice = (item) => {
        const prezzoUnitario =
            item.prezzo_scontato > 0 ? item.prezzo_scontato : item.prezzo;

        if (item.productType === "pezzi") {
            return (prezzoUnitario * item.quantity).toFixed(2);
        }

        if (item.productType === "peso") {
            const pesoKg = item.weight / 1000;
            return (prezzoUnitario * pesoKg).toFixed(2);
        }

        return "0.00";
    };

    return (
        <div className="cart-container">
            <h2>Carrello</h2>

            {items.map((item) => (
                <div key={item.codice} className="cart-item">

                    <img
                        src={item.immagine || "/placeholder.png"}
                        alt={item.nome}
                        className="cart-img"
                    />

                    <div className="cart-info">
                        <div className="cart-name">{item.nome}</div>
                        <div className="cart-code">Cod: {item.codice}</div>

                        {/* 🔥 PREZZO CORRETTO PER IL PESO */}
                        <div className="cart-price">
                            Prezzo: € {getItemPrice(item)}
                        </div>

                        {/* 🔥 GESTIONE PRODOTTI A PEZZI */}
                        {item.productType === "pezzi" && (
                            <div className="cart-qty">
                                <button
                                    className="btn-small"
                                    onClick={() => decreaseQuantity(item)}
                                >
                                    -
                                </button>

                                <span>{item.quantity} pz</span>

                                <button
                                    className="btn-small"
                                    onClick={() =>
                                        addToCart(item, {
                                            productType: "pezzi",
                                            quantity: 1,
                                            weight: 0,
                                        })
                                    }
                                >
                                    +
                                </button>
                            </div>
                        )}

                        {/* 🔥 GESTIONE PRODOTTI A PESO */}
                        {item.productType === "peso" && (
                            <div className="cart-qty">
                                <button
                                    className="btn-small"
                                    onClick={() => decreaseQuantity(item)}
                                >
                                    -
                                </button>

                                <span>{item.weight} g</span>

                                <button
                                    className="btn-small"
                                    onClick={() =>
                                        addToCart(item, {
                                            productType: "peso",
                                            quantity: 0,
                                            weight: 50, // aggiunge 50g
                                        })
                                    }
                                >
                                    +
                                </button>
                            </div>
                        )}

                        <button
                            className="btn-remove"
                            onClick={() => removeFromCart(item)}
                        >
                            Rimuovi
                        </button>
                    </div>
                </div>
            ))}

            {/* 🔥 TOTALE CORRETTO */}
            <div className="cart-total">
                Totale: € {total.toFixed(2)}
            </div>

            <button
                className="btn-primary checkout-btn"
                onClick={() => navigate("/checkout")}
            >
                Procedi al checkout
            </button>

            <button className="btn-cancel" onClick={clearCart}>
                Svuota carrello
            </button>
        </div>
    );
}
