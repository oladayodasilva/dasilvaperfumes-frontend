import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Import background images
import bg1 from "../assets/Modelmitmagnifiscent.jpg";
import bg2 from "../assets/intentions-in-pocket.jpg";
import bg3 from "../assets/elixir-on-neck.jpg";
import bg4 from "../assets/clement-pola.jpg";
import bg5 from "../assets/Magnifiscent.jpg";
import bg6 from "../assets/intentions-in-pocket.jpg";

const backgroundImages = [bg1, bg2, bg3, bg4, bg5, bg6];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <HeroSection>
      {backgroundImages.map((img, index) => (
        <BackgroundImage
          key={index}
          src={img}
          alt={`bg-${index}`}
          className={index === currentImageIndex ? "active" : ""}
        />
      ))}
      <Overlay />
      <HeroContent>
        <h1>Perfume is an Art</h1>
        <p>Discover timeless fragrances crafted with precision and passion.</p>
        <ShopButton onClick={() => navigate("/products")}>
          Shop Now
        </ShopButton>
      </HeroContent>
      <DotsContainer>
        {backgroundImages.map((_, index) => (
          <Dot
            key={index}
            className={index === currentImageIndex ? "active" : ""}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </DotsContainer>
    </HeroSection>
  );  
};


export default Hero;

// Styled Components
const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1.2s ease-in-out;
  z-index: 0;

  &.active {
    opacity: 1;
    z-index: 0;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 700px;
  background: rgba(0, 0, 0, 0.4);
  padding: 50px 40px;
  border-radius: 12px;
  text-align: center;
  color: #fff;
  font-family: 'Playfair Display', serif;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.3rem;
    line-height: 1.6;
    margin-bottom: 30px;
  }
`;

const ShopButton = styled.button`
  padding: 12px 24px;
  background: #fff;
  color: #000;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  transition: 0.3s;
  border-radius: 6px;

  &:hover {
    background: #ccc;
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 3;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  margin: 0 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &.active {
    background: #fff;
  }
`;
