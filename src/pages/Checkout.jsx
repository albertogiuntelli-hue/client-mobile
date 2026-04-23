import React, { useState } from "react";
import { createUser } from "../api/users";
import { createOrder } from "../api/orders";

export default function Checkout({ cartItems = [], onSuccess, redirectToSuccess }) {
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [indirizzo, setIndirizzo] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const validate = () => {
        if (!nome.trim()) {
            setError("Inserisci il nome del cliente.");
            return false;
        }
        if (!email || !email.includes("@")) {
            setError("Inserisci un'email valida.");
            return false;
        }
        return true;
    };

    /* ============================================================
       COSTRUZIONE PAYLOAD CLIENTE (formato backend)
    ============================================================ */
    const buildCustomerPayload = () => ({
        nome: nome || "",
        cognome: cognome || "",
        telefono: telefono || "",
        email: email || "",
        indirizzo: indirizzo || "",
        note: note || "",
    });

    /* ============================================================
       COSTRUZIONE PAYLOAD ORDINE (formato backend)
    ============================================================ */
    const buildOrderPayload = (customerPayload) => ({
        cliente: customerPayload,

        prodotti: cartItems.map((it) => ({
            codice: it.codice,
            nome: it.nome,
            tipo: it.productType, // "peso" | "pezzi"

            quantita: it.productType === "pezzi"
                ? it.quantity
                : 0,

            peso: it.productType === "peso"
                ? it.weight
                : 0,

            prezzo: it.prezzo,
            prezzo_scontato: it.prezzo_scontato || 0,
        })),

        totale: cartItems.reduce((sum, it) => {
            const prezzoUnitario =
                it.prezzo_scontato > 0 ? it.prezzo_scontato : it.prezzo;

            if (it.productType === "pezzi") {
                return sum + prezzoUnitario * it.quantity;
            }

            if (it.productType === "peso") {
                return sum + (it.weight / 1000) * prezzoUnitario;
            }

            return sum;
        }, 0),

        note: note || "",
        stato: "in attesa",
    });

    /* ============================================================
       SUBMIT
    ============================================================ */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!validate()) return;

        setLoading(true);

        try {
            const customerPayload = buildCustomerPayload();

            // 1️⃣ REGISTRA CLIENTE
            await createUser(customerPayload);

            // 2️⃣ CREA ORDINE
            const orderPayload = buildOrderPayload(customerPayload);
            const orderData = await createOrder(orderPayload);

            // reset form
            setNome("");
            setCognome("");
            setTelefono("");
            setEmail("");
            setIndirizzo("");
            setNote("");
            setLoading(false);

            if (onSuccess) onSuccess(orderData);
            if (redirectToSuccess) redirectToSuccess(orderData);

        } catch (err) {
            console.error(err);
            setError("Errore durante la registrazione.");
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>

            {error && <div style={{ color: "red" }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome</label>
                    <input value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>

                <div>
                    <label>Cognome</label>
                    <input value={cognome} onChange={(e) => setCognome(e.target.value)} />
                </div>

                <div>
                    <label>Telefono</label>
                    <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </div>

                <div>
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div>
                    <label>Indirizzo</label>
                    <input value={indirizzo} onChange={(e) => setIndirizzo(e.target.value)} />
                </div>

                <div>
                    <label>Note</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Sto registrando..." : "Conferma ordine e registra cliente"}
                </button>
            </form>
        </div>
    );
}
