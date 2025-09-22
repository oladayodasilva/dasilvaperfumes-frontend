// src/pages/ContactPage.js
import React, { useState } from "react";
import styled from "styled-components";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullname: "", // 🔑 match backend model
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // sends { fullname, email, message }
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ fullname: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("❌ Failed to send message:", err);
      setStatus("error");
    }
  };

  return (
    <Container>
      <Header>
        <h1>Get in Touch</h1>
        <p>We're here to help. Send us a message or reach out directly.</p>
      </Header>

      <Content>
        <ContactInfo>
          <h3>Contact Details</h3>
          <p>Email: dasilvacosmetics@yahoo.com</p>
          <p>Phone: +234 701 037 2639</p>
          <p>Address: 2, Merret Road, Jibowu, Yaba, Lagos, Nigeria</p>
        </ContactInfo>

        <Form>
          <h3>Send a Message</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullname" // 🔑 lowercase n
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>

          {status === "success" && (
            <p style={{ color: "green", marginTop: "10px" }}>
              ✅ Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p style={{ color: "red", marginTop: "10px" }}>
              ❌ Failed to send message. Please try again.
            </p>
          )}
        </Form>
      </Content>
    </Container>
  );
};

export default ContactPage;


/* --- styled components stay the same --- */
const Container = styled.div`
  padding: 100px 5% 60px;
  background: #fefefe;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;

  h1 {
    font-size: 3rem;
    color: #111;
  }

  p {
    font-size: 1.2rem;
    color: #555;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: space-between;
`;

const ContactInfo = styled.div`
  flex: 1;
  min-width: 280px;

  h3 {
    font-size: 1.6rem;
    margin-bottom: 20px;
    color: #333;
  }

  p {
    font-size: 1.1rem;
    margin: 8px 0;
    color: #666;
  }
`;

const Form = styled.div`
  flex: 1;
  min-width: 280px;

  h3 {
    font-size: 1.6rem;
    margin-bottom: 20px;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    input,
    textarea {
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;
    }

    button {
      padding: 12px;
      border: none;
      background: black;
      color: white;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        background: darkred;
      }
      &:disabled {
        background: #555;
        cursor: not-allowed;
      }
    }
  }
`;
