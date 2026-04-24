import logo from "../../public/icon-192.png";
import "../styles/theme.css";

export default function Conditions() {
    return (
        <div className="thanks-container" style={{ padding: "20px" }}>
            <img
                src={logo}
                alt="PlusMarket"
                style={{ width: "120px", margin: "0 auto 20px", display: "block" }}
            />

            <h1 className="thanks-title">Condizioni di vendita</h1>

            <p className="thanks-text" style={{ textAlign: "left", lineHeight: "1.6" }}>
                <strong>Condizioni di vendita (App)</strong><br /><br />

                • Le presenti condizioni disciplinano la vendita di prodotti effettuata tramite app.<br /><br />

                • <strong>Importo minimo d’ordine: € 20,00.</strong><br /><br />

                • <strong>Invio ordine e conferma:</strong> l’ordine si intende ricevuto quando il Cliente visualizza il messaggio di ringraziamento/accettazione in app (o la conferma inviata via WhatsApp/email).<br /><br />

                • <strong>Annullamento/modifica ordine:</strong> non è previsto l’annullamento dell’ordine dopo l’invio.<br /><br />

                • <strong>Consegna:</strong> la consegna avviene entro il giorno successivo all’invio dell’ordine, salvo diversa disponibilità, previo accordo con il Cliente (telefono/WhatsApp/email) su indirizzo e fascia oraria. In caso di assenza del Cliente all’indirizzo indicato, potrà essere concordata una nuova consegna con eventuale addebito dei costi aggiuntivi.<br /><br />

                • <strong>Ritiro in negozio:</strong> in alternativa alla consegna, il Cliente può effettuare l’ordine in app e ritirarlo presso uno dei seguenti punti vendita:<br />
                – Tremosine sul Garda - Fr. Pregasio, Via XXV Aprile 40<br />
                – Tremosine sul Garda - Fr. Pieve, Via Cavalieri di Vittorio Veneto 19<br />
                Il ritiro può avvenire lo stesso giorno o il giorno successivo all’invio dell’ordine, salvo diversa disponibilità.<br /><br />

                • <strong>Zona e costi di consegna:</strong> la consegna è gratuita entro 10 km (Tremosine, incluso Voltino e, previo accordo con il Cliente, anche Bassanega). Oltre i 10 km potranno essere applicate spese di consegna variabili in base alla distanza; l’importo verrà comunicato al Cliente prima della consegna e si intenderà accettato con la conferma dell’ordine/consegna.<br /><br />

                • <strong>Pagamento:</strong> il pagamento avviene alla consegna in contanti. Il Cliente si impegna a predisporre l’importo dovuto (inclusi eventuali costi di consegna comunicati).<br /><br />

                • <strong>Prodotti freschi, sostituzioni e reclami:</strong> trattandosi di prodotti freschi, il Cliente è tenuto a verificare la merce al momento della consegna. Eventuali non conformità devono essere contestate entro 24 ore. Ove necessario, il venditore potrà proporre sostituzione o rimborso.
            </p>
        </div>
    );
}
