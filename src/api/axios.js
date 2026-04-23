import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-nuova-production.up.railway.app",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;
