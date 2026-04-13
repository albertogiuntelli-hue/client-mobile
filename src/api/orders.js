// client-mobile/src/api/orders.js
import api from "./axios";

export const sendOrder = async (orderData) => {
    try {
        const res = await api.post("/orders", orderData);
        return res.data;
    } catch (error) {
        console.error("Errore invio ordine:", error);
        throw error;
    }
};
