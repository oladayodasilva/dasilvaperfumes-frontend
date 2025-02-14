import React, { useState, useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);

  // State for user details
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    address: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!userDetails.fullName || !userDetails.email || !userDetails.address) {
      alert("Please fill in all fields.");
      return;
    }

    // Order details
    const order = {
      user: userDetails,
      cartItems: cart,
      totalPrice: cart.reduce((acc, item) => acc + Number(item.price), 0),
    };

    console.log("Order Submitted:", order);

    // Simulate order success
    alert("Order placed successfully!");
    clearCart(); // Clear cart after order
  };

  return (
    <CheckoutContainer>
      <h1>Checkout</h1>
      
      <CartSummary>
        {cart.map((item, index) => (
          <p key={index}>{item.name} - ${item.price}</p>
        ))}
        <Total>Total: ${cart.reduce((acc, item) => acc + Number(item.price), 0)}</Total>
      </CartSummary>

      <Form onSubmit={handleSubmit}>
        <h2>Billing Details</h2>
        <Input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
        <Input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <Input type="text" name="address" placeholder="Address" required onChange={handleChange} />
        <Button type="submit">Place Order</Button>
      </Form>
    </CheckoutContainer>
  );
};

export default CheckoutPage;

// Styled Components
const CheckoutContainer = styled.div`
  padding: 100px 5%;
  text-align: center;
`;

const CartSummary = styled.div`
  background: #f8f8f8;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const Total = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 10px;
  background: black;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: darkgray;
  }
`;
