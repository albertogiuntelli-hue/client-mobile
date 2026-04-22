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

    const buildCustomerPayload = () => ({
        nome: `${nome} ${cognome}`.trim(),
        telefonoCliente: telefono || "",
        indirizzo: indirizzo || "",
        note: note || "",
        email: email || "",
    });

    const buildOrderPayload = (customerId, customerPayload) => ({
        items: cartItems.map((it) => ({
            productId: it.id || it._id,
            quantity: it.quantity || 1,
            price: it.price || 0,
        })),
        total: cartItems.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0),
        customerId: customerId || null,
        customer: customerPayload,
        status: "pending",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!validate()) return;

        setLoading(true);

        try {
            const customerPayload = buildCustomerPayload();

            // 1️⃣ CREA IL CLIENTE
            const customerData = await createUser(customerPayload);
            const customerId = customerData.id || customerData._id || null;

            // 2️⃣ CREA L’ORDINE
            const orderPayload = buildOrderPayload(customerId, customerPayload);
            const orderData = await createOrder(orderPayload);

            // reset
            setNome("");
            setCognome("");
            setTelefono("");
            setEmail("");
            setIndirizzo("");
            setNote("");
            setLoading(false);

            if (onSuccess) onSuccess({ customer: customerData, order: orderData });
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
