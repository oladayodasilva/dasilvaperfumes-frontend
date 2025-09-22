// src/components/Hero.js
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

const images = [bg1, bg2, bg3, bg4, bg5, bg6];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HeroSection>
      {images.map((img, index) => (
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
        <ShopButton onClick={() => navigate("/products")}>Shop Now</ShopButton>
      </HeroContent>
      <DotsContainer>
        {images.map((_, index) => (
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

/* ---------------- Styled Components ---------------- */
const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
  background: rgba(0, 0, 0, 0.35);
  z-index: 1;
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  max-width: 500px;
  background: rgba(0, 0, 0, 0.4);
  padding: 30px 25px;
  border-radius: 12px;
  text-align: center;
  color: #fff;
  font-family: 'Playfair Display', serif;

  h1 {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  p {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

const ShopButton = styled.button`
  padding: 10px 20px;
  background: #fff;
  color: #000;
  font-size: 14px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s;
  border-radius: 6px;

  &:hover {
    background: #ccc;
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 3;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  margin: 0 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &.active {
    background: #fff;
  }
`;
