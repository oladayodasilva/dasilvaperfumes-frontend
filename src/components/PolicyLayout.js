import React from "react";
import styled from "styled-components";

const PolicyLayout = ({ title, children }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default PolicyLayout;

const Wrapper = styled.div`
  max-width: 800px;
  margin: 60px auto;
  padding: 0 20px;
  color: #222;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #111;
  margin-bottom: 20px;
`;

const Content = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
`;
