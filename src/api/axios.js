import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // 🔥 niente "/api" qui
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;
