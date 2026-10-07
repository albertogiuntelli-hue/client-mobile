import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";

export default function Navbar() {
    const { items, total } = useCart();

    // Conteggio reale articoli
    const cartCount = items.reduce((sum, item) => {
        if (item.productType === "pezzi") {
            return sum + item.quantity;
        }
        return sum + 1; // ogni prodotto a peso vale 1
    }, 0);

    const safeTotal = Number(total || 0).toFixed(2).replace(".", ",");

    return (
        <nav className="mobile-navbar">
            <Link to="/" className="mobile-logo">
                <img src="/icon-192.png" alt="PlusMarket" />
            </Link>

            <Link to="/cart" className="mobile-cart">
                <div className="cart-info">
                    🛒
                    {cartCount > 0 && (
                        <>
                            <span className="cart-count">{cartCount}</span>
                            <span className="cart-total">€{safeTotal}</span>
                        </>
                    )}
                </div>
            </Link>
        </nav>
    );
}
