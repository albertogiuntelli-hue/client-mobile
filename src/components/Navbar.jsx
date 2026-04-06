import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { items, total } = useCart();

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-logo">
                    <img src="/logo.png" alt="Logo" className="logo-img" />
                    <span className="navbar-title">PlusMarket Giuntelli</span>
                </Link>

                {/* 🔥 Carrello SEMPRE visibile anche su mobile */}
                <Link to="/cart" className="cart-link mobile-cart">
                    <div className="cart-info">
                        <span className="cart-count">🛒 {cartCount}</span>
                        <span className="cart-total">€{total.toFixed(2)}</span>
                    </div>
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
