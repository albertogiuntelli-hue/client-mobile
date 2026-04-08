import { useState } from "react";
import "../styles/theme.css";

export default function PopupPeso({ product, onConfirm, onClose }) {
    const [grams, setGrams] = useState("");

    const quickSet = (value) => {
        setGrams(String(value));
    };

    const handleConfirm = () => {
        const peso = Number(grams);

        if (!peso || peso <= 0) {
            alert("Inserisci un peso valido.");
            return;
        }

        onConfirm(peso);
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h3>Seleziona quantità (grammi)</h3>

                <div className="quick-buttons">
                    <button onClick={() => quickSet(100)}>100g</button>
                    <button onClick={() => quickSet(200)}>200g</button>
                    <button onClick={() => quickSet(300)}>300g</button>
                    <button onClick={() => quickSet(500)}>500g</button>
                </div>

                <input
                    type="number"
                    value={grams}
                    onChange={(e) => setGrams(e.target.value)}
                    placeholder="Es. 100"
                />

                <div className="popup-buttons">
                    <button className="btn-primary" onClick={handleConfirm}>
                        Conferma
                    </button>
                    <button className="btn-secondary" onClick={onClose}>
                        Annulla
                    </button>
                </div>
            </div>
        </div>
    );
}
