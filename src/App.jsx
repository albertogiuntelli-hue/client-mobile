import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Carrello from "./pages/Carrello.jsx";
import Checkout from "./pages/Checkout";
import InstallBanner from "./components/InstallBanner";
import ProductList from "./pages/ProductList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <InstallBanner />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prodotti" element={<ProductList />} />
        <Route path="/product/:codice" element={<ProductPage />} />
        <Route path="/cart" element={<Carrello />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
