import { useEffect } from "react";
import "../styles/theme.css";

export default function Toast({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 1500); // 1.5 secondi
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast">
            {message}
        </div>
    );
}

