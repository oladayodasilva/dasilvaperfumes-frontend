import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Hero from "../components/Hero";

// Collage Images
import collage1 from "../assets/1723282592156.jpg";
import collage2 from "../assets/1723284066892.jpg";
import collage3 from "../assets/1723284066343.jpg";
import collage4 from "../assets/1723282592080.jpg";
import collage5 from "../assets/IMG_9469.jpg";

// ✅ Styled Components
import styled from "styled-components";

const getImage = (filename) => {
  try {
    return require(`../assets/${filename}`);
  } catch (err) {
    return require(`../assets/elixir-on-neck.jpg`);
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
        setProducts(res.data.slice(0, 6)); // Show only first 6 products
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <HomeContainer>
      <ContentWrapper>
        <Hero />
        <FeaturedSection>
          <h2>Fragrance Collection</h2>
          <ProductGrid>
            {products.map((product) => (
              <ProductCard key={product._id}>
                <img src={getImage(product.image)} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₦{product.price}</p>
                <button onClick={() => navigate(`/product/${product._id}`)}>View</button>
              </ProductCard>
            ))}
          </ProductGrid>
        </FeaturedSection>

        <CollageSection>
          <img src={collage1} alt="Collage 1" className="portrait" />
          <img src={collage2} alt="Collage 2" className="landscape" />
          <img src={collage3} alt="Collage 3" className="square" />
          <img src={collage4} alt="Collage 4" className="portrait" />
          <img src={collage5} alt="Collage 5" className="landscape" />
        </CollageSection>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;

// ✅ Styled Components Below

const HomeContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #000;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  position: relative;
  z-index: 2;
`;

const FeaturedSection = styled.section`
  padding: 60px 30px;
  background: #fff;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 40px;
    color: #333;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const ProductCard = styled.div`
  background: #fafafa;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;

  img {
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.2rem;
    color: #111;
  }

  p {
    color: #666;
    margin: 10px 0;
  }

  button {
    background: #000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 6px;

    &:hover {
      background: #444;
    }
  }
`;

const CollageSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  padding: 60px 5%;
  background: #fff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.08);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  .portrait {
    grid-row: span 2;
  }

  .landscape {
    grid-column: span 2;
  }

  .square {
    aspect-ratio: 1 / 1;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
`;
