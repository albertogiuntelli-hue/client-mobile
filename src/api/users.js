import api from "./axios";

// Ottiene tutti gli utenti (se mai servirà al mobile)
export const getUsers = async () => {
    try {
        const res = await api.get("/api/users");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento utenti:", error);
        return [];
    }
};

// Elimina un utente (non usata dal mobile, ma la lasciamo)
export const deleteUser = async (userId) => {
    return api.delete(`/api/users/${userId}`);
};

// ⭐ CREA UN NUOVO CLIENTE (usata dal Checkout del client-mobile)
export const createUser = async (payload) => {
    try {
        // niente doppio /api: baseURL ha già /api
        const res = await api.post("/users/register", payload);
        return res.data;
    } catch (error) {
        console.error("Errore creazione utente:", error);
        throw error;
    }
};
