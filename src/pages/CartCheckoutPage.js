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
    city: "",
    postalCode: "",
    phone: "",
    email: "",
    shippingMethod: "₦3,500.00 - Home Delivery (Lagos, 1–3 Business Days)",
  });

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // ✅ Determine shipping fee dynamically
  const shippingFee =
    form.shippingMethod === "₦3,500.00 - Home Delivery (Lagos, 1–3 Business Days)"
      ? 3500
      : 5000;

  // ✅ Discount applies only on subtotal
  const discountAmount = discount > 0 ? discount : 0;
  const total = subtotal - discountAmount + shippingFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle promo code
  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "LUXE10") {
      setDiscount(subtotal * 0.1); // 10% off subtotal
      alert("Promo code applied! 10% off.");
    } else if (promoCode.trim().toUpperCase() === "VIP20") {
      setDiscount(subtotal * 0.2); // 20% off subtotal
      alert("Promo code applied! 20% off.");
    } else {
      setDiscount(0);
      alert("Invalid promo code.");
    }
  };

  const submitOrder = async (orderPayload) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
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
          subtotal,
          discount: discountAmount,
          shippingFee,
          totalPrice: total,
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
      <h1>🖤 Cart & Checkout</h1>

      {cart.length === 0 ? (
        <EmptyCart>Your cart is empty.</EmptyCart>
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
            {discountAmount > 0 && (
              <p style={{ color: "green" }}>
                <strong>Discount:</strong> -₦{discountAmount.toLocaleString()}
              </p>
            )}
            <p><strong>Shipping:</strong> ₦{shippingFee.toLocaleString()}</p>
            <Total><strong>Total:</strong> ₦{total.toLocaleString()}</Total>
          </Summary>

          {/* ✅ Promo Code Section */}
          <PromoWrapper>
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button type="button" onClick={applyPromo}>Apply</button>
          </PromoWrapper>

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
              <option value="₦3,500.00 - Home Delivery (Lagos, 1–3 Business Days)">
                HOME DELIVERY (Lagos, 1–3 Business Days) – ₦3,500.00
              </option>
              <option value="₦5,000.00 - Home Delivery (Outside Lagos, 3–5 Business Days)">
                HOME DELIVERY (Outside Lagos, 3–5 Business Days) – ₦5,000.00
              </option>
            </select>
            <PayButton type="submit">💳 Pay & Place Order</PayButton>
          </Form>
        </>
      )}
    </Wrapper>
  );
};

export default CartCheckoutPage;

// ----------------- Styled Components ----------------- //

const Wrapper = styled.div`
  padding: 80px 20px;
  max-width: 900px;
  margin: auto;
  font-family: "Playfair Display", serif;
  color: #222;

  h1 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 2.4rem;
    font-weight: 700;
  }
`;

const EmptyCart = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #777;
`;

const CartList = styled.div`
  margin-bottom: 40px;
`;

const CartItem = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;

  img {
    width: 80px;
    border-radius: 10px;
  }

  h3 {
    margin: 0;
    font-weight: 600;
  }

  p {
    margin: 5px 0;
    font-size: 1rem;
  }

  button {
    background: transparent;
    border: 1px solid #c0392b;
    color: #c0392b;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: 0.3s ease;

    &:hover {
      background: #c0392b;
      color: white;
    }
  }
`;

const Summary = styled.div`
  margin-bottom: 30px;
  background: #fafafa;
  padding: 20px;
  border-radius: 12px;

  p {
    font-size: 1.1rem;
    margin: 8px 0;
  }
`;

const Total = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: #111;
  border-top: 1px solid #ddd;
  padding-top: 10px;
  margin-top: 10px;
`;

const PromoWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;

  input {
    flex: 1;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }

  button {
    background: #f5a623;
    color: #111;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    padding: 12px 20px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      background: #d98a1d;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  h2 {
    margin-bottom: 10px;
    font-size: 1.6rem;
  }

  input, select {
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 10px;

  input {
    flex: 1;
  }
`;

const PayButton = styled.button`
  padding: 14px;
  font-size: 1.1rem;
  font-weight: bold;
  background: black;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #222;
  }
`;
