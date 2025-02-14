import React from "react";
import styled from "styled-components";
import backgroundImage from "../assets/1723284067121.jpg";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <HomeContainer>
      <Hero />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: url(${backgroundImage}) center/cover no-repeat;
`;
