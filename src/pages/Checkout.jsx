import { useState } from "react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/orders";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

export default function Checkout() {
    const { items, total, clearCart } = useCart();
    const navigate = useNavigate();

    // Ripristina anagrafica salvata
    const saved = JSON.parse(localStorage.getItem("cliente") || "{}");

    const [nome, setNome] = useState(saved.nome || "");
    const [cognome, setCognome] = useState(saved.cognome || "");
    const [telefonoCliente, setTelefonoCliente] = useState(saved.telefono || "");
    const [indirizzo, setIndirizzo] = useState(saved.indirizzo || "");
    const [email, setEmail] = useState(saved.email || "");
    const [note, setNote] = useState(saved.note || "");

    const telefonoNegozio = "3356039828";

    const inviaOrdineBackend = async () => {
        const cliente = {
            nome,
            cognome,
            telefono: telefonoCliente,
            indirizzo,
            email,
            note,
        };

        localStorage.setItem("cliente", JSON.stringify(cliente));

        const ordine = {
            cliente,
            prodotti: items.map((p) => {
                const isPeso = p.a_peso === "S";

                return {
                    codice: p.codice,
                    nome: p.nome,
                    quantita: isPeso ? 0 : Number(p.quantity),
                    peso: isPeso ? Number(p.weight) : 0,
                    tipo: p.a_peso,

// ✔ PREZZO IN CENT