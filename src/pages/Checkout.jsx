import { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../api/axios";
import "../styles/theme.css";

export default function Checkout() {
    const { items, total, clearCart } = useCart();

    const [nome, setNome] = useState("");
    const [telefono, setTelefono] = useState("");
    const [indirizzo, setIndirizzo] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        if (!nome || !telefono || !indirizzo) {
            alert("Compila tutti i campi obbligatori.");
            return;
        }

        setLoading(true);

        try {
            await api.post("/api/orders", {
                cliente: { nome, telefono, indirizzo, note },
                prodotti: items,
                totale: total.toFixed(2),
            });

            clearCart();
            setSuccess(true);
        } catch (err) {
            console.error("Errore invio ordine:", err);
            alert("Errore durante l'invio dell'ordine.");
        }

        setLoading(false);
    };

    if (success) {
        return (
            <div className="checkout-success">
                <h2>Ordine inviato!</h2>
                <p>Grazie per aver ordinato da PlusMarket Giuntelli.</p>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>

            <div className="checkout-summary">
                <h3>Riepilogo ordine</h3>
                {items.map((item) => (
                    <div key={item.codice} className="checkout-item">
                        <span>{item.nome}</span>
                        <span>
                            {item.productType === "pezzi"
                                ? `${item.quantity} pz`
                                : `${item.weight} g`}
                        </span>
                        <span>
                            €{" "}
                            {(
                                (item.prezzo_scontato > 0
                                    ? item.prezzo_scontato
                                    : item.prezzo) *
                                (item.productType === "pezzi"
                                    ? item.quantity
                                    : item.weight / 1000)
                            ).toFixed(2)}
                        </span>
                    </div>
                ))}

                <div className="checkout-total">
                    Totale: € {total.toFixed(2)}
                </div>
            </div>

            <div className="checkout-form">
                <h3>Dati cliente</h3>

                <input
                    type="text"
                    placeholder="Nome e cognome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Indirizzo"
                    value={indirizzo}
                    onChange={(e) => setIndirizzo(e.target.value)}
                />

                <textarea
                    placeholder="Note (opzionale)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />

                <button
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Invio in corso..." : "Invia ordine"}
                </button>
            </div>
        </div>
    );
}
