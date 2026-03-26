// client-mobile/src/pages/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import "../styles/theme.css";

export default function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">Benvenuto in PlusMarket Giuntelli</h1>

            <p className="home-subtitle">
                Il tuo negozio di fiducia, ora anche online.
            </p>

            <p className="home-text">
                Sfoglia i prodotti e inizia il tuo ordine direttamente dal tuo
                smartphone.
            </p>

            <Link to="/prodotti" className="btn-primary">
                Vai ai Prodotti
            </Link>
        </div>
    );
}
