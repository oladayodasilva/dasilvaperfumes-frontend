import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

// Reuse your image resolver
const getImage = (filename) => {
  if (!filename) return require("../assets/elixir-on-neck.jpg");
  if (filename.startsWith("http") || filename.startsWith("/uploads/")) {
    return filename;
  }
  try {
    return require(`../assets/${filename}`);
  } catch (error) {
    return require("../assets/elixir-on-neck.jpg");
  }
};

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <CartContainer>
      <h1>Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <EmptyCart>
          <p>Your cart is empty.</p>
          <Link to="/products">Shop Now</Link>
        </EmptyCart>
      ) : (
        <>
          <CartList>
            {cart.map((item, index) => (
              <CartItem key={index}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h2>{item.name}</h2>
                  <p>₦{item.price}</p>
                  <button onClick={() => removeFromCart(item._id || item.id)}>
                    Remove
                  </button>
                </div>
              </CartItem>
            ))}
          </CartList>
          <ClearButton onClick={clearCart}>Clear Cart</ClearButton>
        </>
      )}
    </CartContainer>
  );
};

export default CartPage;


// Styled Components
const CartContainer = styled.div`
  padding: 100px 5%;
  text-align: center;
  background: #fdfdfd;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 30px;
  }
`;

const EmptyCart = styled.div`
  font-size: 1.5rem;
  a {
    display: block;
    margin-top: 20px;
    font-size: 1.2rem;
    color: black;
    text-decoration: underline;
  }
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  gap: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1.2rem;
    color: #666;
  }

  button {
    background: red;
    color: white;
    padding: 8px 16px;
    border: none;
    cursor: pointer;
  }
`;

const ClearButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background: black;
  color: white;
  border: none;
  cursor: pointer;
`;
