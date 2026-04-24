import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import { CartProvider } from "./context/CartContext";

import "./styles/theme.css";
import { registerSW } from "virtual:pwa-register";

// PAGINE
import Home from "./pages/Home";
import Prodotti from "./pages/Prodotti";
import Checkout from "./pages/Checkout";
import Grazie from "./pages/Grazie";
import ChiSiamo from "./pages/ChiSiamo";
import Conditions from "./pages/Conditions"; // ⭐ NUOVA PAGINA

registerSW({
  immediate: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prodotti" element={<Prodotti />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/grazie" element={<Grazie />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />

        {/* ⭐ NUOVA ROTTA PER LE CONDIZIONI DI VENDITA */}
        <Route path="/condizioni" element={<Conditions />} />

        {/* fallback */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </CartProvider>
);
