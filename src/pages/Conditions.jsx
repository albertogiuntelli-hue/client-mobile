import { useNavigate } from "react-router-dom";
import logo from "../../public/icon-192.png";
import "../styles/theme.css";

export default function Conditions() {
    const navigate = useNavigate();

    return (
        <div className="thanks-container" style={{ padding: "20px" }}>
            <img
                src={logo}
                alt="PlusMarket"
                style={{ width: "120px", margin: "0 auto 20px", display: "block" }}
            />

            <h1 className="thanks-title">Condizioni di vendita</h1>

            <button
                onClick={() => navigate(-1)}
                style={{
                    backgroundColor: "#4E9F3D",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "none",
                    marginBottom: "20px",
                    fontSize: "16px",
                    cursor: "pointer",
                }}
            >
                Torna indietro
            </button>

            <p className="thanks-text" style={{ textAlign: "left", lineHeight: "1.6" }}>
                <strong>Condizioni di vendita (App)</strong><br /><br />

                • Le presenti condizioni disciplinano la vendita di prodotti effettuata tramite app.<br /><br />

                • <strong>Importo minimo d’ordine: € 20,00.</strong><br /><br />

                • <strong>Invio ordine e conferma:</strong> l’ordine si intende ricevuto quando il Cliente visualizza il messaggio di ringraziamento/accettazione in app (o la conferma inviata via WhatsApp/email).<br /><br />

                • <strong>Annullamento/modifica ordine:</strong> non è previsto l’annullamento dell’ordine dopo l’invio.<br /><br />

                • <strong>Consegna:</strong> la consegna avviene entro il giorno successivo all’invio dell’ordine, salvo diversa disponibilità, previo accordo con il Cliente (telefono/WhatsApp/email) su indirizzo e fascia oraria.<br /><br />

                • <strong>Ritiro in negozio:</strong> il Cliente può ritirare presso:<br />
                – Tremosine sul Garda - Fr. Pregasio, Via XXV Aprile 40<br />
                – Tremosine sul Garda - Fr. Pieve, Via Cavalieri di Vittorio Veneto 19<br /><br />

                • <strong>Zona e costi di consegna:</strong> gratuita entro 10 km. Oltre, eventuali costi comunicati prima della consegna.<br /><br />

                • <strong>Pagamento:</strong> alla consegna in contanti.<br /><br />

                • <strong>Prodotti freschi:</strong> verificare la merce alla consegna. Reclami entro 24 ore.
            </p>
        </div>
    );
}
