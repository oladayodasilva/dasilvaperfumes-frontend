import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";

const CartCheckoutPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "Lagos",
    postalCode: "",
    phone: "",
    email: "",
    shippingMethod: "₦4,000.00 - Home Delivery (1–3 Business Days)",
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 4000;
  const total = subtotal + shippingFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submitOrder = async (orderPayload) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Order submission failed");
      }

      clearCart();
      window.location.href = "/success";
    } catch (err) {
      alert(`Payment succeeded, but order failed: ${err.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!window.PaystackPop || typeof window.PaystackPop.setup !== "function") {
      alert("Paystack SDK failed to load correctly. Try refreshing the page.");
      return;
    }
  
    const { firstName, lastName, email, address } = form;
    if (!firstName || !lastName || !email || !address) {
      return alert("Please fill in all required fields.");
    }
  
    const totalAmount = total * 100;
  
    const handler = window.PaystackPop.setup({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: totalAmount,
      currency: "NGN",
      callback: function (response) {
        const orderPayload = {
          user: form,
          cartItems: cart.map((item) => ({
            productId: item.id || item._id,
            name: item.name,
            quantity: item.quantity || 1,
            price: item.price,
          })),
          totalPrice: total,
          shippingFee,
          paymentReference: response.reference,
        };
        submitOrder(orderPayload);
      },
      onClose: () => {
        alert("Transaction cancelled.");
      },
    });
  
    handler.openIframe();
  };
  

  return (
    <Wrapper>
      <h1>Cart & Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <CartList>
            {cart.map((item) => (
              <CartItem key={item.id || item._id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>₦{item.price.toLocaleString()} × {item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id || item._id)}>Remove</button>
                </div>
              </CartItem>
            ))}
          </CartList>

          <Summary>
            <p><strong>Subtotal:</strong> ₦{subtotal.toLocaleString()}</p>
            <p><strong>Shipping:</strong> ₦{shippingFee.toLocaleString()}</p>
            <p><strong>Total:</strong> ₦{total.toLocaleString()}</p>
          </Summary>

          <Form onSubmit={handleSubmit}>
            <h2>Shipping Information</h2>
            <InputRow>
              <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
              <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            </InputRow>
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
            <input type="text" name="apartment" placeholder="Apartment, suite, etc. (optional)" onChange={handleChange} />
            <InputRow>
              <input type="text" name="city" value={form.city} onChange={handleChange} required />
              <input type="text" name="postalCode" placeholder="Postal Code (optional)" onChange={handleChange} />
            </InputRow>
            <select name="shippingMethod" onChange={handleChange} value={form.shippingMethod}>
              <option value="₦4,000.00 - Home Delivery (1–3 Business Days)">
                HOME DELIVERY (1–3 Business Days) – ₦4,000.00
              </option>
            </select>
            <button type="submit">Pay & Place Order</button>
          </Form>
        </>
      )}
    </Wrapper>
  );
};

export default CartCheckoutPage;
// Styled Components
const Wrapper = styled.div`
  padding: 80px 20px;
  max-width: 900px;
  margin: auto;
`;

const CartList = styled.div`
  margin-bottom: 40px;
`;

const CartItem = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;

  img {
    width: 80px;
    border-radius: 6px;
  }

  h3 {
    margin: 0;
  }

  p {
    margin: 5px 0;
  }

  button {
    background: transparent;
    border: 1px solid red;
    color: red;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover {
      background: red;
      color: white;
    }
  }
`;

const Summary = styled.div`
  margin-bottom: 40px;

  p {
    font-size: 1.1rem;
    margin: 5px 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  h2 {
    margin-bottom: 10px;
  }

  input, select {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  button {
    padding: 12px;
    font-size: 1rem;
    font-weight: bold;
    background: black;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background: darkred;
    }
  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 10px;

  input {
    flex: 1;
  }
`;


//After this fix, your `CartCheckoutPage.js` should compile without the runtime error. Want me to help you build a nice `/success` confirmation page next?
