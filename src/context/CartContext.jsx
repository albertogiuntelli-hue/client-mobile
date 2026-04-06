import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    // Aggiunta al carrello
    const addToCart = (product, options = {}) => {
        const {
            productType = "pezzi",
            quantity = 1,
            weight = 0,
        } = options;

        setItems((prev) => {
            const existing = prev.find((p) => p.codice === product.codice);

            if (existing) {
                return prev.map((p) =>
                    p.codice === product.codice
                        ? {
                            ...p,
                            quantity: p.quantity + quantity,
                            weight: p.weight + weight,
                        }
                        : p
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    productType,
                    quantity,
                    weight,
                },
            ];
        });
    };

    const decreaseQuantity = (product) => {
        setItems((prev) => {
            const existing = prev.find((p) => p.codice === product.codice);
            if (!existing) return prev;

            if (existing.productType === "pezzi") {
                if (existing.quantity <= 1) {
                    return prev.filter((p) => p.codice !== product.codice);
                }
                return prev.map((p) =>
                    p.codice === product.codice
                        ? { ...p, quantity: p.quantity - 1 }
                        : p
                );
            }

            if (existing.productType === "peso") {
                if (existing.weight <= 50) {
                    return prev.filter((p) => p.codice !== product.codice);
                }
                return prev.map((p) =>
                    p.codice === product.codice
                        ? { ...p, weight: p.weight - 50 }
                        : p
                );
            }

            return prev;
        });
    };

    const removeFromCart = (product) => {
        setItems((prev) => prev.filter((p) => p.codice !== product.codice));
    };

    const clearCart = () => setItems([]);

    // 🔥 TOTALE CORRETTO (con prezzo_scontato)
    const total = items.reduce((sum, item) => {
        const prezzoUnitario =
            item.prezzo_scontato > 0 ? item.prezzo_scontato : item.prezzo;

        if (item.productType === "pezzi") {
            return sum + prezzoUnitario * item.quantity;
        }

        if (item.productType === "peso") {
            return sum + (item.weight / 1000) * prezzoUnitario;
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
    return useContext(CCartContext);
}
