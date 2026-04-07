import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { items, total } = useCart();

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-logo">
                    <img src="/logo.png" alt="Logo" />
                    <span className="navbar-title">PlusMarket Giuntelli</span>
                </Link>

                <Link to="/cart" className="cart-link">
                    <span className="cart-badge">{cartCount}</span>
                    🛒 €{total.toFixed(2)}
                </Link>

                <div
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </nav>

            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                    Home
                </Link>

                <Link to="/prodotti" onClick={() => setMenuOpen(false)}>
                    Prodotti
                </Link>

                <Link to="/cart" onClick={() => setMenuOpen(false)}>
                    🛒 {cartCount} — €{total.toFixed(2)}
                </Link>
            </div>
        </>
    );
}
