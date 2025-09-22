import React, { useState } from "react";
import styled from "styled-components";

const NewsletterBar = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
  
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Subscription failed");
  
      alert(data.message);
      setEmail("");
    } catch (err) {
      alert(err.message);
    }
  };  

  return (
    <BarContainer>
      <span>✨ Get exclusive offers & updates</span>
      <Form onSubmit={handleSubscribe}>
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Subscribe</Button>
      </Form>
    </BarContainer>
  );
};

export default NewsletterBar;

const BarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #111;
  color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 12px;
  z-index: 1000;
  flex-wrap: wrap;
`;

const Form = styled.form`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  outline: none;
`;

const Button = styled.button`
  background: #f5a623;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #d98a1d;
  }
`;
