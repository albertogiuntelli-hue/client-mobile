import { useCart } from "../context/CartContext";
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

    if (items.length === 0) {
        return <p className="empty-cart">Il carrello è vuoto.</p>;
    }

    return (
        <div className="cart-container">
            <h2>Carrello</h2>

            {items.map((item) => (
                <div key={item.codice} className="cart-item">

                    {/* IMMAGINE */}
                    <img
                        src={item.immagine || "/placeholder.png"}
                        alt={item.nome}
                        className="cart-img"
                    />

                    <div className="cart-info">
                        <div className="cart-name">{item.nome}</div>
                        <div className="cart-code">Cod: {item.codice}</div>

                        {/* PREZZO */}
                        <div className="cart-price">
                            Prezzo: €{" "}
                            {item.prezzo_scontato > 0
                                ? item.prezzo_scontato
                                : item.prezzo}
                        </div>

                        {/* QUANTITÀ */}
                        {item.productType === "pezzi" ? (
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
                        ) : (
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
                                            weight: 50,
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

            {/* TOTALE */}
            <div className="cart-total">
                Totale: € {total.toFixed(2)}
            </div>

            <button className="btn-primary checkout-btn">
                Procedi al checkout
            </button>

            <button className="btn-cancel" onClick={clearCart}>
                Svuota carrello
            </button>
        </div>
    );
}
