import api from "./axios";

// Ottiene tutti gli utenti
export const getUsers = async () => {
    try {
        const res = await api.get("/api/users");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento utenti:", error);
        return [];
    }
};

// Elimina un utente
export const deleteUser = async (userId) => {
    return api.delete(`/api/users/${userId}`);
};

// ⭐ CREA UN NUOVO CLIENTE (necessario per Checkout.jsx)
export const createUser = async (payload) => {
    try {
        const res = await api.post("/api/users/register", payload);
        return res.data;
    } catch (error) {
        console.error("Errore creazione utente:", error);
        throw error;
    }
};
