import { useCart } from "../context/CartContext";
import { useState } from "react";
import { sendOrder } from "../api/orders";

export default function Checkout() {
    const { items, clearCart, total } = useCart();

    const [indirizzo, setIndirizzo] = useState("");
    const telefono = "3356039828";

    const inviaOrdineBackend = async () => {
        try {
            const ordine = {
                cliente: {
                    nome: "Cliente",
                    cognome: "Online",
                    telefono,
                    indirizzo,
                    note: ""
                },

                prodotti: items.map((p) => {
                    const isPeso = p.a_peso === "S";

                    return {
                        codice: p.codice,
                        nome: p.nome,

                        // 🔥 quantità corretta
                        quantita: isPeso ? 0 : p.quantity,

                        // 🔥 peso corretto
                        peso: isPeso ? p.weight : 0,

                        // 🔥 tipo corretto (S/N)
                        tipo: p.a_peso,

                        // 🔥 prezzo in centesimi (backend lo vuole così)
                        prezzo: p.prezzo,

                        // 🔥 obbligatorio per backend
                        prezzo_scontato: 0
                    };
                }),

                totale: total
            };

            await sendOrder(ordine);
            console.log("Ordine inviato al backend");
        } catch (error) {
            console.error("Errore invio backend:", error);
        }
    };

    const sendOrderWhatsApp = async () => {
        await inviaOrdineBackend();

        const message = items
            .map((p) => {
                const isPeso = p.a_peso === "S";
                const prezzoUnit = p.prezzo / 100;

                const subtotal = isPeso
                    ? ((p.weight / 1000) * prezzoUnit).toFixed(2)
                    : (p.quantity * prezzoUnit).toFixed(2);

                return `• ${p.nome} — ${isPeso ? p.weight + " g" : p.quantity + " pz"
                    } — ${subtotal.replace(".", ",")} €`;
            })
            .join("\n");

        const finalMessage =
            "Ordine PlusMarket\n\n" +
            message +
            "\n------------------------------\n" +
            `Totale: ${total.toFixed(2).replace(".", ",")} €\n` +
            `Indirizzo: ${indirizzo || "Non specificato"}\n\n` +
            "Grazie!";

        const url = `https://wa.me/39${telefono}?text=${encodeURIComponent(
            finalMessage
        )}`;

        window.open(url, "_blank");
    };

    return (
        <div className="products-container">
            <h1 className="page-title">Checkout</h1>

            {items.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <>
                    <div className="products-grid">
                        {items.map((item) => (
                            <div key={item.codice} className="product-card">
                                <h3 className="product-name">{item.nome}</h3>

                                <p className="product-price">
                                    {(item.prezzo / 100)
                                        .toFixed(2)
                                        .replace(".", ",")} €
                                </p>

                                <p className="product-code">
                                    {item.a_peso === "S"
                                        ? `Peso: ${item.weight} g`
                                        : `Quantità: ${item.quantity} pz`}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                        <input
                            type="text"
                            placeholder="Inserisci il tuo indirizzo"
                            value={indirizzo}
                            onChange={(e) => setIndirizzo(e.target.value)}
                            style={{
                                padding: "10px",
                                width: "80%",
                                maxWidth: "400px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                marginBottom: "15px",
                            }}
                        />
                    </div>

                    <button
                        className="add-to-cart-btn"
                        style={{ marginTop: "10px" }}
                        onClick={sendOrderWhatsApp}
                    >
                        Invia ordine via WhatsApp
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
