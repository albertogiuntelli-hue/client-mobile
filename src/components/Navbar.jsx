import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";

export default function Navbar() {
    const { items, total } = useCart();

    // Numero articoli (peso o pezzi)
    const cartCount = items.length;

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
                            <span className="cart-total">
                                €{total.toFixed(2).replace(".", ",")}
                            </span>
                        </>
                    )}
                </div>
            </Link>
        </nav>
    );
}
