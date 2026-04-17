import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

export default function Grazie() {
    const navigate = useNavigate();

    return (
        <div className="thanks-container">
            <h1 className="thanks-title">Grazie per il tuo ordine!</h1>

            <p className="thanks-text">
                Il tuo ordine è stato inviato correttamente.
                Ti contatteremo a breve per la conferma.
            </p>

            <button
                className="home-btn"
                onClick={() => navigate("/")}
                style={{ marginTop: "30px" }}
            >
                Torna alla Home
            </button>
        </div>
    );
}
