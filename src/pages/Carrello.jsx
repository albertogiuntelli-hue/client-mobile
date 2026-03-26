import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Carrello() {
    const { items, addToCart, decreaseQuantity, removeFromCart, total } = useCart();

    return (
        <div style={{ padding: "15px" }}>
            <h2 style={{ marginBottom: "15px" }}>Riepilogo Carrello</h2>

            {items.length === 0 && <p>Il carrello è vuoto.</p>}

            {items.map((item) => {
                const prezzoUnitario = item.prezzoSco > 0 ? item.prezzoSco : item.prezzo;
                const totaleRiga = prezzoUnitario * item.quantity;

                return (
                    <div
                        key={item.codice}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px 0",
                            borderBottom: "1px solid #ddd",
                        }}
                    >
                        {/* INFO PRODOTTO */}
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: 0 }}>{item.nome}</h4>

                            {/* CONTROLLI QUANTITÀ */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginTop: "5px",
                                }}
                            >
                                <button
                                    onClick={() => decreaseQuantity(item)}
                                    style={{
                                        padding: "5px 10px",
                                        fontSize: "18px",
                                        borderRadius: "6px",
                                        border: "1px solid #ccc",
                                    }}
                                >
                                    –
                                </button>

                                <span style={{ fontSize: "16px" }}>
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() => addToCart(item)}
                                    style={{
                                        padding: "5px 10px",
                                        fontSize: "18px",
                                        borderRadius: "6px",
                                        border: "1px solid #ccc",
                                    }}
                                >
                                    +
                                </button>

                                {/* RIMUOVI PRODOTTO */}
                                <button
                                    onClick={() => removeFromCart(item)}
                                    style={{
                                        padding: "5px 10px",
                                        fontSize: "14px",
                                        borderRadius: "6px",
                                        border: "1px solid red",
                                        color: "red",
                                        marginLeft: "10px",
                                    }}
                                >
                                    Rimuovi
                                </button>
                            </div>
                        </div>

                        {/* PREZZO */}
                        <div style={{ textAlign: "right" }}>
                            <p style={{ margin: 0, fontWeight: "bold" }}>
                                € {prezzoUnitario.toFixed(2)}
                            </p>
                            <p style={{ margin: 0, fontSize: "14px" }}>
                                Totale: € {totaleRiga.toFixed(2)}
                            </p>
                        </div>
                    </div>
                );
            })}

            {/* TOTALE GENERALE */}
            {items.length > 0 && (
                <h3 style={{ marginTop: "20px" }}>
                    Totale Ordine: € {total.toFixed(2)}
                </h3>
            )}

            {/* PULSANTE PER PROCEDERE */}
            {items.length > 0 && (
                <Link
                    to="/checkout"
                    style={{
                        display: "inline-block",
                        marginTop: "20px",
                        padding: "10px 15px",
                        background: "#1976d2",
                        color: "white",
                        borderRadius: "6px",
                        textDecoration: "none",
                        fontWeight: "bold",
                    }}
                >
                    Procedi all’Ordine
                </Link>
            )}
        </div>
    );
}
