import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

export default function ListinoCompleto() {
    const navigate = useNavigate();

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <button className="back-btn" onClick={() => navigate("/")}>
                ⬅ Torna indietro
            </button>

            <h2 style={{ marginTop: "40px" }}>Listino completo PlusMarket</h2>

            <p style={{ marginTop: "20px", fontSize: "18px" }}>
                🚧 Pagina in costruzione
            </p>

            <p style={{ marginTop: "10px", color: "#666" }}>
                Il listino completo sarà disponibile a breve.
            </p>
        </div>
    );
}
