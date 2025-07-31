import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <Container>
      <h1>🎉 Payment Successful!</h1>
      <p>Your order has been placed and will be processed shortly.</p>
      <Link to="/">Return to Home</Link>
    </Container>
  );
};

export default SuccessPage;

const Container = styled.div`
  text-align: center;
  padding: 100px 20px;
`;
