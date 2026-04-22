import api from "./axios";

// Ottiene tutti gli ordini
export const getOrders = async () => {
    try {
        const res = await api.get("/orders");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento ordini:", error);
        return [];
    }
};

// Aggiorna lo stato di un ordine
export const updateOrderStatus = async (index, stato) => {
    try {
        return await api.put(`/orders/${index}`, { stato });
    } catch (error) {
        console.error("Errore aggiornamento stato ordine:", error);
        throw error;
    }
};

// ⭐ CREA UN NUOVO ORDINE (necessario per Checkout.jsx)
export const createOrder = async (payload) => {
    try {
        const res = await api.post("/orders", payload);
        return res.data;
    } catch (error) {
        console.error("Errore creazione ordine:", error);
        throw error;
    }
};
