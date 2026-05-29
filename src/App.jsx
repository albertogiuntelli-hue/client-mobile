import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Carrello from "./pages/Carrello.jsx";
import Checkout from "./pages/Checkout";
import InstallBanner from "./components/InstallBanner";
import ProductList from "./pages/ProductList";
import Navbar from "./components/Navbar";
import ChiSiamo from "./pages/ChiSiamo";
import Grazie from "./pages/Grazie";
import Conditions from "./pages/Conditions";
import Promo from "./pages/Promo";
import ListinoCompleto from "./pages/ListinoCompleto";   // ⭐ AGGIUNTO

import { listenForInstallPrompt } from "./installPrompt";

function App() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    listenForInstallPrompt(() => {
      setShowBanner(true);
    });
  }, []);

  return (
    <>
      <InstallBanner
        visible={showBanner}
        onClose={() => setShowBanner(false)}
      />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prodotti" element={<ProductList />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/listino" element={<ListinoCompleto />} />   {/* ⭐ ROTTA LISTINO */}
        <Route path="/product/:codice" element={<ProductPage />} />
        <Route path="/cart" element={<Carrello />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/grazie" element={<Grazie />} />
        <Route path="/condizioni" element={<Conditions />} />
      </Routes>
    </>
  );
}

export default App;
