import styled from "styled-components";

const Hero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <h1>Perfume as an Art</h1>
        <p>Discover timeless fragrances crafted with precision and passion.</p>
        <ShopButton>Shop Now</ShopButton>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;

// Styled Components
const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 600px;
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

  &:hover {
    background: #ccc;
  }
`;
