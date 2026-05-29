import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (product, options = {}) => {
        const {
            productType = product.a_peso === "S" ? "peso" : "pezzi",
            quantity = 1,
            weight = 0,
        } = options;

        const qty = parseFloat(String(quantity).replace(",", ".").trim()) || 0;
        const wgt = parseFloat(String(weight).replace(",", ".").trim()) || 0;

        setItems((prev) => {
            const existing = prev.find((p) => p.codice === product.codice);

            if (existing) {
                return prev.map((p) =>
                    p.codice === product.codice
                        ? {
                            ...p,
                            quantity: p.quantity + qty,
                            weight: p.weight + wgt,
                        }
                        : p
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    productType,
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
                        ? { ...p, weight: existing.weight - 50 }
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

    // TOTALE IN EURO
    const total = items.reduce((sum, item) => {
        const prezzoUnitarioEuro = item.prezzo / 100;

        if (item.productType === "pezzi") {
            return sum + prezzoUnitarioEuro * item.quantity;
        }

        if (item.productType === "peso") {
            return sum + (item.weight / 1000) * prezzoUnitarioEuro;
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
