import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";

export default function Navbar() {
    const { items } = useCart();

    // Conta ogni prodotto (peso o pezzi)
    const cartCount = items.length;

    return (
        <nav className="mobile-navbar">
            <Link to="/" className="mobile-logo">
                <img src="/icon-192.png" alt="PlusMarket" />
            </Link>

            <Link to="/cart" className="mobile-cart">
                <span className="cart-count">{cartCount}</span>
                🛒
            </Link>
        </nav>
    );
}
