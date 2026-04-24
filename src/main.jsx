import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import "./styles/theme.css";
import { registerSW } from "virtual:pwa-register";

// PAGINE
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";   // ⭐ CORRETTO
import Checkout from "./pages/Checkout";
import Grazie from "./pages/Grazie";
import ChiSiamo from "./pages/ChiSiamo";
import Conditions from "./pages/Conditions";     // ⭐ NUOVA PAGINA

registerSW({
  immediate: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* ⭐ PAGINA PRODOTTI */}
        <Route path="/prodotti" element={<ProductList />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/grazie" element={<Grazie />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />

        {/* ⭐ PAGINA CONDIZIONI DI VENDITA */}
        <Route path="/condizioni" element={<Conditions />} />

        {/* fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </CartProvider>
);
