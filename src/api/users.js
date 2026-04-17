// client-mobile/src/api/users.js
import api from "./axios";

export const registerUser = async (userData) => {
    try {
        const res = await api.post("/users/register", userData);
        return res.data;
    } catch (error) {
        console.error("Errore registrazione utente:", error);
        throw error;
    }
};
