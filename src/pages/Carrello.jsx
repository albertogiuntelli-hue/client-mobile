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

    const FALLBACK = "/logo.png";

    const getImage = (img) => {
        if (!img || img.trim() === "" || img === "null" || img === "undefined") {
            return FALLBACK;
        }
        return img.startsWith("http") ? img : img;
    };

    if (items.length === 0) {
        return (
            <div className="cart-container">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← Torna indietro
                </button>
                <p className="empty-cart">Il carrello è vuoto.</p>
            </div>
        );
    }

    const getItemPrice = (item) => {
        const prezzoUnitarioEuro = item.prezzo / 100;

        if (item.productType === "pezzi") {
            return (prezzoUnitarioEuro * item.quantity).toFixed(2);
        }

        if (item.productType === "peso") {
            const pesoKg = item.weight / 1000;
            return (prezzoUnitarioEuro * pesoKg).toFixed(2);
        }

        return "0.00";
    };

    return (
        <div className="cart-container">

            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Torna indietro
            </button>

            <h2>Carrello</h2>

            {items.map((item) => (
                <div key={item.codice} className="cart-item">

                    <img
                        src={getImage(item.immagine)}
                        alt={item.nome}
                        className="cart-img"
                    />

                    <div className="cart-info">

                        <div className="cart-name">{item.nome}</div>

                        <div className="cart-code">Cod: {item.codice}</div>

                        <div className="cart-price">
                            Prezzo: € {getItemPrice(item)}
                        </div>

                        <div className="cart-qty">
                            <button
                                className="btn-small"
                                onClick={() => decreaseQuantity(item)}
                            >
                                -
                            </button>

                            <span>
                                {item.productType === "pezzi"
                                    ? `${item.quantity} pz`
                                    : `${item.weight} g`}
                            </span>

                            <button
                                className="btn-small"
                                onClick={() =>
                                    addToCart(item, {
                                        productType: item.productType,
                                        quantity: item.productType === "pezzi" ? 1 : 0,
                                        weight: item.productType === "peso" ? 50 : 0,
                                    })
                                }
                            >
                                +
                            </button>
                        </div>

                        <button
                            className="btn-remove"
                            onClick={() => removeFromCart(item)}
                        >
                            Rimuovi
                        </button>

                    </div>
                </div>
            ))}

            <div className="cart-total">
                Totale: € {total.toFixed(2)}
            </div>

            <button
                className="btn-primary checkout-btn"
                onClick={() => navigate("/checkout")}
            >
                Procedi al checkout
            </button>

            <button className="btn-cancel btn-big" onClick={clearCart}>
                Svuota carrello
            </button>
        </div>
    );
}
