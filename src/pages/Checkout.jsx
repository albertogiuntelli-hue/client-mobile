import { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../api/axios";
import "../styles/theme.css";

export default function Checkout() {
    const { items, clearCart, total } = useCart();

    const [cliente, setCliente] = useState({
        nome: "",
        cognome: "",
        indirizzo: "",
        telefono: "",
        note: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente((prev) => ({ ...prev, [name]: value }));
    };

    const sendOrder = async () => {
        if (!cliente.nome || !cliente.cognome || !cliente.indirizzo || !cliente.telefono) {
            alert("Compila tutti i campi obbligatori (nome, cognome, indirizzo, telefono).");
            return;
        }

        // 🔵 1) CONTROLLO SE L’UTENTE ESISTE GIÀ
        let existingUser = null;
        try {
            const res = await api.get(`/api/users/${cliente.telefono}`);
            existingUser = res.data;
        } catch (err) {
            existingUser = null; // se 404 → utente nuovo
        }

        // 🔵 2) SE NON ESISTE → LO REGISTRO
        if (!existingUser) {
            try {
                await api.post("/api/users", {
                    nome: cliente.nome,
                    cognome: cliente.cognome,
                    indirizzo: cliente.indirizzo,
                    telefono: cliente.telefono,
                    note: cliente.note || "",
                });
            } catch (err) {
                console.error("Errore registrazione utente:", err);
            }
        }

        // 🔵 3) SALVATAGGIO ORDINE
        try {
            await api.post("/api/orders", {
                cliente: {
                    nome: cliente.nome,
                    cognome: cliente.cognome,
                    indirizzo: cliente.indirizzo,
                    telefono: cliente.telefono,
                    note: cliente.note,
                },
                items: items.map((item) => ({
                    codice: item.codice,
                    nome: item.nome,
                    quantita: item.quantity,
                    prezzo: item.prezzo,
                    prezzo_scontato: item.prezzo_scontato || 0,
                })),
                totale: total,
            });
        } catch (err) {
            console.error("Errore salvataggio ordine:", err);
            alert("Ordine non salvato in dashboard. Riprova più tardi.");
        }

        // 🔵 4) APERTURA WHATSAPP
        const righeProdotti = items
            .map((item) => {
                const prezzoUnitario =
                    item.prezzo_scontato > 0 ? item.prezzo_scontato : item.prezzo;

                return `${item.nome} x${item.quantity} - €${(
                    prezzoUnitario * item.quantity
                ).toFixed(2)}`;
            })
            .join("\n");

        const messaggioWhatsApp =
            `*Nuovo ordine PlusMarket Giuntelli*\n\n` +
            `*Cliente:*\n` +
            `${cliente.nome} ${cliente.cognome}\n` +
            `${cliente.indirizzo}\n` +
            `Tel: ${cliente.telefono}\n\n` +
            `*Prodotti:*\n${righeProdotti}\n\n` +
            `*Totale:* €${total.toFixed(2)}\n\n` +
            `*Note:* ${cliente.note || "Nessuna"}`;

        const encoded = encodeURIComponent(messaggioWhatsApp);
        window.open(`https://wa.me/393356039828?text=${encoded}`, "_blank");

        // 🔵 5) SVUOTA CARRELLO E TORNA ALLA HOME
        clearCart();
        window.location.href = "/";
    };

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Riepilogo Ordine</h1>

            <div className="checkout-list">
                {items.map((item) => {
                    const prezzoUnitario =
                        item.prezzo_scontato > 0 ? item.prezzo_scontato : item.prezzo;

                    const totaleRiga = prezzoUnitario * item.quantity;

                    return (
                        <div key={item.codice} className="checkout-item">
                            <div>
                                <div className="checkout-name">{item.nome}</div>
                                <div className="checkout-qty">x{item.quantity}</div>
                            </div>
                            <div className="checkout-price">€ {totaleRiga.toFixed(2)}</div>
                        </div>
                    );
                })}
            </div>

            <h2 className="checkout-total">Totale: €{total.toFixed(2)}</h2>

            <div className="checkout-form">
                <h3>Dati cliente</h3>

                <div className="checkout-form-row">
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={cliente.nome}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="cognome"
                        placeholder="Cognome"
                        value={cliente.cognome}
                        onChange={handleChange}
                    />
                </div>

                <input
                    type="text"
                    name="indirizzo"
                    placeholder="Indirizzo completo"
                    value={cliente.indirizzo}
                    onChange={handleChange}
                    className="checkout-input-full"
                />

                <input
                    type="tel"
                    name="telefono"
                    placeholder="Numero di cellulare"
                    value={cliente.telefono}
                    onChange={handleChange}
                    className="checkout-input-full"
                />

                <textarea
                    name="note"
                    placeholder="Note aggiuntive (facoltative)"
                    value={cliente.note}
                    onChange={handleChange}
                    className="checkout-note"
                />
            </div>

            <button className="checkout-btn" onClick={sendOrder}>
                Invia ordine su WhatsApp
            </button>
        </div>
    );
}
