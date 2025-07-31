// context/CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const productId = product._id || product.id;
    const existing = cart.find((item) => (item._id || item.id) === productId);

    const price = typeof product.price === "string"
      ? parseFloat(product.price.replace(/[^0-9.]/g, ""))
      : product.price;

    if (existing) {
      setCart(cart.map((item) =>
        (item._id || item.id) === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, price: price || 0, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => (item._id || item.id) !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
