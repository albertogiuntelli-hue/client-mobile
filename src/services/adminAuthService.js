import api from "../api/axios";

export const loginAdmin = async (email, password) => {
    try {
        const response = await api.post("/admin/login", { email, password });
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            "Errore durante il login. Controlla le credenziali."
        );
    }
};
