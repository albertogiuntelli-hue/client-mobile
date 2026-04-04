import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    // 🔵 addToCart ora accetta quantityOverride (kg o pezzi)
    const addToCart = (product, quantityOverride = 1) => {
        setItems((prev) => {
            const existing = prev.find((p) => p.codice === product.codice);

            if (existing) {
                return prev.map((p) =>
                    p.codice === product.codice
                        ? { ...p, quantity: p.quantity + quantityOverride }
                        : p
                );
            }

            return [...prev, { ...product, quantity: quantityOverride }];
        });
    };

    const decreaseQuantity = (product) => {
        setItems((prev) => {
            const existing = prev.find((p) => p.codice === product.codice);
            if (!existing) return prev;

            if (existing.quantity <= 0.1) {
                return prev.filter((p) => p.codice !== product.codice);
            }

            return prev.map((p) =>
                p.codice === product.codice
                    ? { ...p, quantity: p.quantity - 1 }
                    : p
            );
        });
    };

    const removeFromCart = (product) => {
        setItems((prev) => prev.filter((p) => p.codice !== product.codice));
    };

    const clearCart = () => setItems([]);

    const total = items.reduce(
        (sum, item) => sum + item.prezzo * item.quantity,
        0
    );

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
