// src/App.js 

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import ShopPage from "./pages/ShopPage";
import CartCheckoutPage from "./pages/CartCheckoutPage";
import ContactPage from "./pages/ContactPage";
import BespokePage from "./pages/BespokePage";
import Layout from "./components/Layout"; // ✅ wrapper
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import FAQs from "./pages/FAQs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="products" element={<ShopPage />} />
          <Route path="/cart" element={<CartCheckoutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="bespoke" element={<BespokePage />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
