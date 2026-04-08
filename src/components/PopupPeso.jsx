import "../styles/theme.css";

export default function PopupPeso({ product, onConfirm, onClose }) {
    const presetWeights = [100, 200, 300, 500];

    const handleSelect = (grams) => {
        const peso = Number(grams);
        if (!peso || peso <= 0) {
            alert("Peso non valido.");
            return;
        }
        onConfirm(peso); // 🔥 passa un numero vero
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h3>Seleziona quantità (grammi)</h3>

                <div className="weight-buttons">
                    {presetWeights.map((g) => (
                        <button
                            key={g}
                            className="btn-primary"
                            onClick={() => handleSelect(g)}
                        >
                            {g} g
                        </button>
                    ))}
                </div>

                <button className="btn-secondary" onClick={onClose}>
                    Annulla
                </button>
            </div>
        </div>
    );
}
