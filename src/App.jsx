import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Carrello from "./pages/Carrello.jsx";
import Checkout from "./pages/Checkout";
import InstallBanner from "./components/InstallBanner";

function App() {
  return (
    <>
      {/* 🔥 Banner PWA */}
      <InstallBanner />

      {/* 🔥 Router principale */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:codice" element={<ProductPage />} />
          <Route path="/cart" element={<Carrello />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
