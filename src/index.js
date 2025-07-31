import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext"; // ✅ Make sure this is imported

const root = ReactDOM.createRoot(document.getElementById("root"));

// ✅ Wrap <App /> inside <CartProvider>
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
