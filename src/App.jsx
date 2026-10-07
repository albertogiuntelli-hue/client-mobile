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
import ListinoCompleto from "./pages/ListinoCompleto";

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
      {/* Banner installazione PWA */}
      <InstallBanner
        visible={showBanner}
        onClose={() => setShowBanner(false)}
      />

      {/* Navbar sempre visibile */}
      <Navbar />

      {/* Routing principale */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Prodotti */}
        <Route path="/prodotti" element={<ProductList />} />
        <Route path="/product/:codice" element={<ProductPage />} />

        {/* Promo */}
        <Route path="/promo" element={<Promo />} />

        {/* Listino completo */}
        <Route path="/listino" element={<ListinoCompleto />} />

        {/* Carrello e checkout */}
        <Route path="/cart" element={<Carrello />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Pagine informative */}
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/condizioni" element={<Conditions />} />
        <Route path="/grazie" element={<Grazie />} />
      </Routes>
    </>
  );
}

export default App;
