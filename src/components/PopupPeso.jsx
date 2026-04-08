import { useState } from "react";
import "../styles/theme.css";

export default function PopupPeso({ product, onConfirm, onClose }) {
    const [grams, setGrams] = useState("");

    const handleConfirm = () => {
        const peso = Number(grams); // 🔥 conversione sicura

        if (!peso || peso <= 0) {
            alert("Inserisci un peso valido.");
            return;
        }

        onConfirm(peso); // 🔥 ora passa un numero, non una stringa
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h3>Seleziona quantità (grammi)</h3>

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
