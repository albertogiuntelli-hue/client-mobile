import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Carrello() {
    const { items, addToCart, decreaseQuantity, removeFromCart, total } = useCart();

    return (
        <div style={{ padding: "15px" }}>
            <h2 style={{ marginBottom: "15px" }}>Riepilogo Carrello</h2>

            {items.length === 0 && <p>Il carrello è vuoto.</p>}

            {items.map((item) => {
                const prezzoUnitario =
                    item.prezzo_scontato > 0 ? item.prezzo_scontato : item.prezzo;

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
                                    }}
                                >
                                    Rimuovi
                                </button>
                            </div>
                        </div>

                        {/* TOTALE RIGA */}
                        <div style={{ minWidth: "80px", textAlign: "right" }}>
                            € {totaleRiga.toFixed(2)}
                        </div>
                    </div>
                );
            })}

            {/* TOTALE CARRELLO */}
            {items.length > 0 && (
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                    <h3>Totale: € {total.toFixed(2)}</h3>

                    <Link
                        to="/checkout"
                        style={{
                            display: "inline-block",
                            marginTop: "10px",
                            padding: "10px 20px",
                            background: "#1976d2",
                            color: "white",
                            borderRadius: "8px",
                            textDecoration: "none",
                        }}
                    >
                        Procedi al Checkout
                    </Link>
                </div>
            )}
        </div>
    );
}
