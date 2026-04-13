import { useCart } from "../context/CartContext";
import { useState } from "react";
import { sendOrder } from "../api/orders";
import "./Products.css";

export default function Checkout() {
    const { cart, clearCart } = useCart();

    const telefono = "3356039828";
    const [indirizzo, setIndirizzo] = useState("");

    const inviaOrdineBackend = async () => {
        try {
            const totale = cart.reduce(
                (sum, p) => sum + p.prezzo * p.qty,
                0
            );

            const ordine = {
                cliente: {
                    nome: "Cliente",
                    cognome: "",
                    telefono,
                    indirizzo,
                    note: ""
                },
                prodotti: cart.map((p) => ({
                    codice: p.codice || "",
                    nome: p.nome,
                    quantity: p.qty,
                    prezzo: p.prezzo / 100,
                    productType: "pezzi",
                    weight: 0
                })),
                totale
            };

            await sendOrder(ordine);
            console.log("Ordine inviato al backend");
        } catch (error) {
            console.error("Errore invio backend:", error);
        }
    };

    const sendOrderWhatsApp = async () => {
        await inviaOrdineBackend(); // 🔥 ORA SALVA ANCHE NEL BACKEND

        const message = cart
            .map(
                (p) =>
                    `• ${p.nome} x${p.qty} – ${(p.prezzo / 100)
                        .toFixed(2)
                        .replace(".", ",")} €`
            )
            .join("\n");

        const totale = cart
            .reduce((sum, p) => sum + p.prezzo * p.qty, 0)
            .toFixed(2)
            .replace(".", ",");

        const separatore = "------------------------------";

        const finalMessage =
            "Ordine PlusMarket\n\n" +
            separatore + "\n" +
            message + "\n" +
            separatore + "\n" +
            `Totale: ${totale} €\n` +
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

            {cart.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <>
                    <div className="products-grid">
                        {cart.map((item) => (
                            <div key={item._id} className="product-card">
                                <h3 className="product-name">{item.nome}</h3>

                                <p className="product-price">
                                    {(item.prezzo / 100)
                                        .toFixed(2)
                                        .replace(".", ",")} €
                                </p>

                                <p className="product-code">
                                    Quantità: {item.qty}
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
