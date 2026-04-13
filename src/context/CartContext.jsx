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
                    a_peso: product.a_peso,   // 🔥 SALVIAMO S/N
                    productType,              // 🔥 "peso" o "pezzi"
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

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem("cart");
    };

    const total = items.reduce((sum, item) => {
        const prezzoUnitario =
            item.prezzo_scontato > 0 ? item.prezzo_scontato : item.prezzo;

        if (item.productType === "pezzi") {
            return sum + prezzoUnitario * item.quantity;
        }

        if (item.productType === "peso") {
            const peso = Number(item.weight) || 0;
            return sum + (peso / 1000) * prezzoUnitario;
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

