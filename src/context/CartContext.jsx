import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    // Carica il carrello dal localStorage
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    // Salva ogni modifica
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (product, options = {}) => {
        const {
            productType = product.a_peso === "S" ? "peso" : "pezzi",
            quantity = 1,
            weight = 0,
        } = options;

        // Normalizzazione numerica sicura
        const qty = parseFloat(String(quantity).replace(",", ".").trim()) || 0;
        const wgt = parseFloat(String(weight).replace(",", ".").trim()) || 0;

        setItems((prev) => {
            const existing = prev.find((p) => p.codice === product.codice);

            if (existing) {
                const prevQty = parseFloat(String(existing.quantity).replace(",", ".").trim()) || 0;
                const prevWgt = parseFloat(String(existing.weight).replace(",", ".").trim()) || 0;

                return prev.map((p) =>
                    p.codice === product.codice
                        ? {
                            ...p,
                            quantity: prevQty + qty,
                            weight: prevWgt + wgt,
                        }
                        : p
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    a_peso: product.a_peso,   // S/N
                    productType,              // "peso" o "pezzi"
                    quantity: qty,
                    weight: wgt,
                },
            ];
        });
    };

    const decreaseQuantity = (product) => {
        setItems((prev) => {
            const existing = prev.find((p) => p.codice === product.codice);
            if (!existing) return prev;

            const prevQty = parseFloat(String(existing.quantity).replace(",", ".").trim()) || 0;
            const prevWgt = parseFloat(String(existing.weight).replace(",", ".").trim()) || 0;

            if (existing.productType === "pezzi") {
                if (prevQty <= 1) {
                    return prev.filter((p) => p.codice !== product.codice);
                }
                return prev.map((p) =>
                    p.codice === product.codice
                        ? { ...p, quantity: prevQty - 1 }
                        : p
                );
            }

            if (existing.productType === "peso") {
                if (prevWgt <= 50) {
                    return prev.filter((p) => p.codice !== product.codice);
                }
                return prev.map((p) =>
                    p.codice === product.codice
                        ? { ...p, weight: prevWgt - 50 }
                        : p
                );
            }

            return prev;
        });
    };

    const removeFromCart = (product) => {
        setItems((prev) => prev.filter((p) => p.codice !== product.codice));
    };

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem("cart");
    };

    const total = items.reduce((sum, item) => {
        const prezzoUnitario =
            item.prezzo_scontato > 0 ? item.prezzo_scontato : item.prezzo;

        const qty = parseFloat(String(item.quantity).replace(",", ".").trim()) || 0;
        const wgt = parseFloat(String(item.weight).replace(",", ".").trim()) || 0;

        if (item.productType === "pezzi") {
            return sum + prezzoUnitario * qty;
        }

        if (item.productType === "peso") {
            return sum + (wgt / 1000) * prezzoUnitario;
        }

        return sum;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
