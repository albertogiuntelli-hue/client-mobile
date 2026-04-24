import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/orders";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const { items, total, clearCart } = useCart();
    const navigate = useNavigate();

    // 🔥 Ripristina anagrafica salvata
    const saved = JSON.parse(localStorage.getItem("cliente") || "{}");

    const [nome, setNome] = useState(saved.nome || "");
    const [cognome, setCognome] = useState(saved.cognome || "");
    const [telefonoCliente, setTelefonoCliente] = useState(saved.telefono || "");
    const [indirizzo, setIndirizzo] = useState(saved.indirizzo || "");
    const [email, setEmail] = useState(saved.email || "");
    const [note, setNote] = useState(saved.note || "");

    const telefonoNegozio = "3356039828";

    const inviaOrdineBackend = async () => {
        const cliente = {
            nome,
            cognome,
            telefono: telefonoCliente,
            indirizzo,
            email,
            note,
        };

        // 🔥 Salva anagrafica per la prossima volta
        localStorage.setItem("cliente", JSON.stringify(cliente));

        const ordine = {
            cliente,
            prodotti: items.map((p) => {
                const isPeso = p.a_peso === "S";

                return {
                    codice: p.codice,
                    nome: p.nome,
                    quantita: isPeso ? 0 : Number(p.quantity),
                    peso: isPeso ? Number(p.weight) : 0,
                    tipo: p.a_peso,
                    prezzo: Math.round(Number(p.prezzo) * 100),
                    prezzo_scontato: 0,
                };
            }),
            totale: Math.round(total * 100),
            createdAt: new Date().toISOString(), // ⭐ Data ordine
        };

        await createOrder(ordine);
    };

    const sendOrderWhatsApp = async () => {
        await inviaOrdineBackend();

        const ua = navigator.userAgent.toLowerCase();
        const hasWhatsApp = ua.includes("android") || ua.includes("iphone");

        if (!hasWhatsApp) {
            alert("Ordine inviato! (WhatsApp non disponibile)");
            clearCart();
            navigate("/grazie"); // ⭐ Pagina ringraziamento
            return;
        }

        const message = items
            .map((p) => {
                const isPeso = p.a_peso === "S";
                const qty = Number(p.quantity) || 0;
                const weight = Number(p.weight) || 0;
                const prezzoUnit = Number(p.prezzo);

                const subtotal = isPeso
                    ? ((weight / 1000) * prezzoUnit).toFixed(2)
                    : (qty * prezzoUnit).toFixed(2);

                return `• ${p.nome} — ${isPeso ? weight + " g" : qty + " pz"} — ${subtotal.replace(".", ",")} €`;
            })
            .join("\n");

        const finalMessage =
            "Ordine PlusMarket\n\n" +
            message +
            "\n------------------------------\n" +
            `Totale: ${total.toFixed(2).replace(".", ",")} €\n` +
            `Nome: ${nome}\n` +
            `Cognome: ${cognome}\n` +
            `Telefono: ${telefonoCliente}\n` +
            `Indirizzo: ${indirizzo}\n` +
            (email ? `Email: ${email}\n` : "") +
            (note ? `Note: ${note}\n` : "") +
            "\nGrazie!";

        const url = `https://wa.me/39${telefonoNegozio}?text=${encodeURIComponent(finalMessage)}`;

        window.open(url, "_blank");
        clearCart();
        navigate("/grazie"); // ⭐ Pagina ringraziamento
    };

    return (
        <div className="products-container">
            <h1 className="page-title">Checkout</h1>

            {items.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <>
                    <div className="products-grid">
                        {items.map((item) => {
                            const isPeso = item.a_peso === "S";
                            const prezzoUnit = item.prezzo;

                            const subtotal = isPeso
                                ? (item.weight / 1000) * prezzoUnit
                                : item.quantity * prezzoUnit;

                            return (
                                <div key={item.codice} className="product-card">
                                    <h3 className="product-name">{item.nome}</h3>
                                    <p className="product-price">
                                        {subtotal.toFixed(2).replace(".", ",")} €
                                    </p>
                                    <p className="product-code">
                                        {isPeso
                                            ? `Peso: ${item.weight} g`
                                            : `Quantità: ${item.quantity} pz`}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                        <input style={inputStyle} placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <input style={inputStyle} placeholder="Cognome" value={cognome} onChange={(e) => setCognome(e.target.value)} />
                        <input style={inputStyle} placeholder="Telefono" value={telefonoCliente} onChange={(e) => setTelefonoCliente(e.target.value)} />
                        <input style={inputStyle} placeholder="Indirizzo" value={indirizzo} onChange={(e) => setIndirizzo(e.target.value)} />

                        {/* ⭐ Campo email ripristinato */}
                        <input style={inputStyle} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <textarea
                            placeholder="Note (opzionale)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            style={{ ...inputStyle, height: "80px" }}
                        />
                    </div>

                    <button className="checkout-submit-btn" onClick={sendOrderWhatsApp}>
                        Invia ordine
                    </button>

                    <button
                        className="add-to-cart-btn"
                        style={{ marginTop: "10px", backgroundColor: "#dc3545" }}
                        onClick={clearCart}
                    >
                        Svuota carrello
                    </button>
                </>
            )}
        </div>
    );
}

const inputStyle = {
    padding: "10px",
    width: "80%",
    maxWidth: "400px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "15px",
};
