import "../styles/theme.css";

export default function ChiSiamo() {
    return (
        <div className="info-page">

            <h1 className="info-title">Chi Siamo</h1>

            <p className="info-text">
                PlusMarket Giuntelli è il tuo negozio di fiducia a gestione familiare,
                presente sul territorio da oltre 113 anni. Ogni giorno selezioniamo
                prodotti freschi, di qualità e convenienti per servire al meglio la
                nostra comunità.
            </p>

            <p className="info-text">
                Con la nuova piattaforma digitale, vogliamo offrirti un servizio
                moderno, semplice e veloce per ordinare comodamente da casa.
            </p>

            <h2 className="info-subtitle">Una storia lunga oltre 110 anni</h2>

            <p className="info-text">
                Siamo qui dal 1913, con entusiasmo e cordialità, per essere al vostro
                servizio. Con i suoi 190 metri quadri di superficie, il negozio soddisfa
                un'ampia scelta di frutta e verdura e un reparto di banco fresco nel quale
                si possono trovare tutti i prodotti tipici della nostra bellissima terra:
                formaggella di Tremosine, formaggio Garda, burro e tanti altri prodotti locali.
            </p>

            <p className="info-text">
                Con l'efficienza che ci contraddistingue da cinque generazioni, l'attuale
                negozio vanta l'insegna storica riconosciuta dalla Regione Lombardia e una
                struttura completamente rinnovata. Un parcheggio privato offre un'ulteriore
                comodità per la clientela.
            </p>

            <p className="info-text">
                Per chi necessita di consegne a domicilio, il servizio è attivo tutto l'anno.
                Siamo provvisti di tutto ciò che vi serve… manca solo la tua visita!
            </p>

            <div className="info-numbers">
                <p className="info-number"><strong>1913</strong> — Anno di fondazione</p>
                <p className="info-number"><strong>5</strong> — Generazioni</p>
                <p className="info-number"><strong>190</strong> — Metri quadri</p>
            </div>

            <div className="hours-box">
                <h3 className="hours-title">Orari di apertura</h3>
                <p className="hours-line">7:30 – 12:30</p>
                <p className="hours-line">15:30 – 19:30</p>
                <p className="info-text-small">Aperto tutto l’anno</p>
            </div>

            <h2 className="info-subtitle">Due punti vendita al vostro servizio</h2>

            <p className="info-text">
                Trovi PlusMarket in due comode location sul Lago di Garda, nella splendida
                cornice di Tremosine.
            </p>

            <div className="map-container">

                <div className="map-box">
                    <h3 className="info-subtitle-small">Pregasio – Negozio Storico</h3>
                    <p className="info-text-small">
                        Via XXV Aprile 40, Fraz. Pregasio di Tremosine sul Garda
                    </p>

                    <iframe
                        title="Mappa Pregasio"
                        width="100%"
                        height="250"
                        style={{ border: 0, borderRadius: "12px" }}
                        loading="lazy"
                        allowFullScreen
                        src="https://www.google.com/maps?q=Via+XXV+Aprile+40+Tremosine&output=embed"
                    ></iframe>

                    <a
                        href="https://www.google.com/maps?q=Via+XXV+Aprile+40+Tremosine"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-button"
                    >
                        Apri in Google Maps
                    </a>
                </div>

                <div className="map-box">
                    <h3 className="info-subtitle-small">Pieve – Punto Vendita</h3>
                    <p className="info-text-small">
                        Via Cavalieri di Vittorio Veneto 19, Fraz. Pieve di Tremosine sul Garda
                    </p>

                    <iframe
                        title="Mappa Pieve"
                        width="100%"
                        height="250"
                        style={{ border: 0, borderRadius: "12px" }}
                        loading="lazy"
                        allowFullScreen
                        src="https://www.google.com/maps?q=Via+Cavalieri+di+Vittorio+Veneto+19+Tremosine&output=embed"
                    ></iframe>

                    <a
                        href="https://www.google.com/maps?q=Via+Cavalieri+di+Vittorio+Veneto+19+Tremosine"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-button"
                    >
                        Apri in Google Maps
                    </a>
                </div>

            </div>

            <p className="info-text">
                Visita il nostro sito: <br />
                <a href="https://www.plusmarket.it" target="_blank" rel="noopener noreferrer">
                    www.plusmarket.it
                </a>
            </p>

            <p className="info-text">
                Grazie per scegliere PlusMarket Giuntelli ogni giorno.
            </p>
        </div>
    );
}
