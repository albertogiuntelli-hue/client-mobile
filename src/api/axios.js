import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-nuova-production.up.railway.app/api",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 20000
});

export default api;
