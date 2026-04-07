import "../styles/theme.css";

export default function PopupPeso({ product, onConfirm, onClose }) {
    return (
        <div className="popup-overlay">
            <div className="popup-box">
                <h3>{product.nome}</h3>
                <p>Seleziona la quantità in grammi:</p>

                <div className="popup-buttons">
                    {[100, 200, 300].map((g) => (
                        <button
                            key={g}
                            className="btn-secondary"
                            onClick={() => onConfirm(g)}
                        >
                            {g} g
                        </button>
                    ))}
                </div>

                <input
                    type="number"
                    placeholder="Inserisci grammi"
                    className="popup-input"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            const grams = Number(e.target.value);
                            if (grams > 0) onConfirm(grams);
                        }
                    }}
                />

                <button className="btn-cancel" onClick={onClose}>
                    Annulla
                </button>
            </div>
        </div>
    );
}
