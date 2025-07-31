// src/pages/ContactPage.js
import React from "react";
import styled from "styled-components";

const ContactPage = () => {
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
          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <textarea rows="5" placeholder="Your Message" required />
            <button type="submit">Send Message</button>
          </form>
        </Form>
      </Content>
    </Container>
  );
};

export default ContactPage;

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
    }
  }
`;
