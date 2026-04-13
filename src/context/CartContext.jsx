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
