// client/src/admin/LoginAdmin.jsx

import { useEffect } from "react";

export default function LoginAdmin() {
    useEffect(() => {
        window.location.href = "/admin/dashboard";
    }, []);

    return (
        <div style={{ padding: "40px", textAlign: "center" }}>
            <h2>Accesso automatico…</h2>
            <p>Reindirizzamento in corso</p>
        </div>
    );
}
