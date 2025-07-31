// src/pages/BespokePage.js
import React from "react";
import styled from "styled-components";

const BespokePage = () => {
  return (
    <Container>
      <Header>
        <h1>Create Your Signature Scent</h1>
        <p>
          Dasilva Bespoke offers personalized perfume creation for those who desire uniqueness and exclusivity.
        </p>
      </Header>

      <Content>
        <ImageSection>
          <img src="/assets/elixir-on-neck.jpg" alt="Custom scent" />
        </ImageSection>

        <TextSection>
          <h3>Our Process</h3>
          <ul>
            <li>1-on-1 scent consultation</li>
            <li>Ingredient selection from 100+ rare oils</li>
            <li>Sample testing and adjustments</li>
            <li>Final product delivery in signature bottle</li>
          </ul>

          <CTA>
            <p>Ready to create your own fragrance?</p>
            <button onClick={() => alert("Redirect to booking form or contact")}>
              Book a Consultation
            </button>
          </CTA>
        </TextSection>
      </Content>
    </Container>
  );
};

export default BespokePage;

const Container = styled.div`
  padding: 100px 5% 60px;
  background: #fff;
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
    max-width: 700px;
    margin: 0 auto;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

const ImageSection = styled.div`
  flex: 1;
  min-width: 280px;

  img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
`;

const TextSection = styled.div`
  flex: 1;
  min-width: 280px;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #222;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 12px;
      font-size: 1.1rem;
      color: #444;
      position: relative;
      padding-left: 20px;

      &::before {
        content: "✔";
        position: absolute;
        left: 0;
        color: darkred;
      }
    }
  }
`;

const CTA = styled.div`
  margin-top: 30px;

  p {
    font-size: 1.2rem;
    color: #222;
    margin-bottom: 12px;
  }

  button {
    background: black;
    color: white;
    padding: 12px 24px;
    border: none;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background: darkred;
    }
  }
`;
