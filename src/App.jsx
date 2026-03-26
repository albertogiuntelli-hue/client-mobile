import { Routes, Route } from "react-router-dom";

// PAGINE
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import Carrello from "./pages/Carrello";
import Checkout from "./pages/Checkout";

// COMPONENTI
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prodotti" element={<ProductList />} />
        <Route path="/prodotto/:id" element={<ProductPage />} />
        <Route path="/carrello" element={<Carrello />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}
